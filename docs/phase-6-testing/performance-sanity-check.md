# Performance Sanity Check

## 1. Benchmark Metrics
- **Health Check Latency**: $< 2	ext{ms}$
- **Authentication Latency (bcrypt 10 rounds)**: $pprox 85	ext{ms}$
- **Course List & Roster Query Latency**: $< 5	ext{ms}$
- **Static Asset Delivery**: Instantaneous (Zero build step, vanilla modular assets).
- **Outcome**: Fully within the NFR-08 performance requirement ($< 500	ext{ms}$).
