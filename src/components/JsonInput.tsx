import { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronDownIcon, DocumentArrowUpIcon, LinkIcon, SparklesIcon, DocumentDuplicateIcon, ExclamationTriangleIcon, CheckCircleIcon, XMarkIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useToast, toast } from './Toast';

interface JsonInputProps {
  value: string;
  onChange: (value: string) => void;
  onAnalyze: () => void;
  onReset: () => void;
  isAnalyzing: boolean;
  error: string;
}

interface ValidationError {
  line?: number;
  column?: number;
  message: string;
  suggestion?: string;
}

// Example document library
const exampleDocuments = {
  'E-commerce Order': {
    description: 'Complex e-commerce order with nested product details',
    document: `{
  "orderId": "ORD-2024-001",
  "timestamp": "2024-01-15T10:30:00Z",
  "customer": {
    "id": "CUST-12345",
    "name": "Alice Johnson",
    "email": "alice.johnson@email.com",
    "phone": "+1-555-0123",
    "address": {
      "street": "123 Main St",
      "city": "San Francisco",
      "state": "CA",
      "zipCode": "94105",
      "country": "USA",
      "coordinates": {
        "lat": 37.7749,
        "lng": -122.4194
      }
    },
    "loyaltyTier": "gold",
    "totalOrders": 47
  },
  "items": [
    {
      "productId": "PROD-001",
      "sku": "LAP-DELL-XPS13",
      "name": "Dell XPS 13 Laptop",
      "category": {
        "primary": "Electronics",
        "secondary": "Computers",
        "tags": ["laptop", "ultrabook", "business"]
      },
      "price": 1299.99,
      "quantity": 1,
      "specifications": {
        "cpu": "Intel i7-1165G7",
        "ram": "16GB LPDDR4x",
        "storage": "512GB NVMe SSD",
        "display": "13.4\\" FHD+ Touch",
        "weight": "2.64 lbs",
        "batteryLife": "up to 12 hours"
      },
      "reviews": {
        "averageRating": 4.6,
        "totalReviews": 1247,
        "ratingDistribution": {
          "5": 785,
          "4": 312,
          "3": 98,
          "2": 31,
          "1": 21
        }
      }
    },
    {
      "productId": "PROD-002",
      "sku": "ACC-MOUSE-LOG",
      "name": "Logitech MX Master 3",
      "category": {
        "primary": "Electronics",
        "secondary": "Accessories",
        "tags": ["mouse", "wireless", "productivity"]
      },
      "price": 99.99,
      "quantity": 1,
      "specifications": {
        "connectivity": "Bluetooth, USB-C",
        "battery": "70 days on full charge",
        "dpi": "4000 DPI",
        "buttons": 7,
        "weight": "141g"
      }
    }
  ],
  "pricing": {
    "subtotal": 1399.98,
    "tax": 119.00,
    "shipping": 0.00,
    "discounts": [
      {
        "type": "loyalty",
        "description": "Gold member discount",
        "amount": 70.00
      }
    ],
    "total": 1448.98
  },
  "shipping": {
    "method": "expedited",
    "carrier": "FedEx",
    "trackingNumber": "1234567890",
    "estimatedDelivery": "2024-01-17T18:00:00Z",
    "address": {
      "street": "123 Main St",
      "city": "San Francisco",
      "state": "CA",
      "zipCode": "94105",
      "country": "USA"
    }
  },
  "payment": {
    "method": "credit_card",
    "cardType": "visa",
    "last4": "1234",
    "transactionId": "TXN-ABC123",
    "status": "completed",
    "processedAt": "2024-01-15T10:32:15Z"
  },
  "metadata": {
    "source": "web",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    "sessionId": "sess_xyz789",
    "referrer": "https://google.com",
    "campaignId": "SPRING2024"
  }
}`
  },
  'Application Logs': {
    description: 'Structured application log entry with error details',
    document: `{
  "timestamp": "2024-01-15T14:32:18.847Z",
  "level": "ERROR",
  "service": "user-authentication-service",
  "version": "v2.1.3",
  "environment": "production",
  "requestId": "req-uuid-12345",
  "traceId": "trace-abc-def-789",
  "spanId": "span-123-456",
  "message": "Failed to authenticate user due to invalid token",
  "error": {
    "type": "TokenValidationError",
    "code": "AUTH_001",
    "message": "JWT token signature verification failed",
    "stack": "TokenValidationError: JWT token signature verification failed\\\\n    at validateToken (/app/src/auth/validator.js:45:13)\\\\n    at authenticateRequest (/app/src/middleware/auth.js:23:9)\\\\n    at Layer.handle [as handle_request] (/app/node_modules/express/lib/router/layer.js:95:5)",
    "details": {
      "tokenExpired": false,
      "signatureValid": false,
      "issuerValid": true,
      "audienceValid": true
    }
  },
  "user": {
    "id": "user-789",
    "email": "john.doe@example.com",
    "role": "customer",
    "lastLoginAt": "2024-01-14T09:15:22Z",
    "loginAttempts": 3
  },
  "request": {
    "method": "POST",
    "url": "/api/v1/auth/login",
    "headers": {
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      "content-type": "application/json",
      "x-forwarded-for": "192.168.1.100",
      "authorization": "Bearer [REDACTED]"
    },
    "ip": "192.168.1.100",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "body": {
      "username": "john.doe@example.com",
      "rememberMe": true
    }
  },
  "response": {
    "statusCode": 401,
    "headers": {
      "content-type": "application/json",
      "x-rate-limit-remaining": "4",
      "x-rate-limit-reset": "2024-01-15T15:00:00Z"
    },
    "body": {
      "error": "Unauthorized",
      "message": "Invalid authentication credentials",
      "code": "AUTH_001"
    },
    "responseTime": 142
  },
  "performance": {
    "duration": 142,
    "memoryUsage": {
      "rss": 45678912,
      "heapTotal": 32456789,
      "heapUsed": 23456789,
      "external": 1234567
    },
    "cpuUsage": {
      "user": 15234,
      "system": 8765
    }
  },
  "infrastructure": {
    "hostname": "auth-service-pod-abc123",
    "containerId": "docker-xyz789",
    "kubernetes": {
      "namespace": "production",
      "podName": "auth-service-deployment-abc123",
      "nodeName": "k8s-node-01"
    },
    "region": "us-west-2",
    "availabilityZone": "us-west-2a"
  },
  "tags": ["authentication", "security", "error", "jwt", "api"]
}`
  },
  'User Profile': {
    description: 'Comprehensive user profile with preferences and activity',
    document: `{
  "userId": "user-profile-456789",
  "personalInfo": {
    "firstName": "Emma",
    "lastName": "Rodriguez",
    "email": "emma.rodriguez@example.com",
    "phone": "+1-555-0198",
    "dateOfBirth": "1990-06-15",
    "avatar": "https://cdn.example.com/avatars/emma-456789.jpg",
    "timezone": "America/New_York",
    "locale": "en-US",
    "pronouns": "she/her"
  },
  "account": {
    "createdAt": "2020-03-10T08:30:00Z",
    "lastLoginAt": "2024-01-15T09:45:22Z",
    "emailVerified": true,
    "phoneVerified": false,
    "twoFactorEnabled": true,
    "status": "active",
    "subscriptionTier": "premium",
    "billingCycle": "annual"
  },
  "preferences": {
    "notifications": {
      "email": {
        "newsletter": true,
        "promotions": false,
        "updates": true,
        "security": true
      },
      "push": {
        "enabled": true,
        "types": ["messages", "reminders", "breaking_news"]
      },
      "sms": {
        "enabled": false,
        "emergencyOnly": true
      }
    },
    "privacy": {
      "profileVisibility": "friends",
      "activityTracking": true,
      "dataCollection": "essential",
      "thirdPartySharing": false
    },
    "interface": {
      "theme": "dark",
      "language": "en",
      "dateFormat": "MM/dd/yyyy",
      "timeFormat": "12h",
      "currency": "USD"
    }
  },
  "interests": {
    "categories": ["technology", "photography", "travel", "cooking", "fitness"],
    "skills": [
      {
        "name": "JavaScript",
        "level": "advanced",
        "yearsExperience": 8
      },
      {
        "name": "Photography",
        "level": "intermediate",
        "yearsExperience": 5
      },
      {
        "name": "Spanish",
        "level": "native",
        "yearsExperience": 25
      }
    ],
    "hobbies": [
      {
        "name": "Rock Climbing",
        "frequency": "weekly",
        "startedAt": "2018-09-01"
      },
      {
        "name": "Cooking",
        "frequency": "daily",
        "specialties": ["Mediterranean", "Asian Fusion"]
      }
    ]
  },
  "activity": {
    "loginStats": {
      "totalLogins": 1247,
      "averageSessionDuration": 1800,
      "lastWeekLogins": 12,
      "consecutiveDays": 5
    },
    "engagement": {
      "postsCreated": 89,
      "commentsPosted": 234,
      "likesGiven": 1567,
      "sharesCount": 43,
      "followersCount": 892,
      "followingCount": 456
    },
    "purchases": {
      "totalOrders": 67,
      "totalSpent": 2847.95,
      "averageOrderValue": 42.51,
      "favoriteCategories": ["Electronics", "Books", "Home & Garden"],
      "lastPurchase": "2024-01-10T14:22:00Z"
    }
  },
  "location": {
    "current": {
      "city": "New York",
      "state": "NY",
      "country": "USA",
      "coordinates": {
        "lat": 40.7128,
        "lng": -74.0060
      }
    },
    "history": [
      {
        "city": "Madrid",
        "country": "Spain",
        "period": "2015-2018"
      },
      {
        "city": "Boston",
        "state": "MA",
        "country": "USA",
        "period": "2018-2022"
      }
    ]
  },
  "devices": [
    {
      "id": "device-iphone-123",
      "type": "mobile",
      "brand": "Apple",
      "model": "iPhone 14 Pro",
      "os": "iOS 17.2",
      "lastSeen": "2024-01-15T09:45:22Z",
      "trusted": true
    },
    {
      "id": "device-macbook-456",
      "type": "desktop",
      "brand": "Apple",
      "model": "MacBook Pro M2",
      "os": "macOS 14.2",
      "lastSeen": "2024-01-14T18:30:15Z",
      "trusted": true
    }
  ]
}`
  },
  'IoT Sensor Data': {
    description: 'Time-series data from IoT environmental sensors',
    document: `{
  "sensorId": "ENV-SENSOR-001",
  "deviceInfo": {
    "manufacturer": "SensorTech Inc",
    "model": "ST-ENV-2024",
    "firmware": "v3.2.1",
    "installationDate": "2023-08-15T10:00:00Z",
    "lastMaintenance": "2024-01-01T09:00:00Z",
    "batteryLevel": 87,
    "signalStrength": -45
  },
  "location": {
    "building": "Office Complex A",
    "floor": 3,
    "room": "Conference Room 301",
    "coordinates": {
      "lat": 37.7749,
      "lng": -122.4194,
      "altitude": 45.2
    },
    "zone": "HVAC-Zone-3A"
  },
  "timestamp": "2024-01-15T14:30:00.000Z",
  "measurements": {
    "temperature": {
      "value": 22.5,
      "unit": "celsius",
      "accuracy": 0.1,
      "calibrationDate": "2023-12-15T12:00:00Z"
    },
    "humidity": {
      "value": 45.2,
      "unit": "percent",
      "accuracy": 2.0,
      "calibrationDate": "2023-12-15T12:00:00Z"
    },
    "pressure": {
      "value": 1013.25,
      "unit": "hPa",
      "accuracy": 0.5,
      "calibrationDate": "2023-12-15T12:00:00Z"
    },
    "co2": {
      "value": 420,
      "unit": "ppm",
      "accuracy": 5,
      "threshold": {
        "warning": 1000,
        "critical": 5000
      }
    },
    "airQuality": {
      "pm25": {
        "value": 12.5,
        "unit": "μg/m³",
        "category": "good"
      },
      "pm10": {
        "value": 18.3,
        "unit": "μg/m³",
        "category": "good"
      },
      "voc": {
        "value": 0.8,
        "unit": "ppm",
        "category": "low"
      }
    },
    "light": {
      "illuminance": {
        "value": 450,
        "unit": "lux"
      },
      "uv": {
        "value": 0.2,
        "unit": "UV index"
      }
    },
    "noise": {
      "level": 42.5,
      "unit": "dB",
      "frequency": {
        "dominant": 125,
        "unit": "Hz"
      }
    }
  },
  "alerts": [
    {
      "type": "maintenance",
      "severity": "low",
      "message": "Battery level below 90%, schedule maintenance",
      "timestamp": "2024-01-15T14:30:00.000Z",
      "acknowledged": false
    }
  ],
  "historicalData": {
    "last24Hours": {
      "temperatureRange": {
        "min": 20.1,
        "max": 24.8,
        "average": 22.3
      },
      "humidityRange": {
        "min": 42.0,
        "max": 48.5,
        "average": 45.1
      }
    },
    "trends": {
      "temperature": "stable",
      "humidity": "increasing",
      "co2": "normal",
      "airQuality": "stable"
    }
  },
  "connectivity": {
    "protocol": "LoRaWAN",
    "networkId": "network-001",
    "gatewayId": "gateway-alpha-7",
    "lastHeartbeat": "2024-01-15T14:29:45.000Z",
    "dataRate": "SF7BW125",
    "frequency": 915.2,
    "transmitPower": 14
  }
}`
  }
};

export function JsonInput({ value, onChange, onAnalyze, onReset, isAnalyzing, error }: JsonInputProps) {
  const { addToast } = useToast();
  const [showExamples, setShowExamples] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [isLoadingUrl, setIsLoadingUrl] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [isValidJson, setIsValidJson] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Validate JSON and provide helpful error messages
  const validateJson = useCallback((jsonString: string) => {
    if (!jsonString.trim()) {
      setValidationErrors([]);
      setIsValidJson(false);
      return;
    }

    try {
      JSON.parse(jsonString);
      setValidationErrors([]);
      setIsValidJson(true);
    } catch (err) {
      setIsValidJson(false);
      if (err instanceof SyntaxError) {
        const message = err.message;
        const lineMatch = message.match(/at position (\d+)/);
        let line, column;
        
        if (lineMatch && lineMatch[1]) {
          const position = parseInt(lineMatch[1]);
          const lines = jsonString.substring(0, position).split('\n');
          line = lines.length;
          const lastLine = lines[lines.length - 1];
          column = lastLine ? lastLine.length + 1 : 1;
        }

        let suggestion;
        if (message.includes('Unexpected token')) {
          if (message.includes('Unexpected token }')) {
            suggestion = 'Remove extra closing brace or add missing content before it';
          } else if (message.includes('Unexpected token ]')) {
            suggestion = 'Remove extra closing bracket or add missing array elements';
          } else if (message.includes('Unexpected token ,')) {
            suggestion = 'Remove trailing comma or add missing value after it';
          } else {
            suggestion = 'Check for missing quotes, commas, or brackets';
          }
        } else if (message.includes('Unterminated string')) {
          suggestion = 'Add missing closing quote for string value';
        } else if (message.includes('Expected property name')) {
          suggestion = 'Property names must be enclosed in double quotes';
        }

        setValidationErrors([{
          ...(line !== undefined && { line }),
          ...(column !== undefined && { column }),
          message: message.replace(/JSON.parse: /, '').replace(/at position \d+/, '').trim(),
          ...(suggestion !== undefined && { suggestion })
        }]);
      }
    }
  }, []);

  // Validate JSON whenever value changes
  useEffect(() => {
    validateJson(value);
  }, [value, validateJson]);

  // Format and prettify JSON
  const formatJson = () => {
    try {
      const parsed = JSON.parse(value);
      const formatted = JSON.stringify(parsed, null, 2);
      onChange(formatted);
      addToast(toast.success('JSON Formatted', 'Your JSON has been prettified and formatted'));
    } catch (err) {
      // If JSON is invalid, try to fix common issues
      let fixed = value
        .replace(/([{,]\s*)(\w+):/g, '$1"$2":') // Add quotes to unquoted keys
        .replace(/:\s*'([^']*)'/g, ': "$1"') // Replace single quotes with double quotes
        .replace(/,\s*([}\]])/g, '$1'); // Remove trailing commas
      
      try {
        const parsed = JSON.parse(fixed);
        const formatted = JSON.stringify(parsed, null, 2);
        onChange(formatted);
      } catch (fixErr) {
        // If auto-fix fails, just notify the user
        addToast(toast.warning(
          'Format Failed', 
          'Unable to format JSON. Please fix syntax errors first.'
        ));
      }
    }
  };

  // Handle file upload
  const handleFileUpload = async (file: File) => {
    if (!file.name.endsWith('.json')) {
      addToast(toast.warning('Invalid File Type', 'Please select a JSON file (.json)'));
      return;
    }

    try {
      const text = await file.text();
      onChange(text);
      addToast(toast.success('File Loaded', `Successfully loaded ${file.name}`));
    } catch (err) {
      addToast(toast.error('File Error', 'Error reading file: ' + (err instanceof Error ? err.message : 'Unknown error')));
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  // Load JSON from URL
  const loadFromUrl = async () => {
    if (!urlInput.trim()) return;
    
    setIsLoadingUrl(true);
    try {
      // Note: This will be limited by CORS in real environments
      // In a production app, you'd need a proxy server
      const response = await fetch(urlInput, {
        mode: 'cors',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const text = await response.text();
      onChange(text);
      setUrlInput('');
    } catch (err) {
      addToast(toast.error(
        'URL Load Error', 
        'Error loading from URL: ' + (err instanceof Error ? err.message : 'Unknown error') + 
            ' Note: Due to CORS restrictions, only URLs that allow cross-origin requests will work.',
        { duration: 8000 }
      ));
    } finally {
      setIsLoadingUrl(false);
    }
  };

  // Load example document
  const loadExample = (exampleKey: string) => {
    const example = exampleDocuments[exampleKey as keyof typeof exampleDocuments];
    if (example) {
      onChange(example.document);
      setShowExamples(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">JSON Document Input</h2>
      
      <div className="space-y-4">
        {/* File Upload and URL Input */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* File Upload */}
          <div 
            className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
              isDragOver 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              className="hidden"
            />
            <DocumentArrowUpIcon className="mx-auto h-8 w-8 text-gray-400 dark:text-gray-500 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Drop JSON file here or{' '}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                browse
              </button>
            </p>
          </div>

          {/* URL Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Load from URL:
            </label>
            <div className="flex space-x-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://api.example.com/data.json"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <button
                onClick={loadFromUrl}
                disabled={!urlInput.trim() || isLoadingUrl}
                className="px-3 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 flex items-center space-x-1 transition-colors"
              >
                {isLoadingUrl ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                ) : (
                  <LinkIcon className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* JSON Editor */}
        <div className="relative">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="json-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              JSON Document:
            </label>
            <div className="flex items-center space-x-2">
              {isValidJson && (
                <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                  Valid JSON
                </div>
              )}
              {validationErrors.length > 0 && (
                <div className="flex items-center text-red-600 dark:text-red-400 text-sm">
                  <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                  {validationErrors.length} error{validationErrors.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          </div>
          
          <div className="relative">
            <textarea
              ref={textareaRef}
              id="json-input"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className={`w-full h-48 sm:h-64 lg:h-72 p-3 border rounded-md font-mono text-sm focus:ring-2 focus:ring-blue-500 resize-vertical bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 ${
                validationErrors.length > 0 
                  ? 'border-red-300 dark:border-red-600 focus:border-red-500 dark:focus:border-red-400' 
                  : isValidJson && value.trim()
                  ? 'border-green-300 dark:border-green-600 focus:border-green-500 dark:focus:border-green-400'
                  : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'
              }`}
              placeholder="Enter JSON document to analyze..."
              spellCheck={false}
            />
          </div>
        </div>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className="space-y-2">
            {validationErrors.map((err, index) => (
              <div key={index} className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                <div className="flex items-start space-x-2">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-red-700 dark:text-red-300 text-sm font-medium">
                      {err.line && err.column ? `Line ${err.line}, Column ${err.column}: ` : ''}{err.message}
                    </p>
                    {err.suggestion && (
                      <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                        Suggestion: {err.suggestion}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Main Error (from parent component) */}
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={onAnalyze}
            disabled={isAnalyzing || !value.trim() || validationErrors.length > 0}
            className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
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
            onClick={formatJson}
            disabled={!value.trim()}
            className="px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-md hover:bg-green-700 dark:hover:bg-green-600 disabled:opacity-50 flex items-center space-x-2 transition-colors"
          >
            <SparklesIcon className="h-4 w-4" />
            <span>Format & Prettify</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowExamples(!showExamples)}
              className="px-4 py-2 bg-purple-600 dark:bg-purple-700 text-white rounded-md hover:bg-purple-700 dark:hover:bg-purple-600 flex items-center space-x-2 transition-colors"
            >
              <EyeIcon className="h-4 w-4" />
              <span>Examples</span>
              <ChevronDownIcon className={`h-4 w-4 transition-transform ${showExamples ? 'rotate-180' : ''}`} />
            </button>
            
            {showExamples && (
              <div className="absolute top-full mt-1 left-0 right-0 sm:right-auto sm:w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
                <div className="p-2 space-y-1 max-h-96 overflow-y-auto">
                  {Object.entries(exampleDocuments).map(([key, example]) => (
                    <button
                      key={key}
                      onClick={() => loadExample(key)}
                      className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors"
                    >
                      <div className="font-medium text-sm text-gray-900 dark:text-gray-100">{key}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{example.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              if (value.trim()) {
                navigator.clipboard.writeText(value);
                addToast(toast.success('Copied!', 'JSON copied to clipboard'));
              }
            }}
            disabled={!value.trim()}
            className="px-4 py-2 bg-gray-600 dark:bg-gray-500 text-white rounded-md hover:bg-gray-700 dark:hover:bg-gray-400 disabled:opacity-50 flex items-center space-x-2 transition-colors"
          >
            <DocumentDuplicateIcon className="h-4 w-4" />
            <span>Copy</span>
          </button>

          <button
            onClick={onReset}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 flex items-center space-x-2 transition-colors"
          >
            <XMarkIcon className="h-4 w-4" />
            <span>Reset</span>
          </button>
        </div>

        {/* Helper text */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p className="font-medium mb-2 text-gray-900 dark:text-gray-100">The analyzer will evaluate your JSON document for:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Field types and their OpenSearch mapping complexity</li>
            <li>Document structure and nesting depth</li>
            <li>Estimated storage requirements</li>
            <li>Indexing performance implications</li>
          </ul>
          
          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
            <p className="text-blue-800 dark:text-blue-300 text-xs">
              <strong>Tips:</strong> Use the Format & Prettify button to clean up your JSON. 
              Try the example documents to see how different data structures affect complexity scores.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}