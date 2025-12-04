import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { Heart, Calendar, CheckCircle, Circle, MessageCircle, Activity, ChevronRight, ShieldCheck, Droplets, Sparkles, Cookie, ArrowUpRight, Battery, MessageSquare, Baby, Star, CloudRain, Feather, HelpCircle, BookOpen, User, Moon, Utensils, RefreshCw, Wand2, Trash2, Backpack, X, CheckSquare, Phone, MapPin, AlertTriangle, Navigation, Scale, Home, LayoutGrid, Sprout, Ruler, Weight } from 'lucide-react';

// Global variables provided by the Canvas environment
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// *****************************************************************
// FIREBASE CONFIG
// *****************************************************************
const firebaseConfig = {
  apiKey: "AIzaSyAL2t8wMFxzEco3Z1JIu73aSzroJBeBw0M",
  authDomain: "superdad-app.firebaseapp.com",
  projectId: "superdad-app",
  storageBucket: "superdad-app.firebasestorage.app",
  messagingSenderId: "1022619437742",
  appId: "1:1022619437742:web:63191dabcfc1d650d4bb3f",
  measurementId: "G-V6WWJ3F6NG"
};

// *****************************************************************
// GEMINI API KEY
// *****************************************************************
const apiKey = "AIzaSyCo_EE1xAwRsN4qmKzHFezUUB9syGmCxWQ"; 

const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// --- GEMINI API UTILITIES ---
const callGemini = async (prompt) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Der Coach denkt noch nach...";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Verbindung zum Coach gerade nicht möglich.";
  }
};

// --- CONTENT DATA ---

// OASIS IDEAS
const OASIS_IDEAS = {
    trimester1: [
        { title: "Ingwer-Held", text: "Koch ihr einen frischen Ingwer-Tee gegen die Übelkeit." },
        { title: "Snack-Service", text: "Schneide ihr Obst klein und stell es kommentarlos hin." },
        { title: "Ruhe-Pol", text: "Nimm ihr heute Abend alles ab, damit sie um 20 Uhr schlafen kann." },
        { title: "Frische Luft", text: "Ein kurzer, langsamer Spaziergang im Park (hilft gegen Müdigkeit)." },
        { title: "Geruchs-Wächter", text: "Lüfte die Wohnung gut durch und vermeide starke Parfums." }
    ],
    trimester2: [
        { title: "Date Night", text: "Plan ein kleines Date (Kino oder schick essen), solange es noch leicht geht." },
        { title: "Bauch-Öl", text: "Besorg ein gutes Pflegeöl und biete an, den Bauch einzucremen." },
        { title: "Kompliment", text: "Sag ihr, wie wunderschön sie mit dem Babybauch aussieht." },
        { title: "Ausflug", text: "Fahrt am Wochenende irgendwo hin, wo ihr noch nie wart." },
        { title: "Nestbau-Support", text: "Frag sie: 'Was wolltest du im Kinderzimmer schon immer erledigt haben?' und mach es." }
    ],
    trimester3: [
        { title: "Schuh-Service", text: "Binde ihr heute die Schuhe zu. Der Bauch ist im Weg!" },
        { title: "Rücken-Retter", text: "Eine 5-Minuten Massage für den unteren Rücken wirkt Wunder." },
        { title: "Kissen-Burg", text: "Arrangiere ihre Kissen im Bett oder auf dem Sofa neu für maximalen Komfort." },
        { title: "Chauffeur", text: "Fahr sie überall hin. Laufen ist jetzt Sport." },
        { title: "Beine hoch", text: "Leg ihre Beine hoch und massiere vorsichtig die Waden." }
    ],
    postpartum: [
        { title: "Dusch-Wächter", text: "Nimm das Baby für 30 Min, damit sie in Ruhe (!) duschen kann." },
        { title: "Chefkoch", text: "Koche ihr Lieblingsessen (oder bestell es). Stillen macht hungrig." },
        { title: "Wasser-Marsch", text: "Stell ihr bei jedem Stillen ungefragt ein großes Glas Wasser hin." },
        { title: "Nachtschicht", text: "Übernimm heute das Wickeln nach dem Stillen in der Nacht." },
        { title: "Mutmacher", text: "Sag ihr, dass sie eine fantastische Mutter ist." }
    ],
    loss: [
        { title: "Lichtblick", text: "Zünde abends eine Kerze für euer Sternchen an." },
        { title: "Zuhörer", text: "Frag sie: 'Wie fühlst du dich heute wirklich?' und hör nur zu." },
        { title: "Tee-Ritual", text: "Bring ihr eine warme Tasse Tee und eine Decke." },
        { title: "Spaziergang", text: "Geht zusammen in die Natur, ohne Ziel, einfach laufen." },
        { title: "Schutzraum", text: "Sag heute alle Termine ab, die nicht sein müssen." }
    ]
};

const getDailyOasis = (mode, week) => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    let pool = [];
    if (mode === 'loss') pool = OASIS_IDEAS.loss;
    else if (mode === 'postpartum') pool = OASIS_IDEAS.postpartum;
    else {
        if (week < 14) pool = OASIS_IDEAS.trimester1;
        else if (week < 28) pool = OASIS_IDEAS.trimester2;
        else pool = OASIS_IDEAS.trimester3;
    }
    return pool[dayOfYear % pool.length];
};

const PREGNANCY_WEEKS = {
    4: { size: 'ein Mohnsamen', image: '/images/mohnsamen.png', cm: 0.1, g: 1, feeling: 'Hoffnung & Geheimnis', tip: 'Noch nix sagen, aber Folsäure checken.' },
    5: { size: 'ein Sesamkorn', image: '/images/sesam.png', cm: 0.2, g: 1, feeling: 'Ahnung & Aufregung', tip: 'Verzicht auf Alkohol/Zigaretten unterstützen.' },
    6: { size: 'eine Erbse', image: '/images/erbse.png', cm: 0.5, g: 1, feeling: 'Müdigkeit kickt rein', tip: 'Lass sie schlafen. Übernimm den Einkauf.' },
    7: { size: 'eine Blaubeere', image: '/images/blaubeere.png', cm: 1.0, g: 1, feeling: 'Übelkeit & Ekel', tip: 'Koche geruchsneutral. Ingwertee besorgen.' },
    8: { size: 'eine Himbeere', image: '/images/himbeere.png', cm: 1.6, g: 1, feeling: 'Gefühlschaos', tip: 'Sei ihr Blitzableiter für Launen.' },
    9: { size: 'eine Olive', image: '/images/olive.png', cm: 2.3, g: 2, feeling: 'Erschöpfung', tip: 'Bring ihr Snacks ans Bett bevor sie aufsteht.' },
    10: { size: 'eine Pflaume', image: '/images/pflaume.png', cm: 3.1, g: 4, feeling: 'Hormon-Party', tip: 'Erster Ultraschall? Nimm dir frei!' },
    11: { size: 'eine Limette', image: '/images/limette.png', cm: 4.1, g: 7, feeling: 'Durst & Harndrang', tip: 'Immer Wasserflasche auffüllen.' },
    12: { size: 'eine Aprikose', image: '/images/aprikose.png', cm: 5.4, g: 14, feeling: 'Aufatmen (1. Etappe)', tip: 'Verkündet es der Familie!' },
    13: { size: 'eine Zitrone', image: '/images/zitrone.png', cm: 7.4, g: 23, feeling: 'Energie kehrt zurück', tip: 'Plant einen kleinen Ausflug.' },
    14: { size: 'eine Orange', image: '/images/orange.png', cm: 8.7, g: 43, feeling: 'Babybauch wächst', tip: 'Mach die ersten Bauch-Fotos.' },
    15: { size: 'ein Apfel', image: '/images/apfel.png', cm: 10.1, g: 70, feeling: 'Libido schwankt', tip: 'Geduld und Zärtlichkeit ohne Druck.' },
    16: { size: 'eine Avocado', image: '/images/avocado.png', cm: 11.6, g: 100, feeling: 'Nestbautrieb startet', tip: 'Entrümple das Arbeitszimmer/Zukünftiges Kinderzimmer.' },
    17: { size: 'eine Birne', image: '/images/birne.png', cm: 13.0, g: 140, feeling: 'Bänderdehnung', tip: 'Biete ihr eine Rückenmassage an.' },
    18: { size: 'eine Paprika', image: '/images/paprika.png', cm: 14.2, g: 190, feeling: 'Erstes Flattern?', tip: 'Hand auf den Bauch, Geduld haben.' },
    19: { size: 'eine Mango', image: '/images/mango.png', cm: 15.3, g: 240, feeling: 'Heißhunger', tip: 'Geh auch nachts für Eis zur Tanke.' },
    20: { size: 'eine Banane', image: '/images/banane.png', cm: 16.4, g: 300, feeling: 'Halbzeit!', tip: 'Feiert Bergfest. Geht schick essen.' },
    21: { size: 'eine Karotte', image: '/images/karotte.png', cm: 26.7, g: 360, feeling: 'Bewegungsdrang', tip: 'Geht zusammen schwimmen (entlastet den Rücken).' },
    22: { size: 'eine Papaya', image: '/images/papaya.png', cm: 27.8, g: 430, feeling: 'Tritte werden stärker', tip: 'Sprich mit dem Bauch, er hört dich jetzt.' },
    23: { size: 'eine Grapefruit', image: '/images/grapefruit.png', cm: 28.9, g: 500, feeling: 'Schwere Beine', tip: 'Besorg ihr Kompressionsstrümpfe oder Fußmassage.' },
    24: { size: 'ein Maiskolben', image: '/images/mais.png', cm: 30.0, g: 600, feeling: 'Sodbrennen', tip: 'Milch oder Mandeln bereitstellen.' },
    25: { size: 'eine Rübe', image: '/images/ruebe.png', cm: 34.6, g: 660, feeling: 'Schlafprobleme', tip: 'Stillkissen zum Schlafen besorgen.' },
    26: { size: 'eine Zucchini', image: '/images/zucchini.png', cm: 35.6, g: 760, feeling: 'Rückenschmerzen', tip: 'Schuhe binden übernehmen.' },
    27: { size: 'ein Blumenkohl', image: '/images/blumenkohl.png', cm: 36.6, g: 875, feeling: 'Atemnot', tip: 'Treppen langsam gehen, Pausen machen.' },
    28: { size: 'eine Aubergine', image: '/images/aubergine.png', cm: 37.6, g: 1005, feeling: '3. Trimester beginnt', tip: 'Kliniktasche Packliste durchgehen.' },
    29: { size: 'ein Butternuss-Kürbis', image: '/images/kuerbis_klein.png', cm: 38.6, g: 1153, feeling: 'Kindsbewegungen', tip: 'Spiel "Tritt-Antwort" mit dem Bauch.' },
    30: { size: 'eine Gurke', image: '/images/gurke.png', cm: 39.9, g: 1319, feeling: 'Sorgen & Ängste', tip: 'Geburtsvorbereitungskurs ernst nehmen.' },
    31: { size: 'eine Ananas', image: '/images/ananas.png', cm: 41.1, g: 1502, feeling: 'Alles wird eng', tip: 'Hilf ihr aus dem Bett/Sofa hoch.' },
    32: { size: 'ein Chinakohl', image: '/images/chinakohl.png', cm: 42.4, g: 1702, feeling: 'Übungswehen', tip: 'Lerne Wehen zu tracken (Abstand messen).' },
    33: { size: 'ein Sellerie', image: '/images/sellerie.png', cm: 43.7, g: 1918, feeling: 'Ungeduld', tip: 'Kinderzimmer fertig streichen/aufbauen.' },
    34: { size: 'eine Honigmelone', image: '/images/honigmelone.png', cm: 45.0, g: 2146, feeling: 'Mutterschutz!', tip: 'Feiert ihren letzten Arbeitstag.' },
    35: { size: 'eine Kokosnuss', image: '/images/kokosnuss.png', cm: 46.2, g: 2383, feeling: 'Senkwehen', tip: 'Auto checken, Tank voll?' },
    36: { size: 'ein Kopfsalat', image: '/images/salat.png', cm: 47.4, g: 2622, feeling: 'Nestbau-Finale', tip: 'Kliniktasche ins Auto stellen.' },
    37: { size: 'ein Mangold', image: '/images/mangold.png', cm: 48.6, g: 2859, feeling: 'Bereit (Theoretisch)', tip: 'Dokumente griffbereit legen.' },
    38: { size: 'ein Lauch', image: '/images/lauch.png', cm: 49.8, g: 3083, feeling: 'Warten...', tip: 'Lenk sie ab. Kino, Essen, Spazieren.' },
    39: { size: 'eine Wassermelone', image: '/images/wassermelone.png', cm: 50.7, g: 3288, feeling: 'Jedes Ziehen zählt', tip: 'Handy immer auf Laut.' },
    40: { size: 'ein Kürbis', image: '/images/kuerbis.png', cm: 51.2, g: 3462, feeling: 'Geburtstermin', tip: 'Ruhepol sein. Du schaffst das.' },
    41: { size: 'ein Riesen-Kürbis', image: '/images/riesenkuerbis.png', cm: 51.7, g: 3597, feeling: 'Überfällig', tip: 'Nervige Nachfragen von Verwandten abblocken.' }
};

const POSTPARTUM_EMPATHY = {
  0: { feeling: 'Adrenalin & Erschöpfung', tip: 'Besuch abwehren. Windeln wechseln. Essen ans Bett.' },
  1: { feeling: 'Baby Blues & Heilung', tip: 'Zuhören bei Tränen. Keine Ratschläge. Haushalt schmeißen.' },
  2: { feeling: 'Clusterfeeding & Müdigkeit', tip: 'Nachts das Baby nach dem Stillen wickeln/tragen.' },
  4: { feeling: 'Neue Routine finden', tip: 'Ermutige sie, mal 1h rauszugehen (ohne Baby).' },
  8: { feeling: 'Körpergefühl kehrt zurück', tip: 'Rückbildungskurs organisieren/freischaufeln.' },
  12: { feeling: 'Alltag spielt sich ein', tip: 'Plant ein erstes kleines Date zuhause.' },
};

const LOSS_EMPATHY = {
  early: { feeling: 'Schock & Leere', tip: 'Nimm ihr alles ab. Sei einfach da. Schweigen ist okay.' },
  middle: { feeling: 'Körperlicher & seelischer Schmerz', tip: 'Sorge für Schmerzmittel, Wärmflasche und Tee. Keine Ratschläge.' },
  late: { feeling: 'Tiefe Trauer & Abschied', tip: 'Schaffe Erinnerungen (Fotos, Fußabdruck). Organisiere Abschiednahme.' },
  after: { feeling: 'Wellen der Trauer', tip: 'Erinnere an Jahrestage. Akzeptiere, dass Trauer nicht linear ist.' }
};

const HOSPITAL_BAG_CONTENT = {
    documents: {
        title: "Papierkram (Wichtig!)",
        items: [
            { id: 'doc-1', text: 'Mutterpass' },
            { id: 'doc-2', text: 'Personalausweise (beide)' },
            { id: 'doc-3', text: 'Krankenkassenkarte' },
            { id: 'doc-4', text: 'Einweisungsschein (vom FA)' },
            { id: 'doc-5', text: 'Heiratsurkunde / Vaterschaftsanerkennung' }
        ]
    },
    mom: {
        title: "Für Sie",
        items: [
            { id: 'mom-1', text: 'Bequeme T-Shirts/Nachthemden (aufknöpfbar)' },
            { id: 'mom-2', text: 'Still-BHs / Einlagen' },
            { id: 'mom-3', text: 'Warme Socken (kalte Füße hemmen Wehen!)' },
            { id: 'mom-4', text: 'Bequeme Jogginghose' },
            { id: 'mom-5', text: 'Kulturbeutel (Zahnbürste, Deo ohne Alu)' },
            { id: 'mom-6', text: 'Lippenbalsam (Lippen trocknen beim Atmen aus)' },
            { id: 'mom-7', text: 'Playlist / Kopfhörer' }
        ]
    },
    dad: {
        title: "Für Dich (Der Support)",
        items: [
            { id: 'dad-1', text: 'SNACKS! (Müsliriegel, Traubenzucker)' },
            { id: 'dad-2', text: 'Kleingeld für Automaten' },
            { id: 'dad-3', text: 'Powerbank & Ladekabel (lang)' },
            { id: 'dad-4', text: 'Frisches T-Shirt & Deo' },
            { id: 'dad-5', text: 'Badehose (falls Wassergeburt)' }
        ]
    },
    baby: {
        title: "Fürs Baby (Heimweg)",
        items: [
            { id: 'baby-1', text: 'Body & Strampler (Gr. 50/56)' },
            { id: 'baby-2', text: 'Mützchen & Söckchen' },
            { id: 'baby-3', text: 'Spucktuch' },
            { id: 'baby-4', text: 'Babyschale für Auto (Isofix testen!)' },
            { id: 'baby-5', text: 'Decke (je nach Jahreszeit)' }
        ]
    }
};

const getTasks = (mode, stage) => {
  if (mode === 'pregnancy') {
      if (stage === 1) return [
          { id: 'p1-1', text: 'Arzttermine planen', category: 'Logistik' },
          { id: 'p1-2', text: 'Codewörter definieren', category: 'Emotional' },
          { id: 'p1-3', text: 'Snack-Notfall-Kit kaufen', category: 'Support' },
      ];
      if (stage === 2) return [
          { id: 'p2-1', text: 'Zimmer planen', category: 'Vorbereitung' },
          { id: 'p2-2', text: 'Geburtskurs buchen', category: 'Logistik' },
          { id: 'p2-3', text: 'Massage lernen', category: 'Support' },
      ];
      if (stage === 3) return [
          { id: 'p3-1', text: 'Weg zur Klinik testen', category: 'Notfall' },
          { id: 'p3-2', text: 'Ruhe-Tag organisieren', category: 'Emotional' },
          { id: 'p3-3', text: 'Elterngeld Antrag vorbereiten', category: 'Bürokratie' },
      ];
  } 
  
  if (mode === 'postpartum') {
      return [
          { id: 'pp-1', text: 'Geburtsurkunde beantragen', category: 'Bürokratie' },
          { id: 'pp-2', text: 'Krankenkasse informieren', category: 'Bürokratie' },
          { id: 'pp-3', text: 'Kinderarzt U3 Termin', category: 'Gesundheit' },
          { id: 'pp-4', text: 'Einkauf für die Woche erledigen', category: 'Support' },
          { id: 'pp-5', text: 'Besuchstermine koordinieren (oder absagen)', category: 'Gatekeeping' },
      ];
  }

  if (mode === 'loss') {
      return [
          { id: 'l-1', text: 'Krankmeldung/Mutterschutz klären', category: 'Bürokratie' },
          { id: 'l-2', text: 'Bestatter kontaktieren (wenn nötig)', category: 'Logistik' },
          { id: 'l-3', text: 'Abschiedsritual überlegen', category: 'Emotional' },
          { id: 'l-4', text: 'Freunde/Familie informieren (Gatekeeper)', category: 'Kommunikation' },
          { id: 'l-5', text: 'Rückbildungsgymnastik anfragen', category: 'Gesundheit' },
      ];
  }
  return [];
};

const HABITS_PREGNANCY = [
    { key: 'hydration', title: "Wasser", text: "Bring ihr ein Glas", icon: Droplets, color: 'blue' },
    { key: 'oasis', title: "Oase", text: "Tägliche Geste", icon: Sparkles, color: 'amber' }
];

const HABITS_POSTPARTUM = [
    { key: 'hydration', title: "Still-Snack", text: "Wasser & Nüsse", icon: Utensils, color: 'orange' },
    { key: 'nightshift', title: "Nacht-Held", text: "Wickeln übernehmen", icon: Moon, color: 'indigo' }
];

const HABITS_LOSS = [
    { key: 'hydration', title: "Fürsorge", text: "Tee hinstellen", icon: Droplets, color: 'stone' },
    { key: 'shield', title: "Schutzschild", text: "Besuch abwehren", icon: ShieldCheck, color: 'zinc' }
];

// --- UTILITIES ---
const calculateStatus = (dateString, mode) => {
  if (mode === 'loss') return { status: 'Loss', progress: 0, stage: 'after', label: 'Sternenkind' };
  if (!dateString) return { status: 'NotSet', progress: 0, stage: 0, label: '' };

  const [y, m, d] = dateString.split('-').map(Number);
  const refDate = new Date(y, m - 1, d); 
  refDate.setHours(0, 0, 0, 0);
  const today = new Date(); 
  today.setHours(0, 0, 0, 0);
  
  if (mode === 'postpartum') {
      const diffTime = Math.abs(today - refDate);
      const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) % 7;
      return { status: 'Postpartum', progress: 100, stage: diffWeeks, week: diffWeeks, days: diffDays, label: `${diffWeeks} Wochen alt` };
  }

  const totalDuration = 280;
  if (refDate < today) {
    const daysSinceDue = Math.floor((today - refDate) / (1000 * 60 * 60 * 24));
    return { week: 40 + Math.floor(daysSinceDue / 7), days: daysSinceDue % 7, trimester: 4, status: 'Pregnant', progress: 100, stage: 3, label: 'Überfällig' };
  }

  const diffTime = refDate.getTime() - today.getTime();
  const daysUntilDue = Math.round(diffTime / (1000 * 60 * 60 * 24));
  const daysPregnant = 280 - daysUntilDue;

  if (daysPregnant < 0) return { week: 0, days: 0, trimester: 0, status: 'Waiting', progress: 0, stage: 0, label: 'Warten' };

  const completedWeeks = Math.floor(daysPregnant / 7);
  const currentDays = daysPregnant % 7;
  const currentWeek = completedWeeks + 1; 
  const progress = Math.min(100, Math.max(0, (daysPregnant / totalDuration) * 100));
  let trimester = 1;
  if (currentWeek >= 14) trimester = 2;
  if (currentWeek >= 28) trimester = 3;

  return { 
      week: currentWeek, 
      days: currentDays, 
      trimester, 
      status: 'Pregnant', 
      progress, 
      stage: trimester, 
      label: `SSW ${currentWeek} (${completedWeeks}+${currentDays})` 
  };
};

// --- COMPONENTS ---
const HeaderSoft = ({ statusData, mode, babyName }) => {
  const isLoss = mode === 'loss';
  let title = statusData.status === 'NotSet' ? 'Willkommen' : statusData.label;
  if (isLoss) title = 'Für euch';
  if (mode === 'postpartum') title = `${statusData.week} Wochen`;

  return (
    <div className="pt-10 pb-6 px-4 flex justify-between items-start">
        <div>
            <p className="text-stone-400 text-sm font-medium mb-1 tracking-wide uppercase">
                {isLoss ? 'Begleiter' : 'SuperDad Dashboard'}
            </p>
            <h1 className="text-4xl font-bold text-stone-800 leading-tight">
                {title}
            </h1>
            {babyName && <p className="text-stone-500 font-medium mt-1">für {babyName}</p>}
        </div>
        <div className="bg-white p-3 rounded-full border border-stone-100 shadow-sm text-stone-800">
            {mode === 'loss' ? <Star size={24} /> : (mode === 'postpartum' ? <Baby size={24} /> : <Activity size={24} />)}
        </div>
    </div>
  );
};

const ProgressCardSoft = ({ statusData, mode, openDetail }) => {
    let sizeInfo = null;
    let imageUrl = null;
    let bgColor = "bg-[#F2F0E9]"; 
    const [imgError, setImgError] = useState(false);
    useEffect(() => { setImgError(false); }, [statusData.week]);

    if (mode === 'loss') {
        bgColor = "bg-[#E5E5E0]"; 
        return (
            <div className={`${bgColor} rounded-[32px] p-8 relative overflow-hidden mb-4 shadow-sm border border-white/50`}>
                 <div className="z-10 relative">
                    <p className="text-stone-500 font-medium mb-2">Gedanke des Tages</p>
                    <p className="text-xl font-bold text-stone-700 italic">"Trauer ist Liebe, die keinen Ort hat."</p>
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/40 rounded-full blur-2xl"></div>
            </div>
        );
    }

    if (mode === 'pregnancy' && statusData.week) {
        const weekContent = PREGNANCY_WEEKS[statusData.week] || {};
        sizeInfo = weekContent.size ? `So groß wie ${weekContent.size}` : null;
        imageUrl = weekContent.image; 
    }

    if (mode === 'postpartum') {
        bgColor = "bg-[#EEF2FF]"; 
        imageUrl = null; // Can add baby icon later
    } else {
        bgColor = "bg-[#F0FDF4]"; 
    }

    return (
        <div 
            onClick={openDetail} 
            className={`${bgColor} rounded-[32px] p-6 relative overflow-hidden mb-4 shadow-sm border border-white/50 cursor-pointer hover:shadow-md transition active:scale-[0.98]`}
        >
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                    {imageUrl && !imgError ? (
                        <img 
                            src={imageUrl} 
                            alt={sizeInfo} 
                            onError={() => setImgError(true)}
                            className="w-20 h-20 object-contain drop-shadow-lg transform -rotate-6" 
                        />
                    ) : (
                        <div className="bg-white/50 w-16 h-16 rounded-full flex items-center justify-center">
                            {mode === 'postpartum' ? <Baby size={32} className="text-indigo-600"/> : <Sprout size={32} className="text-emerald-600" />}
                        </div>
                    )}

                    <div className="text-right">
                        <p className="text-stone-500 font-medium uppercase tracking-wider text-[10px] bg-white/40 px-2 py-1 rounded-lg inline-block backdrop-blur-sm">
                            Aktueller Status
                        </p>
                    </div>
                </div>

                <div className="mt-2">
                    {sizeInfo ? (
                        <>
                            <div className="text-2xl font-bold text-stone-800 leading-tight mb-1">{sizeInfo}</div>
                            <div className="text-sm text-stone-500 font-medium">{Math.round(statusData.progress)}% geladen</div>
                        </>
                    ) : (
                        <div className="text-5xl font-bold text-stone-800 mb-1">{statusData.days}<span className="text-lg text-stone-400 font-normal ml-2">Tage</span></div>
                    )}
                </div>
            </div>
            
            <div className="absolute bottom-4 right-4 bg-white/50 p-1.5 rounded-full">
                <ArrowUpRight size={16} className="text-stone-400" />
            </div>

            <div className="absolute -top-10 -left-10 w-32 h-32 bg-white rounded-full opacity-60 blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full opacity-60 blur-2xl"></div>
        </div>
    );
};

const HabitGridSoft = ({ habits, toggleHabit, mode, openOasis }) => {
    let habitConfig;
    if (mode === 'loss') habitConfig = HABITS_LOSS;
    else if (mode === 'postpartum') habitConfig = HABITS_POSTPARTUM;
    else habitConfig = HABITS_PREGNANCY;

    const getColorClasses = (color, isActive) => {
        if (!isActive) return "bg-white border-stone-100 text-stone-400";
        const maps = {
            blue: "bg-[#E0F2FE] border-sky-100 text-sky-800",
            teal: "bg-[#CCFBF1] border-teal-100 text-teal-800",
            amber: "bg-[#FEF3C7] border-amber-100 text-amber-800",
            orange: "bg-[#FFEDD5] border-orange-100 text-orange-800",
            indigo: "bg-[#E0E7FF] border-indigo-100 text-indigo-800",
            rose: "bg-[#FFE4E6] border-rose-100 text-rose-800",
            stone: "bg-[#E7E5E4] border-stone-200 text-stone-800",
            zinc: "bg-[#E4E4E7] border-zinc-200 text-zinc-800"
        };
        return maps[color] || maps.stone;
    };

    return (
        <div className="grid grid-cols-2 gap-4 mb-4">
            {habitConfig.map((habit) => {
                const isActive = habits[habit.key];
                const classes = getColorClasses(habit.color, isActive);
                
                const handleClick = () => {
                    if (habit.key === 'oasis') openOasis();
                    else toggleHabit(habit.key);
                };

                return (
                    <div key={habit.key} onClick={handleClick} className={`${classes} p-6 rounded-[32px] flex flex-col justify-between h-40 transition-all duration-300 cursor-pointer border shadow-sm hover:shadow-md relative overflow-hidden`}>
                        <div className="z-10 flex justify-between items-start">
                            <div className={`p-3 rounded-full ${isActive ? 'bg-white/60' : 'bg-stone-50'} backdrop-blur-sm`}>
                                <habit.icon size={20} className={isActive ? 'text-current' : 'text-stone-300'} />
                            </div>
                            {isActive && <CheckCircle size={20} className="opacity-50" />}
                        </div>
                        <div className="z-10">
                            <h3 className={`font-bold text-lg leading-tight mb-1 ${isActive ? '' : 'text-stone-600'}`}>{habit.title}</h3>
                            <p className={`text-xs ${isActive ? 'opacity-80' : 'text-stone-400'}`}>{habit.text}</p>
                        </div>
                        {isActive && <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -mr-8 -mt-8 blur-xl"></div>}
                    </div>
                );
            })}
        </div>
    );
};

// ... (DeepTalkSoft, ToolGridSoft, TodoWidgetSoft, EmergencyOverlay, HospitalBagOverlay, AIVibeCheck, ModeSelection, DueDateSetup, OasisOverlay, ProgressDetailOverlay)
// Included fully below to ensure copy-paste works

const DeepTalkSoft = ({ mode, statusData }) => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuestion = useCallback(async () => {
    setLoading(true);
    const context = mode === 'loss' 
      ? "Paar nach stiller Geburt. Fokus: Trost, Erinnerung." 
      : (mode === 'postpartum' 
          ? `Eltern, Baby ${statusData.week} Wochen. Fokus: Wünsche, Ängste.` 
          : `Werdende Eltern, SSW ${statusData.week}. Fokus: Werte, Erziehung.`);

    const prompt = `Eine kurze, tiefe Frage für ein Paar (${context}). Nur die Frage.`;
    const result = await callGemini(prompt);
    setQuestion(result);
    setLoading(false);
  }, [mode, statusData.week]);

  useEffect(() => { if (!question) fetchQuestion(); }, [fetchQuestion, question]);

  const bgClass = mode === 'loss' ? 'bg-[#D6D3D1] text-stone-800' : 'bg-[#DDD6FE] text-violet-900'; 

  return (
    <div className={`${bgClass} p-6 rounded-[32px] mb-4 shadow-sm relative overflow-hidden group`}>
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/30 rounded-full blur-3xl"></div>
        <div className="flex items-center justify-between mb-3 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider opacity-60">Deep Talk</span>
            <button onClick={fetchQuestion} disabled={loading} className="bg-white/40 p-2 rounded-full hover:bg-white/60 transition">
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>
        </div>
        <h3 className="text-xl font-bold leading-snug mb-2 relative z-10 font-serif">
            "{loading ? "..." : (question || "Lade...")}"
        </h3>
    </div>
  );
};

const ToolGridSoft = ({ mode, openBag, openEmergency, bagItems }) => {
    return (
        <div className="grid grid-cols-2 gap-4 mb-4">
            {mode === 'pregnancy' && (
                <div onClick={openBag} className="bg-[#FFEDD5] p-6 rounded-[32px] cursor-pointer relative overflow-hidden transition hover:shadow-md border border-orange-100/50">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/30 rounded-full -mr-6 -mt-6 blur-xl"></div>
                    <div className="mb-8 bg-white/60 w-10 h-10 flex items-center justify-center rounded-full text-orange-600"><Backpack size={20} /></div>
                    <h3 className="font-bold text-orange-900">Klinik-<br/>tasche</h3>
                    <p className="text-xs text-orange-700 mt-1">{bagItems.length} Items</p>
                </div>
            )}
            {(mode === 'pregnancy' || mode === 'postpartum') && (
                <div onClick={openEmergency} className="bg-[#FEE2E2] p-6 rounded-[32px] cursor-pointer relative overflow-hidden transition hover:shadow-md border border-red-100/50">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/30 rounded-full -mr-6 -mt-6 blur-xl"></div>
                    <div className="mb-8 bg-white/60 w-10 h-10 flex items-center justify-center rounded-full text-red-600"><AlertTriangle size={20} /></div>
                    <h3 className="font-bold text-red-900">Notfall<br/>Infos</h3>
                    <p className="text-xs text-red-700 mt-1">Bereit?</p>
                </div>
            )}
        </div>
    );
};

const TodoWidgetSoft = ({ statusData, tasks, toggleTask, mode }) => {
    const stage = (mode === 'loss') ? 0 : (mode === 'postpartum' ? 0 : statusData.stage);
    const defaultTasks = useMemo(() => getTasks(mode, stage), [mode, stage]);
    if (!defaultTasks.length) return null;

    const currentTasks = defaultTasks.map(t => {
        const saved = tasks.find(st => st.id === t.id);
        return { ...t, completed: saved ? saved.completed : false };
    });
    const done = currentTasks.filter(t => t.completed).length;

    return (
        <div className="bg-white p-6 rounded-[32px] border border-stone-100 shadow-sm mb-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-stone-800 text-lg">Checkliste</h3>
                <span className="text-xs bg-stone-100 text-stone-500 px-2 py-1 rounded-full font-medium">{done}/{currentTasks.length}</span>
            </div>
            <div className="space-y-2">
                {currentTasks.map(task => (
                    <div key={task.id} onClick={() => toggleTask(task.id, task.completed)} className={`flex items-center p-3 rounded-2xl cursor-pointer transition-all ${task.completed ? 'bg-stone-50 text-stone-400' : 'hover:bg-stone-50 text-stone-700'}`}>
                        <div className={`mr-3 ${task.completed ? 'text-emerald-500' : 'text-stone-300'}`}>{task.completed ? <CheckCircle size={22} className="fill-emerald-100" /> : <Circle size={22} />}</div>
                        <span className={`text-sm font-medium ${task.completed ? 'line-through' : ''}`}>{task.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const EmergencyOverlay = ({ contacts, updateContact, closeEmergency }) => {
    const [editMode, setEditMode] = useState(false);
    const [localContacts, setLocalContacts] = useState(contacts);
    const handleSave = () => { updateContact(localContacts); setEditMode(false); };
    const handleChange = (field, value) => { setLocalContacts({ ...localContacts, [field]: value }); };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm pointer-events-auto animate-in fade-in duration-300" onClick={closeEmergency}></div>
            <div className="bg-[#F5F5F0] w-full max-w-md h-[85vh] sm:h-[auto] rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden flex flex-col pointer-events-auto animate-in slide-in-from-bottom duration-300 relative">
                <div className="bg-white p-6 pb-4 border-b border-stone-100 flex justify-between items-center sticky top-0 z-10">
                    <div><h2 className="text-2xl font-bold text-stone-800">Notfall-Infos</h2><p className="text-stone-500 text-xs">Alles griffbereit wenn's losgeht.</p></div>
                    <button onClick={closeEmergency} className="bg-stone-100 p-2 rounded-full hover:bg-stone-200 transition"><X size={20} className="text-stone-600" /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className="flex justify-end"><button onClick={editMode ? handleSave : () => setEditMode(true)} className={`px-4 py-2 rounded-xl text-xs font-bold transition ${editMode ? 'bg-stone-800 text-white' : 'bg-stone-200 text-stone-600'}`}>{editMode ? 'Speichern' : 'Bearbeiten'}</button></div>
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100">
                        <div className="flex items-center mb-4"><MapPin size={18} className="text-rose-500 mr-2" /><h3 className="font-bold text-stone-700">Die Klinik</h3></div>
                        {editMode ? ( <div className="space-y-3"><input placeholder="Name der Klinik" className="w-full bg-stone-50 p-3 rounded-xl text-sm" value={localContacts.clinicName || ''} onChange={(e) => handleChange('clinicName', e.target.value)} /><input placeholder="Adresse für Navi" className="w-full bg-stone-50 p-3 rounded-xl text-sm" value={localContacts.clinicAddress || ''} onChange={(e) => handleChange('clinicAddress', e.target.value)} /></div> ) : ( <div><p className="font-bold text-lg text-stone-800">{localContacts.clinicName || 'Klinik noch nicht eingetragen'}</p><p className="text-sm text-stone-500 mb-4">{localContacts.clinicAddress || 'Adresse fehlt'}</p>{localContacts.clinicAddress && (<a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(localContacts.clinicAddress)}`} target="_blank" rel="noreferrer" className="flex items-center justify-center w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-sm shadow-md hover:bg-blue-700 transition"><Navigation size={16} className="mr-2" />Navigation starten</a>)}</div> )}
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider ml-1">Wichtige Nummern</h3>
                        {[{id: 'midwife', icon: Phone, label: 'Hebamme', color: 'emerald'}, {id: 'doctor', icon: Activity, label: 'Kreißsaal / Arzt', color: 'indigo'}, {id: 'taxi', icon: Phone, label: 'Taxi / Support', color: 'amber'}].map(contact => (
                            <div key={contact.id} className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex items-center justify-between">
                                <div className="flex items-center"><div className={`bg-${contact.color}-100 p-2 rounded-full mr-3 text-${contact.color}-600`}><contact.icon size={18} /></div><div><p className="text-xs text-stone-400 font-bold uppercase">{contact.label}</p>{editMode ? ( <div className="flex flex-col space-y-1 mt-1"><input placeholder="Name" className="bg-stone-50 p-1.5 rounded-lg text-sm w-32" value={localContacts[`${contact.id}Name`] || ''} onChange={(e) => handleChange(`${contact.id}Name`, e.target.value)} /><input placeholder="Tel-Nr." className="bg-stone-50 p-1.5 rounded-lg text-sm w-32" value={localContacts[`${contact.id}Phone`] || ''} onChange={(e) => handleChange(`${contact.id}Phone`, e.target.value)} /></div> ) : ( <p className="font-bold text-stone-700">{localContacts[`${contact.id}Name`] || '---'}</p> )}</div></div>
                                {!editMode && localContacts[`${contact.id}Phone`] && (<a href={`tel:${localContacts[`${contact.id}Phone`]}`} className="bg-green-500 text-white p-3 rounded-full shadow-md hover:bg-green-600 transition"><Phone size={20} /></a>)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const HospitalBagOverlay = ({ bagItems, toggleItem, closeBag }) => {
    const categories = Object.keys(HOSPITAL_BAG_CONTENT);
    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm pointer-events-auto animate-in fade-in duration-300" onClick={closeBag}></div>
            <div className="bg-[#F5F5F0] w-full max-w-md h-[90vh] sm:h-[80vh] rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden flex flex-col pointer-events-auto animate-in slide-in-from-bottom duration-300 relative">
                <div className="bg-white p-6 pb-4 border-b border-stone-100 flex justify-between items-center sticky top-0 z-10">
                    <div><h2 className="text-2xl font-bold text-stone-800">Die Tasche</h2><p className="text-stone-500 text-xs">Alles dabei für Tag X?</p></div>
                    <button onClick={closeBag} className="bg-stone-100 p-2 rounded-full hover:bg-stone-200 transition"><X size={20} className="text-stone-600" /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {categories.map(catKey => {
                        const category = HOSPITAL_BAG_CONTENT[catKey];
                        return (
                            <div key={catKey}>
                                <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-3 ml-1">{category.title}</h3>
                                <div className="space-y-2">
                                    {category.items.map(item => {
                                        const isChecked = bagItems.includes(item.id);
                                        return (
                                            <div key={item.id} onClick={() => toggleItem(item.id)} className={`flex items-center p-4 rounded-2xl cursor-pointer transition-all border ${isChecked ? 'bg-amber-50 border-amber-100' : 'bg-white border-transparent hover:border-stone-200 shadow-sm'}`}>
                                                <div className={`mr-4 transition-all ${isChecked ? 'text-amber-500 scale-110' : 'text-stone-300'}`}>{isChecked ? <CheckSquare size={24} className="fill-current" /> : <div className="w-6 h-6 border-2 border-stone-300 rounded-md"></div>}</div>
                                                <span className={`text-sm font-medium transition-colors ${isChecked ? 'text-stone-400 line-through' : 'text-stone-700'}`}>{item.text}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                    <div className="h-12"></div>
                </div>
            </div>
        </div>
    );
};

const ProgressDetailOverlay = ({ statusData, mode, closeDetail }) => {
    if (!statusData || !statusData.week) return null;
    const weekContent = PREGNANCY_WEEKS[statusData.week] || {};
    const [imgError, setImgError] = useState(false);
    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm pointer-events-auto animate-in fade-in duration-300" onClick={closeDetail}></div>
            <div className="bg-[#FDFCF8] w-full max-w-md h-[85vh] sm:h-[auto] rounded-t-[40px] sm:rounded-[40px] shadow-2xl overflow-hidden flex flex-col pointer-events-auto animate-in slide-in-from-bottom duration-300 relative">
                <button onClick={closeDetail} className="absolute top-6 right-6 bg-white p-2 rounded-full hover:bg-stone-100 shadow-sm z-20"><X size={20} className="text-stone-600" /></button>
                <div className="flex-1 overflow-y-auto pb-8">
                    <div className="bg-[#F0FDF4] pt-16 pb-10 px-6 flex flex-col items-center text-center relative overflow-hidden">
                         <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl"></div><div className="absolute bottom-0 right-0 w-40 h-40 bg-emerald-200/20 rounded-full blur-3xl"></div>
                         <div className="relative z-10">{weekContent.image && !imgError ? (<img src={weekContent.image} alt={weekContent.size} onError={() => setImgError(true)} className="w-48 h-48 object-contain drop-shadow-2xl transform hover:scale-105 transition duration-500" />) : (<div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-lg"><Sprout size={64} className="text-emerald-500" /></div>)}</div>
                         <h2 className="text-3xl font-bold text-stone-800 mt-6">{weekContent.size ? `So groß wie ${weekContent.size}` : `Woche ${statusData.week}`}</h2><p className="text-emerald-700 font-medium mt-1">{statusData.label}</p>
                    </div>
                    <div className="px-6 -mt-6 relative z-10"><div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex justify-around"><div className="text-center"><p className="text-xs text-stone-400 font-bold uppercase tracking-wider mb-1">Größe (ca.)</p><div className="flex items-center justify-center text-stone-800 font-bold text-lg"><Ruler size={18} className="text-emerald-500 mr-1.5" />{weekContent.cm || '--'} cm</div></div><div className="w-px bg-stone-100"></div><div className="text-center"><p className="text-xs text-stone-400 font-bold uppercase tracking-wider mb-1">Gewicht (ca.)</p><div className="flex items-center justify-center text-stone-800 font-bold text-lg"><Weight size={18} className="text-emerald-500 mr-1.5" />{weekContent.g || '--'} g</div></div></div></div>
                    <div className="px-6 mt-6 space-y-6"><div><div className="flex items-center space-x-2 mb-2"><Heart size={18} className="text-rose-500 fill-rose-500" /><h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider">Ihr Befinden</h3></div><p className="text-xl font-bold text-stone-800 leading-snug">"{weekContent.feeling}"</p></div><div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100"><div className="flex items-center space-x-2 mb-2"><Sparkles size={18} className="text-indigo-500" /><h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Dein Pro-Tipp</h3></div><p className="text-stone-700 font-medium">{weekContent.tip}</p></div></div>
                </div>
            </div>
        </div>
    );
};

const OasisOverlay = ({ mission, closeOasis, markDone, isDone }) => {
    if (!mission) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm pointer-events-auto animate-in fade-in duration-300" onClick={closeOasis}></div>
            <div className="bg-[#FDFCF8] w-full max-w-md p-6 rounded-t-[40px] sm:rounded-[40px] shadow-2xl flex flex-col pointer-events-auto animate-in slide-in-from-bottom duration-300 relative">
                <div className="flex justify-between items-start mb-6"><div className="bg-amber-100 p-3 rounded-2xl text-amber-600"><Sparkles size={28} /></div><button onClick={closeOasis} className="bg-stone-100 p-2 rounded-full hover:bg-stone-200 transition"><X size={20} className="text-stone-600" /></button></div>
                <h3 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">Deine Oase heute</h3><h2 className="text-2xl font-bold text-stone-800 mb-4">{mission.title}</h2><p className="text-stone-600 text-lg leading-relaxed mb-8 font-serif">{mission.text}</p>
                <button onClick={markDone} disabled={isDone} className={`w-full py-4 rounded-2xl font-bold text-white transition flex items-center justify-center ${isDone ? 'bg-green-500' : 'bg-stone-900 hover:bg-stone-800'}`}>{isDone ? (<><CheckCircle size={20} className="mr-2" /> Erledigt</>) : ("Mission annehmen")}</button>
            </div>
        </div>
    );
};

const AIVibeCheck = ({ vibeCheck, saveVibeCheck, mode }) => {
    const [vibeInput, setVibeInput] = useState(vibeCheck || '');
    const [aiAdvice, setAiAdvice] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => { setVibeInput(vibeCheck || ''); }, [vibeCheck]);
    const handleAnalyze = async () => {
        if (!vibeInput) return;
        saveVibeCheck(vibeInput);
        setLoading(true);
        const prompt = `Du bist ein empathischer, bodenständiger Coach für Väter. Der Vater befindet sich in der Phase: ${mode === 'loss' ? 'Verlust/Trauer nach stiller Geburt' : (mode === 'postpartum' ? 'Wochenbett/Neugeborenes' : 'Schwangerschaft')}. Er hat gerade folgendes als seinen Status eingegeben: "${vibeInput}". Gib ihm eine sehr kurze, unterstützende Antwort (max. 2 Sätze) auf Deutsch. Sei wie ein guter Freund: verständnisvoll aber stärkend.`;
        const result = await callGemini(prompt);
        setAiAdvice(result);
        setLoading(false);
    };
    const bgClass = mode === 'loss' ? 'bg-[#E5E5E0]' : 'bg-[#E0E7FF]';
    const textClass = mode === 'loss' ? 'text-stone-900' : 'text-indigo-900';
    const iconColor = mode === 'loss' ? 'text-stone-500' : 'text-indigo-500';
    return (
      <div className={`${bgClass} p-6 rounded-[32px] mt-4 mb-24 transition-all duration-500`}>
          <div className="flex items-center mb-4"><div className="bg-white p-2 rounded-full mr-3 shadow-sm"><Battery size={20} className={iconColor} /></div><h3 className={`font-bold ${textClass}`}>Dein Status</h3></div>
          <div className="relative mb-4"><input type="text" value={vibeInput} onChange={(e) => setVibeInput(e.target.value)} placeholder="Wie geht's dir heute?" className={`w-full bg-white/60 border-0 rounded-2xl p-4 placeholder-opacity-50 focus:outline-none font-medium ${textClass}`} /><button onClick={handleAnalyze} disabled={loading || !vibeInput} className={`absolute right-2 top-2 p-2 rounded-xl transition text-white ${mode === 'loss' ? 'bg-stone-500 hover:bg-stone-600' : 'bg-indigo-500 hover:bg-indigo-600'}`}>{loading ? <RefreshCw size={16} className="animate-spin" /> : <Wand2 size={16} />}</button></div>
          {aiAdvice && (<div className="bg-white/80 p-4 rounded-2xl animate-in fade-in slide-in-from-top-2"><div className="flex items-start space-x-3"><div className="mt-1"><Sparkles size={16} className={mode === 'loss' ? 'text-stone-400' : 'text-indigo-400'} /></div><div><p className={`text-sm font-medium ${mode === 'loss' ? 'text-stone-700' : 'text-indigo-800'}`}>{aiAdvice}</p></div></div></div>)}
      </div>
    );
};

const ModeSelection = ({ setMode }) => {
    return (
        <div className="p-6 pt-12 animate-in fade-in zoom-in duration-500">
            <h1 className="text-3xl font-bold text-stone-800 mb-2">Willkommen, Dad.</h1>
            <p className="text-stone-500 mb-8">Jede Reise ist anders. Wo steht ihr gerade?</p>
            <div className="space-y-4">
                <button onClick={() => setMode('pregnancy')} className="w-full bg-white p-5 rounded-[24px] border border-stone-100 shadow-sm hover:shadow-md transition flex items-center text-left group"><div className="bg-emerald-100 p-3 rounded-full mr-4 group-hover:bg-emerald-200 transition"><Baby size={24} className="text-emerald-600" /></div><div><h3 className="font-bold text-stone-800">Wir sind schwanger</h3><p className="text-xs text-stone-500">Begleitung durch die Schwangerschaft</p></div><ChevronRight className="ml-auto text-stone-300" /></button>
                <button onClick={() => setMode('postpartum')} className="w-full bg-white p-5 rounded-[24px] border border-stone-100 shadow-sm hover:shadow-md transition flex items-center text-left group"><div className="bg-indigo-100 p-3 rounded-full mr-4 group-hover:bg-indigo-200 transition"><User size={24} className="text-indigo-600" /></div><div><h3 className="font-bold text-stone-800">Das Baby ist da</h3><p className="text-xs text-stone-500">Support im Wochenbett & Alltag</p></div><ChevronRight className="ml-auto text-stone-300" /></button>
                <button onClick={() => setMode('loss')} className="w-full bg-white p-5 rounded-[24px] border border-stone-100 shadow-sm hover:shadow-md transition flex items-center text-left group"><div className="bg-stone-100 p-3 rounded-full mr-4 group-hover:bg-stone-200 transition"><Star size={24} className="text-stone-500" /></div><div><h3 className="font-bold text-stone-800">Stille Geburt / Verlust</h3><p className="text-xs text-stone-500">Support nach Fehl- oder Totgeburt</p></div><ChevronRight className="ml-auto text-stone-300" /></button>
            </div>
        </div>
    );
};

const DueDateSetup = ({ saveProfile, mode }) => {
    const [localDate, setLocalDate] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('surprise'); 
    const handleSave = () => { saveProfile({ dueDate: localDate, babyName: name, gender: gender }); };
    const isPostpartum = mode === 'postpartum';
    const labelDate = isPostpartum ? 'Geburtstag*' : 'Geburtstermin*';
    const title = isPostpartum ? 'Willkommen, Baby!' : 'Dein Start';
    const sub = isPostpartum ? 'Wann kam der kleine Schatz?' : 'Verrate uns ein paar Details.';
    return (
        <div className="bg-white p-8 rounded-[32px] border border-stone-100 shadow-lg text-center mt-6 animate-in fade-in slide-in-from-bottom-8">
            <div className="bg-stone-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><Baby size={28} className="text-stone-600" /></div>
            <h2 className="text-xl font-bold text-stone-800 mb-2">{title}</h2><p className="text-stone-500 mb-6 text-sm">{sub}</p>
            <div className="mb-4 text-left"><label className="text-xs font-bold text-stone-400 uppercase ml-2">{labelDate}</label><input type="date" value={localDate} onChange={(e) => setLocalDate(e.target.value)} className="w-full p-4 mt-1 bg-stone-50 rounded-2xl text-center font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-200" /></div>
            <div className="mb-4 text-left"><label className="text-xs font-bold text-stone-400 uppercase ml-2">Name (Optional)</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="z.B. Krümel" className="w-full p-4 mt-1 bg-stone-50 rounded-2xl font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-200" /></div>
            <div className="mb-8 text-left"><label className="text-xs font-bold text-stone-400 uppercase ml-2">Geschlecht</label><div className="flex gap-2 mt-1"><button onClick={() => setGender('boy')} className={`flex-1 py-3 rounded-xl text-sm font-bold transition ${gender === 'boy' ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-300' : 'bg-stone-50 text-stone-400'}`}>Junge</button><button onClick={() => setGender('girl')} className={`flex-1 py-3 rounded-xl text-sm font-bold transition ${gender === 'girl' ? 'bg-rose-100 text-rose-600 ring-2 ring-rose-300' : 'bg-stone-50 text-stone-400'}`}>Mädchen</button><button onClick={() => setGender('surprise')} className={`flex-1 py-3 rounded-xl text-sm font-bold transition ${gender === 'surprise' ? 'bg-amber-100 text-amber-600 ring-2 ring-amber-300' : 'bg-stone-50 text-stone-400'}`}>?</button></div></div>
            <button onClick={handleSave} disabled={!localDate} className="w-full py-4 bg-stone-900 text-white font-bold rounded-2xl hover:bg-stone-800 transition disabled:opacity-50 shadow-xl shadow-stone-200">Coach Starten</button>
        </div>
    );
};

// --- MAIN APP ---

const App = () => {
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [mode, setMode] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [babyName, setBabyName] = useState('');
  const [gender, setGender] = useState('surprise');
  const [tasks, setTasks] = useState([]);
  const [bagItems, setBagItems] = useState([]);
  const [contacts, setContacts] = useState({});
  const [vibeCheck, setVibeCheck] = useState('');
  const [habits, setHabits] = useState({ hydration: false, oasis: false, shield: false, nightshift: false, date: '' });
  const [showBag, setShowBag] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [showDetail, setShowDetail] = useState(false); 
  const [showOasis, setShowOasis] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (Object.keys(firebaseConfig).length === 0 || !firebaseConfig.apiKey) throw new Error("Firebase config missing or incomplete");
        const app = initializeApp(firebaseConfig);
        setDb(getFirestore(app));
        const firebaseAuth = getAuth(app);
        setAuth(firebaseAuth);
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => { if (user) { setUserId(user.uid); setIsAuthReady(true); } });
        if (!firebaseAuth.currentUser) {
            try {
                if (initialAuthToken) await signInWithCustomToken(firebaseAuth, initialAuthToken);
                else throw new Error("No initial token");
            } catch (authErr) {
                console.warn("Custom token auth failed, falling back to anonymous auth:", authErr);
                await signInAnonymously(firebaseAuth);
            }
        }
        return () => unsubscribe();
      } catch (e) { console.error("Initialization Error:", e); setError(e.message); setLoading(false); }
    };
    initAuth();
  }, []);

  const profileDocRef = useMemo(() => {
    if (db && userId) return doc(db, `artifacts/${appId}/users/${userId}/dad_support_data`, 'user_profile');
    return null;
  }, [db, userId]);

  useEffect(() => {
    if (!isAuthReady || !profileDocRef) return;
    const unsubscribe = onSnapshot(profileDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setMode(data.mode || null);
        setDueDate(data.dueDate || null);
        setBabyName(data.babyName || '');
        setGender(data.gender || 'surprise');
        setTasks(data.tasks || []);
        setBagItems(data.bagItems || []);
        setContacts(data.contacts || {});
        setVibeCheck(data.vibeCheck || '');
        const todayStr = new Date().toISOString().split('T')[0];
        const savedHabits = data.habits || { hydration: false, oasis: false, shield: false, nightshift: false, date: todayStr };
        if (savedHabits.date !== todayStr) setHabits({ hydration: false, oasis: false, shield: false, nightshift: false, date: todayStr });
        else setHabits(savedHabits);
      }
      setLoading(false);
    }, (e) => { console.error("Firestore Error:", e); setError(e.message); setLoading(false); });
    return () => unsubscribe();
  }, [isAuthReady, profileDocRef]);

  const statusData = useMemo(() => calculateStatus(dueDate, mode), [dueDate, mode]);
  const saveMode = async (m) => { setMode(m); if(profileDocRef) await setDoc(profileDocRef, { mode: m }, { merge: true }); };
  const saveProfile = async (d) => { setDueDate(d.dueDate); setBabyName(d.babyName); setGender(d.gender); if(profileDocRef) await setDoc(profileDocRef, d, { merge: true }); };
  const saveVibeCheck = async (v) => { setVibeCheck(v); if(profileDocRef) await setDoc(profileDocRef, { vibeCheck: v }, { merge: true }); };
  const toggleTask = async (id, status) => { 
      const idx = tasks.findIndex(t => t.id === id);
      let newTasks;
      if (idx !== -1) newTasks = tasks.map((t, i) => i === idx ? { ...t, completed: !status } : t);
      else newTasks = [...tasks, { id, completed: !status }];
      setTasks(newTasks);
      if(profileDocRef) await setDoc(profileDocRef, { tasks: newTasks }, { merge: true });
  };
  const toggleBagItem = async (id) => {
      let newItems = bagItems.includes(id) ? bagItems.filter(i => i !== id) : [...bagItems, id];
      setBagItems(newItems);
      if(profileDocRef) await setDoc(profileDocRef, { bagItems: newItems }, { merge: true });
  };
  const updateContact = async (c) => { setContacts(c); if(profileDocRef) await setDoc(profileDocRef, { contacts: c }, { merge: true }); };
  const toggleHabit = async (key) => {
      const todayStr = new Date().toISOString().split('T')[0];
      const newHabits = { ...habits, [key]: !habits[key], date: todayStr };
      setHabits(newHabits);
      if(profileDocRef) await setDoc(profileDocRef, { habits: newHabits }, { merge: true });
  };
  const resetProfile = async () => {
      if(profileDocRef) await setDoc(profileDocRef, { mode: null, dueDate: null, babyName: '', gender: 'surprise', tasks: [], bagItems: [], contacts: {}, habits: { hydration: false, oasis: false, shield: false, nightshift: false, date: '' } }, { merge: true });
      setMode(null); setDueDate(null);
  };
  const currentOasis = useMemo(() => { if (!mode) return null; return getDailyOasis(mode, statusData.week); }, [mode, statusData.week]);
  const markOasisDone = async () => { await toggleHabit('oasis'); setTimeout(() => setShowOasis(false), 500); };

  if (error) { return (<div className="flex h-screen flex-col items-center justify-center bg-red-50 p-6 text-center"><AlertTriangle className="text-red-500 w-12 h-12 mb-4" /><h2 className="text-lg font-bold text-red-900 mb-2">Verbindungsproblem</h2><p className="text-red-700 text-sm mb-4">{error}</p><p className="text-xs text-red-500">Tipp: Hast du in Firebase "Anonyme Anmeldung" aktiviert?</p></div>); }
  if (loading || !isAuthReady) return <div className="flex h-screen items-center justify-center bg-[#F5F5F0] text-stone-400">Lade SuperDad...</div>;

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans text-stone-800 pb-safe selection:bg-stone-200 flex flex-col">
      <div className="max-w-md mx-auto w-full relative flex-grow pb-24">
        {!mode && <ModeSelection setMode={saveMode} />}
        {(mode === 'pregnancy' || mode === 'postpartum') && !dueDate && <DueDateSetup saveProfile={saveProfile} mode={mode} />}
        {(( (mode === 'pregnancy' || mode === 'postpartum') && dueDate) || mode === 'loss') && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <HeaderSoft statusData={statusData} mode={mode} babyName={babyName} />
                <div className="px-4">
                    <ProgressCardSoft statusData={statusData} mode={mode} openDetail={() => setShowDetail(true)} />
                    <HabitGridSoft habits={habits} toggleHabit={toggleHabit} mode={mode} openOasis={() => setShowOasis(true)} />
                    <ToolGridSoft mode={mode} openBag={() => setShowBag(true)} openEmergency={() => setShowEmergency(true)} bagItems={bagItems} />
                    <DeepTalkSoft mode={mode} statusData={statusData} />
                    <TodoWidgetSoft statusData={statusData} tasks={tasks} toggleTask={toggleTask} mode={mode} />
                    <AIVibeCheck vibeCheck={vibeCheck} saveVibeCheck={saveVibeCheck} mode={mode} />
                </div>
            </div>
        )}
        {mode && (<div className="py-6 text-center"><button onClick={resetProfile} className="text-[10px] text-red-300 uppercase tracking-widest font-semibold hover:text-red-500 flex items-center justify-center mx-auto transition-colors"><Trash2 size={12} className="mr-1" />Debug: App zurücksetzen</button></div>)}
      </div>
      <div className="fixed bottom-6 left-0 right-0 px-6 max-w-md mx-auto z-40 pointer-events-none"><div className="bg-white/90 backdrop-blur-md border border-stone-200 shadow-xl rounded-full p-2 flex justify-between items-center pointer-events-auto"><button className="p-3 text-stone-800 bg-stone-100 rounded-full"><Home size={20} /></button><button className="p-3 text-stone-400 hover:text-stone-600"><LayoutGrid size={20} /></button><button className="p-3 text-stone-400 hover:text-stone-600"><BookOpen size={20} /></button><button onClick={resetProfile} className="p-3 text-stone-400 hover:text-red-500"><Trash2 size={20} /></button></div></div>
      {showDetail && <ProgressDetailOverlay statusData={statusData} mode={mode} closeDetail={() => setShowDetail(false)} />}
      {showBag && <HospitalBagOverlay bagItems={bagItems} toggleItem={toggleBagItem} closeBag={() => setShowBag(false)} />}
      {showEmergency && <EmergencyOverlay contacts={contacts} updateContact={updateContact} closeEmergency={() => setShowEmergency(false)} />}
      {showOasis && (<OasisOverlay mission={currentOasis} closeOasis={() => setShowOasis(false)} markDone={markOasisDone} isDone={habits.oasis} />)}
    </div>
  );
};

export default App;