# SPEC.md — Project Specification

> **Status**: `FINALIZED`

## Vision
Build a client-side prototype that simulates a daily screen-time approval workflow using native iOS (Swift) for business logic and React Native for the UI. The Swift layer makes a simulated approval decision and communicates the result to React Native via a Native Module bridge. No backend, no real ScreenTime APIs, no system permissions — purely local simulation.

## Goals
1. **Swift approval engine** — Clean, separated Swift module with business logic (time-based rules + in-memory state), response models, and bridge communication
2. **Native Module bridge** — Promise-based Swift ↔ React Native bridge that passes approval data correctly
3. **React Native UI** — Minimal screen with a button to request approval, displaying "Approved" or "Not Approved" dynamically based on the Swift response

## Non-Goals (Out of Scope)
- No real Apple ScreenTime / FamilyControls APIs
- No system-level permissions or entitlements
- No external backend or network calls
- No Android native module (iOS-only prototype)
- No advanced UI styling (clarity and functional flow are the priority)
- No persistent storage (in-memory state only)

## Users
Technical reviewers evaluating the prototype as a coding assignment. The app demonstrates the end-to-end flow: **React Native → Swift approval logic → React Native UI update**.

## Constraints
- React Native 0.84.0 (New Architecture) with Swift iOS layer
- iOS-only target
- Must use Native Modules (not Turbo Modules) for bridging
- Simulated async behavior (delay to mimic API call)
- Hardcoded rules (e.g., approve only before 8 PM)

## Success Criteria
- [ ] Swift module separates business logic, response model, and bridge code into distinct files
- [ ] Approval logic uses time-based rule (approve before 8 PM) with simulated async delay
- [ ] Native Module bridge correctly passes approval result (approved: true/false + reason) to JS
- [ ] React Native UI has a button that triggers approval request
- [ ] UI displays "Approved" and "Not Approved" states dynamically
- [ ] App builds and runs on iOS simulator without errors
