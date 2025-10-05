# 🚀 Deployment Guide - Render Hosting

## 📋 Pre-Deployment Checklist

### ✅ Repository Setup
- [x] Code uploaded to GitHub: https://github.com/PrashantKumar033/Watch-website.git
- [x] Production configuration files added
- [x] Environment variables template created
- [x] API URLs configured for production

## 🌐 Render Deployment Steps

### 1. **Create Render Account**
- Go to [render.com](https://render.com)
- Sign up with GitHub account
- Connect your GitHub repository

### 2. **Deploy Backend (Web Service)**

#### **Create New Web Service:**
- **Repository:** `PrashantKumar033/Watch-website`
- **Branch:** `main`
- **Root Directory:** `backend`
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

#### **Environment Variables:**
```
NODE_ENV=production
PORT=10000
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<generate-random-secret>
EMAIL_USER=<your-email@gmail.com>
EMAIL_PASS=<your-email-app-password>
```

### 3. **Setup MongoDB Database**

#### **Option 1: MongoDB Atlas (Recommended)**
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free cluster
3. Create database user
4. Get connection string
5. Add to `MONGODB_URI` in Render

#### **Option 2: Render PostgreSQL (Alternative)**
- Add PostgreSQL database in Render
- Update models to use PostgreSQL instead of MongoDB

### 4. **Deploy Frontend (Static Site)**

#### **Create Static Site:**
- **Repository:** `PrashantKumar033/Watch-website`
- **Branch:** `main`
- **Root Directory:** `responsive-watches-website`
- **Build Command:** `echo "Static site, no build needed"`
- **Publish Directory:** `./`

### 5. **Configure API Endpoints**

#### **Update Frontend API URLs:**
The API configuration automatically detects environment:
```javascript
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api' 
  : '/api';
```

## 🔧 Production Configuration

### **Backend Server Configuration:**
- ✅ CORS enabled for frontend domain
- ✅ Static file serving for production
- ✅ Environment-based configuration
- ✅ Error handling and logging

### **Database Seeding:**
After deployment, seed the database:
```bash
# In Render console or locally
npm run seed
```

## 🌍 Expected URLs

### **Backend API:**
`https://your-backend-name.onrender.com/api`

### **Frontend Website:**
`https://your-frontend-name.onrender.com`

## 🔐 Security Checklist

- [x] Environment variables secured
- [x] JWT secret generated
- [x] Database credentials protected
- [x] CORS properly configured
- [x] Input validation implemented

## 📊 Monitoring & Maintenance

### **Health Checks:**
- Backend: `GET /api/products` should return products
- Frontend: Website should load with proper styling
- Database: Products and users should be accessible

### **Performance:**
- First load might be slow (cold start)
- Subsequent requests will be faster
- Consider upgrading to paid plan for better performance

## 🐛 Troubleshooting

### **Common Issues:**

1. **Build Fails:**
   - Check Node.js version compatibility
   - Verify all dependencies in package.json

2. **Database Connection:**
   - Verify MongoDB URI format
   - Check network access settings

3. **API Not Working:**
   - Check CORS configuration
   - Verify environment variables

4. **Frontend Not Loading:**
   - Check static file paths
   - Verify API endpoint URLs

## 📞 Support

If deployment issues occur:
1. Check Render logs
2. Verify environment variables
3. Test API endpoints manually
4. Check database connectivity

---

**🎉 Once deployed, your watch e-commerce website will be live and accessible worldwide!**