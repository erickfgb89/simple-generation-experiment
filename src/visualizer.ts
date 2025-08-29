import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { DocumentAnalysis, VisualizationData } from './types.js';

Chart.register(...registerables);

export class DataVisualizer {
  private static readonly FIELD_TYPE_COLORS = {
    text: '#ef4444',      // Red - high complexity
    keyword: '#22c55e',   // Green - low complexity
    long: '#3b82f6',      // Blue - numeric
    integer: '#3b82f6',   // Blue - numeric
    double: '#3b82f6',    // Blue - numeric
    float: '#3b82f6',     // Blue - numeric
    date: '#f59e0b',      // Orange - temporal
    boolean: '#8b5cf6',   // Purple - simple
    object: '#f97316',    // Orange - structured
    nested: '#dc2626',    // Dark red - complex
    geo_point: '#06b6d4', // Cyan - spatial
    ip: '#84cc16',        // Lime - network
    binary: '#6b7280'     // Gray - binary
  };

  private static readonly COMPLEXITY_COLORS = {
    textAnalysis: '#ef4444',
    nestedComplexity: '#dc2626',
    fieldCardinality: '#f59e0b',
    storageOverhead: '#3b82f6',
    indexingCost: '#8b5cf6'
  };

  public createFieldTypeChart(canvas: HTMLCanvasElement, analysis: DocumentAnalysis): Chart {
    const data = this.prepareFieldTypeData(analysis);
    
    const config: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: data.fieldTypeDistribution.map(item => item.type.toUpperCase()),
        datasets: [{
          data: data.fieldTypeDistribution.map(item => item.count),
          backgroundColor: data.fieldTypeDistribution.map(item => item.color),
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              boxWidth: 12,
              padding: 15,
              font: {
                size: 12,
                family: 'Inter'
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.parsed || 0;
                const percentage = ((value / analysis.totalFields) * 100).toFixed(1);
                return `${label}: ${value} fields (${percentage}%)`;
              }
            }
          }
        },
        animation: {
          duration: 1000
        }
      }
    };

    return new Chart(canvas, config);
  }

  public createComplexityChart(canvas: HTMLCanvasElement, analysis: DocumentAnalysis): Chart {
    const data = this.prepareComplexityData(analysis);
    
    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: data.complexityBreakdown.map(item => this.formatComplexityLabel(item.category)),
        datasets: [{
          label: 'Complexity Score',
          data: data.complexityBreakdown.map(item => item.value),
          backgroundColor: data.complexityBreakdown.map(item => item.color),
          borderColor: data.complexityBreakdown.map(item => item.color),
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              title: (context) => {
                return this.formatComplexityLabel(data.complexityBreakdown[context[0].dataIndex].category);
              },
              label: (context) => {
                return `Score: ${context.parsed.y}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              font: {
                family: 'Inter'
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          x: {
            ticks: {
              font: {
                family: 'Inter',
                size: 11
              },
              maxRotation: 45
            },
            grid: {
              display: false
            }
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeOutQuart'
        }
      }
    };

    return new Chart(canvas, config);
  }

  public populateFieldTable(tableBody: HTMLElement, analysis: DocumentAnalysis): void {
    tableBody.innerHTML = '';
    
    // Sort fields by complexity (highest first)
    const sortedFields = [...analysis.fieldAnalyses].sort((a, b) => b.complexity - a.complexity);
    
    sortedFields.forEach(field => {
      const row = document.createElement('tr');
      
      const pathCell = document.createElement('td');
      pathCell.textContent = field.path;
      pathCell.style.fontFamily = 'Monaco, Menlo, monospace';
      pathCell.style.fontSize = '0.9rem';
      row.appendChild(pathCell);
      
      const typeCell = document.createElement('td');
      const typeSpan = document.createElement('span');
      typeSpan.textContent = field.type.toUpperCase();
      typeSpan.style.padding = '0.25rem 0.5rem';
      typeSpan.style.borderRadius = '4px';
      typeSpan.style.fontSize = '0.75rem';
      typeSpan.style.fontWeight = '600';
      typeSpan.style.backgroundColor = this.getFieldTypeColor(field.type);
      typeSpan.style.color = 'white';
      typeCell.appendChild(typeSpan);
      row.appendChild(typeCell);
      
      const complexityCell = document.createElement('td');
      const complexityContainer = document.createElement('div');
      const complexityBar = document.createElement('div');
      complexityBar.className = 'complexity-bar';
      
      const complexityFill = document.createElement('div');
      complexityFill.className = `complexity-fill ${this.getComplexityClass(field.complexity)}`;
      complexityFill.style.width = `${Math.min(field.complexity * 10, 100)}%`;
      
      complexityBar.appendChild(complexityFill);
      
      const complexityText = document.createElement('div');
      complexityText.textContent = field.complexity.toString();
      complexityText.style.fontSize = '0.8rem';
      complexityText.style.marginTop = '0.25rem';
      
      complexityContainer.appendChild(complexityBar);
      complexityContainer.appendChild(complexityText);
      complexityCell.appendChild(complexityContainer);
      row.appendChild(complexityCell);
      
      const storageCell = document.createElement('td');
      storageCell.textContent = field.storageImpact.toString();
      storageCell.style.textAlign = 'center';
      row.appendChild(storageCell);
      
      tableBody.appendChild(row);
    });
  }

  private prepareFieldTypeData(analysis: DocumentAnalysis): VisualizationData {
    const fieldTypeDistribution = Object.entries(analysis.fieldsByType)
      .filter(([_, count]) => count > 0)
      .map(([type, count]) => ({
        type,
        count,
        color: this.getFieldTypeColor(type)
      }));

    const complexityBreakdown = Object.entries(analysis.complexityBreakdown)
      .map(([category, value]) => ({
        category,
        value,
        color: DataVisualizer.COMPLEXITY_COLORS[category as keyof typeof DataVisualizer.COMPLEXITY_COLORS] || '#6b7280'
      }));

    return { fieldTypeDistribution, complexityBreakdown };
  }

  private prepareComplexityData(analysis: DocumentAnalysis): VisualizationData {
    return this.prepareFieldTypeData(analysis);
  }

  private getFieldTypeColor(type: string): string {
    return DataVisualizer.FIELD_TYPE_COLORS[type as keyof typeof DataVisualizer.FIELD_TYPE_COLORS] || '#6b7280';
  }

  private getComplexityClass(complexity: number): string {
    if (complexity <= 2) return 'complexity-low';
    if (complexity <= 5) return 'complexity-medium';
    return 'complexity-high';
  }

  private formatComplexityLabel(category: string): string {
    const labels: Record<string, string> = {
      textAnalysis: 'Text Analysis',
      nestedComplexity: 'Nested Complexity',
      fieldCardinality: 'Field Cardinality',
      storageOverhead: 'Storage Overhead',
      indexingCost: 'Indexing Cost'
    };
    
    return labels[category] || category;
  }
}