const sequelize = require('../db');

// Distribuția utilizatorilor pe tipuri de ten (Pie Chart)
exports.distributieTipuriTen = async (req, res) => {
    try {
        const [date] = await sequelize.query(
            `SELECT tipTen AS tip, COUNT(*) AS total
             FROM profildermatologic
             WHERE tipTen IS NOT NULL AND tipTen != ''
             GROUP BY tipTen
             ORDER BY total DESC`
        );
        res.json(date);
    } catch (error) {
        res.status(500).json({ eroare: error.message });
    }
};

// Intrări în jurnal pe luni calendaristice — global (Line Chart)
exports.jurnalLunar = async (req, res) => {
    try {
        const [date] = await sequelize.query(
            `SELECT SUBSTRING(dataIntrare, 1, 7) AS luna, COUNT(*) AS total
             FROM jurnalprogres
             GROUP BY luna
             ORDER BY luna ASC`
        );
        res.json(date);
    } catch (error) {
        res.status(500).json({ eroare: error.message });
    }
};

// Activitate pe forum — ultimele 7 zile (Bar Chart)
exports.activitateForumSaptamana = async (req, res) => {
    try {
        const [date] = await sequelize.query(
            `SELECT DATE(dataPostare) AS zi, COUNT(*) AS total
             FROM postare
             WHERE dataPostare >= DATE_SUB(NOW(), INTERVAL 7 DAY)
             GROUP BY zi
             ORDER BY zi ASC`
        );
        res.json(date);
    } catch (error) {
        res.status(500).json({ eroare: error.message });
    }
};
