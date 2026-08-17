# AquaSentinel

Groundwater monitoring dashboard monorepo.

## Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (version 1.x recommended)
- Node.js (v20+ recommended)

### Installation
```bash
bun install
```

### Development
- **Backend**: `bun run dev:backend`
- **Frontend**: `cd frontend && bun run dev`

## Workspace Structure
- `backend/`: Hono API server
- `frontend/`: React + Vite + Tailwind frontend
- `shared/`: Shared TypeScript types and schemas
- `scripts/`: Utility scripts
- `docs/`: Project documentation

## CI/CD
Automated pipelines are configured in `.github/workflows/ci.yml`.

## Deployment
### Jal Dristhi (Streamlit System)
- **Platform**: [Streamlit Community Cloud](https://share.streamlit.app/)
- **Instructions**: Refer to `GROUNDWATER_PREDICITION_SYSTEM/README.md`.

### AquaSentinel Monorepo
- **Frontend (React/Vite)**: Recommended for Vercel or Netlify.
- **Backend (Hono)**: Recommended for Cloudflare Workers, Render, or Fly.io.
- **Production Build**:
  - Run `bun run build` from the root to build the backend.
  - Run `cd frontend && bun run build` to build the frontend.

