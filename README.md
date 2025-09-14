# Claude Sample Projects Repository

A collection of modern web applications and browser extensions demonstrating various development techniques and integrations.

## 📚 Project Overview

This repository contains three distinct projects, each showcasing different aspects of web development:

### 1. 🌐 Browser Favorite Link (Chrome Extension)
A powerful Chrome browser extension for saving web URLs to Feishu (飞书) multi-dimensional tables with intelligent features and seamless integration.

**Key Features:**
- One-click URL saving to Feishu tables
- Intelligent content extraction
- URL deduplication with overwrite capability
- Multi-app and multi-table support
- Modern Manifest V3 architecture

**Location:** [`browser-favorite-link/`](./browser-favorite-link/)

---

### 2. 💳 Personal Card Generator
A beautiful personal profile card generator with real-time preview and download capabilities.

**Key Features:**
- Real-time card preview
- Customizable content and themes
- PNG download functionality
- Responsive design
- Modern UI with gradient effects

**Location:** [`card/`](./card/)

---

### 3. 🎮 Word Game Application
A gamified vocabulary learning application specifically designed for high school students preparing for college entrance exams.

**Key Features:**
- 5-level difficulty system
- Gamified learning experience
- Intelligent testing algorithms
- Achievement system and leaderboards
- Learning analytics and heatmaps

**Location:** [`word-game/`](./word-game/)

## 🚀 Quick Start

### Browser Extension Installation
1. Navigate to [`browser-favorite-link/`](./browser-favorite-link/)
2. Follow the detailed installation guide in the project README
3. Configure Feishu integration and start saving URLs

### Web Applications
1. Navigate to the desired project directory (`card/` or `word-game/`)
2. Open `index.html` in your web browser
3. Start using the application immediately

## 🛠️ Technologies Used

### Common Technologies
- **HTML5**: Semantic markup and modern web standards
- **CSS3**: Modern styling with animations and responsive design
- **JavaScript ES6+**: Modern JavaScript features and best practices
- **Local Storage**: Client-side data persistence

### Project-Specific Technologies
- **Browser Extension**: Chrome Manifest V3, Feishu API integration
- **Card Generator**: html2canvas library for image generation
- **Word Game**: Gamification algorithms, data visualization

## 📁 Repository Structure

```
claude-sample/
├── README.md                    # Main repository documentation
├── CLAUDE.md                   # Development guidelines
├── browser-favorite-link/      # Chrome extension project
│   ├── manifest.json          # Extension configuration
│   ├── popup.html/js/css      # Extension UI
│   ├── options.html/js/css    # Settings page
│   ├── background.js          # Service worker
│   └── README.md             # Project documentation
├── card/                      # Personal card generator
│   ├── index.html            # Main application
│   ├── style.css            # Styling
│   ├── script.js             # Application logic
│   └── README.md             # Project documentation
└── word-game/                # Vocabulary learning game
    ├── index.html            # Main application
    ├── styles.css            # Styling
    ├── app.js                # Application logic
    ├── data.js               # Game data and configuration
    └── README.md             # Project documentation
```

## 🎯 Development Workflow

### Getting Started
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/claude-sample.git
   cd claude-sample
   ```

2. **Choose your project:**
   ```bash
   # For browser extension
   cd browser-favorite-link
   
   # For card generator
   cd card
   
   # For word game
   cd word-game
   ```

3. **Follow project-specific setup instructions** in each project's README

### Development Environment
- **Browser Extension**: Load as unpacked extension in Chrome
- **Web Applications**: Open `index.html` directly in browser
- **Testing**: Use browser developer tools for debugging

## 🤝 Contributing

We welcome contributions to all projects! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch** for your changes
3. **Follow project-specific coding standards**
4. **Test your changes thoroughly**
5. **Submit a Pull Request** with clear description

### Contribution Areas
- **Bug fixes** and improvements
- **New features** and enhancements
- **Documentation** updates
- **Code refactoring** and optimization

## 📄 License

This repository is licensed under the MIT License. See individual project documentation for specific licensing details.

## 🙏 Acknowledgments

- **Feishu Open Platform** for API support
- **Chrome Extensions Team** for the extension framework
- **Open Source Community** for various libraries and tools
- **All contributors** who have helped improve these projects

## 📞 Support

For project-specific support:
- **Browser Extension**: See [`browser-favorite-link/README.md`](./browser-favorite-link/README.md)
- **Card Generator**: See [`card/README.md`](./card/README.md)
- **Word Game**: See [`word-game/README.md`](./word-game/README.md)

For general repository issues, please create an issue in this repository.

---

**Happy coding!** 🚀✨