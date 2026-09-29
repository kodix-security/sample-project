# Sample Co. — JavaScript Coding Standards

This is a short internal style guide for the sample project. Upload this file to Kodix
(**Profile → Compliance**), then run a scan with `compliance_scan: true` to see how a **compliance scan**
checks code against your own rules — separately from the security scan that looks for vulnerabilities.

> This is the same document offered as the one-click "Try a sample document" button inside Kodix, so the
> two demos line up.

## 1. Naming

Regular functions and variables use `camelCase` (e.g. `calculateTotal`, not `CalculateTotal`). Classes and
constructors use `PascalCase`. Constants that never change use `UPPER_SNAKE_CASE`.

## 2. Documentation

Every exported function must have a short comment above it describing what it does and its parameters.
Route handlers must describe what the endpoint does and who is allowed to call it.

## 3. Variables

Always use `const` or `let`. Never use `var`.

## 4. Dead code

Never commit commented-out code. Delete it — version control already remembers it.

## 5. Secrets & configuration

API keys, passwords and other secrets must never be hardcoded in source files. Read them from environment
variables (`process.env.SOME_KEY`).

## 6. Error handling

Every `await` on a database call or network request must be wrapped in a `try { } catch { }` block that
returns a clear error to the caller, never an unhandled rejection.

## 7. Function size

Keep functions focused on one task. Split a function into smaller ones once it grows past ~40 lines.
