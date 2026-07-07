# Kinetic Groq Visualizer 🌊🔊

A hyper-optimized, client-side WebGL kinetic typography engine. This project synchronizes word-level audio transcriptions with a 3D audio-reactive wave field in real-time. 

Built to run lean and mean with a minimal memory footprint, the backend relies on a lightweight Edge Function to pipe audio directly to Groq's LPU cluster for near-instant transcription, while the frontend handles complex WebGL matrix math and DOM manipulation through a unified synchronization loop.

## ⚡ Features

- **True Word-Level Sync:** Utilizes Groq's `whisper-large-v3` to map transcriptions down to the exact millisecond.
- **Dynamic Sliding Viewport:** DOM updates are highly optimized to shift the kinetic text matrix, keeping the active token locked dead-center in focus.
- **Audio-Reactive WebGL Mesh:** Uses the HTML5 `Web Audio API` (Fast Fourier Transform) to sample low-end frequencies and warp the vertex geometry of a Three.js 3D wave field in real-time.
- **Zero-Dependency Core:** The frontend engine is built entirely in Vanilla JS to prevent framework overhead, importing only `Three.js` via CDN for the particle system.
- **Serverless Edge Architecture:** Built specifically for Vercel Edge Runtime (V8 isolates) to ensure 0ms cold starts and bypass standard serverless memory limits.

## 🛠️ Tech Stack

- **Frontend:** Vanilla JavaScript, HTML5 Canvas, Web Audio API
- **3D Rendering:** Three.js (WebGL)
- **Backend:** Vercel Edge Functions
- **AI / API:** Groq (Whisper-Large-V3)

## 🚀 Quick Start & Deployment

This project is structured for instant zero-config deployment on Vercel.

### 1. Local Setup
Clone the repository to your local machine:
```bash
git clone [https://github.com/your-username/kinetic-groq-visualizer.git](https://github.com/your-username/kinetic-groq-visualizer.git)
cd kinetic-groq-visualizer
