# 🚀 CareerOS - Complete Setup Guide (For Beginners)

This guide will walk you through setting up the CareerOS app on a **brand new Windows laptop** from scratch. No prior experience needed!

---

## 📋 What You'll Install

1. **Git** — To download the code from GitHub
2. **Node.js** — To run the app
3. That's it!

---

## Step 1: Install Git

1. Open your browser and go to: **https://git-scm.com/download/win**
2. The download should start automatically. If not, click **"Click here to download manually"**
3. Run the downloaded installer (e.g., `Git-2.x.x-64-bit.exe`)
4. **Click "Next" on every screen** — the default settings are fine
5. Click **"Install"** and then **"Finish"**

### ✅ Verify Git is installed:
- Open **Command Prompt** (press `Windows key`, type `cmd`, press Enter)
- Type: `git --version`
- You should see something like: `git version 2.43.0`

---

## Step 2: Install Node.js

1. Open your browser and go to: **https://nodejs.org**
2. Click the big green button that says **"LTS"** (Long Term Support) — download this version
3. Run the downloaded installer (e.g., `node-v20.x.x-x64.msi`)
4. **Click "Next" on every screen** — the default settings are fine
5. ✅ Make sure **"Automatically install the necessary tools"** checkbox is checked if it appears
6. Click **"Install"** and then **"Finish"**

### ⚠️ IMPORTANT: Close and reopen Command Prompt after installing Node.js!

### ✅ Verify Node.js is installed:
- Open a **new** Command Prompt window (close the old one first!)
- Type: `node --version`
- You should see something like: `v20.11.0`
- Type: `npm --version`
- You should see something like: `10.2.4`

---

## Step 3: Download the CareerOS App

1. Open **Command Prompt** (press `Windows key`, type `cmd`, press Enter)
2. Navigate to your Desktop:
   ```
   cd Desktop
   ```
3. Download the code:
   ```
   git clone https://github.com/vinvanku/careeros-mobile
   ```
4. Go into the project folder:
   ```
   cd careeros-mobile
   ```

---

## Step 4: Install App Dependencies

Still in Command Prompt, inside the `careeros-mobile` folder, run:

```
npm install
```

⏳ **This will take 2-5 minutes.** You'll see a progress bar and some warnings — that's normal! Just wait for it to finish.

You'll know it's done when you see something like:
```
added 657 packages, and audited 658 packages in 2m
found 0 vulnerabilities
```

---

## Step 5: Start the App

Run this command:

```
npx expo start --web
```

⏳ **Wait about 30 seconds.** You'll see:
- A QR code in the terminal
- A message saying `Web: http://localhost:8081`
- Then: `Web Bundled XXXX ms App.js (678 modules)`

---

## Step 6: Open the App in Browser

1. Open **Google Chrome** (or any browser)
2. In the address bar, type: **http://localhost:8081**
3. Press Enter
4. 🎉 **You should see the CareerOS Login Screen!**

---

## 🔧 Troubleshooting

### Blank screen?
- Press **F12** in the browser to open Developer Tools
- Click the **"Console"** tab
- Look for any red error messages and share a screenshot

### `npm` or `node` not recognized?
- You need to **close and reopen** Command Prompt after installing Node.js
- If still not working, restart your computer

### `git` not recognized?
- You need to **close and reopen** Command Prompt after installing Git
- If still not working, restart your computer

### Port 8081 already in use?
- Close any other Command Prompt windows that might be running the app
- Or use a different port: `npx expo start --web --port 3000`
- Then open `http://localhost:3000` in the browser

### Want to stop the app?
- Go to the Command Prompt where the app is running
- Press **Ctrl + C**
- Type **Y** and press Enter

---

## 📱 Want to see it on your phone?

1. Install the **Expo Go** app on your phone (available on App Store / Google Play)
2. Make sure your phone and laptop are on the **same WiFi network**
3. Run `npx expo start` (without `--web`)
4. Scan the QR code shown in the terminal with your phone camera
5. The app will open in Expo Go on your phone!

---

## 💡 Quick Reference Commands

| What | Command |
|------|---------|
| Start the app (web) | `npx expo start --web` |
| Start the app (mobile) | `npx expo start` |
| Stop the app | `Ctrl + C` |
| Reinstall dependencies | `npm install` |
| Update code from GitHub | `git pull origin main` |

---

**Made with ❤️ by CareerOS Team**