# Deployment Guide

## Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Build and start
docker-compose up -d

# Stop
docker-compose down
```

### Using Docker directly

```bash
# Build the image
docker build -t mediguide-ai .

# Run the container
docker run -p 3000:3000 mediguide-ai
```

Access the application at: http://localhost:3000

## Manual Deployment

### Prerequisites
- Node.js 18 or higher
- npm 9 or higher

### Steps

1. **Install dependencies:**
```bash
npm install
```

2. **Build the application:**
```bash
npm run build
```

3. **Serve the build:**
```bash
npx serve -s dist -l 3000
```

## Deployment Platforms

### Vercel (Recommended for Frontend)

1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Netlify

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Run: `netlify deploy`
3. For production: `netlify deploy --prod`

### AWS/DigitalOcean/Other Cloud Providers

1. Build the project: `npm run build`
2. Upload the `dist/` folder to your server
3. Configure your web server (Nginx/Apache) to serve the static files

## Environment Variables

Make sure to set up environment variables on your deployment platform:
- Copy `.env.example` to `.env`
- Update `VITE_API_BASE_URL` to your backend API URL
- Add any other required variables

## Production Checklist

- [ ] Update API URLs to production endpoints
- [ ] Enable HTTPS
- [ ] Set up CORS on backend
- [ ] Configure proper caching headers
- [ ] Enable compression (gzip)
- [ ] Set up monitoring/analytics
- [ ] Test on multiple devices and browsers
