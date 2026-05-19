# Scent Match ✨

AI-powered fragrance recommendation service based on a user's perfume collection.

Users can search fragrances, build a personal shelf, and receive personalized perfume recommendations generated with LLMs.

## Demo

Live demo: https://scent-match-three.vercel.app/

## Features

- Authentication
- Fragrance search with fuzzy matching
- Personal fragrance shelf
- AI-generated recommendations
- Persistent user data with Supabase
- Responsive UI

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- TailwindCSS
- Zustand

### Backend / Services

- Vercel Serverless Functions
- OpenRouter API
- Supabase

## Architecture

The project uses:

- feature-oriented structure inspired by FSD
- shared UI primitives with shadcn/ui
- serverless API routes for secure LLM requests

## Local Development

```bash
npm install
npx vercel dev
```
