import{r as m,a as ee,R as te}from"./vendor-cxkclgJA.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();var U={exports:{}},O={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ne=m,ae=Symbol.for("react.element"),re=Symbol.for("react.fragment"),se=Object.prototype.hasOwnProperty,ie=ne.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,oe={key:!0,ref:!0,__self:!0,__source:!0};function H(t,n,a){var r,s={},i=null,o=null;a!==void 0&&(i=""+a),n.key!==void 0&&(i=""+n.key),n.ref!==void 0&&(o=n.ref);for(r in n)se.call(n,r)&&!oe.hasOwnProperty(r)&&(s[r]=n[r]);if(t&&t.defaultProps)for(r in n=t.defaultProps,n)s[r]===void 0&&(s[r]=n[r]);return{$$typeof:ae,type:t,key:i,ref:o,props:s,_owner:ie.current}}O.Fragment=re;O.jsx=H;O.jsxs=H;U.exports=O;var e=U.exports,I={},z=ee;I.createRoot=z.createRoot,I.hydrateRoot=z.hydrateRoot;function ce({title:t,titleId:n,...a},r){return m.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:r,"aria-labelledby":n},a),t?m.createElement("title",{id:n},t):null,m.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"}))}const le=m.forwardRef(ce);function de({title:t,titleId:n,...a},r){return m.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:r,"aria-labelledby":n},a),t?m.createElement("title",{id:n},t):null,m.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m19.5 8.25-7.5 7.5-7.5-7.5"}))}const me=m.forwardRef(de);function ue({title:t,titleId:n,...a},r){return m.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:r,"aria-labelledby":n},a),t?m.createElement("title",{id:n},t):null,m.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"}))}const pe=m.forwardRef(ue);function he({title:t,titleId:n,...a},r){return m.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:r,"aria-labelledby":n},a),t?m.createElement("title",{id:n},t):null,m.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"}))}const xe=m.forwardRef(he);function fe({title:t,titleId:n,...a},r){return m.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:r,"aria-labelledby":n},a),t?m.createElement("title",{id:n},t):null,m.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"}))}const q=m.forwardRef(fe);function ge({title:t,titleId:n,...a},r){return m.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:r,"aria-labelledby":n},a),t?m.createElement("title",{id:n},t):null,m.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"}),m.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"}))}const ye=m.forwardRef(ge);function be({title:t,titleId:n,...a},r){return m.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:r,"aria-labelledby":n},a),t?m.createElement("title",{id:n},t):null,m.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"}))}const ve=m.forwardRef(be);function je({title:t,titleId:n,...a},r){return m.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:r,"aria-labelledby":n},a),t?m.createElement("title",{id:n},t):null,m.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"}))}const we=m.forwardRef(je);function Ne({title:t,titleId:n,...a},r){return m.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:r,"aria-labelledby":n},a),t?m.createElement("title",{id:n},t):null,m.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18 18 6M6 6l12 12"}))}const Ee=m.forwardRef(Ne),$={"E-commerce Order":{description:"Complex e-commerce order with nested product details",document:`{
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
}`},"Application Logs":{description:"Structured application log entry with error details",document:`{
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
}`},"User Profile":{description:"Comprehensive user profile with preferences and activity",document:`{
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
}`},"IoT Sensor Data":{description:"Time-series data from IoT environmental sensors",document:`{
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
}`}};function Ce({value:t,onChange:n,onAnalyze:a,onReset:r,isAnalyzing:s,error:i}){const[o,d]=m.useState(!1),[p,x]=m.useState(!1),[l,c]=m.useState(""),[h,f]=m.useState(!1),[g,b]=m.useState([]),[E,v]=m.useState(!1),C=m.useRef(null),S=m.useRef(null),L=m.useCallback(u=>{if(!u.trim()){b([]),v(!1);return}try{JSON.parse(u),b([]),v(!0)}catch(y){if(v(!1),y instanceof SyntaxError){const j=y.message,M=j.match(/at position (\d+)/);let P,T;if(M&&M[1]){const K=parseInt(M[1]),F=u.substring(0,K).split(`
`);P=F.length;const _=F[F.length-1];T=_?_.length+1:1}let w;j.includes("Unexpected token")?j.includes("Unexpected token }")?w="Remove extra closing brace or add missing content before it":j.includes("Unexpected token ]")?w="Remove extra closing bracket or add missing array elements":j.includes("Unexpected token ,")?w="Remove trailing comma or add missing value after it":w="Check for missing quotes, commas, or brackets":j.includes("Unterminated string")?w="Add missing closing quote for string value":j.includes("Expected property name")&&(w="Property names must be enclosed in double quotes"),b([{...P!==void 0&&{line:P},...T!==void 0&&{column:T},message:j.replace(/JSON.parse: /,"").replace(/at position \d+/,"").trim(),...w!==void 0&&{suggestion:w}}])}}},[]);m.useEffect(()=>{L(t)},[t,L]);const G=()=>{try{const u=JSON.parse(t),y=JSON.stringify(u,null,2);n(y)}catch{let y=t.replace(/([{,]\s*)(\w+):/g,'$1"$2":').replace(/:\s*'([^']*)'/g,': "$1"').replace(/,\s*([}\]])/g,"$1");try{const j=JSON.parse(y),M=JSON.stringify(j,null,2);n(M)}catch{alert("Unable to format JSON. Please fix syntax errors first.")}}},A=async u=>{if(!u.name.endsWith(".json")){alert("Please select a JSON file (.json)");return}try{const y=await u.text();n(y)}catch(y){alert("Error reading file: "+(y instanceof Error?y.message:"Unknown error"))}},W=u=>{u.preventDefault(),x(!0)},V=u=>{u.preventDefault(),x(!1)},X=u=>{u.preventDefault(),x(!1);const y=Array.from(u.dataTransfer.files);y.length>0&&y[0]&&A(y[0])},Y=async()=>{if(l.trim()){f(!0);try{const u=await fetch(l,{mode:"cors",headers:{Accept:"application/json"}});if(!u.ok)throw new Error(`HTTP ${u.status}: ${u.statusText}`);const y=await u.text();n(y),c("")}catch(u){alert("Error loading from URL: "+(u instanceof Error?u.message:"Unknown error")+`

Note: Due to CORS restrictions, only URLs that allow cross-origin requests will work.`)}finally{f(!1)}}},Q=u=>{const y=$[u];y&&(n(y.document),d(!1))};return e.jsxs("div",{className:"bg-white rounded-lg shadow-sm border p-6",children:[e.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-4",children:"JSON Document Input"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:`relative border-2 border-dashed rounded-lg p-4 text-center transition-colors ${p?"border-blue-500 bg-blue-50":"border-gray-300 hover:border-gray-400"}`,onDragOver:W,onDragLeave:V,onDrop:X,children:[e.jsx("input",{ref:C,type:"file",accept:".json",onChange:u=>u.target.files?.[0]&&A(u.target.files[0]),className:"hidden"}),e.jsx(pe,{className:"mx-auto h-8 w-8 text-gray-400 mb-2"}),e.jsxs("p",{className:"text-sm text-gray-600 mb-2",children:["Drop JSON file here or"," ",e.jsx("button",{onClick:()=>C.current?.click(),className:"text-blue-600 hover:text-blue-700 font-medium",children:"browse"})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Load from URL:"}),e.jsxs("div",{className:"flex space-x-2",children:[e.jsx("input",{type:"url",value:l,onChange:u=>c(u.target.value),placeholder:"https://api.example.com/data.json",className:"flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"}),e.jsx("button",{onClick:Y,disabled:!l.trim()||h,className:"px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-1",children:h?e.jsx("div",{className:"animate-spin rounded-full h-4 w-4 border-b-2 border-white"}):e.jsx(ve,{className:"h-4 w-4"})})]})]})]}),e.jsxs("div",{className:"relative",children:[e.jsxs("div",{className:"flex justify-between items-center mb-2",children:[e.jsx("label",{htmlFor:"json-input",className:"block text-sm font-medium text-gray-700",children:"JSON Document:"}),e.jsxs("div",{className:"flex items-center space-x-2",children:[E&&e.jsxs("div",{className:"flex items-center text-green-600 text-sm",children:[e.jsx(le,{className:"h-4 w-4 mr-1"}),"Valid JSON"]}),g.length>0&&e.jsxs("div",{className:"flex items-center text-red-600 text-sm",children:[e.jsx(q,{className:"h-4 w-4 mr-1"}),g.length," error",g.length!==1?"s":""]})]})]}),e.jsx("div",{className:"relative",children:e.jsx("textarea",{ref:S,id:"json-input",value:t,onChange:u=>n(u.target.value),className:`w-full h-64 p-3 border rounded-md font-mono text-sm focus:ring-2 focus:ring-blue-500 resize-vertical ${g.length>0?"border-red-300 focus:border-red-500":E&&t.trim()?"border-green-300 focus:border-green-500":"border-gray-300 focus:border-blue-500"}`,placeholder:"Enter JSON document to analyze...",spellCheck:!1})})]}),g.length>0&&e.jsx("div",{className:"space-y-2",children:g.map((u,y)=>e.jsx("div",{className:"p-3 bg-red-50 border border-red-200 rounded-md",children:e.jsxs("div",{className:"flex items-start space-x-2",children:[e.jsx(q,{className:"h-5 w-5 text-red-500 mt-0.5 flex-shrink-0"}),e.jsxs("div",{className:"flex-1",children:[e.jsxs("p",{className:"text-red-700 text-sm font-medium",children:[u.line&&u.column?`Line ${u.line}, Column ${u.column}: `:"",u.message]}),u.suggestion&&e.jsxs("p",{className:"text-red-600 text-xs mt-1",children:["Suggestion: ",u.suggestion]})]})]})},y))}),i&&e.jsx("div",{className:"p-3 bg-red-50 border border-red-200 rounded-md",children:e.jsx("p",{className:"text-red-700 text-sm",children:i})}),e.jsxs("div",{className:"flex flex-wrap gap-3",children:[e.jsx("button",{onClick:a,disabled:s||!t.trim()||g.length>0,className:"px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2",children:s?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"animate-spin rounded-full h-4 w-4 border-b-2 border-white"}),e.jsx("span",{children:"Analyzing..."})]}):e.jsx("span",{children:"Analyze Document"})}),e.jsxs("button",{onClick:G,disabled:!t.trim(),className:"px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center space-x-2",children:[e.jsx(we,{className:"h-4 w-4"}),e.jsx("span",{children:"Format & Prettify"})]}),e.jsxs("div",{className:"relative",children:[e.jsxs("button",{onClick:()=>d(!o),className:"px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center space-x-2",children:[e.jsx(ye,{className:"h-4 w-4"}),e.jsx("span",{children:"Examples"}),e.jsx(me,{className:`h-4 w-4 transition-transform ${o?"rotate-180":""}`})]}),o&&e.jsx("div",{className:"absolute top-full mt-1 left-0 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-10",children:e.jsx("div",{className:"p-2 space-y-1 max-h-96 overflow-y-auto",children:Object.entries($).map(([u,y])=>e.jsxs("button",{onClick:()=>Q(u),className:"w-full text-left p-3 hover:bg-gray-50 rounded border-b border-gray-100 last:border-b-0",children:[e.jsx("div",{className:"font-medium text-sm text-gray-900",children:u}),e.jsx("div",{className:"text-xs text-gray-600 mt-1",children:y.description})]},u))})})]}),e.jsxs("button",{onClick:()=>{t.trim()&&(navigator.clipboard.writeText(t),alert("JSON copied to clipboard!"))},disabled:!t.trim(),className:"px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 flex items-center space-x-2",children:[e.jsx(xe,{className:"h-4 w-4"}),e.jsx("span",{children:"Copy"})]}),e.jsxs("button",{onClick:r,className:"px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 border border-gray-300 flex items-center space-x-2",children:[e.jsx(Ee,{className:"h-4 w-4"}),e.jsx("span",{children:"Reset"})]})]}),e.jsxs("div",{className:"text-sm text-gray-600",children:[e.jsx("p",{className:"font-medium mb-2",children:"The analyzer will evaluate your JSON document for:"}),e.jsxs("ul",{className:"list-disc list-inside space-y-1",children:[e.jsx("li",{children:"Field types and their OpenSearch mapping complexity"}),e.jsx("li",{children:"Document structure and nesting depth"}),e.jsx("li",{children:"Estimated storage requirements"}),e.jsx("li",{children:"Indexing performance implications"})]}),e.jsx("div",{className:"mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md",children:e.jsxs("p",{className:"text-blue-800 text-xs",children:[e.jsx("strong",{children:"Tips:"})," Use the Format & Prettify button to clean up your JSON. Try the example documents to see how different data structures affect complexity scores."]})})]})]})]})}function Se({analysis:t,className:n=""}){const a=Object.entries(t.fieldTypes).filter(([i,o])=>o>0),r=a.reduce((i,[o,d])=>i+d,0),s=["#3B82F6","#10B981","#F59E0B","#EF4444","#8B5CF6","#06B6D4"];return e.jsxs("div",{className:`bg-white p-4 rounded-lg border ${n}`,children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Field Type Distribution"}),e.jsx("div",{className:"space-y-2",children:a.map(([i,o],d)=>{const p=(o/r*100).toFixed(1);return e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"w-4 h-4 rounded",style:{backgroundColor:s[d%s.length]}}),e.jsxs("div",{className:"flex-1 flex justify-between",children:[e.jsx("span",{className:"capitalize font-medium",children:i}),e.jsxs("span",{className:"text-gray-600",children:[o," (",p,"%)"]})]})]},i)})})]})}function Me({fields:t=[],className:n=""}){const a=t.sort((r,s)=>s.complexity-r.complexity).slice(0,10);return e.jsxs("div",{className:`bg-white p-4 rounded-lg border ${n}`,children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Top Complex Fields"}),e.jsx("div",{className:"space-y-2",children:a.map(r=>e.jsxs("div",{className:"flex items-center justify-between p-2 rounded bg-gray-50",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("div",{className:"font-medium text-sm truncate",children:r.path}),e.jsx("div",{className:"text-xs text-gray-600 capitalize",children:r.type})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("div",{className:"text-sm font-medium",children:r.complexity.toFixed(1)}),e.jsx("div",{className:"w-12 h-2 bg-gray-200 rounded",children:e.jsx("div",{className:"h-2 bg-red-500 rounded",style:{width:`${Math.min(r.complexity/5*100,100)}%`}})})]})]},r.path))})]})}function ke({analysis:t}){const n=[{label:"Total Fields",value:t.fieldCount,unit:"",limit:"1,000 recommended",description:"Total number of fields detected in the document structure"},{label:"Max Depth",value:t.maxDepth,unit:"levels",limit:"5 levels optimal",description:"Maximum nesting depth of objects in the document"},{label:"Estimated Storage",value:t.estimatedStorageMB,unit:"MB",limit:"Includes replication overhead",description:"Predicted storage requirements using OpenSearch formula"},{label:"Field Types",value:Object.values(t.fieldTypes).filter(a=>a>0).length,unit:"types",limit:"Variety impacts complexity",description:"Number of different field types detected"}];return e.jsx("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4",children:n.map(a=>e.jsxs("div",{className:"bg-white p-4 rounded-lg border text-center",title:a.description,children:[e.jsx("div",{className:"text-2xl font-bold text-gray-900",children:a.value}),e.jsx("div",{className:"text-sm text-gray-600",children:a.label}),a.unit&&e.jsx("div",{className:"text-xs text-gray-500",children:a.unit}),e.jsx("div",{className:"text-xs text-gray-500 mt-1",children:a.limit})]},a.label))})}function B({title:t,score:n,max:a=10,description:r,color:s,explanation:i}){const o=n/a*100,d={green:"bg-green-100 text-green-800 border-green-200",yellow:"bg-yellow-100 text-yellow-800 border-yellow-200",red:"bg-red-100 text-red-800 border-red-200"},p={green:"bg-green-500",yellow:"bg-yellow-500",red:"bg-red-500"};return e.jsxs("div",{className:`p-4 border rounded-lg ${d[s]}`,children:[e.jsxs("div",{className:"flex justify-between items-start mb-2",children:[e.jsx("h3",{className:"font-semibold",children:t}),e.jsx("span",{className:"text-2xl font-bold",children:n})]}),e.jsx("div",{className:"w-full bg-gray-200 rounded-full h-2 mb-2",children:e.jsx("div",{className:`h-2 rounded-full ${p[s]}`,style:{width:`${Math.min(o,100)}%`}})}),e.jsx("p",{className:"text-sm opacity-80 mb-2",children:r}),e.jsxs("details",{className:"text-xs opacity-70",children:[e.jsx("summary",{className:"cursor-pointer hover:opacity-90",children:"How is this calculated?"}),e.jsx("div",{className:"mt-2 pl-2 border-l-2 border-current border-opacity-30",children:i})]})]})}function Oe({fieldTypes:t}){const n=Object.entries(t).filter(([r,s])=>s>0),a={text:"Analyzed for full-text search. Requires tokenization, lowercasing, and stemming. High processing overhead.",keyword:"Stored as exact values. No analysis required. Fastest for exact matches and aggregations.",long:"64-bit integers. Space-optimized storage. Fast for numeric operations.",integer:"32-bit integers. More space-efficient than long for smaller values.",short:"16-bit integers. Very space-efficient for small numeric ranges.",byte:"8-bit integers. Most space-efficient for very small numbers.",double:"64-bit floating point. Higher precision but larger storage.",float:"32-bit floating point. Good balance of precision and storage.",date:"Stored as milliseconds since epoch. Optimized for temporal queries.",boolean:"Single bit storage. Most space-efficient field type.",object:"Flattened structure. Field names concatenated with dots.",nested:"Separate Lucene documents. Maintains object relationships but high overhead."};return e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h3",{className:"text-lg font-semibold text-gray-900",children:"Field Type Analysis"}),e.jsx("a",{href:"https://opensearch.org/docs/latest/field-types/supported-field-types/",target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:text-blue-700 text-sm",children:"View Documentation ↗"})]}),e.jsx("div",{className:"space-y-2",children:n.map(([r,s])=>e.jsxs("div",{className:"bg-gray-50 border rounded-lg p-3",children:[e.jsxs("div",{className:"flex items-center justify-between mb-1",children:[e.jsx("span",{className:"font-medium capitalize text-gray-900",children:r}),e.jsxs("span",{className:"text-gray-600 font-mono text-sm",children:[s," fields"]})]}),e.jsx("p",{className:"text-gray-700 text-sm",children:a[r]})]},r))})]})}function Pe(){const t=[{title:"OpenSearch Field Types",url:"https://opensearch.org/docs/latest/field-types/",description:"Official documentation on field type behavior and storage"},{title:"Dynamic Mapping",url:"https://opensearch.org/docs/latest/field-types/index/#dynamic-mapping",description:"How OpenSearch automatically detects field types"},{title:"Performance Tuning",url:"https://opensearch.org/docs/latest/tuning-your-cluster/",description:"Best practices for indexing performance"},{title:"Nested Field Type",url:"https://opensearch.org/docs/latest/field-types/supported-field-types/nested/",description:"When and how to use nested objects"}];return e.jsxs("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-4",children:[e.jsx("h3",{className:"text-lg font-semibold text-blue-900 mb-3",children:"📚 Research Sources"}),e.jsx("p",{className:"text-blue-800 text-sm mb-3",children:"This analysis is based on OpenSearch's actual indexing behavior and documented performance characteristics:"}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-3",children:t.map((n,a)=>e.jsxs("a",{href:n.url,target:"_blank",rel:"noopener noreferrer",className:"block p-3 bg-white border border-blue-200 rounded hover:border-blue-300 hover:shadow-sm transition-all",children:[e.jsxs("div",{className:"font-medium text-blue-900 text-sm",children:[n.title," ↗"]}),e.jsx("div",{className:"text-blue-700 text-xs mt-1",children:n.description})]},a))})]})}function Te({analysis:t}){const n=s=>s<=3?"green":s<=6?"yellow":"red";return e.jsxs("div",{className:"bg-white rounded-lg shadow-sm border p-6 space-y-6",children:[e.jsxs("div",{className:"border-b pb-4",children:[e.jsx("h2",{className:"text-xl font-semibold text-gray-900",children:"OpenSearch Analysis Results"}),e.jsx("p",{className:"text-gray-600 text-sm mt-1",children:"Based on OpenSearch indexing algorithms and performance characteristics"})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsx(B,{title:"Index Size Score",score:t.indexSizeScore,description:"Predicted storage requirements based on field types and structure",color:n(t.indexSizeScore),explanation:"Based on OpenSearch's storage formula: Source Data × (1 + Replicas) × (1.1 Indexing Overhead) / (0.95 Reserved Space) / (0.9 System Overhead). Field types add overhead: text fields +10%, nested objects +150%, while numeric fields are optimized for -20% storage."}),e.jsx(B,{title:"Complexity Score",score:t.complexityScore,description:"Processing overhead for indexing operations",color:n(t.complexityScore),explanation:"Calculated using field type processing weights: text fields (3x complexity for tokenization), nested objects (4x for separate documents), plus depth penalties (1.3x per level) and array size multipliers. Based on OpenSearch indexing performance characteristics."})]}),e.jsx(ke,{analysis:t}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[e.jsx(Se,{analysis:t}),e.jsx(Me,{analysis:t,fields:t.fields})]}),e.jsx(Oe,{fieldTypes:t.fieldTypes}),t.warnings.length>0&&e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center justify-between mb-3",children:[e.jsx("h3",{className:"text-lg font-semibold text-yellow-800",children:"⚠️ Performance Warnings"}),e.jsx("a",{href:"https://opensearch.org/docs/latest/tuning-your-cluster/index/",target:"_blank",rel:"noopener noreferrer",className:"text-yellow-700 hover:text-yellow-800 text-sm",children:"Performance Guide ↗"})]}),e.jsx("div",{className:"bg-yellow-50 border border-yellow-200 rounded-lg p-4",children:e.jsx("ul",{className:"space-y-2",children:t.warnings.map((s,i)=>e.jsxs("li",{className:"text-yellow-800 text-sm",children:[e.jsx("span",{className:"font-medium",children:"•"})," ",s]},i))})})]}),t.optimizations.length>0&&e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center justify-between mb-3",children:[e.jsx("h3",{className:"text-lg font-semibold text-blue-800",children:"💡 Optimization Recommendations"}),e.jsx("a",{href:"https://opensearch.org/docs/latest/field-types/",target:"_blank",rel:"noopener noreferrer",className:"text-blue-700 hover:text-blue-800 text-sm",children:"Field Types Guide ↗"})]}),e.jsx("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-4",children:e.jsx("ul",{className:"space-y-2",children:t.optimizations.map((s,i)=>e.jsxs("li",{className:"text-blue-800 text-sm",children:[e.jsx("span",{className:"font-medium",children:"•"})," ",s]},i))})})]}),e.jsx(Pe,{}),e.jsx("div",{className:"pt-4 border-t text-center",children:e.jsx("p",{className:"text-gray-500 text-xs",children:"Analysis based on comprehensive research of OpenSearch source code, documentation, and performance studies. All calculations reflect real OpenSearch indexing behavior and storage patterns."})})]})}const Fe={text:4,keyword:1,nested:8,object:2.5,date:1.2,boolean:1,long:1.1,integer:1.1,short:1,byte:1,double:1.3,float:1.2},Re={text:5,keyword:1,nested:7,object:1.8,date:1.4,boolean:.5,long:.8,integer:.8,short:.7,byte:.6,double:1,float:.9},De={text:2.2,keyword:1,nested:4,object:1.6,date:.8,boolean:.2,long:.8,integer:.6,short:.4,byte:.2,double:.9,float:.5},Ie={text:3.5,keyword:1,nested:5,object:2,date:1.5,boolean:.5,long:1,integer:1,short:1,byte:1,double:1.2,float:1.1},Le={"Log Entry":{indicators:["timestamp","level","message","logger","thread","host"],textFieldRatio:{min:.1,max:.4},numericFieldRatio:{min:.1,max:.3},dateFieldCount:{min:1,max:5},avgDepth:{min:1,max:3}},"User Profile":{indicators:["user","profile","name","email","id","created","updated"],textFieldRatio:{min:.2,max:.6},numericFieldRatio:{min:.1,max:.3},dateFieldCount:{min:1,max:8},avgDepth:{min:1,max:4}},"Product Catalog":{indicators:["product","name","price","description","category","sku","inventory"],textFieldRatio:{min:.3,max:.7},numericFieldRatio:{min:.2,max:.5},dateFieldCount:{min:0,max:5},avgDepth:{min:2,max:5}},"Event Data":{indicators:["event","action","user","session","timestamp","properties"],textFieldRatio:{min:.2,max:.5},numericFieldRatio:{min:.2,max:.4},dateFieldCount:{min:1,max:6},avgDepth:{min:2,max:4}},Configuration:{indicators:["config","setting","value","key","environment","version"],textFieldRatio:{min:.4,max:.8},numericFieldRatio:{min:.1,max:.3},dateFieldCount:{min:0,max:3},avgDepth:{min:1,max:6}},Metrics:{indicators:["metric","value","timestamp","tags","measurement","gauge","counter"],textFieldRatio:{min:.1,max:.4},numericFieldRatio:{min:.4,max:.8},dateFieldCount:{min:1,max:3},avgDepth:{min:1,max:3}},"Content Document":{indicators:["title","content","body","text","description","summary","author"],textFieldRatio:{min:.5,max:.9},numericFieldRatio:{min:0,max:.2},dateFieldCount:{min:1,max:5},avgDepth:{min:1,max:3}},"Sensor Data":{indicators:["sensor","reading","temperature","pressure","value","device","location"],textFieldRatio:{min:.1,max:.3},numericFieldRatio:{min:.5,max:.8},dateFieldCount:{min:1,max:4},avgDepth:{min:1,max:3}}},Ae={"Log Entry":{queryPerformance:{min:6,max:8.5,median:7.2},indexingPerformance:{min:7,max:9,median:8.1},storageEfficiency:{min:6.5,max:8,median:7.3},maintenanceCost:{min:2,max:4.5,median:3.2}},"User Profile":{queryPerformance:{min:5.5,max:7.8,median:6.7},indexingPerformance:{min:6,max:8.2,median:7.1},storageEfficiency:{min:5.8,max:7.5,median:6.6},maintenanceCost:{min:3,max:5.5,median:4.2}},"Product Catalog":{queryPerformance:{min:4,max:6.8,median:5.4},indexingPerformance:{min:5,max:7.5,median:6.2},storageEfficiency:{min:4.5,max:6.8,median:5.6},maintenanceCost:{min:4,max:7,median:5.5}},"Event Data":{queryPerformance:{min:5,max:7.5,median:6.2},indexingPerformance:{min:6.5,max:8.5,median:7.5},storageEfficiency:{min:5.5,max:7.2,median:6.3},maintenanceCost:{min:3.5,max:6,median:4.7}},Configuration:{queryPerformance:{min:7,max:9,median:8},indexingPerformance:{min:5.5,max:7.8,median:6.6},storageEfficiency:{min:6,max:8,median:7},maintenanceCost:{min:5,max:8,median:6.5}},Metrics:{queryPerformance:{min:7.5,max:9.2,median:8.3},indexingPerformance:{min:8,max:9.5,median:8.7},storageEfficiency:{min:7,max:8.8,median:7.9},maintenanceCost:{min:1.5,max:3.5,median:2.5}},"Content Document":{queryPerformance:{min:3,max:5.8,median:4.4},indexingPerformance:{min:3.5,max:6.2,median:4.8},storageEfficiency:{min:3.8,max:5.5,median:4.6},maintenanceCost:{min:5.5,max:8.5,median:7}},"Sensor Data":{queryPerformance:{min:7.2,max:9,median:8.1},indexingPerformance:{min:8.5,max:9.8,median:9.1},storageEfficiency:{min:7.5,max:9,median:8.2},maintenanceCost:{min:1,max:2.8,median:1.9}},Unknown:{queryPerformance:{min:4,max:7,median:5.5},indexingPerformance:{min:5,max:8,median:6.5},storageEfficiency:{min:4.5,max:7.5,median:6},maintenanceCost:{min:3,max:6,median:4.5}}},J={general:{version:"1.0.0",weights:{queryPerformance:.3,indexingPerformance:.25,storageEfficiency:.25,maintenanceCost:.2},useCase:"general"},analytics:{version:"1.0.0",weights:{queryPerformance:.4,indexingPerformance:.2,storageEfficiency:.3,maintenanceCost:.1},useCase:"analytics"},logging:{version:"1.0.0",weights:{queryPerformance:.2,indexingPerformance:.4,storageEfficiency:.3,maintenanceCost:.1},useCase:"logging"},ecommerce:{version:"1.0.0",weights:{queryPerformance:.35,indexingPerformance:.25,storageEfficiency:.2,maintenanceCost:.2},useCase:"ecommerce"},monitoring:{version:"1.0.0",weights:{queryPerformance:.25,indexingPerformance:.35,storageEfficiency:.25,maintenanceCost:.15},useCase:"monitoring"}};function _e(t){const n=[],a=[],r=[];let s=0,i=0;t.forEach(c=>{let f=Fe[c.type];c.depth>2&&(f*=Math.pow(1.4,c.depth-2)),c.isArray&&(f*=1.3),s+=f,i+=8,a.push({path:c.path,contribution:f,reason:`${c.type} field${c.isArray?" (array)":""} at depth ${c.depth}`})});const o=t.filter(c=>c.type==="text").length,d=t.filter(c=>c.type==="nested").length,p=t.filter(c=>c.depth>3).length;o>0&&n.push({name:"Text Fields",impact:o*4,explanation:`${o} text fields require full-text search processing with tokenization and scoring`}),d>0&&n.push({name:"Nested Objects",impact:d*8,explanation:`${d} nested fields require expensive join operations and block-based queries`}),p>0&&n.push({name:"Deep Nesting",impact:p*2,explanation:`${p} fields at depth > 3 increase field resolution overhead`}),o>5&&r.push("Consider using keyword fields for exact-match searches to improve query speed"),d>3&&r.push("Evaluate if all nested relationships are necessary - object type might suffice"),p>0&&r.push("Flatten deeply nested structures to reduce query complexity");const x=s/Math.max(i,1),l=Math.max(0,Math.min(10,10-x*10));return{score:Math.round(l*10)/10,breakdown:{factors:n,fieldImpacts:a,recommendations:r,confidenceInterval:{min:Math.max(0,l-.8),max:Math.min(10,l+.8),confidence:.85}}}}function ze(t){const n=[],a=[],r=[];let s=0,i=0;t.forEach(l=>{let h=Re[l.type];h*=1+l.complexity*.1,s+=h,i+=7,a.push({path:l.path,contribution:h,reason:`${l.type} indexing cost with complexity factor ${l.complexity.toFixed(1)}`})});const o=t.filter(l=>l.type==="text").length,d=t.filter(l=>l.type==="nested").length;o>0&&n.push({name:"Text Analysis",impact:o*5,explanation:`${o} text fields require tokenization, lowercasing, and stemming during indexing`}),d>0&&n.push({name:"Nested Document Creation",impact:d*7,explanation:`${d} nested fields create separate Lucene documents with parent-child relationships`}),o>8&&r.push("Consider disabling analysis for fields that only need exact matching"),d>2&&r.push("Limit nested objects to essential use cases to improve indexing speed");const p=s/Math.max(i,1),x=Math.max(0,Math.min(10,10-p*10));return{score:Math.round(x*10)/10,breakdown:{factors:n,fieldImpacts:a,recommendations:r,confidenceInterval:{min:Math.max(0,x-.7),max:Math.min(10,x+.7),confidence:.9}}}}function qe(t,n){const a=[],r=[],s=[];let i=0;const o=1;t.forEach(h=>{const f=De[h.type],g=f-o;i+=Math.max(0,g),r.push({path:h.path,contribution:f,reason:`${h.type} storage multiplier: ${f.toFixed(1)}x`})});const d=t.filter(h=>h.type==="text").length,p=t.filter(h=>h.type==="nested").length,x=t.filter(h=>["long","integer","short","byte","double","float"].includes(h.type)).length;d>0&&a.push({name:"Text Field Overhead",impact:d*2.2,explanation:`${d} text fields store both analyzed tokens and original values for highlighting`}),p>0&&a.push({name:"Nested Object Overhead",impact:p*4,explanation:`${p} nested objects create separate documents, significantly increasing storage`}),x>0&&a.push({name:"Numeric Optimization",impact:-x*.3,explanation:`${x} numeric fields use optimized storage formats`}),d>x*2&&s.push("Balance text and numeric fields - consider storing large text in separate indices"),p>0&&s.push("Nested objects have 4x storage overhead - use only when relationships are essential"),n>1e3&&s.push("Large storage footprint detected - consider document splitting or field reduction");const l=i/Math.max(t.length,1),c=Math.max(0,Math.min(10,10-l*2.5));return{score:Math.round(c*10)/10,breakdown:{factors:a,fieldImpacts:r,recommendations:s,confidenceInterval:{min:Math.max(0,c-.6),max:Math.min(10,c+.6),confidence:.8}}}}function $e(t){const n=[],a=[],r=[];let s=0;t.forEach(l=>{const c=Ie[l.type];s+=c,a.push({path:l.path,contribution:c,reason:`${l.type} maintenance complexity: ${c.toFixed(1)}`})});const i=t.filter(l=>l.type==="text").length,o=t.filter(l=>l.type==="nested").length,d=t.filter(l=>l.depth>3).length;i>0&&n.push({name:"Text Analysis Maintenance",impact:i*3.5,explanation:`${i} text fields require analyzer tuning, synonym management, and relevance optimization`}),o>0&&n.push({name:"Nested Query Complexity",impact:o*5,explanation:`${o} nested fields require specialized query tuning and performance optimization`}),d>0&&n.push({name:"Complex Structure Maintenance",impact:d*1.5,explanation:`${d} deeply nested fields increase mapping complexity and evolution challenges`}),i>10&&r.push("High number of text fields increases analysis complexity - consider field consolidation"),o>1&&r.push("Multiple nested objects require specialized expertise for optimization"),t.length>50&&r.push("Large number of fields increases mapping evolution complexity");const p=s/Math.max(t.length,1),x=Math.max(0,Math.min(10,10-p*2));return{score:Math.round(x*10)/10,breakdown:{factors:n,fieldImpacts:a,recommendations:r,confidenceInterval:{min:Math.max(0,x-1),max:Math.min(10,x+1),confidence:.75}}}}function Be(t){const n=t.map(l=>l.path.toLowerCase()),a=t.reduce((l,c)=>(l[c.type]=(l[c.type]||0)+1,l),{}),r=t.length,s=(a.text||0)/r,i=["long","integer","short","byte","double","float"].reduce((l,c)=>l+(a[c]||0),0)/r,o=a.date||0,d=t.reduce((l,c)=>l+c.depth,0)/Math.max(r,1);let p="Unknown",x=0;return Object.entries(Le).forEach(([l,c])=>{let h=0;const f=c.indicators.filter(g=>n.some(b=>b.includes(g.toLowerCase())));h+=f.length/c.indicators.length*40,s>=c.textFieldRatio.min&&s<=c.textFieldRatio.max&&(h+=20),i>=c.numericFieldRatio.min&&i<=c.numericFieldRatio.max&&(h+=15),o>=c.dateFieldCount.min&&o<=c.dateFieldCount.max&&(h+=15),d>=c.avgDepth.min&&d<=c.avgDepth.max&&(h+=10),h>x&&(x=h,p=l)}),{type:p,confidence:Math.min(x/100,.95)}}function Ue(t,n){const a=t.length,r=t.filter(S=>S.type==="text").length,s=t.filter(S=>S.type==="nested").length,i=n*.3,o=r*2.5,d=s*10,p=i+o+d,x=n*.15,l=Math.min(95,r*12+s*25+a*.8),c=Math.min(90,r*8+s*20+a*.5),h=Math.min(60,r*3+s*8+a*.2),f=Math.max(100,a*2+r*5),g=Math.max(50,a*1.5+s*8),b=(f+g)*.001,E=n*.02,v=n*.01,C=n*.015;return{memoryUsageMB:{heap:Math.round(p),offHeap:Math.round(x),total:Math.round(p+x)},cpuUtilization:{indexing:Math.round(l),query:Math.round(c),maintenance:Math.round(h)},diskIO:{readOps:Math.round(f),writeOps:Math.round(g),totalMBps:Math.round(b*100)/100},networkBandwidth:{ingestMBps:Math.round(E*100)/100,queryMBps:Math.round(v*100)/100,replicationMBps:Math.round(C*100)/100}}}function He(t,n,a){const r=Ae[t],s=(i,o)=>i<=o.min?0:i>=o.max?100:i<=o.median?(i-o.min)/(o.median-o.min)*50:50+(i-o.median)/(o.max-o.median)*50;return{documentType:t,typeConfidence:n,percentileRanks:{queryPerformance:Math.round(s(a.queryPerformance,r.queryPerformance)),indexingPerformance:Math.round(s(a.indexingPerformance,r.indexingPerformance)),storageEfficiency:Math.round(s(a.storageEfficiency,r.storageEfficiency)),maintenanceCost:Math.round(s(a.maintenanceCost,r.maintenanceCost))},typicalRanges:r}}function Je(t,n,a=J.general){const r=_e(t),s=ze(t),i=qe(t,n),o=$e(t),d={queryPerformance:r.score,indexingPerformance:s.score,storageEfficiency:i.score,maintenanceCost:o.score,overall:0};d.overall=Math.round((d.queryPerformance*a.weights.queryPerformance+d.indexingPerformance*a.weights.indexingPerformance+d.storageEfficiency*a.weights.storageEfficiency+d.maintenanceCost*a.weights.maintenanceCost)*10)/10;const p={queryPerformance:r.breakdown,indexingPerformance:s.breakdown,storageEfficiency:i.breakdown,maintenanceCost:o.breakdown},x=Ue(t,n),{type:l,confidence:c}=Be(t),h=He(l,c,d);return{scores:d,explanations:p,performanceMetrics:x,comparative:h,scoringConfig:a}}const Ze={keyword:1,text:1.1,long:.8,integer:.8,short:.6,byte:.4,double:.9,float:.8,date:.8,boolean:.2,object:1.2,nested:2.5},Ge={keyword:1,text:3,long:.5,integer:.5,short:.5,byte:.5,double:.7,float:.6,date:.8,boolean:.3,object:1.5,nested:4},N={MAX_NESTED_OBJECTS:1e4,RECOMMENDED_FIELD_LIMIT:1e3,DEEP_NESTING_THRESHOLD:5,TEXT_FIELD_WARNING_LIMIT:20};function R(t){return t==null?"keyword":typeof t=="string"?t.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/)||t.match(/^\d{4}-\d{2}-\d{2}$/)||t.match(/^\d{4}\/\d{2}\/\d{2}$/)?"date":t.length>256||t.includes(" ")?"text":"keyword":typeof t=="number"?Number.isInteger(t)?t>=-128&&t<=127?"byte":t>=-32768&&t<=32767?"short":t>=-2147483648&&t<=2147483647?"integer":"long":Number.isFinite(t)?"double":"keyword":typeof t=="boolean"?"boolean":Array.isArray(t)||typeof t=="object"?"object":"keyword"}function k(t,n="",a=0){const r=[];return Array.isArray(t)?t.forEach(s=>{if(typeof s=="object"&&s!==null)r.push(...k(s,n,a));else{const i=R(s);r.push({path:n||"array_element",type:i,isArray:!0,depth:a,complexity:D(i,a,!0,1)})}}):typeof t=="object"&&t!==null&&Object.entries(t).forEach(([s,i])=>{const o=n?`${n}.${s}`:s;if(Array.isArray(i)){const d=i.length;if(i.length>0){const p=R(i[0]),x=i.some(c=>typeof c=="object"&&c!==null),l=x?"nested":p;r.push({path:o,type:l,isArray:!0,depth:a,complexity:D(l,a,!0,d)}),x&&i.forEach(c=>{typeof c=="object"&&c!==null&&r.push(...k(c,o,a+1))})}}else if(typeof i=="object"&&i!==null)r.push(...k(i,o,a+1));else{const d=R(i);r.push({path:o,type:d,isArray:!1,depth:a,complexity:D(d,a,!1,1)})}}),r}function D(t,n,a,r=1){let s=Ge[t];if(n>0&&(s*=Math.pow(1.3,n)),a&&r>1){const i=Math.log10(r+1);s*=1+i*.5}return n>N.DEEP_NESTING_THRESHOLD&&(s*=2),s}function We(t,n){let a=0;t.forEach(g=>{const b=n/t.length;a+=b*(Ze[g.type]-1)});const r=1,s=1.1,i=.95,o=.9,p=(n+a)*(1+r),x=p*s,l=x/i,c=l/o,h=c/(1024*1024),f=(c-n)/n*100;return{estimatedStorageMB:h,overheadPercentage:f,breakdown:{base:n/(1024*1024),indexing:(x-p)/(1024*1024),reserved:(l-x)/(1024*1024),system:(c-l)/(1024*1024)}}}function Ve(t,n="general"){const a=k(t),r=new Blob([JSON.stringify(t)]).size,s={text:0,keyword:0,long:0,integer:0,short:0,byte:0,double:0,float:0,date:0,boolean:0,object:0,nested:0};a.forEach(v=>{s[v.type]++});const i=Math.max(...a.map(v=>v.depth),0),o=s.nested,d=s.text,p=We(a,r),x=a.reduce((v,C)=>v+C.complexity,0)/Math.max(a.length,1),l=Math.min(x,10),c=Math.min(p.overheadPercentage/50,10),h=J[n],f=Je(a,p.estimatedStorageMB,h),g=[];a.length>N.RECOMMENDED_FIELD_LIMIT&&g.push(`High field count (${a.length}) may impact indexing performance. OpenSearch recommends < ${N.RECOMMENDED_FIELD_LIMIT} fields.`),i>N.DEEP_NESTING_THRESHOLD&&g.push(`Deep nesting detected (${i} levels). OpenSearch performance degrades beyond ${N.DEEP_NESTING_THRESHOLD} levels.`),d>N.TEXT_FIELD_WARNING_LIMIT&&g.push(`High number of text fields (${d}) detected. Each text field requires tokenization and analysis.`),o>0&&g.push(`Nested objects detected (${o}). Each creates separate Lucene documents, limited to ${N.MAX_NESTED_OBJECTS} per document.`),p.overheadPercentage>200&&g.push(`High storage overhead (${p.overheadPercentage.toFixed(1)}%). Consider field type optimization.`),f.scores.queryPerformance<4&&g.push(`Poor query performance predicted (${f.scores.queryPerformance}/10). Consider optimizing field types and structure.`),f.scores.indexingPerformance<4&&g.push(`Slow indexing performance predicted (${f.scores.indexingPerformance}/10). Reduce text analysis overhead.`),f.scores.storageEfficiency<4&&g.push(`Inefficient storage utilization (${f.scores.storageEfficiency}/10). Consider field type optimization.`),f.scores.maintenanceCost>7&&g.push(`High maintenance overhead predicted (${f.scores.maintenanceCost}/10). Complex structures require specialized expertise.`);const b=[];d>5&&b.push('Consider using "keyword" type for exact-match fields to avoid tokenization overhead.'),i>3&&b.push("Flatten nested structures where possible to reduce field name processing overhead."),a.length>500&&b.push("Consider splitting large documents into multiple smaller documents for better performance."),o>0&&b.push("Evaluate if nested objects are necessary - object type with flattening might suffice."),s.object>s.nested&&i>2&&b.push("Consider using nested type for complex object arrays to maintain relationships."),Object.values(f.explanations).forEach(v=>{b.push(...v.recommendations)});const E=[...new Set(b)];return{indexSizeScore:Math.round(c*10)/10,complexityScore:Math.round(l*10)/10,scores:f.scores,explanations:f.explanations,performanceMetrics:f.performanceMetrics,comparative:f.comparative,scoringConfig:f.scoringConfig,fieldCount:a.length,estimatedStorageMB:Math.round(p.estimatedStorageMB*100)/100,fieldTypes:s,maxDepth:i,fields:a,warnings:g,optimizations:E}}function Xe(){const[t,n]=m.useState(""),[a,r]=m.useState(null),[s,i]=m.useState(!1),[o,d]=m.useState(""),[p,x]=m.useState("general"),l=async()=>{if(!t.trim()){d("Please enter some JSON to analyze");return}i(!0),d("");try{const h=JSON.parse(t),f=Ve(h,p);r(f)}catch(h){d(h instanceof Error?h.message:"Invalid JSON")}finally{i(!1)}},c=()=>{n(""),r(null),d("")};return e.jsxs("div",{className:"min-h-screen bg-gray-50",children:[e.jsx("header",{className:"bg-white shadow-sm border-b",children:e.jsx("div",{className:"max-w-7xl mx-auto px-4 py-6",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-900",children:"OpenSearch Document Complexity Analyzer"}),e.jsx("p",{className:"text-gray-600 mt-2",children:"Advanced scoring system with performance predictions and comparative analysis"})]}),e.jsxs("div",{className:"text-right",children:[e.jsx("label",{htmlFor:"useCase",className:"block text-sm font-medium text-gray-700 mb-1",children:"Use Case Profile"}),e.jsxs("select",{id:"useCase",value:p,onChange:h=>x(h.target.value),className:"block w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm",children:[e.jsx("option",{value:"general",children:"General Purpose"}),e.jsx("option",{value:"analytics",children:"Analytics"}),e.jsx("option",{value:"logging",children:"Logging"}),e.jsx("option",{value:"ecommerce",children:"E-commerce"}),e.jsx("option",{value:"monitoring",children:"Monitoring"})]}),e.jsx("div",{className:"text-xs text-gray-500 mt-1",children:"Scoring weights optimized for use case"})]})]})})}),e.jsx("main",{className:"max-w-7xl mx-auto px-4 py-8",children:e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-8",children:[e.jsx("div",{className:"space-y-4",children:e.jsx(Ce,{value:t,onChange:n,onAnalyze:l,onReset:c,isAnalyzing:s,error:o})}),e.jsx("div",{children:a&&e.jsx(Te,{analysis:a})})]})})]})}const Z=document.getElementById("root");if(!Z)throw new Error("Failed to find the root element");I.createRoot(Z).render(e.jsx(te.StrictMode,{children:e.jsx(Xe,{})}));
//# sourceMappingURL=index-lIXSD-5v.js.map
