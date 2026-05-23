const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/trimite-cod', authController.trimiteCodul);
router.post('/verifica-cod', authController.verificaCod);
router.post('/login', authController.login);
router.get('/cont/:membruId', authController.getContMeu);
router.get('/profil-public/:membruId', authController.getProfilPublic);
router.put('/editare-nume', authController.editareNume);
router.put('/schimba-parola', authController.schimbaParola);
router.delete('/sterge-cont', authController.stergeCont);

module.exports = router;
