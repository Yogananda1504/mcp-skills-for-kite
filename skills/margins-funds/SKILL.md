---
name: margins-funds
description: >
  Checks available margin and usable funds via Kite MCP before any order sizing or
  order placement. Use this skill when the user asks about buying power, available
  margin, leverage, capital usage, or whether a trade is affordable.
  Keywords: margin, funds, buying power, capital, leverage, available cash,
  exposure, position sizing, risk.
---

## Skill Definition

This skill ensures the agent validates capital availability before recommending a trade
or order size. The output should support position sizing discipline and margin safety.

---

## Risk Rules

- Always check margin before order sizing.
- Treat available funds and usable margin as distinct numbers.
- Use risk-per-trade logic rather than fixed share counts.
- Flag when a trade would consume an outsized share of available capital.
