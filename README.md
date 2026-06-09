# SCALPEL - Operating Discipline for Codebase Agents

SCALPEL is a set of rules and checklists designed for AI coding agents. It prevents common problems in agentic development, such as unused code, unnecessary changes, unconfirmed assumptions, and split patterns.

## Repository Structure

The framework is organized into specific files to minimize context usage:

*   README.md - Project introduction and setup guide.
*   SKILL.md - Main entry point and routing table.
*   CORE.md - 16 rules active on all tasks.
*   PRINCIPLES.md - Software engineering philosophy behind the rules.
*   ANTI-PATTERNS.md - 30 prohibited behaviors with corresponding fixes.
*   scenarios/ - Task-specific instructions loaded based on the type of work:
    *   01-new-feature.md - Adding new features.
    *   02-modify-existing.md - Modifying existing code.
    *   03-remove-feature.md - Deleting features completely.
    *   04-debug-fix.md - Debugging and fixing bugs.
    *   05-refactor.md - Restructuring code without changing behavior.
    *   06-new-session.md - Starting a session without prior context.
    *   07-ambiguous.md - Resolving unclear instructions.
    *   08-write-tests.md - Writing tests for untested code.
    *   09-dependency-upgrade.md - Upgrading packages and libraries.
    *   10-messy-codebase.md - Operating in inconsistent environments.
*   checklists/ - Process templates for specific task phases:
    *   pre-flight.md - Loaded before starting a task.
    *   removal-complete.md - Loaded after completing a deletion.
    *   architecture-confirm.md - Loaded before making structural choices.
    *   work-report.md - Completion report template.
    *   session-handoff.md - Handoff checklist for multi-session tasks.

## Setup

1. Copy or clone this folder into the agent skills directory of your project or system:
   ```bash
   git clone <repository-url> ~/.agents/skills/scalpel
   ```
2. The platform will automatically register the skill.

## Usage

Agents using this skill must follow these steps:

1. Run checklists/pre-flight.md before writing any code.
2. Load the relevant scenario files from the scenarios/ directory based on the task description.
3. Perform the work while avoiding any unrelated changes.
4. Run checklists/work-report.md upon completion, detailing what was implemented and what remains untested.
