# ChatBot Production Deployment Guide

Complete guide for deploying the Dark Nebula AI Chatbot to production.

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Setup](#environment-setup)
3. [Deployment to Vercel](#deployment-to-vercel)
4. [Self-Hosted Deployment](#self-hosted-deployment)
5. [Production Monitoring](#production-monitoring)
6. [Rollback Procedures](#rollback-procedures)
7. [Performance Optimization](#performance-optimization)
8. [Security Hardening](#security-hardening)

---

## Pre-Deployment Checklist

### Code Quality
- [ ] All tests passing
- [ ] No TypeScript errors: `npm run type-check`
- [ ] Linting passes: `npm run lint`
- [ ] No console errors or warnings
- [ ] Code review completed

### Functionality
- [ ] Chat widget appears and functions
- [ ] All quick action buttons work
- [ ] API responses are correct
- [ ] Error handling is robust
- [ ] Fallback responses work
- [ ] Contact redirect functions properly

### Performance
- [ ] Lighthouse score > 80
- [ ] API response time < 2 seconds
- [ ] Bundle size is reasonable
- [ ] No memory leaks detected

### Security
- [ ] API key is secure and not in code
- [ ] Input validation is in place
- [ ] CORS is properly configured
- [ ] SQL injection protections (if using DB)
- [ ] Rate limiting is configured

### Data & Privacy
- [ ] Privacy policy is linked in chat
- [ ] User data handling is documented
- [ ] GDPR compliance (if applicable)
- [ ] Cookie consent (if needed)

### Documentation
- [ ] README is up to date
- [ ] Setup guide is complete
- [ ] API documentation exists
- [ ] Runbooks for common issues

### Configuration
- [ ] .env.local.example is up to date
- [ ] All required env vars are listed
- [ ] Default values are safe
- [ ] Secrets are not committed

---

## Environment Setup

### Production Environment Variables

Create `.env.production` or use deployment platform's secret manager:

```env
# Required
OPENAI_API_KEY=sk_...

# Recommended
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Optional - Analytics
NEXT_PUBLIC_GTAG_ID=G_...
SENTRY_DSN=https://...

# Optional - Database (if using conversation persistence)
DATABASE_URL=postgresql://...
DATABASE_PASSWORD=...

# Optional - Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASSWORD=...
SMTP_FROM=chatbot@yourdomain.com

# Optional - Rate Limiting
REDIS_URL=redis://...

# Optional - Monitoring
LOG_LEVEL=info
```

### Build Configuration

**Verify next.config.ts:**

```typescript
export default {
  // Enable SWR caching for API responses
  swrConfig: {
    revalidate: 60, // Revalidate every 60 seconds
  },

  // Configure headers for security
  async headers() {
    return [
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.oaistatic.com",
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },

  // Optimize images
  images: {
    optimization: true,
  },
};
```

### Build & Test

```bash
# 1. Build for production
npm run build

# 2. Start production server locally
npm run start

# 3. Test on http://localhost:3000
# - Verify chat works
# - Check API responses
# - Test error handling

# 4. Check build output
ls -lah .next/
```

---

## Deployment to Vercel

Vercel is recommended for Next.js applications.

### Step 1: Connect GitHub Repository

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub account
3. Click "New Project"
4. Select your Dark Nebula repository
5. Click "Import"

### Step 2: Configure Environment Variables

1. In Vercel dashboard, go to project settings
2. Click "Environment Variables"
3. Add all variables from `.env.production`:

```
OPENAI_API_KEY = sk_...
NODE_ENV = production
NEXT_PUBLIC_SITE_URL = https://yourdomain.com
```

**Important:** Mark sensitive variables (API keys) as secrets.

### Step 3: Configure Build Settings

Default settings should work, but verify:

- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Node Version**: 18.x or higher

### Step 4: Custom Domain (Optional)

1. In Vercel project settings
2. Click "Domains"
3. Add custom domain: `yourdomain.com`
4. Follow DNS configuration instructions
5. Wait for SSL certificate (5-15 minutes)

### Step 5: Deploy

```bash
# Push to main branch triggers automatic deployment
git add .
git commit -m "Deploy chatbot to production"
git push origin main

# Monitor deployment in Vercel dashboard
# Deployment should complete in 2-5 minutes
```

### Step 6: Verify Production Deployment

```bash
# Test chat on production URL
curl -X GET https://yourdomain.com/api/chat

# Expected response: 200 OK with status

# Send test message
curl -X POST https://yourdomain.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello, testing production",
    "conversationHistory": [],
    "context": {}
  }'
```

### Vercel Production Tips

**Enable Preview Deployments:**
- Create Pull Requests to deploy to preview URL
- Test changes before merging to main
- Each PR gets unique URL: `pr-123--yourdomain.vercel.app`

**Configure Analytics:**
```bash
# In vercel.json or next.config.ts
{
  "analytics": {
    "enabled": true
  }
}
```

**Enable Performance Monitoring:**
- Vercel automatically tracks Core Web Vitals
- View metrics in Vercel dashboard
- Set up alerts for degradation

---

## Self-Hosted Deployment

### Option A: Docker (Recommended)

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["npm", "start"]
```

Create `.dockerignore`:

```
node_modules
.next
.env.local
.git
.gitignore
README.md
```

Build and run:

```bash
# Build image
docker build -t dark-nebula-chatbot:latest .

# Run container
docker run -d \
  --name dark-nebula-chatbot \
  -p 3000:3000 \
  -e OPENAI_API_KEY=sk_... \
  -e NODE_ENV=production \
  dark-nebula-chatbot:latest

# Verify
curl http://localhost:3000/api/chat
```

### Option B: Traditional VPS (Ubuntu)

```bash
# 1. SSH into server
ssh user@your-server.com

# 2. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Clone repository
git clone https://github.com/yourusername/dark-nebula-website.git
cd dark-nebula-website

# 4. Install dependencies
npm install

# 5. Create .env.production with secrets
cp .env.local.example .env.production
# Edit .env.production with actual values
nano .env.production

# 6. Build application
npm run build

# 7. Start with PM2 (process manager)
npm install -g pm2
pm2 start npm --name "dark-nebula" -- start
pm2 save
pm2 startup

# 8. Setup Nginx reverse proxy
sudo apt-get install nginx
sudo nano /etc/nginx/sites-available/default
```

Configure Nginx (`/etc/nginx/sites-available/default`):

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # CORS headers if needed
        add_header 'Access-Control-Allow-Origin' '*';
    }

    location /api/chat {
        proxy_pass http://localhost:3000/api/chat;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

Enable HTTPS with Let's Encrypt:

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d yourdomain.com -d www.yourdomain.com
```

### Option C: AWS EC2

```bash
# 1. Launch EC2 instance (Ubuntu 22.04)
# Use t3.medium or larger for production

# 2. Configure security group
# Allow: 80 (HTTP), 443 (HTTPS), 22 (SSH)

# 3. SSH and follow VPS setup above

# 4. Create auto-scaling group for redundancy
# 5. Setup load balancer (ALB) for traffic distribution
# 6. Configure RDS if using database
```

---

## Production Monitoring

### Application Performance Monitoring (APM)

**Using Sentry (Error Tracking):**

```typescript
// pages/_document.tsx
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
  integrations: [
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
});
```

**Using DataDog (Full Monitoring):**

```typescript
// lib/datadog.ts
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
  applicationId: process.env.NEXT_PUBLIC_DD_APPLICATION_ID,
  clientToken: process.env.NEXT_PUBLIC_DD_CLIENT_TOKEN,
  site: 'datadoghq.com',
  service: 'dark-nebula-chatbot',
  env: process.env.NODE_ENV,
  sessionSampleRate: 100,
  sessionReplaySampleRate: 20,
  trackUserInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: 'mask-user-input',
});
```

### Health Checks

Create health check endpoint:

```typescript
// app/api/health/route.ts
export async function GET() {
  try {
    // Check database connection (if applicable)
    // const dbHealth = await checkDatabase();

    // Check API dependencies
    const openaiHealth = !!process.env.OPENAI_API_KEY;

    const health = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      services: {
        api: "ok",
        openai: openaiHealth ? "configured" : "not-configured",
        // database: dbHealth ? "ok" : "error",
      },
    };

    return Response.json(health, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        status: "unhealthy",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 503 }
    );
  }
}
```

Monitor with:

```bash
# Check health every 5 minutes
watch -n 300 'curl https://yourdomain.com/api/health'
```

### Logging

Setup structured logging:

```typescript
// lib/logger.ts
const logLevel = process.env.LOG_LEVEL || "info";

export const logger = {
  info: (message: string, data?: any) => {
    console.log(JSON.stringify({
      level: "info",
      message,
      timestamp: new Date().toISOString(),
      data,
    }));
  },
  error: (message: string, error?: any) => {
    console.error(JSON.stringify({
      level: "error",
      message,
      error: error instanceof Error ? error.message : error,
      timestamp: new Date().toISOString(),
    }));
  },
  warn: (message: string, data?: any) => {
    console.warn(JSON.stringify({
      level: "warn",
      message,
      timestamp: new Date().toISOString(),
      data,
    }));
  },
};
```

---

## Rollback Procedures

### Vercel Rollback

1. In Vercel dashboard, click "Deployments"
2. Find previous working deployment
3. Click "..." menu → "Promote to Production"
4. Deployment rolls back within 2-3 minutes

### Docker Rollback

```bash
# 1. Stop current container
docker stop dark-nebula-chatbot

# 2. Remove current container
docker rm dark-nebula-chatbot

# 3. Run previous version
docker run -d \
  --name dark-nebula-chatbot \
  -p 3000:3000 \
  -e OPENAI_API_KEY=sk_... \
  dark-nebula-chatbot:v1.0.0

# 4. Verify
curl http://localhost:3000/api/chat
```

### Git Rollback

```bash
# 1. Identify problematic commit
git log --oneline -10

# 2. Revert to previous commit
git revert HEAD
# or
git reset --hard <commit-hash>

# 3. Push to trigger redeploy
git push origin main
```

---

## Performance Optimization

### Database Query Optimization

```typescript
// app/api/chat/route.ts - Add caching
export const revalidate = 60; // Revalidate every 60 seconds

// Cache pricing database
const PRICING_CACHE = new Map();

function getPricingEstimate(projectType: string) {
  const cacheKey = `pricing_${projectType}`;
  
  if (PRICING_CACHE.has(cacheKey)) {
    return PRICING_CACHE.get(cacheKey);
  }

  const estimate = calculatePricing(projectType);
  PRICING_CACHE.set(cacheKey, estimate);
  
  return estimate;
}
```

### API Response Caching

```typescript
// Add cache headers to API responses
export async function POST(request: Request) {
  const response = new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=60', // Cache for 60 seconds
    },
  });

  return response;
}
```

### Image Optimization

```typescript
// next.config.ts
export default {
  images: {
    optimization: true,
    formats: ['image/avif', 'image/webp'],
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  },
};
```

### Bundle Size Reduction

```bash
# Analyze bundle size
npm install --save-dev @next/bundle-analyzer

# Generate report
ANALYZE=true npm run build
```

---

## Security Hardening

### Input Validation

```typescript
// lib/validation.ts
import { z } from 'zod';

export const chatRequestSchema = z.object({
  message: z.string().min(1).max(1000),
  conversationHistory: z.array(z.any()).optional(),
  context: z.record(z.string()).optional(),
});

// In route handler
const parsed = chatRequestSchema.parse(request.body);
```

### Rate Limiting

```typescript
// middleware.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 h'), // 10 requests per hour
});

export async function middleware(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new Response('Too Many Requests', { status: 429 });
  }
}
```

### CORS Configuration

```typescript
// app/api/chat/route.ts
const ALLOWED_ORIGINS = [
  'https://yourdomain.com',
  'https://www.yourdomain.com',
];

function setCORSHeaders(request: Request) {
  const origin = request.headers.get('origin');
  
  if (ALLOWED_ORIGINS.includes(origin || '')) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
  }
  
  return {};
}
```

### Environment Variable Security

**Never commit secrets:**

```bash
# .gitignore
.env.local
.env.production
.env.*.local
```

**Use secret management:**

```bash
# Vercel secrets
vercel secrets add OPENAI_API_KEY sk_...

# GitHub secrets (for CI/CD)
# Settings > Secrets and variables > Actions
```

---

## Post-Deployment Verification

### Functional Tests

```bash
# 1. Test chat API
curl -X POST https://yourdomain.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello", "conversationHistory": [], "context": {}}'

# 2. Test health endpoint
curl https://yourdomain.com/api/health

# 3. Verify UI loads
curl https://yourdomain.com | grep -q "ChatBot" && echo "UI OK"
```

### Performance Baseline

```bash
# Using Lighthouse
npm install -g lighthouse
lighthouse https://yourdomain.com \
  --view \
  --output-path=./lighthouse-report.html

# Check metrics:
# - First Contentful Paint < 1.8s
# - Largest Contentful Paint < 2.5s
# - Cumulative Layout Shift < 0.1
```

### Monitor Logs

```bash
# Vercel
vercel logs --follow

# Self-hosted
tail -f /var/log/syslog
# or with Docker
docker logs -f dark-nebula-chatbot
```

---

## Maintenance

### Regular Updates

```bash
# Monthly security updates
npm audit
npm audit fix

# Update dependencies
npm update

# Test thoroughly
npm test
npm run build

# Deploy
git push origin main
```

### Backup Strategy

```bash
# Backup database (if applicable)
# Daily automated backups via cloud provider
# Keep 30-day retention

# Backup configurations
# Store .env.production securely
# Use Vercel or cloud provider secret manager
```

### Monitoring Alerts

Setup alerts for:
- API response time > 2s
- Error rate > 1%
- Uptime < 99.5%
- Disk usage > 80%
- CPU usage > 80%

---

## Troubleshooting Production Issues

### Issue: Chat API returns 500 errors

```bash
# 1. Check logs
vercel logs --filter status=500

# 2. Verify API key
echo $OPENAI_API_KEY | grep -q "sk_" && echo "Key OK"

# 3. Test OpenAI API directly
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"

# 4. Check rate limits
# If rate limited, wait before retrying
```

### Issue: Slow response times

```bash
# 1. Check API latency
curl -w "@curl-format.txt" -o /dev/null -s https://yourdomain.com/api/chat

# 2. Monitor OpenAI API status
# https://status.openai.com/

# 3. Optimize query
# Reduce max_tokens if too large
# Check conversation history length
```

### Issue: High resource usage

```bash
# 1. Check process status
ps aux | grep node

# 2. Monitor memory
free -m

# 3. Check disk usage
df -h

# 4. Restart service if needed
systemctl restart dark-nebula-chatbot
# or
pm2 restart dark-nebula
```

---

## Support & Escalation

For issues beyond this guide:

1. **Check Vercel/AWS documentation**
2. **Review OpenAI API docs**
3. **Contact cloud provider support**
4. **Reference application logs**
5. **Open GitHub issue for bugs**

Remember: Always test changes in a staging environment before deploying to production.
