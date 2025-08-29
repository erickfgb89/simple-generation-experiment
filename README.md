# OpenSearch Complexity Analyzer

A beautiful TypeScript application that analyzes JSON documents against OpenSearch's indexing algorithm to provide insights into indexing complexity and resource usage.

## Features

🔍 **Document Analysis**: Analyzes JSON structure and maps fields to OpenSearch field types
📊 **Visual Reports**: Interactive charts showing field type distribution and complexity breakdown  
📋 **Detailed Tables**: Field-by-field analysis with complexity and storage impact scores
⚡ **Performance Insights**: Index size and complexity scores based on OpenSearch indexing logic
💡 **Optimization Recommendations**: Actionable suggestions to improve indexing performance

## OpenSearch Analysis Factors

This application analyzes documents based on real OpenSearch indexing characteristics:

### Field Types & Complexity
- **Text fields**: High complexity due to analysis, tokenization, and inverted index creation
- **Keyword fields**: Lower complexity, stored as-is for exact matching
- **Numeric fields**: Optimized storage with doc values for aggregations
- **Date fields**: Special handling for time-based queries and range searches
- **Nested/Object fields**: Higher complexity due to nested document structures
- **Arrays**: Analyzed based on element types and cardinality

### Scoring Algorithm
- **Index Size Score**: Based on estimated storage requirements per field type
- **Complexity Score**: Considers text analysis, nested structures, field cardinality, and indexing costs
- **Limits Awareness**: Factors in OpenSearch limits (1000 fields, 20 depth, 50 nested objects)

### Recommendations Engine
- Field count optimization (mapping explosion prevention)
- Text vs keyword field suggestions
- Nested structure flattening recommendations
- High cardinality field warnings

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd opensearch-complexity-analyzer

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

Built files will be in the `dist/` directory.

## Usage

1. **Input JSON**: Paste your JSON document in the input textarea
2. **Analyze**: Click "Analyze Document" or press Ctrl/Cmd + Enter
3. **Review Results**: 
   - View Index Size Score and Complexity Score
   - Examine field type distribution chart
   - Review detailed field analysis table
   - Check complexity breakdown chart
   - Read optimization recommendations

## Example Documents to Test

### Simple E-commerce Product
```json
{
  "title": "Wireless Headphones",
  "price": 99.99,
  "inStock": true,
  "tags": ["audio", "wireless"]
}
```

### Complex Nested Document
```json
{
  "user": {
    "profile": {
      "personal": {
        "name": "John Doe",
        "contacts": [
          {"type": "email", "value": "john@example.com"},
          {"type": "phone", "value": "+1234567890"}
        ]
      }
    }
  },
  "metadata": {
    "tracking": {
      "events": [
        {"timestamp": "2024-01-01T00:00:00Z", "action": "created"},
        {"timestamp": "2024-01-02T00:00:00Z", "action": "updated"}
      ]
    }
  }
}
```

## Technology Stack

- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server
- **Chart.js**: Interactive data visualizations
- **Vanilla JavaScript**: No framework dependencies for maximum performance
- **CSS Grid & Flexbox**: Modern responsive layout
- **Custom CSS**: Beautiful gradient backgrounds and animations

## Architecture

```
src/
├── types.ts      # TypeScript type definitions
├── analyzer.ts   # Core OpenSearch analysis logic
├── visualizer.ts # Chart.js visualization components
└── main.ts       # Application initialization and UI logic
```

## OpenSearch Integration

The analysis is based on:
- OpenSearch official documentation
- Elasticsearch/OpenSearch mapping and field type specifications
- Performance optimization guides from OpenSearch community
- Real-world indexing cost analysis

## Development

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run typecheck` - Run TypeScript type checking

### Code Quality
- TypeScript strict mode enabled
- ESLint configuration for code consistency
- Responsive design for all screen sizes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run typecheck` to ensure TypeScript compliance
5. Test your changes with various JSON documents
6. Submit a pull request

## License

MIT License - See LICENSE file for details