# Scenario: Debug / Fix

**Trigger:** Finding and fixing a specific bug or broken behavior.

---

## Pre-flight (run before writing any code)

1. Read `checklists/pre-flight.md`
2. Read the file where the bug manifests
3. Read the stack trace or error message completely before forming a hypothesis
4. Read the files involved in the call chain leading to the bug

---

## Rules specific to this scenario

**DB01 — Find the cause, not the symptom**
Do not patch the symptom. Find the root cause.
A null pointer error is not fixed by adding a null check at the surface — it is fixed by
finding where the null originates and either preventing it or handling it at the right level.
State the root cause in your work report before writing the fix.

**DB02 — Smallest fix that addresses the root cause**
Once the root cause is identified, write the smallest change that correctly fixes it.
Do not refactor the surrounding code. Do not add logging infrastructure.
Do not generalize the fix into a "more robust solution." Fix the bug.

**DB03 — Verify the fix does not create a regression**
Before reporting the fix as done:
identify every other code path that uses the same function, module, or logic you changed.
Verify the fix does not change their behavior.

**DB04 — Do not fix bugs that were not reported**
If you find other bugs while investigating: list them in your report, do not fix them.
Each bug fix is a separate task, a separate decision, a separate review.
Bundling multiple fixes makes the diff impossible to review and the blame history meaningless.

**DB05 — State the root cause clearly**
In your report: state what the bug was, what caused it, what you changed, and what the fix does.
Do not just show the diff. The explanation is part of the fix.

---

## Completion checklist

- [ ] Root cause identified and stated, not just symptom patched
- [ ] Smallest change that addresses root cause
- [ ] No code touched outside the bug's scope
- [ ] No other bugs accidentally fixed or broken in the same change
- [ ] Run `checklists/work-report.md` before stating done
