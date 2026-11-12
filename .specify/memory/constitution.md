<!--
Sync Impact Report:
- Version Change: 1.0.0 → 1.1.0
- Ratification Date: 2026-11-09
- Last Amended: 2026-11-09
- Modified Principles:
  - Principle I: Clarified local-first architecture.
  - Principle II: Reaffirmed writing-first with Wails desktop app (Go + React/TypeScript) and zero-friction startup.
  - Principle IV: Refined TDD scope to strictly mandate test-first for Go backend services.
  - Principle V: Reaffirmed scope boundaries.
- Added / Refined Sections:
  - Technical & Quality Standards: Mandated Wails (Go + React/TypeScript), SQLCipher with FTS5 search, debounced autosave, and OS Keychain/SecretService key management.
  - Development Workflow & Quality Gates: Enforced Go TDD, Wails IPC contracts, and soft-delete recovery tests.
- Removed Sections: None.
- Follow-up TODOs: None.
-->

# Bodhi Paper Constitution

## Core Principles

### I. Local-First Architecture 
All user data MUST reside and be processed on the local device by default. 


## Development Workflow & Quality Gates

- **Backend TDD Gate**: Pull requests touching Go services (persistence, encryption, search, IPC) MUST
  demonstrate test-first commit discipline and 100% passing automated tests.
- **Data Safety Gates**: Any modifications to database schema, migrations, or deletion flows MUST include
  regression tests verifying that existing data is preserved and soft-deleted items are recoverable.
- **Spec Kit Alignment**: Features, task lists, and designs MUST trace directly to `docs/SPEC.md` and
  Spec Kit workflow specifications.
- **Offline Integrity**: All automated test suites MUST execute completely offline without network access.

## Governance

- **Supremacy**: This constitution is the supreme architectural authority for the Bodhi Paper codebase.
- **Amendment Procedure**: Any amendment MUST provide written technical justification, impact analysis,
  maintainer consensus, and a migration path for existing code and data schemas.
- **Versioning Policy**: Semantic Versioning (`MAJOR.MINOR.PATCH`):
  - `MAJOR`: Fundamental redefinition or removal of core principles (e.g. dropping local-first or encryption).
  - `MINOR`: New principles, architectural additions (e.g. new platforms, sync capabilities), or materially expanded rules.
  - `PATCH`: Clarifications, wording improvements, or non-semantic refinements.
- **Compliance Review**: All proposed PRs, architectural blueprints, and feature specifications MUST be
  reviewed against these constitutional principles. Non-compliant work must be rejected or adapted.

**Version**: 1.1.0 | **Ratified**: 2026-11-09 | **Last Amended**: 2026-11-09
