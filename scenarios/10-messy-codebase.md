# Scenario: Messy Codebase

**Trigger:** Load this scenario when the codebase already violates SCALPEL principles —
zombie code, competing patterns, inconsistent naming, dead imports, duplicate utilities,
partially removed features.

This scenario resolves the direct conflict between R06 (match existing patterns) and working
in a codebase where existing patterns are bad.

---

## The core tension

R06 says match existing patterns. If existing patterns are bad — mixed state management,
inconsistent naming, zombie flags, duplicate utilities — matching them propagates the damage.

The resolution: **you do not fix what you were not asked to fix, but you do not replicate damage.**

---

## Rules specific to this scenario

**MC01 — Identify, do not fix**
When you discover a pattern violation, zombie code, duplicate utility, or dead import
while working on your assigned task: document it in your work report, do not fix it.
Each cleanup item is a separate task requiring a separate decision.
Fixing while you work expands scope and adds risk to a codebase already under stress.

**MC02 — Match the best existing pattern, not the most common one**
If two patterns exist for the same concern (e.g., both Zustand and Redux are in use):
identify which is more recent, more consistently applied, or was clearly intended to replace
the other. Match that one. State your reasoning explicitly.
Do not introduce a third. Do not pick the familiar one over the correct one.

**MC03 — Do not build on zombie code**
If code is disabled, flagged off, commented out, or partially removed: do not reference it,
import from it, or extend it. Treat it as if it does not exist for the purposes of your task.
Document it in your work report as requiring cleanup.

**MC04 — Your code does not inherit the mess (Style vs. Scope Tension)**
New code you write follows SCALPEL principles regardless of what surrounds it.
You write complete, named, tested, pattern-consistent code even inside a messy file.
You do not write bad code "to match the style." 
*Resolution Note:* This applies ONLY to the lines you are actively adding or modifying. Per `ME04`, do NOT "clean up" the adjacent messy lines in the file to match your new clean lines. The line is: write clean code where you touch, leave the rest of the file alone for a separate task.

**MC05 — Report technical debt explicitly**
Your work report must include a section on what you found but did not touch.
Format: "Found but left untouched: [list]. Each requires a separate cleanup task."
This gives the developer visibility without expanding your scope.

**MC06 — Conflicting conventions require a stated choice**
If two incompatible conventions exist for the same thing: do not silently pick one.
State: "I found [convention A] and [convention B] in use for [concern].
For this task I will use [A] because [reason]. The inconsistency should be resolved separately."

---

## Completion checklist

- [ ] I matched the best existing pattern, not just the most common
- [ ] I did not build on any zombie or disabled code
- [ ] My new code follows SCALPEL principles regardless of surrounding quality
- [ ] All discovered technical debt is listed in my work report, not silently fixed
- [ ] Any convention conflict was stated and a choice made explicitly
- [ ] Run `checklists/work-report.md` before stating complete
