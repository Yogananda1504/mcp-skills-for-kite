# Kite MCP Skills Library
### Professional Indian Stock Market Agent Skills for AI Assistants

---

## Overview

This library contains 7 skill files that collectively turn an AI assistant into a
professional-grade Indian stock market analyst and trading assistant, powered by
the Kite MCP Server.

Each skill is self-contained, precisely scoped, and built to match the analytical
standards of an institutional equity trader — not a beginner's tool.

---

## Skill Index

| File                      | Role                          | Kite Tools Used                                     |
|---------------------------|-------------------------------|-----------------------------------------------------|
| `skills/market-quotes/SKILL.md`        | Live market data & quotes     | `get_quote`                                         |
| `skills/historical-analysis/SKILL.md`  | Price structure & chart study | `get_historical_data`                               |
| `skills/technical-indicators/SKILL.md` | RSI, MACD, EMA, ATR, etc.     | `get_historical_data` (computed client-side)        |
| `skills/portfolio-holdings/SKILL.md`   | Holdings, positions, P&L      | `get_holdings`, `get_positions`                     |
| `skills/margins-funds/SKILL.md`        | Margin checks & position size | `get_margins`, `get_quote`                          |
| `skills/order-management/SKILL.md`     | Place, modify, cancel orders  | `place_order`, `modify_order`, `cancel_order`, `get_orders` |
| `skills/stock-analyst/SKILL.md`        | **Master orchestrator**       | All of the above                                    |

---

## How to Use with Agents

1. Keep each publishable skill in `skills/<skill-name>/SKILL.md`.
2. Use `.github/workflows/publish-skills.yaml` to publish changes to GHCR.
3. Connect the skills library to your agent runtime or skill loader.
4. Route user queries to the correct skill based on the `description` and
  `keywords` in each file's frontmatter.

GitHub Copilot is one supported consumer of this layout, but the repository is
structured to work with other agent systems that understand skill-style metadata.

The `skills/` tree is the canonical source for publishing.

---

## Open Source

This repository is intended to be easy to consume, audit, and contribute to.

### Project Governance

- [Contributing Guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)
- [License](LICENSE)
- [Pull Request Template](.github/pull_request_template.md)
- [Issue Templates](.github/ISSUE_TEMPLATE/)
- [Changelog](CHANGELOG.md)

### Contribution Flow

1. Fork or branch from `main`.
2. Make changes under `skills/<skill-name>/SKILL.md` or the supporting docs.
3. Keep the root README and workflow in sync with any structural changes.
4. Open a pull request with a clear summary of what changed and why.
5. Ensure the GitHub Actions workflow still passes before merging.

---

## Skill Dependency Map

```
stock-analyst (master)
├── market-quotes
├── historical-analysis
│   └── (feeds into) technical-indicators
├── technical-indicators
├── portfolio-holdings
└── margins-funds
        └── (feeds into) order-management

order-management
├── market-quotes    (for LTP before placing)
└── margins-funds    (for margin validation)
```

---

## Recommended Query Routing

| User Says                              | Skill Triggered           |
|----------------------------------------|---------------------------|
| "What is X trading at?"               | market-quotes             |
| "How has X performed this month?"     | historical-analysis       |
| "What does RSI / MACD say about X?"   | technical-indicators      |
| "Show me my portfolio"                | portfolio-holdings        |
| "Do I have enough margin for X?"      | margins-funds             |
| "Buy / Sell X shares"                 | order-management          |
| "Analyze X" / "Give me a view on X"   | stock-analyst             |

---

## Professional Standards Embedded in Every Skill

- **No definitive buy/sell recommendations** — data and analysis only
- **ATR-based stop-losses** — never arbitrary fixed-point stops
- **Multi-timeframe analysis** — weekly → daily → intraday alignment
- **Confluence-based signals** — never one indicator in isolation
- **Position sizing discipline** — max 1.5% risk per trade
- **"No Trade" is a valid output** — selectivity over overtrading
- **Timestamps on all data** — markets are time-sensitive
- **Margin validation before every order** — capital protection first

---

## Notes

- All indicator computations (RSI, MACD, EMA, ATR etc.) are performed by the
  agent on raw OHLCV data returned by `get_historical_data`. Ensure you fetch
  sufficient candle history for each indicator's lookback period.
- F&O margin calculations (SPAN + Exposure) require exchange margin files.
  The agent will note when exact figures should be verified against the
  NSE/BSE margin calculator.
- Order placement via `order-management.md` always requires explicit user
  confirmation — no order is placed autonomously.
