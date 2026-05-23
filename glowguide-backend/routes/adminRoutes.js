const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const jwt = require('jsonwebtoken');

const verificaAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ eroare: 'Token lipsă.' });
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.rol !== 'admin') return res.status(403).json({ eroare: 'Acces interzis.' });
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ eroare: 'Token invalid sau expirat.' });
    }
};

router.get('/statistici/tipuri-ten', adminController.distributieTipuriTen);
router.get('/statistici/jurnal-lunar', adminController.jurnalLunar);
router.get('/statistici/forum-saptamana', adminController.activitateForumSaptamana);

module.exports = router;
