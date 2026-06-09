# Scenario: Write Tests

**Trigger:** Writing tests for existing code that has no tests, or significantly expanding
test coverage for a specific module. This scenario applies when testing is the primary task —
not a byproduct of building a feature.

---

## Pre-flight (run before writing any tests)

1. Read `checklists/pre-flight.md`
2. Read every file you will write tests for — completely
3. Identify the testing framework and assertion style already in use
4. Read at least two existing test files to understand structure, naming, and patterns
5. Understand what behavior currently exists — tests describe current behavior, not intended behavior

---

## Rules specific to this scenario

**WT01 — Test behavior, not implementation**
Tests must verify what a function does, not how it does it.
A test that breaks when you rename an internal variable is testing implementation.
A test that breaks when the output changes is testing behavior.
Tests coupled to implementation become obstacles to future refactoring.

**WT02 — No test is better than a wrong test**
A test that always passes regardless of behavior gives false confidence and is worse than nothing.
Before writing any test, state: what specific behavior does this verify, and what would make it fail.
If you cannot state both clearly, do not write the test.

**WT03 — Each test is independent**
No test depends on execution order.
No test depends on state left by another test.
No test shares mutable state with any other test.
Tests that pass in isolation but fail in a suite indicate hidden shared state — find and eliminate it.

**WT04 — Map coverage before writing**
Before writing any test:
1. List every public function and behavior in scope
2. For each: identify the primary happy path, primary error case, and notable edge cases
3. State which you will cover and which you will not, and why

Do not start writing until this map exists.

**WT05 — Do not change the code under test**
If the code being tested is buggy or poorly structured: note it, do not fix it.
Changing code and writing tests in the same operation makes it impossible to verify
the tests reflect what existed before. If a bug makes testing impossible, report it and ask
for instruction before proceeding.

**WT06 — Test names must describe the scenario completely**
Test names are sentences:
- `returns null when userId is missing`
- `throws AuthError when token is expired`
- `sends email notification after order is confirmed`

Not: `test1`, `should work`, `handles error`, `userTest`.

**WT07 — Mock at the boundary, not inside it**
Mock at your module's edges: the external services and system calls your module makes.
Do not mock internal implementations within the module under test.
Mocking what you own tests the mock, not the code.

---

## Completion checklist

- [ ] Coverage map created — every behavior in scope listed with coverage status
- [ ] No test is coupled to implementation details
- [ ] Every test is independent — no shared mutable state
- [ ] Test names describe scenarios completely
- [ ] Primary behavior and primary error case covered for each function in scope
- [ ] No code under test was modified
- [ ] Existing tests still pass
- [ ] Run `checklists/work-report.md` before stating complete
