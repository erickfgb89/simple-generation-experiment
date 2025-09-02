# User Guide - OpenSearch Document Complexity Analyzer

A comprehensive guide to understanding and using the OpenSearch Document Complexity Analyzer for optimizing your JSON documents and improving OpenSearch performance.

## Table of Contents

- [Getting Started](#getting-started)
- [Understanding Your Analysis Results](#understanding-your-analysis-results)
- [Optimization Workflows](#optimization-workflows)
- [Document Types and Use Cases](#document-types-and-use-cases)
- [Advanced Features](#advanced-features)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)
- [FAQ](#faq)

## Getting Started

### Your First Analysis

1. **Access the Application**
   - Open the analyzer in your web browser
   - You'll see a clean interface with a JSON input area and example options

2. **Load a Sample Document**
   - Click "Load Example" to see pre-built examples
   - Choose "Simple Document" to start with a basic example
   - Review the JSON structure to understand the format

3. **Run Your First Analysis**
   - Click "Analyze Document" to process the example
   - Wait for the analysis to complete (usually under 2 seconds)
   - Explore the results using the tabbed interface

4. **Try Your Own Document**
   - Clear the input area and paste your own JSON
   - Ensure it's a valid JSON object (not an array or primitive)
   - Run the analysis and compare results

### Input Requirements

**Supported Format**: Valid JSON objects only
```json
✅ Valid: { "field": "value", "nested": { "data": 123 } }
❌ Invalid: ["array", "at", "root"]
❌ Invalid: "just a string"
```

**Document Size**: No strict limits, but optimal performance for documents under 10MB

**Complexity**: Handles deeply nested structures, arrays, and mixed data types

## Understanding Your Analysis Results

### Overall Score (0-10 Scale)

The overall score represents your document's suitability for OpenSearch indexing:
- **8-10**: Excellent - Optimal for high-performance applications
- **6-8**: Good - Suitable for most production use cases  
- **4-6**: Fair - May need optimization for high-volume scenarios
- **2-4**: Poor - Significant optimization recommended
- **0-2**: Critical - Major restructuring needed

### Four Core Dimensions

#### 1. Query Performance (0-10)
**What it measures**: How fast queries will execute against your indexed documents

**High scores (7-10) indicate**:
- Keyword and numeric fields dominate
- Minimal text analysis required
- Shallow nesting structure
- Efficient field access patterns

**Low scores (0-4) indicate**:
- Many text fields requiring full-text search
- Deep nesting that complicates queries
- Complex nested object structures
- Heavy analysis overhead

**Example**: A user profile with mostly structured data (ID, email, preferences) scores high, while a document with multiple large text fields scores lower.

#### 2. Indexing Performance (0-10)
**What it measures**: How fast documents will be processed during indexing

**High scores (7-10) indicate**:
- Simple data types (numbers, booleans, keywords)
- Minimal text analysis requirements
- No nested document structures
- Efficient processing pipeline

**Low scores (0-4) indicate**:
- Heavy text analysis workload
- Nested objects creating separate documents
- Complex array structures
- CPU-intensive field processing

**Example**: Log entries with timestamps and status codes index quickly, while product descriptions with rich text content index more slowly.

#### 3. Storage Efficiency (0-10)
**What it measures**: How efficiently your data uses storage resources

**High scores (7-10) indicate**:
- Optimized data types (integers, booleans, dates)
- Minimal storage overhead
- Efficient field compression
- Good data density

**Low scores (0-4) indicate**:
- Text fields with analysis overhead
- Nested structures with duplication
- Inefficient field type choices
- High storage multipliers

**Example**: Numeric sensor data stores very efficiently, while documents with many analyzed text fields have significant storage overhead.

#### 4. Maintenance Cost (0-10)
**What it measures**: Operational complexity for managing the index

**High scores (7-10) indicate**:
- Simple mapping structure
- Minimal analyzer configuration needed
- Stable field patterns
- Low operational overhead

**Low scores (0-4) indicate**:
- Complex text analysis requirements
- Nested query optimization needed
- Frequent mapping changes required
- High expertise requirements

**Example**: Configuration files with structured key-value pairs are easy to maintain, while search-heavy applications with custom analyzers require ongoing tuning.

### Performance Metrics

#### Memory Usage
- **Heap Memory**: JVM heap space for field caches and query processing
- **Off-Heap Memory**: Direct memory for field data and filters
- **Total Memory**: Combined memory requirements

**Typical ranges**:
- Simple documents: 10-50 MB
- Complex documents: 100-500 MB
- Large documents: 500MB-2GB

#### CPU Utilization
- **Indexing CPU**: Processing power needed during document indexing
- **Query CPU**: CPU usage during search operations
- **Maintenance CPU**: Background optimization and merging

**Interpretation**:
- <20%: Very efficient
- 20-50%: Normal usage
- 50-80%: High but acceptable
- >80%: Potential bottleneck

#### Disk I/O
- **Read Operations**: Disk reads per second during queries
- **Write Operations**: Disk writes per second during indexing
- **Throughput**: Total MB/s of disk activity

#### Network Bandwidth
- **Ingest Bandwidth**: Network usage during document indexing
- **Query Bandwidth**: Network usage during search operations
- **Replication Bandwidth**: Inter-node replication traffic

### Document Classification

The analyzer automatically classifies your document based on field patterns:

- **Log Entry**: Timestamp, level, message patterns
- **User Profile**: User identification and preference fields
- **Product Catalog**: Commercial product information
- **Event Data**: Action tracking and analytics data
- **Configuration**: Application settings and parameters
- **Metrics**: Numerical measurements and telemetry
- **Content Document**: Text-heavy content like articles
- **Sensor Data**: IoT and monitoring data

**Type Confidence**: Percentage confidence in the classification (70%+ is reliable)

**Percentile Ranks**: How your document compares to others of the same type
- 90th percentile = Better than 90% of similar documents
- 50th percentile = Average for this document type
- 10th percentile = Below average, optimization recommended

## Optimization Workflows

### Quick Optimization Process

1. **Identify Problem Areas**
   - Look for scores below 6 in any dimension
   - Review warnings in the Optimization tab
   - Check field-level complexity scores

2. **Prioritize Fixes**
   - Start with highest-impact recommendations
   - Focus on your use case (analytics vs. logging vs. search)
   - Consider implementation effort vs. benefit

3. **Apply Changes**
   - Modify your document structure
   - Test with the analyzer
   - Measure improvement in scores

4. **Validate Results**
   - Run analysis on updated document
   - Compare before/after scores
   - Check for new warnings or issues

### Common Optimization Patterns

#### Text Field Optimization
**Problem**: Too many text fields causing low indexing performance

**Solutions**:
- Convert exact-match fields to `keyword` type
- Combine related text fields
- Disable analysis for non-searchable text
- Use `keyword` sub-fields for filtering

**Example**:
```json
// Before (inefficient)
{
  "productId": "PROD-12345",        // Analyzed as text
  "category": "Electronics",        // Analyzed as text
  "subcategory": "Headphones"       // Analyzed as text
}

// After (optimized)
{
  "productId": "PROD-12345",        // Will be detected as keyword
  "category": "Electronics",        // Will be detected as keyword
  "subcategory": "Headphones"       // Will be detected as keyword
}
```

#### Structure Flattening
**Problem**: Deep nesting causing low query performance

**Solutions**:
- Flatten nested objects where possible
- Use dot notation for field names
- Limit nesting to 3-4 levels maximum
- Consider denormalization

**Example**:
```json
// Before (deeply nested)
{
  "user": {
    "profile": {
      "personal": {
        "address": {
          "street": "123 Main St",
          "city": "Boston",
          "state": "MA"
        }
      }
    }
  }
}

// After (flattened)
{
  "user_street": "123 Main St",
  "user_city": "Boston",
  "user_state": "MA"
}
```

#### Array Optimization
**Problem**: Large arrays causing storage inefficiency

**Solutions**:
- Limit array sizes where possible
- Consider separate indices for array data
- Use nested objects only when relationships matter
- Flatten arrays of primitives

**Example**:
```json
// Before (large array)
{
  "tags": ["electronics", "audio", "wireless", "noise-canceling", "premium", "portable", "bluetooth", "rechargeable"]
}

// After (optimized)
{
  "primaryCategory": "electronics",
  "features": ["wireless", "noise-canceling", "bluetooth"],
  "tags": "electronics,audio,wireless,noise-canceling,premium"  // Or keep essential tags only
}
```

### Use Case-Specific Optimization

#### Analytics Workloads
**Focus**: Query performance and aggregation efficiency
- Prefer numeric and date fields over text
- Use appropriate numeric types (don't use `long` for small numbers)
- Structure data for common aggregation patterns
- Consider time-based partitioning

#### Logging Applications  
**Focus**: Indexing performance and storage efficiency
- Standardize log field structure
- Use keyword fields for structured data
- Implement log level filtering
- Consider log rotation and retention

#### Search Applications
**Focus**: Query performance and relevance
- Optimize text analysis for your content
- Use appropriate analyzers
- Consider multi-field mapping
- Implement search-optimized document structure

#### E-commerce Catalogs
**Focus**: Balance between search and performance
- Structure product attributes efficiently
- Use nested objects for variants only when necessary
- Optimize for common search patterns
- Consider faceted search requirements

## Document Types and Use Cases

### Log Entry Documents

**Characteristics**:
- Timestamp field (essential)
- Log level (INFO, ERROR, etc.)
- Message field with variable content
- Structured metadata fields
- Host/service identification

**Optimization Tips**:
- Use keyword fields for structured data (host, level, service)
- Keep message field as text for searchability
- Add numeric fields for metrics and counts
- Use ISO 8601 format for timestamps

**Example Structure**:
```json
{
  "timestamp": "2023-01-01T12:00:00.123Z",
  "level": "INFO",
  "service": "user-service",
  "host": "web-01",
  "message": "User login successful",
  "userId": "12345",
  "duration": 245,
  "statusCode": 200
}
```

### Product Catalog Documents

**Characteristics**:
- Product identification fields
- Descriptive text content
- Categorical information
- Pricing and inventory data
- Technical specifications

**Optimization Tips**:
- Use keyword fields for IDs and categories
- Limit analyzed text to searchable descriptions
- Structure specifications as objects
- Consider nested objects for variants

**Example Structure**:
```json
{
  "productId": "PROD-001",
  "name": "Wireless Headphones",
  "category": "Electronics",
  "price": 299.99,
  "inStock": true,
  "description": "Premium wireless headphones with active noise cancellation",
  "specifications": {
    "batteryLife": "30 hours",
    "connectivity": ["Bluetooth 5.0", "USB-C"]
  }
}
```

### Configuration Documents

**Characteristics**:
- Hierarchical key-value structure
- Mixed data types
- Environment-specific settings
- Version information

**Optimization Tips**:
- Keep reasonable nesting depth
- Use appropriate data types
- Group related settings
- Include version metadata

**Example Structure**:
```json
{
  "application": {
    "name": "MyApp",
    "version": "1.2.0",
    "environment": "production"
  },
  "database": {
    "host": "db.example.com",
    "port": 5432,
    "poolSize": 10
  },
  "features": {
    "enableLogging": true,
    "debugMode": false
  }
}
```

## Advanced Features

### Custom Use Case Optimization

The analyzer supports different use cases with optimized scoring weights:

- **General** (30% query, 25% indexing, 25% storage, 20% maintenance)
- **Analytics** (40% query, 20% indexing, 30% storage, 10% maintenance)  
- **Logging** (20% query, 40% indexing, 30% storage, 10% maintenance)
- **E-commerce** (35% query, 25% indexing, 20% storage, 20% maintenance)
- **Monitoring** (25% query, 35% indexing, 25% storage, 15% maintenance)

Choose the use case that best matches your requirements for more relevant scoring.

### Export and Reporting

#### JSON Export
Complete analysis results with all metrics and recommendations
- Full field-level analysis
- Performance predictions
- Comparative data
- Configuration details

#### CSV Export
Tabular data suitable for spreadsheet analysis
- Summary scores by dimension
- Field-level complexity data
- Performance metrics
- Recommendations list

#### PDF Reports (Future)
Professional formatted reports for stakeholders
- Executive summary
- Detailed analysis
- Optimization roadmap
- Implementation recommendations

### Comparative Analysis

The analyzer compares your document against a database of similar documents:
- **Percentile ranking** shows relative performance
- **Typical ranges** indicate normal performance bounds
- **Type confidence** validates document classification
- **Benchmark data** from production systems

## Troubleshooting

### Common Issues

#### "Invalid JSON" Error
**Cause**: Malformed JSON syntax
**Solutions**:
- Check for missing commas, quotes, or brackets
- Use a JSON validator to identify syntax errors
- Ensure proper escaping of special characters
- Verify the document is an object, not an array

#### "Analysis Taking Too Long"
**Cause**: Very large or complex document
**Solutions**:
- Break large documents into smaller parts
- Remove unnecessary fields for testing
- Check for circular references
- Refresh the page if stuck

#### "Unexpected Field Types"
**Cause**: Field type detection differences
**Solutions**:
- Review OpenSearch dynamic mapping rules
- Consider explicit mapping for edge cases
- Check date format compatibility
- Verify numeric type ranges

#### Low Scores Despite Optimization
**Cause**: Fundamental document structure issues
**Solutions**:
- Review document type classification
- Consider alternative data modeling approaches
- Check for hidden complexity in nested structures
- Validate against use case requirements

### Performance Issues

#### Slow Analysis
- **Large documents**: Consider analyzing representative samples
- **Complex nesting**: Flatten structure where possible
- **Many fields**: Focus on essential fields only
- **Browser limits**: Use latest browser version

#### Memory Usage
- **Close other browser tabs** during analysis
- **Refresh page** if experiencing slowdowns
- **Use smaller test documents** for iterative optimization
- **Check browser developer tools** for memory usage

## Best Practices

### Document Design Principles

1. **Keep It Simple**: Prefer flat structures when possible
2. **Type Appropriately**: Use the most specific data type
3. **Minimize Text Analysis**: Use keyword fields for exact matching
4. **Limit Array Sizes**: Large arrays impact performance
5. **Structure for Queries**: Design for your access patterns

### Development Workflow

1. **Design Phase**: Use analyzer during document schema design
2. **Development**: Test document structures before implementation
3. **Testing**: Validate with realistic sample data
4. **Production**: Monitor actual performance metrics
5. **Optimization**: Iterate based on real-world usage

### Monitoring and Maintenance

1. **Regular Analysis**: Re-analyze as document structure evolves
2. **Performance Tracking**: Monitor actual vs. predicted performance
3. **Schema Evolution**: Plan mapping changes carefully
4. **Documentation**: Keep optimization decisions documented

## FAQ

### General Questions

**Q: How accurate are the performance predictions?**
A: The predictions are based on extensive research of OpenSearch internals and real-world benchmarks. They provide reliable estimates for relative performance comparison and optimization guidance.

**Q: Can I use this for Elasticsearch?**
A: Yes! OpenSearch is based on Elasticsearch, so the analysis applies to most Elasticsearch versions as well. Some newer OpenSearch-specific features might not be reflected in Elasticsearch.

**Q: How does document size affect analysis accuracy?**
A: The analyzer handles documents of any size, but very large documents (>10MB) may take longer to process. Analysis accuracy remains consistent regardless of document size.

### Technical Questions

**Q: Why does my keyword field show as text?**
A: The analyzer uses OpenSearch's dynamic mapping rules. Strings longer than 256 characters or containing spaces are typically mapped as text. Consider explicit mapping for different behavior.

**Q: How are storage estimates calculated?**
A: Storage estimates use OpenSearch's actual storage formula: Source Data × (1 + Replicas) × (1.1 Indexing Overhead) / (0.95 Reserved Space) / (0.9 System Overhead), plus field-specific overhead multipliers.

**Q: Can I customize the scoring weights?**
A: Currently, you can choose from predefined use cases. Custom weighting is planned for future releases. The different use cases (general, analytics, logging, etc.) provide different optimization priorities.

### Optimization Questions

**Q: My document scores low but performs well in practice. Why?**
A: The analyzer provides general guidelines based on typical usage patterns. Your specific use case, hardware, or OpenSearch configuration might differ from the baseline assumptions.

**Q: Should I optimize for all dimensions equally?**
A: Focus on the dimensions most important to your use case. Analytics workloads should prioritize query performance, while logging applications should focus on indexing performance.

**Q: How often should I re-analyze my documents?**
A: Re-analyze when you make significant schema changes, experience performance issues, or periodically (monthly/quarterly) to ensure continued optimization.

---

## Need More Help?

- 📖 **Technical Documentation**: See the [API Reference](API_DOCUMENTATION.md)
- 🏗️ **Architecture Guide**: See [Technical Architecture](TECHNICAL_ARCHITECTURE.md)  
- 🐛 **Report Issues**: Use GitHub Issues for bugs or feature requests
- 💬 **Ask Questions**: Use GitHub Discussions for general questions
- 📧 **Contact**: Reach out to maintainers for specific support needs

**Remember**: The analyzer is a tool to guide optimization decisions. Always test changes in a development environment and validate improvements with real-world data.