# 🌍 Travel Explorer App (India) — GDGC VNRVJIET Assignment

A React Native mobile travel application built for the **GDGC VNRVJIET App Development Volunteer Recruitment Assignment**.

The application showcases destinations across India spanning **Beaches**, **Mountains**, **Heritage**, and **Adventure**, designed in a **soft pastel claymorphic / neumorphic visual style** with warm blush tones, floating cards, real high-resolution travel photography, and local persistent storage.

---

## 📱 Visual Design & Aesthetic Highlights
- **Palette**: Warm blush pink (`#FCEFEF`), deep royal burgundy/plum (`#8A2846`), soft mauve (`#4D364F`), and warm clay tones.
- **Claymorphic Soft UI**: Generous border radius (`24px`–`36px`), multi-layer drop shadows, pill tags, and floating action buttons.
- **Floating Bottom Nav Dock**: Rounded dock matching modern iOS/Android claymorphic mockups.
- **Responsive Mobile Shell**: When run on desktop web browsers, the app renders inside a mobile device chassis (iPhone-style frame) with dynamic island, status bar, and fullscreen toggle. On mobile devices, it expands to 100% native screen viewport.
- **100% Genuine Photography**: Real Indian travel photography curated from Unsplash (strictly zero AI-generated images).

---

## 🎯 Assignment Stages & Feature Checklist

| Stage | Feature Description | Implementation Details | Status |
| :--- | :--- | :--- | :---: |
| **Stage 1** | **Destination Discovery** | 8 curated Indian destinations across all 4 categories (*Goa*, *Andaman*, *Manali*, *Munnar*, *Jaipur*, *Hampi*, *Rishikesh*, *Leh-Ladakh*). Displays real image, destination name, location, rating, and category. | ✅ Complete |
| **Stage 2** | **Navigation & Details** | Fluid stack & tab navigation. Displays short & full descriptions, "Best Time to Visit" card, and 2–3 popular attractions per destination with real photos & labels. | ✅ Complete |
| **Stage 3** | **Search & Filtering** | Real-time search bar (by destination name, location, or state), 5 category pills (`All`, `Beaches`, `Mountains`, `Heritage`, `Adventure`), combined live search + filter, and zero-state handling. | ✅ Complete |
| **Stage 4** | **Travel Wishlist** | Add/remove destinations with heart icon on cards & details screen. Dedicated Wishlist screen with instant remove action and AsyncStorage local persistence across app restarts. | ✅ Complete |
| **Extension** | **Bonus Enhancements** | Local Storage persistence via `@react-native-async-storage/async-storage`, web deployment support, and interactive stats. | ✅ Complete |

---

## 📂 Project Architecture

```
travel-explorer-app/
├── App.js                         # Root entry point with Providers & Responsive Shell
├── index.js                       # Expo entry point
├── app.json                       # Expo configuration
├── package.json                   # Dependencies & build scripts
├── src/
│   ├── constants/
│   │   ├── colors.js              # Claymorphic design tokens & color palette
│   │   └── destinationsData.js    # Curated real Indian travel dataset
│   ├── context/
│   │   └── WishlistContext.js     # State management & AsyncStorage persistence
│   ├── navigation/
│   │   └── AppNavigator.js        # Tab Navigator (Dock) + Native Stack Navigator
│   ├── screens/
│   │   ├── HomeScreen.js          # Stage 1: Discovery, hero banner, category pills
│   │   ├── DetailsScreen.js       # Stage 2: Hero image, best time, attractions
│   │   ├── SearchScreen.js        # Stage 3: Live search & category filters
│   │   ├── WishlistScreen.js      # Stage 4: Wishlist management & empty state
│   │   └── ProfileScreen.js       # Traveler profile & assignment checklist
│   └── components/
│       ├── DestinationCard.js     # Card with image, badges, wishlist toggle
│       ├── AttractionCard.js      # Attraction card in details screen
│       ├── CategoryPill.js        # Category filter pill with icons
│       └── MobileFrame.js         # Responsive device shell for desktop web
└── assets/                        # App icons and splash assets
```

---

## 🚀 Getting Started & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go App](https://expo.dev/client) installed on your iOS or Android phone (optional, for physical device testing)

### Installation
1. Clone this repository:
   ```bash
   git clone <YOUR_GITHUB_REPO_URL>
   cd travel-explorer-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
- **To run on Web Browser** (with interactive mobile phone frame):
  ```bash
  npm run web
  ```
  Open `http://localhost:8081` in your browser.

- **To run on Physical Phone (iOS / Android)**:
  ```bash
  npm start
  ```
  Scan the terminal QR code with the **Expo Go** app on your phone.

- **To run on Android Emulator**:
  ```bash
  npm run android
  ```

- **To run on iOS Simulator** (macOS only):
  ```bash
  npm run ios
  ```

---

## 🌐 Web Deployment (Live URL for Evaluation)

You can build a static web bundle and host it on **Vercel**, **Netlify**, or **GitHub Pages**:

```bash
# 1. Build the production static web export
npm run build:web

# 2. Deploy dist/ directory to Vercel
npx vercel deploy --prod dist

# Or deploy to Netlify
npx netlify deploy --prod --dir=dist
```

---

## 🎥 Demo Video Guide (2–3 Minutes)

When recording your submission video for GDGC VNRVJIET:
1. **Introduction (30s)**: Introduce yourself, mention the GDGC VNRVJIET assignment, and highlight the soft pastel claymorphism design.
2. **Stage 1 — Destination Discovery (30s)**: Scroll through the Home screen, demonstrate the 4 categories (Beaches, Mountains, Heritage, Adventure), and show the featured carousel.
3. **Stage 2 — Destination Details (45s)**: Click into a destination (e.g., Goa or Manali). Show the "Best Time to Visit" card, short description, and scroll through the 3 popular attractions with real photography.
4. **Stage 3 — Search & Filter (30s)**: Navigate to Search. Type queries (e.g., "Manali", "Kerala"), filter by categories, and demonstrate the zero-state when no result is found.
5. **Stage 4 — Wishlist & Persistence (45s)**: Tap the heart icon to add places, switch to the Wishlist tab, show saved destinations, remove one, and explain that AsyncStorage preserves data across restarts.

---

## 👨‍💻 Submission Details
- **Assignment**: GDGC VNRVJIET — App Development Domain Volunteer Recruitment
- **Candidate Submission Deadline**: 22 October 2026, 11:59 PM IST
- **Framework**: React Native + Expo
- **License**: MIT
