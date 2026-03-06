const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log("=== DATE DE CONEXIUNE ===");
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("=========================");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, 
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexiunea la baza de date MySQL (glowguide_db) a fost realizată cu succes!');
  })
  .catch((error) => {
    console.error('❌ Eroare la conectarea cu baza de date:', error.original || error);
  });

module.exports = sequelize;
