# ViralFlow AI — Enterprise Creator Automation OS

ViralFlow AI is an advanced, full-stack AI Creator Automation Platform that helps creators, YouTubers, influencers, and digital marketers automate and supercharge their workflow. Built using modern design frameworks, it feels like a real billion-dollar SaaS product.

---

## ⚡ Main Features

1. **AI Script Generator**: Fully custom scripts with hook, body, and CTA targeting.
2. **Viral Hook Generator**: Maximize retention rates with custom psychological hooks.
3. **Hashtag Optimizer**: Generate trend-aligned hashtag clusters.
4. **Thumbnail Prompt Crafter**: Generate detailed prompt descriptions for Midjourney/DALL-E.
5. **Interactive Content Planner**: Live scheduler drag-and-drop simulation.
6. **AI Narrator & Voice Generator**: Neural audio wave text-to-speech engine.
7. **Trend Detection Radar**: Tracks audio streams and high-growth topics.
8. **Gamified Creator Levels**: Track daily streaks and XP progression rewards.
9. **Fully Integrated Settings Console**: Manage 20+ config panels including profile, team management, security, and integrations.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Glassmorphism Aesthetics
- **Icons**: Lucide React
- **Backend & DB**: Firebase Auth (Google/GitHub/Password OAuth) & Firestore Database Storage

---

## 🚀 Getting Started

### 1. Installation

Clone this repository and install the dependencies:
```bash
npm install
```

### 2. Configure Firebase Environment Keys

To connect to your live Firebase Console, create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=1:your_sender_id:web:your_app_id
```

> 💡 **Fallback Mode**: If these keys are not set, ViralFlow AI will seamlessly degrade into a fully functional, highly interactive local mock storage mode. This ensures the app is 100% testable immediately without configuring the API keys!

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Firebase Authentication Console Configuration

For OAuth popup and login flows to work correctly, enable them in your Firebase Console:

1. **Activate Email/Password Provider**: Go to *Authentication* -> *Sign-in method* and enable Email/Password.
2. **Activate Google Auth**: Enable Google and select your project's support email.
3. **Activate GitHub Auth**:
   - Register a new OAuth application in GitHub Developer Settings.
   - Set the Authorization callback URL to the link provided in the Firebase Console.
   - Add the Client ID and Client Secret in Firebase.
4. **Firestore Rules Setup**:
   To allow users to sync profiles correctly, use the following Firestore security rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

---

## 🧑‍💻 Production Build Validation

Compile and verify clean production builds using:
```bash
npm run build
```
