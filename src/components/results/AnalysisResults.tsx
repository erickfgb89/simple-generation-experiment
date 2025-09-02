import { useState } from 'react';
import type { AnalysisResult } from '../../types';
import { ResultsOverview } from './ResultsOverview';
import { FieldAnalysisSection } from './FieldAnalysisSection';
import { PerformanceSection } from './PerformanceSection';
import { OptimizationSection } from './OptimizationSection';
import { ExportPanel } from './ExportPanel';

interface AnalysisResultsProps {
  analysis: AnalysisResult;
}

type ResultsTab = 'overview' | 'fields' | 'performance' | 'optimization';

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState<ResultsTab>('overview');
  const [showExportPanel, setShowExportPanel] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'fields', label: 'Field Analysis', icon: '🔍' },
    { id: 'performance', label: 'Performance', icon: '⚡' },
    { id: 'optimization', label: 'Optimization', icon: '🚀' },
  ] as const;

  const getScoreColor = (score: number): string => {
    if (score <= 3) return 'text-green-600 dark:text-green-400';
    if (score <= 6) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBg = (score: number): string => {
    if (score <= 3) return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
    if (score <= 6) return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
    return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ResultsOverview analysis={analysis} />;
      case 'fields':
        return <FieldAnalysisSection analysis={analysis} />;
      case 'performance':
        return <PerformanceSection analysis={analysis} />;
      case 'optimization':
        return <OptimizationSection analysis={analysis} />;
      default:
        return <ResultsOverview analysis={analysis} />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      {/* Header with Overall Score */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Analysis Results
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Comprehensive OpenSearch document complexity analysis
            </p>
          </div>
          
          {/* Overall Score Badge */}
          <div className={`flex items-center space-x-4 p-4 rounded-lg border ${getScoreBg(analysis.complexityScore)}`}>
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(analysis.complexityScore)}`}>
                {analysis.complexityScore}/10
              </div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Complexity Score
              </div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(analysis.indexSizeScore)}`}>
                {analysis.indexSizeScore}/10
              </div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Storage Impact
              </div>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setShowExportPanel(!showExportPanel)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            📤 Export Results
          </button>
        </div>

        {/* Export Panel */}
        {showExportPanel && (
          <div className="mt-4 animate-fade-in-scale">
            <ExportPanel 
              analysis={analysis} 
              onClose={() => setShowExportPanel(false)}
            />
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-0 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-shrink-0 flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors
                ${activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }
              `}
            >
              <span className="text-base">{tab.icon}</span>
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <div key={activeTab} className="animate-fade-in-scale">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}