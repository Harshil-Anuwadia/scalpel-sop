# Scenario: Modify Existing Code

**Trigger:** Changing, extending, or updating code that already exists and works.

---

## Pre-flight (run before writing any code)

1. Read `checklists/pre-flight.md`
2. Read the file being modified — completely, not just the section you will change
3. Read every file that imports from the file being modified
4. Read every file the modified file imports from that is relevant to the change
5. Identify every location where the function, component, or value being changed is used
6. If the change modifies a public interface: read `checklists/architecture-confirm.md`

---

## Rules specific to this scenario

**ME01 — Map before modifying**
Before changing anything, list: which files will change, which lines will change, and why.
This is not a formality — it forces you to have read everything relevant before writing anything.

**ME02 — Blast radius assessment**
If you are changing something used by more than three other files: stop.
State what you are changing and list every consumer. Confirm with the user that this scope is intended
before making the change. Surprises in shared code are disproportionately costly.

**ME03 — Behavior preservation unless stated otherwise**
Unless the modification explicitly changes behavior, the external behavior of the modified code
must be identical after the change. Same inputs, same outputs. Same error cases, same side effects.
If the modification changes behavior, state exactly what changed and confirm this is intended.

**ME04 — Keep the surrounding code untouched (Scope vs. Style Tension)**
Do not reformat. Do not rename variables. Do not adjust whitespace. Do not change comment style.
Do not reorganize imports. Touch only what the task requires. 
*Resolution Note:* If the file is extremely messy and lacks types/formatting, do NOT rewrite the adjacent messy lines to match your clean code. Write your new code cleanly (per MC04), but leave the surrounding messy lines exactly as they were. The diff should strictly reflect the required change.

**ME05 — Update all consumers of changed interfaces**
If you change a function's signature, a component's props, a type's shape, or an exported constant's
value: you must update every file that consumes it in the same operation. A half-updated interface
is a broken codebase.

**ME06 — Update tests when changing behavior**
If the modification changes behavior, the tests for that behavior must be updated in the same task.
Do not leave tests that now test the wrong behavior. Do not leave tests that now fail.

---

## Completion checklist (run before reporting done)

- [ ] I read the file being modified completely before changing it
- [ ] I identified every consumer of the changed code
- [ ] I updated every consumer if the interface changed
- [ ] I did not touch any code outside the modification scope
- [ ] Tests reflect the current behavior
- [ ] No new patterns were introduced
- [ ] Run `checklists/work-report.md` before stating complete
