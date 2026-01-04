# WeatherApp - Quick Reference Card

## 🚀 Start Development

```bash
npm run dev
# → http://localhost:5173/
```

## 📝 Configuration

```bash
# 1. Copy template
cp .env.example .env.local

# 2. Add your API key
VITE_WEATHER_API_KEY=your_key_here
```

## 📁 Key Files

| Path | Purpose |
|------|---------|
| `src/App.tsx` | Main app component |
| `src/components/` | UI components |
| `src/context/WeatherContext.tsx` | Global state |
| `src/services/weatherService.ts` | API calls |
| `tailwind.config.js` | Styling config |

## 🎨 Component Map

```
App
├── Header (theme, unit toggle)
├── SearchBar (city search)
├── WeatherCard (current weather)
├── ForecastList (7-day forecast)
└── Footer (links)
```

## 🔧 Common Tasks

### Add New Component
1. Create `src/components/MyComponent.tsx`
2. Export from `src/components/index.ts`
3. Import and use in `App.tsx`

### Add API Endpoint
1. Add method to `weatherService.ts`
2. Update types in `weatherService.ts`
3. Use in component with `useEffect`

### Style with Tailwind
```tsx
<div className="bg-blue-500 hover:bg-blue-600 transition-colors">
  Styled with Tailwind
</div>
```

### Manage Global State
```tsx
const { isDarkMode, toggleDarkMode } = useWeatherContext();
```

## 📊 API Endpoints

```
Current Weather
GET /weather?q={city}&units=metric&appid={key}

Forecast (5 days)
GET /forecast?lat={lat}&lon={lon}&units=metric&appid={key}

By Coordinates
GET /weather?lat={lat}&lon={lon}&units=metric&appid={key}
```

## 🐛 Debug Tips

### Check API Calls
- DevTools → Network tab → Filter "openweathermap"
- Check response status and data

### Debug State
```tsx
const ctx = useWeatherContext();
console.log('Current state:', ctx);
```

### CSS Issues
- Check Tailwind class names
- Verify `index.css` has `@import "tailwindcss"`
- Restart dev server

### TypeScript Errors
```bash
npm run type-check
```

## 📦 Build & Deploy

```bash
# Build for production
npm run build
# → Creates dist/ folder

# Deploy dist/ to:
# - Netlify (automatic from repo)
# - Vercel (automatic from repo)
# - GitHub Pages (push dist/)
# - Firebase Hosting (firebase deploy)
```

## 🌐 Live URLs After Deploy

```
Production: https://your-domain.com
Development: http://localhost:5173/
Preview: npm run preview
```

## 💾 Save & Persist

### Theme Preference
- Saved in localStorage via Context
- Key: `darkMode`

### Temperature Unit
- Saved in localStorage via Context
- Key: `temperatureUnit`

### Recent Searches
- Saved in localStorage via Context
- Key: `recentSearches` (max 5)

## 🔑 API Key

### Where to Get
1. https://openweathermap.org
2. Sign up (free)
3. API Keys section
4. Copy default key

### Where to Put
→ `.env.local` file
```
VITE_WEATHER_API_KEY=paste_here
```

### Security
⚠️ Never commit `.env.local`
✅ Always use `.env.example` template

## 📱 Responsive Breakpoints

```css
Mobile:   < 640px  (sm)
Tablet:   640px    (md)
Desktop:  1024px   (lg)
```

All components mobile-first!

## 🎯 Performance Checklist

- [ ] Images optimized
- [ ] Bundle < 300KB gzipped
- [ ] API calls minimized
- [ ] No console errors
- [ ] Lighthouse > 90

## 🚢 Pre-Deploy Checklist

- [ ] `npm run build` succeeds
- [ ] No TypeScript errors
- [ ] No console warnings
- [ ] API key configured
- [ ] `.env.local` in `.gitignore`
- [ ] Test on mobile
- [ ] Test dark mode
- [ ] Test search function

## 📚 Documentation

| Doc | Content |
|-----|---------|
| README.md | Full details |
| SETUP_GUIDE.md | Installation |
| PROJECT_SUMMARY.md | Features list |
| API_DOCUMENTATION.md | API guide |
| DEVELOPMENT_CHECKLIST.md | Testing/deploy |
| GETTING_STARTED.md | Quick start |

## 🆘 Troubleshooting

### Port 5173 in use?
```bash
npm run dev -- --port 3000
```

### API key not working?
- Check key is from OpenWeatherMap
- Ensure key is active
- Check rate limits (60/min free)

### Styles not showing?
- Restart dev server
- Check Tailwind config
- Verify `@import "tailwindcss"` in CSS

### Geolocation not working?
- Check browser permissions
- HTTPS required for production
- Falls back to London automatically

## 🎨 Tailwind Classes Used

```tsx
// Layout
flex, flex-col, grid, gap-4, w-full, max-w-2xl

// Spacing
p-4, m-4, my-8, px-6

// Colors
bg-blue-500, text-white, dark:bg-gray-800

// Typography
text-2xl, font-bold, leading-relaxed

// Responsive
sm:, md:, lg:, mobile-first

// Effects
hover:, transition-all, duration-300, rounded-lg
```

## 🔗 External Links

- API Docs: https://openweathermap.org/api
- React: https://react.dev
- Tailwind: https://tailwindcss.com
- TypeScript: https://www.typescriptlang.org

## 📋 File Sizes

```
dist/index.html        0.46 KB
dist/index.css        ~30 KB (5.8 KB gzip)
dist/index.js        ~255 KB (82 KB gzip)
```

## ✨ Features Summary

✅ Geolocation detection
✅ City search worldwide
✅ 7-day forecast
✅ Dark/light mode
✅ C/F temperature units
✅ Recent searches saved
✅ Responsive design
✅ Loading states
✅ Error handling
✅ Production ready

## 🎯 Version Info

```
React: 18.3.1
TypeScript: 5.7.0
Tailwind CSS: Latest
Vite: 7.3.0
Node: 18+
npm: Latest
```

## 📞 Support Resources

1. **Error in code?** → Check console (F12)
2. **API not working?** → See API_DOCUMENTATION.md
3. **Styling issues?** → Check Tailwind classes
4. **Deployment help?** → See DEVELOPMENT_CHECKLIST.md

---

**Last Updated**: January 4, 2026  
**Status**: Ready to Deploy ✅  
**Next Step**: `npm run dev` 🚀
