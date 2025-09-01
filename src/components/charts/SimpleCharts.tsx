// Simplified chart components to avoid TypeScript complexity
import { AnalysisResult, FieldAnalysis } from '../../types';

interface ChartProps {
  analysis: AnalysisResult;
  fields?: FieldAnalysis[];
  className?: string;
}

export function FieldTypeChart({ analysis, className = '' }: ChartProps) {
  const types = Object.entries(analysis.fieldTypes).filter(([_, count]) => count > 0);
  const total = types.reduce((sum, [_, count]) => sum + count, 0);
  
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
  
  return (
    <div className={`bg-white p-4 rounded-lg border ${className}`}>
      <h3 className="text-lg font-semibold mb-4">Field Type Distribution</h3>
      <div className="space-y-2">
        {types.map(([type, count], index) => {
          const percentage = ((count / total) * 100).toFixed(1);
          return (
            <div key={type} className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <div className="flex-1 flex justify-between">
                <span className="capitalize font-medium">{type}</span>
                <span className="text-gray-600">{count} ({percentage}%)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ScoreCards({ analysis }: ChartProps) {
  const scores = [
    { name: 'Index Size', value: analysis.indexSizeScore, color: 'blue' },
    { name: 'Complexity', value: analysis.complexityScore, color: 'red' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {scores.map((score) => (
        <div key={score.name} className="bg-white p-6 rounded-lg border">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">{score.name} Score</h3>
            <span className="text-3xl font-bold text-gray-900">{score.value}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full bg-${score.color}-500`}
              style={{ width: `${(score.value / 10) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {score.value <= 3 ? 'Good' : score.value <= 6 ? 'Moderate' : 'High'} impact
          </p>
        </div>
      ))}
    </div>
  );
}

export function FieldComplexityList({ fields = [], className = '' }: ChartProps) {
  const sortedFields = fields.sort((a, b) => b.complexity - a.complexity).slice(0, 10);
  
  return (
    <div className={`bg-white p-4 rounded-lg border ${className}`}>
      <h3 className="text-lg font-semibold mb-4">Top Complex Fields</h3>
      <div className="space-y-2">
        {sortedFields.map((field) => (
          <div key={field.path} className="flex items-center justify-between p-2 rounded bg-gray-50">
            <div className="flex-1">
              <div className="font-medium text-sm truncate">{field.path}</div>
              <div className="text-xs text-gray-600 capitalize">{field.type}</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-sm font-medium">{field.complexity.toFixed(1)}</div>
              <div 
                className="w-12 h-2 bg-gray-200 rounded"
              >
                <div 
                  className="h-2 bg-red-500 rounded"
                  style={{ width: `${Math.min((field.complexity / 5) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MetricsGrid({ analysis }: ChartProps) {
  const metrics = [
    { 
      label: 'Total Fields', 
      value: analysis.fieldCount, 
      unit: '',
      limit: '1,000 recommended',
      description: 'Total number of fields detected in the document structure'
    },
    { 
      label: 'Max Depth', 
      value: analysis.maxDepth, 
      unit: 'levels',
      limit: '5 levels optimal',
      description: 'Maximum nesting depth of objects in the document'
    },
    { 
      label: 'Estimated Storage', 
      value: analysis.estimatedStorageMB, 
      unit: 'MB',
      limit: 'Includes replication overhead',
      description: 'Predicted storage requirements using OpenSearch formula'
    },
    { 
      label: 'Field Types', 
      value: Object.values(analysis.fieldTypes).filter(c => c > 0).length, 
      unit: 'types',
      limit: 'Variety impacts complexity',
      description: 'Number of different field types detected'
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-white p-4 rounded-lg border text-center" title={metric.description}>
          <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
          <div className="text-sm text-gray-600">{metric.label}</div>
          {metric.unit && <div className="text-xs text-gray-500">{metric.unit}</div>}
          <div className="text-xs text-gray-500 mt-1">
            {metric.limit}
          </div>
        </div>
      ))}
    </div>
  );
}