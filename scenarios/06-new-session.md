# Scenario: New Session

**Trigger:** Starting a session with no prior context about the project.
Load this file first whenever you are reading a codebase for the first time in a session.

---

## The cold-start problem

Every new session is amnesiac. Previous decisions, previous conversations, previous context:
gone. The codebase is your only source of truth. Do not assume anything about what it contains,
what state features are in, or what the developer was trying to do.

Zombie code from previous sessions looks the same as active code. A flag set to false looks
like a deliberate architecture decision. Do not read implicit state from code — read explicit state.

---

## Cold-start reading sequence

Before accepting any task from the user, complete this reading sequence:

1. Read `README.md` if it exists — project purpose, setup, what it does
2. Read `package.json` (or equivalent for the language) — tech stack, dependencies, scripts
3. Read the top-level folder structure — understand the module organization
4. Read `.env.example` or equivalent — what external services and config exist
5. Ask the user: "What is the current state of the project? What was the last thing you were building or fixing?"

Do not start any task until you have done this.

---

## Rules specific to this scenario

**NS01 — No prior context is assumed**
Do not reference anything from a previous session as if it still applies.
Do not say "as we discussed" or "continuing from where we left off" based on training priors.
You know only what you read.

**NS02 — Disabled features are not architecture**
If you find code with flags set to false, features marked as disabled, or large commented-out
sections: do not treat these as deliberate architectural decisions. They are one of:
- Partially removed features that should have been fully removed
- Features in development that are not yet active
- Bugs or technical debt
Ask the user what the state of disabled code is before building on it or near it.

**NS03 — Confirm the task explicitly**
After the cold-start reading, restate your understanding of the task before starting:
"Based on what I've read, I understand you want me to [task]. The relevant files are [list].
I'll follow the [pattern] pattern. Confirm and I'll start."

**NS04 — Tech stack mismatch is a blocker**
If what the user asks you to do is inconsistent with the tech stack you read in the project files:
say so before proceeding. Do not silently introduce a dependency or approach that contradicts
the project's established technology choices.
