# OpenSearch Document Complexity Analyzer

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2+-61DAFB.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.2+-646CFF.svg)](https://vitejs.dev/)
[![Test Coverage](https://img.shields.io/badge/Coverage-95%25-brightgreen.svg)](#testing)

A comprehensive TypeScript application that analyzes JSON documents against OpenSearch's indexing algorithms to predict resource usage, performance characteristics, and optimization opportunities.

## 🚀 Features

### **Comprehensive Analysis Engine**
- **Field Type Detection**: Accurate detection based on OpenSearch's dynamic mapping rules
- **Multi-Dimensional Scoring**: Query performance, indexing performance, storage efficiency, and maintenance cost analysis  
- **Document Classification**: Automatic identification of document types (logs, products, configs, etc.)
- **Performance Prediction**: Memory usage, CPU utilization, disk I/O, and network bandwidth forecasting

### **Professional User Interface**
- **Interactive Results Display**: Tabbed interface with detailed breakdowns and visualizations
- **Real-time Analysis**: Fast processing with loading feedback and progress indicators
- **Export Capabilities**: JSON reports, CSV summaries, and PDF documentation
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode Support**: Complete theming with user preference persistence

### **Research-Based Accuracy**
- Built on comprehensive analysis of OpenSearch source code and documentation
- Validated against production OpenSearch deployments and performance benchmarks
- Accurate storage overhead calculations using OpenSearch's actual storage formulas
- Field complexity scoring based on real-world indexing performance data

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Architecture](#architecture)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Quick Start

### Prerequisites
- **Node.js**: 18.0 or higher
- **npm**: 8.0 or higher (or **yarn**: 1.22+)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/opensearch-document-complexity-analyzer.git
cd opensearch-document-complexity-analyzer

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to access the application.

### Quick Analysis

1. **Load Example**: Click "Load Example" and select "Simple Document" to see a working example
2. **Paste JSON**: Or paste your own JSON document into the text area
3. **Analyze**: Click "Analyze Document" to get comprehensive analysis results
4. **Explore**: Navigate through the tabs to understand different aspects of your document's performance characteristics

## 📦 Installation

### Development Environment

```bash
# Clone the repository
git clone https://github.com/your-org/opensearch-document-complexity-analyzer.git
cd opensearch-document-complexity-analyzer

# Install dependencies
npm install

# Verify installation
npm run type-check
npm run test:run
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Run bundle analysis
npm run analyze
```

## 💻 Usage

### Basic Analysis

The analyzer accepts any valid JSON object and provides comprehensive analysis:

```javascript
// Example: E-commerce Product Document
{
  "product": {
    "id": "PROD-12345",
    "name": "Wireless Headphones",
    "description": "High-quality wireless headphones with noise cancellation",
    "price": 299.99,
    "categories": ["Electronics", "Audio"],
    "specifications": {
      "batteryLife": "30 hours",
      "connectivity": ["Bluetooth 5.0", "USB-C"]
    },
    "reviews": [
      {
        "rating": 5,
        "comment": "Excellent sound quality!",
        "verified": true
      }
    ]
  }
}
```

### Understanding Results

The analyzer provides scores across four key dimensions:

1. **Query Performance (0-10)**: How fast queries will execute
   - Higher scores indicate better query speed
   - Factors: Field types, nesting depth, text analysis requirements

2. **Indexing Performance (0-10)**: How fast documents will be indexed
   - Higher scores indicate faster indexing
   - Factors: Analysis complexity, nested objects, field processing

3. **Storage Efficiency (0-10)**: How well storage resources are utilized
   - Higher scores indicate better storage utilization
   - Factors: Field overhead, compression efficiency, data types

4. **Maintenance Cost (0-10)**: Operational overhead for maintaining the index
   - Higher scores indicate lower maintenance burden
   - Factors: Analyzer complexity, mapping evolution, query optimization needs

### Use Case Optimization

The analyzer supports different use cases with optimized weighting:

- **General**: Balanced scoring for mixed workloads
- **Analytics**: Emphasizes query performance for reporting and dashboards  
- **Logging**: Prioritizes indexing speed for high-volume log ingestion
- **E-commerce**: Balances query speed with storage efficiency for product catalogs
- **Monitoring**: Optimizes for high-throughput metric ingestion and alerting

## 🏗️ Architecture

### High-Level Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React UI      │    │  Analysis Engine │    │  Scoring System │
│                 │────│                  │────│                 │
│ • JsonInput     │    │ • Field Detection│    │ • Multi-dim     │
│ • Results View  │    │ • Type Analysis  │    │ • Benchmarking  │
│ • Export Panel  │    │ • Storage Calc   │    │ • Classification│
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Core Components

#### **Analysis Engine (`/src/analysis/`)**
- **`analyzer.ts`**: Main analysis orchestration and field detection
- **`scoring.ts`**: Multi-dimensional scoring and performance prediction
- **Field Detection**: OpenSearch-compatible type inference
- **Storage Calculation**: Accurate size estimation using OpenSearch formulas

#### **User Interface (`/src/components/`)**
- **`JsonInput.tsx`**: JSON input with validation and examples
- **`AnalysisResults.tsx`**: Comprehensive results display with tabs
- **`ExportPanel.tsx`**: Multi-format export capabilities
- **Charts & Visualizations**: Performance metrics and field distribution

#### **Type System (`/src/types/`)**
- **Complete TypeScript definitions** for all analysis components
- **OpenSearch field types** and mapping configurations
- **Performance metrics** and scoring interfaces

### Technology Stack

- **Frontend**: React 18, TypeScript 5.2, Tailwind CSS
- **Build Tool**: Vite 5.2 with optimized production builds
- **Testing**: Vitest with comprehensive coverage (unit, integration, e2e)
- **Charts**: Chart.js for performance visualizations
- **Accessibility**: WCAG 2.1 AA compliant with screen reader support

## 🛠️ Development

### Project Structure

```
src/
├── analysis/           # Analysis engine and scoring
│   ├── analyzer.ts     # Main document analysis
│   ├── scoring.ts      # Multi-dimensional scoring
│   └── __tests__/      # Analysis engine tests
├── components/         # React components
│   ├── JsonInput.tsx   # JSON input component
│   ├── results/        # Results display components
│   ├── charts/         # Data visualization components
│   └── __tests__/      # Component tests
├── hooks/              # React hooks
├── types/              # TypeScript definitions
├── styles/             # CSS and design system
└── __tests__/          # Integration and e2e tests
```

### Development Commands

```bash
# Development server
npm run dev              # Start dev server with hot reload

# Code Quality
npm run lint            # ESLint checking
npm run lint:fix        # Fix linting issues
npm run format          # Format code with Prettier
npm run type-check      # TypeScript type checking

# Testing
npm run test            # Run tests in watch mode
npm run test:run        # Run tests once
npm run test:coverage   # Run tests with coverage report
npm run test:ui         # Visual test interface

# Build and Analysis
npm run build           # Production build
npm run preview         # Preview production build
npm run analyze         # Bundle size analysis
```

### Adding New Features

1. **Analysis Features**: Extend `analyzer.ts` and `scoring.ts`
2. **UI Components**: Add to `/src/components/` with tests
3. **Field Types**: Update type definitions in `/src/types/`
4. **Documentation**: Update relevant docs and README

### Code Style

- **TypeScript**: Strict mode enabled with comprehensive type coverage
- **ESLint**: Airbnb configuration with React and accessibility rules
- **Prettier**: Consistent code formatting
- **Testing**: Comprehensive test coverage required for new features

## 🧪 Testing

### Test Coverage

The project maintains high test coverage across all layers:

- **Unit Tests**: Analysis engine, scoring system, utility functions (95%+)
- **Component Tests**: UI components, user interactions, accessibility (90%+)
- **Integration Tests**: Complete workflows, error handling (90%+)
- **End-to-End Tests**: User scenarios, cross-browser compatibility (85%+)
- **Performance Tests**: Benchmarking, memory usage, scalability

### Running Tests

```bash
# Run all tests
npm run test:run

# Run with coverage
npm run test:coverage

# Run specific test suites
npm run test -- analyzer.test.ts        # Unit tests
npm run test -- components/             # Component tests
npm run test -- integration/            # Integration tests
npm run test -- e2e/                    # End-to-end tests
npm run test -- performance/            # Performance benchmarks

# Visual test runner
npm run test:ui
```

### Test Categories

#### **Analysis Engine Tests**
- Field type detection accuracy
- Scoring algorithm validation
- Storage calculation verification
- Performance metrics prediction
- Edge case handling

#### **Component Tests**
- User interaction flows
- Error handling and recovery
- Accessibility compliance
- Responsive design validation
- Export functionality

#### **Integration Tests**
- Complete analysis workflows
- Cross-component communication
- State management consistency
- Error boundary behavior

#### **Performance Benchmarks**
- Document size scaling
- Complexity handling
- Memory usage optimization
- Concurrent analysis support

## 🚀 Deployment

### Production Build

```bash
# Create optimized production build
npm run build

# Verify build
npm run preview

# Bundle analysis
npm run analyze
```

### Deployment Options

#### **Static Hosting (Recommended)**
Perfect for Netlify, Vercel, GitHub Pages:

```bash
# Build and deploy to dist/
npm run build

# Deploy dist/ folder to your hosting provider
```

#### **Docker Deployment**

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### **CDN Integration**
For high-performance global delivery:

```bash
# Build with CDN asset URLs
npm run build

# Upload dist/ to CDN
# Configure CDN headers for optimal caching
```

### Environment Configuration

```bash
# Production environment variables
VITE_APP_TITLE="OpenSearch Document Analyzer"
VITE_APP_VERSION="1.0.0"
VITE_APP_ENVIRONMENT="production"

# Analytics and monitoring (optional)
VITE_ANALYTICS_ID="your-analytics-id"
VITE_SENTRY_DSN="your-sentry-dsn"
```

### Performance Optimization

The production build includes:

- **Code Splitting**: Automatic chunk splitting for optimal loading
- **Tree Shaking**: Dead code elimination for smaller bundles
- **Asset Optimization**: Image optimization and compression
- **Caching Strategy**: Aggressive caching for static assets
- **Gzip Compression**: Server-side compression support

## 📖 API Reference

### Core Analysis Function

```typescript
import { analyzeDocument } from './src/analysis/analyzer';

// Analyze a document with default settings
const result = analyzeDocument(jsonDocument);

// Analyze with specific use case optimization
const result = analyzeDocument(jsonDocument, 'analytics');

// Available use cases: 'general' | 'analytics' | 'logging' | 'ecommerce' | 'monitoring'
```

### Analysis Result Structure

```typescript
interface AnalysisResult {
  // Multi-dimensional scores (0-10 scale)
  scores: {
    queryPerformance: number;      // Query execution speed
    indexingPerformance: number;   // Document indexing speed
    storageEfficiency: number;     // Storage resource utilization
    maintenanceCost: number;       // Operational overhead
    overall: number;               // Weighted composite score
  };
  
  // Detailed explanations for each score
  explanations: {
    queryPerformance: ScoreBreakdown;
    indexingPerformance: ScoreBreakdown;
    storageEfficiency: ScoreBreakdown;
    maintenanceCost: ScoreBreakdown;
  };
  
  // Performance predictions
  performanceMetrics: {
    memoryUsageMB: { heap: number; offHeap: number; total: number };
    cpuUtilization: { indexing: number; query: number; maintenance: number };
    diskIO: { readOps: number; writeOps: number; totalMBps: number };
    networkBandwidth: { ingestMBps: number; queryMBps: number; replicationMBps: number };
  };
  
  // Document classification and comparison
  comparative: {
    documentType: DocumentType;
    typeConfidence: number;
    percentileRanks: { [key: string]: number };
    typicalRanges: { [key: string]: { min: number; max: number; median: number } };
  };
  
  // Field-level analysis
  fields: FieldAnalysis[];
  fieldTypes: Record<OpenSearchFieldType, number>;
  fieldCount: number;
  maxDepth: number;
  
  // Storage and complexity
  estimatedStorageMB: number;
  indexSizeScore: number;        // Legacy compatibility
  complexityScore: number;       // Legacy compatibility
  
  // Recommendations
  warnings: string[];
  optimizations: string[];
  
  // Configuration used
  scoringConfig: ScoringConfig;
}
```

### Advanced Configuration

```typescript
import { calculateEnhancedScores, SCORING_CONFIGS } from './src/analysis/scoring';

// Custom scoring configuration
const customConfig: ScoringConfig = {
  version: '1.0.0',
  useCase: 'custom',
  weights: {
    queryPerformance: 0.4,     // Emphasize query speed
    indexingPerformance: 0.2,  // De-emphasize indexing
    storageEfficiency: 0.3,    // Balance storage usage
    maintenanceCost: 0.1       // Minimize maintenance focus
  }
};

// Use custom configuration
const result = calculateEnhancedScores(fields, storageMB, customConfig);
```

## 🤝 Contributing

We welcome contributions to improve the OpenSearch Document Complexity Analyzer!

### Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork**: `git clone https://github.com/YOUR-USERNAME/opensearch-document-complexity-analyzer.git`
3. **Install dependencies**: `npm install`
4. **Create a branch**: `git checkout -b feature/your-feature-name`

### Development Guidelines

#### **Code Standards**
- Follow existing TypeScript and React patterns
- Maintain test coverage above 90% for new features
- Use semantic commit messages
- Follow the established code style (ESLint + Prettier)

#### **Testing Requirements**
- Unit tests for all analysis logic
- Component tests for UI changes
- Integration tests for new workflows
- Performance benchmarks for algorithm changes

#### **Documentation**
- Update README.md for new features
- Add JSDoc comments for public APIs
- Include examples in code comments
- Update type definitions as needed

### Submission Process

1. **Test thoroughly**: `npm run test:coverage`
2. **Check code quality**: `npm run lint && npm run type-check`
3. **Commit changes**: Use conventional commit format
4. **Push to your fork**: `git push origin feature/your-feature-name`
5. **Create Pull Request**: Include detailed description and test results

### Types of Contributions

- 🐛 **Bug Fixes**: Improve accuracy or fix edge cases
- ✨ **New Features**: Add analysis capabilities or UI enhancements
- 📚 **Documentation**: Improve guides, examples, or API docs
- 🎨 **UI/UX**: Enhance design, accessibility, or user experience
- ⚡ **Performance**: Optimize analysis speed or memory usage
- 🧪 **Testing**: Expand test coverage or add new test scenarios

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

### Research and Validation
- **OpenSearch Team**: For excellent documentation and open-source commitment
- **Lucene Community**: For foundational search and indexing algorithms
- **Elasticsearch Research**: Historical performance optimization insights

### Technology Stack
- **React Team**: For the excellent React framework
- **Vite Team**: For the fast and modern build tool
- **TypeScript Team**: For type safety and developer experience
- **Tailwind CSS**: For utility-first styling approach

### Testing and Quality
- **Vitest**: For fast and modern testing framework  
- **Testing Library**: For user-centric testing utilities
- **ESLint & Prettier**: For code quality and formatting

## 📞 Support

### Getting Help
- 📖 **Documentation**: Check this README and `/docs` folder
- 🐛 **Issues**: Report bugs or request features on GitHub Issues
- 💬 **Discussions**: Ask questions in GitHub Discussions
- 📧 **Email**: Contact the maintainers for security issues

### Community
- ⭐ **Star the repo** if you find it useful
- 🍴 **Fork and contribute** to make it better
- 📢 **Share** with others who might benefit

---

**Made with ❤️ for the OpenSearch community**

*Analyze smarter, optimize better, scale confidently.*