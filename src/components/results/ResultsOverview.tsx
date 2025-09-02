import type { AnalysisResult } from '../../types';
import { MetricsGrid } from '../charts/SimpleCharts';

interface ResultsOverviewProps {
  analysis: AnalysisResult;
}

interface ScoreGaugeProps {
  title: string;
  score: number;
  max: number;
  description: string;
  color: 'green' | 'yellow' | 'red';
  size?: 'small' | 'medium' | 'large';
}

function ScoreGauge({ title, score, max, description, color, size = 'medium' }: ScoreGaugeProps) {
  const percentage = Math.min((score / max) * 100, 100);
  
  const sizeClasses = {
    small: { container: 'w-20 h-20', text: 'text-lg', desc: 'text-xs' },
    medium: { container: 'w-24 h-24', text: 'text-xl', desc: 'text-sm' },
    large: { container: 'w-32 h-32', text: 'text-2xl', desc: 'text-base' }
  };
  
  const colorClasses = {
    green: 'text-green-600 dark:text-green-400',
    yellow: 'text-yellow-600 dark:text-yellow-400',
    red: 'text-red-600 dark:text-red-400'
  };

  const strokeColors = {
    green: '#10B981',
    yellow: '#F59E0B',
    red: '#EF4444'
  };

  const radius = size === 'large' ? 60 : size === 'medium' ? 45 : 35;
  const strokeWidth = size === 'large' ? 8 : 6;
  const center = radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative">
        <svg 
          className={sizeClasses[size].container} 
          viewBox={`0 0 ${center * 2} ${center * 2}`}
        >
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={strokeColors[color]}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
            transform={`rotate(-90 ${center} ${center})`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-bold ${sizeClasses[size].text} ${colorClasses[color]}`}>
            {score}
          </span>
        </div>
      </div>
      <div className="text-center">
        <div className="font-medium text-gray-900 dark:text-gray-100 text-sm">
          {title}
        </div>
        <div className={`text-gray-600 dark:text-gray-400 ${sizeClasses[size].desc}`}>
          {description}
        </div>
      </div>
    </div>
  );
}

function QuickInsights({ analysis }: { analysis: AnalysisResult }) {
  const insights = [];

  // Generate contextual insights based on the analysis
  if (analysis.fieldCount > 100) {
    insights.push({
      icon: '📊',
      title: 'High Field Count',
      description: `${analysis.fieldCount} fields detected - consider field consolidation for better performance`,
      type: 'warning' as const
    });
  }

  if (analysis.maxDepth > 5) {
    insights.push({
      icon: '🔗',
      title: 'Deep Nesting',
      description: `${analysis.maxDepth} levels deep - flattening may improve query performance`,
      type: 'warning' as const
    });
  }

  if (analysis.fieldTypes.text > 10) {
    insights.push({
      icon: '🔤',
      title: 'Many Text Fields',
      description: `${analysis.fieldTypes.text} text fields - high indexing overhead expected`,
      type: 'info' as const
    });
  }

  if (analysis.fieldTypes.nested > 0) {
    insights.push({
      icon: '📦',
      title: 'Nested Objects',
      description: `${analysis.fieldTypes.nested} nested fields - significant storage and query overhead`,
      type: 'error' as const
    });
  }

  if (analysis.estimatedStorageMB > 100) {
    insights.push({
      icon: '💾',
      title: 'Large Storage Footprint',
      description: `${analysis.estimatedStorageMB.toFixed(1)} MB estimated - optimization recommended`,
      type: 'warning' as const
    });
  }

  // Add positive insights
  if (analysis.complexityScore <= 3) {
    insights.push({
      icon: '✅',
      title: 'Optimized Structure',
      description: 'Document structure is well-optimized for OpenSearch',
      type: 'success' as const
    });
  }

  if (analysis.fieldTypes.keyword > analysis.fieldTypes.text) {
    insights.push({
      icon: '🎯',
      title: 'Efficient Field Types',
      description: 'Good balance of keyword vs text fields for performance',
      type: 'success' as const
    });
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Key Insights
      </h3>
      <div className="space-y-3">
        {insights.slice(0, 4).map((insight, index) => (
          <div 
            key={index}
            className={`p-3 rounded-lg border ${
              insight.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' :
              insight.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' :
              insight.type === 'error' ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' :
              'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
            }`}
          >
            <div className="flex items-start space-x-3">
              <span className="text-lg flex-shrink-0">{insight.icon}</span>
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                  {insight.title}
                </div>
                <div className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                  {insight.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopRecommendations({ analysis }: { analysis: AnalysisResult }) {
  const recommendations = [];

  // Generate top recommendations based on analysis
  if (analysis.optimizations.length > 0) {
    recommendations.push(...analysis.optimizations.slice(0, 3));
  }

  // Add context-specific recommendations
  if (analysis.fieldTypes.text > 5 && analysis.fieldTypes.keyword === 0) {
    recommendations.push('Consider adding keyword fields for exact matching and aggregations');
  }

  if (analysis.maxDepth > 4) {
    recommendations.push('Flatten nested objects to improve query performance');
  }

  if (analysis.fieldCount > 50 && analysis.fieldTypes.object > 0) {
    recommendations.push('Review object fields for potential field explosion');
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Top Recommendations
      </h3>
      <div className="space-y-2">
        {recommendations.slice(0, 4).map((rec, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <span className="text-blue-500 font-bold flex-shrink-0 mt-0.5">
              {index + 1}.
            </span>
            <span className="text-gray-700 dark:text-gray-300 text-sm">
              {rec}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ResultsOverview({ analysis }: ResultsOverviewProps) {
  const getScoreColor = (score: number): 'green' | 'yellow' | 'red' => {
    if (score <= 3) return 'green';
    if (score <= 6) return 'yellow';
    return 'red';
  };

  return (
    <div className="space-y-8">
      {/* Score Overview */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Performance Overview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
          <ScoreGauge
            title="Complexity"
            score={analysis.complexityScore}
            max={10}
            description="Processing overhead"
            color={getScoreColor(analysis.complexityScore)}
            size="large"
          />
          <ScoreGauge
            title="Storage"
            score={analysis.indexSizeScore}
            max={10}
            description="Storage requirements"
            color={getScoreColor(analysis.indexSizeScore)}
            size="large"
          />
          <ScoreGauge
            title="Field Count"
            score={Math.min(analysis.fieldCount / 10, 10)}
            max={10}
            description={`${analysis.fieldCount} fields`}
            color={analysis.fieldCount > 100 ? 'red' : analysis.fieldCount > 50 ? 'yellow' : 'green'}
            size="medium"
          />
          <ScoreGauge
            title="Max Depth"
            score={Math.min(analysis.maxDepth, 10)}
            max={10}
            description={`${analysis.maxDepth} levels`}
            color={analysis.maxDepth > 5 ? 'red' : analysis.maxDepth > 3 ? 'yellow' : 'green'}
            size="medium"
          />
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Document Metrics
        </h3>
        <MetricsGrid analysis={analysis} />
      </div>

      {/* Two Column Layout for Insights and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <QuickInsights analysis={analysis} />
        <TopRecommendations analysis={analysis} />
      </div>

      {/* Document Classification */}
      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-3">
          📋 Document Profile
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="font-medium text-indigo-800 dark:text-indigo-200">Document Type</div>
            <div className="text-indigo-700 dark:text-indigo-300">
              {analysis.fieldTypes.nested > 0 ? 'Complex Nested Document' :
               analysis.fieldTypes.text > analysis.fieldTypes.keyword ? 'Content-Rich Document' :
               analysis.fieldCount > 50 ? 'Wide Schema Document' :
               'Standard Document'}
            </div>
          </div>
          <div>
            <div className="font-medium text-indigo-800 dark:text-indigo-200">Complexity Level</div>
            <div className="text-indigo-700 dark:text-indigo-300">
              {analysis.complexityScore <= 3 ? 'Low' :
               analysis.complexityScore <= 6 ? 'Moderate' :
               analysis.complexityScore <= 8 ? 'High' : 'Very High'}
            </div>
          </div>
          <div>
            <div className="font-medium text-indigo-800 dark:text-indigo-200">Optimization Priority</div>
            <div className="text-indigo-700 dark:text-indigo-300">
              {analysis.optimizations.length === 0 ? 'No Action Needed' :
               analysis.optimizations.length <= 2 ? 'Minor Tweaks' :
               analysis.optimizations.length <= 5 ? 'Moderate Changes' : 'Major Refactoring'}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          🚀 Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="flex items-center space-x-2 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors text-left">
            <span className="text-xl">📊</span>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              View Field Details
            </span>
          </button>
          <button className="flex items-center space-x-2 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors text-left">
            <span className="text-xl">⚡</span>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Performance Analysis
            </span>
          </button>
          <button className="flex items-center space-x-2 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors text-left">
            <span className="text-xl">🔧</span>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Get Optimizations
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}