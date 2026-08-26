# Render Backend Deployment Guide

## 1. Web Service Configuration on Render
1. Log in to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** $ightarrow$ **Web Service**.
3. Connect your GitHub repository.
4. Configure Service Parameters:
   - **Name**: `sis-ooad-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
5. Configure Production Environment Variables:
   - `NODE_ENV` = `production`
   - `PORT` = `5000`
   - `JWT_SECRET` = `(Click Generate to create random 256-bit secret)`
   - `ALLOWED_ORIGIN` = `https://<username>.github.io`
6. Click **Deploy Web Service**.
