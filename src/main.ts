import { OpenSearchAnalyzer } from './analyzer.js';
import { DataVisualizer } from './visualizer.js';
import { DocumentAnalysis } from './types.js';

class OpenSearchComplexityApp {
  private analyzer: OpenSearchAnalyzer;
  private visualizer: DataVisualizer;
  private fieldTypeChart: any = null;
  private complexityChart: any = null;

  constructor() {
    this.analyzer = new OpenSearchAnalyzer();
    this.visualizer = new DataVisualizer();
    this.initializeEventListeners();
    this.setupSampleData();
  }

  private initializeEventListeners(): void {
    const analyzeBtn = document.getElementById('analyzeBtn') as HTMLButtonElement;
    const jsonInput = document.getElementById('jsonInput') as HTMLTextAreaElement;

    analyzeBtn?.addEventListener('click', () => this.analyzeDocument());
    
    jsonInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.analyzeDocument();
      }
    });

    // Auto-resize textarea
    jsonInput?.addEventListener('input', () => {
      jsonInput.style.height = 'auto';
      jsonInput.style.height = Math.max(300, jsonInput.scrollHeight) + 'px';
    });
  }

  private setupSampleData(): void {
    const jsonInput = document.getElementById('jsonInput') as HTMLTextAreaElement;
    const sampleDocument = {
      "title": "E-commerce Product Listing",
      "description": "High-quality wireless Bluetooth headphones with noise cancellation technology and premium sound quality for audiophiles",
      "price": 299.99,
      "currency": "USD",
      "category": "Electronics",
      "subcategory": "Audio",
      "brand": "TechBrand",
      "model": "TB-WH-2024",
      "inStock": true,
      "stockCount": 47,
      "tags": ["wireless", "bluetooth", "noise-cancelling", "premium", "audio"],
      "specifications": {
        "color": "Matte Black",
        "weight": "285g",
        "batteryLife": "30 hours",
        "connectivity": "Bluetooth 5.2",
        "features": [
          "Active Noise Cancellation",
          "Quick Charge",
          "Voice Assistant Compatible"
        ]
      },
      "ratings": {
        "average": 4.7,
        "totalReviews": 1247,
        "breakdown": {
          "5star": 823,
          "4star": 287,
          "3star": 89,
          "2star": 31,
          "1star": 17
        }
      },
      "shipping": {
        "weight": 0.8,
        "dimensions": {
          "length": 20.5,
          "width": 18.2,
          "height": 8.4
        },
        "freeShipping": true,
        "estimatedDelivery": "2024-12-01T00:00:00Z"
      },
      "vendor": {
        "id": "vendor_12345",
        "name": "Premium Audio Store",
        "location": {
          "city": "San Francisco",
          "state": "CA",
          "country": "USA",
          "coordinates": "37.7749,-122.4194"
        },
        "contact": {
          "email": "sales@premiumaudio.com",
          "phone": "+1-555-AUDIO-01"
        }
      },
      "createdAt": "2024-01-15T09:30:00Z",
      "updatedAt": "2024-01-20T14:22:33Z",
      "metadata": {
        "source": "product_catalog_api",
        "version": "v2.1",
        "importId": "imp_2024_001_789",
        "validatedFields": ["title", "price", "brand", "model"]
      }
    };

    if (jsonInput) {
      jsonInput.value = JSON.stringify(sampleDocument, null, 2);
      jsonInput.style.height = Math.max(300, jsonInput.scrollHeight) + 'px';
    }
  }

  private async analyzeDocument(): Promise<void> {
    const jsonInput = document.getElementById('jsonInput') as HTMLTextAreaElement;
    const analyzeBtn = document.getElementById('analyzeBtn') as HTMLButtonElement;
    const resultsContent = document.getElementById('resultsContent');
    const placeholderContent = document.getElementById('placeholderContent');

    if (!jsonInput || !analyzeBtn || !resultsContent || !placeholderContent) {
      this.showError('Required DOM elements not found');
      return;
    }

    const jsonText = jsonInput.value.trim();
    if (!jsonText) {
      this.showError('Please enter a JSON document to analyze');
      return;
    }

    try {
      // Update UI to show loading state
      analyzeBtn.disabled = true;
      analyzeBtn.textContent = '🔄 Analyzing...';

      // Parse and analyze JSON
      const jsonDoc = JSON.parse(jsonText);
      const analysis = this.analyzer.analyzeDocument(jsonDoc);

      // Update UI with results
      this.updateResultsUI(analysis);
      this.createVisualizations(analysis);

      // Show results
      placeholderContent.classList.add('hidden');
      resultsContent.classList.remove('hidden');

      // Scroll to results
      resultsContent.scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
      if (error instanceof SyntaxError) {
        this.showError('Invalid JSON format. Please check your document syntax.');
      } else {
        this.showError(`Analysis error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    } finally {
      // Reset button state
      analyzeBtn.disabled = false;
      analyzeBtn.textContent = '🔍 Analyze Document';
    }
  }

  private updateResultsUI(analysis: DocumentAnalysis): void {
    // Update scores
    const indexSizeScore = document.getElementById('indexSizeScore');
    const complexityScore = document.getElementById('complexityScore');

    if (indexSizeScore) {
      indexSizeScore.textContent = analysis.indexSizeScore.toString();
      indexSizeScore.style.color = this.getScoreColor(analysis.indexSizeScore);
    }

    if (complexityScore) {
      complexityScore.textContent = analysis.complexityScore.toString();
      complexityScore.style.color = this.getScoreColor(analysis.complexityScore);
    }

    // Populate field table
    const fieldTableBody = document.querySelector('#fieldTable tbody');
    if (fieldTableBody) {
      this.visualizer.populateFieldTable(fieldTableBody as HTMLElement, analysis);
    }

    // Add recommendations if any
    this.addRecommendations(analysis.recommendations);
  }

  private createVisualizations(analysis: DocumentAnalysis): void {
    // Destroy existing charts
    if (this.fieldTypeChart) {
      this.fieldTypeChart.destroy();
    }
    if (this.complexityChart) {
      this.complexityChart.destroy();
    }

    // Create new charts
    const fieldTypeCanvas = document.getElementById('fieldTypeChart') as HTMLCanvasElement;
    const complexityCanvas = document.getElementById('complexityChart') as HTMLCanvasElement;

    if (fieldTypeCanvas && complexityCanvas) {
      this.fieldTypeChart = this.visualizer.createFieldTypeChart(fieldTypeCanvas, analysis);
      this.complexityChart = this.visualizer.createComplexityChart(complexityCanvas, analysis);
    }
  }

  private addRecommendations(recommendations: string[]): void {
    // Find or create recommendations section
    let recommendationsSection = document.querySelector('.recommendations-section');
    
    if (!recommendationsSection) {
      recommendationsSection = document.createElement('div');
      recommendationsSection.className = 'detail-section recommendations-section';
      
      const title = document.createElement('h3');
      title.textContent = '💡 Recommendations';
      recommendationsSection.appendChild(title);
      
      const list = document.createElement('ul');
      list.className = 'recommendations-list';
      list.style.paddingLeft = '1.5rem';
      list.style.listStyle = 'disc';
      recommendationsSection.appendChild(list);
      
      const analysisDetails = document.querySelector('.analysis-details');
      if (analysisDetails) {
        analysisDetails.appendChild(recommendationsSection);
      }
    }

    const list = recommendationsSection.querySelector('.recommendations-list');
    if (list) {
      list.innerHTML = '';
      recommendations.forEach(rec => {
        const listItem = document.createElement('li');
        listItem.textContent = rec;
        listItem.style.marginBottom = '0.5rem';
        listItem.style.color = '#475569';
        listItem.style.lineHeight = '1.5';
        list.appendChild(listItem);
      });
    }
  }

  private getScoreColor(score: number): string {
    if (score <= 30) return '#22c55e'; // Green - good
    if (score <= 60) return '#f59e0b'; // Orange - moderate
    return '#ef4444'; // Red - high
  }

  private showError(message: string): void {
    // Create or update error message
    let errorDiv = document.querySelector('.error-message') as HTMLElement;
    
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.style.cssText = `
        background: #fee2e2;
        border: 1px solid #fecaca;
        color: #dc2626;
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
        font-weight: 500;
      `;
      
      const inputSection = document.querySelector('.input-section');
      if (inputSection) {
        inputSection.appendChild(errorDiv);
      }
    }

    errorDiv.textContent = message;
    errorDiv.style.display = 'block';

    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (errorDiv) {
        errorDiv.style.display = 'none';
      }
    }, 5000);
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new OpenSearchComplexityApp();
});

// Export for potential external use
export { OpenSearchComplexityApp };