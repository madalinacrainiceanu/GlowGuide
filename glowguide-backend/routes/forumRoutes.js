const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');

// Rute pt Admin (Moderare) — TREBUIE înainte de /:id !
router.get('/admin/in-asteptare', forumController.getPostariInAsteptare);
router.put('/admin/moderare/:id', forumController.modereazaPostare);

// Rute pt Membri
router.post('/adauga', forumController.creeazaPostare);
router.get('/feed', forumController.getPostariPublicate);
router.post('/:postareId/reply', forumController.adaugaReply);
router.get('/:id', forumController.getPostareCuReplies);

module.exports = router;
