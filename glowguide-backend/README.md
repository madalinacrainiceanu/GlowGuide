# GlowGuide Backend

The GlowGuide backend is a Node.js and Express REST API connected to a MySQL database through Sequelize. It manages authentication, user data, skincare routines, progress tracking and community features.

## Main responsibilities

- User registration and login
- JWT authentication and authorization
- User profile management
- Personalized skincare routine generation
- Progress journal management
- Forum posts and replies
- Forum moderation
- Public user profiles
- Chatbot requests
- MySQL database persistence

## Technology stack

- Node.js
- Express
- Sequelize
- MySQL
- JWT
- bcryptjs
- Nodemailer
- Cloudinary
- OpenAI API

## Getting started

From the `glowguide-backend` directory, install the dependencies:

```bash
npm install
```

Create a local environment file from the provided template:

```powershell
Copy-Item .env.example .env
```

Complete the values in `.env` with your local configuration, then start the development server:

```bash
npm run dev
```

To start the server without nodemon, use:

```bash
npm start
```

## Environment variables

The backend uses the following variables:

```text
PORT=5000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=glowguide_db
JWT_SECRET=your_jwt_secret_here
OPENAI_API_KEY=your_openai_api_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

Use `.env.example` as a reference. Do not commit real credentials or API keys to the repository.

## Main API areas

```text
/api/auth
/api/rutina
/api/jurnal
/api/forum
/api/chatbot
```

## Database

The application uses MySQL with Sequelize. Local development requires:

- a running MySQL server;
- a database created for the application;
- the database connection values configured in `.env`.

Additional SQL scripts and technical documentation are available in the repository's `docs` folder and in this directory.
