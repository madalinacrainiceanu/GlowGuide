# GlowGuide Frontend

The frontend of GlowGuide is a React and Vite application for managing personalized skincare routines, progress tracking and community interactions.

## What the frontend includes

- Landing page and application navigation
- User registration and login
- Skin profile questionnaire
- Personalized skincare routine display
- Progress journal and charts
- Community forum
- Public user profiles
- Administration and moderation screens
- Chatbot interface

## Technology stack

- React
- Vite
- React Router
- Axios
- Chart.js
- react-chartjs-2

## Getting started

From the `glowguide-frontend` directory, install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run the linter:

```bash
npm run lint
```

## Backend connection

The frontend communicates with the GlowGuide backend through a REST API using Axios. Make sure the backend is running and that the API configuration in the frontend points to the correct local or production backend URL.

## Project structure

```text
src/
├── components/    # Reusable interface components
├── pages/         # Main application pages
├── api.js         # API configuration
├── App.jsx        # Application routes
└── main.jsx       # React entry point
```

## Deployment

The frontend is configured for deployment on Vercel.
