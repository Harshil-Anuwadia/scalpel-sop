# SCALPEL — Anti-Patterns

These 30 behaviors are forbidden in all scenarios.
Each is described with what it is, why it is harmful, and what to do instead.

---

**AP01 — Flag Removal**
What: Setting a feature flag to false or adding `enabled: false` instead of deleting the code.
Harm: Every future session reads the disabled code as an architectural state — "this feature exists but is off." Future models may reactivate it, extend it, or build parallel systems based on it. The false context compounds over sessions.
Instead: Complete removal per `scenarios/03-remove-feature.md`, or do not touch it.

---

**AP02 — Tombstone Code**
What: Commenting out code and leaving it "for reference."
Harm: Commented code is invisible to most search tools and creates the same false context problem as flag removal. It also suggests the deletion was uncertain — inviting a future session to uncomment.
Instead: Delete it. Version control is the reference.

---

**AP03 — Scope Creep**
What: Fixing, improving, or refactoring anything beyond what was asked.
Harm: Creates unexpected diffs, potential regressions in working code, and review burden. The developer loses confidence that they know what changed.
Instead: Do what was asked. List what you noticed but did not touch.

---

**AP04 — Completion Theater**
What: Reporting "Done!" or "Implemented successfully!" when significant parts are missing or untested.
Harm: The developer stops looking. Broken behavior or missing features ship.
Instead: Use `checklists/work-report.md`. State what is complete and what is not.

---

**AP05 — Silent Assumption**
What: Making an architectural, data, or design decision without surfacing it.
Harm: Every subsequent file built on the wrong assumption is technical debt. The developer does not know what decisions were made on their behalf.
Instead: State the assumption, confirm if high-stakes, proceed with stated assumption if low-stakes.

---

**AP06 — One-Layer Removal**
What: Removing the UI of a feature without removing its backend logic, routes, and tests.
Harm: The backend still exists. Routes are still live. Tests still run. The feature is not removed.
Instead: Complete removal per `scenarios/03-remove-feature.md`.

---

**AP07 — Hollow Abstraction**
What: Creating an abstract base class, interface, plugin system, or factory for a single implementation.
Harm: Future developers and models see the abstraction and assume multiple implementations exist or should exist. The abstraction adds indirection with no benefit.
Instead: Write the concrete implementation. Abstract when there are three real use cases.

---

**AP08 — Premature DRY**
What: Extracting a shared function or component the second time you see a similar pattern.
Harm: The abstraction may be premature — the two occurrences may need to diverge. The coupling created by early extraction is harder to undo than the duplication.
Instead: Note the duplication. Extract on the third occurrence.

---

**AP09 — Pattern Mixing**
What: Introducing a new state management, routing, styling, or data-fetching approach alongside an existing one because it is "better" or "more modern."
Harm: The codebase now has two competing approaches for the same concern. Every future session must decide which to use. Consistency degrades and technical debt accumulates.
Instead: Use the existing patterns and libraries in the codebase, even if they are outdated. If introducing a new pattern is absolutely necessary, do so as a separate migration task.

---

**AP10 — Swallowed Errors**
What: Wrapping code in try-catch blocks and failing silently (e.g., `catch (e) {}` or empty logs).
Harm: Hides bugs, makes failures impossible to trace, and degrades runtime predictability.
Instead: Propagate the error, return an explicit error boundary/Result type, or handle it with visible fallback states.

---

**AP11 — Blind Overwrites**
What: Replacing entire files or large chunks of code when only a small modification is needed.
Harm: Increases the chance of wiping out adjacent logic, custom comments, formatting, or configurations.
Instead: Use precise line-level or block-level edits and review changes closely.

---

**AP12 — Unchecked Dependencies**
What: Installing new packages or libraries without verifying if existing ones can solve the problem.
Harm: Bloats package size, duplicates functionality, and increases security vulnerabilities and build friction.
Instead: Search `package.json` first. Use native utilities or existing dependencies whenever possible.

---

**AP13 — Silent Architecture Changes**
What: Changing structural components, state shape, or database schemas without getting alignment.
Harm: Breaks assumptions other parts of the team or system have made, resulting in downstream bugs.
Instead: State architectural assumptions upfront and wait for confirmation.

---

**AP14 — Incomplete Diffs**
What: Changing signatures/interfaces but leaving callers or tests broken.
Harm: Breaks the build, causes type-checking errors, and halts development pipelines.
Instead: Search for all references and update them in the same operation.

---

**AP15 — Zombie Code Export**
What: Exporting unused functions, types, or modules "just in case" or archiving them in `_archive` folders.
Harm: Litters the codebase, increases index size, and confuses future sessions about what is live.
Instead: Delete the code. Git keeps the history.

---

**AP16 — Placeholders and TODOs**
What: Leaving mock data, dummy text, or `// TODO` comments in production-targeted code.
Harm: Codebase accumulates incomplete states, leading to broken flows in production and confusion.
Instead: Implement the feature fully including edge cases and errors, or flag the missing scope in the work report.

---

**AP17 — Unrequested Refactoring**
What: Reformatting, styling, or restructuring code adjacent to the task.
Harm: Distorts git blame history and makes code review diffs hard to parse.
Instead: Limit modifications to the minimal necessary scope.

---

**AP18 — Assumption Guessing**
What: Proceeding with a critical ambiguous instruction without raising it.
Harm: Wastes time building the wrong thing, which must later be reverted or redone.
Instead: Use `scenarios/07-ambiguous.md`, state the interpretation, and ask for confirmation.

---

**AP19 — Hardcoded Configuration**
What: Inlining API keys, secrets, or environment-specific values directly in source files.
Harm: Security risk, credentials leak in git, and prevents deployment to staging/production.
Instead: Use `.env` files or config files that load environment variables.

---

**AP20 — Ignored Edge Cases**
What: Implementing only the happy path of a feature and ignoring empty states, network errors, or invalid inputs.
Harm: App crashes or degrades gracefully under unexpected user inputs or bad network conditions.
Instead: Explicitly code fallback UI, input validation, and async error boundaries.

---

**AP21 — Test Bypassing**
What: Deleting tests or modifying assertions solely to make a broken build pass.
Harm: Destroys the test suite's utility and hides structural regressions.
Instead: Debug the failure to find if the implementation is wrong or if the test was validating implementation details.

---

**AP22 — Missing Index Updates**
What: Creating new files but failing to export them from barrel files (`index.ts` / `index.js`).
Harm: Breaks project import conventions and causes compilation failures in consumer modules.
Instead: Identify the project's export pattern and update the entry-point index files.

---

**AP23 — Ad-hoc Utility Creation**
What: Writing custom date formatters, fetch wrappers, or validation helpers when equivalent utilities already exist.
Harm: Fragmented utility set, duplicate implementations, and inconsistent results.
Instead: Search the codebase for existing helpers and read import targets before writing new ones.

---

**AP24 — Outdated Documentation**
What: Modifying API behavior, endpoints, or setup requirements without updating the README or docs.
Harm: First-time setup fails, and developers rely on wrong manuals.
Instead: Treat docs as part of the implementation and update them in the same commit.

---

**AP25 — Rule Rationalization**
What: Deciding that rules don't apply because "it's too small a change" or "there is no time".
Harm: Allows small exceptions to accumulate, causing codebase rot and agent decay.
Instead: Follow the operating discipline unconditionally. Friction is the rule working.

---

**AP26 — Test Theater**
What: Writing tests that assert trivially true things, test only the happy path, or are so
tightly coupled to the implementation that they pass regardless of whether the feature
actually works. Example: mocking all dependencies away and asserting the mock was called.
Testing that a component renders without throwing rather than what it renders.
Harm: The test suite passes. Coverage numbers look acceptable. The feature is broken on any
non-happy-path input and the tests will not catch it. Future sessions see green tests and
assume correctness they cannot verify.
Instead: Before writing any test, state what specific behavior it verifies and what would
make it fail. If the answer to "what would break this test" involves no realistic input,
rewrite the test.

---

**AP27 — Type Evasion**
What: Using `any`, `as unknown as X`, `// @ts-ignore`, or `// @ts-expect-error` to silence
type errors rather than resolving the underlying type mismatch.
Harm: The type system is the codebase's first verification layer. Evading it trades a compile-time
error for a runtime error. The next session inherits `any` types as if they were intentional
design decisions and builds further on them. The type debt compounds.
Instead: Find the type mismatch and fix it. If the types are wrong, fix the types.
If an external library's types are incorrect, use module augmentation or declaration merging.
If a `@ts-ignore` is genuinely temporary, add a comment stating exactly what must happen before
it is removed. Never leave type suppressions without a stated reason and resolution path.
(Applies equally to Python `Any`, Java `@SuppressWarnings`, and equivalent in other typed languages.)

---

**AP28 — Content-Free Comments**
What: Writing comments that describe what the code does rather than why it does it.
Examples: `// increment counter`, `// return user`, `// check if null`, `// loop through items`.
Harm: These comments restate what is already visible from reading the code.
They create noise the next reader must parse alongside the implementation.
When the code changes and the comment is not updated, they actively mislead.
A future session may preserve the wrong comment and propagate the misunderstanding.
Instead: Comment only when the why is not obvious from the code itself.
`// Using eventEmitter here because the socket callback fires before state is hydrated` is valuable.
`// emit event` is not. If code requires a comment to be understood, the first fix
is a better name — not a comment explaining the bad name.

---

**AP29 — Conversation-Driven Development**
What: Making code decisions based on what was said in the current conversation rather than
what exists in the codebase. Building on "you mentioned earlier" or "as we discussed"
instead of reading the actual files.
Harm: Conversations are not code. What was discussed may not have been implemented.
What was implemented may differ from what was described. What was implemented in a prior session
may have been changed since. The codebase is the truth; the conversation is not.
Decisions built on conversational context that was never verified produce assumptions
that are invisible to the next session, which has no access to the conversation at all.
Instead: Before acting on any claim about the codebase state — even from the current
conversation — verify it by reading the relevant files. State when you are acting on
conversational context that you have not yet verified in code.

---

**AP30 — Migration Half-Stop**
What: Starting a dependency upgrade or library migration and stopping in the middle, leaving
the codebase using both the old and new version simultaneously throughout.
Examples: Half the components use the old state library, half use the new.
Some routes use the old HTTP client, some use the new.
Harm: The codebase is now harder to understand than before the migration began.
Every future session must understand both systems and determine which files use which.
The coexistence creates a permanent split that almost never gets resolved — both versions
accumulate usage as future agents default to whichever they encounter first.
Instead: Either complete the migration fully in one operation, or do not start it.
If a full migration cannot be completed in one session: define a stopping point at a clean
module boundary. Complete up to that boundary fully. Report exactly what is migrated and
what remains, and what the next session must do to continue.
Never leave old and new mixed throughout the same module.
