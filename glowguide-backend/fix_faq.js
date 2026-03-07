const sequelize = require('./db');

async function fix() {
  await sequelize.query(
    "UPDATE FAQ SET cuvinteCheie = 'spf,noros,nori,zilele,innorate,iarna,interior,trebuie,cer' WHERE intrebare LIKE '%norate%' OR intrebare LIKE '%noros%'"
  );
  await sequelize.query(
    "UPDATE FAQ SET cuvinteCheie = 'retinol,cat,des,frecvent,iritatie,inceput,folosesc,saptamana' WHERE intrebare LIKE '%retinol%' AND intrebare LIKE '%des%'"
  );
  await sequelize.query(
    "UPDATE FAQ SET cuvinteCheie = 'ordine,aplicare,rutina,pas,cum,folosesc,aplici,produse,ordinea' WHERE intrebare LIKE '%ordine%' AND intrebare LIKE '%aplic%'"
  );
  await sequelize.query(
    "UPDATE FAQ SET cuvinteCheie = 'niacinamide,niacinamida,vitamina,b3,beneficii,ingredient' WHERE intrebare LIKE '%niacinamide%'"
  );
  await sequelize.query(
    "UPDATE FAQ SET cuvinteCheie = 'gras,hidratant,nevoie,sebum,oily,free,oleios,crema,ten' WHERE intrebare LIKE '%gras%' AND intrebare LIKE '%hidratant%'"
  );
  console.log('FAQ keywords actualizate cu succes!');
  process.exit(0);
}

fix().catch(e => { console.error('Eroare:', e.message); process.exit(1); });
