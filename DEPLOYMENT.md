# 🚀 Deployment Guide - SSM Dashboard

This guide will help you deploy the SSM Dashboard to GitHub Pages in minutes.

## 📋 Prerequisites

- GitHub account
- Git installed on your computer
- Basic command line knowledge

## 🎯 Quick Deployment (5 minutes)

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository settings:
   - **Name**: `ssm-dashboard` (or any name you prefer)
   - **Description**: "Real-time SSM Health Monitoring Dashboard"
   - **Visibility**: Public (required for free GitHub Pages)
   - ✅ Check "Add a README file" (optional)
4. Click **"Create repository"**

### Step 2: Initialize Local Repository

Open terminal in the project directory and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: SSM Dashboard v2.0"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/ssm-dashboard.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR-USERNAME` with your actual GitHub username!**

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**:
   - Select **"Deploy from a branch"**
   - Branch: **"main"**
   - Folder: **"/ (root)"**
5. Click **"Save"**

### Step 4: Access Your Dashboard

After 1-2 minutes, your dashboard will be live at:

```
https://YOUR-USERNAME.github.io/ssm-dashboard/
```

🎉 **That's it! Your dashboard is now live!**

---

## 🔄 Updating Your Dashboard

Whenever you make changes:

```bash
# Stage changes
git add .

# Commit with a message
git commit -m "Update dashboard features"

# Push to GitHub
git push origin main
```

GitHub Pages will automatically rebuild and deploy your changes within 1-2 minutes.

---

## 🛠️ Advanced Configuration

### Custom Domain

1. Buy a domain (e.g., from Namecheap, GoDaddy)
2. In repository settings → Pages → Custom domain
3. Enter your domain: `dashboard.yourdomain.com`
4. Add DNS records at your domain provider:
   ```
   Type: CNAME
   Name: dashboard
   Value: YOUR-USERNAME.github.io
   ```

### HTTPS

GitHub Pages automatically provides free HTTPS via Let's Encrypt. Just check the **"Enforce HTTPS"** option in Pages settings.

### Environment-Specific Endpoints

Create different branches for different environments:

```bash
# Production (main branch)
git checkout main

# Staging
git checkout -b staging
# Update endpoints in script.js for staging
git push origin staging

# Enable Pages for staging branch in settings
```

---

## 🐛 Troubleshooting

### Dashboard Not Loading

**Problem**: 404 error after deployment

**Solution**: 
- Wait 2-3 minutes for initial deployment
- Check repository is public
- Verify Pages is enabled in settings
- Clear browser cache

### CORS Errors

**Problem**: API calls failing with CORS errors

**Solution**:
- This is expected if APIs don't allow cross-origin requests
- The dashboard will show "Failed to fetch" errors
- Contact API administrators to add CORS headers
- Consider using a CORS proxy for development

### Styles Not Loading

**Problem**: Dashboard appears unstyled

**Solution**:
- Check all files are committed and pushed
- Verify file paths in HTML are relative (not absolute)
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console for errors

### Auto-refresh Not Working

**Problem**: Dashboard doesn't update automatically

**Solution**:
- Check browser console for JavaScript errors
- Ensure you're not blocking JavaScript
- Try manual refresh button
- Check if tab is active (auto-refresh pauses on hidden tabs)

---

## 📊 Monitoring Your Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml` for automated testing:

```yaml
name: Deploy Dashboard

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Validate HTML
        run: |
          echo "Validating HTML structure..."
          # Add validation commands
      - name: Deploy to Pages
        run: echo "Deployed successfully!"
```

### Analytics (Optional)

Add Google Analytics to track usage:

1. Get tracking ID from Google Analytics
2. Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🔒 Security Best Practices

1. **Never commit sensitive data**
   - No API keys in code
   - No passwords or tokens
   - Use environment variables

2. **Keep dependencies updated**
   - This project has no dependencies! ✅
   - Pure vanilla JavaScript

3. **Monitor access logs**
   - Check GitHub Insights → Traffic
   - Monitor for unusual patterns

4. **Use HTTPS only**
   - Always enforce HTTPS in Pages settings
   - Never allow HTTP access

---

## 📱 Mobile Testing

Test your deployed dashboard on:
- iOS Safari
- Android Chrome
- Tablet devices

Use browser dev tools device emulation for quick testing.

---

## 🎨 Customization After Deployment

### Changing Colors

Edit `styles.css` CSS variables:
```css
:root {
    --accent-blue: #3b82f6;    /* Change to your brand color */
    --accent-purple: #8b5cf6;  /* Secondary color */
}
```

### Changing Refresh Interval

Edit `script.js`:
```javascript
const REFRESH_INTERVAL = 30000; // 30 seconds (change as needed)
```

### Adding More Services

1. Add endpoint to `script.js`
2. Add service card to `index.html`
3. Update check logic
4. Commit and push changes

---

## 📞 Support

- **Issues**: Open an issue on GitHub
- **Questions**: Check README.md
- **Updates**: Watch repository for updates

---

## ✅ Deployment Checklist

- [ ] Repository created on GitHub
- [ ] Code pushed to main branch
- [ ] GitHub Pages enabled
- [ ] Dashboard accessible via GitHub Pages URL
- [ ] All services loading correctly
- [ ] Mobile responsive working
- [ ] Auto-refresh functioning
- [ ] Manual refresh button working
- [ ] All links opening correctly

---

**🎉 Congratulations! Your SSM Dashboard is now live and monitoring your services 24/7!**

---

*Last Updated: January 2026*