import { useState } from 'react';
import type { AnalysisResult, FieldAnalysis } from '../../types';
import { FieldTypeChart, FieldComplexityList } from '../charts/SimpleCharts';

interface FieldAnalysisSectionProps {
  analysis: AnalysisResult;
}

interface FieldTableProps {
  fields: FieldAnalysis[];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
}

function FieldTable({ fields, sortBy, sortOrder, onSort }: FieldTableProps) {
  const getSortIcon = (field: string) => {
    if (sortBy !== field) return '↕️';
    return sortOrder === 'asc' ? '⬆️' : '⬇️';
  };

  const getComplexityColor = (complexity: number) => {
    if (complexity <= 1) return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
    if (complexity <= 3) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
    return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text': return '📝';
      case 'keyword': return '🔑';
      case 'long': return '🔢';
      case 'integer': return '🔢';
      case 'double': return '🔢';
      case 'float': return '🔢';
      case 'date': return '📅';
      case 'boolean': return '☑️';
      case 'object': return '📦';
      case 'nested': return '🔗';
      default: return '📄';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => onSort('path')}
              >
                <div className="flex items-center space-x-1">
                  <span>Field Path</span>
                  <span className="text-sm">{getSortIcon('path')}</span>
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => onSort('type')}
              >
                <div className="flex items-center space-x-1">
                  <span>Type</span>
                  <span className="text-sm">{getSortIcon('type')}</span>
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => onSort('depth')}
              >
                <div className="flex items-center space-x-1">
                  <span>Depth</span>
                  <span className="text-sm">{getSortIcon('depth')}</span>
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => onSort('complexity')}
              >
                <div className="flex items-center space-x-1">
                  <span>Complexity</span>
                  <span className="text-sm">{getSortIcon('complexity')}</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Properties
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {fields.map((field, index) => (
              <tr key={`${field.path}-${index}`} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100 font-mono">
                    {field.path}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className="text-base">{getTypeIcon(field.type)}</span>
                    <span className="text-sm text-gray-900 dark:text-gray-100 capitalize">
                      {field.type}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900 dark:text-gray-100">
                    {field.depth}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getComplexityColor(field.complexity)}`}>
                    {field.complexity.toFixed(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    {field.isArray && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                        Array
                      </span>
                    )}
                    {field.depth > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200">
                        Deep
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FieldTypeBreakdown({ analysis }: { analysis: AnalysisResult }) {
  const typeData = Object.entries(analysis.fieldTypes).filter(([_, count]) => count > 0);
  const total = typeData.reduce((sum, [_, count]) => sum + count, 0);

  const getTypeDescription = (type: string): string => {
    const descriptions: Record<string, string> = {
      'text': 'Full-text searchable fields with high processing overhead for analysis and tokenization',
      'keyword': 'Exact-match fields, fastest for filtering and aggregations, minimal processing overhead',
      'long': '64-bit integers, optimized storage for large numeric values',
      'integer': '32-bit integers, efficient for most numeric use cases',
      'double': '64-bit floating point numbers for high precision calculations',
      'float': '32-bit floating point numbers, good balance of precision and storage',
      'date': 'Timestamp fields optimized for temporal queries and date range filtering',
      'boolean': 'Simple true/false values, most storage-efficient field type',
      'object': 'Nested structures flattened into dot-notation fields',
      'nested': 'Separate Lucene documents maintaining object relationships, high overhead'
    };
    return descriptions[type] || 'Standard field type with moderate processing requirements';
  };

  const getImpactLevel = (type: string, count: number): 'low' | 'medium' | 'high' => {
    if (type === 'text' && count > 5) return 'high';
    if (type === 'nested' && count > 0) return 'high';
    if (type === 'object' && count > 10) return 'medium';
    if (count > total * 0.3) return 'medium';
    return 'low';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Field Type Analysis
      </h3>
      <div className="space-y-3">
        {typeData.map(([type, count]) => {
          const percentage = ((count / total) * 100).toFixed(1);
          const impact = getImpactLevel(type, count);
          const impactColors = {
            low: 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10',
            medium: 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/10',
            high: 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10'
          };
          
          return (
            <div key={type} className={`p-4 rounded-lg border ${impactColors[impact]} transition-colors`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900 dark:text-gray-100 capitalize text-lg">
                    {type}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({count} fields, {percentage}%)
                  </span>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  impact === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200' :
                  impact === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200' :
                  'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                }`}>
                  {impact} impact
                </span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {getTypeDescription(type)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function FieldAnalysisSection({ analysis }: FieldAnalysisSectionProps) {
  const [sortBy, setSortBy] = useState('complexity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  // Filter and sort fields
  let filteredFields = analysis.fields || [];
  
  if (searchTerm) {
    filteredFields = filteredFields.filter(field => 
      field.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      field.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  filteredFields = [...filteredFields].sort((a, b) => {
    let aValue: any = a[sortBy as keyof FieldAnalysis];
    let bValue: any = b[sortBy as keyof FieldAnalysis];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const displayFields = showAll ? filteredFields : filteredFields.slice(0, 20);

  return (
    <div className="space-y-8">
      {/* Field Type Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FieldTypeChart analysis={analysis} />
        <FieldComplexityList analysis={analysis} fields={analysis.fields} />
      </div>

      {/* Field Type Breakdown */}
      <FieldTypeBreakdown analysis={analysis} />

      {/* Field Details Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Field Details ({filteredFields.length} fields)
          </h3>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search fields..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {filteredFields.length > 20 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-3 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              >
                {showAll ? 'Show Less' : `Show All ${filteredFields.length}`}
              </button>
            )}
          </div>
        </div>

        <FieldTable
          fields={displayFields}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
        />

        {!showAll && filteredFields.length > 20 && (
          <div className="text-center">
            <button
              onClick={() => setShowAll(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
            >
              Load More Fields ({filteredFields.length - 20} remaining)
            </button>
          </div>
        )}
      </div>

      {/* Field Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {analysis.fieldCount}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Fields</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {Object.values(analysis.fieldTypes).filter(c => c > 0).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Field Types</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {analysis.maxDepth}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Max Depth</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {analysis.fields?.filter(f => f.isArray).length || 0}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Array Fields</div>
        </div>
      </div>
    </div>
  );
}