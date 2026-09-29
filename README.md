# 🧪 Kodix Sample Project

This is a demo project with **intentional security vulnerabilities** *and* **intentional compliance
violations**, to demonstrate what Kodix Security detects with each check.

> ⚠️ **Warning:** This code is intentionally insecure. Do NOT use in production.

---

## How to Use This Sample

The included workflow runs **both** the security scan and the compliance scan on every push
(`code_scan: true` + `compliance_scan: true`), so there's one required setup step before your first push:
Kodix needs a compliance document on your account, or the compliance half of the scan has nothing to check
against.

1. Fork this repository
2. Add your `KODIX_API_KEY` to repo secrets (Settings → Secrets → Actions)
3. Log in to Kodix and open **Profile → Compliance** → click **🧪 Try a sample document** (or upload
   [`CODING_STANDARDS.md`](./CODING_STANDARDS.md) yourself — same content, one click either way)
4. Push any change to `main` Kodix runs the security **and** compliance scan automatically
5. Watch the GitHub Actions tab to see real-time results for both checks

> **Skipped step 3?** The Action fails with `no_compliance_documents` (nothing is charged). Either go back
> and add a document, or edit `.github/workflows/kodix.yml` and set `compliance_scan: false` to run the
> security scan only.

---

## Intentional Vulnerabilities (security scan)

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

### Expected Security Scan Results

After scanning, you should see Kodix detect **at least 5-7 of these issues** (confirmed by 2+ AI models).

---

## Intentional Compliance Violations (compliance scan)

`src/utils.js` has **no security vulnerabilities** — it exists purely to demonstrate the **compliance
check**, which verifies code against [`CODING_STANDARDS.md`](./CODING_STANDARDS.md) instead of hunting for
vulnerabilities:

| File | Violates | Rule |
|------|----------|------|
| `src/utils.js` | `FormatCurrency` uses PascalCase | §1 Naming — functions must use camelCase |
| `src/utils.js` | `calculateDiscount` has no doc comment | §2 Documentation |
| `src/utils.js` | `calculateDiscount` uses `var` | §3 Variables |
| `src/utils.js` | Commented-out `calculateDiscountOld` | §4 Dead code |
| `src/auth.js` / `src/api.js` | Hardcoded secrets | §5 Secrets & configuration |
| `src/auth.js` | `db.query(query)` has no `try/catch` | §6 Error handling |

Note that the hardcoded-secrets rule overlaps with a security finding — that's expected. The security scan
flags it as an exploitable weakness; the compliance scan flags the same line because it breaks your own
policy. Seeing both is normal when a rule and a vulnerability describe the same code.

### Testing the Compliance Check

The compliance check is already turned on in [`.github/workflows/kodix.yml`](./.github/workflows/kodix.yml):

```yaml
- name: Run Kodix Security + Compliance Scan
  uses: kodix-security/kodix-action@v1
  with:
    api_key: ${{ secrets.KODIX_API_KEY }}
    code_scan: true          # security check
    compliance_scan: true    # compliance check — needs at least one document on your account
```

1. Log in to Kodix and open **Profile → Compliance**.
2. Upload [`CODING_STANDARDS.md`](./CODING_STANDARDS.md) — or just click **🧪 Try a sample document**, which
   adds the identical text with one click. (If you already did this in [How to Use This Sample](#how-to-use-this-sample), skip ahead.)
3. Push a change. The Actions log shows a **compliance check** progress block alongside the security one,
   and Kodix emails/stores a separate compliance PDF next to the security report.

Only want one of the two checks? Edit the same step: `code_scan: false` for compliance only, or
`compliance_scan: false` (or remove the line) for security only.

### Expected Compliance Scan Results

You should see all 6 violations from the table above, each naming the exact rule it breaks and which Hyper
engine(s) reported it. Unlike the security scan (which needs 2+ engines to agree), every compliance
violation reported by any engine is included.

---

## Setting Up the GitHub Action

1. Copy `.github/workflows/kodix.yml` to your repository (already included here, runs security + compliance)
2. Add `KODIX_API_KEY` to GitHub Secrets
3. Upload `CODING_STANDARDS.md` in Profile → Compliance (or click "Try a sample document") — required for the
   compliance half of the scan (see above)
4. Done every push scans your code for both

See [Kodix Documentation](https://kodixsecurity.com/docs) for more, including the full
[Compliance Scans guide](https://kodixsecurity.com/docs#compliance-overview).
