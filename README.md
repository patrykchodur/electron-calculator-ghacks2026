# Electron Calculator

A simple, modern calculator built with Electron and TypeScript, designed to also run on Android using Capacitor.

## Features
- Standard arithmetic operations (+, -, *, /)
- Clean, responsive UI with a dark theme
- "Clear" and "Delete" functionality
- **Native OS Integration:** Save results to disk and view network status.

## Prerequisites
- [Node.js](https://nodejs.org/) (which includes npm)
- [Android Studio](https://developer.android.com/studio) (if building for Android)

## How to Run Locally (Electron)

1. **Clone the repository (or navigate to the directory):**
   ```bash
   cd electron-calculator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the project (Compile TypeScript & copy assets):**
   ```bash
   npm run build
   ```

4. **Start the Electron application:**
   ```bash
   npm start
   ```

## Android / Capacitor Workflow

This project uses Capacitor to bundle the web assets into a native Android application.

1. **Build the web assets first:**
   ```bash
   npm run build
   ```

2. **Sync the Android project:**
   This copies your compiled assets into the native Android structure.
   ```bash
   npx cap sync android
   ```

3. **Open in Android Studio:**
   ```bash
   npx cap open android
   ```

### Running the Android Emulator (KVM Permissions)
If you are running the Android emulator on Linux, you may need to grant your user permissions to access the KVM device. **You will need to run this command every time you restart your machine before running the VM:**

```bash
sudo setfacl -m u:$(whoami):rw /dev/kvm
```

## Project Structure
- `src/`: TypeScript source code (`main.ts` for the main process, `renderer.ts` for UI logic).
- `public/`: Static assets (`index.html`, `style.css`).
- `dist/`: Generated output folder (not tracked in Git) containing compiled JS and copied static assets.
- `android/`: Native Android project generated and managed by Capacitor.
- `package.json`: Project configuration and dependencies.
- `capacitor.config.json`: Capacitor configuration (points to `dist/`).
