# 🕐 Daily Screen-Time Approval Prototype

A client-side prototype that simulates a daily screen-time approval workflow using **native iOS (Swift)** for business logic and **React Native** for the UI.

> No backend, no real ScreenTime APIs, no system permissions — purely local simulation.

## Architecture

```
React Native UI (App.tsx)
        │
        │  NativeModules.ScreenTimeApproval.requestApproval()
        ▼
┌──────────────────────────────────┐
│  ScreenTimeApprovalBridge.m      │  ← Obj-C macro (RCT_EXTERN_MODULE)
│  ScreenTimeApprovalModule.swift  │  ← Swift bridge (Promise-based)
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│  ScreenTimeApprovalLogic.swift   │  ← Business logic (time-based rules)
│  ScreenTimeApprovalResponse.swift│  ← Response model
└──────────────────────────────────┘
```

## How It Works

1. User taps **"Request Daily Approval"** in the React Native UI
2. The app calls the Swift native module via React Native's bridge
3. Swift business logic evaluates a **time-based rule** (approve if before 8 PM)
4. A **1.5-second simulated delay** mimics a real API call
5. The result (`approved: true/false` + reason) is returned to React Native
6. The UI updates dynamically to show **Approved ✅** or **Not Approved ❌**

## Project Structure

```
ios/ScreenTimePrototype/
├── ScreenTimeApprovalResponse.swift   # Response model (approved, reason, timestamp)
├── ScreenTimeApprovalLogic.swift      # Business logic (time-based rules, async delay)
├── ScreenTimeApprovalModule.swift     # Native Module bridge (Promise-based)
├── ScreenTimeApprovalBridge.m         # Obj-C bridge macro (RCT_EXTERN_MODULE)
└── AppDelegate.swift                  # Standard RN app delegate

App.tsx                                # React Native approval screen UI
```

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Separated Swift files** | Business logic, response model, and bridge are in distinct files for clean architecture |
| **Time-based rule (before 8 PM)** | Simple, deterministic, and easy to test at different times of day |
| **Promise-based bridging** | Modern async pattern; cleaner than callback-based approach |
| **In-memory request counter** | Demonstrates stateful logic without persistence complexity |
| **1.5s simulated delay** | Mimics real API latency; demonstrates loading states in UI |

## Getting Started

### Prerequisites

- macOS with Xcode installed
- Node.js >= 22.11.0
- CocoaPods

### Setup & Run

```bash
# Install JS dependencies
npm install

# Install iOS CocoaPods dependencies
bundle install
bundle exec pod install

# Start Metro bundler
npm start

# In a new terminal — build & run on iOS simulator
npx react-native run-ios
```

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React Native | 0.84.0 | Mobile framework (New Architecture) |
| React | 19.2.3 | UI library |
| Swift | 5.x | iOS native business logic |
| TypeScript | 5.8.3 | Type-safe JavaScript |
