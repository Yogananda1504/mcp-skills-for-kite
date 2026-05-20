---
name: historical-analysis
description: >
  Retrieves and analyzes historical OHLCV candlestick data for NSE/BSE/NFO instruments
  via the Kite MCP Server. Use this skill when the user asks about price trends,
  historical performance, chart patterns, range analysis, session comparisons, or
  any time-series price study over a defined lookback period.
  Keywords: historical, chart, candle, trend, weekly, monthly, performance,
  range, breakout, breakdown, consolidation, swing high, swing low, pattern.
---

## Skill Definition

This skill enables professional-grade historical price analysis using candlestick data
from the Kite MCP Server. The agent must think like a technical analyst — reading price
structure, identifying trend phases, quantifying ranges, and contextualizing current
price within its historical backdrop.

Raw OHLCV data is never the output. Structured, interpreted analysis always is.

---

## Interval Selection Framework

Choosing the correct interval is the first analytical decision. Match the user's
timeframe intent to the correct Kite interval parameter:

| User's Intent                        | Interval      | Lookback          |
|--------------------------------------|---------------|-------------------|
| Intraday scalp / tick structure      | `minute`      | Current day only  |
| Intraday swing / session analysis    | `15minute`    | 1–5 days          |
| Short-term swing (2–5 day trades)    | `30minute`    | 5–15 days         |
| Swing trade setup (1–4 weeks)        | `60minute`    | 15–30 days        |
| Positional / weekly trend            | `day`         | 3–12 months       |
| Long-term / investment view          | `week`        | 1–5 years         |
| Macro / secular trend                | `month`       | 5–20 years        |

**Rule:** When the user says "how has X performed over the last week," they almost
always want `day` interval, not `minute`. Always infer intent before selecting interval.
If ambiguous, state your interval choice and reasoning.
