# ROADMAP.md

> **Current Phase**: Not started
> **Milestone**: v1.0

## Must-Haves (from SPEC)
- [ ] Swift approval logic with clean separation (business logic / models / bridge)
- [ ] Native Module bridge (Promise-based, Swift ↔ JS)
- [ ] React Native UI with approval button and dynamic status display
- [ ] App builds and runs on iOS simulator

## Phases

### Phase 1: Swift Approval Engine
**Status**: ⬜ Not Started
**Objective**: Create the Swift-side approval logic with clean architecture separation
**Deliverables**:
- `ScreenTimeApprovalLogic.swift` — Business logic (time-based rule, async delay)
- `ScreenTimeApprovalResponse.swift` — Response model (approved, reason, timestamp)
- Unit-testable in isolation

### Phase 2: Native Module Bridge
**Status**: ⬜ Not Started
**Objective**: Bridge Swift approval logic to React Native via Native Modules
**Deliverables**:
- `ScreenTimeApprovalBridge.m` — Objective-C bridge macro (RCT_EXTERN_MODULE)
- `ScreenTimeApprovalModule.swift` — Swift module exposing `requestApproval` to JS
- Promise-based async bridge communication

### Phase 3: React Native UI
**Status**: ⬜ Not Started
**Objective**: Build the approval screen with button and dynamic status display
**Deliverables**:
- Replace boilerplate `App.tsx` with approval UI
- Button to trigger approval request
- Dynamic "Approved" / "Not Approved" display with visual feedback
- Loading state during simulated async call

### Phase 4: Integration & Verification
**Status**: ⬜ Not Started
**Objective**: End-to-end testing and polish
**Deliverables**:
- Verify full flow: RN button → Swift logic → RN UI update
- Build succeeds on iOS simulator
- Clean up boilerplate code
