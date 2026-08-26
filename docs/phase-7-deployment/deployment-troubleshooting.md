# Deployment Troubleshooting & Rollback Procedures

## 1. Common Scenarios & Resolutions

### Scenario 1: Render Cold Start Delay
- **Symptom**: First API request takes 15–30 seconds to respond on Render Free Tier.
- **Cause**: Render spins down inactive containers after 15 minutes of inactivity.
- **Resolution**: Subsequent requests respond in $< 5	ext{ms}$. Frontend includes loading indicators.

### Scenario 2: CORS Error on GitHub Pages
- **Symptom**: `Access-Control-Allow-Origin` error in browser console.
- **Resolution**: Ensure `ALLOWED_ORIGIN` in Render environment matches `https://<username>.github.io`.

### Scenario 3: Rollback Procedure
- To redeploy a previous stable release:
  ```bash
  git revert HEAD
  git push origin main
  ```
  GitHub Actions and Render automatically rebuild and redeploy the previous stable state.
