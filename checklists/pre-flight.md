# Pre-Flight Checklist

Run this before starting any task.

---

## Project orientation (skip if already done in this session)

- [ ] Have I read the folder structure and understand where things live?
- [ ] Have I read `package.json` and know the tech stack?
- [ ] Do I know the naming convention for files, functions, and variables in this project?
- [ ] Do I know the pattern for the type of task I'm doing (e.g. if adding an API route,
      have I read an existing API route in this codebase)?

## Scope verification

- [ ] Can I state in one sentence exactly what I was asked to do?
- [ ] Do I know which files I will need to create or modify?
- [ ] Is there anything in this task that requires an architectural decision?
  - If yes: load `checklists/architecture-confirm.md` before proceeding
- [ ] Does this task involve removing any code?
  - If yes: load `scenarios/03-remove-feature.md` before proceeding

## Existence check

- [ ] For any file I plan to create: does it already exist?
- [ ] For any function I plan to write: does something equivalent already exist?
- [ ] For any dependency I plan to add: is it already in `package.json`?

## Ambiguity check

- [ ] Is the instruction clear enough to execute without guessing?
  - If no: load `scenarios/07-ambiguous.md` and resolve before proceeding

## Ready signal

Only begin work when every applicable item above is checked.
State: "Pre-flight complete. Proceeding with: [one sentence task statement]."
