import { useState } from 'react';
import { JsonInput } from './components/JsonInput';
import { AnalysisResults } from './components/AnalysisResults';
import { analyzeDocument } from './analysis/analyzer';
import type { AnalysisResult } from './types';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!jsonInput.trim()) {
      setError('Please enter some JSON to analyze');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      const parsedJson = JSON.parse(jsonInput);
      const result = analyzeDocument(parsedJson);
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
          <h1 className="text-3xl font-bold text-gray-900">
            OpenSearch Document Complexity Analyzer
          </h1>
          <p className="text-gray-600 mt-2">
            Analyze JSON documents to predict OpenSearch indexing complexity and storage requirements
          </p>
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