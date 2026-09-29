// Sample project - utils.js
// NOTE: unlike auth.js and api.js, this file has no security vulnerabilities. It exists to demonstrate
// the COMPLIANCE check (style/process rules from CODING_STANDARDS.md), separately from the security scan.

// COMPLIANCE ISSUE: function name uses PascalCase; the standard requires camelCase for regular functions.
function FormatCurrency(amount) {
  return '$' + amount.toFixed(2);
}

// COMPLIANCE ISSUE: exported function has no doc comment describing what it does or its parameters.
function calculateDiscount(price, percent) {
  var discounted = price - (price * percent / 100); // COMPLIANCE ISSUE: `var` instead of const/let
  return discounted;
}

// COMPLIANCE ISSUE: commented-out old implementation left in the codebase (should be deleted, not kept).
// function calculateDiscountOld(price, percent) {
//   return price * (1 - percent);
// }

module.exports = { FormatCurrency, calculateDiscount };
