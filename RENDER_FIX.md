# 🔧 Render Deployment Fix

## ❌ Problem
Path confusion: Render was looking for `/backend/backend/server.js` instead of `/backend/server.js`

## ✅ Solution

### **Correct Render Configuration:**

#### **Backend Web Service:**
```
Repository: PrashantKumar033/Watch-website
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start
```

#### **Frontend Static Site:**
```
Repository: PrashantKumar033/Watch-website
Branch: main
Root Directory: responsive-watches-website
Build Command: echo "Static site"
Publish Directory: ./
```

### **Environment Variables (Backend):**
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/watchstore
JWT_SECRET=your-secret-key-here
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 🚀 Deploy Steps:

1. **Delete existing services** in Render (if any)
2. **Create new Web Service** with above backend config
3. **Create new Static Site** with above frontend config
4. **Add environment variables** to backend service
5. **Deploy both services**

## ✅ This will work correctly now!