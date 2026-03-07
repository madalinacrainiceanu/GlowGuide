-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: glowguide_db
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrator` (
  `id` int NOT NULL AUTO_INCREMENT,
  `utilizatorId` int NOT NULL,
  `nume` varchar(100) COLLATE utf8mb4_romanian_ci NOT NULL,
  `prenume` varchar(100) COLLATE utf8mb4_romanian_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `utilizatorId` (`utilizatorId`),
  CONSTRAINT `administrator_ibfk_1` FOREIGN KEY (`utilizatorId`) REFERENCES `utilizator` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_romanian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator`
--

LOCK TABLES `administrator` WRITE;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` VALUES (1,1,'Crainiceanu','Madalina');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faq`
--

DROP TABLE IF EXISTS `faq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faq` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cuvinteCheie` varchar(255) COLLATE utf8mb4_romanian_ci DEFAULT NULL,
  `intrebare` text COLLATE utf8mb4_romanian_ci,
  `raspuns` text COLLATE utf8mb4_romanian_ci NOT NULL,
  `categorie` enum('rutina','ingrediente','produse','probleme_piele','general') COLLATE utf8mb4_romanian_ci DEFAULT NULL,
  `numarAfisari` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idx_cuvinte` (`cuvinteCheie`),
  FULLTEXT KEY `idx_intrebare` (`intrebare`)
) ENGINE=InnoDB AUTO_INCREMENT=295 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_romanian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faq`
--

LOCK TABLES `faq` WRITE;
/*!40000 ALTER TABLE `faq` DISABLE KEYS */;
INSERT INTO `faq` VALUES (196,'ordine,aplicare,rutina,pas,cum,folosesc,aplici,produse,ordinea','În ce ordine aplic produsele?','Ordinea corectă a produselor skincare este:\n1️⃣ Curățare (cleanser)\n2️⃣ Toner / Esență\n3️⃣ Ser (de la cel mai fluid la cel mai dens)\n4️⃣ Cremă de ochi (dacă folosești)\n5️⃣ Hidratant (moisturizer)\n6️⃣ SPF (DOAR dimineața)\n\nRegula de aur: aplică de la textura cea mai apoasă la cea mai densă.','rutina',1),(197,'rutina,dimineata,zi,morning','Care este rutina de dimineață?','Rutina de dimineață ideală:\n☀️ 1. Curățare blândă (sau doar apă dacă ai ten sensibil)\n2. Toner hidratant\n3. Vitamina C (ser antioxidant — protejează de radicalii liberi)\n4. Hidratant potrivit tipului tău de ten\n5. SPF 30+ OBLIGATORIU (chiar și în interior)\n\nDurată: 5-10 minute. Constanța contează mai mult decât produsele scumpe!','rutina',3),(198,'rutina,seara,noapte,evening,night','Care este rutina de seară?','Rutina de seară — regenerarea are loc noaptea:\n🌙 1. Curățare dublă (dacă porți machiaj: mai întâi ulei/micelară, apoi cleanser)\n2. Toner\n3. Activi puternici (retinol, AHA, BHA — DOAR seara!)\n4. Ser hidratant (acid hialuronic)\n5. Hidratant sau cremă nutritivă\n6. Ulei facial (opțional, ultimul strat)\n\nNu folosi retinol și AHA/BHA în aceeași seară!','rutina',0),(199,'curatare,dubla,double,cleansing,machiaj,demachiant','Ce este curățarea dublă?','Curățarea dublă (double cleansing) înseamnă două etape:\n1️⃣ Primul cleanser pe bază de ulei sau apă micelară — dizolvă machiajul, SPF-ul și sebumul\n2️⃣ Al doilea cleanser apos (gel, spumă, cremă) — curăță pielea propriu-zisă\n\nEste recomandată seara dacă porți machiaj sau SPF. Dimineața ajunge un singur cleanser sau doar apă.','rutina',0),(200,'toner,ce,rol,necesar,trebuie','La ce ajută tonerul?','Tonerul are mai multe roluri:\n✅ Reechilibrează pH-ul pielii după curățare\n✅ Hidratează și pregătește pielea pentru următorii pași\n✅ Crește absorbția serurilor și hidratantului\n\nAlege toner FĂRĂ alcool (irită și usucă). Caută ingrediente: acid hialuronic, niacinamide, centella asiatica. Aplică cu palmele, nu cu vată.','rutina',0),(201,'spf,factor,protectie,solara,cat,folosesc,necesar','Cât SPF trebuie să folosesc?','Minimum SPF 30 pentru uz zilnic, SPF 50+ pentru expunere directă la soare.\n\n☀️ Regulile de bază:\n• Aplică ultimul în rutina de dimineață (după hidratant)\n• Cantitate necesară: ½ linguriță pentru față + gât\n• Reaplică la fiecare 2 ore dacă ești în exterior\n• Nu există SPF \"prea mare\" — cu cât mai mare, cu atât mai bine\n\nSPF este cel mai important produs anti-aging!','rutina',0),(202,'spf,noros,nori,zilele,innorate,iarna,interior,trebuie,cer','Trebuie SPF și în zilele înnorate sau iarna?','DA, ABSOLUT! Motivele:\n☁️ 80% din razele UVA trec prin nori\n🪟 Razele UVA trec și prin geamuri (îmbătrânesc pielea chiar și în interior)\n❄️ Zăpada reflectă 80% din radiații UV\n\nUVB (arsuri) variază cu sezonul, dar UVA (îmbătrânire) este prezent TOT ANUL, la aceeași intensitate. SPF zilnic = investiția cu cel mai mare randament în skincare.','rutina',0),(203,'exfoliere,cat,des,frecvent,acid,scrub','Cât de des ar trebui să exfoliez?','Depinde de tipul de exfoliant:\n\n🧴 Exfolianți chimici (AHA/BHA):\n• Ten sensibil: 1x/săptămână\n• Ten normal/mixt: 2-3x/săptămână\n• Ten gras: până la 3-4x/săptămână\n\n🌿 Scrub-uri fizice:\n• Maximum 1-2x/săptămână (pot irita)\n• Evită scrub-urile cu granule mari sau aspre\n\n⚠️ Semne că exfoliezi prea mult: roșeață, uscare, senzație de arsură.','rutina',0),(204,'rutina,minima,simpla,inceput,incepator','Care este o rutină minimă pentru începători?','Dacă ești la început, 3 pași sunt suficienți:\n\n☀️ Dimineața:\n1. Cleanser blând\n2. Hidratant\n3. SPF\n\n🌙 Seara:\n1. Cleanser\n2. Hidratant\n\nAcești 3-4 pași fac 80% din diferență. Adaugă activi (vitamina C, retinol, acizi) abia după ce pielea s-a obișnuit cu rutina de bază — cel puțin 4 săptămâni.','rutina',0),(205,'astept,timp,intre,produse,cat','Cât timp aștept între produse?','Ghid general:\n⏱️ 30 secunde — între toner și ser\n⏱️ 1 minut — după seruri apoase\n⏱️ 2-3 minute — după retinol (înainte de hidratant)\n⏱️ 5 minute — după AHA/BHA (neutralizare pH)\n\nRegula practică: aplică următorul produs când cel anterior nu mai e umed la pipăit, dar pielea nu e complet uscată (ușor tacky = ideal pentru absorbție).','rutina',0),(206,'niacinamide,niacinamida,vitamina,b3,beneficii,ingredient','Ce este niacinamide și ce face?','Niacinamide (Vitamina B3) este unul dintre cei mai versatili activi:\n\n✅ Reduce aspectul porilor măriți\n✅ Uniformizează tonul (reduce petele și hiperpigmentarea)\n✅ Reglează producția de sebum (excelent pentru ten gras)\n✅ Întărește bariera cutanată\n✅ Reduce roșeața și inflamația\n✅ Hidratează prin stimularea ceramidelor\n\nConcentrație recomandată: 5-10%. Potrivit pentru TOATE tipurile de ten. Se poate folosi dimineața și seara.','ingrediente',0),(207,'retinol,ce,este,cum,folosesc,beneficii,efecte','Ce este retinolul și cum îl folosesc?','Retinolul (Vitamina A) este cel mai studiat ingredient anti-aging:\n\n✅ Stimulează producția de colagen\n✅ Reduce ridurile fine și ridurile\n✅ Accelerează regenerarea celulară\n✅ Tratează acneea\n✅ Reduce petele pigmentare\n\n⚠️ Cum să începi:\n• Folosește DOAR seara\n• Începe cu 2x/săptămână, crește treptat\n• Aplică pe piele uscată (reduce iritația)\n• Folosește obligatoriu SPF zilnic\n• Evită în sarcină!','ingrediente',0),(208,'retinol,cat,des,frecvent,iritatie,inceput,folosesc,saptamana','Cât de des folosesc retinolul?','Protocol de introducere a retinolului:\n\nSăptămânile 1-2: 2x/săptămână\nSăptămânile 3-4: 3x/săptămână\nLuna 2+: 4-5x/săptămână (dacă tolerezi bine)\n\n🛡️ Metoda \"sandwich\" pentru sensibili:\nHidratant → Retinol → Hidratant (reduce iritația)\n\n⚠️ Reacțiile normale la început: ușoară roșeață, descuamare, uscare — trec în 4-6 săptămâni (purging). Dacă e intensă, reduce frecvența.','ingrediente',0),(209,'acid,hialuronic,hyaluronic,ce,face,hidratare','Ce face acidul hialuronic?','Acidul hialuronic (HA) este cel mai puternic umectant:\n\n💧 Poate reține de până la 1000x greutatea sa în apă\n✅ Hidratează toate straturile pielii\n✅ Umple temporar ridurile fine\n✅ Calmează pielea iritată\n✅ Potrivit pentru TOATE tipurile de ten (chiar și gras)\n\n⚠️ Important: aplică pe piele ușor umedă, nu complet uscată — altfel extrage umiditate din piele! Sigilează mereu cu un hidratant deasupra.','ingrediente',7),(210,'vitamina,c,ascorbic,acid,beneficii,ce,face','Ce face Vitamina C în skincare?','Vitamina C (acid ascorbic) este antioxidantul numărul 1:\n\n☀️ Protejează de radicalii liberi și daunele UV\n✅ Uniformizează și luminează tenul\n✅ Reduce petele pigmentare și hiperpigmentarea\n✅ Stimulează producția de colagen\n✅ Amplifică efectul SPF\n\n📌 Se folosește DIMINEAȚA (efect antioxidant maxim ziua)\nConcentrație eficientă: 10-20%\n⚠️ Se oxidează rapid — păstrează la loc răcoros, întunecos. Dacă devine portocaliu/maro, nu mai e eficientă.','ingrediente',0),(211,'niacinamide,niacinamida,vitamina,b3,beneficii,ingredient','Pot combina Vitamina C cu Niacinamide?','DA! Poți să le combini fără probleme.\n\n❌ Mitul vechi: se formează acid nicotinic (roșeață) — este fals la concentrațiile normale din produse cosmetice.\n✅ Studiile din 2022-2023 confirmă că sunt compatibile și chiar complementare.\n\nCum să le folosești:\n☀️ Dimineața: Vitamina C (antioxidant pentru ziua)\n🌙 Seara: Niacinamide (reparare și uniformizare noapte)\n\nSau le poți folosi în aceeași rutină fără probleme.','ingrediente',0),(212,'aha,bha,acid,exfoliant,diferenta,care,aleg','Care e diferența dintre AHA și BHA?','AHA (alfa-hidroxiacizi) — Acid Glicolic, Lactic, Mandelic:\n🌊 Exfolianți hidrosolubili — acționează la suprafața pielii\n✅ Ideali pentru: ten uscat, hiperpigmentare, riduri fine, textură neuniformă\n⚠️ Cresc fotosensibilitatea — obligatoriu SPF!\n\nBHA (beta-hidroxiacizi) — Acid Salicilic:\n🧴 Liposolubil — pătrunde în pori\n✅ Ideali pentru: ten gras, acnee, pori înfundați, puncte negre\n💡 Are și proprietăți antiinflamatoare\n\n📌 Regulă: nu combina AHA+BHA+Retinol în aceeași seară.','ingrediente',0),(213,'ceramide,ce,sunt,fac,bariera','Ce sunt ceramidele?','Ceramidele sunt lipide (grăsimi) naturale care formează bariera cutanată:\n\n🛡️ Reprezintă ~50% din bariera pielii\n✅ Rețin umiditatea în piele\n✅ Protejează de agresori externi (poluare, bacterii, frig)\n✅ Reduc sensibilitatea și reactivitatea pielii\n\nCând bariera e deteriorată: piele uscată, iritată, reactivă, склонă la acnee.\n\nCeramidele se pierd prin: exfoliere excesivă, detergenți agresivi, vârstă. Le refaci cu produse cu ceramide (CeraVe, de exemplu).','ingrediente',0),(214,'retinol,vitamina,c,combina,impreuna','Pot combina Retinolul cu Vitamina C?','Nu în aceeași rutină — din motive de eficiență, nu siguranță:\n\n⚠️ Retinolul funcționează la pH bazic\n⚠️ Vitamina C (acid ascorbic) funcționează la pH acid\n→ Se neutralizează reciproc dacă sunt aplicate simultan\n\n✅ Soluția:\n☀️ Dimineața: Vitamina C\n🌙 Seara: Retinol\n\nAcesta este și motivul pentru care cei mai mulți experți recomandă această separare — nu pentru că sunt periculoase împreună, ci pentru că nu funcționează corect.','ingrediente',0),(215,'retinol,acid,nu,combina,evita','Ce nu trebuie combinat cu retinolul?','Combinații de evitat cu retinolul:\n\n❌ AHA/BHA (acizi exfolianți) — în aceeași seară: supraexfoliere, iritație severă\n❌ Vitamina C — eficiență scăzută (pH incompatibil)\n❌ Benzoil peroxid — inactivează retinolul\n❌ Alt retinoizi — niciodată mai mulți simultan\n\n✅ Se combină bine cu:\n✅ Acid hialuronic — hidratare după retinol\n✅ Ceramide — refac bariera\n✅ Niacinamide (seara) — reduce iritația\n✅ Peptide','ingrediente',0),(216,'peptide,ce,sunt,fac,colagen','Ce sunt peptidele în skincare?','Peptidele sunt lanțuri scurte de aminoacizi — \"mesagerii\" pielii:\n\n✅ Stimulează producția de colagen și elastină\n✅ Reduc ridurile fine\n✅ Întăresc bariera cutanată\n✅ Hidratează\n✅ Unele au efect botox-like (Argireline)\n\n💡 Sunt blânde, potrivite chiar și pentru pielea sensibilă\nSe combină bine cu aproape orice\n⚠️ Nu combina cu acizi (AHA/BHA) direct — îi pot dezactiva. Folosește în rutine separate.','ingrediente',0),(217,'centella,asiatica,cica,gotu,kola,ce,face','Ce face Centella Asiatica?','Centella Asiatica (CICA) este un ingredient calmant excepțional:\n\n🌿 Origine: medicina tradițională asiatică\n✅ Calmează roșeața și inflamația\n✅ Accelerează vindecarea (acnee, iritații, cicatrici)\n✅ Stimulează producția de colagen\n✅ Întărește bariera cutanată\n✅ Potrivit pentru pielea sensibilă, rozacee, acnee\n\nIngrediente active: madecasoside, asiaticoside, asiatic acid.\nBrand-uri cunoscute: Dr.Jart+ Cicapair, COSRX Centella.','ingrediente',0),(218,'spf,chemical,mineral,diferenta,fizic,chimic','Care e diferența dintre SPF chimic și mineral?','SPF MINERAL (Zinc Oxide, Titanium Dioxide):\n🪨 Stă pe suprafața pielii, reflectă razele UV\n✅ Efect imediat după aplicare\n✅ Recomandat pentru piele sensibilă, rozacee, copii\n⚠️ Poate lăsa cast alb (mai ales pe piele închisă la culoare)\n\nSPF CHIMIC (Avobenzone, Octinoxate etc.):\n🧪 Absorbit în piele, transformă UV în căldură\n✅ Textură mai ușoară, fără cast alb\n⚠️ Necesită 20 min după aplicare pentru a fi activ\n⚠️ Poate irita pielea sensibilă','ingrediente',0),(219,'niacinamide,niacinamida,vitamina,b3,beneficii,ingredient','Ce concentrație de niacinamide este eficientă?','Ghid concentrații niacinamide:\n\n2-5%: hidratare, întărire baieră — ideal pentru începători și piele sensibilă\n5-10%: reducere pori, sebum, pete — concentrația standard\n10%+: efect maxim, dar poate irita pielea sensibilă (roșeață temporară)\n\n✅ Recomandare: începe cu 5%, crește la 10% dacă tolerezi bine.\nThe Ordinary oferă 10% + Zinc 1% — excelent raport calitate/preț.','ingrediente',0),(220,'benzoil,peroxid,acnee,ce,face,cum,folosesc','Cum folosesc benzoil peroxidul pentru acnee?','Benzoil Peroxidul (BP) este unul din cele mai eficiente tratamente pentru acnee:\n\n✅ Ucide bacteria P. acnes (cauza principală a acneei inflamatorii)\n✅ Curăță porii\n✅ Reduce inflamația\n\nConcentrații: 2.5% (la fel de eficient ca 10%, cu mai puțină iritație!)\n\n⚠️ Atenție:\n• Albeste textile — evită contact cu haine/lenjerie\n• Nu combina cu retinol\n• Poate usca pielea — hidratează bine\n• Începe cu aplicare punct cu punct, nu pe toată fața','ingrediente',0),(221,'acid,salicilic,acnee,pori,cum,folosesc','Cum funcționează acidul salicilic?','Acidul salicilic (BHA) este soluția nr.1 pentru ten gras și acnee:\n\n✅ Pătrunde în pori și îi curăță din interior\n✅ Dizolvă punctele negre și albe\n✅ Antiinflamator — reduce roșeața coșurilor\n✅ Exfoliază blând suprafața pielii\n\nConcentrații eficiente: 0.5-2%\nFormate: toner, ser, spălare\n\n💡 Folosește seara pentru rezultate maxime\n⚠️ Evită zona ochilor\n⚠️ Nu combina cu AHA în aceeași rutină (supraexfoliere)','ingrediente',0),(222,'azelaic,acid,ce,face,rozacee,hipo','Ce face acidul azelaic?','Acidul azelaic este un ingredient multitasking subevaluat:\n\n✅ Reduce hiperpigmentarea și petele post-acnee\n✅ Tratează acneea (antibacterian)\n✅ Calmează rozaceea și înroșirile\n✅ Exfoliază blând\n✅ Uniformizează tonul\n\nConcentrații: 10% (OTC) eficient, 15-20% (prescripție)\n\n💚 Unul din puținii activi siguri în SARCINĂ\nSe combină bine cu aproape orice\nIdeal pentru pielea sensibilă cu probleme multiple','ingrediente',0),(223,'ten,gras,oily,sebum,stralucitor,caracteristici','Cum îngrijesc tenul gras?','Tenul gras produce sebum în exces — dar are nevoie de hidratare!\n\n❌ Greșeli comune:\n• Evitarea hidratantului (înrăutățește situația)\n• Over-curățarea (stimulează mai mult sebum)\n\n✅ Ce funcționează:\n• Cleanser cu spumă sau gel (dimineața și seara)\n• Toner cu niacinamide sau acid salicilic\n• Hidratant oil-free, non-comedogenic\n• SPF cu textură ușoară (gel sau fluid)\n• Ingrediente cheie: Niacinamide, Zinc PCA, Acid Salicilic, BHA\n\n🚫 Evită: uleiuri grele, produse comedogenice, alcool în concentrații mari','probleme_piele',1),(224,'ten,uscat,dry,hidratare,caracteristici,ingrijire','Cum îngrijesc tenul uscat?','Tenul uscat are bariera cutanată deficitară și produce puțin sebum:\n\n✅ Ce funcționează:\n• Cleanser cremă sau lapte (fără spumă agresivă)\n• Toner esență bogat în umectanți\n• Ser cu acid hialuronic (pe piele umedă!)\n• Hidratant bogat cu ceramide, shea butter, squalane\n• SPF cremă sau cu textură hrănitoare\n\n💡 Ingrediente cheie: Acid Hialuronic, Ceramide, Glicerina, Squalane, Shea Butter\n\n⭐ Layering = stratificarea produselor: mai multe straturi subțiri hidratante > un singur strat gros','probleme_piele',0),(225,'ten,mixt,combination,ingrijire,cum','Cum îngrijesc tenul mixt?','Tenul mixt — zona T (frunte, nas, bărbie) grasă, obraji uscați/normali:\n\n✅ Strategii:\n• Poți folosi produse diferite pe zone diferite (multi-masking)\n• Sau alegi produse balansate pentru ten mixt\n\n📋 Rutina recomandată:\n• Cleanser gel blând (nu prea agresiv pentru obraji)\n• Toner echilibrant (fără alcool)\n• Ser cu niacinamide (reglează sebumul și hidratează)\n• Hidratant light (gel-cremă)\n\n💡 Exfolierea ușoară 2x/săptămână ajută la uniformizarea texturii','probleme_piele',0),(226,'ten,sensibil,reactiv,iritatie,rosiata,ingrijire','Cum îngrijesc tenul sensibil?','Tenul sensibil reacționează ușor la produse, factori de mediu sau schimbări:\n\n✅ Reguli de bază:\n• Introduce un produs NOU o dată la 2 săptămâni (patch test!)\n• Evită parfumuri, alcool, coloranți în produse\n• Formula minimalistă = mai puține ingrediente, risc mai mic\n• Apă termală sau spray calmant pentru urgențe\n\n💚 Ingrediente sigure: Centella Asiatica, Aloe Vera, Ceramide, Panthenol (B5), Acid Hialuronic\n🚫 Evită: parfumuri sintetice, SLS, alcool denaturat, AHA în concentrații mari','probleme_piele',0),(227,'ten,normal,ingrijire,rutina,simpla','Cum îngrijesc tenul normal?','Tenul normal e echilibrat — nici prea gras, nici prea uscat. Ai norocul de a putea folosi aproape orice!\n\n✅ Rutina simplă funcționează perfect:\n☀️ Dimineața: Cleanser → Toner → Hidratant → SPF\n🌙 Seara: Cleanser → Ser activ → Hidratant\n\n💡 Sfaturi:\n• Menține ce funcționează — nu experimenta de dragul experimentului\n• Adaugă treptat activi (vitamina C, retinol) pentru prevenția îmbătrânirii\n• Exfoliere 1-2x/săptămână pentru glow','probleme_piele',0),(228,'acnee,cosuri,tratament,cum,scap,ingrediente','Cum tratez acneea?','Tratamentul acneei depinde de tipul ei:\n\n🔴 Acnee inflamatorie (coșuri roșii): Benzoil Peroxid 2.5-5%, Acid Salicilic\n⚫ Puncte negre: BHA (Acid Salicilic), exfoliere regulată\n🔵 Chisturi profunde: consultă dermatolog\n\n✅ Ingrediente eficiente:\n• Acid Salicilic 2% — curăță porii\n• Niacinamide 10% — reduce inflamația\n• Benzoil Peroxid — bactericid\n• Retinol (la concentrații mici) — reglează turnover celular\n• Zinc — antiinflamator\n\n⚠️ Nu stoarce coșurile — lasă cicatrici și răspândește bacteria!','probleme_piele',1),(229,'pete,hiperpigmentare,decolorare,dark,spots,tratament','Cum scap de petele de pe față?','Petele (hiperpigmentarea) apar din: acnee, soare, hormoni:\n\n✅ Ingrediente eficiente pentru pete:\n• Vitamina C — antioxidant, uniformizează treptat\n• Niacinamide — inhibă transferul melaninei\n• Alfa-Arbutin — depigmentant blând\n• Acid Azelaic — multi-tasking (pete + acnee)\n• Acid Kojic — reduce melanina\n• Acid Glicolic (AHA) — exfoliere, luminozitate\n\n⏳ Răbdare: rezultatele apar în 8-12 săptămâni\n☀️ SPF ZILNIC este OBLIGATORIU — fără el, petele se vor înrăutăți oricât de bune ar fi produsele!','probleme_piele',0),(230,'riduri,linii,fine,antiaging,anti,imbatranire','Ce produse folosesc pentru riduri și anti-aging?','Ierarhia ingredientelor anti-aging bazate pe dovezi:\n\n🥇 Retinol/Retinoids — cel mai studiat, cel mai eficient\n🥈 Vitamina C — protecție + colagen\n🥉 SPF — PREVINE 90% din îmbătrânirea prematură\n\n✅ Completează cu:\n• Peptide — stimulează colagenul\n• Acid Hialuronic — volum și hidratare\n• Niacinamide — elasticitate\n• AHA (Acid Glicolic) — reînnoire celulară\n\n💡 Cel mai important: SPF zilnic de la 20 de ani previne mai mult decât orice cremă anti-aging la 40 de ani.','probleme_piele',0),(231,'rozacee,rosie,roseata,sensibil,ingrijire','Cum îngrijesc pielea cu rozacee?','Rozaceea este o afecțiune cronică — nu se vindecă, dar se gestionează:\n\n🚫 Triggeri comuni de evitat:\n• Alimente picante, alcool, cafea\n• Temperaturi extreme (saună, apă fierbinte)\n• Soare fără protecție\n• Produse cu alcool, parfumuri, SLS\n\n✅ Ingrediente calmante:\n• Centella Asiatica\n• Niacinamide (reduce roșeața)\n• Acid Azelaic (15-20% — prescripție pentru cazuri severe)\n• Aloe Vera\n• SPF Mineral (Zinc Oxide — și antiinflamator!)\n\n⚕️ Pentru cazuri moderate-severe: consultă un dermatolog.','probleme_piele',0),(232,'pori,mari,minimizare,cum,reduc','Cum reduc aspectul porilor?','Porii nu se \"închid\" — dimensiunea lor e genetică — dar aspectul poate fi redus:\n\n✅ Ce funcționează:\n• Curățare regulată (evită înfundarea porilor)\n• BHA (Acid Salicilic) — curăță porii din interior\n• Niacinamide 10% — cel mai studiat pentru pori\n• Retinol — crește turnover-ul celular, reduce aspectul porilor\n• Primer cu pori (pentru machiaj, efect temporar)\n\n🚫 Ce NU funcționează:\n• Abur — nu deschide porii permanent\n• Pore strips — curăță superficial, irită','probleme_piele',0),(233,'purging,breakout,diferenta,retinol,acid,inrautatire','Ce este purging-ul și cum îl recunosc?','Purging vs. Breakout — cum le deosebești:\n\n🔄 PURGING (reacție normală la un activ nou):\n• Apare în primele 4-6 săptămâni\n• Coșuri în zonele unde deja aveai probleme\n• Trece de la sine\n• Cauzat de: Retinol, AHA, BHA, Vitamina C\n\n❌ BREAKOUT (reacție adversă la un produs):\n• Coșuri în zone noi\n• Nu trece după 6 săptămâni\n• Produsul e comedogenic sau te irită\n→ STOP produs!\n\n💡 Dacă nu ești sigur: fă patch test 7 zile înainte de a folosi pe toată fața.','probleme_piele',0),(234,'patch,test,cum,fac,nou,produs,testez','Cum fac patch test pentru un produs nou?','Patch test — obligatoriu pentru pielea sensibilă:\n\n📋 Pași:\n1. Aplică o cantitate mică pe zona interioară a brațului (sau după ureche)\n2. Lasă 24-48 de ore fără a spăla\n3. Observă: roșeață, mâncărime, iritație?\n\n✅ Dacă nu există reacție → safe de folosit\n❌ Dacă apare iritație → nu folosi pe față\n\n💡 Chiar și după patch test, introduce produsul treptat (seara, o dată la 2 zile, primele 2 săptămâni).','general',0),(235,'cleanser,spumant,crema,gel,care,aleg,tip','Ce tip de cleanser să aleg?','Ghid alegere cleanser după tipul de ten:\n\n🧴 Gel / Spumant → ten gras, mixt, acneic\n🥛 Cremă / Lapte → ten uscat, sensibil, matur\n💧 Micelară → curățare blândă, demachiant\n🛢️ Ulei de curățare → orice ten (excelent pentru dubla curățare)\n\n✅ Caracteristici ideale INDIFERENT de tip:\n• pH 4.5-6.5 (protejează bariera)\n• Fără SLS/SLES (agresiv)\n• Fără parfum (dacă ai piele sensibilă)\n\n💡 Un cleanser bun trebuie să curețe fără a lăsa pielea \"strânsă\" după clătire.','produse',0),(236,'hidratant,crema,gel,ce,aleg,tip,ten','Ce hidratant este potrivit pentru tipul meu de ten?','Ghid hidratante după tipul de ten:\n\n💧 Ten gras/mixt: gel-cremă oil-free, non-comedogenic (ex: Neutrogena Hydro Boost, Belif Aqua Bomb)\n\n🧴 Ten normal: loțiune sau cremă ușoară\n\n🍯 Ten uscat/matur: cremă bogată cu ceramide, shea, squalane (ex: CeraVe Moisturizing Cream, La Roche-Posay Toleriane)\n\n🌸 Ten sensibil: formulă minimală, fără parfum (ex: Avene Tolerance, Eucerin Sensitive)\n\n💡 Ingrediente de căutat: Glicerină, Acid Hialuronic, Ceramide, Squalane, Panthenol','produse',0),(237,'spf,crema,recomandata,protectie,tip,ten','Ce SPF recomanzi?','Recomandări SPF după tip de ten:\n\n☀️ Ten gras/mixt: SPF fluid, gel sau \"invisible\" (ex: La Roche-Posay Anthelios UVMune 400 Fluid, ISDIN Fusion Water)\n\n🌸 Ten sensibil/rozacee: SPF mineral cu Zinc Oxide (ex: Altruist Mineral, EltaMD UV Clear)\n\n🏖️ Ten uscat: SPF cremă cu textură hidratantă (ex: Bioderma Photoderm Lait, Avene Solar)\n\n📌 Important:\n• SPF 50+ = cea mai bună protecție\n• Reaplică la 2h în exterior\n• Nu uita gâtul și mâinile!','produse',0),(238,'the,ordinary,produse,ce,cumpar,recomandat','Ce produse The Ordinary recomanzi?','The Ordinary — ghid bestseller-uri:\n\n⭐ Niacinamide 10% + Zinc 1% — ten gras, pori, sebum (35 lei)\n⭐ Hyaluronic Acid 2% + B5 — hidratare profundă (39 lei)\n⭐ Vitamin C Suspension 23% + HA — anti-aging, luminozitate (45 lei)\n⭐ Retinol 0.2% în Squalane — începători anti-aging (35 lei)\n⭐ AHA 30% + BHA 2% Peeling Solution — exfoliere 10 min/săptămână\n⭐ Alpha Arbutin 2% + HA — pete, hiperpigmentare\n\n💡 Nu cumpăra totul deodată! Alege 2-3 produse relevante pentru problemele tale.','produse',0),(239,'cerave,produse,ce,recomandat,bariera','Ce produse CeraVe recomanzi?','CeraVe — brand dermatologist-developed, accesibil:\n\n🧴 Hydrating Cleanser — ten normal/uscat (nu spumant, nu irită)\n🧴 Foaming Cleanser — ten gras/mixt\n💧 Moisturizing Cream — hidratant iconic cu ceramide (borcan)\n💧 PM Facial Moisturizing Lotion — hidratant de seară cu niacinamide\n🛢️ SA Smoothing Cleanser — ten cu textura neregulată\n☀️ AM Facial Moisturizing Lotion SPF 30 — hidratant + SPF\n\n✅ CeraVe funcționează pentru că: conține ceramide esențiale + acid hialuronic + este non-comedogenic.','produse',0),(240,'glowguide,ce,este,aplicatie,cum,functioneaza','Cum funcționează GlowGuide?','GlowGuide este o platformă de recomandare personalizată a produselor cosmetice:\n\n📋 Completezi chestionarul cu:\n• Tipul tău de ten\n• Alergii la ingrediente\n• Problemele pielii\n• Obiectivele tale\n\n🤖 Sistemul generează automat o rutină completă:\nCurățare → Toner → Ser → Hidratant → SPF\n\n📖 Monitorizezi progresul în Jurnalul de Progres\n💬 Interacționezi cu comunitatea în Forum\n🤖 Primești răspunsuri educative de la GlowBot\n\nTotul este personalizat pentru tine, bazat pe profilul tău dermatologic!','general',0),(241,'ingredient,inci,lista,citesc,eticheta','Cum citesc lista de ingrediente INCI?','Lista INCI (International Nomenclature of Cosmetic Ingredients):\n\n📋 Regulile:\n1. Ingredientele sunt listate în ordine DESCRESCĂTOARE a concentrației\n2. Primele 5-7 ingrediente = >80% din produs\n3. Sub 1% concentrație: ordinea e la alegerea producătorului\n\n💡 Ce să cauți:\n✅ Primele ingrediente: apă (Aqua), Glicerină, Aloe Vera = buni\n⚠️ Alcool Denat. în primele poziții = usucă pielea\n⚠️ Parfum/Fragrance = posibil iritant\n\n🔍 Folosește apps: INCI Decoder, CosDNA pentru a analiza produse.','general',0),(242,'cat,timp,rezultate,astept,skincare,efect','Cât timp durează să văd rezultate?','Așteptări realiste pentru skincare:\n\n⚡ Imediat — 1-3 zile: Hidratare, calmarea iritației\n📅 2-4 săptămâni: Purging trecut, textura îmbunătățită\n📅 4-8 săptămâni: Reducere pete, uniformizare ton (Vit C, Niacinamide)\n📅 3-6 luni: Efect vizibil retinol (riduri, textură)\n📅 6-12 luni: Beneficii maxime anti-aging\n\n💡 Regula de aur: 3 luni de folosire consecventă înainte să judeci un produs.\nSchimbarea a 2+ produse simultan = nu știi ce a funcționat sau ce a cauzat o reacție.','general',0),(243,'conservare,termen,valabilitate,deschis,produs','Cât timp sunt valabile produsele cosmetice după deschidere?','Simbolul PAO (Period After Opening) = borcanul deschis cu un număr:\n\n📅 3M = 3 luni\n📅 6M = 6 luni\n📅 12M = 12 luni\n📅 24M = 24 luni\n\n⚠️ Produse cu termen mai scurt:\n• Vitamina C: 3-6 luni (se oxidează rapid)\n• Retinol: 6-12 luni\n• SPF: 12 luni după deschidere (NU mai protejează după expirare!)\n\n💡 Depozitare corectă: loc răcoros, întunecos, ferit de umiditate. Frigiderul prelungește viața Vitaminei C și retinolului.','general',0),(244,'non,comedogenic,ce,inseamna,pori,infunda','Ce înseamnă non-comedogenic?','Non-comedogenic = produsul nu înfundă porii și nu cauzează coșuri (comedoane).\n\n⚠️ ATENȚIE: termenul nu e reglementat legal — orice brand poate scrie asta fără testare oficială!\n\n✅ Ce să verifici în schimb:\n• Comedogenic rating al ingredientelor (0-5, unde 0 = safe)\n• Ingrediente COMEDOGENICE de evitat:\n  - Ulei de cocos (rating 4)\n  - Lanolina\n  - Isopropyl Myristate\n  - Ulei de grâu\n\n✅ Ingrediente NON-comedogenice sigure:\n  - Squalane, Acid Hialuronic, Niacinamide, Glicerină','general',0),(245,'skincare,barbati,diferenta,gen,piele','Skincare-ul pentru bărbați e diferit?','Pielea bărbaților are câteva diferențe față de cea a femeilor:\n\n📊 Caracteristici:\n• ~25% mai groasă\n• Produce cu ~20% mai mult sebum\n• Se îmbătrânește mai lent dar mai brusc după 50 de ani\n• Ras frecvent = iritație mecanică zilnică\n\n✅ Rutina de bază e IDENTICĂ: Cleanser → Hidratant → SPF\nNu există ingrediente \"pentru bărbați\" sau \"pentru femei\" — marketingul separat e o strategie comercială.\n\n💡 Post-bărbierit: evită alcool în after-shave dacă ai piele sensibilă. Aloe sau Centella Asiatica calmează iritația.','general',0),(246,'sarcina,gravida,produse,sigure,evita,retinol','Ce produse sunt sigure în sarcină?','În sarcină, anumite ingrediente trebuie EVITATE:\n\n🚫 DE EVITAT:\n• Retinol / Retinoizi (vitamina A în doze mari)\n• Acid Salicilic în concentrații mari (>2%)\n• Hidrochinona (depigmentant puternic)\n• Benzoil Peroxid (de evitat în trimestrul 1)\n• Uleiuri esențiale concentrate\n\n✅ SIGURE în sarcină:\n• Acid Hialuronic\n• Niacinamide\n• Acid Azelaic\n• SPF (mineral sau chimic)\n• Ceramide\n• Aloe Vera, Centella Asiatica\n• Vitamina C\n\n⚕️ Consultă întotdeauna medicul ginecolog înainte de a folosi activi!','general',0),(247,'alcool,produs,rau,bun,tip,skin','Alcoolul în produsele cosmetice e rău?','Depinde de TIPUL de alcool:\n\n❌ Alcooli de evitat (usucă și irită):\n• Alcohol Denat., Ethanol, Isopropyl Alcohol, SD Alcohol\n→ Distrug bariera cutanată în utilizare frecventă\n→ Efect de \"curățare\" temporară dar dăunătoare pe termen lung\n\n✅ Alcooli buni (emolienti, hrănitoare):\n• Cetyl Alcohol, Cetearyl Alcohol, Stearyl Alcohol\n→ Nu sunt alcool în sens clasic — sunt grăsimi solide\n→ Înmoaie și hidratează pielea\n\n💡 Verifică întotdeauna CARE alcool apare în lista INCI și în ce poziție.','general',0),(248,'glicerina,ce,face,ingredient,ieftin','Ce face glicerina în skincare?','Glicerina este unul dintre cele mai eficiente ingrediente skincare — și cel mai ieftin!\n\n💧 Este un umectant puternic: atrage apa din aer și straturile profunde ale pielii\n✅ Hidratează fără a astupa porii\n✅ Potrivită pentru TOATE tipurile de ten\n✅ Calmează iritația\n✅ Ajută la cicatrizarea microleziunilor\n\nApare ca ingredient nr. 2-3 în majoritatea produselor bune.\n\n💡 Fun fact: o soluție de 30% glicerină + apă în spray este un hidratant eficient și extrem de accesibil!','general',0),(249,'squalane,ce,este,ulei,ten,gras,poate','Ce este squalane-ul și poate fi folosit pe tenul gras?','Squalane este un ulei emolient derivat din măsline (sau zahăr din trestie):\n\n✅ Mimează sebumul natural al pielii\n✅ Hidratează fără senzație grasă\n✅ Non-comedogenic (rating 1)\n✅ Potrivit pentru TOATE tipurile de ten, inclusiv gras!\n✅ Extrem de stabil (nu se oxidează)\n✅ Calmează și repară bariera\n\n💡 Diferit de Squalene (instabil, din surse animale).\nBrand accesibil: The Ordinary Squalane 100% (la prețul unui produs de farmacie).','general',0),(250,'panthenol,b5,ce,face,calmeaza','Ce face Panthenol (B5)?','Panthenol (Pro-Vitamina B5) este un ingredient calmant și reparator:\n\n✅ Umectant puternic — hidratează și reține apa în piele\n✅ Accelerează vindecarea microleziunilor\n✅ Calmează iritația și roșeața\n✅ Ameliorează arsurile solare\n✅ Întărește bariera cutanată\n✅ Potrivit pentru pielea sensibilă, iritată, post-proceduri\n\n💡 Apare pe etichete ca: Panthenol, Dexpanthenol, Pro-Vitamin B5\nSe găsește în produse CeraVe, La Roche-Posay, Paula\'s Choice\nEste unul din ingredientele cele mai bine tolerate — reacții adverse aproape inexistente.','ingrediente',0),(251,'alpha,arbutin,alfa,pete,depigmentant,hiperpigmentare','Ce este Alpha Arbutin și cum ajută la pete?','Alpha Arbutin este unul dintre cei mai eficienți depigmentanți blânzi:\n\n✅ Inhibă tirosinaza (enzima care produce melanina)\n✅ Reduce petele post-acnee (PIH)\n✅ Uniformizează tonul pielii\n✅ Mai stabil și mai puternic decât Arbutin obișnuit\n✅ Blând — tolerat de pielea sensibilă\n\nConcentrație eficientă: 1-2%\nRezultate vizibile: 4-8 săptămâni\n\n⚠️ Obligatoriu SPF zilnic — fără el petele revin!\n💡 Se combină excelent cu: Vitamina C, Niacinamide, Acid Azelaic\nThe Ordinary Alpha Arbutin 2% + HA = bestseller accesibil.','ingrediente',0),(252,'kojic,acid,pete,depigmentant,ce,face','Ce face acidul kojic?','Acidul kojic este un depigmentant natural derivat din ciuperci:\n\n✅ Inhibă producția de melanină\n✅ Reduce petele solare și post-acnee\n✅ Proprietăți antifungice și antibacteriene\n\nConcentrație eficientă: 1-4%\n\n⚠️ Precauții:\n• Poate irita pielea sensibilă\n• Instabil — se oxidează și devine portocaliu (nu mai e eficient)\n• Fotosensibilizant — SPF obligatoriu!\n• Nu combina cu Vitamina C (concurează pe același mecanism)\n\n💡 Alternativă mai stabilă: Alpha Arbutin sau Acid Azelaic.','ingrediente',0),(253,'rezveratrol,resveratrol,antioxidant,ce,face','Ce este Resveratrolul în skincare?','Resveratrolul este un antioxidant puternic găsit în struguri și vin roșu:\n\n✅ Protejează pielea de stresul oxidativ\n✅ Proprietăți anti-aging\n✅ Calmează inflamația\n✅ Potențiează efectul altor antioxidanți (inclusiv Vit C)\n✅ Poate reduce hiperpigmentarea\n\n💡 Se folosește de obicei seara (antioxidanții sunt mai stabili fără expunere la lumină)\nBrand known: The Ordinary Resveratrol 3% + Ferulic Acid 3%\nSe combină bine cu: Vitamina C, Niacinamide, SPF','ingrediente',0),(254,'ferulic,acid,antioxidant,vitamina,c,amplifica','Ce face Acidul Ferulic?','Acidul Ferulic este un antioxidant vegetal cu un rol special:\n\n⭐ Superputere: AMPLIFICĂ și STABILIZEAZĂ Vitamina C și Vitamina E!\n✅ Singur: antioxidant, anti-aging, fotoprotecție\n✅ Cu Vit C+E: eficiența fotoprotecției crește de 8x\n✅ Reduce hiperpigmentarea\n✅ Stimulează colagenul\n\n💡 De aceea veți vedea deseori: \"Vitamin C 15% + Ferulic Acid\"\n→ Combinația clasică anti-aging din SkinCeuticals C E Ferulic\n→ Versiune accesibilă: The Ordinary Resveratrol 3% + Ferulic 3%','ingrediente',0),(255,'coenzima,q10,ubiquinone,ce,face,anti,aging','Ce face Coenzima Q10 în skincare?','Coenzima Q10 (Ubiquinone) este un antioxidant produs natural de corp:\n\n📉 Problema: producția scade odată cu vârsta și din cauza stresului\n✅ Protejează celulele de stresul oxidativ\n✅ Stimulează producția de colagen și elastină\n✅ Reduce ridurile fine\n✅ Energizează celulele pielii\n✅ Reduce daunele cauzate de UV\n\n💡 Găsit în creme de zi și noapte anti-aging\nBranduri: NIVEA Q10, Eucerin Q10\nSe combină bine cu Vitamina E și alți antioxidanți\n⚠️ Rezultatele sunt graduale — minim 3 luni de utilizare consecventă','ingrediente',0),(256,'vitamina,e,tocopherol,ce,face,skincare','Ce face Vitamina E în skincare?','Vitamina E (Tocopherol) este un antioxidant liposolubil esențial:\n\n✅ Protejează membranele celulare de oxidare\n✅ Hidratează și calmează pielea\n✅ Accelerează vindecarea (cicatrici, arsuri ușoare)\n✅ Amplifică efectul Vitaminei C (sinergie)\n✅ Reduce inflamația\n\n💡 Găsit în aproape toate hidratantele și serurile\nApare pe etichete ca: Tocopherol, Tocopheryl Acetate\n\n⚠️ Atenție: uleiul pur de Vitamina E aplicat direct poate fi comedogenic pentru unii!\nPreferabil în formulare cosmetice, nu pur.','ingrediente',0),(257,'zinc,pca,sebum,acnee,ten,gras,ce,face','Ce face Zinc PCA?','Zinc PCA este ingredientul ideal pentru tenul gras și acneic:\n\n✅ Reglează producția de sebum (reduce strălucirea)\n✅ Antibacterian — combate bacteria acneică\n✅ Antiinflamator — reduce roșeața coșurilor\n✅ Astringent blând — minimizează aspectul porilor\n✅ Potrivit pentru ten gras, mixt, acneic\n\nSe combină perfect cu Niacinamide (The Ordinary: Niacinamide 10% + Zinc 1%)\n\n💡 Diferit de Zinc Oxide (SPF mineral) — Zinc PCA e specific pentru reglarea sebumului','ingrediente',0),(258,'bakuchiol,retinol,natural,alternativa,ce,este','Ce este Bakuchiol și e o alternativă la retinol?','Bakuchiol este un ingredient vegetal (din planta Psoralea corylifolia) prezentat ca \"retinol natural\":\n\n✅ Stimulează producția de colagen similar retinolului\n✅ Reduce ridurile fine\n✅ Uniformizează tonul\n✅ Mult mai blând — potrivit pentru pielea sensibilă\n✅ Sigur în sarcină (spre deosebire de retinol!)\n✅ Nu crește fotosensibilitatea\n\n⚠️ Realitate vs. marketing:\n• Eficacitatea e reală dar mai slabă decât retinolul\n• Studiile sunt mai puține și pe perioade mai scurte\n• Nu e o înlocuire 1:1 a retinolului, dar e o alternativă validă pentru sensibili','ingrediente',0),(259,'lactic,acid,acid,lactic,ce,face,exfoliant','Ce face acidul lactic?','Acidul Lactic este un AHA derivat din lapte — cel mai blând dintre acizi:\n\n✅ Exfoliază moartea celulelor de la suprafață\n✅ Stimulează producția de ceramide (întărește bariera!)\n✅ Hidratează (efect umectant unic față de alți AHA)\n✅ Uniformizează tonul și textura\n✅ Reduce petele pigmentare\n✅ Ideal pentru începători și piele sensibilă\n\nConcentrații:\n• 5-10%: utilizare zilnică (toner)\n• 10-25%: tratament săptămânal\n\nBranduri: The Inkey List Lactic Acid, The Ordinary Lactic Acid 5%+HA','ingrediente',0),(260,'glycolic,acid,glicolic,ce,face,exfoliant,puternic','Ce face acidul glicolic?','Acidul Glicolic este AHA-ul cel mai puternic și mai studiat:\n\n✅ Cea mai mică moleculă AHA → penetrare profundă\n✅ Exfoliere intensă: elimină celulele moarte eficient\n✅ Reduce ridurile fine și textura\n✅ Luminozitate imediată\n✅ Tratează hiperpigmentarea\n✅ Stimulează colagenul\n\n⚠️ Precauții:\n• Crește semnificativ fotosensibilitatea → SPF OBLIGATORIU\n• Poate irita pielea sensibilă — începe cu concentrații mici (5-7%)\n• Nu combina cu retinol sau BHA în aceeași seară\n\nConcentrații: 5-10% (zilnic), 20-30% (peeling săptămânal)','ingrediente',0),(261,'mandelic,acid,mandelic,ce,face,piele,inchisa','Ce face acidul mandelic?','Acidul Mandelic este un AHA cu moleculă mare — cel mai blând dintre AHA-uri puternice:\n\n✅ Exfoliază fără iritație excesivă\n✅ Antibacterian — eficient în acnee\n✅ Reduce hiperpigmentarea\n✅ Uniformizează textura\n✅ Recomandat special pentru pielea mai închisă la culoare (risc mai mic de PIH post-exfoliere)\n✅ Potrivit pentru piele sensibilă care nu tolerează Glicolic\n\nConcentrații: 5-10%\nSe combină cu: Niacinamide, Acid Hialuronic\n⚠️ Ca toți AHA: crește fotosensibilitatea, SPF obligatoriu!','ingrediente',0),(262,'slugging,ce,este,vaseline,tehnica','Ce este slugging?','Slugging este o tehnică de origine coreeană: aplicarea vaseleinei ca ultimul strat al rutinei de seară:\n\n🐌 De ce se numește slugging: pielea \"strălucitoare\" ca un melc\n\n✅ Beneficii:\n• Sigilează toți ceilalți pași ai rutinei\n• Previne pierderea apei din piele (TEWL)\n• Vindecă bariera cutanată deteriorată\n• Ideal pentru ten extrem de uscat sau irititat\n\n💡 Vaseline = Occlusiv pur, non-comedogenic, hypoallergenic\n\n⚠️ Nu e recomandat pentru ten gras sau acneic!\n🔄 Alternativă mai ușoară: Aquaphor sau CeraVe Healing Ointment','rutina',0),(263,'skincare,coreean,kbeauty,ce,este,pasi','Ce este skincare-ul coreean (K-Beauty)?','K-Beauty (Korean Beauty) a revoluționat skincare-ul mondial:\n\n🇰🇷 Filozofia: prevenție > tratament, hidratare = baza\n\nRutina clasică coreeană (10 pași):\n1. Ulei de curățare\n2. Cleanser apos\n3. Exfoliant (2-3x/săptămână)\n4. Toner\n5. Esență\n6. Ser/Ampoule\n7. Mască de față (sheet mask)\n8. Cremă de ochi\n9. Hidratant\n10. SPF (dimineața)\n\n💡 Nu trebuie să faci toți 10 pași! Adaptează la nevoile tale.\nIngrediente emblematice K-Beauty: Snail Mucin, Centella, Rice Water, Ginseng','rutina',0),(264,'masca,fata,sheet,mask,cat,des,cum','Cât de des folosesc masca de față?','Ghid măști de față:\n\n🎭 Sheet Masks (măști tip folie):\n• 1-3x/săptămână (sau zilnic dacă sunt hidratante simple)\n• Lasă 15-20 minute, nu mai mult (se reabsoarbe serul uscat)\n• Nu clăti — bate ușor restul de ser\n\n🧪 Măști cu Argilă (Clay Masks):\n• 1x/săptămână pentru ten gras/mixt\n• Maxim 10-15 minute (argila uscată complet irită)\n• Zona T sau toată fața\n\n💡 Multi-masking: mască cu argilă pe zona T + mască hidratantă pe obraji simultan\n\n⚠️ Nu folosi mască cu AHA/retinol frecvent — risc supraexfoliere!','rutina',0),(265,'gua,sha,roller,jade,ce,fac,beneficii','La ce ajută Gua Sha și Jade Roller?','Gua Sha și Jade Roller — instrumente de masaj facial:\n\n✅ Beneficii dovedite:\n• Drenaj limfatic (reduce puffiness/umflăturile matinale)\n• Relaxare musculară facială\n• Îmbunătățirea circulației sanguine\n• Aspect mai luminat după utilizare\n• Ritual relaxant de self-care\n\n⚠️ Ce NU fac:\n• Nu reduc permanent obrajii sau dublul bărbie\n• Nu elimină ridurile\n• Nu \"tonifiază\" mușchii facial\n\n💡 Cum le folosești corect:\n• Pe piele curată cu ser sau ulei (niciodată uscat!)\n• Mișcări de jos în sus, dinspre centru spre exterior\n• Jade Roller păstrat la frigider = efect anti-puffiness maxim','rutina',0),(266,'sauna,abur,fata,bun,rau,pori','Sauna sau aburul deschide porii?','Mitul aburului — o clarificare importantă:\n\n❌ FALS: \"Aburul deschide porii\"\nPorii nu au mușchi — nu se deschid și nu se închid!\n\n✅ Ce face REALMENTE aburul:\n• Înmoaie sebumul și impuritățile din pori → mai ușor de curățat\n• Hidratează temporar suprafața pielii\n• Pregătește pielea pentru curățare mai eficientă\n\n⚠️ Precauții:\n• Temperatura extremă irită pielea sensibilă\n• Nu direct pe față (minim 30 cm distanță)\n• Apa fierbinte pe față = vasele de sânge se dilată → roșeață\n\n💡 Sfat: apa caldă (nu fierbinte) la curățare = efect similar, mai sigur','rutina',0),(267,'ordinea,ser,mai,multe,cum,aplic,layering','Cum aplic mai multe seruri în aceeași rutină?','Când ai mai multe seruri, ordinea contează:\n\n📋 Regula principală: de la cel mai lichid la cel mai dens\n\n✅ Ordinea corectă:\n1. Ser apos (ex: Acid Hialuronic)\n2. Ser mediu (ex: Niacinamide, Vitamina C)\n3. Ser dens/ulei (ex: Retinol în Squalane)\n\n💡 Reguli practice:\n• Maxim 2-3 seruri active în aceeași rutină\n• Lasă 30-60 secunde între seruri\n• Nu combina activi incompatibili (AHA + Retinol)\n• Dimineața: antioxidanți (Vit C) + SPF\n• Seara: activi de reînnoire (Retinol, AHA)','rutina',0),(268,'toamna,iarna,schimb,rutina,sezon','Trebuie să schimb rutina skincare cu sezonul?','Da! Pielea are nevoi diferite în funcție de sezon:\n\n❄️ TOAMNĂ/IARNĂ:\n• Adaugă produse mai hrănitoare (cremă mai bogată)\n• Crește layering-ul de hidratare\n• Continuă SPF (zăpada reflectă UV!)\n• Umidificator în casă = ajutor major pentru piele uscată\n• Reduce frecvența exfolierii dacă pielea e mai sensibilă\n\n☀️ PRIMĂVARĂ/VARĂ:\n• Treci la texturi mai ușoare (gel, fluid)\n• SPF mai ridicat, reaplicare mai frecventă\n• Poți crește frecvența exfolierii\n• Antioxidanți (Vit C) mai importanți','rutina',0),(269,'milia,puncte,albe,sub,piele,ce,sunt','Ce sunt miliile (punctele albe sub piele)?','Miliile sunt chisturi mici de keratină — NU sunt coșuri!\n\n📌 Cum apar:\n• Keratina prinsă sub piele (nu e sebum!)\n• Produse prea grase/ocluzive în zona ochilor\n• Post-proceduri (laser, peelinguri)\n• Genetic\n\n✅ Ce ajută:\n• Retinol — accelerează turnover-ul celular\n• AHA (Acid Glicolic/Lactic) — exfoliere\n• Curățare blândă regulată\n\n❌ NU încerca să le storci singur — cicatrici!\n⚕️ Dermatologul le poate extrage în câteva secunde cu un ac steril.','probleme_piele',0),(270,'keratosis,pilaris,cosuri,brate,picioare,par,ingrown','Ce este Keratosis Pilaris (\"găinațul de găină\" pe brațe)?','Keratosis Pilaris (KP) — bumps mici pe brațe, coapse, obraji:\n\n📌 Ce e: foliculii de păr înfundați cu keratină — afecțiune genetică\n🔴 Nu e contagioasă, nu e acnee, nu e periculos\n\n✅ Ce ajută:\n• BHA (Acid Salicilic) în loțiune pentru corp\n• AHA (Acid Lactic, Glicolic) — exfoliere chimică\n• Hidratare intensă cu Uree (10-20%) — dezintegrează keratina\n• Evită săpunuri agresive și burete aspru\n\n⚠️ Nu dispare complet — se gestionează, nu se vindecă\n💡 Se ameliorează vara (umiditate mai mare) și se înrăutățește iarna','probleme_piele',0),(271,'under,eye,cearcane,ochi,umflati,cum,tratez','Cum tratez cearcănele și ochii umflați?','Cearcănele au cauze diferite — tratamentul depinde de tip:\n\n🔵 Cearcăne violete/albastre (vase de sânge):\n• Cafeina (vasoconstrictoare) — reduce temporar\n• Vitamina K\n• Jade Roller rece\n• Odihnă + hidratare\n\n🟤 Cearcăne maronii (pigmentare):\n• Vitamina C\n• Retinol (concentrație mică — zona ochilor e sensibilă!)\n• Acid Azelaic\n\n💧 Ochi umflați (puffiness):\n• Cafeina în cremă de ochi\n• Comprese reci / Jade Roller de la frigider\n• Dormit cu capul ușor ridicat\n• Reducerea consumului de sare\n\n💡 Cremele de ochi nu fac miracole — diferența față de hidratantul obișnuit e minimă','probleme_piele',0),(272,'buze,ingrijire,lip,balm,exfoliere,hidratare','Cum am grijă de buze?','Buzele nu au glande sebacee — se usucă mai rapid decât restul feței:\n\n✅ Rutina pentru buze:\n1. Exfoliere blândă 1-2x/săptămână (scrub de zahăr sau periuță moale)\n2. Lip balm cu ingrediente nutritive: Shea Butter, Ceramide, Vitamina E\n3. SPF pentru buze (deseori ignorat!)\n\n🚫 Obiceiuri de evitat:\n• Lingerea buzelor (agravează uscăciunea)\n• Lip balm cu mentol/camfor (efect de dependență)\n• Decojirea pielii uscate manual\n\n💡 Recomandare: aplică un strat gros de lip balm/vaselină înainte de somn\nOdată pe săptămână: miere + zahăr = scrub natural eficient','probleme_piele',0),(273,'acnee,hormonala,menstrual,ciclu,jawline,barbife','Ce este acneea hormonală și cum o tratez?','Acneea hormonală — caracteristici:\n\n📍 Localizare tipică: bărbie, linia maxilarului, gât\n📅 Timing: apare cu 1-2 săptămâni înainte de menstruație\n🔴 Aspect: coșuri chistice, adânci, dureroase\n\n✅ Ce ajută topic:\n• Acid Salicilic (BHA) — curăță porii\n• Niacinamide — reduce inflamația\n• Benzoil Peroxid pe coșurile active\n• Zinc — antiandrogen local\n\n⚕️ Pentru cazuri moderate/severe: consultă medicul!\nSoluții medicale: anticoncepționale (echilibrare hormonală), Spironolactonă, Isotretinoin\n\n💡 Produsele topice au efect limitat pe acneea hormonală — cauza e internă!','probleme_piele',0),(274,'hiperpigmentare,post,inflamatorie,pih,pete,rosii,maro','Ce este hiperpigmentarea post-inflamatorie (PIH)?','PIH = petele rămase după acnee, iritații sau răni:\n\n🔴 Pete roșii: post-inflamatorii (eritema) — dispar în 3-6 luni\n🟤 Pete maronii: hiperpigmentare = melanina în exces — mai greu de tratat\n\n✅ Ingrediente eficiente pentru PIH:\n• Niacinamide — inhibă transferul melaninei\n• Alpha Arbutin — blochează producerea melaninei\n• Vitamina C — antioxidant + uniformizare\n• Acid Azelaic — multieffect\n• Retinol — accelerează înnoirea celulară\n\n☀️ REGULĂ DE AUR: SPF zilnic este NON-NEGOCIABIL!\nFără SPF, orice tratament pentru pete este ineficient — soarele reactivează melanina.','probleme_piele',0),(275,'seboreic,dermatita,matreata,fata,scuame,rosie','Ce este dermatita seboreică pe față?','Dermatita seboreică este o afecțiune cronică a pielii cauzată de o ciupercă (Malassezia):\n\n📍 Zone afectate: sprâncene, linia părului, șanțurile nazolabiale, urechi\n🔴 Aspectul: roșeață, scuame gălbui, mâncărime\n\n✅ Ce ajută:\n• Zinc Pyrithione (în șampoane și creme)\n• Ketoconazol (antifungic — prescripție)\n• Acid Azelaic — reduce Malassezia\n• Evitarea produselor cu uleiuri grele (hrănesc ciuperca)\n\n⚠️ Nu confunda cu psoriazis sau eczemă — aspectul poate fi similar!\n⚕️ Pentru cazuri persistente: obligatoriu dermatolog\n💡 Stresul agravează dermatita seboreică — rutina de relaxare contează!','probleme_piele',0),(276,'cicatrici,acnee,atrofice,boxcar,icepick,tratament','Cum tratez cicatricile de acnee?','Tipuri de cicatrici de acnee și tratamente:\n\n🔵 Cicatrici atrofice (adâncituri):\n• Ice pick (adânci, înguste) — cel mai greu de tratat\n• Boxcar (late, cu margini) — răspund la peeling-uri\n• Rolling (valuri) — răspund la biostimulare\n\n✅ Tratamente topic (efect moderat):\n• Retinol — stimulează colagenul\n• AHA (Acid Glicolic) — reînnoire celulară\n• Vitamina C — sinteza colagenului\n\n⚕️ Tratamente profesionale (efect real):\n• Microneedling\n• Peeling chimic (TCA)\n• Laser fractionat\n• Fillere (temporar)\n\n💡 Prevenția e mai simplă decât tratamentul — nu stoarce coșurile!','probleme_piele',0),(277,'mizon,cosrx,snail,melc,secretie,ce,face','Ce face mucina de melc (Snail Mucin)?','Mucina de melc (Snail Secretion Filtrate) este un bestseller K-Beauty:\n\n✅ Proprietăți multiple:\n• Hidratare intensă (glicoproteine + acid hialuronic natural)\n• Accelerează vindecarea (coșuri, iritații, cicatrici mici)\n• Stimulează colagenul\n• Antiaging\n• Calmant\n\n💡 Nu e cruzime față de animale — melcii nu sunt răniți, secretă mucina la stimulare blândă\n\nProduse iconice:\n• COSRX Advanced Snail 96 Mucin Power Essence\n• Mizon Snail Repair Cream\n\nPotrivit pentru: TOATE tipurile de ten, inclusiv sensibil','produse',0),(278,'tretinoin,retin,a,retinoid,prescriptie,retinol,diferenta','Care e diferența dintre Retinol și Tretinoin?','Retinoizii — de la mai slab la mai puternic:\n\n📊 Ierarhia retinoizilor:\n1. Retinyl Palmitate (cel mai slab — OTC)\n2. Retinol (standard — OTC)\n3. Retinaldehyde/Retinal (puternic — OTC/semi-prescripție)\n4. Tretinoin/Retinoic Acid (cel mai puternic — PRESCRIPȚIE)\n\n⚡ Tretinoin:\n• De 20x mai puternic decât retinolul\n• Acționează direct (retinolul se convertește în piele)\n• Rezultate mai rapide dar iritație mai mare\n• Necesită prescripție medicală\n• Produse: Retin-A, Tretinoin generică\n\n💡 Dacă retinolul nu mai dă rezultate după 6+ luni, discută cu dermatologul despre tretinoin.','produse',0),(279,'paula,choice,bha,exfoliant,recomandat,acid,salicilic','Ce este Paula\'s Choice BHA și cum îl folosesc?','Paula\'s Choice Skin Perfecting 2% BHA Liquid Exfoliant este considerat cel mai bun exfoliant BHA de pe piață:\n\n✅ Conține: Acid Salicilic 2% la pH optim\n✅ Curăță porii în profunzime\n✅ Reduce punctele negre și coșurile\n✅ Textură apoasă, ușor de aplicat\n\nCum se folosește:\n1. După toner, înainte de ser\n2. Se aplică cu un disc de bumbac sau palmele\n3. NU se clătește\n4. Începe cu 2-3x/săptămână, crește treptat\n\n⚠️ Obligatoriu SPF în zilele de utilizare!\n💰 Prețul e ridicat dar o sticlă durează 3-6 luni','produse',0),(280,'ordinary,peeling,aha,bha,cum,folosesc,risc','Cum folosesc The Ordinary AHA 30% + BHA 2% Peeling Solution?','The Ordinary AHA 30% + BHA 2% — peeling puternic, folosire ATENTĂ:\n\n⚠️ ATENȚIE: concentrație MARE — nu e pentru începători!\n\n📋 Protocol corect:\n1. Aplică pe față curată și uscată\n2. Lasă MAXIM 10 minute (nu mai mult!)\n3. Clătește BINE cu apă\n4. Aplică imediat hidratant calmant\n5. Folosește DOAR seara, DOAR 1x/săptămână\n\n🚫 NU folosi dacă:\n• Ai piele sensibilă sau reactivă\n• Ai răni active sau acnee inflamată severă\n• Ai folosit retinol în aceeași seară\n\n☀️ SPF obligatoriu a doua zi dimineață!\n💡 Față roșie imediat după = normal; roșeață persistentă = iritație','produse',0),(281,'nuskin,herbalife,avon,oriflame,calitate,buna','Produsele Avon, Oriflame sunt de calitate?','Realitatea despre brandurile \"populare\":\n\n✅ Ce este ADEVĂRAT:\n• Avon și Oriflame au îmbunătățit semnificativ formulele în ultimii ani\n• Unele produse sunt eficiente (hidratante, SPF)\n• Accesibile ca preț\n\n⚠️ Ce să verifici INDIFERENT de brand:\n• Lista de ingrediente INCI (nu marketingul)\n• Conține ingrediente active eficiente?\n• Ce concentrație?\n• Testele clinice sunt reale sau \"in-house\"?\n\n💡 Regula de aur în skincare: ingredientele contează, nu brandul sau prețul!\nUn hidratant de 20 lei cu Glicerină + Ceramide > o cremă de 200 lei cu ingredient exotic neeficient\n\nRecomandat: verifică produsele pe INCIDecoder.com','produse',0),(282,'alimentatie,dieta,acnee,lapte,zahar,afecteaza,pielea','Alimentația afectează acneea și pielea?','Da — legătura dintre dietă și piele e reală:\n\n🥛 LACTATE (în special lapte degresat):\n• Studii asociază consumul mare cu acnee\n• Mecanismul: hormoni de creștere din lapte → stimulează sebumul\n• Brânzeturile fermentate = risc mai mic\n\n🍬 ZAHĂR și ALIMENTE CU INDICE GLICEMIC MARE:\n• Cresc insulina → stimulează androgenii → mai mult sebum → acnee\n• Pâine albă, orez alb, dulciuri, băuturi carbogazoase\n\n✅ Alimentație pro-piele:\n• Omega-3 (pește gras, semințe de in) — antiinflamator\n• Antioxidanți (fructe, legume colorate)\n• Zinc (semințe de dovleac, nuci)\n• Hidratare (2L apă/zi)\n\n⚠️ Nu există o dietă universală anti-acnee — observă cum REACȚIONEAZĂ PIELEA TA!','general',0),(283,'stres,somn,pielea,acnee,efecte,cortizol','Stresul și lipsa somnului afectează pielea?','DA — conexiunea piele-creier (axa piele-intestin-creier) e bine documentată:\n\n😰 STRESUL:\n• Crește cortizolul → mai mult sebum → acnee\n• Degradează colagenul → îmbătrânire prematură\n• Inflamație sistemică → sensibilitate crescută\n• Agravează: acnee, eczeme, psoriazis, rozacee, dermatită\n\n😴 LIPSA SOMNULUI:\n• Regenerarea celulară are loc NOAPTEA (orele 22-2)\n• Cortizol ridicat + GH scăzut = piele mai îmbătrânită\n• Cearcăne, puffiness, ten tern\n\n✅ Cel mai subevaluat skincare:\n• 7-9 ore somn calitativ\n• Tehnici de reducere a stresului\n• Lenjerie de perne curată (schimbă 2x/săptămână!)','general',0),(284,'exercitii,sport,pielea,acnee,transpiratie,efect','Sportul ajută sau dăunează pielii?','Sportul are efecte POZITIVE și NEGATIVE — depinde de îngrijire:\n\n✅ BENEFICII:\n• Circulație îmbunătățită → nutrienți mai mulți la celulele pielii\n• Reducerea stresului (cortizol mai mic)\n• Detoxifiere prin transpirație\n• Somn mai bun → regenerare mai bună\n\n⚠️ RISCURI dacă nu îngrijești corect:\n• Transpirația + sebumul + bacteriile = acnee post-workout\n• Frecare (căști, bretele sutien) = acnee mecanică\n\n✅ Rutina corectă post-sport:\n1. Spălare față imediat după antrenament\n2. Nu lăsa transpirația să se usuce pe față\n3. Curățare blândă — pielea e deja iritată\n4. Hidratare ușoară','general',0),(285,'apa,dura,calcara,pielea,efect,probleme','Apa dură (calcaroasă) afectează pielea?','DA — apa dură are efect real asupra pielii:\n\n💧 Ce face apa dură:\n• Mineralele (calciu, magneziu) se depun pe piele\n• Perturbă pH-ul natural al pielii\n• Poate agrava eczema, pielea uscată, rozaceea\n• Reduce eficiența cleanser-urilor (formează un film)\n\n✅ Soluții:\n• Micelară sau apă minerală pentru curățare finală\n• Acid Citric diluat în apă = \"soft water\" DIY\n• Filtru de duș (disponibil online, ~50-150 lei)\n• Toner cu pH acid după curățare (reechilibrează)\n\n💡 Dacă pielea ta s-a înrăutățit după ce te-ai mutat = verifică duritatea apei din zonă','general',0),(286,'parfum,fragrance,skincare,evita,iritatie','De ce ar trebui să evit parfumul în produsele cosmetice?','Parfumul (Fragrance/Parfum pe etichete) este cauza nr. 1 de alergii cosmetice:\n\n⚠️ De ce e problematic:\n• Un singur ingredient \"Fragrance\" poate ascunde 200+ substanțe chimice\n• Alergeni cunoscuți: Limonene, Linalool, Eugenol, Geraniol\n• Irită și sensibilizează pielea în timp\n• Perturbă bariera cutanată\n\n🚫 De evitat în special dacă ai:\n• Piele sensibilă sau reactivă\n• Rozacee, eczeme, dermatită\n• Acnee (parfumul poate agrava)\n\n✅ Cum identifici pe etichetă:\n• \"Fragrance\" sau \"Parfum\" = amestec nedezvăluit\n• Uleiuri esențiale (Lavender Oil, Citrus) = tot parfum natural, tot iritant\n\n💡 \"Unscented\" ≠ \"Fragrance-free\" — unscented poate conține parfum mascat!','general',0),(287,'eco,bio,natural,organic,cosmetice,mai,bun,sintetic','Produsele naturale/bio sunt mai bune pentru piele?','Mitul \"natural = mai bun\" în skincare:\n\n❌ FALS — naturalul nu e automat mai sigur sau mai eficient:\n\n⚠️ \"Naturale\" dar iritante:\n• Uleiuri esențiale (lavandă, bergamotă, lămâie) = alergeni comuni\n• Ulei de cocos = comedogenic (rating 4)\n• Suc de lămâie direct pe față = arsuri chimice (pH 2!)\n• Bicarbonat = distruge bariera cutanată (pH 9)\n\n✅ \"Sintetice\" dar excelente:\n• Acid Hialuronic sintetic = identic cu cel natural, mai pur\n• Niacinamide sintetic = 100% eficient\n• Ceramide sintetice = identice cu cele naturale\n\n💡 Principiul activ: ingredientele sunt evaluate pe EFICIENȚĂ și SIGURANȚĂ, nu pe origine.','general',0),(288,'apa,micelara,suficienta,curatare,ajunge,demachiant','Apa micelară este suficientă pentru curățare?','Apa micelară singură NU este suficientă pentru curățare completă:\n\n🔬 Ce face apa micelară:\n• Dizolvă machiajul și impuritățile de suprafață\n• Micele (molecule sferice) atrag murdăria\n• Rapidă și convenabilă\n\n❌ Ce NU face singură:\n• Nu curăță în profunzime\n• Nu îndepărtează complet SPF-ul (film rezistent)\n• Lăsată pe față fără clătire → surfactanții irită în timp\n\n✅ Folosire corectă:\n• Ca PRIM PAS în dubla curățare (seara)\n• Sau pentru dimineața când nu ai machiaj/SPF\n• Sau pentru curățare rapidă pe drum\n\n💡 Ideal: după apă micelară, urmează un cleanser apos pentru curățare completă.','general',0),(289,'ordinea,vitamina,c,spf,pot,combina,dimineata','Pot folosi Vitamina C și SPF în aceeași rutină de dimineață?','DA — Vitamina C și SPF nu doar că sunt compatibile, ci se POTENȚEAZĂ reciproc!\n\n☀️ Rutina ideală de dimineață:\n1. Cleanser\n2. Toner\n3. Ser Vitamina C (se aplică PE PIELE, nu amestecat cu SPF)\n4. Hidratant\n5. SPF (ultimul strat)\n\n✅ De ce funcționează împreună:\n• Vitamina C = antioxidant intern (neutralizează radicalii liberi care trec de SPF)\n• SPF = scut extern (blochează UV)\n• Împreună oferă protecție dublă\n\n⚠️ Nu amesteca produsele în palmă!\nAplică fiecare separat și lasă să se absoarbă parțial înainte de următorul pas.','rutina',0),(290,'contorno,ochi,crema,cand,incep,varsta','De la ce vârstă folosesc cremă de ochi?','Ghid vârstă și cremă de ochi:\n\n👁️ 20-25 ani: Nu e neapărat necesară. Hidratantul tău ajunge și în zona ochilor (evită contactul direct cu ochii).\n\n👁️ 25-30 ani: Ideal de introdus — prevenție. Caută: Acid Hialuronic, Peptide, Cafeina.\n\n👁️ 30+ ani: Beneficiu real. Adaugă Retinol (concentrație mică, specific pentru ochi), Vitamina C.\n\n💡 Adevărul despre cremele de ochi:\n• Pielea din jurul ochilor e de 3x mai subțire\n• Produsele obișnuite pot fi prea grele → milia!\n• Cremele de ochi au textură adaptată zonei\n• Dar ingredientele active sunt aceleași ca în seruri\n\n📌 Aplică: tamponând ușor cu inelarul (cel mai slab deget), nu frecat!','rutina',0),(291,'acid,folic,vitamina,b9,beneficii,ingredient,piele','Ce este acidul folic?','Acidul folic (Vitamina B9) în skincare:\n\n✅ Ajută la regenerarea celulară și producerea de noi celule\n✅ Reduce aspectul porilor dilatați\n✅ Hidratează și îmbunătățește textura pielii\n✅ Are proprietăți antioxidante — protejează de stresul oxidativ\n✅ Poate reduce hiperpigmentarea\n\n💊 Deseori confundat cu suplimentele alimentare (pentru sarcină), dar în cosmetice este un ingredient activ benefic pentru toate tipurile de ten.\n\n⚠️ De obicei se găsește în creme și seruri, nu ca ingredient principal.','ingrediente',1),(292,'vitamina,c,ascorbic,antioxidant,luminozitate,hiperpigmentare','Ce face vitamina C pentru piele?','Vitamina C (acid ascorbic) — unul dintre cei mai studiați activi:\n\n✨ Beneficii principale:\n✅ Antioxidant puternic — protejează de radicalii liberi și poluare\n✅ Stimulează producția de colagen\n✅ Uniformizează tonul pielii și reduce petele\n✅ Luminozitate imediată\n✅ Potențează efectul SPF\n\n⚠️ Instabilă la lumină și aer → depozitează în recipient opac\n⚠️ Poate irita pielea sensibilă la concentrații mari (>15%)\n\n💡 Folosește dimineața, sub SPF. Începe cu concentrații mici (5-10%).','ingrediente',0),(293,'zinc,beneficii,acnee,sebum,ingredient,piele,grasa','Ce face zincul pentru piele?','Zincul în skincare:\n\n✅ Reglează producția de sebum — ideal pentru ten gras și acneic\n✅ Proprietăți anti-inflamatorii — reduce roșeața\n✅ Accelerează vindecarea imperfecțiunilor\n✅ Antibacterian — combate bacteria acneică\n✅ Antioxidant ușor\n\n📌 Se găsește în: SPF-uri minerale (zinc oxide), produse pentru ten acneic, creme BB.\n\n💡 Zincul oral (supliment) este de asemenea eficient împotriva acneei moderate.','ingrediente',0),(294,'colagen,producere,antiaging,riduri,elasticitate','Cum stimulez producția de colagen?','Cum stimulezi producția de colagen:\n\n🔬 Ingrediente dovedite științific:\n✅ Retinol / Retinoids — nr. 1 antiaging, stimulează colagenul direct\n✅ Vitamina C — cofactor esențial în sinteza colagenului\n✅ Peptide (ex: Matrixyl) — semnalizează pielea să producă colagen\n✅ AHA (glicolic, lactic) — reînnoiesc celulele\n\n❌ Crema cu colagen NU adaugă colagen în piele (molecula e prea mare)\n\n🌿 Stil de viață:\n• SPF zilnic (soarele distruge colagenul!)\n• Antioxidanți în dietă\n• Fără fumat\n• Hidratare adecvată','ingrediente',0);
/*!40000 ALTER TABLE `faq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredient`
--

DROP TABLE IF EXISTS `ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredient` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nume` varchar(100) COLLATE utf8mb4_romanian_ci NOT NULL,
  `descriere` text COLLATE utf8mb4_romanian_ci,
  `categorie` enum('activ','emollient','umectant','conservant','parfum','altele') COLLATE utf8mb4_romanian_ci DEFAULT NULL,
  `potentialAlergen` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `nume` (`nume`),
  KEY `idx_nume` (`nume`),
  KEY `idx_alergen` (`potentialAlergen`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_romanian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredient`
--

LOCK TABLES `ingredient` WRITE;
/*!40000 ALTER TABLE `ingredient` DISABLE KEYS */;
INSERT INTO `ingredient` VALUES (1,'Acid Hialuronic','Hidrateaza si mentine apa in tesuturi','umectant',0),(2,'Niacinamide','Regleaza sebumul si uniformizeaza nuanta pielii','activ',0),(3,'Acid Salicilic (BHA)','Exfoliant chimic ce curata porii in profunzime','activ',0),(4,'Parfum (Fragrance)','Ofera un miros placut, dar poate irita','parfum',1),(5,'Ceramide',NULL,'emollient',0);
/*!40000 ALTER TABLE `ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jurnalprogres`
--

DROP TABLE IF EXISTS `jurnalprogres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jurnalprogres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `membruId` int NOT NULL,
  `imagePath` varchar(500) COLLATE utf8mb4_romanian_ci DEFAULT NULL,
  `observatii` text COLLATE utf8mb4_romanian_ci,
  `rating` tinyint NOT NULL,
  `dataIntrare` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_membru_data` (`membruId`,`dataIntrare`),
  CONSTRAINT `jurnalprogres_ibfk_1` FOREIGN KEY (`membruId`) REFERENCES `membru` (`id`) ON DELETE CASCADE,
  CONSTRAINT `jurnalprogres_chk_1` CHECK ((`rating` between 1 and 10))
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_romanian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jurnalprogres`
--

LOCK TABLES `jurnalprogres` WRITE;
/*!40000 ALTER TABLE `jurnalprogres` DISABLE KEYS */;
INSERT INTO `jurnalprogres` VALUES (1,1,NULL,'Tenul este foarte uscat și iritat',4,'2025-11-27'),(2,1,NULL,'Încep să văd o mică îmbunătățire după crema hidratantă',5,'2025-12-27'),(3,1,NULL,'Acneea s-a redus vizibil datorită Niacinamidei!',7,'2026-01-27'),(4,1,NULL,'Tenul arată grozav!',8,'2026-02-27'),(5,1,NULL,'Tenul este foarte uscat și iritat',4,'2025-11-27'),(6,1,NULL,'Încep să văd o mică îmbunătățire după crema hidratantă',5,'2025-12-27'),(7,1,NULL,'Acneea s-a redus vizibil datorită Niacinamidei!',7,'2026-01-27'),(8,1,NULL,'Tenul arată grozav!',8,'2026-02-27'),(23,2,NULL,'m',4,'2026-02-27'),(25,2,NULL,'rea',3,'2026-03-06'),(26,5,NULL,'buna',6,'2026-03-06'),(27,2,NULL,'super\n',8,'2026-03-06'),(28,2,NULL,'buna',8,'2026-03-07');
/*!40000 ALTER TABLE `jurnalprogres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likepostare`
--

DROP TABLE IF EXISTS `likepostare`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likepostare` (
  `id` int NOT NULL AUTO_INCREMENT,
  `postareId` int NOT NULL,
  `membruId` int NOT NULL,
  `dataLike` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_like` (`postareId`,`membruId`),
  KEY `membruId` (`membruId`),
  CONSTRAINT `likepostare_ibfk_1` FOREIGN KEY (`postareId`) REFERENCES `postare` (`id`) ON DELETE CASCADE,
  CONSTRAINT `likepostare_ibfk_2` FOREIGN KEY (`membruId`) REFERENCES `membru` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_romanian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likepostare`
--

LOCK TABLES `likepostare` WRITE;
/*!40000 ALTER TABLE `likepostare` DISABLE KEYS */;
INSERT INTO `likepostare` VALUES (2,3,2,'2026-03-06 23:55:48'),(3,2,2,'2026-03-06 23:55:55'),(4,6,2,'2026-03-07 00:24:24');
/*!40000 ALTER TABLE `likepostare` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `membru`
--

DROP TABLE IF EXISTS `membru`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `membru` (
  `id` int NOT NULL AUTO_INCREMENT,
  `utilizatorId` int NOT NULL,
  `nume` varchar(100) COLLATE utf8mb4_romanian_ci NOT NULL,
  `prenume` varchar(100) COLLATE utf8mb4_romanian_ci NOT NULL,
  `dataNasterii` date DEFAULT NULL,
  `gen` enum('feminin','masculin','altul','prefer_sa_nu_specific') COLLATE utf8mb4_romanian_ci DEFAULT NULL,
  `avatarUrl` varchar(500) COLLATE utf8mb4_romanian_ci DEFAULT NULL,
  `nivelExperienta` enum('incepator','intermediar','avansat') COLLATE utf8mb4_romanian_ci DEFAULT 'incepator',
  PRIMARY KEY (`id`),
  UNIQUE KEY `utilizatorId` (`utilizatorId`),
  CONSTRAINT `membru_ibfk_1` FOREIGN KEY (`utilizatorId`) REFERENCES `utilizator` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_romanian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membru`
--

LOCK TABLES `membru` WRITE;
/*!40000 ALTER TABLE `membru` DISABLE KEYS */;
INSERT INTO `membru` VALUES (1,2,'Popescu','Ioana','2001-05-15','feminin',NULL,'incepator'),(2,3,'Popescu','Mara',NULL,NULL,NULL,'incepator'),(3,4,'Admin','GlowGuide',NULL,NULL,NULL,'incepator'),(4,5,'Crainiceanu','Madalina',NULL,NULL,NULL,'incepator'),(5,6,'M','C',NULL,NULL,NULL,'incepator'),(6,7,'c','d',NULL,NULL,NULL,'incepator');
/*!40000 ALTER TABLE `membru` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postare`
--

DROP TABLE IF EXISTS `postare`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postare` (
  `id` int NOT NULL AUTO_INCREMENT,
  `membruId` int DEFAULT NULL,
  `titlu` varchar(200) COLLATE utf8mb4_romanian_ci NOT NULL,
  `continut` text COLLATE utf8mb4_romanian_ci NOT NULL,
  `status` enum('in_asteptare','publicata','respinsa') COLLATE utf8mb4_romanian_ci DEFAULT 'in_asteptare',
  `dataPostare` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `membruId` (`membruId`),
  KEY `idx_status` (`status`),
  KEY `idx_data` (`dataPostare`),
  CONSTRAINT `postare_ibfk_1` FOREIGN KEY (`membruId`) REFERENCES `membru` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_romanian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postare`
--

LOCK TABLES `postare` WRITE;
/*!40000 ALTER TABLE `postare` DISABLE KEYS */;
INSERT INTO `postare` VALUES (1,1,'Pareri despre Cerave vs Cetaphil?','Buna! A folosit cineva cele doua geluri de curatare? Care usuca mai putin tenul?','publicata','2026-02-27 12:00:26'),(2,2,'Cosrx','este ok','publicata','2026-03-06 19:28:13'),(3,3,'niacinamide','ce parere aveti?\n','publicata','2026-03-06 19:39:01'),(4,3,'niacinamide','ccc','respinsa','2026-03-06 19:39:42'),(5,2,'ppp','zzz','publicata','2026-03-06 19:42:45'),(6,2,'cerave','e bun cleanserul de la ei?','publicata','2026-03-06 23:56:39'),(7,4,'niac','pt ce sunt fol?','publicata','2026-03-07 00:06:39'),(8,3,'ser','e bun serul de la cosrx?\n','publicata','2026-03-07 00:25:22');
/*!40000 ALTER TABLE `postare` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produs`
--

DROP TABLE IF EXISTS `produs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nume` varchar(200) COLLATE utf8mb4_romanian_ci NOT NULL,
  `brand` varchar(100) COLLATE utf8mb4_romanian_ci DEFAULT NULL,
  `categorie` enum('curatare','toner','ser','hidratant','spf','masca','exfoliant') COLLATE utf8mb4_romanian_ci DEFAULT NULL,
  `tipTenRecomandat` set('uscat','normal','mixt','gras','sensibil') COLLATE utf8mb4_romanian_ci DEFAULT NULL,
  `obiectiv` set('hidratare','anti-aging','anti-acnee','uniformizare','protectie') COLLATE utf8mb4_romanian_ci DEFAULT NULL,
  `pret` decimal(10,2) DEFAULT NULL,
  `rating` decimal(3,2) DEFAULT '0.00',
  `descriere` text COLLATE utf8mb4_romanian_ci,
  `dataAdaugare` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_brand` (`brand`),
  KEY `idx_categorie` (`categorie`),
  KEY `idx_rating` (`rating`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_romanian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produs`
--

LOCK TABLES `produs` WRITE;
/*!40000 ALTER TABLE `produs` DISABLE KEYS */;
INSERT INTO `produs` VALUES (1,'Gel de curatare Spumant','CeraVe','curatare','normal,mixt,gras','anti-acnee,uniformizare',55.00,0.04,'Curata bland fara sa usuce.','2026-02-23 23:19:48'),(2,'Ser cu Niacinamide 10% + Zinc','The Ordinary','ser','mixt,gras','anti-acnee,uniformizare',35.00,0.00,'Ser pentru reglarea sebumului.','2026-02-23 23:19:48'),(3,'Crema Hidratanta cu Acid Hialuronic','Neutrogena','hidratant','uscat,normal,mixt','hidratare',60.00,0.00,'Textura lejera, tip gel water.','2026-02-23 23:19:48'),(4,'The Ordinary Niacinamide','The Ordinary','ser','normal,mixt,gras',NULL,NULL,4.75,NULL,'2026-02-27 11:35:21'),(5,'Neutrogena Hydro Boost','Neutrogena','hidratant','uscat,normal,mixt',NULL,NULL,4.57,NULL,'2026-02-27 11:35:21'),(6,'La Roche-Posay Anthelios SPF50','La Roche-Posay','spf','normal,mixt,gras,sensibil',NULL,NULL,4.97,NULL,'2026-02-27 11:35:21');
/*!40000 ALTER TABLE `produs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produsingredient`
--

DROP TABLE IF EXISTS `produsingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produsingredient` (
  `produsId` int NOT NULL,
  `ingredientId` int NOT NULL,
  `concentratie` decimal(5,2) DEFAULT NULL,
  `ordineLista` int DEFAULT NULL,
  PRIMARY KEY (`produsId`,`ingredientId`),
  KEY `ingredientId` (`ingredientId`),
  CONSTRAINT `produsingredient_ibfk_1` FOREIGN KEY (`produsId`) REFERENCES `produs` (`id`) ON DELETE CASCADE,
  CONSTRAINT `produsingredient_ibfk_2` FOREIGN KEY (`ingredientId`) REFERENCES `ingredient` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_romanian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produsingredient`
--

LOCK TABLES `produsingredient` WRITE;
/*!40000 ALTER TABLE `produsingredient` DISABLE KEYS */;
INSERT INTO `produsingredient` VALUES (1,1,1.00,4),(1,2,4.00,2),(1,5,NULL,NULL),(2,2,10.00,1),(2,3,NULL,NULL),(3,1,2.00,2),(3,2,NULL,NULL),(3,4,NULL,15),(4,1,NULL,NULL),(5,2,NULL,NULL),(6,5,NULL,NULL);
/*!40000 ALTER TABLE `produsingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profildermatologic`
--

DROP TABLE IF EXISTS `profildermatologic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profildermatologic` (
  `id` int NOT NULL AUTO_INCREMENT,
  `membruId` int NOT NULL,
  `tipTen` enum('uscat','normal','mixt','gras','sensibil') COLLATE utf8mb4_romanian_ci NOT NULL,
  `imagePath` varchar(500) COLLATE utf8mb4_romanian_ci DEFAULT NULL,
  `alergii` text COLLATE utf8mb4_romanian_ci,
  `probleme` text COLLATE utf8mb4_romanian_ci,
  `obiective` text COLLATE utf8mb4_romanian_ci,
  `nivelSensibilitate` tinyint unsigned DEFAULT NULL,
  `varsta` int DEFAULT NULL,
  `dataCreare` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataActualizare` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `membruId` (`membruId`),
  CONSTRAINT `profildermatologic_ibfk_1` FOREIGN KEY (`membruId`) REFERENCES `membru` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_romanian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profildermatologic`
--

LOCK TABLES `profildermatologic` WRITE;
/*!40000 ALTER TABLE `profildermatologic` DISABLE KEYS */;
INSERT INTO `profildermatologic` VALUES (1,1,'mixt',NULL,'[\"parabeni\", \"alcool\"]','[\"acnee\"]','[\"hidratare\"]',NULL,NULL,'2026-02-27 11:35:21','2026-02-27 11:35:21'),(4,2,'sensibil',NULL,'[\"alcool\"]','[\"tendință acneică\"]',NULL,NULL,NULL,'2026-02-27 12:42:24','2026-03-07 00:23:05'),(8,5,'sensibil',NULL,'[\"alcool\"]','[]',NULL,NULL,NULL,'2026-03-06 22:46:29','2026-03-06 22:58:21');
/*!40000 ALTER TABLE `profildermatologic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `raspunspostare`
--

DROP TABLE IF EXISTS `raspunspostare`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `raspunspostare` (
  `id` int NOT NULL AUTO_INCREMENT,
  `postareId` int NOT NULL,
  `membruId` int NOT NULL,
  `continut` text COLLATE utf8mb4_romanian_ci NOT NULL,
  `dataRaspuns` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `membruId` (`membruId`),
  KEY `idx_postare` (`postareId`),
  CONSTRAINT `raspunspostare_ibfk_1` FOREIGN KEY (`postareId`) REFERENCES `postare` (`id`) ON DELETE CASCADE,
  CONSTRAINT `raspunspostare_ibfk_2` FOREIGN KEY (`membruId`) REFERENCES `membru` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_romanian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `raspunspostare`
--

LOCK TABLES `raspunspostare` WRITE;
/*!40000 ALTER TABLE `raspunspostare` DISABLE KEYS */;
INSERT INTO `raspunspostare` VALUES (1,1,2,'da am folosit eu si nu e ok\n','2026-03-06 19:25:44'),(2,6,2,'da','2026-03-07 00:24:28');
/*!40000 ALTER TABLE `raspunspostare` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rutina`
--

DROP TABLE IF EXISTS `rutina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rutina` (
  `id` int NOT NULL AUTO_INCREMENT,
  `membruId` int NOT NULL,
  `tip` enum('zi','seara','completa') COLLATE utf8mb4_romanian_ci DEFAULT 'completa',
  `status` enum('generata','activa','arhivata') COLLATE utf8mb4_romanian_ci DEFAULT 'generata',
  `dataGenerarii` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_membru_status` (`membruId`,`status`),
  CONSTRAINT `rutina_ibfk_1` FOREIGN KEY (`membruId`) REFERENCES `membru` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_romanian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rutina`
--

LOCK TABLES `rutina` WRITE;
/*!40000 ALTER TABLE `rutina` DISABLE KEYS */;
INSERT INTO `rutina` VALUES (1,1,'completa','activa','2026-02-27 11:37:03'),(2,2,'completa','arhivata','2026-02-27 12:42:28'),(3,2,'completa','arhivata','2026-02-27 13:01:08'),(4,2,'completa','arhivata','2026-02-27 13:09:17'),(5,2,'completa','arhivata','2026-02-27 13:10:24'),(6,5,'completa','arhivata','2026-03-06 22:46:36'),(7,5,'completa','arhivata','2026-03-06 22:46:46'),(8,5,'completa','arhivata','2026-03-06 22:57:29'),(9,5,'completa','activa','2026-03-06 22:58:26'),(10,2,'completa','activa','2026-03-06 23:09:42');
/*!40000 ALTER TABLE `rutina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rutinaprodus`
--

DROP TABLE IF EXISTS `rutinaprodus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rutinaprodus` (
  `rutinaId` int NOT NULL,
  `produsId` int NOT NULL,
  `ordineAplicare` int NOT NULL,
  `scorProdus` decimal(4,2) DEFAULT NULL,
  PRIMARY KEY (`rutinaId`,`produsId`),
  KEY `produsId` (`produsId`),
  CONSTRAINT `rutinaprodus_ibfk_1` FOREIGN KEY (`rutinaId`) REFERENCES `rutina` (`id`) ON DELETE CASCADE,
  CONSTRAINT `rutinaprodus_ibfk_2` FOREIGN KEY (`produsId`) REFERENCES `produs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_romanian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rutinaprodus`
--

LOCK TABLES `rutinaprodus` WRITE;
/*!40000 ALTER TABLE `rutinaprodus` DISABLE KEYS */;
INSERT INTO `rutinaprodus` VALUES (1,1,1,NULL),(1,4,2,NULL),(1,5,3,NULL),(1,6,4,NULL),(2,4,1,NULL),(2,6,2,NULL),(3,1,1,NULL),(3,4,2,NULL),(3,5,3,NULL),(3,6,4,NULL),(4,6,1,NULL),(5,1,1,NULL),(5,4,2,NULL),(5,5,3,NULL),(5,6,4,NULL),(6,5,1,NULL),(7,5,1,NULL),(8,5,1,NULL),(9,6,1,NULL),(10,1,1,NULL),(10,4,2,NULL),(10,5,3,NULL),(10,6,4,NULL);
/*!40000 ALTER TABLE `rutinaprodus` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `actualizarePopularitateProdus` AFTER INSERT ON `rutinaprodus` FOR EACH ROW BEGIN
    UPDATE Produs
    SET rating = LEAST(rating + 0.01, 5.00)
    WHERE id = NEW.produsId;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `utilizator`
--

DROP TABLE IF EXISTS `utilizator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilizator` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) COLLATE utf8mb4_romanian_ci NOT NULL,
  `parola` varchar(255) COLLATE utf8mb4_romanian_ci NOT NULL,
  `rol` enum('membru','admin') COLLATE utf8mb4_romanian_ci DEFAULT 'membru',
  `dataInregistrare` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `esteActiv` tinyint(1) DEFAULT '1',
  `dataCreare` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_romanian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilizator`
--

LOCK TABLES `utilizator` WRITE;
/*!40000 ALTER TABLE `utilizator` DISABLE KEYS */;
INSERT INTO `utilizator` VALUES (1,'madalina@glowguide.ro','madalina','admin','2026-02-23 23:19:48',1,'2026-03-07 00:03:45'),(2,'test@membru.ro','123456','membru','2026-02-23 23:19:48',1,'2026-03-07 00:03:45'),(3,'test@glowguide.ro','$2b$10$JgUKR4MwgH1.Adq5p.OHFeNMgO4rcGNJfKtuF9CT.1TCU2czAo92m','membru','2026-02-27 11:30:13',1,'2026-03-07 00:03:45'),(4,'admin@glowguide.ro','$2b$10$p.WD92yamjCaneVbw.hGuOw4FoOmzZakg8cMZ4mlTyHESnzVbhNWW','admin','2026-03-06 19:37:23',1,'2026-03-07 00:03:45'),(5,'crainiceanumadalina@yahoo.com','$2b$10$XN8ike0Gaa0kjbiv6Cyebuyzy5pHRycNmE/RJFuH3rPLy4Wc2m4Hi','membru','2026-03-06 21:21:17',1,'2026-03-07 00:03:45'),(6,'crainiceanumadalina8@gmail.com','$2b$10$UwFAbZL9Bttoi7x5ubegG.NzMgxPiVMv/Fl9BoNDdbgOnZTxI70DG','membru','2026-03-06 22:01:46',1,'2026-03-07 00:03:45'),(7,'crainiceanuion9@gmail.com','$2b$10$ablxdzHr39D7.E9iYWhmYO4ykijtaK.Dw/jHgSx.Vd8.oB2LAYA7e','membru','2026-03-06 23:02:26',1,'2026-03-07 00:03:45');
/*!40000 ALTER TABLE `utilizator` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-07 23:40:53
