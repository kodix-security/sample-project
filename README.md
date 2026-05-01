# 🧪 Kodix Sample Project

This is a demo project with **intentional security vulnerabilities** to demonstrate what Kodix Security detects.

> ⚠️ **Warning:** This code is intentionally insecure. Do NOT use in production.

---

## How to Use This Sample

1. Fork this repository
2. Add your `KODIX_API_KEY` to repo secrets (Settings → Secrets → Actions)
3. Push any change to `main` the Kodix scan will trigger automatically
4. Watch the GitHub Actions tab to see real-time results

---

## Intentional Vulnerabilities

This sample contains:

| File | Vulnerability | Severity |
|------|--------------|---------|
| `src/auth.js` | SQL Injection (string concatenation) | 🔴 Critical |
| `src/auth.js` | Hardcoded database password | 🔴 Critical |
| `src/auth.js` | MD5 used for cryptography | 🟠 High |
| `src/auth.js` | Path traversal (no validation) | 🟠 High |
| `src/auth.js` | Command injection via `exec()` | 🔴 Critical |
| `src/api.js` | XSS (unsanitized user input in HTML) | 🟠 High |
| `src/api.js` | Insecure deserialization (`eval`) | 🔴 Critical |
| `src/api.js` | Hardcoded Stripe live key | 🔴 Critical |
| `src/api.js` | Missing authentication on transfer | 🟠 High |

---

## Expected Scan Results

After scanning, you should see Kodix detect **at least 5-7 of these issues** (confirmed by 2+ AI models).

---

## Setting Up the GitHub Action

1. Copy `.github/workflows/kodix.yml` to your repository
2. Add `KODIX_API_KEY` to GitHub Secrets
3. Done every push scans your code

See [Kodix Documentation](https://kodixsecurity.com/docs) for more.
