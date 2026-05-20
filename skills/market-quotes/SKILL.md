---
name: market-quotes
description: >
  Fetches real-time market data for NSE/BSE instruments via the Kite MCP Server.
  Use this skill when the user asks about current price, LTP, OHLC, volume, OI,
  circuit limits, 52-week high/low, or any live market snapshot for Indian equities,
  F&O, currency, or commodity instruments.
  Keywords: price, LTP, quote, OHLC, volume, open interest, circuit, 52-week,
  market depth, bid-ask, tick, NSE, BSE, MCX, real-time, live.
---

## Skill Definition

This skill enables the agent to fetch and interpret live market data from the Kite MCP
Server with the analytical precision of an institutional equity trader. A quote is never
just a number — it is a contextual signal that must be interpreted against volume,
spread, circuit levels, and session structure.

---

## Instrument Resolution Rules

Before any tool call, always resolve the user's input to the correct Kite symbol format:

| User Input         | Resolved Symbol       | Notes                              |
|--------------------|-----------------------|------------------------------------|
| "Reliance"         | `NSE:RELIANCE`        | Default to NSE for equities        |
| "Nifty 50"         | `NSE:NIFTY 50`        | Index — no direct trading          |
| "Nifty Futures"    | `NFO:NIFTY25JUNFUT`   | Resolve to nearest active expiry   |
| "Infosys BSE"      | `BSE:INFY`            | Explicit exchange override         |
| "Gold MCX"         | `MCX:GOLD25JUNFUT`    | Commodity — nearest expiry         |
| "USDINR"           | `CDS:USDINR25JUNFUT`  | Currency futures                   |

**Ambiguity Rule:** If the exchange is not specified and the stock is listed on both NSE
and BSE, always default to NSE. For F&O instruments, always resolve to the nearest
active monthly expiry unless the user specifies otherwise.

---

## Agent Instructions

### Step 1 — Resolve Instrument
Map the user's input to the correct `EXCHANGE:TRADINGSYMBOL` format. For derivatives,
identify the correct expiry. Never make a tool call with an ambiguous or unresolved symbol.

### Step 2 — Fetch Quote
Call `get_quote` with the resolved instrument token(s). You may fetch multiple instruments
in one call if the user is comparing stocks or checking a basket.

### Step 3 — Interpret and Present

Do NOT present raw JSON. Synthesize the data into a structured market snapshot using
the framework below:

#### Quote Presentation Framework

```
📊 [COMPANY NAME] ([EXCHANGE:SYMBOL])
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  LTP        : ₹X,XXX.XX  (+X.XX | +X.XX%)
  Open       : ₹X,XXX.XX
  High       : ₹X,XXX.XX
  Low        : ₹X,XXX.XX
  Prev Close : ₹X,XXX.XX
  Volume     : X,XX,XXX (vs Avg: X,XX,XXX)
  VWAP       : ₹X,XXX.XX

  52W High   : ₹X,XXX.XX  (X.XX% away)
  52W Low    : ₹X,XXX.XX  (X.XX% away)

  Upper Circuit : ₹X,XXX.XX
  Lower Circuit : ₹X,XXX.XX

  OI (if F&O): X,XX,XXX contracts
  Timestamp  : HH:MM:SS IST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step 4 — Contextual Analysis

After presenting the raw data, always add a brief contextual read. A professional
does not just state price — they interpret it:

**Mandatory contextual signals to check and comment on:**

1. **Price vs VWAP:** Is the LTP trading above or below VWAP?
   - Above VWAP → intraday bullish bias; institutional buying support likely
   - Below VWAP → intraday bearish bias; sellers in control

2. **Volume Analysis:** Compare current volume to average daily volume (ADV).
   - Volume > 1.5x ADV → significant participation; move is likely genuine
   - Volume < 0.5x ADV → thin market; price moves less reliable

3. **Day Range Placement:** Where is the LTP within today's High-Low range?
   - Use: `position = (LTP - Low) / (High - Low) * 100`
   - >70% → trading near highs, potential resistance or continuation
   - <30% → trading near lows, potential support or weakness

4. **52-Week Context:**
   - Within 2% of 52W High → potential breakout zone or distribution
   - Within 2% of 52W Low → potential value zone or breakdown

5. **Circuit Proximity:** If LTP is within 2% of a circuit limit, flag it explicitly
   as a liquidity risk.

---

## Multi-Stock Comparison

When the user asks to compare multiple stocks (e.g., "compare Tata Motors and M&M"),
fetch quotes for all instruments in one call and present a comparison table:

```
Symbol          LTP       Chg%    Volume    vs ADV    VWAP Bias
──────────────────────────────────────────────────────────────
NSE:TATAMOTORS  ₹980.50   +1.2%   12.3L     1.4x      Above
NSE:M&M         ₹2,150.00 -0.4%   8.1L      0.9x      Below
```

Then provide a relative strength comment — which is showing stronger price action

Always keep the final snapshot timestamped in IST.


