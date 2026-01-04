# Vercel Deployment Guide

## Steps to Deploy to Vercel

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```
This will open a browser to authenticate your account.

### 3. Deploy the Project
```bash
vercel
```
Or to deploy with production settings:
```bash
vercel --prod
```

### 4. Configure Environment Variables in Vercel Dashboard

After deployment, go to your Vercel dashboard:
1. Select your project (`weather-app`)
2. Go to **Settings** → **Environment Variables**
3. Add the following environment variables:

| Name | Value |
|------|-------|
| `VITE_WEATHER_API_KEY` | `fe75be4442b1a9adcb529a89466a0127` |
| `VITE_WEATHER_API_BASE_URL` | `https://api.openweathermap.org/data/2.5` |

### 5. Redeploy with Environment Variables
```bash
vercel --prod
```

## Alternative: One-Click Deployment

Click the button below to deploy directly to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdhante-deleon%2Fweather-app)

## Vercel Configuration (vercel.json)

The project uses default Vite settings which Vercel automatically detects. No additional configuration is needed.

## Environment Variables Setup

### For Production:
Set these environment variables in your Vercel project settings:
- `VITE_WEATHER_API_KEY` - Your OpenWeatherMap API key
- `VITE_WEATHER_API_BASE_URL` - https://api.openweathermap.org/data/2.5

### Important Notes:
1. **API Key**: Make sure your OpenWeatherMap API key is activated (it takes 10-15 minutes after generation)
2. **HTTPS**: Vercel automatically provides HTTPS for your domain
3. **Builds**: The project builds with `npm run build`
4. **Node Version**: Uses Node 18+ (default on Vercel)

## Testing the Deployment

After deployment:
1. Visit your Vercel URL (e.g., `https://weather-app-xxxx.vercel.app`)
2. The app should load with your API key
3. Search for a city to test the API integration
4. Test geolocation functionality
5. Test dark mode toggle

## Troubleshooting

### API Key Not Working (401 Error)
- Verify the API key is activated on OpenWeatherMap
- Check that the API key is correctly set in Vercel environment variables
- Redeploy after updating environment variables

### Build Fails
- Check that all dependencies are installed: `npm install`
- Verify TypeScript compilation: `npm run build`
- Clear cache and redeploy: `vercel --prod --force`

### App Not Loading
- Check the browser console for errors (F12)
- Verify environment variables are set in Vercel dashboard
- Check the deployment logs in Vercel dashboard

## Domain Setup

To use a custom domain:
1. Go to Vercel Dashboard → Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Next Steps

- Monitor analytics in Vercel dashboard
- Set up automatic deployments from GitHub
- Monitor API usage and costs
