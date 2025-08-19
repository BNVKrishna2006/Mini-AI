# AI Compare (Mobile-first, Free-Friendly)

A mobile-optimized web app to compare AI responses side-by-side with toggles, file uploads, downloads, and dark/light mode.

## Features
- Single sticky input bar (rounded), uploads, and Ask button
- Parallel responses from ChatGPT, Perplexity, Gemini, Groq, DeepSeek (providers mode)
- Optional Ollama-compatible fallback (ollama mode) using a public endpoint
- Elegant cards with smooth animations and downloads
- Fully responsive (mobile/tablet/desktop)

## Quick Start (Mobile + Free)
1) Upload this ZIP to Vercel (New Project → Upload).
2) Set environment variables:
   - MODE = providers
   - GROQ_API_KEY and/or GOOGLE_API_KEY to start free
   - Add OPENAI_API_KEY, PPLX_API_KEY, DEEPSEEK_API_KEY later
3) Deploy and open the URL on phone. Add to Home Screen.

## Zero Keys (Optional)
- MODE = ollama
- OLLAMA_BASE = a public Ollama-compatible endpoint URL
- Redeploy

## Notes
- Uploads store a temporary copy and read a short text preview (≈4,000 chars).
- For large PDFs/DOCX, consider adding parsers later (pdf-parse, mammoth).