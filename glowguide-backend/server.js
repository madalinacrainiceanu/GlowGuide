const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./db');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rute
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const rutinaRoutes = require('./routes/rutinaRoutes');
app.use('/api/rutina', rutinaRoutes);
const chatbotRoutes = require('./routes/chatbotRoutes');
app.use('/api/chatbot', chatbotRoutes);
const jurnalRoutes = require('./routes/jurnalRoutes');
app.use('/api/jurnal', jurnalRoutes);
const forumRoutes = require('./routes/forumRoutes');
app.use('/api/forum', forumRoutes);
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);




// O rută de test simplă
app.get('/api/test', (req, res) => {
  res.json({ mesaj: '🚀 Serverul GlowGuide funcționează perfect!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serverul rulează pe http://localhost:${PORT}`);
});
