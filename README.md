# 🎄 Pink Dream Christmas Tree - Interactive 3D Experience

A highly interactive 3D web application featuring a pink-themed Christmas tree with advanced gesture controls, built with React 19, TypeScript, Three.js, and MediaPipe.

## ✨ Features

### Visual Design
- **7000+ Instanced Geometries** for optimal performance
  - 5000 pink octahedrons (tree leaves)
  - 1000 reflective cubes (decorations)
  - 1000 gem-like icosahedrons (ornaments)
  - 300 white tetrahedrons forming a spiral ribbon
- **Glowing Star Topper** with dynamic sparkles and pulsing animation
- **Dark Pink Background** (#050103) with Bloom post-processing effects
- **Metallic & Glossy Materials** with emissive lighting

### Interactive Features
- **Two Animation States:**
  - **TREE Mode**: All particles form a beautiful Christmas tree
  - **EXPLODE Mode**: Particles scatter into space
- **Mouse Click**: Toggle between TREE and EXPLODE states
- **Smooth Transitions**: Linear interpolation (lerp) for fluid animations
- **Continuous Rotation**: Tree slowly rotates in both states

### AI Gesture Control
- **Hand Tracking** via MediaPipe Hand Landmarker
- **Gestures:**
  - ✊ **Pinch/Grab**: Activate TREE mode (particles gather)
  - 🤚 **Open Hand**: Activate EXPLODE mode (particles scatter)
  - 👋 **Hand Movement**: Rotate scene when hand is open (high sensitivity)
- **Live Camera Preview**: Bottom-right corner with mirror flip
- **Custom Cursor**: Follows hand position with visual feedback

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+ and npm/yarn
- Modern web browser with WebGL support
- Webcam (for gesture control features)

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd "C:\Users\L052741\OneDrive - Eli Lilly and Company\Desktop\christmas-tree-3d"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Navigate to `http://localhost:3000`
   - Allow camera permissions when prompted

### Build for Production

```bash
npm run build
npm run preview
```

## 🎮 Usage

### Mouse Controls
- **Left Click anywhere**: Toggle between Tree and Explode modes

### Gesture Controls
1. **Enable Camera**: Allow camera access when prompted
2. **Position Your Hand**: Keep hand visible in the camera preview (bottom-right)
3. **Gestures:**
   - Make a fist or pinch gesture → Tree assembles
   - Open your palm wide → Tree explodes
   - Move your open hand left/right → Rotate the scene

## 🛠️ Technology Stack

- **React 19**: Latest React with improved performance
- **TypeScript**: Type-safe development
- **Three.js**: 3D graphics rendering
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Useful helpers (Sparkles, etc.)
- **@react-three/postprocessing**: Bloom effects
- **MediaPipe Tasks Vision**: Hand tracking and gesture recognition
- **TailwindCSS**: Utility-first styling
- **Vite**: Fast build tool and dev server

## 📁 Project Structure

```
christmas-tree-3d/
├── src/
│   ├── components/
│   │   ├── ChristmasTree.tsx       # Main tree component
│   │   ├── TreeLeaves.tsx          # Pink octahedrons
│   │   ├── TreeDecorations.tsx     # Cubes & icosahedrons
│   │   ├── SpiralRibbon.tsx        # Tetrahedron spiral
│   │   ├── StarTopper.tsx          # Glowing star with sparkles
│   │   ├── CameraController.tsx    # Camera management
│   │   └── GestureControl.tsx      # UI for gesture control
│   ├── hooks/
│   │   └── useHandGesture.ts       # MediaPipe integration
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🎨 Customization

### Adjust Particle Count
Edit the `COUNT` constants in component files:
- `TreeLeaves.tsx`: Line 11 (default: 5000)
- `TreeDecorations.tsx`: Lines 11-12 (default: 1000 each)
- `SpiralRibbon.tsx`: Line 11 (default: 300)

### Change Colors
Modify material colors in component files:
- Pink tones: `#FFB7C5`, `#FF69B4`
- White/Purple: `#E6E6FA`, `#DDA0DD`
- Gold star: `#FFD700`

### Adjust Bloom Intensity
In `App.tsx`, modify the Bloom component props:
```tsx
<Bloom
  intensity={2.0}      // Increase for stronger glow
  luminanceThreshold={0.2}
  luminanceSmoothing={0.9}
/>
```

## 🐛 Troubleshooting

**Camera not working:**
- Ensure browser has camera permissions
- Try HTTPS (some browsers require secure context)
- Check if another app is using the camera

**Performance issues:**
- Reduce particle counts in component files
- Lower Bloom quality settings
- Close other GPU-intensive applications

**Gestures not detected:**
- Ensure good lighting conditions
- Keep hand clearly visible in camera frame
- Try adjusting hand distance from camera

## 📝 License

This project is open source and available for educational purposes.

## 🙏 Credits

- Three.js community
- React Three Fiber team
- MediaPipe by Google
- TailwindCSS team

---

Built with ❤️ and lots of ✨ sparkles
