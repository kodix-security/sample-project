// Sample project - api.js
// WARNING: Contains intentional vulnerabilities for Kodix demo

const express = require('express');
const router = express.Router();

// VULNERABILITY: XSS - rendering user input without sanitization
router.get('/search', (req, res) => {
  const query = req.query.q;
  // BAD: Directly embedding user input in HTML response
  res.send(`<h1>Results for: ${query}</h1>`);
});

// VULNERABILITY: Insecure deserialization
router.post('/data', (req, res) => {
  const raw = req.body.payload;
  // BAD: eval on user-controlled data
  const data = eval('(' + raw + ')');
  res.json(data);
});

// VULNERABILITY: Hardcoded credentials
const API_CONFIG = {
  stripe_key: "sk_live_abcdefghijklmnop123456789",
  sendgrid_key: "SG.abc123.def456",
  aws_secret: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
};

// VULNERABILITY: Missing rate limiting on sensitive endpoint
router.post('/transfer', async (req, res) => {
  const { amount, to_account } = req.body;
  // No authentication check, no rate limit
  await transferFunds(amount, to_account);
  res.json({ success: true });
});

async function transferFunds(amount, account) {
  // placeholder
}

module.exports = router;
