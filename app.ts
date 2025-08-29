interface ComplexityAnalysis {
    complexityScore: number;
    estimatedIndexSize: number;
    fieldCount: number;
    maxDepth: number;
    details: AnalysisDetail[];
    breakdown: ComplexityBreakdown;
}

interface AnalysisDetail {
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
    impact: number;
}

interface ComplexityBreakdown {
    structuralComplexity: number;
    dataTypeComplexity: number;
    arrayComplexity: number;
    textAnalysisComplexity: number;
    nestedObjectComplexity: number;
}

class OpenSearchComplexityAnalyzer {
    private chart: any = null;

    analyze(jsonString: string): ComplexityAnalysis {
        try {
            const jsonData = JSON.parse(jsonString);
            return this.analyzeObject(jsonData);
        } catch (error) {
            throw new Error('Invalid JSON format');
        }
    }

    private analyzeObject(obj: any, path: string = '', depth: number = 0): ComplexityAnalysis {
        const analysis: ComplexityAnalysis = {
            complexityScore: 0,
            estimatedIndexSize: 0,
            fieldCount: 0,
            maxDepth: 0,
            details: [],
            breakdown: {
                structuralComplexity: 0,
                dataTypeComplexity: 0,
                arrayComplexity: 0,
                textAnalysisComplexity: 0,
                nestedObjectComplexity: 0
            }
        };

        this.traverseObject(obj, analysis, path, depth);
        this.calculateComplexityScore(analysis);
        this.estimateIndexSize(analysis, obj);

        return analysis;
    }

    private traverseObject(obj: any, analysis: ComplexityAnalysis, path: string, depth: number): void {
        analysis.maxDepth = Math.max(analysis.maxDepth, depth);

        if (depth > 10) {
            analysis.details.push({
                title: 'Deep Nesting Detected',
                description: `Object nesting exceeds 10 levels at path: ${path}`,
                severity: 'high',
                impact: 15
            });
            analysis.breakdown.nestedObjectComplexity += 15;
        }

        if (obj === null || obj === undefined) {
            return;
        }

        if (Array.isArray(obj)) {
            this.analyzeArray(obj, analysis, path, depth);
        } else if (typeof obj === 'object') {
            this.analyzeObjectProperties(obj, analysis, path, depth);
        } else {
            this.analyzePrimitiveValue(obj, analysis, path);
        }
    }

    private analyzeArray(arr: any[], analysis: ComplexityAnalysis, path: string, depth: number): void {
        analysis.fieldCount++;
        
        if (arr.length === 0) {
            return;
        }

        // Large arrays increase complexity
        if (arr.length > 1000) {
            analysis.details.push({
                title: 'Large Array Detected',
                description: `Array with ${arr.length} elements at ${path} will create many index entries`,
                severity: 'high',
                impact: 20
            });
            analysis.breakdown.arrayComplexity += 20;
        } else if (arr.length > 100) {
            analysis.details.push({
                title: 'Medium Array Detected',
                description: `Array with ${arr.length} elements at ${path} contributes to index size`,
                severity: 'medium',
                impact: 10
            });
            analysis.breakdown.arrayComplexity += 10;
        }

        // Check array element consistency
        const types = new Set(arr.map(item => typeof item));
        if (types.size > 1) {
            analysis.details.push({
                title: 'Mixed Type Array',
                description: `Array at ${path} contains mixed types: ${Array.from(types).join(', ')}`,
                severity: 'medium',
                impact: 8
            });
            analysis.breakdown.dataTypeComplexity += 8;
        }

        // Analyze array elements
        arr.forEach((item, index) => {
            this.traverseObject(item, analysis, `${path}[${index}]`, depth + 1);
        });
    }

    private analyzeObjectProperties(obj: Record<string, any>, analysis: ComplexityAnalysis, path: string, depth: number): void {
        const keys = Object.keys(obj);
        analysis.fieldCount += keys.length;

        // Many properties increase mapping complexity
        if (keys.length > 50) {
            analysis.details.push({
                title: 'High Property Count',
                description: `Object at ${path} has ${keys.length} properties, increasing mapping complexity`,
                severity: 'high',
                impact: 12
            });
            analysis.breakdown.structuralComplexity += 12;
        } else if (keys.length > 20) {
            analysis.details.push({
                title: 'Medium Property Count',
                description: `Object at ${path} has ${keys.length} properties`,
                severity: 'medium',
                impact: 6
            });
            analysis.breakdown.structuralComplexity += 6;
        }

        // Check for dynamic field names (potential mapping explosion)
        const dynamicFieldPattern = /^\d+$|^[a-f0-9]{8,}$|^uuid-|^id-/i;
        const dynamicFields = keys.filter(key => dynamicFieldPattern.test(key));
        
        if (dynamicFields.length > 5) {
            analysis.details.push({
                title: 'Dynamic Field Names Detected',
                description: `Detected ${dynamicFields.length} potential dynamic field names that could cause mapping explosion`,
                severity: 'high',
                impact: 18
            });
            analysis.breakdown.structuralComplexity += 18;
        }

        // Analyze each property
        keys.forEach(key => {
            const newPath = path ? `${path}.${key}` : key;
            this.traverseObject(obj[key], analysis, newPath, depth + 1);
        });
    }

    private analyzePrimitiveValue(value: any, analysis: ComplexityAnalysis, path: string): void {
        analysis.fieldCount++;

        if (typeof value === 'string') {
            this.analyzeStringValue(value, analysis, path);
        } else if (typeof value === 'number') {
            // Numbers are generally efficient to index
            analysis.breakdown.dataTypeComplexity += 1;
        } else if (typeof value === 'boolean') {
            // Booleans are very efficient
            analysis.breakdown.dataTypeComplexity += 0.5;
        }
    }

    private analyzeStringValue(value: string, analysis: ComplexityAnalysis, path: string): void {
        // Long strings require more storage and analysis
        if (value.length > 10000) {
            analysis.details.push({
                title: 'Very Long String Field',
                description: `String at ${path} is ${value.length} characters, requiring significant storage`,
                severity: 'high',
                impact: 15
            });
            analysis.breakdown.textAnalysisComplexity += 15;
        } else if (value.length > 1000) {
            analysis.details.push({
                title: 'Long String Field',
                description: `String at ${path} is ${value.length} characters`,
                severity: 'medium',
                impact: 8
            });
            analysis.breakdown.textAnalysisComplexity += 8;
        }

        // Check for structured text that might need special analysis
        if (this.isStructuredText(value)) {
            analysis.details.push({
                title: 'Structured Text Detected',
                description: `Field ${path} contains structured text (JSON, XML, etc.) that may need nested parsing`,
                severity: 'medium',
                impact: 10
            });
            analysis.breakdown.textAnalysisComplexity += 10;
        }

        // Check for high cardinality text (unique identifiers, etc.)
        if (this.isHighCardinalityText(value)) {
            analysis.details.push({
                title: 'High Cardinality Field',
                description: `Field ${path} appears to contain unique identifiers, affecting term frequency`,
                severity: 'low',
                impact: 3
            });
            analysis.breakdown.dataTypeComplexity += 3;
        }

        analysis.breakdown.textAnalysisComplexity += Math.ceil(value.length / 100);
    }

    private isStructuredText(value: string): boolean {
        // Check for JSON, XML, or other structured formats
        return value.trim().startsWith('{') || value.trim().startsWith('[') || 
               value.trim().startsWith('<') || value.includes('://');
    }

    private isHighCardinalityText(value: string): boolean {
        // Check for patterns that suggest unique identifiers
        const patterns = [
            /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i, // UUID
            /^[a-f0-9]{32,}$/i, // Long hex strings
            /^\d{10,}$/, // Long numbers as strings
            /^[A-Z0-9]{10,}$/ // Long alphanumeric codes
        ];
        return patterns.some(pattern => pattern.test(value));
    }

    private calculateComplexityScore(analysis: ComplexityAnalysis): void {
        const breakdown = analysis.breakdown;
        const rawScore = 
            breakdown.structuralComplexity +
            breakdown.dataTypeComplexity +
            breakdown.arrayComplexity +
            breakdown.textAnalysisComplexity +
            breakdown.nestedObjectComplexity;

        // Add base complexity factors
        const depthPenalty = Math.pow(analysis.maxDepth, 1.5);
        const fieldCountPenalty = Math.log(analysis.fieldCount + 1) * 5;

        const totalComplexity = rawScore + depthPenalty + fieldCountPenalty;

        // Normalize to 0-100 scale
        analysis.complexityScore = Math.min(100, Math.round(totalComplexity));
    }

    private estimateIndexSize(analysis: ComplexityAnalysis, originalData: any): void {
        const jsonSize = JSON.stringify(originalData).length;
        
        // OpenSearch typically stores 2-4x the original JSON size due to:
        // - Inverted indices
        // - Field mappings
        // - Doc values
        // - Source storage
        
        let multiplier = 2.5; // Base multiplier

        // Adjust multiplier based on complexity factors
        if (analysis.breakdown.textAnalysisComplexity > 50) {
            multiplier += 1; // Text analysis increases index size significantly
        }
        
        if (analysis.breakdown.arrayComplexity > 30) {
            multiplier += 0.5; // Arrays create many index entries
        }
        
        if (analysis.maxDepth > 8) {
            multiplier += 0.3; // Deep nesting requires more metadata
        }

        analysis.estimatedIndexSize = Math.round((jsonSize * multiplier) / 1024); // Convert to KB
    }

    renderVisualization(analysis: ComplexityAnalysis): void {
        const ctx = document.getElementById('complexityChart') as HTMLCanvasElement;
        
        if (this.chart) {
            this.chart.destroy();
        }

        this.chart = new (window as any).Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [
                    'Structural Complexity',
                    'Data Type Complexity', 
                    'Array Complexity',
                    'Text Analysis Complexity',
                    'Nested Object Complexity'
                ],
                datasets: [{
                    data: [
                        analysis.breakdown.structuralComplexity,
                        analysis.breakdown.dataTypeComplexity,
                        analysis.breakdown.arrayComplexity,
                        analysis.breakdown.textAnalysisComplexity,
                        analysis.breakdown.nestedObjectComplexity
                    ],
                    backgroundColor: [
                        '#667eea',
                        '#764ba2',
                        '#f093fb',
                        '#f5576c',
                        '#4facfe'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context: any) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }
}

// Application initialization
document.addEventListener('DOMContentLoaded', () => {
    const analyzer = new OpenSearchComplexityAnalyzer();
    const analyzeBtn = document.getElementById('analyzeBtn') as HTMLButtonElement;
    const jsonInput = document.getElementById('jsonInput') as HTMLTextAreaElement;
    const resultsSection = document.getElementById('results') as HTMLElement;

    // Sample JSON for demonstration
    const sampleJson = {
        "user_id": "uuid-12345-67890",
        "profile": {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "preferences": {
                "theme": "dark",
                "language": "en",
                "notifications": {
                    "email": true,
                    "push": false,
                    "sms": true
                }
            }
        },
        "orders": [
            {
                "order_id": "ord-98765",
                "items": [
                    {"product": "Laptop", "quantity": 1, "price": 999.99},
                    {"product": "Mouse", "quantity": 2, "price": 29.99}
                ],
                "total": 1059.97,
                "status": "shipped"
            }
        ],
        "metadata": {
            "created_at": "2024-01-15T10:30:00Z",
            "last_updated": "2024-01-20T15:45:00Z",
            "tags": ["premium", "returning-customer"],
            "notes": "Customer requested expedited shipping for all future orders. Has premium support access."
        }
    };

    // Pre-populate with sample data
    jsonInput.value = JSON.stringify(sampleJson, null, 2);

    analyzeBtn.addEventListener('click', () => {
        try {
            const jsonString = jsonInput.value.trim();
            if (!jsonString) {
                alert('Please enter a JSON document to analyze');
                return;
            }

            const analysis = analyzer.analyze(jsonString);
            displayResults(analysis);
            analyzer.renderVisualization(analysis);
            
            resultsSection.style.display = 'block';
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            alert(`Error analyzing JSON: ${error.message}`);
        }
    });

    function displayResults(analysis: ComplexityAnalysis) {
        // Update metric cards
        document.getElementById('complexityScore')!.textContent = analysis.complexityScore.toString();
        document.getElementById('indexSize')!.textContent = `${analysis.estimatedIndexSize} KB`;
        document.getElementById('fieldCount')!.textContent = analysis.fieldCount.toString();
        document.getElementById('maxDepth')!.textContent = analysis.maxDepth.toString();

        // Update details section
        const detailsContainer = document.getElementById('analysisDetails')!;
        detailsContainer.innerHTML = '';

        if (analysis.details.length === 0) {
            detailsContainer.innerHTML = '<div class="analysis-item complexity-low"><div class="analysis-item-title">No Complexity Issues Found</div><div class="analysis-item-description">This JSON document has a simple structure that should be efficient to index in OpenSearch.</div></div>';
        } else {
            analysis.details.forEach(detail => {
                const detailElement = document.createElement('div');
                detailElement.className = `analysis-item complexity-${detail.severity}`;
                detailElement.innerHTML = `
                    <div class="analysis-item-title">${detail.title} (Impact: ${detail.impact})</div>
                    <div class="analysis-item-description">${detail.description}</div>
                `;
                detailsContainer.appendChild(detailElement);
            });
        }
    }
});