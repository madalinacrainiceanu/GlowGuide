const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const jwt = require('jsonwebtoken');

// Middleware: verifică dacă token-ul JWT aparține unui admin
const verificaAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ eroare: 'Token lipsă.' });
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.rol !== 'admin') return res.status(403).json({ eroare: 'Acces interzis. Doar adminii pot efectua această acțiune.' });
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ eroare: 'Token invalid sau expirat.' });
    }
};

// Rute pt Admin (Moderare) — TREBUIE înainte de /:id !
router.get('/admin/in-asteptare', verificaAdmin, forumController.getPostariInAsteptare);
router.get('/admin/numar-asteptare', verificaAdmin, forumController.numarInAsteptare);
router.put('/admin/moderare/:id', verificaAdmin, forumController.modereazaPostare);

// Rute pt Membri
router.post('/adauga', forumController.creeazaPostare);
router.get('/feed', forumController.getPostariPublicate);
router.post('/:postareId/like', forumController.toggleLike);
router.post('/:postareId/reply', forumController.adaugaReply);
router.get('/:id', forumController.getPostareCuReplies);

module.exports = router;
