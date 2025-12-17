# 🚀 Quick Start Guide

## Installation & Running

Open your terminal and run these commands:

```bash
# Navigate to project directory
cd "C:\Users\L052741\OneDrive - Eli Lilly and Company\Desktop\christmas-tree-3d"

# Install dependencies (this may take a few minutes)
npm install

# Start the development server
npm run dev
```

After running `npm run dev`, you should see:

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

Open your browser and go to **http://localhost:3000**

## First Time Setup

1. **Allow Camera Access**: When prompted, click "Allow" to enable gesture control
2. **Position Yourself**: Sit about 2-3 feet from your webcam
3. **Test Gestures**:
   - Make a fist → Watch the tree form
   - Open your hand → Watch it explode
   - Move your open hand left/right → Rotate the scene

## Controls Summary

| Input | Action |
|-------|--------|
| 🖱️ Mouse Click | Toggle Tree ↔ Explode |
| ✊ Pinch/Fist | Gather into Tree |
| 🤚 Open Palm | Explode particles |
| 👋 Hand Movement | Rotate scene |

## Troubleshooting

**Port 3000 already in use?**
```bash
# Kill the process using port 3000 (Windows)
npx kill-port 3000

# Or use a different port
npm run dev -- --port 3001
```

**Camera not detected?**
- Check browser permissions in browser settings
- Ensure no other app is using the camera
- Try refreshing the page

**Performance issues?**
- Close other browser tabs
- Try Chrome or Edge (best WebGL support)
- Reduce particle count in the code (see README.md)

## Next Steps

- Read [README.md](README.md) for full documentation
- Customize colors and effects in component files
- Adjust particle counts for your hardware

---

Enjoy your Pink Dream Christmas Tree! 🎄✨
