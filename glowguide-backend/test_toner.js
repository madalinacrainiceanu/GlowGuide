const sequelize = require('./db');

sequelize.query(
  "SELECT DISTINCT p.id, p.nume, p.brand, p.categorie, p.rating FROM produs p WHERE p.categorie = 'toner' AND p.tipTenRecomandat LIKE '%sensibil%' ORDER BY p.rating DESC LIMIT 1",
  { type: sequelize.QueryTypes.SELECT }
).then(r => {
  console.log('Rezultat toner+sensibil:', JSON.stringify(r));
  process.exit(0);
}).catch(e => {
  console.error('Eroare:', e.message);
  process.exit(1);
});
