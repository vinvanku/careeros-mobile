# 🚀 CareerOS Mobile App

**AI-Powered Student Career Intelligence Platform**  
Built with React Native (Expo) | Fully functional UI with mock data

---

## 📱 App Screenshots Overview

| Screen | Description |
|--------|-------------|
| **Login** | Gradient auth screen with demo login |
| **Home Dashboard** | Quick stats, prediction card, roadmap progress, wellness streak |
| **Profile** | Full profile with tabs: Overview, Skills, Projects, Certs, Internships |
| **Academics** | Semester records, GPA trends, attendance, risk alerts |
| **Skills** | Industry readiness score, domain radar, skill gaps |
| **Roadmap** | Visual milestone timeline with 7 career goal templates |
| **Prediction** | AI placement probability, company matches, factors, action plan |
| **Market** | Trending skills, salary benchmarks, market insights |
| **Mentorship** | AI-matched mentors, sessions, my mentors |
| **Wellness** | Streak tracker, burnout detection, activity logger |

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ (download from https://nodejs.org)
- npm or yarn
- Expo CLI
- Expo Go app on your phone (iOS/Android) OR Android Studio / Xcode

### Installation

```bash
# Navigate to the project directory
cd careeros-mobile

# Install dependencies
npm install

# Start the development server
npm start
```

### Running the App

**On Physical Device:**
1. Install "Expo Go" from App Store / Play Store
2. Run `npm start`
3. Scan the QR code with Expo Go (Android) or Camera app (iOS)

**On Emulator:**
```bash
npm run android   # Android Emulator
npm run ios       # iOS Simulator (macOS only)
```

**On Web Browser:**
```bash
npm run web
```

---

## 📁 Project Structure

```
careeros-mobile/
├── App.js                          # Root navigation & entry point
├── app.json                        # Expo configuration
├── package.json                    # Dependencies
├── babel.config.js                 # Babel configuration
│
└── src/
    ├── constants/
    │   ├── theme.js                # Colors, fonts, spacing, shadows
    │   └── mockData.js             # All mock data for the app
    │
    ├── components/
    │   └── common/
    │       ├── Card.jsx            # Reusable card component
    │       ├── Badge.jsx           # Status, tier, proficiency badges
    │       ├── ProgressBar.jsx     # Progress bars with scoring
    │       ├── ScoreGauge.jsx      # Circular score gauge (SVG)
    │       ├── StatCard.jsx        # Metric stat cards
    │       └── SectionHeader.jsx   # Section title with action button
    │
    └── screens/
        ├── auth/
        │   └── LoginScreen.jsx     # Login with demo mode
        ├── home/
        │   └── HomeScreen.jsx      # Main dashboard
        ├── profile/
        │   └── ProfileScreen.jsx   # Student profile (5 tabs)
        ├── academics/
        │   └── AcademicsScreen.jsx # Semester records & trends
        ├── skills/
        │   └── SkillsScreen.jsx    # Industry readiness & gaps
        ├── roadmap/
        │   └── RoadmapScreen.jsx   # Career milestone timeline
        ├── prediction/
        │   └── PredictionScreen.jsx # AI placement prediction
        ├── market/
        │   └── MarketScreen.jsx    # Job market intelligence
        ├── mentorship/
        │   └── MentorshipScreen.jsx # Mentor matching & sessions
        └── wellness/
            └── WellnessScreen.jsx  # Activity tracker & burnout detection
```

---

## 🎨 Design System

### Color Palette
- **Primary**: Indigo `#6366F1`
- **Secondary**: Emerald `#10B981`
- **Accent**: Amber `#F59E0B`
- **Purple**: `#8B5CF6`
- **Pink**: `#EC4899`

### Navigation Architecture
```
Root Stack Navigator
├── Login Screen
└── Main (Tab Navigator)
    ├── Home Tab
    ├── Academics Tab
    ├── Skills Tab
    ├── Roadmap Tab
    └── More Tab (grid of all screens)
        ├── Profile Screen
        ├── Prediction Screen
        ├── Market Screen
        ├── Mentorship Screen
        ├── Wellness Screen
        └── Notifications Screen
```

---

## 🧩 Modules Built

| Module | Features |
|--------|----------|
| **Auth** | Login form, validation, demo login |
| **Profile** | Info, skills (3 categories), projects, certifications, internships |
| **Academics** | 6-semester records, expandable subjects, GPA bar chart, attendance alerts |
| **Skills** | Readiness score gauge, 6 domain scores, score breakdown formula, skill gaps |
| **Roadmap** | 7 career goal templates, milestone timeline with status, progress tracking |
| **Prediction** | Probability score, company tier matching, +/- factors, action recommendations |
| **Market** | 15 trending skills with demand scores, salary benchmarks by role/tier, insights |
| **Mentorship** | AI-matched mentor cards, request flow, active mentors, session history |
| **Wellness** | Streak tracker with milestones, burnout risk detector, activity logger modal, insights |
| **Home** | Dashboard combining all modules with quick stats and navigation |

---

## 📊 Key Algorithms Implemented

### Industry Readiness Score
```
Score = (Technical Skills × 0.35) + (Project Depth × 0.25) +
        (Certifications × 0.15) + (Internship Experience × 0.15) +
        (GitHub Activity × 0.10)
```

### Academic Risk Score
```
Risk = (attendance < 75 ? (75 - attendance) × 2 : 0) +
       (gpaTrend < 0 ? |gpaTrend| × 10 : 0)
```

### Mentor Matching Score
```
Match = (Domain Overlap × 0.4) + (Goal Alignment × 0.3) +
        (Availability × 0.2) + (Mentor Rating × 0.1)
```

### Burnout Detection
```
Risk = HIGH if activity_drop > 50% over 7 days
Risk = MEDIUM if activity_drop > 30% over 7 days
```

---

## 🔌 Backend Integration Points

When connecting to a real backend, replace mock data in `src/constants/mockData.js` with API calls:

```javascript
// Example: Replace STUDENT_PROFILE with API call
const { data } = await axios.get('/api/profile/:studentId');

// Example: Replace PLACEMENT_PREDICTION with ML service call
const { data } = await axios.get('/api/prediction/:studentId');
```

Recommended backend stack (per the full CareerOS plan):
- **Node.js + Express** — REST API
- **PostgreSQL** — Main database
- **Python FastAPI** — ML prediction microservice
- **Redis** — Caching predictions

---

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `expo` | React Native platform |
| `@react-navigation/native` | Navigation |
| `@react-navigation/bottom-tabs` | Tab navigation |
| `@react-navigation/native-stack` | Stack navigation |
| `expo-linear-gradient` | Gradient backgrounds |
| `@expo/vector-icons` | Ionicons icon set |
| `react-native-svg` | SVG for score gauges |
| `react-native-safe-area-context` | Safe area handling |

---

## 🚀 Next Steps for Production

1. **Connect to Backend API** — Replace mockData with real API calls
2. **Add State Management** — Use Zustand or Redux for global state
3. **Add Push Notifications** — Expo Notifications for milestone reminders
4. **GitHub OAuth** — Auto-import contributions
5. **LinkedIn OAuth** — Auto-import profile
6. **ML Integration** — Connect placement prediction to Python FastAPI service
7. **Admin Dashboard** — Build admin portal for placement cells
8. **Dark Mode** — Add ThemeContext with dark/light toggle
9. **Offline Support** — Cache critical data with AsyncStorage
10. **Analytics** — Add Mixpanel/Firebase for usage tracking

---

*Built with ❤️ — CareerOS v1.0*