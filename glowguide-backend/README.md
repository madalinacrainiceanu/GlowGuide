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