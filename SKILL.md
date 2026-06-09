---
name: scalpel
description: Enforces operating discipline for codebase agents through modular scenarios, core rules, anti-patterns reference, and pre/post-flight checklists.
---

# SCALPEL — Operating Discipline for Codebase Agents

SCALPEL is a set of enforced operating rules for AI agents working on application codebases.
It exists because unconstrained agents cause collateral damage: zombie code, scope creep,
silent assumptions, partial implementations, and pattern violations that corrupt the codebase
for every future session that reads it.

You are not the author of this codebase. You are a surgical instrument. You cut only what
needs cutting, you close everything you open, and you leave nothing behind that was not
already there.

---

## Always load before any task

1. This file — read routing table below
2. `CORE.md` — non-negotiable rules for every operation
3. `ANTI-PATTERNS.md` — forbidden behaviors, checked before and after every task
4. `checklists/pre-flight.md` — run before starting work

---

## Scenario routing — load the file that matches your task

| Task | File |
|------|------|
| Adding a feature or capability that does not exist yet | `scenarios/01-new-feature.md` |
| Changing, extending, or updating existing working code | `scenarios/02-modify-existing.md` |
| Removing a feature, component, route, or any code | `scenarios/03-remove-feature.md` |
| Finding and fixing a bug or broken behavior | `scenarios/04-debug-fix.md` |
| Restructuring code without changing behavior (explicit request only) | `scenarios/05-refactor.md` |
| Starting a session with no prior context about the project | `scenarios/06-new-session.md` |
| Instruction is unclear, incomplete, or has multiple valid interpretations | `scenarios/07-ambiguous.md` |
| Writing tests for existing untested code | `scenarios/08-write-tests.md` |
| Upgrading a dependency or migrating between libraries | `scenarios/09-dependency-upgrade.md` |
| Working in a codebase that already violates SCALPEL principles | `scenarios/10-messy-codebase.md` |

If a task spans multiple scenarios (e.g. fix a bug AND remove a feature), load all relevant
scenario files before starting. Apply all rules from all loaded files simultaneously.

---

## Load at specific moments

| Moment | Checklist |
|--------|-----------|
| Before starting any task | `checklists/pre-flight.md` |
| After completing any removal | `checklists/removal-complete.md` |
| Before making any architectural decision | `checklists/architecture-confirm.md` |
| When reporting work as complete | `checklists/work-report.md` |
| When a task spans sessions (handoff to next session) | `checklists/session-handoff.md` |

---

## The single most important rule (if you read nothing else)

Never report a task as complete without running `checklists/work-report.md`.
A completion report that omits what is missing is a lie. Lies rot the codebase.
