# GlowGuide Frontend

React and Vite frontend for the GlowGuide personalized skincare platform.

## Responsibilities

The frontend provides:

- Landing page and application navigation;
- user registration and login;
- skin profile questionnaire;
- personalized skincare routine display;
- progress journal and charts;
- community forum;
- public user profiles;
- administration and moderation screens;
- chatbot interface.

## Technologies

- React
- Vite
- React Router
- Axios
- Chart.js
- react-chartjs-2

## Installation

From this directory, install the dependencies:

```bash
npm install
Development
Start the Vite development server:
Bash
npm run dev
Production Build
Create a production build:
Bash
npm run build
Preview the production build locally:
Bash
npm run preview
Run the linter:
Bash
npm run lint
Backend Connection
The frontend communicates with the GlowGuide backend through a REST API using Axios.
Make sure the backend is running and that the API URL configured in the frontend points to the correct local or production backend.
Project Structure
text
src/
├── components/    # Reusable interface components
├── pages/         # Application pages
├── api.js         # API configuration
├── App.jsx        # Application routes
└── main.jsx       # React entry point
Plain Text

Salvează și închide Notepad.

## 3. Creează README-ul backendului

Rulează:

```powershell
notepad .\glowguide-backend\README.md
Dacă Notepad întreabă dacă vrei să creezi fișierul, apasă Yes. Lipește:
Markdown
# GlowGuide Backend

REST API for the GlowGuide personalized skincare platform.

## Responsibilities

The backend provides:

- user registration and login;
- JWT authentication and authorization;
- user profile management;
- personalized skincare routine generation;
- progress journal management;
- forum posts and replies;
- forum moderation;
- public user profiles;
- chatbot requests;
- MySQL database persistence.

## Technologies

- Node.js
- Express
- Sequelize
- MySQL
- JWT
- bcryptjs
- Nodemailer
- Cloudinary
- OpenAI API

## Installation

From this directory, install the dependencies:

```bash
npm install
Create a local environment file from the example:
powershell
Copy-Item .env.example .env
Complete the values in .env with your own local configuration.
Development
Start the backend with automatic restart:
Bash
npm run dev
Production
Start the backend:
Bash
npm start
API Routes
The main API areas are:
text
/api/auth
/api/rutina
/api/jurnal
/api/forum
/api/chatbot
Database
The application uses MySQL with Sequelize.
Local development requires:
a running MySQL server;
a database created for the application;
the database variables configured in .env.
Database scripts for the FAQ, products and additional tables are available in this directory.