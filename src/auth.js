// Sample project - auth.js
// WARNING: This file contains intentional vulnerabilities for demo purposes

const express = require('express');
const crypto = require('crypto');
const db = require('./db');

const router = express.Router();

// VULNERABILITY: SQL Injection - string concatenation in query
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // BAD: Direct string concatenation - vulnerable to SQL injection
  const query = "SELECT * FROM users WHERE username='" + username + "' AND password='" + password + "'";
  const user = await db.query(query);

  if (user.rows.length > 0) {
    res.json({ token: generateToken(user.rows[0]) });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// VULNERABILITY: Hardcoded secret key
const SECRET_KEY = "my-super-secret-key-123";
const DB_PASSWORD = "admin123";

function generateToken(user) {
  // BAD: Using MD5 for cryptographic purposes
  const hash = crypto.createHash('md5').update(user.id + SECRET_KEY).digest('hex');
  return hash;
}

// VULNERABILITY: Path traversal
router.get('/file', (req, res) => {
  const filename = req.query.name;
  // BAD: No path validation - user can traverse directories
  const fs = require('fs');
  const content = fs.readFileSync('/var/app/uploads/' + filename, 'utf8');
  res.send(content);
});

// VULNERABILITY: Command injection
router.post('/ping', (req, res) => {
  const { host } = req.body;
  // BAD: User input passed directly to shell
  const { exec } = require('child_process');
  exec('ping -c 4 ' + host, (err, stdout) => {
    res.send(stdout);
  });
});

module.exports = router;
