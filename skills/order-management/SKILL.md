---
name: order-management
description: >
  Places, modifies, and cancels orders via Kite MCP. Use this skill when the user
  explicitly wants to buy, sell, modify, or cancel an order, or when the assistant
  needs to explain order placement constraints and execution flow.
  Keywords: buy, sell, order, place order, modify order, cancel order, bracket,
  cover, CNC, MIS, delivery, execution.
---

## Skill Definition

This skill handles order lifecycle operations. It should be used only after the user
has explicitly confirmed the action and the trade has been validated against price,
margin, and risk.

---

## Hard Rules

- Never place an order without explicit user confirmation.
- Validate price, margin, and quantity before submission.
- Confirm the order type and product type before execution.
- Provide a clear summary before any irreversible action.
