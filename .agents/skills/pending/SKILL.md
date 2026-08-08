---
name: pending
description: Track pending technical notes and implementation decisions for this project.
---

# Pending Notes

Store reminders and deferred decisions that should be reused in future sessions.

## Spring Boot: split MVC and REST with separate URLs

- In a single Spring Boot project, HTML routes and JSON routes are separated with two controller types.
- Use `@Controller` + Thymeleaf for views (example: `/ems/admin/parties/list`).
- Use `@RestController` for JSON API endpoints (example: `/ems/api/parties`).
- The global prefix comes from `server.servlet.context-path=/ems` in `application.properties`.

## Suggested implementation for this project

1. Keep admin panel routes in MVC (`/admin/...`) with Thymeleaf.
2. Create parallel endpoints under `/api/...` for Postman practice.
3. Use DTOs in the API to avoid exposing entities directly.
4. Standardize HTTP responses (`200`, `201`, `400`, `404`).
5. Reuse the same service layer for both MVC and REST controllers.

## Resume Note

Build an exact map of current project endpoints and propose which ones to duplicate under `/api` without breaking the existing MVC flow.

## Auth hardening pending for voter activation and recovery

- Current state: the voter activation and password recovery flows are usable from the browser, but their strongest validation layer still lives in the frontend through Alpine-driven checks.
- Important distinction: the UI currently blocks many invalid interactions, but the backend still needs hardening against manual requests sent from Postman, browser DevTools, or any client that bypasses frontend validation.
- `ActivationController` and `PasswordRecoveryController` currently bind DTOs with `@ModelAttribute`, but they do not use `@Valid` or `BindingResult` yet.
- `VoterActivationDto` currently lacks bean validation constraints such as `@NotBlank`, `@Size`, and any server-side password policy annotations.
- Activation and recovery services compare `locationCode` using `dto.getLocationCode().trim()`. This should be hardened because a missing `locationCode` in a manual request can produce a server error instead of a controlled business validation message.
- Password confirmation currently exists only in the frontend templates (`activation.html` and `recovery-verify.html`) through Alpine state. The backend DTO does not contain `confirmPassword`, so the server does not enforce password confirmation by itself.
- Password length and password quality rules currently live mostly in frontend behavior. These rules should also be enforced in backend validation for both activation and recovery flows.
- Login behavior for voters intentionally uses a generic `Credenciales incorrectas` response to avoid account enumeration. That behavior is acceptable from a security perspective and should stay aligned with any future error-message policy.
- Recovery lookup may still reveal more state than login depending on future message wording. Keep this under review when refining the UX/security balance.
- The `/recovery/verify` step depends on flash attributes such as `recoveryDni`. This works for the current MVC flow, but it is somewhat fragile when the page is refreshed or accessed directly.
- The new auth templates still rely on Alpine shorthand attributes such as `@click` and `:class`. Since there was already a prior Thymeleaf parsing issue with similar patterns, keep this as a known template risk if rendering errors reappear.
- For the current academic scope, it is acceptable that the browser flow is stable first and API hardening comes next. Still, this backend hardening should be treated as explicit technical debt and not as completed security work.

## Recommended follow-up checks for auth hardening

1. Add server-side DTO validation to voter activation and recovery flows.
2. Add null-safe handling and controlled validation messages for missing `locationCode` and other required fields.
3. Decide whether password confirmation should also be enforced server-side.
4. Add a backend password policy for activation and recovery.
5. Add focused tests for manual invalid requests, not only browser-driven happy paths.

## Manual scenarios worth testing later

- `POST /ems/auth/voter/activation` without `locationCode`
- `POST /ems/auth/voter/recovery/reset` without `locationCode`
- Activation request with short password sent manually
- Recovery reset request with short password sent manually
- Manual submit that bypasses frontend password confirmation
