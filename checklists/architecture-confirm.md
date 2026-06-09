# Architecture Confirmation Checklist

Run this before making any decision that creates structural commitments in the codebase.
An architectural decision is one where changing it later requires touching many files.

---

## Decision identification

State the decision clearly:
"I am about to decide: [specific architectural choice, e.g. 'use JWT stored in httpOnly cookies
for auth', 'use Zustand for this feature's state', 'add a Redis layer for caching']."

---

## Impact assessment

- [ ] How many files will be built assuming this decision?
- [ ] How hard is this to reverse if the decision is wrong?
  - Easy to reverse (< 5 files affected): proceed with stated assumption
  - Hard to reverse (5–20 files): confirm with user before proceeding
  - Very hard to reverse (> 20 files or touches external systems): require explicit confirmation
- [ ] Does this decision conflict with any existing architectural choice in the codebase?
- [ ] Does this decision introduce a new dependency?

## Existing pattern check

- [ ] Does the codebase already solve a similar problem with a specific approach?
- [ ] If yes: can the existing approach serve this use case?
- [ ] If no: am I introducing a new pattern that will coexist with the existing one?
  - If yes: this is a problem. Raise it with the user before proceeding.

## Confirmation format

"I'm going to [decision] because [reason]. This will affect [files/scope].
If this is not what you want, tell me. Otherwise I'll proceed."

Wait for confirmation before building on the decision.
If the decision is low-risk (< 5 files, easily reversed), proceed after stating the assumption.
If the decision is high-risk: wait for explicit confirmation, not silence.
