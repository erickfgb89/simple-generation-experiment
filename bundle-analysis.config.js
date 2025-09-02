/**
 * Bundle Analysis Configuration
 * 
 * Configuration for analyzing build output and providing optimization recommendations
 */

export const bundleAnalysisConfig = {
  // Size thresholds for warnings
  thresholds: {
    // Total bundle size warnings
    totalSize: {
      warning: 1024 * 1024, // 1MB
      error: 5 * 1024 * 1024 // 5MB
    },
    
    // Individual chunk size warnings
    chunkSize: {
      warning: 512 * 1024, // 512KB
      error: 1024 * 1024 // 1MB
    },
    
    // Asset size warnings
    assetSize: {
      warning: 100 * 1024, // 100KB
      error: 500 * 1024 // 500KB
    }
  },
  
  // Performance budget recommendations
  performanceBudget: {
    // First Contentful Paint resources
    fcp: 200 * 1024, // 200KB
    
    // Largest Contentful Paint resources
    lcp: 500 * 1024, // 500KB
    
    // Time to Interactive resources
    tti: 1024 * 1024, // 1MB
    
    // Total Blocking Time resources
    tbt: 300 * 1024 // 300KB
  },
  
  // Optimization recommendations
  recommendations: {
    // Code splitting opportunities
    codeSplitting: {
      vendorChunkThreshold: 200 * 1024,
      routeChunkThreshold: 100 * 1024,
      commonChunkThreshold: 50 * 1024
    },
    
    // Tree shaking opportunities
    treeShaking: {
      unusedExportsThreshold: 10 * 1024,
      duplicateModulesThreshold: 5 * 1024
    },
    
    // Compression recommendations
    compression: {
      gzipRatio: 0.3, // Expected gzip compression ratio
      brotliRatio: 0.25 // Expected Brotli compression ratio
    }
  },
  
  // Asset optimization recommendations
  assets: {
    // Image optimization
    images: {
      maxSize: 100 * 1024,
      formats: ['webp', 'avif'],
      compressionQuality: 80
    },
    
    // Font optimization
    fonts: {
      maxSize: 50 * 1024,
      formats: ['woff2', 'woff'],
      preloadCritical: true
    },
    
    // CSS optimization
    css: {
      maxSize: 50 * 1024,
      criticalInline: 14 * 1024,
      unused: 10 // Max percentage of unused CSS
    }
  }
};

/**
 * Analyzes build output and provides optimization recommendations
 */
export function analyzeBundleOutput(stats) {
  const analysis = {
    summary: {},
    warnings: [],
    recommendations: [],
    performance: {}
  };
  
  // Analyze total bundle size
  const totalSize = stats.assets.reduce((sum, asset) => sum + asset.size, 0);
  analysis.summary.totalSize = {
    bytes: totalSize,
    formatted: formatBytes(totalSize),
    gzipped: Math.round(totalSize * bundleAnalysisConfig.compression.gzipRatio),
    brotli: Math.round(totalSize * bundleAnalysisConfig.compression.brotliRatio)
  };
  
  // Check size thresholds
  if (totalSize > bundleAnalysisConfig.thresholds.totalSize.error) {
    analysis.warnings.push({
      type: 'error',
      message: `Bundle size (${formatBytes(totalSize)}) exceeds recommended maximum`,
      recommendation: 'Consider code splitting, tree shaking, or removing unused dependencies'
    });
  } else if (totalSize > bundleAnalysisConfig.thresholds.totalSize.warning) {
    analysis.warnings.push({
      type: 'warning',
      message: `Bundle size (${formatBytes(totalSize)}) is approaching recommended maximum`,
      recommendation: 'Monitor bundle growth and consider optimization strategies'
    });
  }
  
  // Analyze individual chunks
  const chunks = stats.chunks || [];
  analysis.summary.chunks = chunks.map(chunk => ({
    name: chunk.names.join(', '),
    size: chunk.size,
    formatted: formatBytes(chunk.size),
    modules: chunk.modules?.length || 0
  }));
  
  // Check for large chunks
  chunks.forEach(chunk => {
    if (chunk.size > bundleAnalysisConfig.thresholds.chunkSize.warning) {
      analysis.warnings.push({
        type: chunk.size > bundleAnalysisConfig.thresholds.chunkSize.error ? 'error' : 'warning',
        message: `Chunk "${chunk.names.join(', ')}" is large (${formatBytes(chunk.size)})`,
        recommendation: 'Consider splitting this chunk or lazy loading non-critical code'
      });
    }
  });
  
  // Analyze assets
  analysis.summary.assets = stats.assets.map(asset => ({
    name: asset.name,
    size: asset.size,
    formatted: formatBytes(asset.size),
    type: getAssetType(asset.name)
  }));
  
  // Check for large assets
  stats.assets.forEach(asset => {
    const assetType = getAssetType(asset.name);
    const threshold = getAssetThreshold(assetType);
    
    if (asset.size > threshold) {
      analysis.warnings.push({
        type: 'warning',
        message: `Asset "${asset.name}" is large (${formatBytes(asset.size)})`,
        recommendation: getAssetOptimizationRecommendation(assetType)
      });
    }
  });
  
  // Generate performance recommendations
  analysis.performance = generatePerformanceRecommendations(analysis.summary);
  
  // Generate optimization recommendations
  analysis.recommendations = generateOptimizationRecommendations(analysis.summary);
  
  return analysis;
}

/**
 * Formats bytes into human readable format
 */
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Determines asset type based on file extension
 */
function getAssetType(filename) {
  const ext = filename.split('.').pop()?.toLowerCase();
  
  if (['js', 'mjs', 'ts'].includes(ext)) return 'javascript';
  if (['css', 'scss', 'less'].includes(ext)) return 'css';
  if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'avif'].includes(ext)) return 'image';
  if (['woff', 'woff2', 'ttf', 'eot'].includes(ext)) return 'font';
  if (['json', 'xml'].includes(ext)) return 'data';
  
  return 'other';
}

/**
 * Gets appropriate size threshold for asset type
 */
function getAssetThreshold(assetType) {
  const config = bundleAnalysisConfig.assets;
  
  switch (assetType) {
    case 'image': return config.images.maxSize;
    case 'font': return config.fonts.maxSize;
    case 'css': return config.css.maxSize;
    default: return bundleAnalysisConfig.thresholds.assetSize.warning;
  }
}

/**
 * Gets optimization recommendation for asset type
 */
function getAssetOptimizationRecommendation(assetType) {
  switch (assetType) {
    case 'image':
      return 'Consider using modern image formats (WebP, AVIF), optimizing compression, or lazy loading';
    case 'font':
      return 'Use WOFF2 format, subset fonts, or preload critical fonts';
    case 'css':
      return 'Remove unused CSS, use critical CSS inlining, or compress stylesheets';
    case 'javascript':
      return 'Enable tree shaking, use code splitting, or minify JavaScript';
    default:
      return 'Consider compression or alternative formats';
  }
}

/**
 * Generates performance recommendations based on bundle analysis
 */
function generatePerformanceRecommendations(summary) {
  const recommendations = [];
  const budget = bundleAnalysisConfig.performanceBudget;
  
  // Check against performance budgets
  if (summary.totalSize.bytes > budget.tti) {
    recommendations.push({
      metric: 'Time to Interactive',
      current: formatBytes(summary.totalSize.bytes),
      budget: formatBytes(budget.tti),
      recommendation: 'Reduce bundle size to improve Time to Interactive'
    });
  }
  
  if (summary.totalSize.bytes > budget.lcp) {
    recommendations.push({
      metric: 'Largest Contentful Paint',
      current: formatBytes(summary.totalSize.bytes),
      budget: formatBytes(budget.lcp),
      recommendation: 'Optimize critical resources for faster LCP'
    });
  }
  
  return recommendations;
}

/**
 * Generates specific optimization recommendations
 */
function generateOptimizationRecommendations(summary) {
  const recommendations = [];
  const config = bundleAnalysisConfig.recommendations;
  
  // Code splitting recommendations
  if (summary.totalSize.bytes > config.codeSplitting.vendorChunkThreshold) {
    recommendations.push({
      type: 'code-splitting',
      priority: 'high',
      title: 'Implement Vendor Code Splitting',
      description: 'Split vendor libraries into separate chunks for better caching',
      implementation: 'Configure build tool to separate vendor dependencies',
      expectedImprovement: '20-40% reduction in main bundle size'
    });
  }
  
  // Tree shaking recommendations
  recommendations.push({
    type: 'tree-shaking',
    priority: 'medium',
    title: 'Enable Tree Shaking',
    description: 'Remove unused code from the bundle',
    implementation: 'Ensure ES modules and proper sideEffects configuration',
    expectedImprovement: '10-30% reduction in bundle size'
  });
  
  // Compression recommendations
  recommendations.push({
    type: 'compression',
    priority: 'low',
    title: 'Enable Production Compression',
    description: 'Use Brotli and Gzip compression for assets',
    implementation: 'Configure server-side compression or CDN settings',
    expectedImprovement: `${Math.round((1 - config.compression.brotliRatio) * 100)}% size reduction`
  });
  
  // Dynamic imports recommendation
  recommendations.push({
    type: 'dynamic-imports',
    priority: 'medium',
    title: 'Use Dynamic Imports for Route Splitting',
    description: 'Load routes on demand to reduce initial bundle size',
    implementation: 'Convert static imports to dynamic imports for routes',
    expectedImprovement: '30-50% reduction in initial bundle size'
  });
  
  return recommendations;
}

export default bundleAnalysisConfig;