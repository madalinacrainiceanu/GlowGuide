const express = require('express');
const router = express.Router();
const jurnalController = require('../controllers/jurnalController');
const { upload } = require('../uploadMiddleware');

// Ruta pentru a salva o intrare (cu poză opțională)
router.post('/adauga', upload.single('poza'), jurnalController.adaugaIntrare);

// Ruta pentru a lua datele graficului (observă cum luăm id-ul membrului prin /:membruId)
router.get('/evolutie/:membruId', jurnalController.getEvolutie);
// Ruta pentru istoricul notițelor
router.get('/istoric/:id', jurnalController.getIstoricJurnal);
// Rutele noi de stergere si editare
router.delete('/sterge/:notaId', jurnalController.stergeIntrare);
router.put('/editeaza/:notaId', upload.single('poza'), jurnalController.editeazaIntrare);
router.get('/export-csv/:id', jurnalController.exportCSV);


module.exports = router;
