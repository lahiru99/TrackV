# TrackVault

Minimal audio library for uploading and playing tracks. Built on Next.js 14 (App Router), React 18, Tailwind CSS, and shadcn/ui. Storage is mocked (localStorage) for a frictionless demo.

## What’s new

- Centered, minimalist layout
- Drag‑to‑reorder tracks with subtle hover tilt (Framer Motion)
- Animated delete with red‑hover bin
- Simplified upload: "Add to tracks" (no folders) with success bounce
- Audio player vinyl motif (spinning disc on play)
- Skeleton loaders and empty states
- Quick page curtain transition between views
- Sliding “pill” tab highlight with smooth motion
- Centered brand title and balanced header layout
- Hover‑only brand glitch on the "TrackVault" title

## Tech

- Next.js 14 App Router, React 18, TypeScript
- Tailwind CSS, shadcn/ui, Framer Motion
- Mock Firebase utils (localStorage) for demo persistence

## Getting started

1. Install

```bash
npm install
```

2. Run

```bash
npm run dev
```

Open `http://localhost:3000`.

## Deploying on Vercel

This repo works out‑of‑the‑box with no required environment variables. Optional API routes for OpenAI/Anthropic/Replicate/Deepgram are included but not required.

- The transcription endpoint at `src/app/api/openai/transcribe/route.ts` is disabled by default to avoid build‑time secrets. If you want it, set `OPENAI_API_KEY` and replace the stub with a proper implementation.

## Project structure

- `src/app` — App Router pages and `layout.tsx`
- `src/app/components` — App components (`FileUpload`, `AudioPlayer`, `TrackList`)
- `src/components` — Reusable UI/FX (`HoverTilt`, `DynamicShadow`, `GlitchText`, `PageCurtain`)
- `src/components/ui` — shadcn/ui primitives
- `src/lib` — Helpers and mock storage

## Notes

This app uses a mock storage backend for simplicity. Uploaded files persist per‑browser and aren’t shared across devices.

## License

MIT
