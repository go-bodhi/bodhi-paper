# Quickstart & Validation Guide: Desktop Application Foundation

**Feature**: [spec.md](file:///home/alok/building/bodhi-paper-v2/specs/001-init-wails-react/spec.md)  
**Branch**: `001-init-wails-react`  
**Date**: 2026-11-12  

---

## 1. Prerequisites

Before validating this feature, verify the following local tools are installed:
- **Go**: `1.21+` (`go version`)
- **Node.js & npm**: `Node 18+`, `npm 9+` (`node -v`, `npm -v`)
- **Wails CLI**: `v2.10+` (`wails version`)

---

## 2. Setup Commands

From the repository root (`/home/alok/building/bodhi-paper-v2`):

```bash
# 1. Install frontend dependencies
cd frontend && npm install && cd ..

# 2. Verify Go module dependencies
go mod tidy
```

---

## 3. Validation Scenarios

### Scenario 1: Standalone Offline Backend Unit Tests
Proves that Go backend packages inside `internal/` execute tests completely offline and independently of the frontend.

```bash
# Run internal backend unit tests
go test -v ./internal/...
```

**Expected Outcome**:
- All tests pass with exit code `0`.
- Output shows: `--- PASS: TestGetHealth (0.00s)`.
- Execution completes offline in < 2 seconds.

---

### Scenario 2: Frontend Type Check and Production Build
Proves that the React TypeScript frontend compiles cleanly with TypeScript strict mode.

```bash
cd frontend
npm run build
cd ..
```

**Expected Outcome**:
- TypeScript compiler (`tsc`) finishes with zero errors.
- Vite bundles assets to `frontend/dist/`.

---

### Scenario 3: End-to-End Desktop Build
Proves that Wails compiles the Go backend and packages the React frontend into a standalone native executable.

```bash
# Build the application binary
wails build
```

**Expected Outcome**:
- Build completes successfully with exit code `0`.
- Standalone binary created in `build/bin/`.

---

### Scenario 4: Local Development Mode (Interactive Verification)
Proves the live application window opens in standard window mode with live reload.

```bash
# Run in dev mode with live reload
wails dev
```

**Expected Outcome**:
- Desktop window opens with title "Bodhi Paper" and standard window chrome (1024x768).
- React + TypeScript template UI renders.
- IPC greetings / health checks respond without errors in the developer console.
