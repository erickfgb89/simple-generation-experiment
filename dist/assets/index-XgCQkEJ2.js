import{r as o,a as le,R as ce}from"./vendor-cxkclgJA.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();var V={exports:{}},P={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var de=o,me=Symbol.for("react.element"),ue=Symbol.for("react.fragment"),pe=Object.prototype.hasOwnProperty,xe=de.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,ge={key:!0,ref:!0,__self:!0,__source:!0};function W(t,r,a){var n,s={},i=null,l=null;a!==void 0&&(i=""+a),r.key!==void 0&&(i=""+r.key),r.ref!==void 0&&(l=r.ref);for(n in r)pe.call(r,n)&&!ge.hasOwnProperty(n)&&(s[n]=r[n]);if(t&&t.defaultProps)for(n in r=t.defaultProps,r)s[n]===void 0&&(s[n]=r[n]);return{$$typeof:me,type:t,key:i,ref:l,props:s,_owner:xe.current}}P.Fragment=ue;P.jsx=W;P.jsxs=W;V.exports=P;var e=V.exports,z={},q=le;z.createRoot=q.createRoot,z.hydrateRoot=q.hydrateRoot;function he({title:t,titleId:r,...a},n){return o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":r},a),t?o.createElement("title",{id:r},t):null,o.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"}))}const G=o.forwardRef(he);function fe({title:t,titleId:r,...a},n){return o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":r},a),t?o.createElement("title",{id:r},t):null,o.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m19.5 8.25-7.5 7.5-7.5-7.5"}))}const ye=o.forwardRef(fe);function be({title:t,titleId:r,...a},n){return o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":r},a),t?o.createElement("title",{id:r},t):null,o.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"}))}const ve=o.forwardRef(be);function we({title:t,titleId:r,...a},n){return o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":r},a),t?o.createElement("title",{id:r},t):null,o.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"}))}const ke=o.forwardRef(we);function je({title:t,titleId:r,...a},n){return o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":r},a),t?o.createElement("title",{id:r},t):null,o.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"}))}const Ne=o.forwardRef(je);function Ee({title:t,titleId:r,...a},n){return o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":r},a),t?o.createElement("title",{id:r},t):null,o.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"}))}const Ce=o.forwardRef(Ee);function Me({title:t,titleId:r,...a},n){return o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":r},a),t?o.createElement("title",{id:r},t):null,o.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"}))}const B=o.forwardRef(Me);function Se({title:t,titleId:r,...a},n){return o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":r},a),t?o.createElement("title",{id:r},t):null,o.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"}),o.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"}))}const Te=o.forwardRef(Se);function Oe({title:t,titleId:r,...a},n){return o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":r},a),t?o.createElement("title",{id:r},t):null,o.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"}))}const Re=o.forwardRef(Oe);function Pe({title:t,titleId:r,...a},n){return o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":r},a),t?o.createElement("title",{id:r},t):null,o.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"}))}const Fe=o.forwardRef(Pe);function De({title:t,titleId:r,...a},n){return o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":r},a),t?o.createElement("title",{id:r},t):null,o.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"}))}const U=o.forwardRef(De);function Le({title:t,titleId:r,...a},n){return o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":r},a),t?o.createElement("title",{id:r},t):null,o.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"}))}const Ie=o.forwardRef(Le);function Ae({title:t,titleId:r,...a},n){return o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":r},a),t?o.createElement("title",{id:r},t):null,o.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"}))}const H=o.forwardRef(Ae);function ze({title:t,titleId:r,...a},n){return o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":r},a),t?o.createElement("title",{id:r},t):null,o.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"}))}const _e=o.forwardRef(ze);function $e({title:t,titleId:r,...a},n){return o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":r},a),t?o.createElement("title",{id:r},t):null,o.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18 18 6M6 6l12 12"}))}const X=o.forwardRef($e),Y=o.createContext(void 0);function Q(){const t=o.useContext(Y);if(!t)throw new Error("useToast must be used within a ToastProvider");return t}function qe({children:t}){const[r,a]=o.useState([]),n=o.useCallback(i=>{const l=Math.random().toString(36).substr(2,9),d={...i,id:l};a(u=>[...u,d]),i.duration!==0&&setTimeout(()=>{s(l)},i.duration||5e3)},[]),s=o.useCallback(i=>{a(l=>l.filter(d=>d.id!==i))},[]);return e.jsxs(Y.Provider,{value:{addToast:n,removeToast:s},children:[t,e.jsx(Be,{toasts:r,removeToast:s})]})}function Be({toasts:t,removeToast:r}){return e.jsx("div",{className:"fixed top-4 right-4 z-50 space-y-2 max-w-sm",children:t.map(a=>e.jsx(Ue,{toast:a,onRemove:()=>r(a.id)},a.id))})}function Ue({toast:t,onRemove:r}){const[a,n]=o.useState(!1);o.useEffect(()=>{const x=setTimeout(()=>n(!0),10);return()=>clearTimeout(x)},[]);const s=()=>{n(!1),setTimeout(r,300)},i={success:G,error:_e,warning:Ce,info:Re},l={success:"bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200",error:"bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200",warning:"bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200",info:"bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200"},d={success:"text-green-500 dark:text-green-400",error:"text-red-500 dark:text-red-400",warning:"text-yellow-500 dark:text-yellow-400",info:"text-blue-500 dark:text-blue-400"},u=i[t.type];return e.jsx("div",{className:`
        ${l[t.type]} 
        border rounded-lg shadow-lg p-4 max-w-sm transition-all duration-300 ease-out
        ${a?"opacity-100 translate-x-0 scale-100":"opacity-0 translate-x-8 scale-95"}
      `,children:e.jsxs("div",{className:"flex items-start space-x-3",children:[e.jsx(u,{className:`h-5 w-5 mt-0.5 flex-shrink-0 ${d[t.type]}`}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("h3",{className:"font-medium text-sm",children:t.title}),t.message&&e.jsx("p",{className:"text-xs mt-1 opacity-90",children:t.message}),t.action&&e.jsx("div",{className:"mt-2",children:e.jsx("button",{onClick:()=>{t.action.onClick(),s()},className:"text-xs font-medium underline hover:no-underline opacity-80 hover:opacity-100",children:t.action.label})})]}),e.jsx("button",{onClick:s,className:"flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity",children:e.jsx(X,{className:"h-4 w-4"})})]})})}const E={success:(t,r,a)=>({type:"success",title:t,...r&&{message:r},...a}),error:(t,r,a)=>({type:"error",title:t,...r&&{message:r},...a}),warning:(t,r,a)=>({type:"warning",title:t,...r&&{message:r},...a}),info:(t,r,a)=>({type:"info",title:t,...r&&{message:r},...a})},J={"E-commerce Order":{description:"Complex e-commerce order with nested product details",document:`{
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
}`}};function He({value:t,onChange:r,onAnalyze:a,onReset:n,isAnalyzing:s,error:i}){const{addToast:l}=Q(),[d,u]=o.useState(!1),[x,m]=o.useState(!1),[c,g]=o.useState(""),[h,f]=o.useState(!1),[b,j]=o.useState([]),[v,w]=o.useState(!1),N=o.useRef(null),T=o.useRef(null),O=o.useCallback(p=>{if(!p.trim()){j([]),w(!1);return}try{JSON.parse(p),j([]),w(!0)}catch(y){if(w(!1),y instanceof SyntaxError){const k=y.message,S=k.match(/at position (\d+)/);let F,D;if(S&&S[1]){const oe=parseInt(S[1]),L=p.substring(0,oe).split(`
`);F=L.length;const $=L[L.length-1];D=$?$.length+1:1}let C;k.includes("Unexpected token")?k.includes("Unexpected token }")?C="Remove extra closing brace or add missing content before it":k.includes("Unexpected token ]")?C="Remove extra closing bracket or add missing array elements":k.includes("Unexpected token ,")?C="Remove trailing comma or add missing value after it":C="Check for missing quotes, commas, or brackets":k.includes("Unterminated string")?C="Add missing closing quote for string value":k.includes("Expected property name")&&(C="Property names must be enclosed in double quotes"),j([{...F!==void 0&&{line:F},...D!==void 0&&{column:D},message:k.replace(/JSON.parse: /,"").replace(/at position \d+/,"").trim(),...C!==void 0&&{suggestion:C}}])}}},[]);o.useEffect(()=>{O(t)},[t,O]);const te=()=>{try{const p=JSON.parse(t),y=JSON.stringify(p,null,2);r(y),l(E.success("JSON Formatted","Your JSON has been prettified and formatted"))}catch{let y=t.replace(/([{,]\s*)(\w+):/g,'$1"$2":').replace(/:\s*'([^']*)'/g,': "$1"').replace(/,\s*([}\]])/g,"$1");try{const k=JSON.parse(y),S=JSON.stringify(k,null,2);r(S)}catch{l(E.warning("Format Failed","Unable to format JSON. Please fix syntax errors first."))}}},_=async p=>{if(!p.name.endsWith(".json")){l(E.warning("Invalid File Type","Please select a JSON file (.json)"));return}try{const y=await p.text();r(y),l(E.success("File Loaded",`Successfully loaded ${p.name}`))}catch(y){l(E.error("File Error","Error reading file: "+(y instanceof Error?y.message:"Unknown error")))}},re=p=>{p.preventDefault(),m(!0)},ae=p=>{p.preventDefault(),m(!1)},ne=p=>{p.preventDefault(),m(!1);const y=Array.from(p.dataTransfer.files);y.length>0&&y[0]&&_(y[0])},se=async()=>{if(c.trim()){f(!0);try{const p=await fetch(c,{mode:"cors",headers:{Accept:"application/json"}});if(!p.ok)throw new Error(`HTTP ${p.status}: ${p.statusText}`);const y=await p.text();r(y),g("")}catch(p){l(E.error("URL Load Error","Error loading from URL: "+(p instanceof Error?p.message:"Unknown error")+" Note: Due to CORS restrictions, only URLs that allow cross-origin requests will work.",{duration:8e3}))}finally{f(!1)}}},ie=p=>{const y=J[p];y&&(r(y.document),u(!1))};return e.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200",children:[e.jsx("h2",{className:"text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4",children:"JSON Document Input"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-4",children:[e.jsxs("div",{className:`relative border-2 border-dashed rounded-lg p-4 text-center transition-colors ${x?"border-blue-500 bg-blue-50 dark:bg-blue-900/20":"border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"}`,onDragOver:re,onDragLeave:ae,onDrop:ne,children:[e.jsx("input",{ref:N,type:"file",accept:".json",onChange:p=>p.target.files?.[0]&&_(p.target.files[0]),className:"hidden"}),e.jsx(ke,{className:"mx-auto h-8 w-8 text-gray-400 dark:text-gray-500 mb-2"}),e.jsxs("p",{className:"text-sm text-gray-600 dark:text-gray-400 mb-2",children:["Drop JSON file here or"," ",e.jsx("button",{onClick:()=>N.current?.click(),className:"text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium",children:"browse"})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300",children:"Load from URL:"}),e.jsxs("div",{className:"flex space-x-2",children:[e.jsx("input",{type:"url",value:c,onChange:p=>g(p.target.value),placeholder:"https://api.example.com/data.json",className:"flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"}),e.jsx("button",{onClick:se,disabled:!c.trim()||h,className:"px-3 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 flex items-center space-x-1 transition-colors",children:h?e.jsx("div",{className:"animate-spin rounded-full h-4 w-4 border-b-2 border-white"}):e.jsx(Fe,{className:"h-4 w-4"})})]})]})]}),e.jsxs("div",{className:"relative",children:[e.jsxs("div",{className:"flex justify-between items-center mb-2",children:[e.jsx("label",{htmlFor:"json-input",className:"block text-sm font-medium text-gray-700 dark:text-gray-300",children:"JSON Document:"}),e.jsxs("div",{className:"flex items-center space-x-2",children:[v&&e.jsxs("div",{className:"flex items-center text-green-600 dark:text-green-400 text-sm",children:[e.jsx(G,{className:"h-4 w-4 mr-1"}),"Valid JSON"]}),b.length>0&&e.jsxs("div",{className:"flex items-center text-red-600 dark:text-red-400 text-sm",children:[e.jsx(B,{className:"h-4 w-4 mr-1"}),b.length," error",b.length!==1?"s":""]})]})]}),e.jsx("div",{className:"relative",children:e.jsx("textarea",{ref:T,id:"json-input",value:t,onChange:p=>r(p.target.value),className:`w-full h-48 sm:h-64 lg:h-72 p-3 border rounded-md font-mono text-sm focus:ring-2 focus:ring-blue-500 resize-vertical bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 ${b.length>0?"border-red-300 dark:border-red-600 focus:border-red-500 dark:focus:border-red-400":v&&t.trim()?"border-green-300 dark:border-green-600 focus:border-green-500 dark:focus:border-green-400":"border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"}`,placeholder:"Enter JSON document to analyze...",spellCheck:!1})})]}),b.length>0&&e.jsx("div",{className:"space-y-2",children:b.map((p,y)=>e.jsx("div",{className:"p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md",children:e.jsxs("div",{className:"flex items-start space-x-2",children:[e.jsx(B,{className:"h-5 w-5 text-red-500 mt-0.5 flex-shrink-0"}),e.jsxs("div",{className:"flex-1",children:[e.jsxs("p",{className:"text-red-700 dark:text-red-300 text-sm font-medium",children:[p.line&&p.column?`Line ${p.line}, Column ${p.column}: `:"",p.message]}),p.suggestion&&e.jsxs("p",{className:"text-red-600 dark:text-red-400 text-xs mt-1",children:["Suggestion: ",p.suggestion]})]})]})},y))}),i&&e.jsx("div",{className:"p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md",children:e.jsx("p",{className:"text-red-700 dark:text-red-300 text-sm",children:i})}),e.jsxs("div",{className:"flex flex-wrap gap-2 sm:gap-3",children:[e.jsx("button",{onClick:a,disabled:s||!t.trim()||b.length>0,className:"px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors",children:s?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"animate-spin rounded-full h-4 w-4 border-b-2 border-white"}),e.jsx("span",{children:"Analyzing..."})]}):e.jsx("span",{children:"Analyze Document"})}),e.jsxs("button",{onClick:te,disabled:!t.trim(),className:"px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-md hover:bg-green-700 dark:hover:bg-green-600 disabled:opacity-50 flex items-center space-x-2 transition-colors",children:[e.jsx(Ie,{className:"h-4 w-4"}),e.jsx("span",{children:"Format & Prettify"})]}),e.jsxs("div",{className:"relative",children:[e.jsxs("button",{onClick:()=>u(!d),className:"px-4 py-2 bg-purple-600 dark:bg-purple-700 text-white rounded-md hover:bg-purple-700 dark:hover:bg-purple-600 flex items-center space-x-2 transition-colors",children:[e.jsx(Te,{className:"h-4 w-4"}),e.jsx("span",{children:"Examples"}),e.jsx(ye,{className:`h-4 w-4 transition-transform ${d?"rotate-180":""}`})]}),d&&e.jsx("div",{className:"absolute top-full mt-1 left-0 right-0 sm:right-auto sm:w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10",children:e.jsx("div",{className:"p-2 space-y-1 max-h-96 overflow-y-auto",children:Object.entries(J).map(([p,y])=>e.jsxs("button",{onClick:()=>ie(p),className:"w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors",children:[e.jsx("div",{className:"font-medium text-sm text-gray-900 dark:text-gray-100",children:p}),e.jsx("div",{className:"text-xs text-gray-600 dark:text-gray-400 mt-1",children:y.description})]},p))})})]}),e.jsxs("button",{onClick:()=>{t.trim()&&(navigator.clipboard.writeText(t),l(E.success("Copied!","JSON copied to clipboard")))},disabled:!t.trim(),className:"px-4 py-2 bg-gray-600 dark:bg-gray-500 text-white rounded-md hover:bg-gray-700 dark:hover:bg-gray-400 disabled:opacity-50 flex items-center space-x-2 transition-colors",children:[e.jsx(Ne,{className:"h-4 w-4"}),e.jsx("span",{children:"Copy"})]}),e.jsxs("button",{onClick:n,className:"px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 flex items-center space-x-2 transition-colors",children:[e.jsx(X,{className:"h-4 w-4"}),e.jsx("span",{children:"Reset"})]})]}),e.jsxs("div",{className:"text-sm text-gray-600 dark:text-gray-400",children:[e.jsx("p",{className:"font-medium mb-2 text-gray-900 dark:text-gray-100",children:"The analyzer will evaluate your JSON document for:"}),e.jsxs("ul",{className:"list-disc list-inside space-y-1",children:[e.jsx("li",{children:"Field types and their OpenSearch mapping complexity"}),e.jsx("li",{children:"Document structure and nesting depth"}),e.jsx("li",{children:"Estimated storage requirements"}),e.jsx("li",{children:"Indexing performance implications"})]}),e.jsx("div",{className:"mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md",children:e.jsxs("p",{className:"text-blue-800 dark:text-blue-300 text-xs",children:[e.jsx("strong",{children:"Tips:"})," Use the Format & Prettify button to clean up your JSON. Try the example documents to see how different data structures affect complexity scores."]})})]})]})]})}function Je({analysis:t,className:r=""}){const a=Object.entries(t.fieldTypes).filter(([i,l])=>l>0),n=a.reduce((i,[l,d])=>i+d,0),s=["#3B82F6","#10B981","#F59E0B","#EF4444","#8B5CF6","#06B6D4"];return e.jsxs("div",{className:`bg-white p-4 rounded-lg border ${r}`,children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Field Type Distribution"}),e.jsx("div",{className:"space-y-2",children:a.map(([i,l],d)=>{const u=(l/n*100).toFixed(1);return e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"w-4 h-4 rounded",style:{backgroundColor:s[d%s.length]}}),e.jsxs("div",{className:"flex-1 flex justify-between",children:[e.jsx("span",{className:"capitalize font-medium",children:i}),e.jsxs("span",{className:"text-gray-600",children:[l," (",u,"%)"]})]})]},i)})})]})}function Ze({fields:t=[],className:r=""}){const a=t.sort((n,s)=>s.complexity-n.complexity).slice(0,10);return e.jsxs("div",{className:`bg-white p-4 rounded-lg border ${r}`,children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Top Complex Fields"}),e.jsx("div",{className:"space-y-2",children:a.map(n=>e.jsxs("div",{className:"flex items-center justify-between p-2 rounded bg-gray-50",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("div",{className:"font-medium text-sm truncate",children:n.path}),e.jsx("div",{className:"text-xs text-gray-600 capitalize",children:n.type})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("div",{className:"text-sm font-medium",children:n.complexity.toFixed(1)}),e.jsx("div",{className:"w-12 h-2 bg-gray-200 rounded",children:e.jsx("div",{className:"h-2 bg-red-500 rounded",style:{width:`${Math.min(n.complexity/5*100,100)}%`}})})]})]},n.path))})]})}function Ve({analysis:t}){const r=[{label:"Total Fields",value:t.fieldCount,unit:"",limit:"1,000 recommended",description:"Total number of fields detected in the document structure"},{label:"Max Depth",value:t.maxDepth,unit:"levels",limit:"5 levels optimal",description:"Maximum nesting depth of objects in the document"},{label:"Estimated Storage",value:t.estimatedStorageMB,unit:"MB",limit:"Includes replication overhead",description:"Predicted storage requirements using OpenSearch formula"},{label:"Field Types",value:Object.values(t.fieldTypes).filter(a=>a>0).length,unit:"types",limit:"Variety impacts complexity",description:"Number of different field types detected"}];return e.jsx("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4",children:r.map(a=>e.jsxs("div",{className:"bg-white p-4 rounded-lg border text-center",title:a.description,children:[e.jsx("div",{className:"text-2xl font-bold text-gray-900",children:a.value}),e.jsx("div",{className:"text-sm text-gray-600",children:a.label}),a.unit&&e.jsx("div",{className:"text-xs text-gray-500",children:a.unit}),e.jsx("div",{className:"text-xs text-gray-500 mt-1",children:a.limit})]},a.label))})}function Z({title:t,score:r,max:a=10,description:n,color:s,explanation:i}){const l=r/a*100,d={green:"bg-green-100 text-green-800 border-green-200",yellow:"bg-yellow-100 text-yellow-800 border-yellow-200",red:"bg-red-100 text-red-800 border-red-200"},u={green:"bg-green-500",yellow:"bg-yellow-500",red:"bg-red-500"};return e.jsxs("div",{className:`p-4 border rounded-lg ${d[s]} transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`,children:[e.jsxs("div",{className:"flex justify-between items-start mb-2",children:[e.jsx("h3",{className:"font-semibold",children:t}),e.jsx("span",{className:"text-2xl font-bold animate-fade-in-scale",children:r})]}),e.jsx("div",{className:"w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2 overflow-hidden",children:e.jsx("div",{className:`h-2 rounded-full ${u[s]} transition-all duration-1000 ease-out`,style:{width:`${Math.min(l,100)}%`,transform:"translateX(0)"}})}),e.jsx("p",{className:"text-sm opacity-80 mb-2",children:n}),e.jsxs("details",{className:"text-xs opacity-70 group",children:[e.jsxs("summary",{className:"cursor-pointer hover:opacity-90 transition-opacity flex items-center space-x-1",children:[e.jsx("span",{children:"How is this calculated?"}),e.jsx("svg",{className:"w-3 h-3 transform group-open:rotate-180 transition-transform",fill:"currentColor",viewBox:"0 0 20 20",children:e.jsx("path",{fillRule:"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",clipRule:"evenodd"})})]}),e.jsx("div",{className:"mt-2 pl-2 border-l-2 border-current border-opacity-30 animate-slide-up",children:i})]})]})}function We({fieldTypes:t}){const r=Object.entries(t).filter(([n,s])=>s>0),a={text:"Analyzed for full-text search. Requires tokenization, lowercasing, and stemming. High processing overhead.",keyword:"Stored as exact values. No analysis required. Fastest for exact matches and aggregations.",long:"64-bit integers. Space-optimized storage. Fast for numeric operations.",integer:"32-bit integers. More space-efficient than long for smaller values.",short:"16-bit integers. Very space-efficient for small numeric ranges.",byte:"8-bit integers. Most space-efficient for very small numbers.",double:"64-bit floating point. Higher precision but larger storage.",float:"32-bit floating point. Good balance of precision and storage.",date:"Stored as milliseconds since epoch. Optimized for temporal queries.",boolean:"Single bit storage. Most space-efficient field type.",object:"Flattened structure. Field names concatenated with dots.",nested:"Separate Lucene documents. Maintains object relationships but high overhead."};return e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h3",{className:"text-lg font-semibold text-gray-900 dark:text-gray-100",children:"Field Type Analysis"}),e.jsx("a",{href:"https://opensearch.org/docs/latest/field-types/supported-field-types/",target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm",children:"View Documentation ↗"})]}),e.jsx("div",{className:"space-y-2",children:r.map(([n,s])=>e.jsxs("div",{className:"bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg p-3",children:[e.jsxs("div",{className:"flex items-center justify-between mb-1",children:[e.jsx("span",{className:"font-medium capitalize text-gray-900 dark:text-gray-100",children:n}),e.jsxs("span",{className:"text-gray-600 dark:text-gray-400 font-mono text-sm",children:[s," fields"]})]}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 text-sm",children:a[n]})]},n))})]})}function Ge(){const t=[{title:"OpenSearch Field Types",url:"https://opensearch.org/docs/latest/field-types/",description:"Official documentation on field type behavior and storage"},{title:"Dynamic Mapping",url:"https://opensearch.org/docs/latest/field-types/index/#dynamic-mapping",description:"How OpenSearch automatically detects field types"},{title:"Performance Tuning",url:"https://opensearch.org/docs/latest/tuning-your-cluster/",description:"Best practices for indexing performance"},{title:"Nested Field Type",url:"https://opensearch.org/docs/latest/field-types/supported-field-types/nested/",description:"When and how to use nested objects"}];return e.jsxs("div",{className:"bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4",children:[e.jsx("h3",{className:"text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3",children:"📚 Research Sources"}),e.jsx("p",{className:"text-blue-800 dark:text-blue-200 text-sm mb-3",children:"This analysis is based on OpenSearch's actual indexing behavior and documented performance characteristics:"}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-3",children:t.map((r,a)=>e.jsxs("a",{href:r.url,target:"_blank",rel:"noopener noreferrer",className:"block p-3 bg-white dark:bg-blue-800/20 border border-blue-200 dark:border-blue-700 rounded hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-sm transition-all",children:[e.jsxs("div",{className:"font-medium text-blue-900 dark:text-blue-100 text-sm",children:[r.title," ↗"]}),e.jsx("div",{className:"text-blue-700 dark:text-blue-300 text-xs mt-1",children:r.description})]},a))})]})}function Xe({analysis:t}){const r=s=>s<=3?"green":s<=6?"yellow":"red";return e.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6 transition-colors duration-200",children:[e.jsxs("div",{className:"border-b border-gray-200 dark:border-gray-700 pb-4",children:[e.jsx("h2",{className:"text-xl font-semibold text-gray-900 dark:text-gray-100",children:"OpenSearch Analysis Results"}),e.jsx("p",{className:"text-gray-600 dark:text-gray-400 text-sm mt-1",children:"Based on OpenSearch indexing algorithms and performance characteristics"})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsx("div",{className:"animate-slide-up animate-stagger-1",children:e.jsx(Z,{title:"Index Size Score",score:t.indexSizeScore,description:"Predicted storage requirements based on field types and structure",color:r(t.indexSizeScore),explanation:"Based on OpenSearch's storage formula: Source Data × (1 + Replicas) × (1.1 Indexing Overhead) / (0.95 Reserved Space) / (0.9 System Overhead). Field types add overhead: text fields +10%, nested objects +150%, while numeric fields are optimized for -20% storage."})}),e.jsx("div",{className:"animate-slide-up animate-stagger-2",children:e.jsx(Z,{title:"Complexity Score",score:t.complexityScore,description:"Processing overhead for indexing operations",color:r(t.complexityScore),explanation:"Calculated using field type processing weights: text fields (3x complexity for tokenization), nested objects (4x for separate documents), plus depth penalties (1.3x per level) and array size multipliers. Based on OpenSearch indexing performance characteristics."})})]}),e.jsx("div",{className:"animate-slide-up animate-stagger-3",children:e.jsx(Ve,{analysis:t})}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[e.jsx("div",{className:"animate-slide-in-left animate-stagger-1",children:e.jsx(Je,{analysis:t})}),e.jsx("div",{className:"animate-slide-in-right animate-stagger-2",children:e.jsx(Ze,{analysis:t,fields:t.fields})})]}),e.jsx("div",{className:"animate-slide-up animate-stagger-4",children:e.jsx(We,{fieldTypes:t.fieldTypes})}),t.warnings.length>0&&e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center justify-between mb-3",children:[e.jsx("h3",{className:"text-lg font-semibold text-yellow-800 dark:text-yellow-200",children:"⚠️ Performance Warnings"}),e.jsx("a",{href:"https://opensearch.org/docs/latest/tuning-your-cluster/index/",target:"_blank",rel:"noopener noreferrer",className:"text-yellow-700 dark:text-yellow-300 hover:text-yellow-800 dark:hover:text-yellow-200 text-sm",children:"Performance Guide ↗"})]}),e.jsx("div",{className:"bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4",children:e.jsx("ul",{className:"space-y-2",children:t.warnings.map((s,i)=>e.jsxs("li",{className:"text-yellow-800 dark:text-yellow-200 text-sm",children:[e.jsx("span",{className:"font-medium",children:"•"})," ",s]},i))})})]}),t.optimizations.length>0&&e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center justify-between mb-3",children:[e.jsx("h3",{className:"text-lg font-semibold text-blue-800 dark:text-blue-200",children:"💡 Optimization Recommendations"}),e.jsx("a",{href:"https://opensearch.org/docs/latest/field-types/",target:"_blank",rel:"noopener noreferrer",className:"text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 text-sm",children:"Field Types Guide ↗"})]}),e.jsx("div",{className:"bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4",children:e.jsx("ul",{className:"space-y-2",children:t.optimizations.map((s,i)=>e.jsxs("li",{className:"text-blue-800 dark:text-blue-200 text-sm",children:[e.jsx("span",{className:"font-medium",children:"•"})," ",s]},i))})})]}),e.jsx(Ge,{}),e.jsx("div",{className:"pt-4 border-t border-gray-200 dark:border-gray-700 text-center",children:e.jsx("p",{className:"text-gray-500 dark:text-gray-400 text-xs",children:"Analysis based on comprehensive research of OpenSearch source code, documentation, and performance studies. All calculations reflect real OpenSearch indexing behavior and storage patterns."})})]})}function Ye(){const[t,r]=o.useState(()=>{const s=localStorage.getItem("darkMode");return s!==null?JSON.parse(s):window.matchMedia("(prefers-color-scheme: dark)").matches});return o.useEffect(()=>{const s=window.matchMedia("(prefers-color-scheme: dark)"),i=l=>{localStorage.getItem("darkMode")===null&&r(l.matches)};return s.addEventListener("change",i),()=>s.removeEventListener("change",i)},[]),o.useEffect(()=>{t?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"),localStorage.setItem("darkMode",JSON.stringify(t))},[t]),{isDarkMode:t,toggleDarkMode:()=>{r(s=>!s)},setDarkMode:s=>{r(s)}}}function Qe(){const{isDarkMode:t,setDarkMode:r}=Ye(),[a,n]=o.useState(!1),s=()=>{localStorage.removeItem("darkMode");const l=window.matchMedia("(prefers-color-scheme: dark)").matches;r(l),n(!1)},i=l=>{r(l),n(!1)};return e.jsxs("div",{className:"relative",children:[e.jsx("button",{onClick:()=>n(!a),className:"p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md","aria-label":"Toggle theme",children:t?e.jsx(U,{className:"h-5 w-5"}):e.jsx(H,{className:"h-5 w-5"})}),a&&e.jsx("div",{className:"absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50",children:e.jsxs("div",{className:"p-1",children:[e.jsxs("button",{onClick:()=>i(!1),className:`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors ${t?"text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700":"bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"}`,children:[e.jsx(H,{className:"h-4 w-4"}),e.jsx("span",{children:"Light"})]}),e.jsxs("button",{onClick:()=>i(!0),className:`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors ${t?"bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300":"text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`,children:[e.jsx(U,{className:"h-4 w-4"}),e.jsx("span",{children:"Dark"})]}),e.jsxs("button",{onClick:s,className:"w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",children:[e.jsx(ve,{className:"h-4 w-4"}),e.jsx("span",{children:"System"})]})]})}),a&&e.jsx("div",{className:"fixed inset-0 z-40",onClick:()=>n(!1)})]})}function Ke({progress:t,className:r="",showPercentage:a=!1}){return e.jsxs("div",{className:`w-full ${r}`,children:[e.jsx("div",{className:"flex justify-between items-center mb-2",children:a&&e.jsxs("span",{className:"text-sm font-medium text-gray-700 dark:text-gray-300",children:[Math.round(t),"%"]})}),e.jsx("div",{className:"w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden",children:e.jsx("div",{className:"h-2 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-full transition-all duration-500 ease-out",style:{width:`${Math.min(Math.max(t,0),100)}%`,transform:t>0?"translateX(0)":"translateX(-100%)"}})})]})}const et={text:4,keyword:1,nested:8,object:2.5,date:1.2,boolean:1,long:1.1,integer:1.1,short:1,byte:1,double:1.3,float:1.2},tt={text:5,keyword:1,nested:7,object:1.8,date:1.4,boolean:.5,long:.8,integer:.8,short:.7,byte:.6,double:1,float:.9},rt={text:2.2,keyword:1,nested:4,object:1.6,date:.8,boolean:.2,long:.8,integer:.6,short:.4,byte:.2,double:.9,float:.5},at={text:3.5,keyword:1,nested:5,object:2,date:1.5,boolean:.5,long:1,integer:1,short:1,byte:1,double:1.2,float:1.1},nt={"Log Entry":{indicators:["timestamp","level","message","logger","thread","host"],textFieldRatio:{min:.1,max:.4},numericFieldRatio:{min:.1,max:.3},dateFieldCount:{min:1,max:5},avgDepth:{min:1,max:3}},"User Profile":{indicators:["user","profile","name","email","id","created","updated"],textFieldRatio:{min:.2,max:.6},numericFieldRatio:{min:.1,max:.3},dateFieldCount:{min:1,max:8},avgDepth:{min:1,max:4}},"Product Catalog":{indicators:["product","name","price","description","category","sku","inventory"],textFieldRatio:{min:.3,max:.7},numericFieldRatio:{min:.2,max:.5},dateFieldCount:{min:0,max:5},avgDepth:{min:2,max:5}},"Event Data":{indicators:["event","action","user","session","timestamp","properties"],textFieldRatio:{min:.2,max:.5},numericFieldRatio:{min:.2,max:.4},dateFieldCount:{min:1,max:6},avgDepth:{min:2,max:4}},Configuration:{indicators:["config","setting","value","key","environment","version"],textFieldRatio:{min:.4,max:.8},numericFieldRatio:{min:.1,max:.3},dateFieldCount:{min:0,max:3},avgDepth:{min:1,max:6}},Metrics:{indicators:["metric","value","timestamp","tags","measurement","gauge","counter"],textFieldRatio:{min:.1,max:.4},numericFieldRatio:{min:.4,max:.8},dateFieldCount:{min:1,max:3},avgDepth:{min:1,max:3}},"Content Document":{indicators:["title","content","body","text","description","summary","author"],textFieldRatio:{min:.5,max:.9},numericFieldRatio:{min:0,max:.2},dateFieldCount:{min:1,max:5},avgDepth:{min:1,max:3}},"Sensor Data":{indicators:["sensor","reading","temperature","pressure","value","device","location"],textFieldRatio:{min:.1,max:.3},numericFieldRatio:{min:.5,max:.8},dateFieldCount:{min:1,max:4},avgDepth:{min:1,max:3}}},st={"Log Entry":{queryPerformance:{min:6,max:8.5,median:7.2},indexingPerformance:{min:7,max:9,median:8.1},storageEfficiency:{min:6.5,max:8,median:7.3},maintenanceCost:{min:2,max:4.5,median:3.2}},"User Profile":{queryPerformance:{min:5.5,max:7.8,median:6.7},indexingPerformance:{min:6,max:8.2,median:7.1},storageEfficiency:{min:5.8,max:7.5,median:6.6},maintenanceCost:{min:3,max:5.5,median:4.2}},"Product Catalog":{queryPerformance:{min:4,max:6.8,median:5.4},indexingPerformance:{min:5,max:7.5,median:6.2},storageEfficiency:{min:4.5,max:6.8,median:5.6},maintenanceCost:{min:4,max:7,median:5.5}},"Event Data":{queryPerformance:{min:5,max:7.5,median:6.2},indexingPerformance:{min:6.5,max:8.5,median:7.5},storageEfficiency:{min:5.5,max:7.2,median:6.3},maintenanceCost:{min:3.5,max:6,median:4.7}},Configuration:{queryPerformance:{min:7,max:9,median:8},indexingPerformance:{min:5.5,max:7.8,median:6.6},storageEfficiency:{min:6,max:8,median:7},maintenanceCost:{min:5,max:8,median:6.5}},Metrics:{queryPerformance:{min:7.5,max:9.2,median:8.3},indexingPerformance:{min:8,max:9.5,median:8.7},storageEfficiency:{min:7,max:8.8,median:7.9},maintenanceCost:{min:1.5,max:3.5,median:2.5}},"Content Document":{queryPerformance:{min:3,max:5.8,median:4.4},indexingPerformance:{min:3.5,max:6.2,median:4.8},storageEfficiency:{min:3.8,max:5.5,median:4.6},maintenanceCost:{min:5.5,max:8.5,median:7}},"Sensor Data":{queryPerformance:{min:7.2,max:9,median:8.1},indexingPerformance:{min:8.5,max:9.8,median:9.1},storageEfficiency:{min:7.5,max:9,median:8.2},maintenanceCost:{min:1,max:2.8,median:1.9}},Unknown:{queryPerformance:{min:4,max:7,median:5.5},indexingPerformance:{min:5,max:8,median:6.5},storageEfficiency:{min:4.5,max:7.5,median:6},maintenanceCost:{min:3,max:6,median:4.5}}},K={general:{version:"1.0.0",weights:{queryPerformance:.3,indexingPerformance:.25,storageEfficiency:.25,maintenanceCost:.2},useCase:"general"},analytics:{version:"1.0.0",weights:{queryPerformance:.4,indexingPerformance:.2,storageEfficiency:.3,maintenanceCost:.1},useCase:"analytics"},logging:{version:"1.0.0",weights:{queryPerformance:.2,indexingPerformance:.4,storageEfficiency:.3,maintenanceCost:.1},useCase:"logging"},ecommerce:{version:"1.0.0",weights:{queryPerformance:.35,indexingPerformance:.25,storageEfficiency:.2,maintenanceCost:.2},useCase:"ecommerce"},monitoring:{version:"1.0.0",weights:{queryPerformance:.25,indexingPerformance:.35,storageEfficiency:.25,maintenanceCost:.15},useCase:"monitoring"}};function it(t){const r=[],a=[],n=[];let s=0,i=0;t.forEach(c=>{let h=et[c.type];c.depth>2&&(h*=Math.pow(1.4,c.depth-2)),c.isArray&&(h*=1.3),s+=h,i+=8,a.push({path:c.path,contribution:h,reason:`${c.type} field${c.isArray?" (array)":""} at depth ${c.depth}`})});const l=t.filter(c=>c.type==="text").length,d=t.filter(c=>c.type==="nested").length,u=t.filter(c=>c.depth>3).length;l>0&&r.push({name:"Text Fields",impact:l*4,explanation:`${l} text fields require full-text search processing with tokenization and scoring`}),d>0&&r.push({name:"Nested Objects",impact:d*8,explanation:`${d} nested fields require expensive join operations and block-based queries`}),u>0&&r.push({name:"Deep Nesting",impact:u*2,explanation:`${u} fields at depth > 3 increase field resolution overhead`}),l>5&&n.push("Consider using keyword fields for exact-match searches to improve query speed"),d>3&&n.push("Evaluate if all nested relationships are necessary - object type might suffice"),u>0&&n.push("Flatten deeply nested structures to reduce query complexity");const x=s/Math.max(i,1),m=Math.max(0,Math.min(10,10-x*10));return{score:Math.round(m*10)/10,breakdown:{factors:r,fieldImpacts:a,recommendations:n,confidenceInterval:{min:Math.max(0,m-.8),max:Math.min(10,m+.8),confidence:.85}}}}function ot(t){const r=[],a=[],n=[];let s=0,i=0;t.forEach(m=>{let g=tt[m.type];g*=1+m.complexity*.1,s+=g,i+=7,a.push({path:m.path,contribution:g,reason:`${m.type} indexing cost with complexity factor ${m.complexity.toFixed(1)}`})});const l=t.filter(m=>m.type==="text").length,d=t.filter(m=>m.type==="nested").length;l>0&&r.push({name:"Text Analysis",impact:l*5,explanation:`${l} text fields require tokenization, lowercasing, and stemming during indexing`}),d>0&&r.push({name:"Nested Document Creation",impact:d*7,explanation:`${d} nested fields create separate Lucene documents with parent-child relationships`}),l>8&&n.push("Consider disabling analysis for fields that only need exact matching"),d>2&&n.push("Limit nested objects to essential use cases to improve indexing speed");const u=s/Math.max(i,1),x=Math.max(0,Math.min(10,10-u*10));return{score:Math.round(x*10)/10,breakdown:{factors:r,fieldImpacts:a,recommendations:n,confidenceInterval:{min:Math.max(0,x-.7),max:Math.min(10,x+.7),confidence:.9}}}}function lt(t,r){const a=[],n=[],s=[];let i=0;const l=1;t.forEach(g=>{const h=rt[g.type],f=h-l;i+=Math.max(0,f),n.push({path:g.path,contribution:h,reason:`${g.type} storage multiplier: ${h.toFixed(1)}x`})});const d=t.filter(g=>g.type==="text").length,u=t.filter(g=>g.type==="nested").length,x=t.filter(g=>["long","integer","short","byte","double","float"].includes(g.type)).length;d>0&&a.push({name:"Text Field Overhead",impact:d*2.2,explanation:`${d} text fields store both analyzed tokens and original values for highlighting`}),u>0&&a.push({name:"Nested Object Overhead",impact:u*4,explanation:`${u} nested objects create separate documents, significantly increasing storage`}),x>0&&a.push({name:"Numeric Optimization",impact:-x*.3,explanation:`${x} numeric fields use optimized storage formats`}),d>x*2&&s.push("Balance text and numeric fields - consider storing large text in separate indices"),u>0&&s.push("Nested objects have 4x storage overhead - use only when relationships are essential"),r>1e3&&s.push("Large storage footprint detected - consider document splitting or field reduction");const m=i/Math.max(t.length,1),c=Math.max(0,Math.min(10,10-m*2.5));return{score:Math.round(c*10)/10,breakdown:{factors:a,fieldImpacts:n,recommendations:s,confidenceInterval:{min:Math.max(0,c-.6),max:Math.min(10,c+.6),confidence:.8}}}}function ct(t){const r=[],a=[],n=[];let s=0;t.forEach(m=>{const c=at[m.type];s+=c,a.push({path:m.path,contribution:c,reason:`${m.type} maintenance complexity: ${c.toFixed(1)}`})});const i=t.filter(m=>m.type==="text").length,l=t.filter(m=>m.type==="nested").length,d=t.filter(m=>m.depth>3).length;i>0&&r.push({name:"Text Analysis Maintenance",impact:i*3.5,explanation:`${i} text fields require analyzer tuning, synonym management, and relevance optimization`}),l>0&&r.push({name:"Nested Query Complexity",impact:l*5,explanation:`${l} nested fields require specialized query tuning and performance optimization`}),d>0&&r.push({name:"Complex Structure Maintenance",impact:d*1.5,explanation:`${d} deeply nested fields increase mapping complexity and evolution challenges`}),i>10&&n.push("High number of text fields increases analysis complexity - consider field consolidation"),l>1&&n.push("Multiple nested objects require specialized expertise for optimization"),t.length>50&&n.push("Large number of fields increases mapping evolution complexity");const u=s/Math.max(t.length,1),x=Math.max(0,Math.min(10,10-u*2));return{score:Math.round(x*10)/10,breakdown:{factors:r,fieldImpacts:a,recommendations:n,confidenceInterval:{min:Math.max(0,x-1),max:Math.min(10,x+1),confidence:.75}}}}function dt(t){const r=t.map(m=>m.path.toLowerCase()),a=t.reduce((m,c)=>(m[c.type]=(m[c.type]||0)+1,m),{}),n=t.length,s=(a.text||0)/n,i=["long","integer","short","byte","double","float"].reduce((m,c)=>m+(a[c]||0),0)/n,l=a.date||0,d=t.reduce((m,c)=>m+c.depth,0)/Math.max(n,1);let u="Unknown",x=0;return Object.entries(nt).forEach(([m,c])=>{let g=0;const h=c.indicators.filter(f=>r.some(b=>b.includes(f.toLowerCase())));g+=h.length/c.indicators.length*40,s>=c.textFieldRatio.min&&s<=c.textFieldRatio.max&&(g+=20),i>=c.numericFieldRatio.min&&i<=c.numericFieldRatio.max&&(g+=15),l>=c.dateFieldCount.min&&l<=c.dateFieldCount.max&&(g+=15),d>=c.avgDepth.min&&d<=c.avgDepth.max&&(g+=10),g>x&&(x=g,u=m)}),{type:u,confidence:Math.min(x/100,.95)}}function mt(t,r){const a=t.length,n=t.filter(N=>N.type==="text").length,s=t.filter(N=>N.type==="nested").length,i=r*.3,l=n*2.5,d=s*10,u=i+l+d,x=r*.15,m=Math.min(95,n*12+s*25+a*.8),c=Math.min(90,n*8+s*20+a*.5),g=Math.min(60,n*3+s*8+a*.2),h=Math.max(100,a*2+n*5),f=Math.max(50,a*1.5+s*8),b=(h+f)*.001,j=r*.02,v=r*.01,w=r*.015;return{memoryUsageMB:{heap:Math.round(u),offHeap:Math.round(x),total:Math.round(u+x)},cpuUtilization:{indexing:Math.round(m),query:Math.round(c),maintenance:Math.round(g)},diskIO:{readOps:Math.round(h),writeOps:Math.round(f),totalMBps:Math.round(b*100)/100},networkBandwidth:{ingestMBps:Math.round(j*100)/100,queryMBps:Math.round(v*100)/100,replicationMBps:Math.round(w*100)/100}}}function ut(t,r,a){const n=st[t],s=(i,l)=>i<=l.min?0:i>=l.max?100:i<=l.median?(i-l.min)/(l.median-l.min)*50:50+(i-l.median)/(l.max-l.median)*50;return{documentType:t,typeConfidence:r,percentileRanks:{queryPerformance:Math.round(s(a.queryPerformance,n.queryPerformance)),indexingPerformance:Math.round(s(a.indexingPerformance,n.indexingPerformance)),storageEfficiency:Math.round(s(a.storageEfficiency,n.storageEfficiency)),maintenanceCost:Math.round(s(a.maintenanceCost,n.maintenanceCost))},typicalRanges:n}}function pt(t,r,a=K.general){const n=it(t),s=ot(t),i=lt(t,r),l=ct(t),d={queryPerformance:n.score,indexingPerformance:s.score,storageEfficiency:i.score,maintenanceCost:l.score,overall:0};d.overall=Math.round((d.queryPerformance*a.weights.queryPerformance+d.indexingPerformance*a.weights.indexingPerformance+d.storageEfficiency*a.weights.storageEfficiency+d.maintenanceCost*a.weights.maintenanceCost)*10)/10;const u={queryPerformance:n.breakdown,indexingPerformance:s.breakdown,storageEfficiency:i.breakdown,maintenanceCost:l.breakdown},x=mt(t,r),{type:m,confidence:c}=dt(t),g=ut(m,c,d);return{scores:d,explanations:u,performanceMetrics:x,comparative:g,scoringConfig:a}}const xt={keyword:1,text:1.1,long:.8,integer:.8,short:.6,byte:.4,double:.9,float:.8,date:.8,boolean:.2,object:1.2,nested:2.5},gt={keyword:1,text:3,long:.5,integer:.5,short:.5,byte:.5,double:.7,float:.6,date:.8,boolean:.3,object:1.5,nested:4},M={MAX_NESTED_OBJECTS:1e4,RECOMMENDED_FIELD_LIMIT:1e3,DEEP_NESTING_THRESHOLD:5,TEXT_FIELD_WARNING_LIMIT:20};function I(t){return t==null?"keyword":typeof t=="string"?t.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/)||t.match(/^\d{4}-\d{2}-\d{2}$/)||t.match(/^\d{4}\/\d{2}\/\d{2}$/)?"date":t.length>256||t.includes(" ")?"text":"keyword":typeof t=="number"?Number.isInteger(t)?t>=-128&&t<=127?"byte":t>=-32768&&t<=32767?"short":t>=-2147483648&&t<=2147483647?"integer":"long":Number.isFinite(t)?"double":"keyword":typeof t=="boolean"?"boolean":Array.isArray(t)||typeof t=="object"?"object":"keyword"}function R(t,r="",a=0){const n=[];return Array.isArray(t)?t.forEach(s=>{if(typeof s=="object"&&s!==null)n.push(...R(s,r,a));else{const i=I(s);n.push({path:r||"array_element",type:i,isArray:!0,depth:a,complexity:A(i,a,!0,1)})}}):typeof t=="object"&&t!==null&&Object.entries(t).forEach(([s,i])=>{const l=r?`${r}.${s}`:s;if(Array.isArray(i)){const d=i.length;if(i.length>0){const u=I(i[0]),x=i.some(c=>typeof c=="object"&&c!==null),m=x?"nested":u;n.push({path:l,type:m,isArray:!0,depth:a,complexity:A(m,a,!0,d)}),x&&i.forEach(c=>{typeof c=="object"&&c!==null&&n.push(...R(c,l,a+1))})}}else if(typeof i=="object"&&i!==null)n.push(...R(i,l,a+1));else{const d=I(i);n.push({path:l,type:d,isArray:!1,depth:a,complexity:A(d,a,!1,1)})}}),n}function A(t,r,a,n=1){let s=gt[t];if(r>0&&(s*=Math.pow(1.3,r)),a&&n>1){const i=Math.log10(n+1);s*=1+i*.5}return r>M.DEEP_NESTING_THRESHOLD&&(s*=2),s}function ht(t,r){let a=0;t.forEach(f=>{const b=r/t.length;a+=b*(xt[f.type]-1)});const n=1,s=1.1,i=.95,l=.9,u=(r+a)*(1+n),x=u*s,m=x/i,c=m/l,g=c/(1024*1024),h=(c-r)/r*100;return{estimatedStorageMB:g,overheadPercentage:h,breakdown:{base:r/(1024*1024),indexing:(x-u)/(1024*1024),reserved:(m-x)/(1024*1024),system:(c-m)/(1024*1024)}}}function ft(t,r="general"){const a=R(t),n=new Blob([JSON.stringify(t)]).size,s={text:0,keyword:0,long:0,integer:0,short:0,byte:0,double:0,float:0,date:0,boolean:0,object:0,nested:0};a.forEach(v=>{s[v.type]++});const i=Math.max(...a.map(v=>v.depth),0),l=s.nested,d=s.text,u=ht(a,n),x=a.reduce((v,w)=>v+w.complexity,0)/Math.max(a.length,1),m=Math.min(x,10),c=Math.min(u.overheadPercentage/50,10),g=K[r],h=pt(a,u.estimatedStorageMB,g),f=[];a.length>M.RECOMMENDED_FIELD_LIMIT&&f.push(`High field count (${a.length}) may impact indexing performance. OpenSearch recommends < ${M.RECOMMENDED_FIELD_LIMIT} fields.`),i>M.DEEP_NESTING_THRESHOLD&&f.push(`Deep nesting detected (${i} levels). OpenSearch performance degrades beyond ${M.DEEP_NESTING_THRESHOLD} levels.`),d>M.TEXT_FIELD_WARNING_LIMIT&&f.push(`High number of text fields (${d}) detected. Each text field requires tokenization and analysis.`),l>0&&f.push(`Nested objects detected (${l}). Each creates separate Lucene documents, limited to ${M.MAX_NESTED_OBJECTS} per document.`),u.overheadPercentage>200&&f.push(`High storage overhead (${u.overheadPercentage.toFixed(1)}%). Consider field type optimization.`),h.scores.queryPerformance<4&&f.push(`Poor query performance predicted (${h.scores.queryPerformance}/10). Consider optimizing field types and structure.`),h.scores.indexingPerformance<4&&f.push(`Slow indexing performance predicted (${h.scores.indexingPerformance}/10). Reduce text analysis overhead.`),h.scores.storageEfficiency<4&&f.push(`Inefficient storage utilization (${h.scores.storageEfficiency}/10). Consider field type optimization.`),h.scores.maintenanceCost>7&&f.push(`High maintenance overhead predicted (${h.scores.maintenanceCost}/10). Complex structures require specialized expertise.`);const b=[];d>5&&b.push('Consider using "keyword" type for exact-match fields to avoid tokenization overhead.'),i>3&&b.push("Flatten nested structures where possible to reduce field name processing overhead."),a.length>500&&b.push("Consider splitting large documents into multiple smaller documents for better performance."),l>0&&b.push("Evaluate if nested objects are necessary - object type with flattening might suffice."),s.object>s.nested&&i>2&&b.push("Consider using nested type for complex object arrays to maintain relationships."),Object.values(h.explanations).forEach(v=>{b.push(...v.recommendations)});const j=[...new Set(b)];return{indexSizeScore:Math.round(c*10)/10,complexityScore:Math.round(m*10)/10,scores:h.scores,explanations:h.explanations,performanceMetrics:h.performanceMetrics,comparative:h.comparative,scoringConfig:h.scoringConfig,fieldCount:a.length,estimatedStorageMB:Math.round(u.estimatedStorageMB*100)/100,fieldTypes:s,maxDepth:i,fields:a,warnings:f,optimizations:j}}function yt(){const{addToast:t}=Q(),[r,a]=o.useState(""),[n,s]=o.useState(null),[i,l]=o.useState(!1),[d,u]=o.useState(""),[x,m]=o.useState("general"),[c,g]=o.useState(0),[h,f]=o.useState(!1),b=async()=>{if(!r.trim()){u("Please enter some JSON to analyze");return}l(!0),u(""),g(0),f(!1);try{const v=[10,25,50,75,90,100];for(const T of v)g(T),await new Promise(O=>setTimeout(O,T===100?500:150));const w=JSON.parse(r),N=ft(w,x);s(N),t(E.success("Analysis Complete!",`Document analyzed with ${N.complexityScore}/10 complexity score`,{duration:4e3})),setTimeout(()=>f(!0),100)}catch(v){const w=v instanceof Error?v.message:"Invalid JSON";u(w),t(E.error("Analysis Failed",w,{duration:6e3}))}finally{l(!1),g(0)}},j=()=>{a(""),s(null),u(""),f(!1)};return o.useEffect(()=>{n&&f(!0)},[n]),e.jsxs("div",{className:"min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300",children:[e.jsx("header",{className:"bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300",children:e.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6",children:e.jsxs("div",{className:"flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0",children:[e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("h1",{className:"text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 transition-colors leading-tight",children:"OpenSearch Document Complexity Analyzer"}),e.jsx("p",{className:"text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 sm:mt-2 transition-colors",children:"Advanced scoring system with performance predictions and comparative analysis"})]}),e.jsxs("div",{className:"flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4",children:[e.jsxs("div",{className:"w-full sm:w-auto",children:[e.jsx("label",{htmlFor:"useCase",className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",children:"Use Case Profile"}),e.jsxs("select",{id:"useCase",value:x,onChange:v=>m(v.target.value),className:"block w-full sm:w-40 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors",children:[e.jsx("option",{value:"general",children:"General Purpose"}),e.jsx("option",{value:"analytics",children:"Analytics"}),e.jsx("option",{value:"logging",children:"Logging"}),e.jsx("option",{value:"ecommerce",children:"E-commerce"}),e.jsx("option",{value:"monitoring",children:"Monitoring"})]}),e.jsx("div",{className:"text-xs text-gray-500 dark:text-gray-400 mt-1",children:"Scoring weights optimized for use case"})]}),e.jsx("div",{className:"self-start sm:self-auto",children:e.jsx(Qe,{})})]})]})})}),e.jsx("main",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8",children:e.jsxs("div",{className:"grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8",children:[e.jsxs("div",{className:"space-y-4 animate-slide-in-left",children:[e.jsx(He,{value:r,onChange:a,onAnalyze:b,onReset:j,isAnalyzing:i,error:d}),i&&e.jsx("div",{className:"animate-fade-in-scale",children:e.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4",children:[e.jsxs("div",{className:"flex items-center space-x-3 mb-3",children:[e.jsxs("div",{className:"flex space-x-1",children:[e.jsx("div",{className:"w-2 h-2 bg-blue-500 rounded-full animate-bounce",style:{animationDelay:"0ms"}}),e.jsx("div",{className:"w-2 h-2 bg-blue-500 rounded-full animate-bounce",style:{animationDelay:"150ms"}}),e.jsx("div",{className:"w-2 h-2 bg-blue-500 rounded-full animate-bounce",style:{animationDelay:"300ms"}})]}),e.jsx("span",{className:"text-sm text-gray-600 dark:text-gray-400 font-medium",children:"Analyzing document complexity..."})]}),e.jsx(Ke,{progress:c,showPercentage:!0,className:"mb-2"}),e.jsxs("div",{className:"text-xs text-gray-500 dark:text-gray-400",children:[c<30&&"Parsing JSON structure...",c>=30&&c<60&&"Analyzing field types...",c>=60&&c<90&&"Calculating complexity scores...",c>=90&&"Generating recommendations..."]})]})})]}),e.jsx("div",{className:"animate-slide-in-right",children:n&&h&&e.jsx("div",{className:"animate-card-appear",children:e.jsx(Xe,{analysis:n})})})]})})]})}function bt(){return e.jsx(qe,{children:e.jsx(yt,{})})}const ee=document.getElementById("root");if(!ee)throw new Error("Failed to find the root element");z.createRoot(ee).render(e.jsx(ce.StrictMode,{children:e.jsx(bt,{})}));
//# sourceMappingURL=index-XgCQkEJ2.js.map
