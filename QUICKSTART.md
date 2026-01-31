# ⚡ Quick Start Guide

Get your SSM Dashboard running in 60 seconds!

## 🚀 Option 1: Run with Proxy Server (Recommended - No CORS Issues!)

### Using Node.js (Best Option):

```bash
node proxy-server.js
```

Or with npm:
```bash
npm start
```

Then open: **http://localhost:8000**

✅ **All services will work correctly!**

---

## 🔧 Option 2: Simple Python Server (May have CORS issues)

### Using the provided script:

```bash
./server.sh
```

Then open: **http://localhost:8000**

⚠️ **Note**: This may show CORS errors for API calls

### Manual start:

**Python 3:**
```bash
python3 -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Node.js:**
```bash
npx http-server -p 8000
```

**PHP:**
```bash
php -S localhost:8000
```

---

## 🌐 Option 2: Deploy to GitHub Pages (5 minutes)

```bash
# 1. Initialize repository
git init
git add .
git commit -m "Initial commit"

# 2. Create repository on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/ssm-dashboard.git
git branch -M main
git push -u origin main

# 3. Enable GitHub Pages in repository settings
# Settings → Pages → Source: main branch → Save

# 4. Access at: https://YOUR-USERNAME.github.io/ssm-dashboard/
```

---

## 📱 What You'll See

✅ **Header** - Dashboard title with refresh button and live status  
✅ **Status Banner** - Overall system health with progress bar  
✅ **Service Cards** - Individual status for Core, Trial, and API services  
✅ **Auto-refresh** - Updates every 30 seconds automatically  

---

## 🎯 Features

- 🔄 Auto-refresh every 30 seconds
- 📊 Real-time health monitoring
- 🎨 Beautiful Gen-Z design
- 📱 Fully responsive
- ⚡ Lightning fast
- 🚫 No dependencies

---

## 🐛 Common Issues

**CORS Errors?**
- Expected when running from `file://`
- Use a local server (see options above)
- Or deploy to GitHub Pages

**Port Already in Use?**
- Try a different port: `python3 -m http.server 8001`
- Or kill the process using the port

**Services Not Loading?**
- Check internet connection
- Verify API endpoints are accessible
- Check browser console for errors

---

## 📚 More Information

- Full documentation: [README.md](README.md)
- Deployment guide: [DEPLOYMENT.md](DEPLOYMENT.md)
- Customization tips in README.md

---

**🎉 Enjoy your new dashboard!**