# Removal Verification Checklist

Run this after completing any removal task, before reporting it as done.

---

## Search verification

Run each of the following searches. Every result is an incomplete removal.

- [ ] Search for the feature name (exact)
- [ ] Search for the primary component/function/class name of the removed feature
- [ ] Search for the route paths or API endpoints of the removed feature
- [ ] Search for the database table or model names of the removed feature
- [ ] Search for the config keys and environment variable names of the removed feature
- [ ] Search for any import statements that imported from deleted files

All searches must return zero relevant results before proceeding.

## Layer verification

- [ ] Entry points removed (routes, nav links, menu items)
- [ ] Handler/controller layer removed
- [ ] Service/business logic layer removed
- [ ] Data access layer removed (queries, repository functions, ORM models)
- [ ] Types, interfaces, and constants defined only for this feature removed
- [ ] Tests for this feature removed
- [ ] Shared utilities used only by this feature removed (or confirmed as shared and left)
- [ ] Environment variables used only by this feature removed from all config files
- [ ] Documentation mentions removed
- [ ] Barrel/index files updated to remove deleted exports
- [ ] Database migration created (or explicitly noted as pending)

## Broken state check

- [ ] No remaining file has an import pointing to a deleted file
- [ ] No remaining test references a deleted function or component
- [ ] No TypeScript type references a deleted type
- [ ] No route references a deleted handler

## Report

State: "Removal verification complete. Searched for: [list]. All results clear."
Or: "Removal incomplete. Found at: [list of remaining locations]. Requires: [what remains]."
