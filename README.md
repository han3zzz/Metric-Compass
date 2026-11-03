# Metric Compass

A community tool for [Metric](https://metric.xyz/) users: find pools by yield and safety, scan a pool's risk, compare curators, simulate LP edge, check routes and watch spreads.

**Live demo:** [https://metric-compass.vercel.app](https://metric-compass.vercel.app)

> **Note:** This is a community project. It is **not an official Metric product** and is not affiliated with Metric. The safety score is this tool's own rating, built from public data. It is not Metric's assessment and is **not financial advice**.

---

## Features

Metric Compass is made up of six modules:

| Module | Description |
|---|---|
| **Pool Finder** | Find pools by yield and safety. Filter by chain, tier, minimum TVL and pricing health. Click a row for a full risk scan. |
| **Risk Scanner** | Detailed risk scan for an individual pool. |
| **Curator Board** | Compare curators side by side. |
| **Edge Lab** | Simulate LP edge when providing liquidity. |
| **Route Check** | Check trading routes. |
| **Spread Monitor** | Watch spreads over time. |

It also includes **Compass AI**, an assistant that reads what is currently on your screen. It can explain a pool's risks, summarize current spreads, explain an Edge Lab result, and more.

### Pool Finder filters

- **Chain:** all chains or a specific one
- **Tier:** Green, Yellow, Red, Other
- **Min TVL:** no minimum, $10K, $100K, $1M
- **Sort by:** TVL, 7d APR, Trading PnL APR, 24h volume, Safety score, Newest
- **Search** by name
- **Quotable pools only** and **Locked pricing only** toggles

### Metrics shown

Pool, Tier, Status, TVL, 24h volume, 7d APR, Trading PnL APR, Safety, Age.

- **7d APR:** the LP share of fees over the last 7 days, annualized, before token price moves.
- **Trading PnL APR:** also counts price moves of both tokens against simply holding them, so it is closer to the real result.

---

## Data

- Data comes from Metric's public API (`api.metric.xyz`).
- All calculations run in your browser.

---

## Related links

- Metric website: [metric.xyz](https://metric.xyz/)
- App: [app.metric.xyz](https://app.metric.xyz)
- Docs: [docs.metric.xyz](https://docs.metric.xyz)

---

## Deployment

The project is deployed on [Vercel](https://vercel.com/). To work on it locally, clone the repository:

```bash
git clone https://github.com/<your-username>/metric-compass.git
cd metric-compass
```

---

## Disclaimer

This tool is for informational purposes only. Scores, APR figures and simulation results do not guarantee future returns. Do your own research before making any investment decision.

---

## License

Add your license here (for example, MIT).
