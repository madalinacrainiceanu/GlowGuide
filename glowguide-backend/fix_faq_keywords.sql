-- Fix keywords FAQ pentru căutare robustă fără diacritice
USE glowguide_db;

-- SPF în zilele înnorate — adaugă: zilele, innorate, nori, cer
UPDATE FAQ SET cuvinteCheie = 'spf,noros,nori,zilele,innorate,iarna,interior,trebuie,cer'
WHERE intrebare LIKE '%norate%' OR intrebare LIKE '%noros%';

-- Tenul gras și hidratant
UPDATE FAQ SET cuvinteCheie = 'gras,hidratant,nevoie,sebum,oil,free,oleios,crema'
WHERE intrebare LIKE '%gras%' AND intrebare LIKE '%hidratant%';

-- Retinol frecvență — adaugă: folosesc
UPDATE FAQ SET cuvinteCheie = 'retinol,cat,des,frecvent,iritatie,inceput,folosesc,saptamana'
WHERE intrebare LIKE '%retinol%' AND intrebare LIKE '%des%';

-- Ordinea produselor — adaugă mai multe variante
UPDATE FAQ SET cuvinteCheie = 'ordine,aplicare,rutina,pas,cum,folosesc,aplici,produse,ordinea'
WHERE intrebare LIKE '%ordine%' AND intrebare LIKE '%aplic%';

-- Niacinamide
UPDATE FAQ SET cuvinteCheie = 'niacinamide,niacinamida,vitamina,b3,beneficii,face,ingredient'
WHERE intrebare LIKE '%niacinamide%';
