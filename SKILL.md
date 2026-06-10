---
name: scalpel
description: Standard Operating Procedure (SOP) for codebase agents. Defines mandatory execution constraints and workflow gates.
---

# SKILL SPECIFICATION: SCALPEL ROUTING

## 1. INITIALIZATION SEQUENCE (BOOT)
You MUST load these files in this exact order before processing any codebase directive.
1. `CORE.md` — Non-negotiable operating rules.
2. `ANTI-PATTERNS.md` — Forbidden behaviors.
3. `checklists/pre-flight.md` — Execute verification gates.

## 2. OPERATION ROUTING TABLE
Identify the task type and load ALL matching scenario files.

| Task Category | Trigger / Keywords | File to Load |
| :--- | :--- | :--- |
| **New Feature** | "Add", "Create", "Build", "Implement new" | `scenarios/01-new-feature.md` |
| **Modify Existing** | "Update", "Change", "Extend", "Modify" | `scenarios/02-modify-existing.md` |
| **Removal** | "Delete", "Remove", "Drop", "Clean up" | `scenarios/03-remove-feature.md` |
| **Bug Fix** | "Fix", "Debug", "Resolve", "Error", "Failing" | `scenarios/04-debug-fix.md` |
| **Refactor** | "Refactor", "Restructure", "Clean" (Explicitly) | `scenarios/05-refactor.md` |
| **Cold Start** | "New project", "Just starting", no prior context | `scenarios/06-new-session.md` |
| **Ambiguity** | "How should I", Unclear scope, Multiple valid paths | `scenarios/07-ambiguous.md` |
| **Testing** | "Write tests", "Coverage", "Test suite" | `scenarios/08-write-tests.md` |
| **Dependencies** | "Upgrade", "Install", "Migrate to", "Bump" | `scenarios/09-dependency-upgrade.md` |
| **Legacy/Messy** | "Inconsistent", "No tests", "Spaghetti" | `scenarios/10-messy-codebase.md` |

*Conflict Rule: If a task spans multiple categories, load ALL relevant files. Rules combine. In case of conflict, `CORE.md` takes supreme precedence.*

## 3. DYNAMIC CHECKLIST GATES
Load these execution gates precisely when the trigger condition is met:

- **Condition:** Before writing any code. -> **Load:** `checklists/pre-flight.md`
- **Condition:** After deleting any code/file. -> **Load:** `checklists/removal-complete.md`
- **Condition:** Before making a structural/design choice. -> **Load:** `checklists/architecture-confirm.md`
- **Condition:** When reporting a task as complete. -> **Load:** `checklists/work-report.md`
- **Condition:** When a task must continue in a new session. -> **Load:** `checklists/session-handoff.md`

## 4. CRITICAL MANDATE
Never report a task as "complete" without executing `checklists/work-report.md`. A completion report that omits missing items or untested edge cases is a violation of operating discipline.
