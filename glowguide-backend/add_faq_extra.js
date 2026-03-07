const sequelize = require('./db');

async function addFAQ() {
  const intrari = [
    {
      cuvinteCheie: 'acid,folic,vitamina,b9,beneficii,ingredient,piele',
      intrebare: 'Ce este acidul folic?',
      raspuns: 'Acidul folic (Vitamina B9) în skincare:\n\n✅ Ajută la regenerarea celulară și producerea de noi celule\n✅ Reduce aspectul porilor dilatați\n✅ Hidratează și îmbunătățește textura pielii\n✅ Are proprietăți antioxidante — protejează de stresul oxidativ\n✅ Poate reduce hiperpigmentarea\n\n💊 Deseori confundat cu suplimentele alimentare (pentru sarcină), dar în cosmetice este un ingredient activ benefic pentru toate tipurile de ten.\n\n⚠️ De obicei se găsește în creme și seruri, nu ca ingredient principal.',
      categorie: 'ingrediente'
    },
    {
      cuvinteCheie: 'vitamina,c,ascorbic,antioxidant,luminozitate,hiperpigmentare',
      intrebare: 'Ce face vitamina C pentru piele?',
      raspuns: 'Vitamina C (acid ascorbic) — unul dintre cei mai studiați activi:\n\n✨ Beneficii principale:\n✅ Antioxidant puternic — protejează de radicalii liberi și poluare\n✅ Stimulează producția de colagen\n✅ Uniformizează tonul pielii și reduce petele\n✅ Luminozitate imediată\n✅ Potențează efectul SPF\n\n⚠️ Instabilă la lumină și aer → depozitează în recipient opac\n⚠️ Poate irita pielea sensibilă la concentrații mari (>15%)\n\n💡 Folosește dimineața, sub SPF. Începe cu concentrații mici (5-10%).',
      categorie: 'ingrediente'
    },
    {
      cuvinteCheie: 'zinc,beneficii,acnee,sebum,ingredient,piele,grasa',
      intrebare: 'Ce face zincul pentru piele?',
      raspuns: 'Zincul în skincare:\n\n✅ Reglează producția de sebum — ideal pentru ten gras și acneic\n✅ Proprietăți anti-inflamatorii — reduce roșeața\n✅ Accelerează vindecarea imperfecțiunilor\n✅ Antibacterian — combate bacteria acneică\n✅ Antioxidant ușor\n\n📌 Se găsește în: SPF-uri minerale (zinc oxide), produse pentru ten acneic, creme BB.\n\n💡 Zincul oral (supliment) este de asemenea eficient împotriva acneei moderate.',
      categorie: 'ingrediente'
    },
    {
      cuvinteCheie: 'ceramide,bariera,hidratare,piele,uscata,sensibila',
      intrebare: 'Ce sunt ceramidele?',
      raspuns: 'Ceramidele — fundamentul barierei cutanate:\n\n🏗️ Ce sunt: lipide (grăsimi) care formează "cimentul" dintre celulele pielii\n\n✅ Refac și consolidează bariera cutanată\n✅ Previn pierderea de umiditate (TEWL)\n✅ Calmează pielea iritată și sensibilă\n✅ Reduc roșeața și sensibilitatea\n✅ Potrivite pentru eczeme, psoriazis, piele reactivă\n\n💡 Ideale seara, în creme dense. Se combină bine cu niacinamide și acid hialuronic.\n\n🌟 Branduri cunoscute pentru ceramide: CeraVe, La Roche-Posay.',
      categorie: 'ingrediente'
    },
    {
      cuvinteCheie: 'colagen,producere,antiaging,riduri,elasticitate',
      intrebare: 'Cum stimulez producția de colagen?',
      raspuns: 'Cum stimulezi producția de colagen:\n\n🔬 Ingrediente dovedite științific:\n✅ Retinol / Retinoids — nr. 1 antiaging, stimulează colagenul direct\n✅ Vitamina C — cofactor esențial în sinteza colagenului\n✅ Peptide (ex: Matrixyl) — semnalizează pielea să producă colagen\n✅ AHA (glicolic, lactic) — reînnoiesc celulele\n\n❌ Crema cu colagen NU adaugă colagen în piele (molecula e prea mare)\n\n🌿 Stil de viață:\n• SPF zilnic (soarele distruge colagenul!)\n• Antioxidanți în dietă\n• Fără fumat\n• Hidratare adecvată',
      categorie: 'ingrediente'
    }
  ];

  for (const intrare of intrari) {
    // Verifică dacă există deja
    const [existing] = await sequelize.query(
      "SELECT id FROM FAQ WHERE intrebare = ?",
      { replacements: [intrare.intrebare] }
    );
    if (existing.length === 0) {
      await sequelize.query(
        "INSERT INTO FAQ (cuvinteCheie, intrebare, raspuns, categorie, numarAfisari) VALUES (?, ?, ?, ?, 0)",
        { replacements: [intrare.cuvinteCheie, intrare.intrebare, intrare.raspuns, intrare.categorie] }
      );
      console.log(`✅ Adăugat: ${intrare.intrebare}`);
    } else {
      console.log(`⏭️  Există deja: ${intrare.intrebare}`);
    }
  }

  console.log('\nGata!');
  process.exit(0);
}

addFAQ().catch(e => { console.error('Eroare:', e.message); process.exit(1); });
