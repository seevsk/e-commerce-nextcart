---
name: workflow
description: General development workflow with clear explanations, implementation blocks, and explicit commit authorization.
---

# Workflow

Define a clear and repeatable workflow for coding tasks.

## Standard Workflow - non-trivial code blocks

### Step 1 - Macro explanation

Before writing code, explain in 2-4 lines what the block does at a high level.
Include the problem being solved and which files will be touched.

### Step 2 - Generate the code

Write code using the conventions of the current repository.
Keep implementation consistent, readable, and maintainable.

### Step 3 - Block-by-block explanation

After writing code, explain each relevant method or significant block:
- What it does
- Why it was implemented that way
- Key technical decisions and tradeoffs

### Step 4 - Propose commits with Spanish translation

Always propose commit messages before asking for authorization:

```text
feat(scope): description in English
```

*Espanol: traduccion en espanol*

Use one commit per logical change. Do not bundle unrelated files.

### Step 5 - Wait for authorization

Never commit without explicit user authorization.
Only commit when the user confirms clearly (for example: "autorizo", "si", or equivalent).

## Simplified Workflow - simple tasks

When the user asks for a quick change (for example: "commitea directo", "hazlo rapido", "es un cambio pequeno", or "solo dime el nombre del commit"):
- Make the requested change
- Propose commit name and Spanish translation
- Wait for explicit authorization before committing

## Branch publish shortcut - push-branch

When the user says `push-branch` (or Spanish variants like "haz push-branch" / "hazme push-branch"), execute only this safe flow:
- Detect current branch dynamically
- If current branch is `main`, stop and warn the user to create or switch to a feature branch first
- Push the current branch to remote (set upstream when needed)
- Switch to `main`
- Pull latest changes from `origin/main`

Execution notes:
- Do not merge into `main` in this shortcut
- Do not delete branches in this shortcut
- Do not force-push
- Return a short status summary and the branch name that was published

## Always remember

- Respond in Spanish
- Keep code and code comments in English
- Never run `git commit` without explicit authorization
