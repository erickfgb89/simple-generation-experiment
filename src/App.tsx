import { useState } from 'react';
import { JsonInput } from './components/JsonInput';
import { AnalysisResults } from './components/AnalysisResultsSimple';
import { analyzeDocument } from './analysis/analyzer';
import type { AnalysisResult } from './types';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [useCase, setUseCase] = useState<'general' | 'analytics' | 'logging' | 'ecommerce' | 'monitoring'>('general');

  const handleAnalyze = async () => {
    if (!jsonInput.trim()) {
      setError('Please enter some JSON to analyze');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      const parsedJson = JSON.parse(jsonInput);
      const result = analyzeDocument(parsedJson, useCase);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setJsonInput('');
    setAnalysis(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                OpenSearch Document Complexity Analyzer
              </h1>
              <p className="text-gray-600 mt-2">
                Advanced scoring system with performance predictions and comparative analysis
              </p>
            </div>
            <div className="text-right">
              <label htmlFor="useCase" className="block text-sm font-medium text-gray-700 mb-1">
                Use Case Profile
              </label>
              <select
                id="useCase"
                value={useCase}
                onChange={(e) => setUseCase(e.target.value as typeof useCase)}
                className="block w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              >
                <option value="general">General Purpose</option>
                <option value="analytics">Analytics</option>
                <option value="logging">Logging</option>
                <option value="ecommerce">E-commerce</option>
                <option value="monitoring">Monitoring</option>
              </select>
              <div className="text-xs text-gray-500 mt-1">
                Scoring weights optimized for use case
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-4">
            <JsonInput
              value={jsonInput}
              onChange={setJsonInput}
              onAnalyze={handleAnalyze}
              onReset={handleReset}
              isAnalyzing={isAnalyzing}
              error={error}
            />
          </div>

          {/* Results Section */}
          <div>
            {analysis && <AnalysisResults analysis={analysis} />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;