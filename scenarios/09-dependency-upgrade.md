# Scenario: Dependency Upgrade

**Trigger:** Upgrading a dependency to a new version, or migrating from one library to another
serving the same purpose. This is one of the highest blast-radius tasks an agent can perform.

---

## Before starting: classify the upgrade

State the classification before touching anything.

**Patch upgrade** (1.2.3 → 1.2.4): bug fixes only, no API changes expected.
Standard modify-existing rules apply. Low risk.

**Minor upgrade** (1.2.x → 1.3.0): new features, backward-compatible API changes.
Load this scenario. Medium risk.

**Major upgrade** (1.x → 2.0): breaking API changes expected.
Load this scenario. High risk. Require explicit user confirmation before starting.

**Library migration** (library A → library B): maximum blast radius.
Load this scenario. Very high risk. Present a plan and require explicit confirmation before starting.

---

## Pre-flight (run before any changes)

1. Read `checklists/pre-flight.md`
2. Find and read the official changelog or migration guide for every version between current and target
3. Search the entire codebase and list every file that imports from or uses the library
4. Document exactly which API surface is being used: which functions, which options, which patterns
5. For major upgrades or migrations: present a migration plan to the user before executing any changes

---

## Rules specific to this scenario

**DU01 — Read the migration guide before touching anything**
Do not assume what changed based on training data. The target version may postdate your training
cutoff. If no migration guide exists, state that explicitly before proceeding.

**DU02 — Map every usage before changing any usage**
Search the entire codebase. List every location where the dependency is used.
Update all usages in the same operation. A codebase that uses both the old and new API is broken.

**DU03 — One dependency at a time**
Do not upgrade multiple dependencies in the same operation.
Complete and verify one before starting the next.
Combined upgrades make regressions impossible to attribute.

**DU04 — No functionality changes alongside upgrades**
Do not change behavior while upgrading. Do not refactor. Do not add features.
The diff should say: "the API calls changed in these specific ways due to the version change. Nothing else."

**DU05 — Existing tests are the verification mechanism**
After completing the upgrade, the existing test suite must pass.
If tests fail: identify whether the failure is expected from the API change (fix it)
or an unexpected regression (report it before proceeding).
Do not report the upgrade complete if tests are failing.

**DU06 — Library migration requires a confirmed plan**
A plan must be presented and confirmed before execution:
1. Every file that will change
2. The mapping from old API to new API
3. Any behaviors with no direct equivalent in the new library
4. Order of operations
5. How to verify the migration is complete

Do not begin without a confirmed plan.

**DU07 — Never leave old and new in use simultaneously**
A migration that leaves the codebase using both the old and new library is not complete.
Either finish the migration or do not start it.
If a full migration cannot be completed in one session: define a clear stopping point at a module
boundary, complete up to that boundary, and report exactly what is migrated and what remains.

---

## Completion checklist

- [ ] All usages of the upgraded dependency identified before starting
- [ ] All usages updated — none left at old API
- [ ] No functionality changes bundled into the upgrade
- [ ] Test suite passes
- [ ] No other dependencies changed in the same operation
- [ ] If library migration: old library removed from package.json
- [ ] Run `checklists/work-report.md` before stating complete
