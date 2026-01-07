# React 19 + TypeScript + Vite + React Router + Tailwind

A modern, production-ready template for building full-stack React applications using React Router.

![Opis obrazka](./lighthouse.png)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

`node >= v22`

### Environment Variables

Before running the project, create a `.env` file based on the provided example:

```bash
cp .env.example .env
```

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

### Available Scripts

This template comes with several useful scripts for development, formatting, linting, type checking, and testing.

| Script           | Description                                                                                                 |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| `npm run tc`     | Run React Router type generation and TypeScript compiler checks (`react-router typegen && tsc`).            |
| `npm run lint`   | Run ESLint to check for code issues.                                                                        |
| `npm run format` | Format all code and styles using Prettier (`prettier --write 'app/**/*.{ts,tsx,js,jsx,json,css,scss,md}'`). |
| `npm run test`   | Run tests with Vitest (`vitest --config vite.config.test.ts`).                                              |
| `npm run test:f` | Run tests in update snapshot mode (`npm run test -- -u`).                                                   |

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

## Team members

[@thomson159](https://github.com/thomson159)

---
