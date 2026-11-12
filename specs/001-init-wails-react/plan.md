# Implementation Plan: Desktop Application Foundation & Scaffolding

**Branch**: `001-init-wails-react` | **Date**: 2026-11-12 | **Spec**: [spec.md](file:///home/alok/building/bodhi-paper-v2/specs/001-init-wails-react/spec.md)

**Input**: Feature specification from `/specs/001-init-wails-react/spec.md`

## Summary

Scaffold and initialize the Wails v2 desktop application for Bodhi Paper. The setup establishes a Go module (`github.com/go-bodhi/bodhi-paper`), sets up an `internal/` folder containing a flat, testable health service (`health.go` and `health_test.go`), initializes the React + TypeScript frontend using the standard Wails `react-ts` template, and configures a standard native desktop window (1024x768). All backend services adhere to the Backend TDD Gate and Offline Integrity requirements of the project Constitution.

## Technical Context

**Language/Version**: Go 1.21+ (System: Go 1.26.10), TypeScript 5.x / React 18+ (System: Node v22.23.1, npm 10.9.8)

**Primary Dependencies**: Wails v2 (`github.com/wailsapp/wails/v2`), React 18, Vite 5+

**Storage**: N/A for initial scaffold (SQLite/SQLCipher will be introduced in subsequent data features)

**Testing**: Standard Go `testing` package (`go test -v ./internal/...`) for backend services; TypeScript compiler check (`npm run build`) for frontend

**Target Platform**: Cross-platform desktop (Linux x86_64 default, macOS, Windows)

**Project Type**: Desktop application (Wails v2)

**Performance Goals**: Desktop cold startup < 2.0s; IPC request/response latency < 10ms; backend unit test suite execution < 2.0s

**Constraints**: 100% offline-capable, zero external network requests at runtime, flat minimal backend layout without premature directories

**Scale/Scope**: Scaffolding only: project root configuration, `internal/` Go backend health service, `frontend/` React TypeScript initialization, standard window setup

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle / Gate | Requirement | Status | Notes |
|------------------|-------------|--------|-------|
| **I. Local-First Architecture** | All user data and processing MUST reside on local device | **PASSED** | Entire runtime is local; zero external API or network calls. |
| **Backend TDD Gate** | PRs touching Go services MUST demonstrate test-first discipline and 100% passing tests | **PASSED** | `internal/health_test.go` provides 100% offline unit tests for `internal/health.go`. |
| **Spec Kit Alignment** | Features, task lists, and designs trace directly to specs | **PASSED** | Plan and artifacts trace to `specs/001-init-wails-react/spec.md`. |
| **Offline Integrity** | All automated tests MUST execute completely offline | **PASSED** | Unit tests and build scripts require no internet access. |

## Project Structure

### Documentation (this feature)

```text
specs/001-init-wails-react/
├── spec.md              # Feature specification
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
│   └── ipc-api.md       # Wails IPC bridge interface contract
└── checklists/          # Requirements & quality checklists
    └── requirements.md
```

### Source Code (repository root)

```text
.
├── main.go                     # Wails desktop entrypoint & standard window configuration (1024x768)
├── app.go                      # App coordinator struct & IPC bridge bindings
├── wails.json                  # Wails v2 project configuration
├── go.mod                      # Go module (github.com/go-bodhi/bodhi-paper)
├── go.sum                      # Go module checksums
├── build/                      # Wails build assets & application icons
│   ├── appicon.png
│   └── linux/
├── internal/                   # Private backend domain logic & services
│   ├── health.go               # Health & environment verification service
│   └── health_test.go          # Offline unit tests (Backend TDD Gate)
└── frontend/                   # React + TypeScript frontend (initialized from react-ts template)
    ├── index.html              # HTML template
    ├── package.json            # Frontend dependencies & scripts
    ├── tsconfig.json           # TypeScript configuration (strict mode)
    ├── vite.config.ts          # Vite bundler configuration
    ├── src/                    # Default template source
    └── wailsjs/                # Generated Wails IPC bindings
        ├── go/
        └── runtime/
```

**Structure Decision**:
Minimal, flat Wails v2 project layout. Go backend services reside directly in `internal/` (`health.go` and `health_test.go`) to avoid premature directory nesting while enforcing package privacy. The frontend is initialized directly with the standard `react-ts` template without custom UI components built yet.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

*No constitutional violations. Design is strictly minimalist and aligns with YAGNI and Constitution v1.1.0.*
