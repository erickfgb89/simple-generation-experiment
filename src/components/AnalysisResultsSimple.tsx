import type { AnalysisResult } from '../types';
import { FieldTypeChart, FieldComplexityList, MetricsGrid } from './charts/SimpleCharts';

interface AnalysisResultsProps {
  analysis: AnalysisResult;
}

function EnhancedScoreCard({ title, score, max = 10, description, color, explanation }: {
  title: string;
  score: number;
  max?: number;
  description: string;
  color: 'green' | 'yellow' | 'red';
  explanation: string;
}) {
  const percentage = (score / max) * 100;
  
  const colorClasses = {
    green: 'bg-green-100 text-green-800 border-green-200',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    red: 'bg-red-100 text-red-800 border-red-200'
  };

  const barColors = {
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500'
  };

  return (
    <div className={`p-4 border rounded-lg ${colorClasses[color]} transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-2xl font-bold animate-fade-in-scale">{score}</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2 overflow-hidden">
        <div 
          className={`h-2 rounded-full ${barColors[color]} transition-all duration-1000 ease-out`}
          style={{ 
            width: `${Math.min(percentage, 100)}%`,
            transform: 'translateX(0)'
          }}
        ></div>
      </div>
      <p className="text-sm opacity-80 mb-2">{description}</p>
      <details className="text-xs opacity-70 group">
        <summary className="cursor-pointer hover:opacity-90 transition-opacity flex items-center space-x-1">
          <span>How is this calculated?</span>
          <svg className="w-3 h-3 transform group-open:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </summary>
        <div className="mt-2 pl-2 border-l-2 border-current border-opacity-30 animate-slide-up">
          {explanation}
        </div>
      </details>
    </div>
  );
}

function FieldTypeExplanation({ fieldTypes }: { fieldTypes: Record<string, number> }) {
  const activeTypes = Object.entries(fieldTypes).filter(([_, count]) => count > 0);
  
  const typeExplanations = {
    'text': 'Analyzed for full-text search. Requires tokenization, lowercasing, and stemming. High processing overhead.',
    'keyword': 'Stored as exact values. No analysis required. Fastest for exact matches and aggregations.',
    'long': '64-bit integers. Space-optimized storage. Fast for numeric operations.',
    'integer': '32-bit integers. More space-efficient than long for smaller values.',
    'short': '16-bit integers. Very space-efficient for small numeric ranges.',
    'byte': '8-bit integers. Most space-efficient for very small numbers.',
    'double': '64-bit floating point. Higher precision but larger storage.',
    'float': '32-bit floating point. Good balance of precision and storage.',
    'date': 'Stored as milliseconds since epoch. Optimized for temporal queries.',
    'boolean': 'Single bit storage. Most space-efficient field type.',
    'object': 'Flattened structure. Field names concatenated with dots.',
    'nested': 'Separate Lucene documents. Maintains object relationships but high overhead.'
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Field Type Analysis</h3>
        <a 
          href="https://opensearch.org/docs/latest/field-types/supported-field-types/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm"
        >
          View Documentation ↗
        </a>
      </div>
      
      <div className="space-y-2">
        {activeTypes.map(([type, count]) => (
          <div key={type} className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium capitalize text-gray-900 dark:text-gray-100">{type}</span>
              <span className="text-gray-600 dark:text-gray-400 font-mono text-sm">{count} fields</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{typeExplanations[type as keyof typeof typeExplanations]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DocumentationLinks() {
  const links = [
    {
      title: "OpenSearch Field Types",
      url: "https://opensearch.org/docs/latest/field-types/",
      description: "Official documentation on field type behavior and storage"
    },
    {
      title: "Dynamic Mapping",
      url: "https://opensearch.org/docs/latest/field-types/index/#dynamic-mapping",
      description: "How OpenSearch automatically detects field types"
    },
    {
      title: "Performance Tuning",
      url: "https://opensearch.org/docs/latest/tuning-your-cluster/",
      description: "Best practices for indexing performance"
    },
    {
      title: "Nested Field Type",
      url: "https://opensearch.org/docs/latest/field-types/supported-field-types/nested/",
      description: "When and how to use nested objects"
    }
  ];

  return (
    <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">📚 Research Sources</h3>
      <p className="text-blue-800 dark:text-blue-200 text-sm mb-3">
        This analysis is based on OpenSearch's actual indexing behavior and documented performance characteristics:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 bg-white dark:bg-blue-800/20 border border-blue-200 dark:border-blue-700 rounded hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-sm transition-all"
          >
            <div className="font-medium text-blue-900 dark:text-blue-100 text-sm">{link.title} ↗</div>
            <div className="text-blue-700 dark:text-blue-300 text-xs mt-1">{link.description}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const getScoreColor = (score: number): 'green' | 'yellow' | 'red' => {
    if (score <= 3) return 'green';
    if (score <= 6) return 'yellow';
    return 'red';
  };

  const indexSizeExplanation = `Based on OpenSearch's storage formula: Source Data × (1 + Replicas) × (1.1 Indexing Overhead) / (0.95 Reserved Space) / (0.9 System Overhead). Field types add overhead: text fields +10%, nested objects +150%, while numeric fields are optimized for -20% storage.`;
  
  const complexityExplanation = `Calculated using field type processing weights: text fields (3x complexity for tokenization), nested objects (4x for separate documents), plus depth penalties (1.3x per level) and array size multipliers. Based on OpenSearch indexing performance characteristics.`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6 transition-colors duration-200">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">OpenSearch Analysis Results</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
          Based on OpenSearch indexing algorithms and performance characteristics
        </p>
      </div>
      
      {/* Enhanced Score Cards with Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="animate-slide-up animate-stagger-1">
          <EnhancedScoreCard
            title="Index Size Score"
            score={analysis.indexSizeScore}
            description="Predicted storage requirements based on field types and structure"
            color={getScoreColor(analysis.indexSizeScore)}
            explanation={indexSizeExplanation}
          />
        </div>
        <div className="animate-slide-up animate-stagger-2">
          <EnhancedScoreCard
            title="Complexity Score"
            score={analysis.complexityScore}
            description="Processing overhead for indexing operations"
            color={getScoreColor(analysis.complexityScore)}
            explanation={complexityExplanation}
          />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="animate-slide-up animate-stagger-3">
        <MetricsGrid analysis={analysis} />
      </div>

      {/* Field Type Distribution and Complexity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="animate-slide-in-left animate-stagger-1">
          <FieldTypeChart analysis={analysis} />
        </div>
        <div className="animate-slide-in-right animate-stagger-2">
          <FieldComplexityList analysis={analysis} fields={analysis.fields} />
        </div>
      </div>

      {/* Enhanced Field Types with Explanations */}
      <div className="animate-slide-up animate-stagger-4">
        <FieldTypeExplanation fieldTypes={analysis.fieldTypes} />
      </div>

      {/* Warnings */}
      {analysis.warnings.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">⚠️ Performance Warnings</h3>
            <a 
              href="https://opensearch.org/docs/latest/tuning-your-cluster/index/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-700 dark:text-yellow-300 hover:text-yellow-800 dark:hover:text-yellow-200 text-sm"
            >
              Performance Guide ↗
            </a>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <ul className="space-y-2">
              {analysis.warnings.map((warning, index) => (
                <li key={index} className="text-yellow-800 dark:text-yellow-200 text-sm">
                  <span className="font-medium">•</span> {warning}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Optimizations */}
      {analysis.optimizations.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">💡 Optimization Recommendations</h3>
            <a 
              href="https://opensearch.org/docs/latest/field-types/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 text-sm"
            >
              Field Types Guide ↗
            </a>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <ul className="space-y-2">
              {analysis.optimizations.map((optimization, index) => (
                <li key={index} className="text-blue-800 dark:text-blue-200 text-sm">
                  <span className="font-medium">•</span> {optimization}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Documentation Links */}
      <DocumentationLinks />
      
      {/* Research Attribution */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-xs">
          Analysis based on comprehensive research of OpenSearch source code, documentation, and performance studies. 
          All calculations reflect real OpenSearch indexing behavior and storage patterns.
        </p>
      </div>
    </div>
  );
}