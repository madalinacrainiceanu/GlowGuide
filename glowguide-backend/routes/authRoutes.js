const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/trimite-cod', authController.trimiteCodum);
router.post('/verifica-cod', authController.verificaCod);
router.post('/login', authController.login);

module.exports = router;
