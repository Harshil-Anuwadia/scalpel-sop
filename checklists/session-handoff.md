# Session Handoff Checklist

Run this when a task cannot be completed in one session and work must continue in a future session.

The next session is amnesiac. It will have zero context from this conversation.
Everything that matters must exist in the codebase or in this document.

---

## State inventory

- [ ] What is the original task? (one sentence, exact)
- [ ] What is complete? (list files, functions, behaviors — specific, not vague)
- [ ] What is incomplete? (list exactly what remains and why this session ended here)
- [ ] What is the next concrete action the next session should take?

## Codebase state

- [ ] Is the codebase in a valid state? (no broken imports, no type errors, no failing tests)
  - If not: what is broken and why? Is it intentional (work in progress) or a mistake?
- [ ] Are there stubs, placeholders, or TODO markers the next session must find and complete?
  - If yes: list every location explicitly
- [ ] Did this session create any files not yet integrated with the rest of the codebase?
  - If yes: list them and describe what integration remains

## Assumptions made this session

List every assumption made that the next session would need in order to continue correctly:
- Assumed: [what] — because [why] — confirmed by user: [yes / no / not asked]

## What not to redo

- [ ] List any investigation or reading already done that does not need to be repeated
- [ ] List any approaches that were tried and rejected, and the reason each was rejected
  (The next session will not know these were tried and may repeat the same mistakes)

## Handoff statement

Write one paragraph that could be pasted verbatim into the next session's opening message:

"The task is [X]. As of this handoff, [Y] is fully complete. The next step is [Z].
Watch out for [any non-obvious constraint or decision made this session].
Do not [specific approach that was tried and discarded, and why]."

---

Add the handoff statement to the work report.
A session that ends without this document leaves the next session rebuilding context from scratch —
the wasted time compounds across every continuation of a long task.
