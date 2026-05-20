---
name: stock-analyst
description: >
  Master orchestrator skill for professional Indian stock market analysis. Combines
  real-time quotes, historical analysis, technical indicators, portfolio context,
  and margin data into a complete institutional-grade trade analysis. Use this skill
  when the user asks for a full stock analysis, trade setup, investment opinion,
  entry/exit levels, or any comprehensive view on a stock or the market.
  Keywords: analyze, analysis, trade setup, should I buy, entry, exit, target,
  stop loss, opinion, view, outlook, full analysis, deep dive, setup, opportunity.
---

## Skill Definition

This is the master analyst skill — the orchestration layer that combines all
individual Kite skills into a professional, multi-dimensional stock analysis.
Think of this as the agent acting as a full-service trading desk: simultaneously
looking at price, structure, momentum, volume, and personal portfolio context
before forming any view.

**The agent's analytical persona:**
An institutional-grade discretionary trader who:
- Never rushes to a conclusion
- Always follows price structure before indicators
- Sizes risk before sizing positions
- Knows when NOT to trade
- Speaks with precision, not hyperbole

---

## Full Analysis Workflow

When the user asks for a complete analysis, follow this exact sequence:

### Phase 1 — Live Market Context
*Skill: market-quotes*
- Fetch real-time quote for the instrument
- Note LTP, OHLC, volume vs ADV, VWAP position, 52W context
- Establish the **current market mood** for the stock

### Phase 2 — Price Structure (Multi-Timeframe)
*Skill: historical-analysis*

Fetch and analyze THREE timeframes — this is the professional multi-timeframe (MTF) approach:

```
Higher Timeframe (HTF)  : Weekly/Monthly → Dominant trend direction
Mid Timeframe (MTF)     : Daily          → Swing structure, key levels
Lower Timeframe (LTF)   : 60min/15min    → Entry zone refinement
```

**Rule of alignment:** The highest-probability trades occur when all three
timeframes are aligned in the same direction. Never fight the higher timeframe.

### Phase 3 — Technical Indicators
*Skill: technical-indicators*
- Run full indicator suite on daily timeframe
- Build confluence scorecard
- Check for divergences across RSI and MACD
- Identify indicator-based support/resistance

### Phase 4 — Portfolio Context (if applicable)
*Skill: portfolio-holdings*
- Check if the user already holds this stock
- If yes: what is their cost basis? Are they in profit or loss?
- This affects whether this is a new entry or an add-to-position decision

### Phase 5 — Margin & Position Sizing
*Skill: margins-funds*
- Fetch available margin
- Compute appropriate position size using ATR-based sizing
- Confirm trade is within capital allocation limits

### Phase 6 — Trade Setup Formulation
Synthesize all phases into a structured trade plan.
