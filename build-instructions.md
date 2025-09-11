# 🚀 Combinatorics App - Multi-Platform Build Instructions

## 📱 Desktop App (.exe) - Electron

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup & Build
```bash
# Install dependencies
npm install

# Run in development
npm start

# Build for Windows (.exe)
npm run build-win

# Build for macOS (.dmg)
npm run build-mac

# Build for Linux (.AppImage)
npm run build-linux

# Build for all platforms
npm run build
```

### Output
- Windows: `dist/Combinatorics App Setup.exe`
- macOS: `dist/Combinatorics App.dmg`
- Linux: `dist/Combinatorics App.AppImage`

## 📱 Mobile App - Capacitor

### Prerequisites
- Node.js (v16 or higher)
- Android Studio (for Android)
- Xcode (for iOS, macOS only)

### Setup
```bash
# Install Capacitor CLI
npm install -g @capacitor/cli

# Add platforms
npx cap add android
npx cap add ios

# Build web assets
npm run build-web

# Copy to native projects
npx cap copy

# Open in IDEs
npx cap open android
npx cap open ios
```

### Build Commands
```bash
# Android
npx cap build android

# iOS
npx cap build ios

# Sync changes
npx cap sync
```

## 🌐 Web Deployment

### GitHub Pages (Current)
- Already deployed at: https://sirsplove.github.io/Combinatorics_App/
- Auto-deploys on push to main branch

### Custom Domain
1. Buy domain (e.g., combinatorics-app.com)
2. Configure DNS to point to GitHub Pages
3. Add CNAME file to repository

### Other Hosting Options
- **Netlify**: Drag & drop deployment
- **Vercel**: Git integration
- **Firebase Hosting**: Google's platform
- **AWS S3**: Static website hosting

## 📦 Distribution

### Desktop App Distribution
1. **Windows**: Upload .exe to Microsoft Store or distribute directly
2. **macOS**: Submit to Mac App Store or distribute via website
3. **Linux**: Package for different distributions (Ubuntu, Fedora, etc.)

### Mobile App Distribution
1. **Android**: Upload APK to Google Play Store
2. **iOS**: Submit to Apple App Store
3. **Direct Distribution**: Share APK/IPA files directly

## 🔧 Configuration Files

### package.json
- Contains build scripts and dependencies
- Configures Electron Builder settings

### capacitor.config.json
- Mobile app configuration
- Plugin settings and permissions

### main.js
- Electron main process
- Window management and menus

## 📋 App Store Requirements

### Google Play Store
- App signing key
- Privacy policy
- App description and screenshots
- Age rating questionnaire

### Apple App Store
- Apple Developer account ($99/year)
- App Store Connect setup
- App review process
- Privacy policy and terms

## 🎯 Next Steps

1. **Test all platforms** thoroughly
2. **Create app icons** for all platforms
3. **Write privacy policy** and terms of service
4. **Prepare app store listings** with descriptions and screenshots
5. **Set up analytics** to track usage
6. **Create user documentation**

## 📞 Support

For issues or questions:
- GitHub Issues: https://github.com/Sirsplove/Combinatorics_App/issues
- Email: your-email@example.com
