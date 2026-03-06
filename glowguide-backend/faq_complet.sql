-- =====================================================
-- GlowGuide — Script FAQ Complet pentru Chatbot
-- Categorii: rutina, ingrediente, produse, probleme_piele, general
-- =====================================================

USE glowguide_db;

-- Golim tabela înainte de insert (opțional, pentru a evita duplicate)
-- DELETE FROM FAQ;

INSERT INTO FAQ (cuvinteCheie, intrebare, raspuns, categorie) VALUES

-- =====================================================
-- CATEGORIE: RUTINĂ
-- =====================================================

('ordine,aplicare,rutina,pas,cum,folosesc',
'În ce ordine aplic produsele?',
'Ordinea corectă a produselor skincare este:\n1️⃣ Curățare (cleanser)\n2️⃣ Toner / Esență\n3️⃣ Ser (de la cel mai fluid la cel mai dens)\n4️⃣ Cremă de ochi (dacă folosești)\n5️⃣ Hidratant (moisturizer)\n6️⃣ SPF (DOAR dimineața)\n\nRegula de aur: aplică de la textura cea mai apoasă la cea mai densă.',
'rutina'),

('rutina,dimineata,zi,morning',
'Care este rutina de dimineață?',
'Rutina de dimineață ideală:\n☀️ 1. Curățare blândă (sau doar apă dacă ai ten sensibil)\n2. Toner hidratant\n3. Vitamina C (ser antioxidant — protejează de radicalii liberi)\n4. Hidratant potrivit tipului tău de ten\n5. SPF 30+ OBLIGATORIU (chiar și în interior)\n\nDurată: 5-10 minute. Constanța contează mai mult decât produsele scumpe!',
'rutina'),

('rutina,seara,noapte,evening,night',
'Care este rutina de seară?',
'Rutina de seară — regenerarea are loc noaptea:\n🌙 1. Curățare dublă (dacă porți machiaj: mai întâi ulei/micelară, apoi cleanser)\n2. Toner\n3. Activi puternici (retinol, AHA, BHA — DOAR seara!)\n4. Ser hidratant (acid hialuronic)\n5. Hidratant sau cremă nutritivă\n6. Ulei facial (opțional, ultimul strat)\n\nNu folosi retinol și AHA/BHA în aceeași seară!',
'rutina'),

('curatare,dubla,double,cleansing,machiaj,demachiant',
'Ce este curățarea dublă?',
'Curățarea dublă (double cleansing) înseamnă două etape:\n1️⃣ Primul cleanser pe bază de ulei sau apă micelară — dizolvă machiajul, SPF-ul și sebumul\n2️⃣ Al doilea cleanser apos (gel, spumă, cremă) — curăță pielea propriu-zisă\n\nEste recomandată seara dacă porți machiaj sau SPF. Dimineața ajunge un singur cleanser sau doar apă.',
'rutina'),

('toner,ce,rol,necesar,trebuie',
'La ce ajută tonerul?',
'Tonerul are mai multe roluri:\n✅ Reechilibrează pH-ul pielii după curățare\n✅ Hidratează și pregătește pielea pentru următorii pași\n✅ Crește absorbția serurilor și hidratantului\n\nAlege toner FĂRĂ alcool (irită și usucă). Caută ingrediente: acid hialuronic, niacinamide, centella asiatica. Aplică cu palmele, nu cu vată.',
'rutina'),

('spf,factor,protectie,solara,cat,folosesc,necesar',
'Cât SPF trebuie să folosesc?',
'Minimum SPF 30 pentru uz zilnic, SPF 50+ pentru expunere directă la soare.\n\n☀️ Regulile de bază:\n• Aplică ultimul în rutina de dimineață (după hidratant)\n• Cantitate necesară: ½ linguriță pentru față + gât\n• Reaplică la fiecare 2 ore dacă ești în exterior\n• Nu există SPF "prea mare" — cu cât mai mare, cu atât mai bine\n\nSPF este cel mai important produs anti-aging!',
'rutina'),

('spf,noros,iarna,interior,trebuie',
'Trebuie SPF și în zilele înnorate sau iarna?',
'DA, ABSOLUT! Motivele:\n☁️ 80% din razele UVA trec prin nori\n🪟 Razele UVA trec și prin geamuri (îmbătrânesc pielea chiar și în interior)\n❄️ Zăpada reflectă 80% din radiații UV\n\nUVB (arsuri) variază cu sezonul, dar UVA (îmbătrânire) este prezent TOT ANUL, la aceeași intensitate. SPF zilnic = investiția cu cel mai mare randament în skincare.',
'rutina'),

('exfoliere,cat,des,frecvent,acid,scrub',
'Cât de des ar trebui să exfoliez?',
'Depinde de tipul de exfoliant:\n\n🧴 Exfolianți chimici (AHA/BHA):\n• Ten sensibil: 1x/săptămână\n• Ten normal/mixt: 2-3x/săptămână\n• Ten gras: până la 3-4x/săptămână\n\n🌿 Scrub-uri fizice:\n• Maximum 1-2x/săptămână (pot irita)\n• Evită scrub-urile cu granule mari sau aspre\n\n⚠️ Semne că exfoliezi prea mult: roșeață, uscare, senzație de arsură.',
'rutina'),

('rutina,minima,simpla,inceput,incepator',
'Care este o rutină minimă pentru începători?',
'Dacă ești la început, 3 pași sunt suficienți:\n\n☀️ Dimineața:\n1. Cleanser blând\n2. Hidratant\n3. SPF\n\n🌙 Seara:\n1. Cleanser\n2. Hidratant\n\nAcești 3-4 pași fac 80% din diferență. Adaugă activi (vitamina C, retinol, acizi) abia după ce pielea s-a obișnuit cu rutina de bază — cel puțin 4 săptămâni.',
'rutina'),

('astept,timp,intre,produse,cat',
'Cât timp aștept între produse?',
'Ghid general:\n⏱️ 30 secunde — între toner și ser\n⏱️ 1 minut — după seruri apoase\n⏱️ 2-3 minute — după retinol (înainte de hidratant)\n⏱️ 5 minute — după AHA/BHA (neutralizare pH)\n\nRegula practică: aplică următorul produs când cel anterior nu mai e umed la pipăit, dar pielea nu e complet uscată (ușor tacky = ideal pentru absorbție).',
'rutina'),

-- =====================================================
-- CATEGORIE: INGREDIENTE
-- =====================================================

('niacinamide,vitamina,b3,ce,este,beneficii,face',
'Ce este niacinamide și ce face?',
'Niacinamide (Vitamina B3) este unul dintre cei mai versatili activi:\n\n✅ Reduce aspectul porilor măriți\n✅ Uniformizează tonul (reduce petele și hiperpigmentarea)\n✅ Reglează producția de sebum (excelent pentru ten gras)\n✅ Întărește bariera cutanată\n✅ Reduce roșeața și inflamația\n✅ Hidratează prin stimularea ceramidelor\n\nConcentrație recomandată: 5-10%. Potrivit pentru TOATE tipurile de ten. Se poate folosi dimineața și seara.',
'ingrediente'),

('retinol,ce,este,cum,folosesc,beneficii,efecte',
'Ce este retinolul și cum îl folosesc?',
'Retinolul (Vitamina A) este cel mai studiat ingredient anti-aging:\n\n✅ Stimulează producția de colagen\n✅ Reduce ridurile fine și ridurile\n✅ Accelerează regenerarea celulară\n✅ Tratează acneea\n✅ Reduce petele pigmentare\n\n⚠️ Cum să începi:\n• Folosește DOAR seara\n• Începe cu 2x/săptămână, crește treptat\n• Aplică pe piele uscată (reduce iritația)\n• Folosește obligatoriu SPF zilnic\n• Evită în sarcină!',
'ingrediente'),

('retinol,cat,des,frecvent,iritatie,inceput',
'Cât de des folosesc retinolul?',
'Protocol de introducere a retinolului:\n\nSăptămânile 1-2: 2x/săptămână\nSăptămânile 3-4: 3x/săptămână\nLuna 2+: 4-5x/săptămână (dacă tolerezi bine)\n\n🛡️ Metoda "sandwich" pentru sensibili:\nHidratant → Retinol → Hidratant (reduce iritația)\n\n⚠️ Reacțiile normale la început: ușoară roșeață, descuamare, uscare — trec în 4-6 săptămâni (purging). Dacă e intensă, reduce frecvența.',
'ingrediente'),

('acid,hialuronic,hyaluronic,ce,face,hidratare',
'Ce face acidul hialuronic?',
'Acidul hialuronic (HA) este cel mai puternic umectant:\n\n💧 Poate reține de până la 1000x greutatea sa în apă\n✅ Hidratează toate straturile pielii\n✅ Umple temporar ridurile fine\n✅ Calmează pielea iritată\n✅ Potrivit pentru TOATE tipurile de ten (chiar și gras)\n\n⚠️ Important: aplică pe piele ușor umedă, nu complet uscată — altfel extrage umiditate din piele! Sigilează mereu cu un hidratant deasupra.',
'ingrediente'),

('vitamina,c,ascorbic,acid,beneficii,ce,face',
'Ce face Vitamina C în skincare?',
'Vitamina C (acid ascorbic) este antioxidantul numărul 1:\n\n☀️ Protejează de radicalii liberi și daunele UV\n✅ Uniformizează și luminează tenul\n✅ Reduce petele pigmentare și hiperpigmentarea\n✅ Stimulează producția de colagen\n✅ Amplifică efectul SPF\n\n📌 Se folosește DIMINEAȚA (efect antioxidant maxim ziua)\nConcentrație eficientă: 10-20%\n⚠️ Se oxidează rapid — păstrează la loc răcoros, întunecos. Dacă devine portocaliu/maro, nu mai e eficientă.',
'ingrediente'),

('vitamina,c,niacinamide,combina,impreuna,pot',
'Pot combina Vitamina C cu Niacinamide?',
'DA! Poți să le combini fără probleme.\n\n❌ Mitul vechi: se formează acid nicotinic (roșeață) — este fals la concentrațiile normale din produse cosmetice.\n✅ Studiile din 2022-2023 confirmă că sunt compatibile și chiar complementare.\n\nCum să le folosești:\n☀️ Dimineața: Vitamina C (antioxidant pentru ziua)\n🌙 Seara: Niacinamide (reparare și uniformizare noapte)\n\nSau le poți folosi în aceeași rutină fără probleme.',
'ingrediente'),

('aha,bha,acid,exfoliant,diferenta,care,aleg',
'Care e diferența dintre AHA și BHA?',
'AHA (alfa-hidroxiacizi) — Acid Glicolic, Lactic, Mandelic:\n🌊 Exfolianți hidrosolubili — acționează la suprafața pielii\n✅ Ideali pentru: ten uscat, hiperpigmentare, riduri fine, textură neuniformă\n⚠️ Cresc fotosensibilitatea — obligatoriu SPF!\n\nBHA (beta-hidroxiacizi) — Acid Salicilic:\n🧴 Liposolubil — pătrunde în pori\n✅ Ideali pentru: ten gras, acnee, pori înfundați, puncte negre\n💡 Are și proprietăți antiinflamatoare\n\n📌 Regulă: nu combina AHA+BHA+Retinol în aceeași seară.',
'ingrediente'),

('ceramide,ce,sunt,fac,bariera',
'Ce sunt ceramidele?',
'Ceramidele sunt lipide (grăsimi) naturale care formează bariera cutanată:\n\n🛡️ Reprezintă ~50% din bariera pielii\n✅ Rețin umiditatea în piele\n✅ Protejează de agresori externi (poluare, bacterii, frig)\n✅ Reduc sensibilitatea și reactivitatea pielii\n\nCând bariera e deteriorată: piele uscată, iritată, reactivă, склонă la acnee.\n\nCeramidele se pierd prin: exfoliere excesivă, detergenți agresivi, vârstă. Le refaci cu produse cu ceramide (CeraVe, de exemplu).',
'ingrediente'),

('retinol,vitamina,c,combina,impreuna',
'Pot combina Retinolul cu Vitamina C?',
'Nu în aceeași rutină — din motive de eficiență, nu siguranță:\n\n⚠️ Retinolul funcționează la pH bazic\n⚠️ Vitamina C (acid ascorbic) funcționează la pH acid\n→ Se neutralizează reciproc dacă sunt aplicate simultan\n\n✅ Soluția:\n☀️ Dimineața: Vitamina C\n🌙 Seara: Retinol\n\nAcesta este și motivul pentru care cei mai mulți experți recomandă această separare — nu pentru că sunt periculoase împreună, ci pentru că nu funcționează corect.',
'ingrediente'),

('retinol,acid,nu,combina,evita',
'Ce nu trebuie combinat cu retinolul?',
'Combinații de evitat cu retinolul:\n\n❌ AHA/BHA (acizi exfolianți) — în aceeași seară: supraexfoliere, iritație severă\n❌ Vitamina C — eficiență scăzută (pH incompatibil)\n❌ Benzoil peroxid — inactivează retinolul\n❌ Alt retinoizi — niciodată mai mulți simultan\n\n✅ Se combină bine cu:\n✅ Acid hialuronic — hidratare după retinol\n✅ Ceramide — refac bariera\n✅ Niacinamide (seara) — reduce iritația\n✅ Peptide',
'ingrediente'),

('peptide,ce,sunt,fac,colagen',
'Ce sunt peptidele în skincare?',
'Peptidele sunt lanțuri scurte de aminoacizi — "mesagerii" pielii:\n\n✅ Stimulează producția de colagen și elastină\n✅ Reduc ridurile fine\n✅ Întăresc bariera cutanată\n✅ Hidratează\n✅ Unele au efect botox-like (Argireline)\n\n💡 Sunt blânde, potrivite chiar și pentru pielea sensibilă\nSe combină bine cu aproape orice\n⚠️ Nu combina cu acizi (AHA/BHA) direct — îi pot dezactiva. Folosește în rutine separate.',
'ingrediente'),

('centella,asiatica,cica,gotu,kola,ce,face',
'Ce face Centella Asiatica?',
'Centella Asiatica (CICA) este un ingredient calmant excepțional:\n\n🌿 Origine: medicina tradițională asiatică\n✅ Calmează roșeața și inflamația\n✅ Accelerează vindecarea (acnee, iritații, cicatrici)\n✅ Stimulează producția de colagen\n✅ Întărește bariera cutanată\n✅ Potrivit pentru pielea sensibilă, rozacee, acnee\n\nIngrediente active: madecasoside, asiaticoside, asiatic acid.\nBrand-uri cunoscute: Dr.Jart+ Cicapair, COSRX Centella.',
'ingrediente'),

('spf,chemical,mineral,diferenta,fizic,chimic',
'Care e diferența dintre SPF chimic și mineral?',
'SPF MINERAL (Zinc Oxide, Titanium Dioxide):\n🪨 Stă pe suprafața pielii, reflectă razele UV\n✅ Efect imediat după aplicare\n✅ Recomandat pentru piele sensibilă, rozacee, copii\n⚠️ Poate lăsa cast alb (mai ales pe piele închisă la culoare)\n\nSPF CHIMIC (Avobenzone, Octinoxate etc.):\n🧪 Absorbit în piele, transformă UV în căldură\n✅ Textură mai ușoară, fără cast alb\n⚠️ Necesită 20 min după aplicare pentru a fi activ\n⚠️ Poate irita pielea sensibilă',
'ingrediente'),

('niacinamide,concentratie,cat,procente,10,5',
'Ce concentrație de niacinamide este eficientă?',
'Ghid concentrații niacinamide:\n\n2-5%: hidratare, întărire baieră — ideal pentru începători și piele sensibilă\n5-10%: reducere pori, sebum, pete — concentrația standard\n10%+: efect maxim, dar poate irita pielea sensibilă (roșeață temporară)\n\n✅ Recomandare: începe cu 5%, crește la 10% dacă tolerezi bine.\nThe Ordinary oferă 10% + Zinc 1% — excelent raport calitate/preț.',
'ingrediente'),

('benzoil,peroxid,acnee,ce,face,cum,folosesc',
'Cum folosesc benzoil peroxidul pentru acnee?',
'Benzoil Peroxidul (BP) este unul din cele mai eficiente tratamente pentru acnee:\n\n✅ Ucide bacteria P. acnes (cauza principală a acneei inflamatorii)\n✅ Curăță porii\n✅ Reduce inflamația\n\nConcentrații: 2.5% (la fel de eficient ca 10%, cu mai puțină iritație!)\n\n⚠️ Atenție:\n• Albeste textile — evită contact cu haine/lenjerie\n• Nu combina cu retinol\n• Poate usca pielea — hidratează bine\n• Începe cu aplicare punct cu punct, nu pe toată fața',
'ingrediente'),

('acid,salicilic,acnee,pori,cum,folosesc',
'Cum funcționează acidul salicilic?',
'Acidul salicilic (BHA) este soluția nr.1 pentru ten gras și acnee:\n\n✅ Pătrunde în pori și îi curăță din interior\n✅ Dizolvă punctele negre și albe\n✅ Antiinflamator — reduce roșeața coșurilor\n✅ Exfoliază blând suprafața pielii\n\nConcentrații eficiente: 0.5-2%\nFormate: toner, ser, spălare\n\n💡 Folosește seara pentru rezultate maxime\n⚠️ Evită zona ochilor\n⚠️ Nu combina cu AHA în aceeași rutină (supraexfoliere)',
'ingrediente'),

('azelaic,acid,ce,face,rozacee,hipo',
'Ce face acidul azelaic?',
'Acidul azelaic este un ingredient multitasking subevaluat:\n\n✅ Reduce hiperpigmentarea și petele post-acnee\n✅ Tratează acneea (antibacterian)\n✅ Calmează rozaceea și înroșirile\n✅ Exfoliază blând\n✅ Uniformizează tonul\n\nConcentrații: 10% (OTC) eficient, 15-20% (prescripție)\n\n💚 Unul din puținii activi siguri în SARCINĂ\nSe combină bine cu aproape orice\nIdeal pentru pielea sensibilă cu probleme multiple',
'ingrediente'),

-- =====================================================
-- CATEGORIE: TIPURI DE TEN
-- =====================================================

('ten,gras,oily,sebum,stralucitor,caracteristici',
'Cum îngrijesc tenul gras?',
'Tenul gras produce sebum în exces — dar are nevoie de hidratare!\n\n❌ Greșeli comune:\n• Evitarea hidratantului (înrăutățește situația)\n• Over-curățarea (stimulează mai mult sebum)\n\n✅ Ce funcționează:\n• Cleanser cu spumă sau gel (dimineața și seara)\n• Toner cu niacinamide sau acid salicilic\n• Hidratant oil-free, non-comedogenic\n• SPF cu textură ușoară (gel sau fluid)\n• Ingrediente cheie: Niacinamide, Zinc PCA, Acid Salicilic, BHA\n\n🚫 Evită: uleiuri grele, produse comedogenice, alcool în concentrații mari',
'probleme_piele'),

('ten,uscat,dry,hidratare,caracteristici,ingrijire',
'Cum îngrijesc tenul uscat?',
'Tenul uscat are bariera cutanată deficitară și produce puțin sebum:\n\n✅ Ce funcționează:\n• Cleanser cremă sau lapte (fără spumă agresivă)\n• Toner esență bogat în umectanți\n• Ser cu acid hialuronic (pe piele umedă!)\n• Hidratant bogat cu ceramide, shea butter, squalane\n• SPF cremă sau cu textură hrănitoare\n\n💡 Ingrediente cheie: Acid Hialuronic, Ceramide, Glicerina, Squalane, Shea Butter\n\n⭐ Layering = stratificarea produselor: mai multe straturi subțiri hidratante > un singur strat gros',
'probleme_piele'),

('ten,mixt,combination,ingrijire,cum',
'Cum îngrijesc tenul mixt?',
'Tenul mixt — zona T (frunte, nas, bărbie) grasă, obraji uscați/normali:\n\n✅ Strategii:\n• Poți folosi produse diferite pe zone diferite (multi-masking)\n• Sau alegi produse balansate pentru ten mixt\n\n📋 Rutina recomandată:\n• Cleanser gel blând (nu prea agresiv pentru obraji)\n• Toner echilibrant (fără alcool)\n• Ser cu niacinamide (reglează sebumul și hidratează)\n• Hidratant light (gel-cremă)\n\n💡 Exfolierea ușoară 2x/săptămână ajută la uniformizarea texturii',
'probleme_piele'),

('ten,sensibil,reactiv,iritatie,rosiata,ingrijire',
'Cum îngrijesc tenul sensibil?',
'Tenul sensibil reacționează ușor la produse, factori de mediu sau schimbări:\n\n✅ Reguli de bază:\n• Introduce un produs NOU o dată la 2 săptămâni (patch test!)\n• Evită parfumuri, alcool, coloranți în produse\n• Formula minimalistă = mai puține ingrediente, risc mai mic\n• Apă termală sau spray calmant pentru urgențe\n\n💚 Ingrediente sigure: Centella Asiatica, Aloe Vera, Ceramide, Panthenol (B5), Acid Hialuronic\n🚫 Evită: parfumuri sintetice, SLS, alcool denaturat, AHA în concentrații mari',
'probleme_piele'),

('ten,normal,ingrijire,rutina,simpla',
'Cum îngrijesc tenul normal?',
'Tenul normal e echilibrat — nici prea gras, nici prea uscat. Ai norocul de a putea folosi aproape orice!\n\n✅ Rutina simplă funcționează perfect:\n☀️ Dimineața: Cleanser → Toner → Hidratant → SPF\n🌙 Seara: Cleanser → Ser activ → Hidratant\n\n💡 Sfaturi:\n• Menține ce funcționează — nu experimenta de dragul experimentului\n• Adaugă treptat activi (vitamina C, retinol) pentru prevenția îmbătrânirii\n• Exfoliere 1-2x/săptămână pentru glow',
'probleme_piele'),

-- =====================================================
-- CATEGORIE: PROBLEME DE PIELE
-- =====================================================

('acnee,cosuri,tratament,cum,scap,ingrediente',
'Cum tratez acneea?',
'Tratamentul acneei depinde de tipul ei:\n\n🔴 Acnee inflamatorie (coșuri roșii): Benzoil Peroxid 2.5-5%, Acid Salicilic\n⚫ Puncte negre: BHA (Acid Salicilic), exfoliere regulată\n🔵 Chisturi profunde: consultă dermatolog\n\n✅ Ingrediente eficiente:\n• Acid Salicilic 2% — curăță porii\n• Niacinamide 10% — reduce inflamația\n• Benzoil Peroxid — bactericid\n• Retinol (la concentrații mici) — reglează turnover celular\n• Zinc — antiinflamator\n\n⚠️ Nu stoarce coșurile — lasă cicatrici și răspândește bacteria!',
'probleme_piele'),

('pete,hiperpigmentare,decolorare,dark,spots,tratament',
'Cum scap de petele de pe față?',
'Petele (hiperpigmentarea) apar din: acnee, soare, hormoni:\n\n✅ Ingrediente eficiente pentru pete:\n• Vitamina C — antioxidant, uniformizează treptat\n• Niacinamide — inhibă transferul melaninei\n• Alfa-Arbutin — depigmentant blând\n• Acid Azelaic — multi-tasking (pete + acnee)\n• Acid Kojic — reduce melanina\n• Acid Glicolic (AHA) — exfoliere, luminozitate\n\n⏳ Răbdare: rezultatele apar în 8-12 săptămâni\n☀️ SPF ZILNIC este OBLIGATORIU — fără el, petele se vor înrăutăți oricât de bune ar fi produsele!',
'probleme_piele'),

('riduri,linii,fine,antiaging,anti,imbatranire',
'Ce produse folosesc pentru riduri și anti-aging?',
'Ierarhia ingredientelor anti-aging bazate pe dovezi:\n\n🥇 Retinol/Retinoids — cel mai studiat, cel mai eficient\n🥈 Vitamina C — protecție + colagen\n🥉 SPF — PREVINE 90% din îmbătrânirea prematură\n\n✅ Completează cu:\n• Peptide — stimulează colagenul\n• Acid Hialuronic — volum și hidratare\n• Niacinamide — elasticitate\n• AHA (Acid Glicolic) — reînnoire celulară\n\n💡 Cel mai important: SPF zilnic de la 20 de ani previne mai mult decât orice cremă anti-aging la 40 de ani.',
'probleme_piele'),

('rozacee,rosie,roseata,sensibil,ingrijire',
'Cum îngrijesc pielea cu rozacee?',
'Rozaceea este o afecțiune cronică — nu se vindecă, dar se gestionează:\n\n🚫 Triggeri comuni de evitat:\n• Alimente picante, alcool, cafea\n• Temperaturi extreme (saună, apă fierbinte)\n• Soare fără protecție\n• Produse cu alcool, parfumuri, SLS\n\n✅ Ingrediente calmante:\n• Centella Asiatica\n• Niacinamide (reduce roșeața)\n• Acid Azelaic (15-20% — prescripție pentru cazuri severe)\n• Aloe Vera\n• SPF Mineral (Zinc Oxide — și antiinflamator!)\n\n⚕️ Pentru cazuri moderate-severe: consultă un dermatolog.',
'probleme_piele'),

('pori,mari,minimizare,cum,reduc',
'Cum reduc aspectul porilor?',
'Porii nu se "închid" — dimensiunea lor e genetică — dar aspectul poate fi redus:\n\n✅ Ce funcționează:\n• Curățare regulată (evită înfundarea porilor)\n• BHA (Acid Salicilic) — curăță porii din interior\n• Niacinamide 10% — cel mai studiat pentru pori\n• Retinol — crește turnover-ul celular, reduce aspectul porilor\n• Primer cu pori (pentru machiaj, efect temporar)\n\n🚫 Ce NU funcționează:\n• Abur — nu deschide porii permanent\n• Pore strips — curăță superficial, irită',
'probleme_piele'),

('purging,breakout,diferenta,retinol,acid,inrautatire',
'Ce este purging-ul și cum îl recunosc?',
'Purging vs. Breakout — cum le deosebești:\n\n🔄 PURGING (reacție normală la un activ nou):\n• Apare în primele 4-6 săptămâni\n• Coșuri în zonele unde deja aveai probleme\n• Trece de la sine\n• Cauzat de: Retinol, AHA, BHA, Vitamina C\n\n❌ BREAKOUT (reacție adversă la un produs):\n• Coșuri în zone noi\n• Nu trece după 6 săptămâni\n• Produsul e comedogenic sau te irită\n→ STOP produs!\n\n💡 Dacă nu ești sigur: fă patch test 7 zile înainte de a folosi pe toată fața.',
'probleme_piele'),

('patch,test,cum,fac,nou,produs,testez',
'Cum fac patch test pentru un produs nou?',
'Patch test — obligatoriu pentru pielea sensibilă:\n\n📋 Pași:\n1. Aplică o cantitate mică pe zona interioară a brațului (sau după ureche)\n2. Lasă 24-48 de ore fără a spăla\n3. Observă: roșeață, mâncărime, iritație?\n\n✅ Dacă nu există reacție → safe de folosit\n❌ Dacă apare iritație → nu folosi pe față\n\n💡 Chiar și după patch test, introduce produsul treptat (seara, o dată la 2 zile, primele 2 săptămâni).',
'general'),

-- =====================================================
-- CATEGORIE: PRODUSE
-- =====================================================

('cleanser,spumant,crema,gel,care,aleg,tip',
'Ce tip de cleanser să aleg?',
'Ghid alegere cleanser după tipul de ten:\n\n🧴 Gel / Spumant → ten gras, mixt, acneic\n🥛 Cremă / Lapte → ten uscat, sensibil, matur\n💧 Micelară → curățare blândă, demachiant\n🛢️ Ulei de curățare → orice ten (excelent pentru dubla curățare)\n\n✅ Caracteristici ideale INDIFERENT de tip:\n• pH 4.5-6.5 (protejează bariera)\n• Fără SLS/SLES (agresiv)\n• Fără parfum (dacă ai piele sensibilă)\n\n💡 Un cleanser bun trebuie să curețe fără a lăsa pielea "strânsă" după clătire.',
'produse'),

('hidratant,crema,gel,ce,aleg,tip,ten',
'Ce hidratant este potrivit pentru tipul meu de ten?',
'Ghid hidratante după tipul de ten:\n\n💧 Ten gras/mixt: gel-cremă oil-free, non-comedogenic (ex: Neutrogena Hydro Boost, Belif Aqua Bomb)\n\n🧴 Ten normal: loțiune sau cremă ușoară\n\n🍯 Ten uscat/matur: cremă bogată cu ceramide, shea, squalane (ex: CeraVe Moisturizing Cream, La Roche-Posay Toleriane)\n\n🌸 Ten sensibil: formulă minimală, fără parfum (ex: Avene Tolerance, Eucerin Sensitive)\n\n💡 Ingrediente de căutat: Glicerină, Acid Hialuronic, Ceramide, Squalane, Panthenol',
'produse'),

('spf,crema,recomandata,protectie,tip,ten',
'Ce SPF recomanzi?',
'Recomandări SPF după tip de ten:\n\n☀️ Ten gras/mixt: SPF fluid, gel sau "invisible" (ex: La Roche-Posay Anthelios UVMune 400 Fluid, ISDIN Fusion Water)\n\n🌸 Ten sensibil/rozacee: SPF mineral cu Zinc Oxide (ex: Altruist Mineral, EltaMD UV Clear)\n\n🏖️ Ten uscat: SPF cremă cu textură hidratantă (ex: Bioderma Photoderm Lait, Avene Solar)\n\n📌 Important:\n• SPF 50+ = cea mai bună protecție\n• Reaplică la 2h în exterior\n• Nu uita gâtul și mâinile!',
'produse'),

('the,ordinary,produse,ce,cumpar,recomandat',
'Ce produse The Ordinary recomanzi?',
'The Ordinary — ghid bestseller-uri:\n\n⭐ Niacinamide 10% + Zinc 1% — ten gras, pori, sebum (35 lei)\n⭐ Hyaluronic Acid 2% + B5 — hidratare profundă (39 lei)\n⭐ Vitamin C Suspension 23% + HA — anti-aging, luminozitate (45 lei)\n⭐ Retinol 0.2% în Squalane — începători anti-aging (35 lei)\n⭐ AHA 30% + BHA 2% Peeling Solution — exfoliere 10 min/săptămână\n⭐ Alpha Arbutin 2% + HA — pete, hiperpigmentare\n\n💡 Nu cumpăra totul deodată! Alege 2-3 produse relevante pentru problemele tale.',
'produse'),

('cerave,produse,ce,recomandat,bariera',
'Ce produse CeraVe recomanzi?',
'CeraVe — brand dermatologist-developed, accesibil:\n\n🧴 Hydrating Cleanser — ten normal/uscat (nu spumant, nu irită)\n🧴 Foaming Cleanser — ten gras/mixt\n💧 Moisturizing Cream — hidratant iconic cu ceramide (borcan)\n💧 PM Facial Moisturizing Lotion — hidratant de seară cu niacinamide\n🛢️ SA Smoothing Cleanser — ten cu textura neregulată\n☀️ AM Facial Moisturizing Lotion SPF 30 — hidratant + SPF\n\n✅ CeraVe funcționează pentru că: conține ceramide esențiale + acid hialuronic + este non-comedogenic.',
'produse'),

-- =====================================================
-- CATEGORIE: GENERAL
-- =====================================================

('glowguide,ce,este,aplicatie,cum,functioneaza',
'Cum funcționează GlowGuide?',
'GlowGuide este o platformă de recomandare personalizată a produselor cosmetice:\n\n📋 Completezi chestionarul cu:\n• Tipul tău de ten\n• Alergii la ingrediente\n• Problemele pielii\n• Obiectivele tale\n\n🤖 Sistemul generează automat o rutină completă:\nCurățare → Toner → Ser → Hidratant → SPF\n\n📖 Monitorizezi progresul în Jurnalul de Progres\n💬 Interacționezi cu comunitatea în Forum\n🤖 Primești răspunsuri educative de la GlowBot\n\nTotul este personalizat pentru tine, bazat pe profilul tău dermatologic!',
'general'),

('ingredient,inci,lista,citesc,eticheta',
'Cum citesc lista de ingrediente INCI?',
'Lista INCI (International Nomenclature of Cosmetic Ingredients):\n\n📋 Regulile:\n1. Ingredientele sunt listate în ordine DESCRESCĂTOARE a concentrației\n2. Primele 5-7 ingrediente = >80% din produs\n3. Sub 1% concentrație: ordinea e la alegerea producătorului\n\n💡 Ce să cauți:\n✅ Primele ingrediente: apă (Aqua), Glicerină, Aloe Vera = buni\n⚠️ Alcool Denat. în primele poziții = usucă pielea\n⚠️ Parfum/Fragrance = posibil iritant\n\n🔍 Folosește apps: INCI Decoder, CosDNA pentru a analiza produse.',
'general'),

('cat,timp,rezultate,astept,skincare,efect',
'Cât timp durează să văd rezultate?',
'Așteptări realiste pentru skincare:\n\n⚡ Imediat — 1-3 zile: Hidratare, calmarea iritației\n📅 2-4 săptămâni: Purging trecut, textura îmbunătățită\n📅 4-8 săptămâni: Reducere pete, uniformizare ton (Vit C, Niacinamide)\n📅 3-6 luni: Efect vizibil retinol (riduri, textură)\n📅 6-12 luni: Beneficii maxime anti-aging\n\n💡 Regula de aur: 3 luni de folosire consecventă înainte să judeci un produs.\nSchimbarea a 2+ produse simultan = nu știi ce a funcționat sau ce a cauzat o reacție.',
'general'),

('conservare,termen,valabilitate,deschis,produs',
'Cât timp sunt valabile produsele cosmetice după deschidere?',
'Simbolul PAO (Period After Opening) = borcanul deschis cu un număr:\n\n📅 3M = 3 luni\n📅 6M = 6 luni\n📅 12M = 12 luni\n📅 24M = 24 luni\n\n⚠️ Produse cu termen mai scurt:\n• Vitamina C: 3-6 luni (se oxidează rapid)\n• Retinol: 6-12 luni\n• SPF: 12 luni după deschidere (NU mai protejează după expirare!)\n\n💡 Depozitare corectă: loc răcoros, întunecos, ferit de umiditate. Frigiderul prelungește viața Vitaminei C și retinolului.',
'general'),

('non,comedogenic,ce,inseamna,pori,infunda',
'Ce înseamnă non-comedogenic?',
'Non-comedogenic = produsul nu înfundă porii și nu cauzează coșuri (comedoane).\n\n⚠️ ATENȚIE: termenul nu e reglementat legal — orice brand poate scrie asta fără testare oficială!\n\n✅ Ce să verifici în schimb:\n• Comedogenic rating al ingredientelor (0-5, unde 0 = safe)\n• Ingrediente COMEDOGENICE de evitat:\n  - Ulei de cocos (rating 4)\n  - Lanolina\n  - Isopropyl Myristate\n  - Ulei de grâu\n\n✅ Ingrediente NON-comedogenice sigure:\n  - Squalane, Acid Hialuronic, Niacinamide, Glicerină',
'general'),

('skincare,barbati,diferenta,gen,piele',
'Skincare-ul pentru bărbați e diferit?',
'Pielea bărbaților are câteva diferențe față de cea a femeilor:\n\n📊 Caracteristici:\n• ~25% mai groasă\n• Produce cu ~20% mai mult sebum\n• Se îmbătrânește mai lent dar mai brusc după 50 de ani\n• Ras frecvent = iritație mecanică zilnică\n\n✅ Rutina de bază e IDENTICĂ: Cleanser → Hidratant → SPF\nNu există ingrediente "pentru bărbați" sau "pentru femei" — marketingul separat e o strategie comercială.\n\n💡 Post-bărbierit: evită alcool în after-shave dacă ai piele sensibilă. Aloe sau Centella Asiatica calmează iritația.',
'general'),

('sarcina,gravida,produse,sigure,evita,retinol',
'Ce produse sunt sigure în sarcină?',
'În sarcină, anumite ingrediente trebuie EVITATE:\n\n🚫 DE EVITAT:\n• Retinol / Retinoizi (vitamina A în doze mari)\n• Acid Salicilic în concentrații mari (>2%)\n• Hidrochinona (depigmentant puternic)\n• Benzoil Peroxid (de evitat în trimestrul 1)\n• Uleiuri esențiale concentrate\n\n✅ SIGURE în sarcină:\n• Acid Hialuronic\n• Niacinamide\n• Acid Azelaic\n• SPF (mineral sau chimic)\n• Ceramide\n• Aloe Vera, Centella Asiatica\n• Vitamina C\n\n⚕️ Consultă întotdeauna medicul ginecolog înainte de a folosi activi!',
'general'),

('alcool,produs,rau,bun,tip,skin',
'Alcoolul în produsele cosmetice e rău?',
'Depinde de TIPUL de alcool:\n\n❌ Alcooli de evitat (usucă și irită):\n• Alcohol Denat., Ethanol, Isopropyl Alcohol, SD Alcohol\n→ Distrug bariera cutanată în utilizare frecventă\n→ Efect de "curățare" temporară dar dăunătoare pe termen lung\n\n✅ Alcooli buni (emolienti, hrănitoare):\n• Cetyl Alcohol, Cetearyl Alcohol, Stearyl Alcohol\n→ Nu sunt alcool în sens clasic — sunt grăsimi solide\n→ Înmoaie și hidratează pielea\n\n💡 Verifică întotdeauna CARE alcool apare în lista INCI și în ce poziție.',
'general'),

('glicerina,ce,face,ingredient,ieftin',
'Ce face glicerina în skincare?',
'Glicerina este unul dintre cele mai eficiente ingrediente skincare — și cel mai ieftin!\n\n💧 Este un umectant puternic: atrage apa din aer și straturile profunde ale pielii\n✅ Hidratează fără a astupa porii\n✅ Potrivită pentru TOATE tipurile de ten\n✅ Calmează iritația\n✅ Ajută la cicatrizarea microleziunilor\n\nApare ca ingredient nr. 2-3 în majoritatea produselor bune.\n\n💡 Fun fact: o soluție de 30% glicerină + apă în spray este un hidratant eficient și extrem de accesibil!',
'general'),

('squalane,ce,este,ulei,ten,gras,poate',
'Ce este squalane-ul și poate fi folosit pe tenul gras?',
'Squalane este un ulei emolient derivat din măsline (sau zahăr din trestie):\n\n✅ Mimează sebumul natural al pielii\n✅ Hidratează fără senzație grasă\n✅ Non-comedogenic (rating 1)\n✅ Potrivit pentru TOATE tipurile de ten, inclusiv gras!\n✅ Extrem de stabil (nu se oxidează)\n✅ Calmează și repară bariera\n\n💡 Diferit de Squalene (instabil, din surse animale).\nBrand accesibil: The Ordinary Squalane 100% (la prețul unui produs de farmacie).',
'general'),

-- =====================================================
-- INGREDIENTE AVANSATE
-- =====================================================

('panthenol,b5,ce,face,calmeaza',
'Ce face Panthenol (B5)?',
'Panthenol (Pro-Vitamina B5) este un ingredient calmant și reparator:\n\n✅ Umectant puternic — hidratează și reține apa în piele\n✅ Accelerează vindecarea microleziunilor\n✅ Calmează iritația și roșeața\n✅ Ameliorează arsurile solare\n✅ Întărește bariera cutanată\n✅ Potrivit pentru pielea sensibilă, iritată, post-proceduri\n\n💡 Apare pe etichete ca: Panthenol, Dexpanthenol, Pro-Vitamin B5\nSe găsește în produse CeraVe, La Roche-Posay, Paula''s Choice\nEste unul din ingredientele cele mai bine tolerate — reacții adverse aproape inexistente.',
'ingrediente'),

('alpha,arbutin,alfa,pete,depigmentant,hiperpigmentare',
'Ce este Alpha Arbutin și cum ajută la pete?',
'Alpha Arbutin este unul dintre cei mai eficienți depigmentanți blânzi:\n\n✅ Inhibă tirosinaza (enzima care produce melanina)\n✅ Reduce petele post-acnee (PIH)\n✅ Uniformizează tonul pielii\n✅ Mai stabil și mai puternic decât Arbutin obișnuit\n✅ Blând — tolerat de pielea sensibilă\n\nConcentrație eficientă: 1-2%\nRezultate vizibile: 4-8 săptămâni\n\n⚠️ Obligatoriu SPF zilnic — fără el petele revin!\n💡 Se combină excelent cu: Vitamina C, Niacinamide, Acid Azelaic\nThe Ordinary Alpha Arbutin 2% + HA = bestseller accesibil.',
'ingrediente'),

('kojic,acid,pete,depigmentant,ce,face',
'Ce face acidul kojic?',
'Acidul kojic este un depigmentant natural derivat din ciuperci:\n\n✅ Inhibă producția de melanină\n✅ Reduce petele solare și post-acnee\n✅ Proprietăți antifungice și antibacteriene\n\nConcentrație eficientă: 1-4%\n\n⚠️ Precauții:\n• Poate irita pielea sensibilă\n• Instabil — se oxidează și devine portocaliu (nu mai e eficient)\n• Fotosensibilizant — SPF obligatoriu!\n• Nu combina cu Vitamina C (concurează pe același mecanism)\n\n💡 Alternativă mai stabilă: Alpha Arbutin sau Acid Azelaic.',
'ingrediente'),

('rezveratrol,resveratrol,antioxidant,ce,face',
'Ce este Resveratrolul în skincare?',
'Resveratrolul este un antioxidant puternic găsit în struguri și vin roșu:\n\n✅ Protejează pielea de stresul oxidativ\n✅ Proprietăți anti-aging\n✅ Calmează inflamația\n✅ Potențiează efectul altor antioxidanți (inclusiv Vit C)\n✅ Poate reduce hiperpigmentarea\n\n💡 Se folosește de obicei seara (antioxidanții sunt mai stabili fără expunere la lumină)\nBrand known: The Ordinary Resveratrol 3% + Ferulic Acid 3%\nSe combină bine cu: Vitamina C, Niacinamide, SPF',
'ingrediente'),

('ferulic,acid,antioxidant,vitamina,c,amplifica',
'Ce face Acidul Ferulic?',
'Acidul Ferulic este un antioxidant vegetal cu un rol special:\n\n⭐ Superputere: AMPLIFICĂ și STABILIZEAZĂ Vitamina C și Vitamina E!\n✅ Singur: antioxidant, anti-aging, fotoprotecție\n✅ Cu Vit C+E: eficiența fotoprotecției crește de 8x\n✅ Reduce hiperpigmentarea\n✅ Stimulează colagenul\n\n💡 De aceea veți vedea deseori: "Vitamin C 15% + Ferulic Acid"\n→ Combinația clasică anti-aging din SkinCeuticals C E Ferulic\n→ Versiune accesibilă: The Ordinary Resveratrol 3% + Ferulic 3%',
'ingrediente'),

('coenzima,q10,ubiquinone,ce,face,anti,aging',
'Ce face Coenzima Q10 în skincare?',
'Coenzima Q10 (Ubiquinone) este un antioxidant produs natural de corp:\n\n📉 Problema: producția scade odată cu vârsta și din cauza stresului\n✅ Protejează celulele de stresul oxidativ\n✅ Stimulează producția de colagen și elastină\n✅ Reduce ridurile fine\n✅ Energizează celulele pielii\n✅ Reduce daunele cauzate de UV\n\n💡 Găsit în creme de zi și noapte anti-aging\nBranduri: NIVEA Q10, Eucerin Q10\nSe combină bine cu Vitamina E și alți antioxidanți\n⚠️ Rezultatele sunt graduale — minim 3 luni de utilizare consecventă',
'ingrediente'),

('vitamina,e,tocopherol,ce,face,skincare',
'Ce face Vitamina E în skincare?',
'Vitamina E (Tocopherol) este un antioxidant liposolubil esențial:\n\n✅ Protejează membranele celulare de oxidare\n✅ Hidratează și calmează pielea\n✅ Accelerează vindecarea (cicatrici, arsuri ușoare)\n✅ Amplifică efectul Vitaminei C (sinergie)\n✅ Reduce inflamația\n\n💡 Găsit în aproape toate hidratantele și serurile\nApare pe etichete ca: Tocopherol, Tocopheryl Acetate\n\n⚠️ Atenție: uleiul pur de Vitamina E aplicat direct poate fi comedogenic pentru unii!\nPreferabil în formulare cosmetice, nu pur.',
'ingrediente'),

('zinc,pca,sebum,acnee,ten,gras,ce,face',
'Ce face Zinc PCA?',
'Zinc PCA este ingredientul ideal pentru tenul gras și acneic:\n\n✅ Reglează producția de sebum (reduce strălucirea)\n✅ Antibacterian — combate bacteria acneică\n✅ Antiinflamator — reduce roșeața coșurilor\n✅ Astringent blând — minimizează aspectul porilor\n✅ Potrivit pentru ten gras, mixt, acneic\n\nSe combină perfect cu Niacinamide (The Ordinary: Niacinamide 10% + Zinc 1%)\n\n💡 Diferit de Zinc Oxide (SPF mineral) — Zinc PCA e specific pentru reglarea sebumului',
'ingrediente'),

('bakuchiol,retinol,natural,alternativa,ce,este',
'Ce este Bakuchiol și e o alternativă la retinol?',
'Bakuchiol este un ingredient vegetal (din planta Psoralea corylifolia) prezentat ca "retinol natural":\n\n✅ Stimulează producția de colagen similar retinolului\n✅ Reduce ridurile fine\n✅ Uniformizează tonul\n✅ Mult mai blând — potrivit pentru pielea sensibilă\n✅ Sigur în sarcină (spre deosebire de retinol!)\n✅ Nu crește fotosensibilitatea\n\n⚠️ Realitate vs. marketing:\n• Eficacitatea e reală dar mai slabă decât retinolul\n• Studiile sunt mai puține și pe perioade mai scurte\n• Nu e o înlocuire 1:1 a retinolului, dar e o alternativă validă pentru sensibili',
'ingrediente'),

('lactic,acid,acid,lactic,ce,face,exfoliant',
'Ce face acidul lactic?',
'Acidul Lactic este un AHA derivat din lapte — cel mai blând dintre acizi:\n\n✅ Exfoliază moartea celulelor de la suprafață\n✅ Stimulează producția de ceramide (întărește bariera!)\n✅ Hidratează (efect umectant unic față de alți AHA)\n✅ Uniformizează tonul și textura\n✅ Reduce petele pigmentare\n✅ Ideal pentru începători și piele sensibilă\n\nConcentrații:\n• 5-10%: utilizare zilnică (toner)\n• 10-25%: tratament săptămânal\n\nBranduri: The Inkey List Lactic Acid, The Ordinary Lactic Acid 5%+HA',
'ingrediente'),

('glycolic,acid,glicolic,ce,face,exfoliant,puternic',
'Ce face acidul glicolic?',
'Acidul Glicolic este AHA-ul cel mai puternic și mai studiat:\n\n✅ Cea mai mică moleculă AHA → penetrare profundă\n✅ Exfoliere intensă: elimină celulele moarte eficient\n✅ Reduce ridurile fine și textura\n✅ Luminozitate imediată\n✅ Tratează hiperpigmentarea\n✅ Stimulează colagenul\n\n⚠️ Precauții:\n• Crește semnificativ fotosensibilitatea → SPF OBLIGATORIU\n• Poate irita pielea sensibilă — începe cu concentrații mici (5-7%)\n• Nu combina cu retinol sau BHA în aceeași seară\n\nConcentrații: 5-10% (zilnic), 20-30% (peeling săptămânal)',
'ingrediente'),

('mandelic,acid,mandelic,ce,face,piele,inchisa',
'Ce face acidul mandelic?',
'Acidul Mandelic este un AHA cu moleculă mare — cel mai blând dintre AHA-uri puternice:\n\n✅ Exfoliază fără iritație excesivă\n✅ Antibacterian — eficient în acnee\n✅ Reduce hiperpigmentarea\n✅ Uniformizează textura\n✅ Recomandat special pentru pielea mai închisă la culoare (risc mai mic de PIH post-exfoliere)\n✅ Potrivit pentru piele sensibilă care nu tolerează Glicolic\n\nConcentrații: 5-10%\nSe combină cu: Niacinamide, Acid Hialuronic\n⚠️ Ca toți AHA: crește fotosensibilitatea, SPF obligatoriu!',
'ingrediente'),

-- =====================================================
-- RUTINE SPECIFICE AVANSATE
-- =====================================================

('slugging,ce,este,vaseline,tehnica',
'Ce este slugging?',
'Slugging este o tehnică de origine coreeană: aplicarea vaseleinei ca ultimul strat al rutinei de seară:\n\n🐌 De ce se numește slugging: pielea "strălucitoare" ca un melc\n\n✅ Beneficii:\n• Sigilează toți ceilalți pași ai rutinei\n• Previne pierderea apei din piele (TEWL)\n• Vindecă bariera cutanată deteriorată\n• Ideal pentru ten extrem de uscat sau irititat\n\n💡 Vaseline = Occlusiv pur, non-comedogenic, hypoallergenic\n\n⚠️ Nu e recomandat pentru ten gras sau acneic!\n🔄 Alternativă mai ușoară: Aquaphor sau CeraVe Healing Ointment',
'rutina'),

('skincare,coreean,kbeauty,ce,este,pasi',
'Ce este skincare-ul coreean (K-Beauty)?',
'K-Beauty (Korean Beauty) a revoluționat skincare-ul mondial:\n\n🇰🇷 Filozofia: prevenție > tratament, hidratare = baza\n\nRutina clasică coreeană (10 pași):\n1. Ulei de curățare\n2. Cleanser apos\n3. Exfoliant (2-3x/săptămână)\n4. Toner\n5. Esență\n6. Ser/Ampoule\n7. Mască de față (sheet mask)\n8. Cremă de ochi\n9. Hidratant\n10. SPF (dimineața)\n\n💡 Nu trebuie să faci toți 10 pași! Adaptează la nevoile tale.\nIngrediente emblematice K-Beauty: Snail Mucin, Centella, Rice Water, Ginseng',
'rutina'),

('masca,fata,sheet,mask,cat,des,cum',
'Cât de des folosesc masca de față?',
'Ghid măști de față:\n\n🎭 Sheet Masks (măști tip folie):\n• 1-3x/săptămână (sau zilnic dacă sunt hidratante simple)\n• Lasă 15-20 minute, nu mai mult (se reabsoarbe serul uscat)\n• Nu clăti — bate ușor restul de ser\n\n🧪 Măști cu Argilă (Clay Masks):\n• 1x/săptămână pentru ten gras/mixt\n• Maxim 10-15 minute (argila uscată complet irită)\n• Zona T sau toată fața\n\n💡 Multi-masking: mască cu argilă pe zona T + mască hidratantă pe obraji simultan\n\n⚠️ Nu folosi mască cu AHA/retinol frecvent — risc supraexfoliere!',
'rutina'),

('gua,sha,roller,jade,ce,fac,beneficii',
'La ce ajută Gua Sha și Jade Roller?',
'Gua Sha și Jade Roller — instrumente de masaj facial:\n\n✅ Beneficii dovedite:\n• Drenaj limfatic (reduce puffiness/umflăturile matinale)\n• Relaxare musculară facială\n• Îmbunătățirea circulației sanguine\n• Aspect mai luminat după utilizare\n• Ritual relaxant de self-care\n\n⚠️ Ce NU fac:\n• Nu reduc permanent obrajii sau dublul bărbie\n• Nu elimină ridurile\n• Nu "tonifiază" mușchii facial\n\n💡 Cum le folosești corect:\n• Pe piele curată cu ser sau ulei (niciodată uscat!)\n• Mișcări de jos în sus, dinspre centru spre exterior\n• Jade Roller păstrat la frigider = efect anti-puffiness maxim',
'rutina'),

('sauna,abur,fata,bun,rau,pori',
'Sauna sau aburul deschide porii?',
'Mitul aburului — o clarificare importantă:\n\n❌ FALS: "Aburul deschide porii"\nPorii nu au mușchi — nu se deschid și nu se închid!\n\n✅ Ce face REALMENTE aburul:\n• Înmoaie sebumul și impuritățile din pori → mai ușor de curățat\n• Hidratează temporar suprafața pielii\n• Pregătește pielea pentru curățare mai eficientă\n\n⚠️ Precauții:\n• Temperatura extremă irită pielea sensibilă\n• Nu direct pe față (minim 30 cm distanță)\n• Apa fierbinte pe față = vasele de sânge se dilată → roșeață\n\n💡 Sfat: apa caldă (nu fierbinte) la curățare = efect similar, mai sigur',
'rutina'),

('ordinea,ser,mai,multe,cum,aplic,layering',
'Cum aplic mai multe seruri în aceeași rutină?',
'Când ai mai multe seruri, ordinea contează:\n\n📋 Regula principală: de la cel mai lichid la cel mai dens\n\n✅ Ordinea corectă:\n1. Ser apos (ex: Acid Hialuronic)\n2. Ser mediu (ex: Niacinamide, Vitamina C)\n3. Ser dens/ulei (ex: Retinol în Squalane)\n\n💡 Reguli practice:\n• Maxim 2-3 seruri active în aceeași rutină\n• Lasă 30-60 secunde între seruri\n• Nu combina activi incompatibili (AHA + Retinol)\n• Dimineața: antioxidanți (Vit C) + SPF\n• Seara: activi de reînnoire (Retinol, AHA)',
'rutina'),

('toamna,iarna,schimb,rutina,sezon',
'Trebuie să schimb rutina skincare cu sezonul?',
'Da! Pielea are nevoi diferite în funcție de sezon:\n\n❄️ TOAMNĂ/IARNĂ:\n• Adaugă produse mai hrănitoare (cremă mai bogată)\n• Crește layering-ul de hidratare\n• Continuă SPF (zăpada reflectă UV!)\n• Umidificator în casă = ajutor major pentru piele uscată\n• Reduce frecvența exfolierii dacă pielea e mai sensibilă\n\n☀️ PRIMĂVARĂ/VARĂ:\n• Treci la texturi mai ușoare (gel, fluid)\n• SPF mai ridicat, reaplicare mai frecventă\n• Poți crește frecvența exfolierii\n• Antioxidanți (Vit C) mai importanți',
'rutina'),

-- =====================================================
-- PROBLEME DE PIELE AVANSATE
-- =====================================================

('milia,puncte,albe,sub,piele,ce,sunt',
'Ce sunt miliile (punctele albe sub piele)?',
'Miliile sunt chisturi mici de keratină — NU sunt coșuri!\n\n📌 Cum apar:\n• Keratina prinsă sub piele (nu e sebum!)\n• Produse prea grase/ocluzive în zona ochilor\n• Post-proceduri (laser, peelinguri)\n• Genetic\n\n✅ Ce ajută:\n• Retinol — accelerează turnover-ul celular\n• AHA (Acid Glicolic/Lactic) — exfoliere\n• Curățare blândă regulată\n\n❌ NU încerca să le storci singur — cicatrici!\n⚕️ Dermatologul le poate extrage în câteva secunde cu un ac steril.',
'probleme_piele'),

('keratosis,pilaris,cosuri,brate,picioare,par,ingrown',
'Ce este Keratosis Pilaris ("găinațul de găină" pe brațe)?',
'Keratosis Pilaris (KP) — bumps mici pe brațe, coapse, obraji:\n\n📌 Ce e: foliculii de păr înfundați cu keratină — afecțiune genetică\n🔴 Nu e contagioasă, nu e acnee, nu e periculos\n\n✅ Ce ajută:\n• BHA (Acid Salicilic) în loțiune pentru corp\n• AHA (Acid Lactic, Glicolic) — exfoliere chimică\n• Hidratare intensă cu Uree (10-20%) — dezintegrează keratina\n• Evită săpunuri agresive și burete aspru\n\n⚠️ Nu dispare complet — se gestionează, nu se vindecă\n💡 Se ameliorează vara (umiditate mai mare) și se înrăutățește iarna',
'probleme_piele'),

('under,eye,cearcane,ochi,umflati,cum,tratez',
'Cum tratez cearcănele și ochii umflați?',
'Cearcănele au cauze diferite — tratamentul depinde de tip:\n\n🔵 Cearcăne violete/albastre (vase de sânge):\n• Cafeina (vasoconstrictoare) — reduce temporar\n• Vitamina K\n• Jade Roller rece\n• Odihnă + hidratare\n\n🟤 Cearcăne maronii (pigmentare):\n• Vitamina C\n• Retinol (concentrație mică — zona ochilor e sensibilă!)\n• Acid Azelaic\n\n💧 Ochi umflați (puffiness):\n• Cafeina în cremă de ochi\n• Comprese reci / Jade Roller de la frigider\n• Dormit cu capul ușor ridicat\n• Reducerea consumului de sare\n\n💡 Cremele de ochi nu fac miracole — diferența față de hidratantul obișnuit e minimă',
'probleme_piele'),

('buze,ingrijire,lip,balm,exfoliere,hidratare',
'Cum am grijă de buze?',
'Buzele nu au glande sebacee — se usucă mai rapid decât restul feței:\n\n✅ Rutina pentru buze:\n1. Exfoliere blândă 1-2x/săptămână (scrub de zahăr sau periuță moale)\n2. Lip balm cu ingrediente nutritive: Shea Butter, Ceramide, Vitamina E\n3. SPF pentru buze (deseori ignorat!)\n\n🚫 Obiceiuri de evitat:\n• Lingerea buzelor (agravează uscăciunea)\n• Lip balm cu mentol/camfor (efect de dependență)\n• Decojirea pielii uscate manual\n\n💡 Recomandare: aplică un strat gros de lip balm/vaselină înainte de somn\nOdată pe săptămână: miere + zahăr = scrub natural eficient',
'probleme_piele'),

('acnee,hormonala,menstrual,ciclu,jawline,barbife',
'Ce este acneea hormonală și cum o tratez?',
'Acneea hormonală — caracteristici:\n\n📍 Localizare tipică: bărbie, linia maxilarului, gât\n📅 Timing: apare cu 1-2 săptămâni înainte de menstruație\n🔴 Aspect: coșuri chistice, adânci, dureroase\n\n✅ Ce ajută topic:\n• Acid Salicilic (BHA) — curăță porii\n• Niacinamide — reduce inflamația\n• Benzoil Peroxid pe coșurile active\n• Zinc — antiandrogen local\n\n⚕️ Pentru cazuri moderate/severe: consultă medicul!\nSoluții medicale: anticoncepționale (echilibrare hormonală), Spironolactonă, Isotretinoin\n\n💡 Produsele topice au efect limitat pe acneea hormonală — cauza e internă!',
'probleme_piele'),

('hiperpigmentare,post,inflamatorie,pih,pete,rosii,maro',
'Ce este hiperpigmentarea post-inflamatorie (PIH)?',
'PIH = petele rămase după acnee, iritații sau răni:\n\n🔴 Pete roșii: post-inflamatorii (eritema) — dispar în 3-6 luni\n🟤 Pete maronii: hiperpigmentare = melanina în exces — mai greu de tratat\n\n✅ Ingrediente eficiente pentru PIH:\n• Niacinamide — inhibă transferul melaninei\n• Alpha Arbutin — blochează producerea melaninei\n• Vitamina C — antioxidant + uniformizare\n• Acid Azelaic — multieffect\n• Retinol — accelerează înnoirea celulară\n\n☀️ REGULĂ DE AUR: SPF zilnic este NON-NEGOCIABIL!\nFără SPF, orice tratament pentru pete este ineficient — soarele reactivează melanina.',
'probleme_piele'),

('seboreic,dermatita,matreata,fata,scuame,rosie',
'Ce este dermatita seboreică pe față?',
'Dermatita seboreică este o afecțiune cronică a pielii cauzată de o ciupercă (Malassezia):\n\n📍 Zone afectate: sprâncene, linia părului, șanțurile nazolabiale, urechi\n🔴 Aspectul: roșeață, scuame gălbui, mâncărime\n\n✅ Ce ajută:\n• Zinc Pyrithione (în șampoane și creme)\n• Ketoconazol (antifungic — prescripție)\n• Acid Azelaic — reduce Malassezia\n• Evitarea produselor cu uleiuri grele (hrănesc ciuperca)\n\n⚠️ Nu confunda cu psoriazis sau eczemă — aspectul poate fi similar!\n⚕️ Pentru cazuri persistente: obligatoriu dermatolog\n💡 Stresul agravează dermatita seboreică — rutina de relaxare contează!',
'probleme_piele'),

('cicatrici,acnee,atrofice,boxcar,icepick,tratament',
'Cum tratez cicatricile de acnee?',
'Tipuri de cicatrici de acnee și tratamente:\n\n🔵 Cicatrici atrofice (adâncituri):\n• Ice pick (adânci, înguste) — cel mai greu de tratat\n• Boxcar (late, cu margini) — răspund la peeling-uri\n• Rolling (valuri) — răspund la biostimulare\n\n✅ Tratamente topic (efect moderat):\n• Retinol — stimulează colagenul\n• AHA (Acid Glicolic) — reînnoire celulară\n• Vitamina C — sinteza colagenului\n\n⚕️ Tratamente profesionale (efect real):\n• Microneedling\n• Peeling chimic (TCA)\n• Laser fractionat\n• Fillere (temporar)\n\n💡 Prevenția e mai simplă decât tratamentul — nu stoarce coșurile!',
'probleme_piele'),

-- =====================================================
-- PRODUSE AVANSATE
-- =====================================================

('mizon,cosrx,snail,melc,secretie,ce,face',
'Ce face mucina de melc (Snail Mucin)?',
'Mucina de melc (Snail Secretion Filtrate) este un bestseller K-Beauty:\n\n✅ Proprietăți multiple:\n• Hidratare intensă (glicoproteine + acid hialuronic natural)\n• Accelerează vindecarea (coșuri, iritații, cicatrici mici)\n• Stimulează colagenul\n• Antiaging\n• Calmant\n\n💡 Nu e cruzime față de animale — melcii nu sunt răniți, secretă mucina la stimulare blândă\n\nProduse iconice:\n• COSRX Advanced Snail 96 Mucin Power Essence\n• Mizon Snail Repair Cream\n\nPotrivit pentru: TOATE tipurile de ten, inclusiv sensibil',
'produse'),

('tretinoin,retin,a,retinoid,prescriptie,retinol,diferenta',
'Care e diferența dintre Retinol și Tretinoin?',
'Retinoizii — de la mai slab la mai puternic:\n\n📊 Ierarhia retinoizilor:\n1. Retinyl Palmitate (cel mai slab — OTC)\n2. Retinol (standard — OTC)\n3. Retinaldehyde/Retinal (puternic — OTC/semi-prescripție)\n4. Tretinoin/Retinoic Acid (cel mai puternic — PRESCRIPȚIE)\n\n⚡ Tretinoin:\n• De 20x mai puternic decât retinolul\n• Acționează direct (retinolul se convertește în piele)\n• Rezultate mai rapide dar iritație mai mare\n• Necesită prescripție medicală\n• Produse: Retin-A, Tretinoin generică\n\n💡 Dacă retinolul nu mai dă rezultate după 6+ luni, discută cu dermatologul despre tretinoin.',
'produse'),

('paula,choice,bha,exfoliant,recomandat,acid,salicilic',
'Ce este Paula''s Choice BHA și cum îl folosesc?',
'Paula''s Choice Skin Perfecting 2% BHA Liquid Exfoliant este considerat cel mai bun exfoliant BHA de pe piață:\n\n✅ Conține: Acid Salicilic 2% la pH optim\n✅ Curăță porii în profunzime\n✅ Reduce punctele negre și coșurile\n✅ Textură apoasă, ușor de aplicat\n\nCum se folosește:\n1. După toner, înainte de ser\n2. Se aplică cu un disc de bumbac sau palmele\n3. NU se clătește\n4. Începe cu 2-3x/săptămână, crește treptat\n\n⚠️ Obligatoriu SPF în zilele de utilizare!\n💰 Prețul e ridicat dar o sticlă durează 3-6 luni',
'produse'),

('ordinary,peeling,aha,bha,cum,folosesc,risc',
'Cum folosesc The Ordinary AHA 30% + BHA 2% Peeling Solution?',
'The Ordinary AHA 30% + BHA 2% — peeling puternic, folosire ATENTĂ:\n\n⚠️ ATENȚIE: concentrație MARE — nu e pentru începători!\n\n📋 Protocol corect:\n1. Aplică pe față curată și uscată\n2. Lasă MAXIM 10 minute (nu mai mult!)\n3. Clătește BINE cu apă\n4. Aplică imediat hidratant calmant\n5. Folosește DOAR seara, DOAR 1x/săptămână\n\n🚫 NU folosi dacă:\n• Ai piele sensibilă sau reactivă\n• Ai răni active sau acnee inflamată severă\n• Ai folosit retinol în aceeași seară\n\n☀️ SPF obligatoriu a doua zi dimineață!\n💡 Față roșie imediat după = normal; roșeață persistentă = iritație',
'produse'),

('nuskin,herbalife,avon,oriflame,calitate,buna',
'Produsele Avon, Oriflame sunt de calitate?',
'Realitatea despre brandurile "populare":\n\n✅ Ce este ADEVĂRAT:\n• Avon și Oriflame au îmbunătățit semnificativ formulele în ultimii ani\n• Unele produse sunt eficiente (hidratante, SPF)\n• Accesibile ca preț\n\n⚠️ Ce să verifici INDIFERENT de brand:\n• Lista de ingrediente INCI (nu marketingul)\n• Conține ingrediente active eficiente?\n• Ce concentrație?\n• Testele clinice sunt reale sau "in-house"?\n\n💡 Regula de aur în skincare: ingredientele contează, nu brandul sau prețul!\nUn hidratant de 20 lei cu Glicerină + Ceramide > o cremă de 200 lei cu ingredient exotic neeficient\n\nRecomandat: verifică produsele pe INCIDecoder.com',
'produse'),

-- =====================================================
-- STIL DE VIATĂ ȘI SKINCARE
-- =====================================================

('alimentatie,dieta,acnee,lapte,zahar,afecteaza,pielea',
'Alimentația afectează acneea și pielea?',
'Da — legătura dintre dietă și piele e reală:\n\n🥛 LACTATE (în special lapte degresat):\n• Studii asociază consumul mare cu acnee\n• Mecanismul: hormoni de creștere din lapte → stimulează sebumul\n• Brânzeturile fermentate = risc mai mic\n\n🍬 ZAHĂR și ALIMENTE CU INDICE GLICEMIC MARE:\n• Cresc insulina → stimulează androgenii → mai mult sebum → acnee\n• Pâine albă, orez alb, dulciuri, băuturi carbogazoase\n\n✅ Alimentație pro-piele:\n• Omega-3 (pește gras, semințe de in) — antiinflamator\n• Antioxidanți (fructe, legume colorate)\n• Zinc (semințe de dovleac, nuci)\n• Hidratare (2L apă/zi)\n\n⚠️ Nu există o dietă universală anti-acnee — observă cum REACȚIONEAZĂ PIELEA TA!',
'general'),

('stres,somn,pielea,acnee,efecte,cortizol',
'Stresul și lipsa somnului afectează pielea?',
'DA — conexiunea piele-creier (axa piele-intestin-creier) e bine documentată:\n\n😰 STRESUL:\n• Crește cortizolul → mai mult sebum → acnee\n• Degradează colagenul → îmbătrânire prematură\n• Inflamație sistemică → sensibilitate crescută\n• Agravează: acnee, eczeme, psoriazis, rozacee, dermatită\n\n😴 LIPSA SOMNULUI:\n• Regenerarea celulară are loc NOAPTEA (orele 22-2)\n• Cortizol ridicat + GH scăzut = piele mai îmbătrânită\n• Cearcăne, puffiness, ten tern\n\n✅ Cel mai subevaluat skincare:\n• 7-9 ore somn calitativ\n• Tehnici de reducere a stresului\n• Lenjerie de perne curată (schimbă 2x/săptămână!)',
'general'),

('exercitii,sport,pielea,acnee,transpiratie,efect',
'Sportul ajută sau dăunează pielii?',
'Sportul are efecte POZITIVE și NEGATIVE — depinde de îngrijire:\n\n✅ BENEFICII:\n• Circulație îmbunătățită → nutrienți mai mulți la celulele pielii\n• Reducerea stresului (cortizol mai mic)\n• Detoxifiere prin transpirație\n• Somn mai bun → regenerare mai bună\n\n⚠️ RISCURI dacă nu îngrijești corect:\n• Transpirația + sebumul + bacteriile = acnee post-workout\n• Frecare (căști, bretele sutien) = acnee mecanică\n\n✅ Rutina corectă post-sport:\n1. Spălare față imediat după antrenament\n2. Nu lăsa transpirația să se usuce pe față\n3. Curățare blândă — pielea e deja iritată\n4. Hidratare ușoară',
'general'),

('apa,dura,calcara,pielea,efect,probleme',
'Apa dură (calcaroasă) afectează pielea?',
'DA — apa dură are efect real asupra pielii:\n\n💧 Ce face apa dură:\n• Mineralele (calciu, magneziu) se depun pe piele\n• Perturbă pH-ul natural al pielii\n• Poate agrava eczema, pielea uscată, rozaceea\n• Reduce eficiența cleanser-urilor (formează un film)\n\n✅ Soluții:\n• Micelară sau apă minerală pentru curățare finală\n• Acid Citric diluat în apă = "soft water" DIY\n• Filtru de duș (disponibil online, ~50-150 lei)\n• Toner cu pH acid după curățare (reechilibrează)\n\n💡 Dacă pielea ta s-a înrăutățit după ce te-ai mutat = verifică duritatea apei din zonă',
'general'),

('parfum,fragrance,skincare,evita,iritatie',
'De ce ar trebui să evit parfumul în produsele cosmetice?',
'Parfumul (Fragrance/Parfum pe etichete) este cauza nr. 1 de alergii cosmetice:\n\n⚠️ De ce e problematic:\n• Un singur ingredient "Fragrance" poate ascunde 200+ substanțe chimice\n• Alergeni cunoscuți: Limonene, Linalool, Eugenol, Geraniol\n• Irită și sensibilizează pielea în timp\n• Perturbă bariera cutanată\n\n🚫 De evitat în special dacă ai:\n• Piele sensibilă sau reactivă\n• Rozacee, eczeme, dermatită\n• Acnee (parfumul poate agrava)\n\n✅ Cum identifici pe etichetă:\n• "Fragrance" sau "Parfum" = amestec nedezvăluit\n• Uleiuri esențiale (Lavender Oil, Citrus) = tot parfum natural, tot iritant\n\n💡 "Unscented" ≠ "Fragrance-free" — unscented poate conține parfum mascat!',
'general'),

('eco,bio,natural,organic,cosmetice,mai,bun,sintetic',
'Produsele naturale/bio sunt mai bune pentru piele?',
'Mitul "natural = mai bun" în skincare:\n\n❌ FALS — naturalul nu e automat mai sigur sau mai eficient:\n\n⚠️ "Naturale" dar iritante:\n• Uleiuri esențiale (lavandă, bergamotă, lămâie) = alergeni comuni\n• Ulei de cocos = comedogenic (rating 4)\n• Suc de lămâie direct pe față = arsuri chimice (pH 2!)\n• Bicarbonat = distruge bariera cutanată (pH 9)\n\n✅ "Sintetice" dar excelente:\n• Acid Hialuronic sintetic = identic cu cel natural, mai pur\n• Niacinamide sintetic = 100% eficient\n• Ceramide sintetice = identice cu cele naturale\n\n💡 Principiul activ: ingredientele sunt evaluate pe EFICIENȚĂ și SIGURANȚĂ, nu pe origine.',
'general'),

('apa,micelara,suficienta,curatare,ajunge,demachiant',
'Apa micelară este suficientă pentru curățare?',
'Apa micelară singură NU este suficientă pentru curățare completă:\n\n🔬 Ce face apa micelară:\n• Dizolvă machiajul și impuritățile de suprafață\n• Micele (molecule sferice) atrag murdăria\n• Rapidă și convenabilă\n\n❌ Ce NU face singură:\n• Nu curăță în profunzime\n• Nu îndepărtează complet SPF-ul (film rezistent)\n• Lăsată pe față fără clătire → surfactanții irită în timp\n\n✅ Folosire corectă:\n• Ca PRIM PAS în dubla curățare (seara)\n• Sau pentru dimineața când nu ai machiaj/SPF\n• Sau pentru curățare rapidă pe drum\n\n💡 Ideal: după apă micelară, urmează un cleanser apos pentru curățare completă.',
'general'),

('ordinea,vitamina,c,spf,pot,combina,dimineata',
'Pot folosi Vitamina C și SPF în aceeași rutină de dimineață?',
'DA — Vitamina C și SPF nu doar că sunt compatibile, ci se POTENȚEAZĂ reciproc!\n\n☀️ Rutina ideală de dimineață:\n1. Cleanser\n2. Toner\n3. Ser Vitamina C (se aplică PE PIELE, nu amestecat cu SPF)\n4. Hidratant\n5. SPF (ultimul strat)\n\n✅ De ce funcționează împreună:\n• Vitamina C = antioxidant intern (neutralizează radicalii liberi care trec de SPF)\n• SPF = scut extern (blochează UV)\n• Împreună oferă protecție dublă\n\n⚠️ Nu amesteca produsele în palmă!\nAplică fiecare separat și lasă să se absoarbă parțial înainte de următorul pas.',
'rutina'),

('contorno,ochi,crema,cand,incep,varsta',
'De la ce vârstă folosesc cremă de ochi?',
'Ghid vârstă și cremă de ochi:\n\n👁️ 20-25 ani: Nu e neapărat necesară. Hidratantul tău ajunge și în zona ochilor (evită contactul direct cu ochii).\n\n👁️ 25-30 ani: Ideal de introdus — prevenție. Caută: Acid Hialuronic, Peptide, Cafeina.\n\n👁️ 30+ ani: Beneficiu real. Adaugă Retinol (concentrație mică, specific pentru ochi), Vitamina C.\n\n💡 Adevărul despre cremele de ochi:\n• Pielea din jurul ochilor e de 3x mai subțire\n• Produsele obișnuite pot fi prea grele → milia!\n• Cremele de ochi au textură adaptată zonei\n• Dar ingredientele active sunt aceleași ca în seruri\n\n📌 Aplică: tamponând ușor cu inelarul (cel mai slab deget), nu frecat!',
'rutina');

-- Verificare: câte întrebări au fost inserate?
SELECT COUNT(*) AS total_faq, categorie FROM FAQ GROUP BY categorie;
SELECT COUNT(*) AS total FROM FAQ;
