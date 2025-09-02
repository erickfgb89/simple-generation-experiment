import { useState } from 'react';
import type { AnalysisResult } from '../../types';
import { ComparisonView } from './ComparisonView';

interface OptimizationSectionProps {
  analysis: AnalysisResult;
}

interface OptimizationRecommendation {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  impact: string;
  effort: 'low' | 'medium' | 'high';
  description: string;
  implementation: string;
  expectedImprovement: {
    complexity: number;
    storage: number;
    performance: string;
  };
  beforeExample?: string;
  afterExample?: string;
  documentation?: string;
}

function generateOptimizationRecommendations(analysis: AnalysisResult): OptimizationRecommendation[] {
  const recommendations: OptimizationRecommendation[] = [];

  // Text field optimization
  if (analysis.fieldTypes.text > 5) {
    recommendations.push({
      id: 'text-to-keyword',
      title: 'Convert Text Fields to Keyword Where Appropriate',
      priority: 'high',
      impact: 'Significant reduction in indexing overhead',
      effort: 'low',
      description: `You have ${analysis.fieldTypes.text} text fields. Many may not need full-text search capabilities and could be converted to keyword fields for exact matching and aggregations.`,
      implementation: 'Review each text field and determine if full-text search is needed. Convert ID fields, status fields, and exact-match fields to keyword type.',
      expectedImprovement: {
        complexity: -2,
        storage: -15,
        performance: '40% faster indexing'
      },
      beforeExample: '"status": {"type": "text"}',
      afterExample: '"status": {"type": "keyword"}',
      documentation: 'https://opensearch.org/docs/latest/field-types/supported-field-types/keyword/'
    });
  }

  // Nested object optimization
  if (analysis.fieldTypes.nested > 0) {
    recommendations.push({
      id: 'flatten-nested',
      title: 'Flatten Nested Objects',
      priority: 'high',
      impact: 'Major storage and query performance improvement',
      effort: 'high',
      description: `${analysis.fieldTypes.nested} nested objects create separate Lucene documents, significantly increasing storage and complexity.`,
      implementation: 'Restructure nested objects into flat fields with dot notation or consider if the nested relationship is truly necessary.',
      expectedImprovement: {
        complexity: -3,
        storage: -30,
        performance: '60% better query performance'
      },
      beforeExample: '"user": {"type": "nested", "properties": {...}}',
      afterExample: '"user.name": {"type": "keyword"}, "user.age": {"type": "integer"}',
      documentation: 'https://opensearch.org/docs/latest/field-types/supported-field-types/nested/'
    });
  }

  // Deep nesting optimization
  if (analysis.maxDepth > 5) {
    recommendations.push({
      id: 'reduce-depth',
      title: 'Reduce Object Nesting Depth',
      priority: 'medium',
      impact: 'Reduced memory usage and improved processing speed',
      effort: 'medium',
      description: `Objects are nested ${analysis.maxDepth} levels deep. Flattening can improve performance and simplify queries.`,
      implementation: 'Restructure deeply nested objects into flatter structures. Consider if all nesting levels are necessary.',
      expectedImprovement: {
        complexity: -1,
        storage: -10,
        performance: '20% less memory usage'
      },
      documentation: 'https://opensearch.org/docs/latest/field-types/supported-field-types/object/'
    });
  }

  // Field count optimization
  if (analysis.fieldCount > 100) {
    recommendations.push({
      id: 'reduce-fields',
      title: 'Reduce Field Count',
      priority: 'medium',
      impact: 'Prevention of field explosion and improved memory efficiency',
      effort: 'medium',
      description: `${analysis.fieldCount} fields detected. High field counts can cause mapping explosion and memory issues.`,
      implementation: 'Review all fields and remove unused ones. Consider consolidating similar fields or using dynamic mapping sparingly.',
      expectedImprovement: {
        complexity: -1,
        storage: -20,
        performance: 'Better memory efficiency'
      },
      documentation: 'https://opensearch.org/docs/latest/field-types/'
    });
  }

  // Numeric field optimization
  const numericFields = analysis.fieldTypes.long + analysis.fieldTypes.integer + analysis.fieldTypes.double + analysis.fieldTypes.float;
  if (numericFields > 0) {
    recommendations.push({
      id: 'optimize-numeric-types',
      title: 'Optimize Numeric Field Types',
      priority: 'low',
      impact: 'Minor storage optimization',
      effort: 'low',
      description: 'Review numeric field types to ensure you\'re using the most storage-efficient types for your data ranges.',
      implementation: 'Use integer instead of long for values < 2^31, use float instead of double for lower precision needs.',
      expectedImprovement: {
        complexity: 0,
        storage: -5,
        performance: '5-10% storage savings'
      },
      beforeExample: '"count": {"type": "long"}',
      afterExample: '"count": {"type": "integer"}',
      documentation: 'https://opensearch.org/docs/latest/field-types/supported-field-types/numeric/'
    });
  }

  // Multi-field optimization
  if (analysis.fieldTypes.text > 0 && analysis.fieldTypes.keyword > 0) {
    recommendations.push({
      id: 'use-multifields',
      title: 'Implement Multi-Field Mapping',
      priority: 'medium',
      impact: 'Better query flexibility without duplication',
      effort: 'low',
      description: 'Use multi-field mapping to have both text (for search) and keyword (for aggregations) on the same field.',
      implementation: 'Configure text fields with a keyword sub-field for exact matching and aggregations.',
      expectedImprovement: {
        complexity: 0,
        storage: -5,
        performance: 'Better query options'
      },
      beforeExample: '"title": {"type": "text"}',
      afterExample: '"title": {"type": "text", "fields": {"keyword": {"type": "keyword"}}}',
      documentation: 'https://opensearch.org/docs/latest/field-types/supported-field-types/text/#multi-field-mapping'
    });
  }

  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
}

function OptimizationCard({ recommendation, onViewComparison }: { 
  recommendation: OptimizationRecommendation; 
  onViewComparison: (rec: OptimizationRecommendation) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const priorityColors = {
    high: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      badge: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200',
      text: 'text-red-800 dark:text-red-200'
    },
    medium: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      badge: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200',
      text: 'text-yellow-800 dark:text-yellow-200'
    },
    low: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200',
      text: 'text-blue-800 dark:text-blue-200'
    }
  };

  const effortColors = {
    low: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
    medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200',
    high: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
  };

  return (
    <div className={`p-6 rounded-lg border ${priorityColors[recommendation.priority].bg} ${priorityColors[recommendation.priority].border}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h4 className={`text-lg font-semibold ${priorityColors[recommendation.priority].text} mb-2`}>
            {recommendation.title}
          </h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {recommendation.description}
          </p>
        </div>
        <div className="flex flex-col space-y-2 ml-4">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[recommendation.priority].badge}`}>
            {recommendation.priority} priority
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${effortColors[recommendation.effort]}`}>
            {recommendation.effort} effort
          </span>
        </div>
      </div>

      {/* Impact Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100 mb-1">Expected Impact</div>
            <div className="text-gray-600 dark:text-gray-400">{recommendation.impact}</div>
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100 mb-1">Performance Gain</div>
            <div className="text-gray-600 dark:text-gray-400">{recommendation.expectedImprovement.performance}</div>
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100 mb-1">Storage Reduction</div>
            <div className="text-gray-600 dark:text-gray-400">{recommendation.expectedImprovement.storage}%</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          <span>📋</span>
          <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
        </button>
        
        {recommendation.beforeExample && recommendation.afterExample && (
          <button
            onClick={() => onViewComparison(recommendation)}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            <span>🔍</span>
            <span>Compare Before/After</span>
          </button>
        )}
        
        {recommendation.documentation && (
          <a
            href={recommendation.documentation}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            <span>📖</span>
            <span>Documentation</span>
          </a>
        )}
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-current border-opacity-20 space-y-4 animate-fade-in-scale">
          <div>
            <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Implementation Guide</h5>
            <p className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-3 rounded border-l-4 border-indigo-500">
              {recommendation.implementation}
            </p>
          </div>
          
          {recommendation.beforeExample && recommendation.afterExample && (
            <div>
              <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Code Example</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-red-600 dark:text-red-400 font-medium mb-2">❌ Before (Current)</div>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
                    <code>{recommendation.beforeExample}</code>
                  </pre>
                </div>
                <div>
                  <div className="text-xs text-green-600 dark:text-green-400 font-medium mb-2">✅ After (Optimized)</div>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
                    <code>{recommendation.afterExample}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded border-l-4 border-green-500">
            <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Expected Improvements</h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-green-600 dark:text-green-400">📊</span>
                <span className="text-gray-700 dark:text-gray-300">
                  Complexity: {recommendation.expectedImprovement.complexity > 0 ? '+' : ''}{recommendation.expectedImprovement.complexity}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-600 dark:text-blue-400">💾</span>
                <span className="text-gray-700 dark:text-gray-300">
                  Storage: {recommendation.expectedImprovement.storage > 0 ? '+' : ''}{recommendation.expectedImprovement.storage}%
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-purple-600 dark:text-purple-400">⚡</span>
                <span className="text-gray-700 dark:text-gray-300">
                  Performance: {recommendation.expectedImprovement.performance}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function OptimizationSummary({ recommendations }: { recommendations: OptimizationRecommendation[] }) {
  const totalComplexityReduction = recommendations.reduce((sum, rec) => sum + Math.abs(rec.expectedImprovement.complexity), 0);
  const totalStorageReduction = recommendations.reduce((sum, rec) => sum + Math.abs(rec.expectedImprovement.storage), 0);
  
  const priorityCounts = recommendations.reduce((acc, rec) => {
    acc[rec.priority]++;
    return acc;
  }, { high: 0, medium: 0, low: 0 });

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-indigo-900 dark:text-indigo-100 mb-4">
        🚀 Optimization Summary
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            {recommendations.length}
          </div>
          <div className="text-sm text-indigo-700 dark:text-indigo-300">
            Total Recommendations
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            -{totalComplexityReduction}
          </div>
          <div className="text-sm text-indigo-700 dark:text-indigo-300">
            Complexity Reduction
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            -{totalStorageReduction}%
          </div>
          <div className="text-sm text-indigo-700 dark:text-indigo-300">
            Storage Savings
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {priorityCounts.high}
          </div>
          <div className="text-sm text-indigo-700 dark:text-indigo-300">
            High Priority Items
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-indigo-700 dark:text-indigo-300 mb-4">
          Implementing these optimizations can significantly improve your OpenSearch performance and reduce operational costs.
        </p>
        <div className="flex justify-center space-x-4 text-sm">
          <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-full">
            {priorityCounts.high} High Priority
          </span>
          <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full">
            {priorityCounts.medium} Medium Priority
          </span>
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full">
            {priorityCounts.low} Low Priority
          </span>
        </div>
      </div>
    </div>
  );
}

export function OptimizationSection({ analysis }: OptimizationSectionProps) {
  const [selectedRecommendation, setSelectedRecommendation] = useState<OptimizationRecommendation | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  
  const recommendations = generateOptimizationRecommendations(analysis);

  const handleViewComparison = (recommendation: OptimizationRecommendation) => {
    setSelectedRecommendation(recommendation);
    setShowComparison(true);
  };

  if (recommendations.length === 0) {
    return (
      <div className="space-y-6">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">
            Already Optimized!
          </h3>
          <p className="text-green-700 dark:text-green-300 mb-4">
            Your document structure is already well-optimized for OpenSearch. No major optimizations are needed at this time.
          </p>
          <div className="text-sm text-green-600 dark:text-green-400">
            Continue monitoring your index as it grows to ensure optimal performance.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <OptimizationSummary recommendations={recommendations} />
      
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Detailed Recommendations
        </h3>
        
        {recommendations.map((recommendation) => (
          <OptimizationCard
            key={recommendation.id}
            recommendation={recommendation}
            onViewComparison={handleViewComparison}
          />
        ))}
      </div>

      {/* Comparison Modal */}
      {showComparison && selectedRecommendation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Before/After Comparison: {selectedRecommendation.title}
                </h3>
                <button
                  onClick={() => setShowComparison(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <ComparisonView
                title={selectedRecommendation.title}
                beforeCode={selectedRecommendation.beforeExample || ''}
                afterCode={selectedRecommendation.afterExample || ''}
                description={selectedRecommendation.description}
                expectedImprovement={selectedRecommendation.expectedImprovement}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}