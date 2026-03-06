const express = require('express');
const router = express.Router();
const rutinaController = require('../controllers/rutinaController');

router.post('/genereaza', rutinaController.genereazaRutina);
router.post('/salveaza-profil', rutinaController.salveazaProfil); // <-- Asta ai adăugat

module.exports = router;
