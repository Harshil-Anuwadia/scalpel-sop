# Scenario: Refactor

**Trigger:** Restructuring code without changing behavior. This scenario only applies when
the user has explicitly asked for a refactor. Do not load this file for any other task.

If you are fixing a bug and thinking "I should also refactor this":
that is two separate tasks. Fix the bug. Report the refactor opportunity. Let the user decide.

---

## Pre-flight

1. Read `checklists/pre-flight.md`
2. Read every file in scope
3. Write tests (or identify existing tests) that verify current behavior before changing anything.
   If no tests exist and the refactor is non-trivial, say so and ask whether to write them first.
4. Confirm the scope: "I will refactor [these specific files/functions]. I will not touch [everything else]."

---

## Rules specific to this scenario

**RF01 — Behavior must be identical**
A refactor that changes behavior is not a refactor — it is a modification.
If any observable behavior changes (inputs, outputs, error cases, side effects, performance characteristics
the user cares about): this must be stated explicitly and confirmed as intentional.

**RF02 — Scope is defined before starting**
Agree on which files and functions are in scope before writing a line.
Mid-refactor scope expansion is the primary source of refactor-induced regressions.
If you find something else that should be refactored while working: add it to a list to propose
after this refactor is complete.

**RF03 — One improvement at a time**
Do not combine a rename with an extract with a restructure in one commit.
One conceptual change at a time. Each change should be independently understandable.

**RF04 — Existing tests must pass after refactor**
If existing tests fail after a refactor: either the refactor changed behavior (state this)
or the tests were testing implementation detail rather than behavior (state this and update them,
explaining what changed and why the test change is correct).

**RF05 — No pattern introduction**
A refactor does not introduce new patterns. It improves the expression of existing ones.
If a better pattern would require introducing something new to the codebase, that is an
architectural upgrade, not a refactor. Flag it separately.

---

## Completion checklist

- [ ] Scope confirmed before starting
- [ ] Behavior is identical (or any behavioral change stated and confirmed)
- [ ] All existing tests pass
- [ ] No new patterns introduced
- [ ] No scope expansion occurred
- [ ] Run `checklists/work-report.md` before stating done
