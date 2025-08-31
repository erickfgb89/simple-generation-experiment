
interface JsonInputProps {
  value: string;
  onChange: (value: string) => void;
  onAnalyze: () => void;
  onReset: () => void;
  isAnalyzing: boolean;
  error: string;
}

const sampleJson = `{
  "user": {
    "id": 12345,
    "name": "John Doe",
    "email": "john@example.com",
    "profile": {
      "age": 30,
      "location": "San Francisco",
      "interests": ["technology", "hiking", "photography"]
    },
    "orders": [
      {
        "id": "order-001",
        "date": "2024-01-15",
        "items": ["laptop", "mouse"],
        "total": 1299.99
      }
    ]
  }
}`;

export function JsonInput({ value, onChange, onAnalyze, onReset, isAnalyzing, error }: JsonInputProps) {
  const loadSample = () => {
    onChange(sampleJson);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">JSON Document Input</h2>
      
      <div className="space-y-4">
        {/* Textarea for JSON input */}
        <div>
          <label htmlFor="json-input" className="block text-sm font-medium text-gray-700 mb-2">
            Paste your JSON document here:
          </label>
          <textarea
            id="json-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-64 p-3 border border-gray-300 rounded-md font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
            placeholder="Enter JSON document to analyze..."
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex space-x-3">
          <button
            onClick={onAnalyze}
            disabled={isAnalyzing || !value.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <span>Analyze Document</span>
            )}
          </button>

          <button
            onClick={loadSample}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 border border-gray-300"
          >
            Load Sample
          </button>

          <button
            onClick={onReset}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 border border-gray-300"
          >
            Reset
          </button>
        </div>

        {/* Helper text */}
        <div className="text-sm text-gray-600">
          <p>The analyzer will evaluate your JSON document for:</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Field types and their OpenSearch mapping complexity</li>
            <li>Document structure and nesting depth</li>
            <li>Estimated storage requirements</li>
            <li>Indexing performance implications</li>
          </ul>
        </div>
      </div>
    </div>
  );
}