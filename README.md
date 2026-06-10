# STANDARD OPERATING PROCEDURE: SCALPEL Framework

## 1. PURPOSE
SCALPEL is a mandatory Standard Operating Procedure (SOP) for autonomous codebase agents. It defines strict execution constraints, pre-flight verification gates, and reporting requirements to prevent unauthorized codebase mutation.

## 2. APPLICABILITY
This SOP is mandatory for all AI agents performing read, write, or refactor operations within an application codebase. It must be initialized prior to processing any codebase directive.

## 3. REQUIRED WORKFLOW

**Phase 1: Initialization**
1. Load `SKILL.md` (Routing).
2. Load `CORE.md` (Non-negotiable global rules).
3. Load `ANTI-PATTERNS.md` (Forbidden behaviors).

**Phase 2: Pre-Flight Gate**
1. Run `checklists/pre-flight.md`.
2. Do not proceed until scope, existence, and ambiguity checks are verified.

**Phase 3: Task Routing**
Load the specific operational parameters based on the directive:
- Feature Addition: `scenarios/01-new-feature.md`
- Code Modification: `scenarios/02-modify-existing.md`
- Deletion/Removal: `scenarios/03-remove-feature.md`
- Bug Fix: `scenarios/04-debug-fix.md`
- Refactoring: `scenarios/05-refactor.md`
- Blank Session: `scenarios/06-new-session.md`
- Ambiguity Resolution: `scenarios/07-ambiguous.md`
- Test Implementation: `scenarios/08-write-tests.md`
- Dependency Update: `scenarios/09-dependency-upgrade.md`
- Debt Mitigation: `scenarios/10-messy-codebase.md`

**Phase 4: Execution Gates**
Apply secondary checklists at defined operational moments:
- Before structural changes: `checklists/architecture-confirm.md`
- After code removal: `checklists/removal-complete.md`
- Across session boundaries: `checklists/session-handoff.md`

**Phase 5: Completion Gate**
1. Run `checklists/work-report.md`.
2. A task is not complete until the report explicitly states what was built, what was omitted, and what remains untested.

## 4. DEPLOYMENT
Clone the framework into the agent's authorized skills or instructions directory:
```bash
git clone <repository-url> ~/.agents/skills/scalpel
```
Register the skill within the agent platform to enforce global initialization.
