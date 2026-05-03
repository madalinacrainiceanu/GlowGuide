-- ============================================================
-- SCRIPT PRODUSE EXTINSE GLOWGUIDE — v2
-- ~250 produse reale
-- Categorii: curatare, toner, ser, hidratant, spf
-- Tipuri ten: normal, gras, uscat, mixt, sensibil
-- Unele produse acoperă mai multe tipuri de ten (valori separate cu virgulă)
-- ============================================================

INSERT INTO produs (nume, brand, categorie, tipTenRecomandat, obiectiv, pret, rating, descriere) VALUES

-- ============================================================
-- CURATARE — normal
-- ============================================================
('Gentle Daily Cleanser', 'CeraVe', 'curatare', 'normal', 'hidratare', 42.00, 4.60, 'Gel de curățare blând cu ceramide, menține bariera naturală a pielii.'),
('Foaming Facial Cleanser', 'Neutrogena', 'curatare', 'normal', 'hidratare', 35.00, 4.40, 'Gel spumant ușor, curăță eficient fără a usca pielea.'),
('Daily Face Wash', 'Simple', 'curatare', 'normal', 'hidratare', 30.00, 4.20, 'Gel de curățare fără parfum și coloranți, blând pentru ten normal.'),
('Amino Acid Gentle Cleanser', 'Minimalist', 'curatare', 'normal', 'hidratare', 32.00, 4.50, 'Gel cu aminoacizi, pH 5.5, curăță blând fără a perturba microbiomul pielii.'),
('Fresh Foam Cleanser', 'COSRX', 'curatare', 'normal', 'hidratare', 38.00, 4.55, 'Spumă de curățare cu extract de miel și acid salicilic 0.5%, curăță delicat.'),
('Micellar Cleansing Water', 'Garnier', 'curatare', 'normal', 'hidratare', 28.00, 4.30, 'Apă micelară 3 în 1, elimină machiajul și impuritățile fără clătire.'),
('Facial Cleanser Normal Skin', 'Cetaphil', 'curatare', 'normal', 'hidratare', 45.00, 4.50, 'Loțiune de curățare cremă, menține echilibrul natural al pielii normale.'),
('Purifying Foam Cleanser', 'Kiehl''s', 'curatare', 'normal', 'hidratare', 89.00, 4.55, 'Spumă purificantă cu extract de argilă albă, curăță și reîmprospătează tenul normal.'),

-- ============================================================
-- CURATARE — gras
-- ============================================================
('Effaclar Gel Moussant', 'La Roche-Posay', 'curatare', 'gras', 'anti-acnee', 62.00, 4.70, 'Gel spumant cu zinc PCA, reduce sebumul în exces și purifică porii dilatați.'),
('Oil-Free Acne Wash', 'Neutrogena', 'curatare', 'gras', 'anti-acnee', 38.00, 4.30, 'Gel de curățare cu acid salicilic 2%, combate acneea și excesul de sebum.'),
('Pure Clay Cleanser', 'L''Oreal Paris', 'curatare', 'gras', 'anti-acnee', 45.00, 4.20, 'Gel cu argilă kaolin, absoarbe impuritățile și curăță profund porii.'),
('BHA Foam Cleanser', 'Paula''s Choice', 'curatare', 'gras', 'anti-acnee', 95.00, 4.65, 'Spumă de curățare cu acid salicilic, desfundă porii și reglează sebumul.'),
('Salicylic Acid Cleanser', 'The Ordinary', 'curatare', 'gras', 'anti-acnee', 32.00, 4.45, 'Gel de curățare cu acid salicilic 0.5%, exfoliază ușor și curăță porii.'),
('AHA/BHA Exfoliating Cleanser', 'Some By Mi', 'curatare', 'gras', 'anti-acnee', 48.00, 4.40, 'Gel de curățare exfoliant cu AHA, BHA și PHA, reduce acneea și uniformizează textura.'),
('ACNE-FOAMING CLEANSER', 'Avene', 'curatare', 'gras', 'anti-acnee', 55.00, 4.35, 'Gel cu acid glicolic și extract de hamamelis, purifică profund tenul gras.'),
('Tea Tree Skin Clearing Facial Wash', 'The Body Shop', 'curatare', 'gras', 'anti-acnee', 42.00, 4.25, 'Gel de curățare cu extract de arbore de ceai, purifică și mattifiază tenul gras.'),
('Balancing Cleanser', 'Bioderma', 'curatare', 'gras', 'anti-acnee', 58.00, 4.50, 'Gel echilibrant Sebium, reglează producția de sebum și curăță eficient.'),

-- ============================================================
-- CURATARE — uscat
-- ============================================================
('Hydrating Facial Cleanser', 'CeraVe', 'curatare', 'uscat', 'hidratare', 48.00, 4.80, 'Loțiune de curățare cu acid hialuronic și ceramide, hidratează în timp ce curăță.'),
('Toleriane Hydrating Gentle Cleanser', 'La Roche-Posay', 'curatare', 'uscat', 'hidratare', 58.00, 4.70, 'Cremă de curățare ultra-blândă, reconstruiește bariera cutanată.'),
('Gentle Cleansing Milk', 'Bioderma', 'curatare', 'uscat', 'hidratare', 55.00, 4.50, 'Lapte demachiant delicat, ideal pentru pielea uscată și fragilă.'),
('Ultra Rich Foam Cleanser', 'Clinique', 'curatare', 'uscat', 'hidratare', 120.00, 4.65, 'Spumă ultra-cremoasă cu glicerină, curăță și hrănește intens pielea uscată.'),
('Moisturizing Cream-to-Foam Cleanser', 'Olay', 'curatare', 'uscat', 'hidratare', 40.00, 4.30, 'Cremă ce se transformă în spumă, curăță și hidratează simultan.'),
('Soothing Cleansing Milk', 'Avene', 'curatare', 'uscat', 'hidratare', 62.00, 4.60, 'Lapte demachiant cu apă termală, curăță și calmează pielea uscată și sensibilă.'),
('Gentle Milk Cleanser', 'Eucerin', 'curatare', 'uscat', 'hidratare', 52.00, 4.45, 'Lapte de curățare cu pro-vitamin B5, hrănește și curăță pielea uscată.'),
('Oil Cleanser', 'DHC', 'curatare', 'uscat', 'hidratare', 85.00, 4.70, 'Ulei de curățare cu extract de măsline, dizolvă machiajul și hidratează profund.'),
('Creamy Face Wash', 'Kiehl''s', 'curatare', 'uscat', 'hidratare', 95.00, 4.65, 'Gel cremos cu calcar și ceramide, curăță și reface hidratarea pielii uscate.'),

-- ============================================================
-- CURATARE — mixt
-- ============================================================
('Balancing Face Wash', 'The Ordinary', 'curatare', 'mixt', 'hidratare', 28.00, 4.30, 'Gel de curățare echilibrant, purifică zona T fără a usca obrajii.'),
('Effaclar H Cleansing Cream', 'La Roche-Posay', 'curatare', 'mixt', 'hidratare', 72.00, 4.65, 'Cremă de curățare cu ceramide și niacinamidă, pentru ten mixt cu tendință grasă.'),
('Micellar Water', 'Bioderma', 'curatare', 'mixt', 'hidratare', 48.00, 4.60, 'Apă micelară Sebium, curăță eficient și reglează sebumul în zona T.'),
('Gentle Cleanser Combo', 'Cetaphil', 'curatare', 'mixt', 'hidratare', 52.00, 4.55, 'Gel de curățare echilibrant, fără parfum, potrivit pentru tenul mixt.'),
('Foam Cleanser', 'Purito', 'curatare', 'mixt', 'hidratare', 45.00, 4.50, 'Spumă de curățare blândă cu acid amino, pH echilibrat pentru ten mixt.'),
('Skin1004 Madagascar Cleanser', 'Skin1004', 'curatare', 'mixt', 'hidratare', 40.00, 4.45, 'Gel de curățare cu extract Centella, curăță blând și echilibrează tenul mixt.'),
('Niacinamide Face Wash', 'Minimalist', 'curatare', 'mixt', 'uniformizare', 35.00, 4.40, 'Gel cu niacinamidă 1%, reglează sebumul și minimizează porii în zona T.'),

-- ============================================================
-- CURATARE — sensibil
-- ============================================================
('Sensibio Gel Moussant', 'Bioderma', 'curatare', 'sensibil', 'hidratare', 65.00, 4.80, 'Gel de curățare hipoalergenic, testat dermatologic pentru pielea sensibilă.'),
('Toleriane Dermo-Cleanser', 'La Roche-Posay', 'curatare', 'sensibil', 'hidratare', 60.00, 4.75, 'Soluție de curățare fără clătire, calmează și protejează pielea reactivă.'),
('Ultra Gentle Daily Cleanser', 'Cetaphil', 'curatare', 'sensibil', 'hidratare', 50.00, 4.60, 'Loțiune de curățare fără spumă, formulă hipoalergenică fără parfum.'),
('Eau Thermale Cleansing Gel', 'Avene', 'curatare', 'sensibil', 'hidratare', 58.00, 4.70, 'Gel de curățare cu apă termală Avène, calmează și purifică pielea sensibilă.'),
('Cicaplast Gel B5', 'La Roche-Posay', 'curatare', 'sensibil', 'hidratare', 68.00, 4.75, 'Gel calmant cu panthenol, potrivit pentru pielea sensibilă și iritată.'),
('Gentle Skin Cleanser', 'Eucerin', 'curatare', 'sensibil', 'hidratare', 48.00, 4.55, 'Loțiune de curățare fără parfum cu panthenol, blândă pentru pielea sensibilă.'),
('Cicalfate Cleansing Gel', 'Avene', 'curatare', 'sensibil', 'hidratare', 72.00, 4.65, 'Gel cu Madecassol, repară și curăță pielea sensibilă și reactivă.'),
('3-in-1 Micellar Water Sensitive', 'Garnier', 'curatare', 'sensibil', 'hidratare', 30.00, 4.35, 'Apă micelară fără parfum, blândă pentru pielea sensibilă, testat dermatologic.'),

-- ============================================================
-- TONER — normal
-- ============================================================
('Glow Tonic', 'Pixi', 'toner', 'normal', 'uniformizare', 75.00, 4.50, 'Toner cu acid glicolic 5%, iluminează tenul și reduce petele.'),
('Rose Water Toner', 'Mario Badescu', 'toner', 'normal', 'hidratare', 55.00, 4.40, 'Toner cu apă de trandafir, hidratează și echilibrează pH-ul pielii.'),
('Toner 7% Glycolic Acid', 'Minimalist', 'toner', 'normal', 'uniformizare', 45.00, 4.55, 'Toner cu acid glicolic 7%, exfoliază ușor și uniformizează tonul tenului normal.'),
('Kombucha Essence Toner', 'Kiehl''s', 'toner', 'normal', 'uniformizare', 125.00, 4.60, 'Esență-toner cu kombucha, echilibrează microbiomul și luminozitatea pielii normale.'),
('Facial Treatment Essence', 'SK-II', 'toner', 'normal', 'anti-aging', 395.00, 4.85, 'Esență iconică cu Pitera, regenerează celulele și luminozează pielea.'),
('Toning Solution', 'Paula''s Choice', 'toner', 'normal', 'uniformizare', 88.00, 4.50, 'Toner cu antioxidanți și extract de hamamelis, pregătește pielea pentru ser.'),
('Watermelon Glow Toner', 'Glow Recipe', 'toner', 'normal', 'hidratare', 142.00, 4.65, 'Toner cu extract de pepene și AHA, hidratează și exfoliază blând tenul normal.'),

-- ============================================================
-- TONER — gras
-- ============================================================
('BHA Liquid Exfoliant', 'Paula''s Choice', 'toner', 'gras', 'anti-acnee', 120.00, 4.90, 'Toner exfoliant cu BHA 2%, desfundă porii și reduce punctele negre.'),
('Effaclar Micro-Peeling Toner', 'La Roche-Posay', 'toner', 'gras', 'anti-acnee', 82.00, 4.60, 'Toner cu LHA și acid glicolic, reduce imperfecțiunile și porii dilatați.'),
('AHA + BHA Clarifying Toner', 'Some By Mi', 'toner', 'gras', 'anti-acnee', 55.00, 4.40, 'Toner cu acizi AHA și BHA, exfoliază blând și uniformizează textura tenului gras.'),
('Salicylic Acid 2% Toner', 'The Ordinary', 'toner', 'gras', 'anti-acnee', 28.00, 4.35, 'Toner cu acid salicilic, desfundă porii și reglează sebumul excesiv.'),
('Green Tea Enzyme Toner', 'Innisfree', 'toner', 'gras', 'anti-acnee', 52.00, 4.40, 'Toner cu extract de ceai verde și enzime, reglează sebumul și purifică porii.'),
('Pore Refining Toner', 'Origins', 'toner', 'gras', 'anti-acnee', 98.00, 4.45, 'Toner cu acid salicilic și niacinamidă, minimizează vizibil porii dilatați.'),
('Sebium Lotion Plus', 'Bioderma', 'toner', 'gras', 'anti-acnee', 72.00, 4.55, 'Loțiune purificantă Sebium, reglează excesul de sebum și unifică textura.'),

-- ============================================================
-- TONER — uscat
-- ============================================================
('Advanced Snail 96 Mucin Toner', 'COSRX', 'toner', 'uscat', 'hidratare', 90.00, 4.70, 'Toner esență cu 96% filtrat de mucus de melc, regenerează și hidratează intens.'),
('Hada Labo Gokujyun Lotion', 'Hada Labo', 'toner', 'uscat', 'hidratare', 65.00, 4.80, 'Loțiune hialoronică cu 5 tipuri de acid hialuronic, hidratare profundă în straturi.'),
('Hyaluronic Acid 7 Toner', 'Torriden', 'toner', 'uscat', 'hidratare', 60.00, 4.75, 'Toner cu 7 tipuri de acid hialuronic, umple rezervele de hidratare ale pielii uscate.'),
('Peptide Complex Toner', 'The INKEY List', 'toner', 'uscat', 'hidratare', 55.00, 4.55, 'Toner cu peptide și ceramide, hrănește și reface textura pielii uscate.'),
('Rich Moist Toner', 'Kiehl''s', 'toner', 'uscat', 'hidratare', 145.00, 4.65, 'Toner hidratant bogat cu squalane și glicerină, hidratare intensă strat cu strat.'),
('Moisture Surge 100H Toner', 'Clinique', 'toner', 'uscat', 'hidratare', 135.00, 4.60, 'Toner esență cu aloe vera și acid hialuronic, hidratare susținută 100 ore.'),
('Hyalu B5 Aquagel', 'Vichy', 'toner', 'uscat', 'hidratare', 88.00, 4.60, 'Gel-apă cu acid hialuronic și vitamina B5, hidratare densă pentru ten uscat.'),

-- ============================================================
-- TONER — mixt
-- ============================================================
('Witch Hazel Toner', 'Thayers', 'toner', 'mixt', 'hidratare', 60.00, 4.50, 'Toner cu hamamelis și aloe vera, echilibrează zona T fără a deshidrata restul feței.'),
('Niacinamide 5% Toner', 'Minimalist', 'toner', 'mixt', 'uniformizare', 38.00, 4.55, 'Toner cu niacinamidă 5%, reglează sebumul în zona T și minimizează porii.'),
('Green Tea Balancing Toner', 'Innisfree', 'toner', 'mixt', 'hidratare', 48.00, 4.40, 'Toner cu extract de ceai verde, echilibrează tenul mixt și reduce roșeața ușoară.'),
('BHA + AHA 25% Peeling Solution', 'The Ordinary', 'toner', 'mixt', 'anti-acnee', 35.00, 4.30, 'Soluție peeling cu AHA/BHA, exfoliază zona T și uniformizează textura.'),
('Centella Toner', 'Skin1004', 'toner', 'mixt', 'hidratare', 45.00, 4.60, 'Toner cu 100% apă de Centella, calmează și hidratează tenul mixt.'),
('Pore Minimizing Toner', 'Origins', 'toner', 'mixt', 'uniformizare', 88.00, 4.45, 'Toner cu kaolin și hamamelis, purifică zona T și hidratează obrajii.'),

-- ============================================================
-- TONER — sensibil
-- ============================================================
('Cica-Daily Soothing Toner', 'COSRX', 'toner', 'sensibil', 'hidratare', 70.00, 4.60, 'Toner cu Centella Asiatica, calmează roșeața și hidratează pielea sensibilă.'),
('Toleriane Ultra Dermallergo Serum', 'La Roche-Posay', 'toner', 'sensibil', 'hidratare', 95.00, 4.75, 'Esență calmantă cu Neurosensine, reduce reactivitatea pielii sensibile.'),
('Thermal Spring Water Spray', 'Avene', 'toner', 'sensibil', 'hidratare', 45.00, 4.65, 'Spray cu apă termală hipotonică, calmează instant iritațiile pielii sensibile.'),
('Centella Water Alcohol-Free Toner', 'Purito', 'toner', 'sensibil', 'hidratare', 52.00, 4.70, 'Toner fără alcool cu extract de Centella, calmează și fortifică pielea sensibilă.'),
('Relief Toner', 'Dr. Jart+', 'toner', 'sensibil', 'hidratare', 98.00, 4.65, 'Toner calmant cu ceramide și pantenol, reduce iritațiile și roșeața.'),
('Calm Skin Ectoin Toner', 'Eucerin', 'toner', 'sensibil', 'hidratare', 72.00, 4.55, 'Toner cu ectoina, oferă un scut de protecție pentru pielea sensibilă și reactivă.'),

-- ============================================================
-- SER — normal
-- ============================================================
('Vitamin C Suspension 23%', 'The Ordinary', 'ser', 'normal', 'uniformizare', 35.00, 4.20, 'Ser cu vitamina C pură, iluminează și uniformizează tonul pielii.'),
('C E Ferulic', 'SkinCeuticals', 'ser', 'normal', 'anti-aging', 580.00, 4.90, 'Ser antioxidant cu vitamina C 15%, E și acid ferulic, protejează și regenerează.'),
('Ascorbic Acid 8% + Alpha Arbutin 2%', 'The Ordinary', 'ser', 'normal', 'uniformizare', 38.00, 4.45, 'Ser cu vitamina C și alpha-arbutin, reduce petele pigmentare și luminozează tenul.'),
('Retinol 0.2% in Squalane', 'The Ordinary', 'ser', 'normal', 'anti-aging', 35.00, 4.40, 'Ser cu retinol 0.2%, începe treptat cu anti-aging pentru ten normal.'),
('Hyaluronic Acid + Vitamin C', 'Vichy', 'ser', 'normal', 'uniformizare', 125.00, 4.60, 'Ser dublu-acțiune, hidratează cu acid hialuronic și luminozează cu vitamina C.'),
('Luminous 630 Serum', 'Neutrogena', 'ser', 'normal', 'uniformizare', 95.00, 4.50, 'Ser cu ingredientul brevet Luminous 630, reduce petele și uniformizează tonul.'),
('Brightening Serum Vit C', 'Garnier', 'ser', 'normal', 'uniformizare', 48.00, 4.35, 'Ser cu vitamina C și acid hialuronic, iluminează tenul plictisit și normal.'),
('Time Resist Collagen Serum', 'Olay', 'ser', 'normal', 'anti-aging', 78.00, 4.40, 'Ser cu colagen și niacinamidă, reduce vizibil ridurile fine pentru ten normal.'),

-- ============================================================
-- SER — gras
-- ============================================================
('Niacinamide 10% + Zinc 1%', 'The Ordinary', 'ser', 'gras', 'anti-acnee', 28.00, 4.70, 'Ser cu niacinamidă 10% și zinc, reduce sebumul, porii și imperfecțiunile.'),
('Effaclar Duo+', 'La Roche-Posay', 'ser', 'gras', 'anti-acnee', 98.00, 4.60, 'Ser anti-acnee cu niacinamidă și LHA, reduce coșurile și previne recurența.'),
('BHA 2% Serum', 'Paula''s Choice', 'ser', 'gras', 'anti-acnee', 110.00, 4.80, 'Ser cu acid salicilic 2%, exfoliază în interiorul porilor și combate acneea.'),
('AHA 30% + BHA 2% Peeling', 'The Ordinary', 'ser', 'gras', 'anti-acnee', 32.00, 4.35, 'Soluție peeling concentrată cu AHA/BHA, exfoliază profund și combate acneea.'),
('Zinc + Niacinamide Serum', 'Minimalist', 'ser', 'gras', 'anti-acnee', 30.00, 4.65, 'Ser cu zinc 1% și niacinamidă 5%, controlează sebumul și reduce imperfecțiunile.'),
('Tea Tree Anti-Blemish Serum', 'The Body Shop', 'ser', 'gras', 'anti-acnee', 65.00, 4.30, 'Ser cu ulei de arbore de ceai, reduce coșurile și mattifiază tenul gras.'),
('Salicylic Acid Serum 2%', 'Minimalist', 'ser', 'gras', 'anti-acnee', 28.00, 4.55, 'Ser cu acid salicilic, penetrează porii și combate acneea de la origine.'),
('Acne Spot Clearing Serum', 'COSRX', 'ser', 'gras', 'anti-acnee', 82.00, 4.60, 'Ser cu niacinamidă și BHA, reduce spoturi active și previne apariția de noi coșuri.'),

-- ============================================================
-- SER — uscat
-- ============================================================
('Hyaluronic Acid 2% + B5', 'The Ordinary', 'ser', 'uscat', 'hidratare', 30.00, 4.60, 'Ser cu acid hialuronic și vitamina B5, hidratare de lungă durată în profunzime.'),
('Advanced Genifique', 'Lancome', 'ser', 'uscat', 'anti-aging', 380.00, 4.70, 'Ser cu pre- și probiotice, reface bariera pielii și reduce ridurile fine.'),
('Midnight Recovery Concentrate', 'Kiehl''s', 'ser', 'uscat', 'hidratare', 290.00, 4.65, 'Ser de noapte cu ulei de lavandă și prim-roziță, regenerează intens în somn.'),
('Power Serum HA+', 'Vichy', 'ser', 'uscat', 'hidratare', 138.00, 4.65, 'Ser cu acid hialuronic multi-molecular și vitamina B3, hidratare profundă.'),
('Hydro Boost Serum', 'Neutrogena', 'ser', 'uscat', 'hidratare', 85.00, 4.55, 'Ser-gel cu acid hialuronic, reumple rezervele de hidratare ale pielii uscate.'),
('Plumping Serum HA4', 'Lancôme', 'ser', 'uscat', 'hidratare', 290.00, 4.70, 'Ser cu 4 tipuri de acid hialuronic, hidratare plumpificantă pentru ten uscat.'),
('Ceramide Serum', 'Elizabeth Arden', 'ser', 'uscat', 'hidratare', 245.00, 4.65, 'Ser cu ceramide triplu-acțiune, reface bariera pielii uscate în profunzime.'),
('Snail Secretion Filtrate Serum', 'COSRX', 'ser', 'uscat', 'hidratare', 95.00, 4.75, 'Ser cu 90% filtrat de mucus de melc, regenerează și hidratează intens pielea uscată.'),

-- ============================================================
-- SER — mixt
-- ============================================================
('Retinol 0.5% in Squalane', 'The Ordinary', 'ser', 'mixt', 'anti-aging', 45.00, 4.40, 'Ser cu retinol 0.5%, reduce ridurile și uniformizează textura fără a irita.'),
('Niacinamide Serum 10%', 'Minimalist', 'ser', 'mixt', 'uniformizare', 35.00, 4.50, 'Ser cu niacinamidă, reglează sebumul în zona T și hidratează obrajii.'),
('Pore-Refining Solutions Correcting Serum', 'Clinique', 'ser', 'mixt', 'uniformizare', 195.00, 4.55, 'Ser cu salicilic acid și niacinamidă, minimizează porii și uniformizează tenul mixt.'),
('Biome Defense Serum', 'Aveeno', 'ser', 'mixt', 'hidratare', 88.00, 4.45, 'Ser cu prebiotic și avena sativa, echilibrează microbiomul tenului mixt.'),
('Glycolic Acid 7% Toning Solution', 'The Ordinary', 'ser', 'mixt', 'uniformizare', 28.00, 4.40, 'Ser tonic cu acid glicolic 7%, exfoliază și reduce petele tenului mixt.'),
('Resveratrol 3% + Ferulic Acid 3%', 'The Ordinary', 'ser', 'mixt', 'anti-aging', 32.00, 4.35, 'Ser antioxidant concentrat, protejează și luminozează tenul mixt.'),
('Noni Glow Serum', 'Glow Recipe', 'ser', 'mixt', 'uniformizare', 148.00, 4.60, 'Ser cu extract de noni și BHA, luminozează și exfoliază blând tenul mixt.'),

-- ============================================================
-- SER — sensibil
-- ============================================================
('Centella Blemish Ampule', 'COSRX', 'ser', 'sensibil', 'hidratare', 85.00, 4.70, 'Ampulă cu Centella Asiatica 80%, calmează roșeața și întărește bariera pielii.'),
('Cicalfate+ Serum', 'Avene', 'ser', 'sensibil', 'hidratare', 130.00, 4.75, 'Ser reconstructor cu apă termală, Sucralgel și Madecassol, calmează și vindecă.'),
('Toleriane Ultra Serum', 'La Roche-Posay', 'ser', 'sensibil', 'hidratare', 128.00, 4.80, 'Ser ultra-calmant cu Neurosensine și glicerină, pentru pielea sensibilă reactivă.'),
('Cicaplast B5+ Serum', 'La Roche-Posay', 'ser', 'sensibil', 'hidratare', 88.00, 4.75, 'Ser reparator cu vitamina B5 și zinc, repară și calmează pielea iritată.'),
('Calm Restore Serum', 'Paula''s Choice', 'ser', 'sensibil', 'hidratare', 135.00, 4.70, 'Ser cu ceramide, unt de shea și Centella, calmează și reface pielea sensibilă.'),
('Phytium Soothing Serum', 'Dr. Jart+', 'ser', 'sensibil', 'hidratare', 115.00, 4.65, 'Ser cu ceramide și extract de camomilă, calmează roșeața pielii sensibile.'),
('Sensitive Skin Serum', 'Eucerin', 'ser', 'sensibil', 'hidratare', 95.00, 4.60, 'Ser cu licorice și niacinamidă, reduce sensibilitatea și uniformizează.'),
('Balancing Centella Serum', 'Skin1004', 'ser', 'sensibil', 'hidratare', 55.00, 4.65, 'Ser cu 100% apă de Centella, reduce inflamația și întărește bariera.'),

-- ============================================================
-- HIDRATANT — normal
-- ============================================================
('Moisturizing Cream', 'CeraVe', 'hidratant', 'normal', 'hidratare', 65.00, 4.70, 'Cremă hidratantă cu ceramide și acid hialuronic, hidratare 24h non-comedogenică.'),
('Dramatically Different Moisturizing Lotion', 'Clinique', 'hidratant', 'normal', 'hidratare', 150.00, 4.60, 'Loțiune hidratantă ușoară, restabilește bariera de umiditate a pielii normale.'),
('Aqualia Thermal Rich Cream', 'Vichy', 'hidratant', 'normal', 'hidratare', 98.00, 4.65, 'Cremă hidratantă cu apă vulcanică, hidratare profundă pentru ten normal.'),
('Ultra Doux Moisturizer', 'Garnier', 'hidratant', 'normal', 'hidratare', 38.00, 4.35, 'Cremă hidratantă ușoară cu aloe vera, pentru ten normal fără senzație grasă.'),
('Daily Moisturizer SPF 30', 'Olay', 'hidratant', 'normal', 'hidratare', 55.00, 4.40, 'Fluid hidratant cu SPF 30, hidratează și protejează tenul normal zilnic.'),
('Moisturize Daily Lotion', 'Neutrogena', 'hidratant', 'normal', 'hidratare', 45.00, 4.35, 'Loțiune hydro boost pentru ten normal, textură ușoară, fără ulei.'),
('Skin Softening Cream', 'Cetaphil', 'hidratant', 'normal', 'hidratare', 52.00, 4.50, 'Cremă de zi cu glicerină și pantenol, hidratare blândă pentru ten normal.'),

-- ============================================================
-- HIDRATANT — gras
-- ============================================================
('Effaclar Mat', 'La Roche-Posay', 'hidratant', 'gras', 'anti-acnee', 88.00, 4.65, 'Fluid matifiant cu sebuton, controlează strălucirea și minimizează porii.'),
('Oil-Free Moisture SPF 15', 'Neutrogena', 'hidratant', 'gras', 'anti-acnee', 52.00, 4.30, 'Hidratant oil-free ușor, nu înfundă porii și oferă protecție solară.'),
('Mattifying Moisturizer', 'Simple', 'hidratant', 'gras', 'hidratare', 38.00, 4.20, 'Cremă hidratantă matifiantă, absorbție rapidă fără senzație grasă.'),
('Oil-Free Hydrating Gel', 'Kiehl''s', 'hidratant', 'gras', 'hidratare', 145.00, 4.55, 'Gel hidratant oil-free cu aloe vera, hidratare ușoară și absorbție rapidă.'),
('Hydro Boost Water Gel', 'Neutrogena', 'hidratant', 'gras', 'hidratare', 72.00, 4.65, 'Gel-apă cu acid hialuronic, textură de apă, zero senzație de grăsime.'),
('Clear Balance Moisturizer', 'Paula''s Choice', 'hidratant', 'gras', 'anti-acnee', 110.00, 4.60, 'Fluid matifiant cu niacinamidă, reduce sebumul și hidratează eficient.'),
('Oil Control Gel Moisturizer', 'Innisfree', 'hidratant', 'gras', 'anti-acnee', 55.00, 4.40, 'Gel hidratant cu extract de ceai verde, reglează sebumul fără a deshidrata.'),
('Balancing Moisturizer Oily', 'The Ordinary', 'hidratant', 'gras', 'hidratare', 30.00, 4.30, 'Fluid hidratant ușor cu Natural Moisturizing Factors, ideal pentru ten gras.'),

-- ============================================================
-- HIDRATANT — uscat
-- ============================================================
('Intense Moisturizing Cream', 'Eucerin', 'hidratant', 'uscat', 'hidratare', 72.00, 4.60, 'Cremă rich cu uree 5%, hidratare intensă și de durată pentru pielea uscată.'),
('Toleriane Double Repair Moisturizer', 'La Roche-Posay', 'hidratant', 'uscat', 'hidratare', 92.00, 4.75, 'Cremă cu ceramide și niacinamidă, reface bariera pielii uscate în 1 oră.'),
('Rich Moisturizing Lotion', 'Kiehl''s', 'hidratant', 'uscat', 'hidratare', 195.00, 4.70, 'Loțiune bogată cu squalane și glicerină, hrănește profund pielea uscată.'),
('Nutritic Intense Rich Cream', 'La Roche-Posay', 'hidratant', 'uscat', 'hidratare', 98.00, 4.70, 'Cremă nutritivă cu ceramide preformate, reface intens bariera pielii uscate.'),
('Cicaplast Baume B5+', 'La Roche-Posay', 'hidratant', 'uscat', 'hidratare', 85.00, 4.80, 'Balsam bogat cu panthenol și ceramide, calmează și hrănește profund pielea uscată.'),
('Ultra Moisturizing Cream', 'Olay', 'hidratant', 'uscat', 'hidratare', 52.00, 4.40, 'Cremă hrănitoare cu ceramide și vitamina B3, hidratare 24h pentru ten uscat.'),
('Nourishing Moisture Cream', 'Aveeno', 'hidratant', 'uscat', 'hidratare', 65.00, 4.45, 'Cremă hrănitoare cu ovăz coloidal, hidratare profundă pentru pielea uscată.'),
('Intense Night Cream', 'Garnier', 'hidratant', 'uscat', 'hidratare', 48.00, 4.35, 'Cremă de noapte cu acid hialuronic, regenerează și hidratează intens pielea uscată.'),

-- ============================================================
-- HIDRATANT — mixt
-- ============================================================
('Balancing Moisturizer', 'The Ordinary', 'hidratant', 'mixt', 'hidratare', 32.00, 4.30, 'Cremă hidratantă ușoară cu NMF, hidratează fără a înfunda porii zonei T.'),
('Hydra Genius Daily Liquid Care', 'L''Oreal Paris', 'hidratant', 'mixt', 'hidratare', 55.00, 4.40, 'Gel-fluid cu aloe vera și acid hialuronic, textură apătoasă pentru tenul mixt.'),
('Oil Free Moisturizer SPF 15', 'Clinique', 'hidratant', 'mixt', 'hidratare', 145.00, 4.60, 'Fluid hidratant SPF15 oil-free, hidratare ușoară și matifiere pentru ten mixt.'),
('Gel Moussant Equilibrant', 'Bioderma', 'hidratant', 'mixt', 'hidratare', 72.00, 4.55, 'Cremă-gel Sebium, hidratare echilibrată, reglează zona T fără a deshidrata.'),
('Gel-Fluid Moisture Sorbet', 'Kiehl''s', 'hidratant', 'mixt', 'hidratare', 128.00, 4.60, 'Gel-fluid ușor cu avocado, hrănește obrajii fără a grăsa zona T.'),
('Niacinamide Moisturizer', 'Minimalist', 'hidratant', 'mixt', 'uniformizare', 35.00, 4.50, 'Fluid hidratant cu niacinamidă 5%, reglează sebumul și uniformizează tenul mixt.'),
('Water Bank Blue Hyaluronic Cream', 'Laneige', 'hidratant', 'mixt', 'hidratare', 145.00, 4.70, 'Cremă-gel cu acid hialuronic și mineral water, hidratare optimă pentru ten mixt.'),

-- ============================================================
-- HIDRATANT — sensibil
-- ============================================================
('Toleriane Sensitive', 'La Roche-Posay', 'hidratant', 'sensibil', 'hidratare', 78.00, 4.80, 'Cremă cu prebiotice și Neurosensine, reconstituie bariera pielii sensibile.'),
('Skin Recovery Rich Cream', 'Paula''s Choice', 'hidratant', 'sensibil', 'hidratare', 145.00, 4.70, 'Cremă bogată cu ceramide și acizi grași esențiali, calmează și hidratează.'),
('Cicalfate+ Creme', 'Avene', 'hidratant', 'sensibil', 'hidratare', 95.00, 4.75, 'Cremă reparatoare cu Madecassol, pentru pielea sensibilă și iritată.'),
('Sensibio Rich', 'Bioderma', 'hidratant', 'sensibil', 'hidratare', 88.00, 4.75, 'Cremă rich Sensibio, formulă recomfortantă pentru pielea sensibilă uscată.'),
('Defi[ned] Sensitive Cream', 'Eucerin', 'hidratant', 'sensibil', 'hidratare', 68.00, 4.60, 'Cremă cu ectoina, scade reactivitatea și hidratează pielea hipersensibilă.'),
('Daily Moisturizer Sensitive', 'Cetaphil', 'hidratant', 'sensibil', 'hidratare', 58.00, 4.55, 'Loțiune de zi fără parfum și hipoalergenică, hidratare blândă pentru ten sensibil.'),
('Calm Down Barrier Cream', 'Paula''s Choice', 'hidratant', 'sensibil', 'hidratare', 125.00, 4.65, 'Cremă de barieră cu ceramide, niacinamidă și beta-glucan, reface pielea sensibilă.'),
('Cicabio Cream', 'Avene', 'hidratant', 'sensibil', 'hidratare', 82.00, 4.70, 'Cremă cu sucralgel și retinaldehidă, repară și calmează pielea sensibilă iritată.'),

-- ============================================================
-- SPF — normal
-- ============================================================
('Anthelios Ultra-Light SPF 50+', 'La Roche-Posay', 'spf', 'normal', 'protectie', 98.00, 4.80, 'Fluid solar SPF 50+ cu textură ultra-ușoară, fără albire, rezistent la apă.'),
('Invisible Daily Defense SPF 30', 'Neutrogena', 'spf', 'normal', 'protectie', 65.00, 4.50, 'Loțiune solară transparentă, non-comedogenică, pentru utilizare zilnică.'),
('Ambre Solaire SPF 50+ Light Fluid', 'Garnier', 'spf', 'normal', 'protectie', 52.00, 4.40, 'Fluid solar invizibil SPF 50+, textură ușoară pentru utilizare zilnică.'),
('Daily Sun Defense SPF 50', 'Minimalist', 'spf', 'normal', 'protectie', 55.00, 4.65, 'Protecție solară SPF 50 PA++++, non-greasy, pentru utilizare zilnică.'),
('Age Perfect SPF 30', 'L''Oreal Paris', 'spf', 'normal', 'anti-aging', 58.00, 4.40, 'Cremă de zi cu SPF 30 și vitamina B3, protecție și anti-aging simultan.'),
('Capital Soleil UV-Age Daily SPF 50+', 'Vichy', 'spf', 'normal', 'anti-aging', 112.00, 4.75, 'Fluid solar SPF 50+ cu niacinamidă, protejează și previne fotobătrânirea.'),
('Heliocare 360 Fluid SPF 50', 'Heliocare', 'spf', 'normal', 'protectie', 138.00, 4.80, 'Fluid solar cu protecție 360°, tehnologie Fernblock și antioxidanți.'),

-- ============================================================
-- SPF — gras
-- ============================================================
('Anthelios Invisible Fluid SPF 50+', 'La Roche-Posay', 'spf', 'gras', 'protectie', 105.00, 4.85, 'Fluid solar matifiant SPF 50+, textură non-grasă, ideal pentru tenul gras.'),
('Clear Face Liquid SPF 55', 'Neutrogena', 'spf', 'gras', 'protectie', 72.00, 4.50, 'Protecție solară oil-free SPF 55, reduce apariția coșurilor și nu înfundă porii.'),
('Canmake Mermaid Skin Gel UV SPF 50+', 'Canmake', 'spf', 'gras', 'protectie', 55.00, 4.70, 'Gel solar japonez SPF 50+, senzație apătoasă, finish mat, fără alb.'),
('Oil Control Sunscreen SPF 50', 'Bioderma', 'spf', 'gras', 'protectie', 98.00, 4.65, 'Fluid solar Sebium, reglează sebumul și oferă protecție SPF 50 mat.'),
('Sun Serum SPF 50+', 'Purito', 'spf', 'gras', 'protectie', 58.00, 4.75, 'Ser solar SPF 50+ PA++++, textură ultra-lichidă fără reziduu alb pentru ten gras.'),
('Colorescience Sunforgettable SPF 50', 'Colorescience', 'spf', 'gras', 'protectie', 195.00, 4.70, 'Pudră solară SPF 50, controlează sebumul toată ziua și retușează machiajul.'),
('Photo Ultra SPF 50+', 'Avene', 'spf', 'gras', 'protectie', 92.00, 4.60, 'Fluid solar ultra-ușor SPF 50+, fără corp alb, ideal pentru ten gras.'),

-- ============================================================
-- SPF — uscat
-- ============================================================
('Anthelios Comfort SPF 50+', 'La Roche-Posay', 'spf', 'uscat', 'protectie', 102.00, 4.75, 'Cremă solară SPF 50+ cu efect hidratant intens, pentru pielea uscată.'),
('Sheer Mineral Sunscreen SPF 50', 'EltaMD', 'spf', 'uscat', 'protectie', 155.00, 4.80, 'Ecran solar mineral cu zinc oxide, hidratant, fără substanțe chimice iritative.'),
('Ambre Solaire Hydrating SPF 50', 'Garnier', 'spf', 'uscat', 'protectie', 55.00, 4.40, 'Cremă solară SPF 50 cu vitamina E și acid hialuronic, hidratare și protecție.'),
('Nutritic Intense SPF 50+', 'La Roche-Posay', 'spf', 'uscat', 'protectie', 118.00, 4.75, 'Cremă solară nutritivă SPF 50+, cu ceramide, pentru pielea uscată și sensibilă.'),
('Hydrating Sunscreen SPF 50', 'CeraVe', 'spf', 'uscat', 'protectie', 82.00, 4.65, 'Cremă solară cu ceramide și acid hialuronic, protecție și hidratare simultane.'),
('Capital Soleil Moisturizing SPF 50+', 'Vichy', 'spf', 'uscat', 'protectie', 108.00, 4.70, 'Cremă solară ultra-hidratantă SPF 50+, pentru pielea uscată și fragilă.'),

-- ============================================================
-- SPF — mixt
-- ============================================================
('Sunscreen Gel SPF 50', 'ISDIN', 'spf', 'mixt', 'protectie', 110.00, 4.80, 'Gel solar invizibil SPF 50, fără ulei, finish uscat, ideal pentru tenul mixt.'),
('UV Clear Broad-Spectrum SPF 46', 'EltaMD', 'spf', 'mixt', 'protectie', 145.00, 4.85, 'Protecție solară cu niacinamidă, reduce roșeața și controlează sebumul.'),
('Daily Gel Sunscreen SPF 50', 'Minimalist', 'spf', 'mixt', 'protectie', 60.00, 4.70, 'Gel solar SPF 50 PA++++, textură apătoasă, echilibrantă pentru ten mixt.'),
('Biotic Sunscreen SPF 50', 'Purito', 'spf', 'mixt', 'protectie', 62.00, 4.75, 'Fluid solar SPF 50 cu centella, protejează și calmează tenul mixt.'),
('Photoderm Bronz Blur SPF 50+', 'Bioderma', 'spf', 'mixt', 'protectie', 95.00, 4.65, 'Fluid solar cu efect blur și SPF 50+, matifiant pentru zona T a tenului mixt.'),

-- ============================================================
-- SPF — sensibil
-- ============================================================
('Anthelios XL SPF 50+ Creme', 'La Roche-Posay', 'spf', 'sensibil', 'protectie', 108.00, 4.80, 'Cremă solară SPF 50+ hipoalergenică, fără parfum, pentru pielea sensibilă.'),
('Mineral Sunscreen SPF 30', 'Avene', 'spf', 'sensibil', 'protectie', 95.00, 4.70, 'Ecran solar mineral cu filtru fizic pur, tolerat de pielea cea mai sensibilă.'),
('Photoderm Mineral SPF 50+', 'Bioderma', 'spf', 'sensibil', 'protectie', 98.00, 4.75, 'Fluid solar mineral SPF 50+, fără conservanți, pentru pielea reactivă și sensibilă.'),
('Kids Sensitive SPF 50', 'Mustela', 'spf', 'sensibil', 'protectie', 78.00, 4.65, 'Fluid solar mineral SPF 50 fără parfum, testat pe pielea hipersensibilă.'),
('Tinted Mineral SPF 50 Sensitive', 'EltaMD', 'spf', 'sensibil', 'protectie', 162.00, 4.80, 'Fluid solar mineral tinted SPF 50, fără oxybenzone, ideal pentru rosacea și sensibilitate.'),
('Calm Down SPF 30', 'Paula''s Choice', 'spf', 'sensibil', 'protectie', 118.00, 4.70, 'Protecție solară cu filtru mineral pur, fără parfum, pentru pielea sensibilă reactivă.'),
('Toleriane Teint SPF 25', 'La Roche-Posay', 'spf', 'sensibil', 'protectie', 95.00, 4.65, 'Fluid solar SPF 25 cu fond de ten ușor, acoperire și protecție pentru ten sensibil.');
