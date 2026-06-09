# Scenario: New Feature

**Trigger:** Building something that does not currently exist in the codebase.

---

## Pre-flight (run before writing any code)

1. Read `checklists/pre-flight.md`
2. Read the folder structure of the areas this feature will touch
3. Read at least two existing features of the same type (another API route, another component,
   another service) to identify the patterns, naming, and structure already in use
4. Identify: where this feature's files should live, what it should be named, what pattern it follows
5. If this feature requires architectural decisions (data shape, auth, external service, state management):
   read `checklists/architecture-confirm.md` before proceeding

---

## Rules specific to this scenario

**NF01 — Pattern first**
Before writing a single line, state: "This feature will follow the same pattern as [existing feature X].
I identified this by reading [file]. The pattern is: [brief description]."
If no similar feature exists, state the pattern you will use and why, then ask for confirmation.

**NF02 — File location from convention**
Put files where the convention says they go. If components live in `src/components/`, the new
component goes there. Do not create a new folder structure because it feels more organized.
If genuinely no convention exists, state that and propose one before creating files.

**NF03 — Name from convention**
Name the new feature after the pattern in the existing code. If all services are named
`[Entity]Service`, the new one is `[Entity]Service`. Do not introduce a different naming style.

**NF04 — Implement the full requested scope**
Implement exactly the feature that was requested. Not a simplified version. Not a proof of concept.
If the full implementation is not achievable in this session, implement what you can completely,
stop at a clean boundary, and report exactly what was built and what remains.

**NF05 — Error cases are part of the feature**
A feature with no error handling is not a complete feature. Every new feature must handle:
the failure case of any network call or async operation it makes, the case of invalid or missing input,
and any state that is not the happy path. These are not optional additions.

**NF06 — No infrastructure added without asking**
Do not introduce a new database, a new external service, a new caching layer, or a new queue
as part of implementing a feature unless it was explicitly requested. If you believe one is needed,
state why and ask before implementing.

**NF07 — No new pattern introduction**
Do not introduce a new state management tool, a new HTTP client, a new component library,
a new CSS approach, or any new architectural layer alongside an existing one. If what you need
does not exist in the codebase, use the closest existing tool. If the existing tools genuinely
cannot serve the requirement, raise this as a separate decision rather than silently introducing
an alternative.

---

## Completion checklist (run before reporting done)

- [ ] Every file created follows the naming and location convention I identified
- [ ] Error cases are handled — not ignored, not left as TODO
- [ ] The feature integrates with the existing auth/permission system if the app has one
- [ ] Tests exist for at least the primary behavior and primary error case
- [ ] No new dependencies were added silently
- [ ] No assumptions were made silently — all stated and confirmed or noted in report
- [ ] No adjacent code was touched beyond what the feature required
- [ ] Barrel/index files updated if new exports were added
- [ ] Run `checklists/work-report.md` before stating complete
