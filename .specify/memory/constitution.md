<!--
Sync Impact Report:
- Version Change: None (Initial Draft) → 1.0.0
- Ratification Date: 2026-11-09
- Principle 1: [PRINCIPLE_1_NAME] → I. Local-First Architecture
- Principle 2: [PRINCIPLE_2_NAME] → II. Writing-First & Zero Friction
- Principle 3: [PRINCIPLE_3_NAME] → III. Zero Data Loss (Continuous Autosave)
- Principle 4: [PRINCIPLE_4_NAME] → IV. Test-First & Deterministic Behavior (NON-NEGOTIABLE)
- Principle 5: [PRINCIPLE_5_NAME] → V. Simplicity & Scope Discipline (YAGNI)
- Section 2: [SECTION_2_NAME] → Technical & Quality Standards
- Section 3: [SECTION_3_NAME] → Development Workflow & Quality Gates
- Governance: [GOVERNANCE_RULES] populated with amendment procedure, versioning policy, and compliance review
- Follow-up TODOs: None
-->

# Bodhi Paper Constitution

## Core Principles

### I. Local-First Architecture
All user data MUST be stored and processed directly on the user's device by default. No remote
network calls, telemetry, or remote storage operations are permitted unless explicitly requested
by the user. Local persistence MUST function fully offline without degradation of core features.
*Rationale: Bodhi Paper is a private thought dumper and reflection tool. Complete local ownership
of personal thoughts is non-negotiable for user privacy and trust.*

### II. Writing-First & Zero Friction
The user interface MUST prioritize the blank writing canvas above all other elements. Starting
the application or creating a new entry MUST immediately provide an active writing surface with
zero popups, blocking modal dialogs, or mandatory setup steps. Formatting MUST remain constrained
to plain text and Markdown; rich WYSIWYG complexity is excluded.
*Rationale: The primary user is someone writing to clarify their own thinking. Friction or lag
between thought and capture causes loss of train of thought.*

### III. Zero Data Loss (Continuous Autosave)
Autosave MUST operate continuously and unobtrusively in the background. Any modification to text
or metadata MUST be durably saved to local storage within deterministic, low-latency thresholds.
Destructive actions (e.g., deleting writings or writing types) MUST require explicit user
confirmation and safeguard against accidental data loss.
*Rationale: Users entrust their raw thoughts to the app. Losing any user writing is catastrophic
and breaks core trust.*

### IV. Test-First & Deterministic Behavior (NON-NEGOTIABLE)
Test-Driven Development (TDD) is strictly required for all business logic, state transitions,
autosave mechanics, search indexing, and filtering logic. Tests MUST be authored and proven to
fail before implementation begins. Automated test suites MUST run deterministically and offline
without relying on network availability or flaky timing.
*Rationale: Maintaining unwavering data integrity and search performance demands verified test
coverage across all core code paths.*

### V. Simplicity & Scope Discipline (YAGNI)
Features outside the defined product scope MUST NOT be added. Cloud accounts, device synchronization,
collaboration tools, and AI generation are explicitly out of scope for v1. Code complexity, external
dependencies, and abstractions MUST be minimized. Every introduced dependency or structural layer
MUST be justified.
*Rationale: Bodhi Paper is a focused thinking instrument, not a bloated workspace. Strict scope
discipline ensures fast delivery, responsive runtime performance, and maintainability.*

## Technical & Quality Standards

- **Local Storage Integrity**: Persistence implementations MUST support atomic, durable writes with
  safe recovery to prevent database or file corruption.
- **Latency & Performance**: Editor initialization to ready-to-type state MUST complete within 100ms.
  Full-text search queries and time-range filtering MUST return results within 50ms.
- **Portability & Clean Formats**: Writings MUST be stored in structured, readable plain text /
  Markdown formats to guarantee long-term data accessibility.
- **Theme Persistence**: Theme changes MUST apply instantaneously without full application reloads
  and persist durably across restarts.

## Development Workflow & Quality Gates

- **Pre-Merge Verification**: All unit and integration test suites MUST pass before merging code changes.
- **Spec Kit Alignment**: All specifications, task lists, and architectural choices MUST conform to
  established Spec Kit artifacts and conventions (`docs/SPEC.md`, `.specify/`).
- **Regression Protection**: Any schema, storage format, or query modifications MUST include migration
  tests ensuring zero data loss across upgrades.
- **Compliance Gates**: Pull requests and code reviews MUST explicitly check code changes against the
  core principles (local-first, writing-first, zero data loss, simplicity).

## Governance

- **Supremacy**: This constitution forms the highest authority for technical and architectural
  practices in Bodhi Paper. It supersedes informal agreements and transient shortcuts.
- **Amendment Procedure**: Proposed amendments MUST include written justification, impact analysis,
  maintainer review, and any required migration paths for existing specifications and code.
- **Versioning Policy**: The constitution version follows Semantic Versioning (`MAJOR.MINOR.PATCH`):
  - `MAJOR`: Backward-incompatible governance changes, removal or major redefinition of core principles.
  - `MINOR`: New principles, new sections, or materially expanded guidelines.
  - `PATCH`: Clarifications, typographical fixes, or non-semantic wording updates.
- **Compliance Review**: All design plans, implementations, and reviews MUST confirm adherence to
  this document. Deviations MUST be rejected or revised prior to merge.

**Version**: 1.0.0 | **Ratified**: 2026-11-09 | **Last Amended**: 2026-11-09
