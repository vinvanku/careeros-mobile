# 📱 How to View CareerOS on Mobile (No Node.js Required)

## METHOD 1: Expo Snack (Recommended — Easiest)

**Expo Snack is a free online IDE at snack.expo.dev. No installs needed.**

### Step-by-step:

1. **Install Expo Go** on your phone first:
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent
   - iPhone: https://apps.apple.com/app/expo-go/id982107779

2. **Open Expo Snack** in your browser:
   - Go to → **https://snack.expo.dev**

3. **Create the project files** in Snack:
   - Click the **"+"** button (top left panel) to create files
   - You need to recreate the file structure by copy-pasting from this project

4. **Scan QR Code** from Expo Snack to view on your phone

---

## METHOD 2: GitHub Codespaces (Has Node.js Built-in — Free 60hrs/month)

This runs Node.js in the cloud — your phone connects to it via Expo Go.

### Step-by-step:

1. **Create a free GitHub account** at https://github.com

2. **Create a new repository** and upload all files from `careeros-mobile/`
   - Go to github.com → New Repository → name it `careeros-mobile`
   - Upload all files (drag & drop the entire `careeros-mobile` folder)

3. **Open GitHub Codespaces**:
   - In your repo, click the green **"Code"** button
   - Click **"Codespaces"** tab
   - Click **"Create codespace on main"**
   - Wait ~2 minutes for it to load (it opens VS Code in your browser)

4. **Run the app** in the Codespaces terminal:
   ```bash
   npm install
   npx expo start --tunnel
   ```
   *(Use `--tunnel` flag — this works from cloud environments)*

5. **Scan the QR code** shown in the terminal with Expo Go

---

## METHOD 3: StackBlitz (Instant, No Setup)

1. Go to → **https://stackblitz.com/fork/react-native**
2. Upload/paste the project files
3. Connect Expo Go

---

## METHOD 4: Install Node.js (Portable — No Admin Rights Needed)

If you can't install normally, try the portable version:

1. Go to → https://nodejs.org/en/download
2. Download **"Windows Binary (.zip)"** — NOT the installer
3. Extract to any folder (e.g., `C:\Users\YourName\nodejs\`)
4. Add that folder to your PATH, OR run commands directly:
   ```
   C:\Users\YourName\nodejs\node.exe --version
   C:\Users\YourName\nodejs\npm.cmd install
   C:\Users\YourName\nodejs\npm.cmd start
   ```

---

## 🎯 QUICKEST PATH: Expo Snack

**Total time: ~10 minutes**

### Files to paste into Snack (in order):

Snack uses a simplified file system. Create these files:

| Snack File Path | Source File |
|----------------|-------------|
| `App.js` | `careeros-mobile/App.js` |
| `src/constants/theme.js` | same |
| `src/constants/mockData.js` | same |
| `src/components/common/Card.jsx` | same |
| `src/components/common/Badge.jsx` | same |
| `src/components/common/ProgressBar.jsx` | same |
| `src/components/common/ScoreGauge.jsx` | same |
| `src/components/common/SectionHeader.jsx` | same |
| `src/components/common/StatCard.jsx` | same |
| `src/screens/auth/LoginScreen.jsx` | same |
| `src/screens/home/HomeScreen.jsx` | same |
| `src/screens/profile/ProfileScreen.jsx` | same |
| `src/screens/academics/AcademicsScreen.jsx` | same |
| `src/screens/skills/SkillsScreen.jsx` | same |
| `src/screens/roadmap/RoadmapScreen.jsx` | same |
| `src/screens/prediction/PredictionScreen.jsx` | same |
| `src/screens/market/MarketScreen.jsx` | same |
| `src/screens/mentorship/MentorshipScreen.jsx` | same |
| `src/screens/wellness/WellnessScreen.jsx` | same |

### In Snack's `package.json`, add these dependencies:
```json
{
  "dependencies": {
    "@expo/vector-icons": "^14.0.0",
    "@react-navigation/bottom-tabs": "^6.5.20",
    "@react-navigation/native": "^6.1.17",
    "@react-navigation/native-stack": "^6.9.26",
    "expo-linear-gradient": "~13.0.2",
    "react-native-safe-area-context": "4.10.1",
    "react-native-screens": "3.31.1",
    "react-native-svg": "15.2.0",
    "react-native-gesture-handler": "~2.16.1"
  }
}
```

---

## 🌐 Snack Direct Link Approach

Once you paste all 19 files into snack.expo.dev and click **"Save"**, Snack generates a shareable URL like:
```
https://snack.expo.dev/@yourname/careeros-mobile
```

You can then:
- Share this link with anyone
- Open it on any phone with Expo Go
- No server needed — runs entirely in Expo's cloud

---

## 📞 Need Help?

If you get stuck on any step:
1. **Expo Snack docs**: https://docs.expo.dev/workflow/snack/
2. **GitHub Codespaces docs**: https://docs.github.com/en/codespaces
3. The app runs on **Expo SDK 51** — make sure Expo Go is updated to the latest version