# Scenario: Remove Feature

**Trigger:** Removing a feature, component, route, service, model, or any code from the codebase.

This is the highest-risk scenario. Partial removal is worse than no removal.
A partially removed feature corrupts the codebase for every future session:
the remaining code creates false context about what the application does.

---

## Before starting: confirm scope of removal

Before writing a single command or edit, confirm with the user:

"To confirm: removing [feature name] means deleting all code, types, tests, routes,
database models, migrations, config keys, and documentation that exist only for this feature.
Nothing will be disabled or flagged — it will be gone. If that is what you mean, I will proceed.
If you want it disabled but available for later, that is a different task — tell me."

Do not proceed until this is confirmed.

---

## The complete removal sequence

Removal is not random. Follow this exact order to avoid broken states mid-removal:

**Step 1 — Discovery**
Before touching anything, map what exists:
1. Search the codebase for the feature name and every related name you know
2. List every file that will be affected
3. Present this list to the user before deleting anything

The list must include:
- Entry points (routes, navigation links, menu items)
- Handler/controller files
- Service/business logic files
- Data layer (models, queries, repository functions)
- Type and interface definitions
- Test files
- Config and environment variables
- Documentation and README mentions
- Any shared utilities used only by this feature

**Step 2 — Confirm the map**
Present the list from Step 1. Ask: "Does this look complete? Are there files I missed?"
Do not start deletion until the map is confirmed.

**Step 3 — Delete in dependency order (reverse — leafs first)**
Delete in this order to avoid broken intermediate states:

1. Entry points first (routes, nav links, menu items, CLI commands)
2. Handler/controller layer
3. Service/business logic layer
4. Data access layer (queries, repository functions)
5. Models, schemas, type definitions
6. Tests for all of the above
7. Shared utilities that were used only by this feature (check carefully)
8. Imports of removed code from all other files
9. Environment variables and config keys
10. Documentation mentions

**Step 4 — Clean orphaned imports**
After deleting files, search every remaining file for import statements that now point to
deleted code. Remove these imports. A file importing something that does not exist is broken.

**Step 5 — Search verification**
Run `checklists/removal-complete.md` — do not skip this.

---

## Rules specific to this scenario

**RM01 — No flags, no comments, no tombstones**
Setting `enabled: false` is not removal. Commenting out code is not removal.
Adding `// DEPRECATED` is not removal. Leaving a file but emptying it is not removal.
If you cannot remove code completely in this session, do not touch it and report that.

**RM02 — Removal includes all layers**
Removing the UI component is not removal of the feature.
Removing the API route is not removal of the feature.
Removal means every layer: UI, routing, logic, data, types, tests, config.
If any layer remains, the removal is not complete.

**RM03 — Database migrations are part of removal**
If the feature had its own tables, columns, or indexes: a migration to drop them is part of
the removal. Do not remove the model file and leave the schema intact. State if migration
generation is outside the scope of this session.

**RM04 — Shared code requires analysis**
Before removing a utility, helper, or function that was used by the removed feature:
verify it is not used by anything else. Search before deleting. If it is shared, do not remove it —
only remove the usage within the deleted feature's code.

**RM05 — Tests must go**
Every test written for the removed feature must be deleted. Tests that test removed behavior and
still pass (because the code was not fully removed) are dangerous — they signal false confidence.
Tests that fail because the code was removed but the test was not are broken builds.

**RM06 — No feature is "archived"**
Do not create an `_archive/` folder. Do not move removed code to a `deprecated/` folder.
Do not export it with a deprecation notice. Delete it. If it is needed later, version control
has it. Archived dead code is the same as zombie code — it creates false context.

---

## Completion checklist

Run `checklists/removal-complete.md` before reporting this as done.

---

## Report format for removal

```
## Removal: [Feature Name]

### Deleted files
[list every file deleted]

### Modified files (imports cleaned, references removed)
[list every file modified and what was removed from it]

### Database changes
[migration created / not applicable / needs manual attention]

### Config/env changes
[keys removed / not applicable]

### Search verification
Searched for: [list of search terms used]
Results: [zero / still found at: list locations]

### What remains (if anything)
[explicit statement of anything not completed and why]
```
