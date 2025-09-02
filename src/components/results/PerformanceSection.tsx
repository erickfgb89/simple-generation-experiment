import type { AnalysisResult } from '../../types';

interface PerformanceSectionProps {
  analysis: AnalysisResult;
}

interface PerformanceGaugeProps {
  title: string;
  score: number;
  max: number;
  unit: string;
  description: string;
  color: 'green' | 'yellow' | 'red';
  icon: string;
}

function PerformanceGauge({ title, score, max, unit, description, color, icon }: PerformanceGaugeProps) {
  const percentage = Math.min((score / max) * 100, 100);
  
  const colorClasses = {
    green: {
      text: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      progress: 'bg-green-500'
    },
    yellow: {
      text: 'text-yellow-600 dark:text-yellow-400',
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      progress: 'bg-yellow-500'
    },
    red: {
      text: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      progress: 'bg-red-500'
    }
  };

  return (
    <div className={`p-6 rounded-lg border ${colorClasses[color].bg} ${colorClasses[color].border}`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className={`w-12 h-12 rounded-lg ${colorClasses[color].bg} flex items-center justify-center text-2xl`}>
            {icon}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
            {title}
          </h3>
          <div className="flex items-baseline space-x-2 mb-2">
            <span className={`text-3xl font-bold ${colorClasses[color].text}`}>
              {typeof score === 'number' ? score.toFixed(1) : score}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {unit}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
            <div 
              className={`h-2 rounded-full ${colorClasses[color].progress} transition-all duration-1000 ease-out`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function ResourceUsageBreakdown({ analysis }: { analysis: AnalysisResult }) {
  const calculateResourceUsage = () => {
    // Estimate resource usage based on analysis
    const baseMemory = analysis.estimatedStorageMB * 0.3; // Memory overhead
    const textFieldMemory = analysis.fieldTypes.text * 2; // Extra memory for text analysis
    const nestedObjectMemory = analysis.fieldTypes.nested * 5; // High memory for nested objects
    
    return {
      memory: Math.round(baseMemory + textFieldMemory + nestedObjectMemory),
      cpu: Math.round(analysis.complexityScore * 10), // CPU percentage estimate
      io: Math.round(analysis.indexSizeScore * 5), // I/O operations per second estimate
      network: Math.round(analysis.estimatedStorageMB * 0.1) // Network bandwidth estimate
    };
  };

  const resources = calculateResourceUsage();
  
  const resourceItems = [
    {
      name: 'Memory Usage',
      value: resources.memory,
      unit: 'MB',
      icon: '🧠',
      description: 'Estimated heap memory consumption during indexing',
      color: resources.memory > 100 ? 'red' : resources.memory > 50 ? 'yellow' : 'green'
    },
    {
      name: 'CPU Usage',
      value: resources.cpu,
      unit: '%',
      icon: '⚙️',
      description: 'Estimated CPU utilization during document processing',
      color: resources.cpu > 70 ? 'red' : resources.cpu > 40 ? 'yellow' : 'green'
    },
    {
      name: 'I/O Operations',
      value: resources.io,
      unit: '/sec',
      icon: '💾',
      description: 'Estimated disk operations per second during indexing',
      color: resources.io > 50 ? 'red' : resources.io > 25 ? 'yellow' : 'green'
    },
    {
      name: 'Network Bandwidth',
      value: resources.network,
      unit: 'MB/s',
      icon: '🌐',
      description: 'Estimated network usage for replication and queries',
      color: resources.network > 20 ? 'red' : resources.network > 10 ? 'yellow' : 'green'
    }
  ] as const;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Resource Usage Estimates
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resourceItems.map((item) => (
          <PerformanceGauge
            key={item.name}
            title={item.name}
            score={item.value}
            max={item.name === 'Memory Usage' ? 200 : item.name === 'CPU Usage' ? 100 : item.name === 'I/O Operations' ? 100 : 50}
            unit={item.unit}
            description={item.description}
            color={item.color}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
}

function PerformancePredictions({ analysis }: { analysis: AnalysisResult }) {
  const calculatePredictions = () => {
    const textFieldPenalty = analysis.fieldTypes.text * 0.3;
    const nestedObjectPenalty = analysis.fieldTypes.nested * 0.5;
    const depthPenalty = Math.max(0, (analysis.maxDepth - 3) * 0.2);
    const fieldCountPenalty = Math.max(0, (analysis.fieldCount - 50) * 0.01);
    
    const baseThroughput = 1000; // docs/sec baseline
    const totalPenalty = textFieldPenalty + nestedObjectPenalty + depthPenalty + fieldCountPenalty;
    
    return {
      indexingThroughput: Math.max(100, Math.round(baseThroughput - (totalPenalty * 100))),
      queryLatency: Math.round(10 + (totalPenalty * 5)), // milliseconds
      storageGrowthRate: Math.round((1 + (totalPenalty * 0.1)) * 100), // percentage per month
      scalabilityRating: Math.max(1, Math.round(10 - (totalPenalty * 2)))
    };
  };

  const predictions = calculatePredictions();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Performance Predictions
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-xl">
              ⚡
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-gray-100">
                Indexing Speed
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Expected throughput
              </div>
            </div>
          </div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {predictions.indexingThroughput.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            documents per second
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-xl">
              🔍
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-gray-100">
                Query Latency
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Average response time
              </div>
            </div>
          </div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
            {predictions.queryLatency}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            milliseconds
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-xl">
              📈
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-gray-100">
                Storage Growth
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Monthly increase rate
              </div>
            </div>
          </div>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            {predictions.storageGrowthRate}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            per month
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center text-xl">
              🚀
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-gray-100">
                Scalability
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Scaling potential
              </div>
            </div>
          </div>
          <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
            {predictions.scalabilityRating}/10
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            rating
          </div>
        </div>
      </div>
    </div>
  );
}

function BottleneckAnalysis({ analysis }: { analysis: AnalysisResult }) {
  const identifyBottlenecks = () => {
    const bottlenecks = [];
    
    if (analysis.fieldTypes.text > 10) {
      bottlenecks.push({
        type: 'Text Analysis Overhead',
        severity: 'high' as const,
        impact: 'Indexing Performance',
        description: `${analysis.fieldTypes.text} text fields require tokenization, analysis, and normalization`,
        recommendation: 'Consider using keyword fields for exact matching where appropriate'
      });
    }
    
    if (analysis.fieldTypes.nested > 0) {
      bottlenecks.push({
        type: 'Nested Object Complexity',
        severity: 'high' as const,
        impact: 'Storage & Query Performance',
        description: `${analysis.fieldTypes.nested} nested objects create separate Lucene documents`,
        recommendation: 'Flatten nested structures where relationships are not critical'
      });
    }
    
    if (analysis.maxDepth > 5) {
      bottlenecks.push({
        type: 'Deep Object Nesting',
        severity: 'medium' as const,
        impact: 'Memory Usage',
        description: `${analysis.maxDepth} levels of nesting increase processing complexity`,
        recommendation: 'Restructure deeply nested objects to reduce complexity'
      });
    }
    
    if (analysis.fieldCount > 100) {
      bottlenecks.push({
        type: 'High Field Count',
        severity: 'medium' as const,
        impact: 'Memory & Storage',
        description: `${analysis.fieldCount} fields may cause field explosion issues`,
        recommendation: 'Review field mapping and consider field consolidation'
      });
    }

    if (analysis.estimatedStorageMB > 50) {
      bottlenecks.push({
        type: 'Large Storage Footprint',
        severity: 'medium' as const,
        impact: 'Disk I/O & Costs',
        description: `${analysis.estimatedStorageMB.toFixed(1)} MB per document is significant`,
        recommendation: 'Optimize field types and remove unnecessary fields'
      });
    }
    
    return bottlenecks;
  };

  const bottlenecks = identifyBottlenecks();

  if (bottlenecks.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Bottleneck Analysis
        </h3>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h4 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
            No Major Bottlenecks Detected
          </h4>
          <p className="text-green-700 dark:text-green-300">
            Your document structure appears to be well-optimized for OpenSearch performance.
          </p>
        </div>
      </div>
    );
  }

  const severityColors = {
    high: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-800 dark:text-red-200',
      badge: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
    },
    medium: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-800 dark:text-yellow-200',
      badge: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200'
    },
    low: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-800 dark:text-blue-200',
      badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Performance Bottlenecks
      </h3>
      <div className="space-y-4">
        {bottlenecks.map((bottleneck, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg border ${severityColors[bottleneck.severity].bg} ${severityColors[bottleneck.severity].border}`}
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className={`font-semibold ${severityColors[bottleneck.severity].text}`}>
                {bottleneck.type}
              </h4>
              <div className="flex space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${severityColors[bottleneck.severity].badge}`}>
                  {bottleneck.severity} severity
                </span>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  {bottleneck.impact}
                </span>
              </div>
            </div>
            <p className={`text-sm mb-3 ${severityColors[bottleneck.severity].text}`}>
              {bottleneck.description}
            </p>
            <div className={`p-3 bg-white dark:bg-gray-800 rounded border-l-4 ${severityColors[bottleneck.severity].border}`}>
              <div className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-1">
                💡 Recommendation:
              </div>
              <div className="text-gray-700 dark:text-gray-300 text-sm">
                {bottleneck.recommendation}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PerformanceSection({ analysis }: PerformanceSectionProps) {
  return (
    <div className="space-y-8">
      <ResourceUsageBreakdown analysis={analysis} />
      <PerformancePredictions analysis={analysis} />
      <BottleneckAnalysis analysis={analysis} />
      
      {/* Performance Tips */}
      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-4">
          🎯 Performance Optimization Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
              Indexing Performance
            </div>
            <ul className="space-y-1 text-indigo-700 dark:text-indigo-300">
              <li>• Use bulk indexing for better throughput</li>
              <li>• Consider disabling refresh during bulk operations</li>
              <li>• Optimize field types for your use case</li>
              <li>• Use index templates for consistent mapping</li>
            </ul>
          </div>
          <div>
            <div className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
              Query Performance
            </div>
            <ul className="space-y-1 text-indigo-700 dark:text-indigo-300">
              <li>• Use keyword fields for exact matches</li>
              <li>• Implement proper shard sizing</li>
              <li>• Consider using filters over queries</li>
              <li>• Enable field-level security when needed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}