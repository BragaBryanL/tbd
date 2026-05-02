# Discord Database System - Deployment Guide

## 🚀 Quick Deployment Options

### 1. Vercel (Recommended - Easiest)
**Best for:** Quick deployment, automatic SSL, global CDN

#### Steps:
1. **Push to GitHub** (already done!)
2. **Go to [vercel.com](https://vercel.com)**
3. **Sign up/login** with GitHub
4. **Click "New Project"**
5. **Import your repository**: `BragaBryanL/tbd`
6. **Add Environment Variables**:
   ```
   DISCORD_BOT_TOKEN=your_bot_token_here
   DISCORD_APPLICATION_ID=your_app_id_here
   ```
7. **Click "Deploy"**

#### Features:
- ✅ Automatic deployments on git push
- ✅ Custom domain support
- ✅ Built-in analytics
- ✅ Zero config needed

---

### 2. Netlify
**Best for:** Free hosting, form handling, easy setup

#### Steps:
1. **Go to [netlify.com](https://netlify.com)**
2. **Sign up/login** with GitHub
3. **Click "New site from Git"**
4. **Select your repository**: `BragaBryanL/tbd`
5. **Build settings** (auto-detected):
   ```
   Build command: npm run build
   Publish directory: out
   ```
6. **Add Environment Variables**:
   ```
   DISCORD_BOT_TOKEN=your_bot_token_here
   DISCORD_APPLICATION_ID=your_app_id_here
   ```
7. **Click "Deploy site"**

---

### 3. Railway
**Best for:** Backend services, database included

#### Steps:
1. **Go to [railway.app](https://railway.app)**
2. **Sign up/login** with GitHub
3. **Click "New Project"**
4. **Deploy from GitHub repo**
5. **Select**: `BragaBryanL/tbd`
6. **Add Environment Variables** in Railway dashboard
7. **Deploy**

---

### 4. Docker (Self-hosted)
**Best for:** Full control, custom servers

#### Requirements:
- Docker installed
- Server/VPS with port access

#### Steps:
1. **Create Dockerfile**:
   ```dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   
   COPY package*.json ./
   RUN npm ci --only=production
   
   COPY . .
   
   RUN npm run build
   
   EXPOSE 3000
   
   CMD ["npm", "start"]
   ```

2. **Create docker-compose.yml**:
   ```yaml
   version: '3.8'
   services:
     discord-lookup:
       build: .
       ports:
         - "3000:3000"
       environment:
         - DISCORD_BOT_TOKEN=${DISCORD_BOT_TOKEN}
         - DISCORD_APPLICATION_ID=${DISCORD_APPLICATION_ID}
   ```

3. **Deploy**:
   ```bash
   docker-compose up -d
   ```

---

## 📋 Pre-Deployment Checklist

### ✅ Required Setup:
- [ ] **Discord Bot Token** ready
- [ ] **Discord Application ID** ready
- [ ] **Repository pushed to GitHub** ✅
- [ ] **Environment variables documented**

### ✅ Security Considerations:
- [ ] **Never commit** `.env.local` to git
- [ ] **Use environment variables** for secrets
- [ ] **Enable HTTPS** (automatic on Vercel/Netlify)
- [ ] **Rate limiting** implemented (already done)

### ✅ Performance Optimizations:
- [ ] **Image optimization** (Discord CDN `?size=1024`)
- [ ] **Caching headers** (Next.js handles this)
- [ ] **Build optimization** (Next.js production build)

---

## 🔧 Environment Variables Setup

### Required Variables:
```env
DISCORD_BOT_TOKEN="your_bot_token_here"
DISCORD_APPLICATION_ID="your_app_id_here"
```

### Optional Variables:
```env
DISCORD_CLIENT_SECRET="your_client_secret"
DISCORD_REDIRECT_URI="your_redirect_uri"
```

### Where to add them:
- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site settings → Build & deploy → Environment
- **Railway**: Project settings → Variables
- **Docker**: docker-compose.yml or .env file

---

## 🌐 Custom Domain Setup

### Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records (Vercel provides instructions)

### Netlify:
1. Go to Site settings → Domain management
2. Add custom domain
3. Update DNS records

---

## 🔍 Testing After Deployment

### Check these URLs:
- **Homepage**: `https://your-domain.com`
- **API Health**: `https://your-domain.com/api/lookup` (POST request)
- **Static assets**: CSS/JS files loading

### Test Discord Integration:
1. **Search for a Discord User ID**
2. **Check banner images load**
3. **Verify account age calculation**
4. **Test avatar decorations** (if user has them)

---

## 🚨 Troubleshooting

### Common Issues:

#### 1. "Invalid bot token"
- **Solution**: Check environment variables in deployment dashboard
- **Verify**: Token is correct and not expired

#### 2. "Build failed"
- **Solution**: Check build logs
- **Common**: Missing dependencies or TypeScript errors

#### 3. "Images not loading"
- **Solution**: Check Discord API permissions
- **Verify**: Bot has proper scopes

#### 4. "CORS errors"
- **Solution**: API routes should handle CORS (Next.js handles this)

---

## 📊 Monitoring & Analytics

### Vercel:
- Built-in analytics dashboard
- Performance metrics
- Error tracking

### Netlify:
- Site analytics
- Form submissions
- Build logs

### Self-hosted:
- Consider adding: Sentry, LogRocket, or similar

---

## 💡 Pro Tips

### 1. **Environment Safety**
```bash
# Test locally with production env
npm run build
npm run start
```

### 2. **Performance**
- Enable Next.js Image Optimization
- Use Discord CDN with appropriate sizes
- Implement caching headers

### 3. **Security**
- Use HTTPS (automatic on platforms)
- Never expose bot tokens
- Consider rate limiting

### 4. **Scaling**
- Vercel/Netlify auto-scale
- Consider serverless functions for API
- Monitor usage and costs

---

## 🎯 Recommended Deployment Path

**For most users: Vercel**
- Easiest setup
- Best performance
- Free tier available
- Automatic HTTPS
- Git-based deployments

**For advanced users: Docker**
- Full control
- Custom configurations
- Self-hosting options
- Database integration

---

## 📞 Support

If you encounter issues:
1. **Check build logs** in deployment platform
2. **Verify environment variables**
3. **Test Discord API permissions**
4. **Check this guide** for common solutions

Your Discord Database System is ready to deploy! 🚀
