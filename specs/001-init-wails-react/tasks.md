# Tasks: Desktop Application Foundation & Scaffolding

**Input**: Design documents from `/specs/001-init-wails-react/`  
**Prerequisites**: [plan.md](file:///home/alok/building/bodhi-paper-v2/specs/001-init-wails-react/plan.md), [spec.md](file:///home/alok/building/bodhi-paper-v2/specs/001-init-wails-react/spec.md), [research.md](file:///home/alok/building/bodhi-paper-v2/specs/001-init-wails-react/research.md), [data-model.md](file:///home/alok/building/bodhi-paper-v2/specs/001-init-wails-react/data-model.md), [contracts/ipc-api.md](file:///home/alok/building/bodhi-paper-v2/specs/001-init-wails-react/contracts/ipc-api.md)  
**Constitution**: Adheres strictly to Constitution v1.1.0 (Local-First Architecture, Backend TDD Gate, Spec Kit Alignment, Offline Integrity).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, Go module configuration, and Wails template overlay

- [X] T001 Initialize Wails v2 project files using `react-ts` template into repository root without overwriting existing `.git`, `.specify`, or `.agents` directories
- [X] T002 Configure `go.mod` with Go module path `github.com/go-bodhi/bodhi-paper` and run `go mod tidy` in `go.mod`
- [X] T003 [P] Configure `wails.json` with project name `"bodhi-paper"`, output binary name `"bodhi-paper"`, and frontend commands in `wails.json`
- [X] T004 [P] Update `.gitignore` to ignore Wails build output `build/bin/`, frontend bundles `frontend/dist/`, and dependencies `frontend/node_modules/` in `.gitignore`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core frontend dependencies and backend directory structure required by all user stories

**⚠️ CRITICAL**: Must be completed before user story implementation begins

- [X] T005 Install frontend dependencies via `npm install` in `frontend/package.json`
- [X] T006 [P] Verify TypeScript compiler configuration with strict mode (`"strict": true`) in `frontend/tsconfig.json`
- [X] T007 Create private backend package directory `internal/` for local Go services at repository root

**Checkpoint**: Foundation ready — user story implementation can begin.

---

## Phase 3: User Story 1 - Desktop Application Launch (Priority: P1) 🎯 MVP

**Goal**: Establish a runnable native Wails desktop application window with standard OS window chrome displaying the initialized React + TypeScript template.

**Independent Test**: Build and launch the application; verify a native window opens at 1024x768 with title "Bodhi Paper" and loads the frontend without runtime crashes.

### Implementation for User Story 1

- [X] T008 [US1] Configure standard desktop window options with title `"Bodhi Paper"`, width `1024`, height `768`, and frameless `false` in `main.go`
- [X] T009 [P] [US1] Verify standard template mounting and root React component in `frontend/src/main.tsx` and `frontend/src/App.tsx`
- [X] T010 [US1] Compile frontend production bundle via `npm run build` and verify output in `frontend/dist/`

**Checkpoint**: User Story 1 (MVP) is operational and can build cleanly.

---

## Phase 4: User Story 2 - Modular Internal Backend Services (Priority: P2)

**Goal**: Implement a private, testable backend health service in `internal/health.go` satisfying the Backend TDD Gate with 100% offline unit test pass rate.

**Independent Test**: Run `go test -v ./internal/...` completely offline; verify all tests pass with exit code `0`.

### Tests for User Story 2 (Backend TDD Gate - Write First) ⚠️

- [X] T011 [US2] Write unit tests in `internal/health_test.go` asserting `GetHealth()` returns status `"ok"`, version `"0.1.0"`, and valid positive non-zero timestamp, and verify test fails before implementation

### Implementation for User Story 2

- [X] T012 [US2] Implement `HealthResponse` struct (`status` matching `"ok"|"degraded"|"error"`, semver `version`, `environment`, and positive int64 `timestamp`) and `GetHealth()` in `internal/health.go`
- [X] T013 [US2] Execute `go test -v ./internal/...` completely offline to verify all unit tests pass

**Checkpoint**: User Story 2 complete; backend service is fully verified offline.

---

## Phase 5: User Story 3 - Bi-Directional Bridge Between Frontend and Backend (Priority: P3)

**Goal**: Expose the internal backend health service and greeting methods across the Wails IPC bridge to the React TypeScript frontend.

**Independent Test**: Verify Wails generates TypeScript bindings in `frontend/wailsjs/` and that the frontend can call `GetHealth()` and receive a typed `HealthResponse`.

### Implementation for User Story 3

- [X] T014 [US3] Implement `App` coordinator struct with `GetHealth() internal.HealthResponse` and `Greet(name string) string` in `app.go`
- [X] T015 [US3] Register `App` instance in `options.App{ Bind: []interface{}{ app } }` in `main.go`
- [X] T016 [US3] Generate TypeScript IPC bindings in `frontend/wailsjs/go/main/App.d.ts` and `frontend/wailsjs/go/main/App.js`
- [X] T017 [US3] Connect IPC call `GetHealth()` or `Greet()` in `frontend/src/App.tsx` with error handling if bridge is disconnected

**Checkpoint**: User Story 3 complete; frontend and backend communicate seamlessly via typed IPC.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: End-to-end validation across all scenarios documented in `quickstart.md`

- [X] T018 Run standalone offline backend test suite via `go test -v ./internal/...` per quickstart scenario 1
- [X] T019 [P] Run frontend typecheck and production build via `npm run build` in `frontend/` per quickstart scenario 2
- [X] T020 Run end-to-end standalone desktop build via `wails build` per quickstart scenario 3

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 completion; blocks all user stories.
- **User Story 1 (Phase 3)**: Depends on Phase 2; produces the core MVP desktop shell.
- **User Story 2 (Phase 4)**: Depends on Phase 2; can be developed in parallel with US1.
- **User Story 3 (Phase 5)**: Depends on completion of US1 (`App.tsx` ready) and US2 (`internal/health.go` ready).
- **Polish (Phase 6)**: Depends on completion of US1, US2, and US3.

### Parallel Opportunities
- In Phase 1: `T003` (`wails.json`) and `T004` (`.gitignore`) can run in parallel.
- In Phase 2: `T006` (`tsconfig.json`) and `T007` (`internal/`) can run in parallel.
- In Phase 3: `T009` (`frontend/src/`) can run in parallel with `T008` (`main.go`).
- In Phase 6: `T019` (frontend build) can run in parallel with `T018` (Go tests).

---

## Implementation Strategy

### MVP First (User Story 1)
1. Complete Phase 1 (Setup) and Phase 2 (Foundational).
2. Complete Phase 3 (User Story 1).
3. Validate desktop window launch and rendering.

### Incremental Delivery
1. Add User Story 2 (Backend TDD `internal/health.go`).
2. Add User Story 3 (IPC Bridge connecting UI to backend).
3. Execute Phase 6 verification scenarios in `quickstart.md`.
