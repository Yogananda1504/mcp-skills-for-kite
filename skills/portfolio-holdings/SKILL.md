---
name: portfolio-holdings
description: >
  Reads holdings, positions, and P&L from Kite MCP portfolio endpoints. Use this
  skill when the user asks about current holdings, average price, unrealized or realized
  profit/loss, exposure, or portfolio concentration.
  Keywords: holdings, positions, portfolio, P&L, profit, loss, average price,
  exposure, allocation, existing position, book, inventory.
---

## Skill Definition

This skill provides portfolio context before any trade or analysis. The agent should
determine whether the stock is already held, the entry basis, and how the current market
price affects the user's position.

---

## Analysis Rules

- Distinguish holdings from open positions.
- Report cost basis, current value, and P&L clearly.
- Note concentration risk if a position is oversized.
- Use portfolio context to decide whether a trade is a fresh entry, add, reduce, or exit.
