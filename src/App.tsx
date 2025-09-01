import { useState, useEffect } from 'react';
import { JsonInput } from './components/JsonInput';
import { AnalysisResults } from './components/AnalysisResultsSimple';
import { DarkModeToggle } from './components/DarkModeToggle';
import { ProgressBar } from './components/LoadingIndicators';
import { ToastProvider, useToast, toast } from './components/Toast';
import { analyzeDocument } from './analysis/analyzer';
import type { AnalysisResult } from './types';

function AppContent() {
  const { addToast } = useToast();
  const [jsonInput, setJsonInput] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [useCase, setUseCase] = useState<'general' | 'analytics' | 'logging' | 'ecommerce' | 'monitoring'>('general');
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = async () => {
    if (!jsonInput.trim()) {
      setError('Please enter some JSON to analyze');
      return;
    }

    setIsAnalyzing(true);
    setError('');
    setAnalysisProgress(0);
    setShowResults(false);

    try {
      // Simulate analysis progress for better UX
      const progressSteps = [10, 25, 50, 75, 90, 100];
      
      for (const step of progressSteps) {
        setAnalysisProgress(step);
        await new Promise(resolve => setTimeout(resolve, step === 100 ? 500 : 150));
      }

      const parsedJson = JSON.parse(jsonInput);
      const result = analyzeDocument(parsedJson, useCase);
      setAnalysis(result);
      
      // Show success toast
      addToast(toast.success(
        'Analysis Complete!',
        `Document analyzed with ${result.complexityScore}/10 complexity score`,
        { duration: 4000 }
      ));
      
      // Delay showing results for smooth animation
      setTimeout(() => setShowResults(true), 100);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid JSON';
      setError(errorMessage);
      
      // Show error toast
      addToast(toast.error(
        'Analysis Failed',
        errorMessage,
        { duration: 6000 }
      ));
    } finally {
      setIsAnalyzing(false);
      setAnalysisProgress(0);
    }
  };

  const handleReset = () => {
    setJsonInput('');
    setAnalysis(null);
    setError('');
    setShowResults(false);
  };

  // Reset results visibility when analysis changes
  useEffect(() => {
    if (analysis) {
      setShowResults(true);
    }
  }, [analysis]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 transition-colors leading-tight">
                OpenSearch Document Complexity Analyzer
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 sm:mt-2 transition-colors">
                Advanced scoring system with performance predictions and comparative analysis
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="w-full sm:w-auto">
                <label htmlFor="useCase" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Use Case Profile
                </label>
                <select
                  id="useCase"
                  value={useCase}
                  onChange={(e) => setUseCase(e.target.value as typeof useCase)}
                  className="block w-full sm:w-40 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                >
                  <option value="general">General Purpose</option>
                  <option value="analytics">Analytics</option>
                  <option value="logging">Logging</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="monitoring">Monitoring</option>
                </select>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Scoring weights optimized for use case
                </div>
              </div>
              <div className="self-start sm:self-auto">
                <DarkModeToggle />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Input Section */}
          <div className="space-y-4 animate-slide-in-left">
            <JsonInput
              value={jsonInput}
              onChange={setJsonInput}
              onAnalyze={handleAnalyze}
              onReset={handleReset}
              isAnalyzing={isAnalyzing}
              error={error}
            />
            
            {/* Progress Bar */}
            {isAnalyzing && (
              <div className="animate-fade-in-scale">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      Analyzing document complexity...
                    </span>
                  </div>
                  <ProgressBar 
                    progress={analysisProgress} 
                    showPercentage={true}
                    className="mb-2"
                  />
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {analysisProgress < 30 && "Parsing JSON structure..."}
                    {analysisProgress >= 30 && analysisProgress < 60 && "Analyzing field types..."}
                    {analysisProgress >= 60 && analysisProgress < 90 && "Calculating complexity scores..."}
                    {analysisProgress >= 90 && "Generating recommendations..."}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="animate-slide-in-right">
            {analysis && showResults && (
              <div className="animate-card-appear">
                <AnalysisResults analysis={analysis} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;