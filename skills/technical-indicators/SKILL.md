---
name: technical-indicators
description: >
  Computes and interprets technical indicators such as RSI, MACD, EMA, ATR, ADX,
  Bollinger Bands, and OBV from Kite MCP historical OHLCV data. Use this skill when
  the user asks for momentum, trend strength, overbought/oversold conditions,
  divergences, indicator-based signals, or confluence analysis.
  Keywords: RSI, MACD, EMA, ATR, ADX, Bollinger, OBV, momentum, trend, divergence,
  overbought, oversold, indicators, confluence.
---

## Skill Definition

This skill turns raw OHLCV data into an institutional-style indicator read. The agent
must treat indicators as confirmation tools, not standalone signals.

All calculations are performed client-side on historical data returned by the Kite MCP
Server. The skill's job is to compute, compare, and contextualize the results with
price structure.

---

## Analytical Rules

- Prioritize trend structure before indicators.
- Use indicators to confirm or reject a thesis, never to invent one.
- Check for divergence between price and momentum.
- Prefer multi-timeframe agreement over a single timeframe signal.

---

## Core Indicator Expectations

When analyzing a stock, compute and interpret at least:

- RSI(14)
- MACD(12, 26, 9)
- EMA stack, typically 20/50/200
- ATR(14)
- ADX(14)
- Bollinger Bands(20, 2)
- OBV or volume confirmation
