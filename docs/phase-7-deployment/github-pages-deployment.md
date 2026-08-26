# GitHub Pages Frontend Deployment Guide

## 1. Deployment Steps
1. **Push Codebase to GitHub**:
   ```bash
   git add .
   git commit -m "feat: complete Phase 1-6 OOAD SIS application"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo-name>.git
   git push -u origin main
   ```
2. **Enable GitHub Pages**:
   - In GitHub repository $ightarrow$ **Settings** $ightarrow$ **Pages**.
   - Under **Build and deployment**:
     - *Source*: **GitHub Actions** (uses [`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml)) OR **Deploy from a branch** (`main` / folder `/frontend`).
   - Save configuration.
3. **Access Live Frontend**:
   - URL: `https://<username>.github.io/<repo-name>/`
