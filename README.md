# SCALPEL: Standard Operating Procedure (SOP) Framework

Scalpel is a set of strict rules and workflows for AI coding agents. It gives them a Standard Operating Procedure (SOP) to follow so they modify your codebase safely, predictably, and without leaving a mess behind.

## What is this?

When you tell an AI agent to "fix a bug" or "remove a feature," it usually just starts writing code. It might guess how your app works based on file names, or it might try to be "helpful" by refactoring code you didn't ask it to touch. 

Scalpel stops that behavior. It is a collection of markdown files that act as an instruction manual for the AI. Before the AI is allowed to write any code, it has to read the Scalpel rules. These rules force the agent to act like a disciplined senior engineer: reading files before changing them, confirming assumptions, and sticking exactly to the scope of the task you gave it.

## Why use it?

If you've used AI agents to write code, you've probably run into these headaches:
- **Zombie Code:** You ask the agent to delete a feature, but it leaves behind unused imports, database models, and broken tests.
- **Unwanted Refactoring:** The agent decides to rewrite your authentication logic while it was supposed to be fixing a CSS bug.
- **Hallucinations:** The agent assumes you use a specific library because it's popular, without actually checking your `package.json`.
- **Silent Failures:** The agent says "Task complete!" but actually skipped the hard parts or didn't write any tests.

Scalpel fixes these issues by enforcing a strict "Read-First" policy, mandating exact scope, and forcing the agent to tell you exactly what it did and didn't do.

## What's inside?

Scalpel is built on four main pieces:

1. **Core Rules (`CORE.md`):** 16 non-negotiable rules the agent must always follow. For example, Rule 1 is "Read before write." 
2. **Scenarios (`scenarios/`):** Specific workflows for different jobs. Removing a feature has a different set of steps than fixing a bug or adding a new dependency.
3. **Checklists (`checklists/`):** Mandatory gates the agent must pass. It has to run a "Pre-flight" check before starting and a "Work Report" check before finishing.
4. **Operating Modes:** You can run Scalpel in `INTERACTIVE` mode (it asks you for permission before making structural changes) or `AUTONOMOUS` mode (it just gets the job done based on the rules, asking fewer questions).

## How it changes the agent

| Scenario | Without Scalpel | With Scalpel |
| :--- | :--- | :--- |
| **Reading Code** | Guesses what's in a file based on its name. | Reads the actual file and its dependencies before doing anything. |
| **Deleting Code** | Deletes the main file, leaves broken imports everywhere. | Systematically removes the feature, its tests, types, and cleans up all imports. |
| **Scope** | Expands the scope to fix "messy" adjacent code. | Touches only what you explicitly asked for. |
| **Reporting** | "Done! Everything works." | "Here is what I built. Here are the tests I skipped. Here are the edge cases I didn't handle." |
| **Emergencies** | Refuses to break best practices even when you're in a hurry. | Allows you to explicitly override rules using an `OVERRIDE` command. |

## How to use it

1. **Get the files:** 
   - **For Claude Projects:** [Download the `scalpel-sop.zip` file](https://github.com/Harshil-Anuwadia/scalpel-sop/raw/main/scalpel-sop.zip) and upload it to your project knowledge base.
   - **For CLI/Local Agents:** Clone this repository into your project or your agent's skills directory.
   ```bash
   git clone https://github.com/Harshil-Anuwadia/scalpel-sop.git
   ```

2. **Tell the agent to use it:** When you start a session with your AI agent, just point it to the Scalpel initialization file.
   *Example Prompt:* "Initialize the Scalpel SOP by reading `SKILL.md`. Then, follow the workflow to remove the old billing module. Proceed autonomously."

## How the workflow actually runs

When you give the agent a task under Scalpel, here is what it does behind the scenes:

1. **Initialization:** It loads `SKILL.md`, `CORE.md`, and `ANTI-PATTERNS.md` to learn the rules of the road.
2. **Pre-Flight:** It runs through a checklist (`checklists/pre-flight.md`) to make sure it understands your request and knows where to look in the codebase.
3. **Routing:** It figures out what kind of task you gave it (e.g., bug fix, new feature) and loads the specific instructions for that job from the `scenarios/` folder.
4. **Execution:** It does the work, following the core rules (like not extracting code into reusable utilities until it sees the same pattern three times).
5. **Completion:** It runs the final `work-report.md` checklist to give you an honest breakdown of what it finished and what it left undone.
