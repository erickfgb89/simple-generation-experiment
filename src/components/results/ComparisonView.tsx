import { useState } from 'react';

interface ComparisonViewProps {
  title: string;
  beforeCode: string;
  afterCode: string;
  description: string;
  expectedImprovement: {
    complexity: number;
    storage: number;
    performance: string;
  };
}

interface CodeBlockProps {
  code: string;
  language?: string;
  title: string;
  status: 'before' | 'after';
}

function CodeBlock({ code, title, status }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const statusStyles = {
    before: {
      header: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
      badge: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200',
      icon: '❌'
    },
    after: {
      header: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
      badge: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
      icon: '✅'
    }
  };

  const style = statusStyles[status];

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Header */}
      <div className={`px-4 py-3 border-b ${style.header}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{style.icon}</span>
            <span className="font-medium">{title}</span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${style.badge}`}>
              {status === 'before' ? 'Current' : 'Optimized'}
            </span>
          </div>
          <button
            onClick={copyToClipboard}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              copied 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {copied ? '✓ Copied' : '📋 Copy'}
          </button>
        </div>
      </div>

      {/* Code Content */}
      <div className="bg-gray-900 text-gray-100 p-4 overflow-x-auto">
        <pre className="text-sm font-mono">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

function ImpactMetrics({ expectedImprovement }: { expectedImprovement: ComparisonViewProps['expectedImprovement'] }) {
  const metrics = [
    {
      label: 'Complexity Change',
      value: expectedImprovement.complexity,
      unit: 'points',
      icon: '📊',
      color: expectedImprovement.complexity < 0 ? 'green' : expectedImprovement.complexity > 0 ? 'red' : 'gray'
    },
    {
      label: 'Storage Change',
      value: expectedImprovement.storage,
      unit: '%',
      icon: '💾',
      color: expectedImprovement.storage < 0 ? 'green' : expectedImprovement.storage > 0 ? 'red' : 'gray'
    },
    {
      label: 'Performance Impact',
      value: expectedImprovement.performance,
      unit: '',
      icon: '⚡',
      color: 'blue'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return {
          bg: 'bg-green-50 dark:bg-green-900/20',
          border: 'border-green-200 dark:border-green-800',
          text: 'text-green-800 dark:text-green-200',
          value: 'text-green-600 dark:text-green-400'
        };
      case 'red':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800',
          text: 'text-red-800 dark:text-red-200',
          value: 'text-red-600 dark:text-red-400'
        };
      case 'blue':
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          border: 'border-blue-200 dark:border-blue-800',
          text: 'text-blue-800 dark:text-blue-200',
          value: 'text-blue-600 dark:text-blue-400'
        };
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-900/20',
          border: 'border-gray-200 dark:border-gray-800',
          text: 'text-gray-800 dark:text-gray-200',
          value: 'text-gray-600 dark:text-gray-400'
        };
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Expected Impact
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric) => {
          const colors = getColorClasses(metric.color);
          const displayValue = typeof metric.value === 'number' 
            ? `${metric.value > 0 ? '+' : ''}${metric.value}${metric.unit}`
            : metric.value;

          return (
            <div 
              key={metric.label} 
              className={`p-4 rounded-lg border ${colors.bg} ${colors.border}`}
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{metric.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium ${colors.text}`}>
                    {metric.label}
                  </div>
                  <div className={`text-lg font-bold ${colors.value}`}>
                    {displayValue}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DiffView({ beforeCode, afterCode }: { beforeCode: string; afterCode: string }) {
  const [showDiff, setShowDiff] = useState(false);

  // Simple diff implementation - highlights changed lines
  const generateDiff = () => {
    const beforeLines = beforeCode.split('\n');
    const afterLines = afterCode.split('\n');
    const maxLines = Math.max(beforeLines.length, afterLines.length);
    
    const diff = [];
    for (let i = 0; i < maxLines; i++) {
      const beforeLine = beforeLines[i] || '';
      const afterLine = afterLines[i] || '';
      
      if (beforeLine !== afterLine) {
        if (beforeLine) {
          diff.push({ type: 'removed', content: beforeLine, lineNumber: i + 1 });
        }
        if (afterLine) {
          diff.push({ type: 'added', content: afterLine, lineNumber: i + 1 });
        }
      } else if (beforeLine) {
        diff.push({ type: 'unchanged', content: beforeLine, lineNumber: i + 1 });
      }
    }
    
    return diff;
  };

  const diff = showDiff ? generateDiff() : [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Code Comparison
        </h4>
        <button
          onClick={() => setShowDiff(!showDiff)}
          className="flex items-center space-x-2 px-3 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          <span>{showDiff ? '📊' : '🔍'}</span>
          <span>{showDiff ? 'Side by Side' : 'Show Diff'}</span>
        </button>
      </div>

      {showDiff ? (
        <div className="bg-gray-900 text-gray-100 rounded-lg overflow-hidden">
          <div className="p-4 overflow-x-auto">
            <pre className="text-sm font-mono">
              {diff.map((line, index) => (
                <div 
                  key={index}
                  className={`flex ${
                    line.type === 'removed' ? 'bg-red-900/30' : 
                    line.type === 'added' ? 'bg-green-900/30' : ''
                  }`}
                >
                  <span className="w-8 text-gray-500 text-right mr-4 select-none">
                    {line.lineNumber}
                  </span>
                  <span className={`${
                    line.type === 'removed' ? 'text-red-300' : 
                    line.type === 'added' ? 'text-green-300' : 'text-gray-100'
                  }`}>
                    {line.type === 'removed' && '- '}
                    {line.type === 'added' && '+ '}
                    {line.content}
                  </span>
                </div>
              ))}
            </pre>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CodeBlock
            code={beforeCode}
            title="Current Implementation"
            status="before"
          />
          <CodeBlock
            code={afterCode}
            title="Optimized Version"
            status="after"
          />
        </div>
      )}
    </div>
  );
}

function ImplementationSteps({ title }: { title: string }) {
  const getSteps = (optimizationType: string) => {
    // Generate context-appropriate implementation steps
    if (optimizationType.includes('Text') || optimizationType.includes('Keyword')) {
      return [
        {
          step: 1,
          title: 'Identify Fields for Conversion',
          description: 'Review your current text fields and identify which ones are used only for exact matching, filtering, or aggregations.',
          action: 'Analyze your query patterns and field usage'
        },
        {
          step: 2,
          title: 'Update Index Mapping',
          description: 'Modify your index template or mapping to change the field type from text to keyword.',
          action: 'PUT /your-index/_mapping with the new field type'
        },
        {
          step: 3,
          title: 'Reindex Data',
          description: 'Reindex your data to apply the new mapping. Use the reindex API for zero-downtime migration.',
          action: 'POST /_reindex with source and destination indices'
        },
        {
          step: 4,
          title: 'Update Applications',
          description: 'Update your application queries to use term queries instead of match queries for the converted fields.',
          action: 'Change match queries to term queries in your code'
        },
        {
          step: 5,
          title: 'Monitor Performance',
          description: 'Monitor indexing and query performance to verify the optimization benefits.',
          action: 'Check cluster stats and query performance metrics'
        }
      ];
    } else if (optimizationType.includes('Nested') || optimizationType.includes('Flatten')) {
      return [
        {
          step: 1,
          title: 'Analyze Nested Structure',
          description: 'Document your current nested object structure and understand the relationships that need to be preserved.',
          action: 'Map out object hierarchy and query requirements'
        },
        {
          step: 2,
          title: 'Design Flat Structure',
          description: 'Design a flattened version using dot notation or other techniques to maintain data relationships.',
          action: 'Create new field naming schema with dot notation'
        },
        {
          step: 3,
          title: 'Transform Data',
          description: 'Write data transformation logic to convert nested objects to flat structure before indexing.',
          action: 'Implement data transformation in your indexing pipeline'
        },
        {
          step: 4,
          title: 'Update Mapping',
          description: 'Create new index mapping that reflects the flattened structure.',
          action: 'Define new mapping without nested field types'
        },
        {
          step: 5,
          title: 'Update Queries',
          description: 'Modify your queries to work with the new flat structure using dot notation field names.',
          action: 'Replace nested queries with standard field queries'
        }
      ];
    } else {
      return [
        {
          step: 1,
          title: 'Assess Current State',
          description: 'Analyze your current implementation and identify specific areas for optimization.',
          action: 'Review field usage patterns and performance metrics'
        },
        {
          step: 2,
          title: 'Plan Changes',
          description: 'Create a detailed plan for implementing the optimization with minimal disruption.',
          action: 'Document changes and create rollback strategy'
        },
        {
          step: 3,
          title: 'Test in Development',
          description: 'Implement and test the changes in a development environment first.',
          action: 'Create test index and validate performance improvements'
        },
        {
          step: 4,
          title: 'Deploy Gradually',
          description: 'Roll out changes gradually, monitoring performance and functionality at each step.',
          action: 'Use blue-green deployment or rolling updates'
        },
        {
          step: 5,
          title: 'Monitor Results',
          description: 'Continuously monitor the impact of changes and fine-tune as necessary.',
          action: 'Track performance metrics and user feedback'
        }
      ];
    }
  };

  const steps = getSteps(title);

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Implementation Steps
      </h4>
      
      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.step} className="flex space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {step.step}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                {step.title}
              </h5>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {step.description}
              </p>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded p-2">
                <div className="text-xs font-medium text-indigo-800 dark:text-indigo-200 mb-1">
                  Action Required:
                </div>
                <div className="text-xs text-indigo-700 dark:text-indigo-300 font-mono">
                  {step.action}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ComparisonView({ title, beforeCode, afterCode, description, expectedImprovement }: ComparisonViewProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>

      {/* Code Comparison */}
      <DiffView beforeCode={beforeCode} afterCode={afterCode} />

      {/* Impact Metrics */}
      <ImpactMetrics expectedImprovement={expectedImprovement} />

      {/* Implementation Guide */}
      <ImplementationSteps title={title} />

      {/* Additional Resources */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
          📚 Additional Resources
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <a
            href="https://opensearch.org/docs/latest/field-types/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 p-3 bg-white dark:bg-blue-800/20 border border-blue-200 dark:border-blue-700 rounded hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
          >
            <span>📖</span>
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
              OpenSearch Field Types Guide
            </span>
          </a>
          <a
            href="https://opensearch.org/docs/latest/api-reference/index-apis/reindex/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 p-3 bg-white dark:bg-blue-800/20 border border-blue-200 dark:border-blue-700 rounded hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
          >
            <span>🔄</span>
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Reindex API Documentation
            </span>
          </a>
          <a
            href="https://opensearch.org/docs/latest/tuning-your-cluster/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 p-3 bg-white dark:bg-blue-800/20 border border-blue-200 dark:border-blue-700 rounded hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
          >
            <span>⚡</span>
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Performance Tuning Guide
            </span>
          </a>
          <a
            href="https://opensearch.org/docs/latest/query-dsl/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 p-3 bg-white dark:bg-blue-800/20 border border-blue-200 dark:border-blue-700 rounded hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
          >
            <span>🔍</span>
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Query DSL Reference
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}