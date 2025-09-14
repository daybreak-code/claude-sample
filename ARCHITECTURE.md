# Technical Architecture Documentation

This document provides detailed technical architecture information for all projects in the repository.

## 📋 Table of Contents

1. [Browser Favorite Link - Chrome Extension](#browser-favorite-link---chrome-extension)
2. [Card Generator - Web Application](#card-generator---web-application)
3. [Word Game - Educational Application](#word-game---educational-application)
4. [Shared Technologies and Patterns](#shared-technologies-and-patterns)
5. [Development Best Practices](#development-best-practices)
6. [Deployment and Hosting](#deployment-and-hosting)

---

## Browser Favorite Link - Chrome Extension

### 🏗️ Architecture Overview

The browser extension follows a modern Chrome Manifest V3 architecture with a service worker-based background service.

### 🔧 Core Components

```
browser-favorite-link/
├── manifest.json                    # Extension manifest
├── background.js                    # Service Worker (BackgroundService)
├── popup.html/js/css               # User Interface (PopupManager)
├── options.html/js/css              # Settings (OptionsManager)
├── common.js                        # Utilities and Constants
├── record-manager.js               # Feishu API Client (RecordManager)
└── icons/                          # Extension Icons
```

### 📡 Message Flow Architecture

```
User Action → Popup UI → Chrome Runtime API → Service Worker → Feishu API
    ↓                                                                 ↓
UI Update ← Message Response ← Data Processing ← HTTP Response ← API Call
```

### 🔐 Authentication & Security

- **Authentication**: Feishu internal app authentication
- **Token Management**: Automatic token refresh with 5-minute buffer
- **Data Storage**: Chrome Storage API for configuration
- **CORS**: Configured for Feishu API endpoints
- **Permissions**: Minimal required permissions (storage, activeTab, scripting)

### 🎯 API Integration Pattern

```javascript
// Message-based communication
chrome.runtime.sendMessage({
  type: MESSAGE_TYPES.SAVE_URL,
  data: { appId, appSecret, tableUrl, recordData }
}, (response) => {
  // Handle response
});

// Service Worker processing
async handleMessage(message, sender, sendResponse) {
  switch (message.type) {
    case MESSAGE_TYPES.SAVE_URL:
      const result = await recordManager.saveUrlWithCheck(...);
      sendResponse(result);
      break;
  }
}
```

### 📊 Error Handling Strategy

- **API Errors**: Structured error codes and user-friendly messages
- **Network Issues**: Automatic retry with exponential backoff
- **Validation**: Client-side input validation
- **State Management**: Consistent UI state updates

---

## Card Generator - Web Application

### 🏗️ Architecture Overview

Single-page application with real-time preview functionality using modern web technologies.

### 🔧 Core Components

```
card/
├── index.html                      # Main Application HTML
├── style.css                       # Responsive Styles
├── script.js                       # Application Logic
└── README.md                       # Documentation
```

### 🎨 Component Architecture

```javascript
// Core Functions
├── updateCard()                    // Real-time card update
├── downloadCard()                  // Image generation and download
├── initializeEventListeners()     // Event management
└── DOM Helpers                    // UI manipulation utilities
```

### 🖼️ Image Generation Pipeline

```
DOM Elements → html2canvas → Canvas → PNG Image → Download
```

### 💾 Data Flow

```javascript
// Event-driven updates
input.addEventListener('input', updateCard);
input.addEventListener('change', updateCard);

// Real-time synchronization
function updateCard() {
  // 1. Collect form data
  // 2. Update DOM elements
  // 3. Apply styling
  // 4. Trigger preview updates
}
```

### 🎯 Performance Optimizations

- **Event Delegation**: Efficient event handling
- **DOM Optimization**: Minimal DOM manipulation
- **CSS Transitions**: Hardware-accelerated animations
- **Image Loading**: External CDN for html2canvas

---

## Word Game - Educational Application

### 🏗️ Architecture Overview

Gamified vocabulary learning application with multiple game modes and progress tracking.

### 🔧 Core Components

```
word-game/
├── index.html                      # Main Application
├── styles.css                      # Game Styles
├── app.js                          # Application Controller (WordGameApp)
├── data.js                         # Vocabulary Database
└── README.md                       # Documentation
```

### 🎮 Game Architecture

```javascript
class WordGameApp {
  constructor() {
    this.userData = null;           // User progress data
    this.currentLevel = 1;          // Current difficulty level
    this.currentWords = [];         // Current word set
    this.lives = 3;                 // Game lives
    this.points = 0;                // User points
    this.correctAnswers = 0;         // Statistics tracking
  }
}
```

### 📊 Data Management

```javascript
// User Data Structure
{
  progress: {
    level1: { mastered: 15, total: 30 },
    level2: { mastered: 8, total: 25 },
    // ...
  },
  achievements: [...],
  statistics: {
    totalAnswers: 0,
    correctAnswers: 0,
    studyTime: 0
  }
}
```

### 🎯 Game Modes

1. **Learning Mode**
   - New word introduction
   - Example sentences
   - Multiple choice questions
   - Progress tracking

2. **Testing Mode**
   - Timed challenges
   - Adaptive difficulty
   - Performance scoring
   - Detailed statistics

3. **Achievement System**
   - Milestone tracking
   - Badge unlocking
   - Progress visualization
   - Motivational feedback

### 📈 Analytics and Progress Tracking

```javascript
// Learning Algorithms
- Spaced Repetition (Ebbinghaus Forgetting Curve)
- Adaptive Difficulty Adjustment
- Performance Analytics
- Study Pattern Recognition
```

---

## Shared Technologies and Patterns

### 🌐 Common Frontend Technologies

| Technology | Usage Across Projects |
|------------|----------------------|
| **HTML5** | All projects - semantic markup |
| **CSS3** | All projects - styling and animations |
| **JavaScript ES6+** | All projects - application logic |
| **LocalStorage** | Word Game - user data persistence |
| **Chrome APIs** | Browser Extension - storage, tabs, runtime |

### 🎨 Design Patterns

#### 1. **Module Pattern**
```javascript
// Used in all projects
const ModuleName = (function() {
  // Private variables and functions
  let privateVar = 'secret';
  
  // Public API
  return {
    publicMethod: function() { /* ... */ }
  };
})();
```

#### 2. **Event-Driven Architecture**
```javascript
// Card Generator and Word Game
element.addEventListener('event', handler);
```

#### 3. **Message Passing**
```javascript
// Browser Extension
chrome.runtime.sendMessage(message, callback);
```

### 📁 File Organization Patterns

```
Project/
├── index.html           # Entry point
├── styles.css          # Styling
├── script.js           # Main logic
└── README.md           # Documentation
```

### 🔧 Code Conventions

#### JavaScript
- **ES6+ Features**: Arrow functions, destructuring, template literals
- **Naming**: camelCase for variables/functions, PascalCase for classes
- **Comments**: JSDoc style for functions and classes
- **Error Handling**: Try-catch blocks with meaningful error messages

#### CSS
- **BEM Methodology**: Block__Element--Modifier naming
- **Responsive Design**: Mobile-first approach
- **CSS Variables**: For theming and consistency
- **Animation**: CSS transitions for smooth interactions

#### HTML
- **Semantic Elements**: header, main, section, article, footer
- **Accessibility**: ARIA labels, proper form labels
- **Performance**: Optimized image loading, minimal dependencies

---

## Development Best Practices

### 🛠️ Development Environment

#### Local Development
```bash
# Web Applications
python -m http.server 8000
# or
npx serve

# Browser Extension
# Load as unpacked extension in Chrome
```

#### Version Control
```bash
# Commit message format
git commit -m "type(scope): description"

# Examples
git commit -m "feat(card): add color customization"
git commit -m "fix(extension): handle API timeout errors"
git commit -m "docs(readme): update installation instructions"
```

### 🧪 Testing Strategies

#### Unit Testing
- Test individual functions and methods
- Mock external dependencies
- Validate edge cases and error conditions

#### Integration Testing
- Test component interactions
- Verify data flow between components
- Test API integrations

#### User Acceptance Testing
- Verify user workflows
- Test across different browsers
- Validate accessibility features

### 📊 Performance Optimization

#### Frontend Optimization
- **Minimize HTTP Requests**: Bundle CSS/JS files
- **Image Optimization**: Use WebP format, lazy loading
- **Caching**: Leverage browser cache
- **Code Splitting**: Load only necessary code

#### API Optimization
- **Request Batching**: Combine multiple API calls
- **Caching**: Cache API responses locally
- **Rate Limiting**: Respect API rate limits
- **Error Handling**: Graceful degradation

### 🔒 Security Considerations

#### Data Protection
- **Input Validation**: Sanitize all user inputs
- **XSS Prevention**: Use textContent instead of innerHTML
- **CSRF Protection**: Use anti-CSRF tokens
- **Secure Storage**: Use secure storage options

#### API Security
- **Authentication**: Use secure token-based auth
- **HTTPS**: Always use HTTPS for API calls
- **CORS**: Configure proper CORS headers
- **Rate Limiting**: Implement API rate limiting

---

## Deployment and Hosting

### 🌍 Static Hosting Options

#### Free Services
- **GitHub Pages**: Free hosting for static sites
- **Netlify**: Automated deployment from Git
- **Vercel**: Serverless functions support
- **Firebase Hosting**: Global CDN

#### Paid Services
- **AWS S3 + CloudFront**: Scalable hosting
- **DigitalOcean App Platform**: Full-stack hosting
- **Heroku**: Platform-as-a-Service

### 🚀 Deployment Workflows

#### GitHub Actions Workflow
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
```

#### Browser Extension Deployment
1. **Chrome Web Store**: 
   - Package extension as .zip
   - Upload to Chrome Developer Dashboard
   - Submit for review

2. **Self-distribution**:
   - Provide .crx file
   - Host on private server
   - Enterprise deployment

### 📈 Monitoring and Analytics

#### Performance Monitoring
- **Page Load Times**: Track Core Web Vitals
- **Error Tracking**: Monitor JavaScript errors
- **User Analytics**: Track user engagement
- **API Performance**: Monitor response times

#### Error Tracking
- **Sentry**: Real-time error tracking
- **Google Analytics**: User behavior analysis
- **Custom Logging**: Application-specific metrics

### 🔄 Maintenance and Updates

#### Version Management
- **Semantic Versioning**: MAJOR.MINOR.PATCH
- **Change Log**: Document all changes
- **Backward Compatibility**: Maintain API compatibility
- **Deprecation Policy**: Clear deprecation timeline

#### Backup and Recovery
- **Data Backups**: Regular database backups
- **Version Control**: Git repository management
- **Disaster Recovery**: Backup deployment strategy
- **Monitoring**: Automated health checks

---

## 📚 Additional Resources

### 📖 Documentation
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [html2canvas Documentation](https://html2canvas.hertzen.com/)
- [Feishu API Documentation](https://open.feishu.cn/)

### 🛠️ Development Tools
- **VS Code**: Recommended code editor
- **Chrome DevTools**: Browser debugging
- **Postman**: API testing
- **Git**: Version control

### 🤝 Community and Support
- **GitHub Issues**: Bug reports and feature requests
- **Stack Overflow**: Technical Q&A
- **Discord/Slack**: Community support
- **Email**: Direct contact for support

---

**This architecture document serves as a comprehensive guide for understanding, maintaining, and extending all projects in this repository.**