# GlowGuide

GlowGuide is a full-stack web application for personalized skincare routines.

The platform analyzes a user's skin profile and recommends a customized skincare routine using rule-based logic. It also includes progress tracking, data visualization, a moderated community forum and an AI-assisted skincare chatbot.

## Live Demo

[Try GlowGuide](https://licenta-theta.vercel.app )

## Features

- Skin profile questionnaire
- Personalized skincare routine generation
- Rule-based product recommendations
- Daily progress journal
- Progress charts and data visualization
- Community forum and moderation
- Public user profiles
- User authentication and authorization
- FAQ-based chatbot with an OpenAI fallback

## Application Architecture

```text
React + Vite frontend
          |
          | REST API / Axios
          v
Node.js + Express backend
          |
          | Sequelize ORM
          v
MySQL database
Technologies
Frontend
React
Vite
React Router
Axios
Chart.js
react-chartjs-2
Backend
Node.js
Express
Sequelize
MySQL
JWT
bcryptjs
Nodemailer
Cloudinary
OpenAI API
Deployment
Vercel for the frontend
Railway for the backend and database
Project Structure
text
GlowGuide/
├── glowguide-frontend/    # React and Vite frontend
├── glowguide-backend/     # Node.js and Express REST API
├── docs/                  # Technical documentation
└── README.md
Getting Started
Prerequisites
Node.js
npm
MySQL
Clone the repository
Bash
git clone https://github.com/madalinacrainiceanu/GlowGuide.git
cd GlowGuide
Run the backend
Bash
cd glowguide-backend
npm install
Create a local .env file based on .env.example and add your own local configuration.
On Windows PowerShell:
powershell
Copy-Item .env.example .env
Start the backend:
Bash
npm run dev
Run the frontend
Open a second terminal:
Bash
cd glowguide-frontend
npm install
npm run dev
Environment Variables
The backend uses environment variables for local configuration and secrets:
text
PORT
DB_HOST
DB_USER
DB_PASSWORD
DB_NAME
JWT_SECRET
OPENAI_API_KEY
EMAIL_USER
EMAIL_PASS
Real credentials, API keys and production configuration files must not be committed to the repository.
Technical Highlights
Full-stack application with separate frontend and backend
Relational database design with MySQL and Sequelize
JWT authentication and bcrypt password hashing
Rule-based personalized skincare recommendations
Progress tracking with Chart.js
Moderated community forum
FAQ-based chatbot with an OpenAI fallback
Deployment on Vercel and Railway
My Contribution
I contributed to:
full-stack application development;
relational database design;
REST API implementation;
authentication and authorization;
personalized recommendation logic;
frontend pages and navigation;
progress tracking and data visualization;
chatbot integration;
forum and moderation functionality;
deployment configuration.
Future Improvements
Add automated unit and integration tests;
add API request validation;
improve error handling;
restrict CORS to trusted production origins;
add CI/CD checks;
improve accessibility;
improve recommendation explainability;
add database migrations;
add a sanitized demo seed script.
Disclaimer
GlowGuide provides general skincare information and is not a substitute for professional medical advice or consultation with a qualified dermatologist.
Author
Mădălina Crăiniceanu