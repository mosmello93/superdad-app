import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { Heart, Calendar, CheckCircle, Circle, MessageCircle, Activity, ChevronRight, ShieldCheck, Droplets, Sparkles, Cookie, ArrowUpRight, Battery, MessageSquare, Baby, Star, CloudRain, Feather, HelpCircle, BookOpen, User, Moon, Utensils, RefreshCw, Wand2, Trash2, Backpack, X, CheckSquare, Phone, MapPin, AlertTriangle, Navigation, Scale, Ruler, Weight } from 'lucide-react';

// Global variables provided by the Canvas environment
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// *****************************************************************
// FIREBASE CONFIGURATION
// *****************************************************************

/* !!! WICHTIG FÜR GITHUB / LOKALE ENTWICKLUNG !!!
   
   Wenn du diesen Code lokal in deinem Projekt verwendest:
   1. Erstelle eine .env Datei mit deinen Keys.
   2. LÖSCHE den Block "KONFIGURATION FÜR VORSCHAU".
   3. ENT-KOMMENTIERE den Block "KONFIGURATION FÜR GITHUB".
*/

/* --- KONFIGURATION FÜR GITHUB (SECURE) ---
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};
*/

// --- KONFIGURATION FÜR VORSCHAU (LOKAL IM BROWSER) ---
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

/* --- FÜR GITHUB (SECURE) --- 
   Bitte lokal ent-kommentieren:
*/
// const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

/* --- FÜR VORSCHAU --- */
const apiKey = "AIzaSyCo_EE1xAwRsN4qmKzHFezUUB9syGmCxWQ"; 


const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initialAuthToken : null;


// --- GEMINI API UTILITIES ---
const callGemini = async (prompt) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Konnte gerade keine Verbindung zum Coach herstellen.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};

// --- CONTENT DATA ---

// Detailed weekly content for pregnancy
const PREGNANCY_WEEKS = {
    4: { size: 'Mohnsamen', feeling: 'Hoffnung & Geheimnis', tip: 'Noch nix sagen, aber Folsäure checken.' },
    5: { size: 'Sesamkorn', feeling: 'Ahnung & Aufregung', tip: 'Verzicht auf Alkohol/Zigaretten unterstützen.' },
    6: { size: 'Erbse', feeling: 'Müdigkeit kickt rein', tip: 'Lass sie schlafen. Übernimm den Einkauf.' },
    7: { size: 'Blaubeere', feeling: 'Übelkeit & Ekel', tip: 'Koche geruchsneutral. Ingwertee besorgen.' },
    8: { size: 'Himbeere', feeling: 'Gefühlschaos', tip: 'Sei ihr Blitzableiter für Launen.' },
    9: { size: 'Olive', feeling: 'Erschöpfung', tip: 'Bring ihr Snacks ans Bett bevor sie aufsteht.' },
    10: { size: 'Pflaume', feeling: 'Hormon-Party', tip: 'Erster Ultraschall? Nimm dir frei!' },
    11: { size: 'Limette', feeling: 'Durst & Harndrang', tip: 'Immer Wasserflasche auffüllen.' },
    12: { size: 'Aprikose', feeling: 'Aufatmen (1. Etappe)', tip: 'Verkündet es der Familie!' },
    13: { size: 'Zitrone', feeling: 'Energie kehrt zurück', tip: 'Plant einen kleinen Ausflug.' },
    14: { size: 'Orange', feeling: 'Babybauch wächst', tip: 'Mach die ersten Bauch-Fotos.' },
    15: { size: 'Apfel', feeling: 'Libido schwankt', tip: 'Geduld und Zärtlichkeit ohne Druck.' },
    16: { size: 'Avocado', feeling: 'Nestbautrieb startet', tip: 'Entrümple das Arbeitszimmer/Zukünftiges Kinderzimmer.' },
    17: { size: 'Birne', feeling: 'Bänderdehnung', tip: 'Biete ihr eine Rückenmassage an.' },
    18: { size: 'Paprika', feeling: 'Erstes Flattern?', tip: 'Hand auf den Bauch, Geduld haben.' },
    19: { size: 'Mango', feeling: 'Heißhunger', tip: 'Geh auch nachts für Eis zur Tanke.' },
    20: { size: 'Banane', feeling: 'Halbzeit!', tip: 'Feiert Bergfest. Geht schick essen.' },
    21: { size: 'Karotte', feeling: 'Bewegungsdrang', tip: 'Geht zusammen schwimmen (entlastet den Rücken).' },
    22: { size: 'Papaya', feeling: 'Tritte werden stärker', tip: 'Sprich mit dem Bauch, er hört dich jetzt.' },
    23: { size: 'Grapefruit', feeling: 'Schwere Beine', tip: 'Besorg ihr Kompressionsstrümpfe oder Fußmassage.' },
    24: { size: 'Maiskolben', feeling: 'Sodbrennen', tip: 'Milch oder Mandeln bereitstellen.' },
    25: { size: 'Rübe', feeling: 'Schlafprobleme', tip: 'Stillkissen zum Schlafen besorgen.' },
    26: { size: 'Zucchini', feeling: 'Rückenschmerzen', tip: 'Schuhe binden übernehmen.' },
    27: { size: 'Blumenkohl', feeling: 'Atemnot', tip: 'Treppen langsam gehen, Pausen machen.' },
    28: { size: 'Aubergine', feeling: '3. Trimester beginnt', tip: 'Kliniktasche Packliste durchgehen.' },
    29: { size: 'Butternuss-Kürbis', feeling: 'Kindsbewegungen', tip: 'Spiel "Tritt-Antwort" mit dem Bauch.' },
    30: { size: 'Gurke', feeling: 'Sorgen & Ängste', tip: 'Geburtsvorbereitungskurs ernst nehmen.' },
    31: { size: 'Ananas', feeling: 'Alles wird eng', tip: 'Hilf ihr aus dem Bett/Sofa hoch.' },
    32: { size: 'Chinakohl', feeling: 'Übungswehen', tip: 'Lerne Wehen zu tracken (Abstand messen).' },
    33: { size: 'Sellerie', feeling: 'Ungeduld', tip: 'Kinderzimmer fertig streichen/aufbauen.' },
    34: { size: 'Honigmelone', feeling: 'Mutterschutz!', tip: 'Feiert ihren letzten Arbeitstag.' },
    35: { size: 'Kokosnuss', feeling: 'Senkwehen', tip: 'Auto checken, Tank voll?' },
    36: { size: 'Kopfsalat', feeling: 'Nestbau-Finale', tip: 'Kliniktasche ins Auto stellen.' },
    37: { size: 'Mangold', feeling: 'Bereit (Theoretisch)', tip: 'Dokumente griffbereit legen.' },
    38: { size: 'Lauch', feeling: 'Warten...', tip: 'Lenk sie ab. Kino, Essen, Spazieren.' },
    39: { size: 'Wassermelone', feeling: 'Jedes Ziehen zählt', tip: 'Handy immer auf Laut.' },
    40: { size: 'Kürbis', feeling: 'Geburtstermin', tip: 'Ruhepol sein. Du schaffst das.' },
    41: { size: 'Riesen-Kürbis', feeling: 'Überfällig', tip: 'Nervige Nachfragen von Verwandten abblocken.' }
};

const POSTPARTUM_EMPATHY = {
  0: { feeling: 'Adrenalin & Erschöpfung', tip: 'Besuch abwehren. Windeln wechseln. Essen ans Bett.' },
  1: { feeling: 'Baby Blues & Heilung', tip: 'Zuhören bei Tränen. Keine Ratschläge. Haushalt schmeißen.' },
  2: { feeling: 'Clusterfeeding & Müdigkeit', tip: 'Nachts das Baby nach dem Stillen wickeln/tragen.' },
  4: { feeling: 'Neue Routine finden', tip: 'Ermutige sie, mal 1h rauszugehen (ohne Baby).' },
  8: { feeling: 'Körpergefühl kehrt zurück', tip: 'Rückbildungskurs organisieren/freischaufeln.' },
  12: { feeling: 'Alltag spielt sich ein', tip: 'Plant ein erstes kleines Date zuhause.' },
};

// New detailed logic for loss based on SSW
const LOSS_EMPATHY = {
  early: { feeling: 'Schock & Hormonabfall', tip: 'Nimm ihr alles ab. Sei einfach da. Schokolade & Wärmflasche.' },
  middle: { feeling: 'Körperlicher & seelischer Schmerz', tip: 'Sorge für Schmerzmittel. Hilf ihr, den Körper anzunehmen.' },
  late: { feeling: 'Wochenbett & Trauer', tip: 'Körperliche Schonung ist Pflicht (Rückbildung). Organisiere Abschiednahme.' },
  after: { feeling: 'Wellen der Trauer', tip: 'Erinnere an Jahrestage. Akzeptiere, dass Trauer nicht linear ist.' }
};

const HOSPITAL_BAG_CONTENT = {
    documents: { title: "Papierkram", items: [{ id: 'doc-1', text: 'Mutterpass' }, { id: 'doc-2', text: 'Ausweise' }, { id: 'doc-3', text: 'Krankenkassenkarte' }, { id: 'doc-4', text: 'Einweisungsschein' }, { id: 'doc-5', text: 'Heiratsurkunde' }] },
    mom: { title: "Für Sie", items: [{ id: 'mom-1', text: 'Bequeme T-Shirts' }, { id: 'mom-2', text: 'Still-BHs' }, { id: 'mom-3', text: 'Warme Socken' }, { id: 'mom-4', text: 'Jogginghose' }, { id: 'mom-5', text: 'Kulturbeutel' }, { id: 'mom-6', text: 'Lippenbalsam' }] },
    dad: { title: "Für Dich", items: [{ id: 'dad-1', text: 'SNACKS!' }, { id: 'dad-2', text: 'Kleingeld' }, { id: 'dad-3', text: 'Powerbank' }, { id: 'dad-4', text: 'Frisches T-Shirt' }] },
    baby: { title: "Fürs Baby", items: [{ id: 'baby-1', text: 'Body & Strampler (50/56)' }, { id: 'baby-2', text: 'Mützchen' }, { id: 'baby-3', text: 'Spucktuch' }, { id: 'baby-4', text: 'Babyschale (Auto)' }] }
};

const getTasks = (mode, stage, lossWeek) => {
  if (mode === 'pregnancy') {
      if (stage === 1) return [{ id: 'p1-1', text: 'Arzttermine planen', category: 'Logistik' }, { id: 'p1-2', text: 'Codewörter definieren', category: 'Emotional' }, { id: 'p1-3', text: 'Snack-Notfall-Kit', category: 'Support' }];
      if (stage === 2) return [{ id: 'p2-1', text: 'Zimmer planen', category: 'Vorbereitung' }, { id: 'p2-2', text: 'Geburtskurs buchen', category: 'Logistik' }];
      if (stage === 3) return [{ id: 'p3-1', text: 'Klinikweg testen', category: 'Notfall' }, { id: 'p3-2', text: 'Elterngeld Antrag', category: 'Bürokratie' }];
  } 
  if (mode === 'postpartum') return [{ id: 'pp-1', text: 'Geburtsurkunde', category: 'Bürokratie' }, { id: 'pp-2', text: 'Krankenkasse', category: 'Bürokratie' }, { id: 'pp-3', text: 'Kinderarzt U3', category: 'Gesundheit' }];
  if (mode === 'loss') {
      const basic = [{ id: 'l-1', text: 'Krankmeldung', category: 'Bürokratie' }];
      if (lossWeek > 12) basic.push({ id: 'l-2', text: 'Bestatter kontaktieren?', category: 'Logistik' });
      if (lossWeek > 24) basic.push({ id: 'l-3', text: 'Rückbildungsgymnastik', category: 'Gesundheit' });
      return basic;
  }
  return [];
};

const HABITS_PREGNANCY = [{ key: 'hydration', title: "Wasser", text: "Glas bringen", icon: Droplets }, { key: 'oasis', title: "Oase", text: "Kleine Geste", icon: Sparkles }];
const HABITS_POSTPARTUM = [{ key: 'hydration', title: "Still-Snack", text: "Nüsse/Wasser", icon: Utensils }, { key: 'nightshift', title: "Nacht-Held", text: "Wickeln", icon: Moon }];
const HABITS_LOSS = [{ key: 'hydration', title: "Fürsorge", text: "Essen hinstellen", icon: Droplets }, { key: 'shield', title: "Schutzschild", text: "Besuch abwehren", icon: ShieldCheck }];

// --- UTILITIES ---

const calculateStatus = (dateString, mode) => {
  if (mode === 'loss') return { status: 'Loss', progress: 0, stage: 'after', label: 'Sternenkind' };
  if (!dateString) return { status: 'NotSet', progress: 0, stage: 0, label: '' };
  const refDate = new Date(dateString);
  const today = new Date();
  
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
  const daysUntilDue = Math.floor((refDate - today) / (1000 * 60 * 60 * 24));
  const daysPregnant = 280 - daysUntilDue;
  if (daysPregnant < 0) return { week: 0, days: 0, trimester: 0, status: 'Waiting', progress: 0, stage: 0, label: 'Warten' };
  const currentWeek = Math.floor(daysPregnant / 7) + 1;
  const currentDays = daysPregnant % 7;
  const progress = Math.min(100, Math.max(0, (daysPregnant / totalDuration) * 100));
  let trimester = 1;
  if (currentWeek >= 14) trimester = 2;
  if (currentWeek >= 28) trimester = 3;
  return { week: currentWeek, days: currentDays, trimester, status: 'Pregnant', progress, stage: trimester, label: `SSW ${currentWeek} + ${currentDays}` };
};

// Helper for gender-aware text
const getBabyTerm = (gender, name, useArticle = true) => {
    if (name) return name;
    if (gender === 'boy') return useArticle ? 'Dein Sohn' : 'Sohn';
    if (gender === 'girl') return useArticle ? 'Deine Tochter' : 'Tochter';
    return useArticle ? 'Dein Baby' : 'Baby';
};

const getBabyTermSmall = (gender, name) => {
    if (name) return name;
    if (gender === 'boy') return 'der Kleine';
    if (gender === 'girl') return 'die Kleine';
    return 'das Kleine'; // oder "das Baby"
};

// --- COMPONENTS ---

const InfoModal = ({ title, subtitle, content, icon: Icon, close, colorClass = "bg-white" }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={close}></div>
             <div className={`${colorClass} w-full max-w-sm max-h-[85vh] rounded-[32px] shadow-2xl p-6 relative z-10 animate-in zoom-in-95 duration-300 flex flex-col`}>
                <button onClick={close} className="absolute top-4 right-4 p-2 bg-black/5 rounded-full hover:bg-black/10 transition"><X size={20} className="text-stone-500" /></button>
                
                <div className="mb-6 flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-white/50 flex items-center justify-center mb-4 shadow-sm border border-black/5">
                        <Icon size={28} className="text-stone-700" />
                    </div>
                    {/* Fixed: Added hyphens-auto and break-words for long German words in titles */}
                    <h2 className="text-2xl font-bold text-stone-800 leading-tight mb-1 hyphens-auto break-words">{title}</h2>
                    {subtitle && <p className="text-stone-500 font-medium">{subtitle}</p>}
                </div>
                
                <div className="flex-1 overflow-y-auto min-h-0 pr-2">
                    {content}
                </div>
             </div>
        </div>
    );
};

const ProgressCard = ({ statusData, mode, onClick, gender, babyName }) => {
    let sizeInfo = null;
    if (mode === 'pregnancy' && statusData.week) {
        const weekContent = PREGNANCY_WEEKS[statusData.week] || {};
        sizeInfo = weekContent.size ? `${weekContent.size}` : null;
    }

    if (mode === 'loss') {
        return (
            <div className="bg-stone-800 text-stone-100 p-6 rounded-[32px] shadow-sm flex flex-col justify-between h-full relative overflow-hidden">
                 <div className="z-10">
                    <div className="flex justify-between items-start mb-2"><span className="text-xs font-medium text-stone-400 uppercase tracking-wider">Erinnerung</span><Star size={20} className="text-stone-400" /></div>
                    <p className="text-stone-300 text-sm leading-relaxed italic">"Trauer ist Liebe, die keinen Ort hat, an den sie gehen kann."</p>
                </div>
            </div>
        );
    }
    
    const bgColor = mode === 'postpartum' ? 'bg-indigo-900' : 'bg-stone-900';
    const accentColor = mode === 'postpartum' ? 'text-indigo-300' : 'text-lime-400';
    const barColor = mode === 'postpartum' ? 'bg-indigo-500' : 'bg-lime-400';
    
    const term = getBabyTermSmall(gender, babyName);

    return (
        <div onClick={onClick} className={`${bgColor} text-stone-100 p-5 rounded-[32px] shadow-sm flex flex-col justify-between h-full relative overflow-hidden group cursor-pointer transition-transform active:scale-95`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors"></div>
            <div>
                <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-medium opacity-60 uppercase tracking-wider">{term}</span>
                    <Activity size={20} className={accentColor} />
                </div>
                
                {sizeInfo ? (
                    <div>
                        <div className={`text-sm ${accentColor} font-bold mb-1 flex items-center`}><Scale size={14} className="mr-1" /> {sizeInfo}</div>
                        <div className="text-3xl font-bold text-white">{Math.round(statusData.progress)}<span className="text-lg opacity-50">%</span></div>
                    </div>
                ) : (
                    <div className="text-3xl font-bold text-white mb-1">{statusData.week}<span className="text-xl opacity-60">. Woche</span></div>
                )}
            </div>
            <div className="w-full bg-black/20 h-1.5 rounded-full mt-4 overflow-hidden"><div className={`${barColor} h-full rounded-full transition-all duration-1000`} style={{ width: `${statusData.progress}%` }}></div></div>
        </div>
    );
};

const EmpathyCard = ({ statusData, mode, onClick, lossWeek }) => {
    let guideEntry = null;
    if (mode === 'loss') {
        if (lossWeek < 13) guideEntry = LOSS_EMPATHY.early;
        else if (lossWeek < 25) guideEntry = LOSS_EMPATHY.middle;
        else guideEntry = LOSS_EMPATHY.late;
    } 
    else if (mode === 'postpartum') {
        const guideWeeks = Object.keys(POSTPARTUM_EMPATHY).map(Number).sort((a, b) => a - b);
        for (let i = guideWeeks.length - 1; i >= 0; i--) {
            if (guideWeeks[i] <= statusData.week) { guideEntry = POSTPARTUM_EMPATHY[guideWeeks[i]]; break; }
        }
    } else {
        guideEntry = PREGNANCY_WEEKS[statusData.week] || { feeling: 'Alles beginnt', tip: 'Sei da.' };
    }

    if (!guideEntry) return null;
    
    const bgClass = mode === 'loss' ? 'bg-[#E5E5E0]' : (mode === 'postpartum' ? 'bg-[#EEF2FF]' : 'bg-[#EBEBE3]');
    const iconClass = mode === 'loss' ? 'text-stone-500' : (mode === 'postpartum' ? 'text-indigo-400' : 'text-stone-400');
    const IconComp = mode === 'loss' ? Feather : (mode === 'postpartum' ? Moon : Heart);

    // FIXED: Changed p-6 to p-5 and text-xl to text-lg to handle long German words better
    return (
        <div onClick={onClick} className={`${bgClass} p-5 rounded-[32px] h-full flex flex-col relative overflow-hidden group cursor-pointer transition-transform active:scale-95 hover:shadow-md`}>
             <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/40 rounded-full blur-xl"></div>
             
             <div className="flex justify-between items-start z-10 mb-4">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">{mode === 'loss' ? 'Support' : (mode === 'postpartum' ? 'Wochenbett' : 'Ihr Befinden')}</span>
                <div className="bg-white/60 p-2 rounded-full shadow-sm"><IconComp size={16} className={`${iconClass} fill-current`} /></div>
            </div>
            
            <div className="z-10 mt-auto">
                {/* FIXED: Added hyphens-auto and break-words, reduced font size slightly */}
                <h3 className="text-lg font-bold text-stone-800 leading-tight mb-2 hyphens-auto break-words" lang="de">{guideEntry.feeling}</h3>
                <div className="flex items-center text-xs font-bold text-stone-400 uppercase tracking-wide">
                    <ArrowUpRight size={14} className="mr-1" /> Tipp ansehen
                </div>
            </div>
        </div>
    );
};

const HospitalBagWidget = ({ bagItems, openBag }) => {
    const totalItems = Object.values(HOSPITAL_BAG_CONTENT).reduce((acc, cat) => acc + cat.items.length, 0);
    const checkedItems = bagItems.length;
    const progress = Math.round((checkedItems / totalItems) * 100);

    return (
        <div onClick={openBag} className="bg-amber-100 p-6 rounded-[32px] cursor-pointer relative overflow-hidden group transition-transform active:scale-95 border border-amber-200/50">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-300 rounded-full opacity-30 group-hover:scale-110 transition-transform"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Logistik</span>
                <Backpack size={20} className="text-amber-600" />
            </div>
            <div className="relative z-10">
                <h3 className="text-lg font-bold text-amber-900 leading-tight mb-1">Kliniktasche</h3>
                <div className="flex items-center mt-2">
                     <div className="flex-1 bg-amber-200/50 h-2 rounded-full overflow-hidden mr-3">
                        <div className="bg-amber-500 h-full rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                     </div>
                     <span className="text-xs font-bold text-amber-700">{progress}%</span>
                </div>
            </div>
        </div>
    );
};

const EmergencyWidget = ({ openEmergency }) => {
    return (
        <div onClick={openEmergency} className="bg-rose-100 p-6 rounded-[32px] cursor-pointer relative overflow-hidden group transition-transform active:scale-95 border border-rose-200/50">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-rose-300 rounded-full opacity-30 group-hover:scale-110 transition-transform"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
                <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">Ernstfall</span>
                <AlertTriangle size={20} className="text-rose-600" />
            </div>
            <div className="relative z-10">
                <h3 className="text-lg font-bold text-rose-900 leading-tight mb-1">Notfall</h3>
                <div className="flex space-x-2 mt-2">
                    <div className="bg-white/60 px-2 py-1 rounded-lg text-[10px] font-bold text-rose-700 flex items-center"><Phone size={10} className="mr-1"/> Kontakte</div>
                    <div className="bg-white/60 px-2 py-1 rounded-lg text-[10px] font-bold text-rose-700 flex items-center"><Navigation size={10} className="mr-1"/> Route</div>
                </div>
            </div>
        </div>
    );
};

// ... (Overlay Components for Bag and Emergency remain mostly the same, simplified for brevity in this snippet but assumed present)
const HospitalBagOverlay = ({ bagItems, toggleItem, closeBag }) => {
    const categories = Object.keys(HOSPITAL_BAG_CONTENT);
    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm pointer-events-auto animate-in fade-in duration-300" onClick={closeBag}></div>
            <div className="bg-[#F7F7F5] w-full max-w-md h-[90vh] sm:h-[80vh] rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden flex flex-col pointer-events-auto animate-in slide-in-from-bottom duration-300 relative">
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

const EmergencyOverlay = ({ contacts, updateContact, closeEmergency }) => {
    const [editMode, setEditMode] = useState(false);
    const [localContacts, setLocalContacts] = useState(contacts);

    const handleSave = () => { updateContact(localContacts); setEditMode(false); };
    const handleChange = (field, value) => { setLocalContacts({ ...localContacts, [field]: value }); };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm pointer-events-auto animate-in fade-in duration-300" onClick={closeEmergency}></div>
            <div className="bg-[#F7F7F5] w-full max-w-md h-[85vh] sm:h-[auto] rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden flex flex-col pointer-events-auto animate-in slide-in-from-bottom duration-300 relative">
                <div className="bg-white p-6 pb-4 border-b border-stone-100 flex justify-between items-center sticky top-0 z-10">
                    <div><h2 className="text-2xl font-bold text-stone-800">Notfall-Infos</h2><p className="text-stone-500 text-xs">Alles griffbereit wenn's losgeht.</p></div>
                    <button onClick={closeEmergency} className="bg-stone-100 p-2 rounded-full hover:bg-stone-200 transition"><X size={20} className="text-stone-600" /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className="flex justify-end">
                        <button onClick={editMode ? handleSave : () => setEditMode(true)} className={`px-4 py-2 rounded-xl text-xs font-bold transition ${editMode ? 'bg-stone-800 text-white' : 'bg-stone-200 text-stone-600'}`}>
                            {editMode ? 'Speichern' : 'Bearbeiten'}
                        </button>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100">
                        <div className="flex items-center mb-4"><MapPin size={18} className="text-rose-500 mr-2" /><h3 className="font-bold text-stone-700">Die Klinik</h3></div>
                        {editMode ? (
                            <div className="space-y-3">
                                <input placeholder="Name der Klinik" className="w-full bg-stone-50 p-3 rounded-xl text-sm" value={localContacts.clinicName || ''} onChange={(e) => handleChange('clinicName', e.target.value)} />
                                <input placeholder="Adresse für Navi" className="w-full bg-stone-50 p-3 rounded-xl text-sm" value={localContacts.clinicAddress || ''} onChange={(e) => handleChange('clinicAddress', e.target.value)} />
                            </div>
                        ) : (
                            <div>
                                <p className="font-bold text-lg text-stone-800">{localContacts.clinicName || 'Klinik noch nicht eingetragen'}</p>
                                <p className="text-sm text-stone-500 mb-4">{localContacts.clinicAddress || 'Adresse fehlt'}</p>
                                {localContacts.clinicAddress && (
                                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(localContacts.clinicAddress)}`} target="_blank" rel="noreferrer" className="flex items-center justify-center w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-sm shadow-md hover:bg-blue-700 transition"><Navigation size={16} className="mr-2" />Navigation starten</a>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider ml-1">Wichtige Nummern</h3>
                        {[{id: 'midwife', icon: Phone, label: 'Hebamme', color: 'emerald'}, {id: 'doctor', icon: Activity, label: 'Kreißsaal / Arzt', color: 'indigo'}, {id: 'taxi', icon: Phone, label: 'Taxi / Support', color: 'amber'}].map(contact => (
                            <div key={contact.id} className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className={`bg-${contact.color}-100 p-2 rounded-full mr-3 text-${contact.color}-600`}><contact.icon size={18} /></div>
                                    <div>
                                        <p className="text-xs text-stone-400 font-bold uppercase">{contact.label}</p>
                                        {editMode ? (
                                            <div className="flex flex-col space-y-1 mt-1">
                                                <input placeholder="Name" className="bg-stone-50 p-1.5 rounded-lg text-sm w-32" value={localContacts[`${contact.id}Name`] || ''} onChange={(e) => handleChange(`${contact.id}Name`, e.target.value)} />
                                                <input placeholder="Tel-Nr." className="bg-stone-50 p-1.5 rounded-lg text-sm w-32" value={localContacts[`${contact.id}Phone`] || ''} onChange={(e) => handleChange(`${contact.id}Phone`, e.target.value)} />
                                            </div>
                                        ) : ( <p className="font-bold text-stone-700">{localContacts[`${contact.id}Name`] || '---'}</p> )}
                                    </div>
                                </div>
                                {!editMode && localContacts[`${contact.id}Phone`] && (<a href={`tel:${localContacts[`${contact.id}Phone`]}`} className="bg-green-500 text-white p-3 rounded-full shadow-md hover:bg-green-600 transition"><Phone size={20} /></a>)}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="h-6"></div>
            </div>
        </div>
    );
};

// ... (DailyTalkAI, AIVibeCheck, ModeSelection, HeaderBento, DueDateSetup remain mostly the same)
const DailyTalkAI = ({ mode, statusData, gender, babyName, lossWeek }) => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuestion = useCallback(async () => {
    setLoading(true);
    // Dynamic context for AI
    const babyRef = getBabyTermSmall(gender, babyName);
    const genderCtx = gender === 'boy' ? 'Sohn' : (gender === 'girl' ? 'Tochter' : 'Kind');
    
    let context = "";
    if (mode === 'loss') context = `Verlust/Sternenkind (${genderCtx}, Name: ${babyName || 'unbekannt'}, SSW: ${lossWeek || 'unbekannt'})`;
    else if (mode === 'postpartum') context = `Eltern mit ${statusData.week} Wochen altem Baby (${genderCtx}, Name: ${babyName || 'unbekannt'})`;
    else context = `Werdende Eltern SSW ${statusData.week} (${genderCtx}, Name: ${babyName || 'unbekannt'})`;

    const prompt = `Eine kurze, tiefe, empathische Frage für einen Vater an seine Partnerin. Kontext: ${context}. Nutze den Namen "${babyName}" oder geschlechtsspezifische Begriffe ("der Kleine"/"die Kleine"), wenn passend. Nur die Frage.`;
    
    const result = await callGemini(prompt);
    setQuestion(result);
    setLoading(false);
  }, [mode, statusData.week, gender, babyName, lossWeek]);

  useEffect(() => { if (!question) fetchQuestion(); }, [fetchQuestion, question]);

  return (
    <div className="bg-indigo-600 p-6 rounded-[32px] text-white shadow-lg shadow-indigo-200 relative overflow-hidden group">
        <div className="absolute -right-4 top-0 w-32 h-32 bg-indigo-500 rounded-full opacity-50 blur-2xl group-hover:opacity-70 transition-opacity"></div>
        <div className="flex items-center justify-between mb-3 relative z-10">
            <div className="flex items-center space-x-2">
                <div className="bg-indigo-500/50 p-1.5 rounded-full"><MessageSquare size={14} className="text-indigo-100" /></div>
                <span className="text-xs font-bold text-indigo-200 uppercase tracking-wide">Deep Talk</span>
            </div>
            <button onClick={fetchQuestion} disabled={loading} className="p-2 hover:bg-white/10 rounded-full transition"><RefreshCw size={14} className={`text-indigo-200 ${loading ? 'animate-spin' : ''}`} /></button>
        </div>
        <h3 className="text-lg font-bold leading-snug mb-2 relative z-10 min-h-[3.5rem]">{loading ? "..." : (question || "Lade...")}</h3>
    </div>
  );
};

const AIVibeCheck = ({ vibeCheck, saveVibeCheck, mode, gender, babyName, lossWeek }) => {
    const [vibeInput, setVibeInput] = useState(vibeCheck || '');
    const [aiAdvice, setAiAdvice] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => { setVibeInput(vibeCheck || ''); }, [vibeCheck]);

    const handleAnalyze = async () => {
        if (!vibeInput) return;
        saveVibeCheck(vibeInput);
        setLoading(true);
        const babyRef = getBabyTermSmall(gender, babyName);
        const lossCtx = lossWeek ? `, Verlust SSW ${lossWeek}` : '';
        const prompt = `Kurzer Support-Tipp für Vater (Phase: ${mode}${lossCtx}, Status: "${vibeInput}", Baby: ${babyRef}). Max 2 Sätze. Du-Form.`;
        const result = await callGemini(prompt);
        setAiAdvice(result);
        setLoading(false);
    };
    
    return (
      <div className={`p-6 rounded-[32px] mt-4 mb-24 transition-all duration-500 ${mode === 'loss' ? 'bg-[#E0E2E5]' : 'bg-[#E0E7FF]'}`}>
          <div className="flex items-center mb-4">
              <div className="bg-white p-2 rounded-full mr-3 shadow-sm"><Battery size={20} className={mode === 'loss' ? 'text-stone-500' : 'text-indigo-500'} /></div>
              <h3 className={`font-bold ${mode === 'loss' ? 'text-stone-900' : 'text-indigo-900'}`}>Dein Status</h3>
          </div>
          <div className="relative mb-4">
            <input type="text" value={vibeInput} onChange={(e) => setVibeInput(e.target.value)} placeholder="Wie geht's dir?" className={`w-full bg-white/60 border-0 rounded-2xl p-4 placeholder-opacity-50 focus:outline-none font-medium ${mode === 'loss' ? 'text-stone-900' : 'text-indigo-900'}`} />
            <button onClick={handleAnalyze} disabled={loading || !vibeInput} className={`absolute right-2 top-2 p-2 rounded-xl transition text-white ${mode === 'loss' ? 'bg-stone-500' : 'bg-indigo-500'}`}>{loading ? <RefreshCw size={16} className="animate-spin" /> : <Wand2 size={16} />}</button>
          </div>
          {aiAdvice && <div className="bg-white/80 p-4 rounded-2xl animate-in fade-in slide-in-from-top-2 flex items-start space-x-3"><Sparkles size={16} className={mode === 'loss' ? 'text-stone-400 mt-1' : 'text-indigo-400 mt-1'} /><p className={`text-sm font-medium ${mode === 'loss' ? 'text-stone-700' : 'text-indigo-800'}`}>{aiAdvice}</p></div>}
      </div>
    );
};

const HeaderBento = ({ statusData, mode, babyName, gender }) => {
  const isLoss = mode === 'loss';
  
  // Dynamic Title Logic
  let title = statusData.status === 'NotSet' ? 'Hey, Dad.' : statusData.label;
  if (isLoss) title = 'Für dich & sie.';
  
  // Dynamic Subtitle Logic
  let sub = statusData.status === 'NotSet' ? 'Startklar?' : `Trimester ${statusData.stage}`;
  if (isLoss) sub = 'Raum für Trauer & Halt.';
  
  // Overwrite Subtitle with personalized Name/Gender if available
  if (statusData.status !== 'NotSet') {
      let term = getBabyTerm(gender, babyName);
      if (mode === 'pregnancy') sub = `${term} • ${statusData.label}`; // e.g. "Dein Sohn • SSW 24+1"
      else if (mode === 'loss') sub = `Unvergessen: ${term}`; // e.g. "Unvergessen: Deine Tochter" or "Unvergessen: Max"
  }

  return (
    <div className="mb-6 pt-4 px-1">
      <div className="flex items-center justify-between mb-2">
         <span className="text-xs font-bold tracking-wider text-stone-400 uppercase">{isLoss ? 'Begleiter' : 'Dashboard'}</span>
         <div className="bg-stone-200 text-stone-600 rounded-full px-3 py-1 text-xs font-medium flex items-center"><span className={`w-2 h-2 rounded-full mr-2 animate-pulse ${isLoss ? 'bg-stone-400' : 'bg-green-500'}`}></span>Online</div>
      </div>
      <h1 className="text-3xl font-bold text-stone-800 leading-tight">{title}</h1>
      <p className="text-stone-500 font-medium">{sub}</p>
    </div>
  );
};

const HabitGrid = ({ habits, toggleHabit, mode }) => {
    let habitConfig;
    if (mode === 'loss') habitConfig = HABITS_LOSS;
    else if (mode === 'postpartum') habitConfig = HABITS_POSTPARTUM;
    else habitConfig = HABITS_PREGNANCY;
    return (
        <div className="grid grid-cols-2 gap-4">
            {habitConfig.map((habit) => (
                <div key={habit.key} onClick={() => toggleHabit(habit.key)} className={`p-5 rounded-[28px] cursor-pointer transition-all duration-300 flex flex-col justify-between h-36 relative overflow-hidden ${habits[habit.key] ? `bg-stone-700 text-white shadow-md` : 'bg-white border border-stone-100 text-stone-800'}`}>
                     <div className="flex justify-between items-start">
                        <div className={`p-2 rounded-full ${habits[habit.key] ? 'bg-stone-600' : 'bg-stone-100'}`}><habit.icon size={20} className={habits[habit.key] ? 'text-white' : 'text-stone-500'} /></div>
                        {habits[habit.key] && <CheckCircle size={20} className="text-stone-400" />}
                     </div>
                     <div><h3 className="font-bold text-base">{habit.title}</h3><p className={`text-[10px] ${habits[habit.key] ? 'text-stone-300' : 'text-stone-400'}`}>{habit.text}</p></div>
                </div>
            ))}
        </div>
    );
};

const TodoWidget = ({ statusData, tasks, toggleTask, mode, lossWeek }) => {
    const stage = (mode === 'loss') ? 0 : (mode === 'postpartum' ? 0 : statusData.stage);
    const defaultTasks = useMemo(() => getTasks(mode, stage, lossWeek), [mode, stage, lossWeek]);
    if (defaultTasks.length === 0) return null;
    const currentTasks = defaultTasks.map(defaultTask => {
        const savedTask = tasks.find(t => t.id === defaultTask.id);
        return { ...defaultTask, completed: savedTask ? savedTask.completed : false };
    });
    const completedCount = currentTasks.filter(t => t.completed).length;
    return (
        <div className="bg-white p-6 rounded-[32px] border border-stone-100 shadow-sm">
            <div className="flex justify-between items-end mb-6">
                <div><span className="text-xs font-bold text-stone-400 uppercase tracking-wider">{mode === 'loss' ? 'Schritte' : 'To-Do'}</span><h3 className="text-xl font-bold text-stone-800">{mode === 'loss' ? 'Organisatorisches' : 'Missionen'}</h3></div>
                <div className="text-right"><span className="text-2xl font-bold text-stone-800">{completedCount}</span><span className="text-stone-400 text-sm">/{currentTasks.length}</span></div>
            </div>
            <div className="space-y-3">
                {currentTasks.map((task) => (
                    <div key={task.id} onClick={() => toggleTask(task.id, task.completed)} className={`flex items-center p-3 rounded-2xl cursor-pointer transition-all ${task.completed ? 'bg-stone-50 text-stone-400' : 'bg-stone-50 hover:bg-stone-100 text-stone-700'}`}>
                        <div className={`mr-3 transition-all ${task.completed ? 'text-stone-400' : 'text-stone-300'}`}>{task.completed ? <CheckCircle size={20} className="fill-current" /> : <Circle size={20} />}</div>
                        <span className={`text-sm font-medium ${task.completed ? 'line-through decoration-stone-300' : ''}`}>{task.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ModeSelection = ({ setMode }) => {
    return (
        <div className="p-6 pt-12 animate-in fade-in zoom-in duration-500">
            <h1 className="text-3xl font-bold text-stone-800 mb-2">Willkommen, Dad.</h1>
            <p className="text-stone-500 mb-8">Wo steht ihr gerade?</p>
            <div className="space-y-4">
                <button onClick={() => setMode('pregnancy')} className="w-full bg-white p-5 rounded-[24px] border border-stone-100 shadow-sm hover:shadow-md transition flex items-center text-left group">
                    <div className="bg-emerald-100 p-3 rounded-full mr-4 group-hover:bg-emerald-200 transition"><Baby size={24} className="text-emerald-600" /></div>
                    <div><h3 className="font-bold text-stone-800">Wir sind schwanger</h3><p className="text-xs text-stone-500">Begleitung</p></div>
                    <ChevronRight className="ml-auto text-stone-300" />
                </button>
                <button onClick={() => setMode('postpartum')} className="w-full bg-white p-5 rounded-[24px] border border-stone-100 shadow-sm hover:shadow-md transition flex items-center text-left group">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4 group-hover:bg-indigo-200 transition"><User size={24} className="text-indigo-600" /></div>
                    <div><h3 className="font-bold text-stone-800">Baby ist da</h3><p className="text-xs text-stone-500">Wochenbett & Alltag</p></div>
                    <ChevronRight className="ml-auto text-stone-300" />
                </button>
                <button onClick={() => setMode('loss')} className="w-full bg-white p-5 rounded-[24px] border border-stone-100 shadow-sm hover:shadow-md transition flex items-center text-left group">
                    <div className="bg-stone-100 p-3 rounded-full mr-4 group-hover:bg-stone-200 transition"><Star size={24} className="text-stone-500" /></div>
                    <div><h3 className="font-bold text-stone-800">Stille Geburt / Verlust</h3><p className="text-xs text-stone-500">Support & Halt</p></div>
                    <ChevronRight className="ml-auto text-stone-300" />
                </button>
            </div>
        </div>
    );
};

const DueDateSetup = ({ saveProfile, mode }) => {
    const [localDate, setLocalDate] = useState('');
    const [name, setName] = useState('');
    const [selectedGender, setSelectedGender] = useState(null); // 'boy', 'girl', 'surprise'
    const [lossWeek, setLossWeek] = useState(''); // NEW: SSW of loss

    const handleSave = () => { 
        saveProfile({ 
            dueDate: localDate, 
            babyName: name, 
            gender: selectedGender, 
            lossWeek: lossWeek ? parseInt(lossWeek) : null 
        }); 
    };
    
    let dateLabel = 'Geburtstermin';
    if (mode === 'postpartum') dateLabel = 'Geburtstag';
    if (mode === 'loss') dateLabel = 'Datum des Verlusts';

    return (
        <div className="bg-white p-8 rounded-[32px] border border-stone-100 shadow-lg text-center mt-6 animate-in fade-in slide-in-from-bottom-8">
            <div className="bg-stone-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><Baby size={28} className="text-stone-600" /></div>
            <h2 className="text-xl font-bold text-stone-800 mb-2">{dateLabel}</h2>
            <div className="mb-6"><input type="date" value={localDate} onChange={(e) => setLocalDate(e.target.value)} className="w-full p-4 mt-1 bg-stone-50 rounded-2xl text-center font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-200" /></div>
            
            {/* Gender Selection */}
            <div className="flex justify-center space-x-3 mb-6">
                <button onClick={() => setSelectedGender('girl')} className={`flex-1 p-3 rounded-2xl border-2 transition flex flex-col items-center ${selectedGender === 'girl' ? 'border-rose-300 bg-rose-50 text-rose-700' : 'border-stone-100 hover:border-stone-200 text-stone-400'}`}>
                    <span className="text-2xl mb-1">👧</span><span className="text-xs font-bold">Mädchen</span>
                </button>
                <button onClick={() => setSelectedGender('boy')} className={`flex-1 p-3 rounded-2xl border-2 transition flex flex-col items-center ${selectedGender === 'boy' ? 'border-blue-300 bg-blue-50 text-blue-700' : 'border-stone-100 hover:border-stone-200 text-stone-400'}`}>
                    <span className="text-2xl mb-1">👦</span><span className="text-xs font-bold">Junge</span>
                </button>
                <button onClick={() => setSelectedGender('surprise')} className={`flex-1 p-3 rounded-2xl border-2 transition flex flex-col items-center ${selectedGender === 'surprise' ? 'border-amber-300 bg-amber-50 text-amber-700' : 'border-stone-100 hover:border-stone-200 text-stone-400'}`}>
                    <span className="text-2xl mb-1">🎁</span><span className="text-xs font-bold">???</span>
                </button>
            </div>
            
            {/* NEW: Loss Week Input */}
            {mode === 'loss' && (
                <div className="mb-6 text-left">
                    <label className="text-xs font-bold text-stone-400 uppercase ml-2">In welcher SSW war der Verlust?</label>
                    <input 
                        type="number" 
                        min="4" max="42"
                        value={lossWeek} 
                        onChange={(e) => setLossWeek(e.target.value)} 
                        placeholder="z.B. 12" 
                        className="w-full p-4 mt-1 bg-stone-50 rounded-2xl font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-200" 
                    />
                </div>
            )}

            <div className="mb-8"><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name (Optional)" className="w-full p-4 mt-1 bg-stone-50 rounded-2xl font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-200" /></div>
            <button onClick={handleSave} disabled={!localDate} className="w-full py-4 bg-stone-900 text-white font-bold rounded-2xl hover:bg-stone-800 transition disabled:opacity-50 shadow-xl shadow-stone-200">Starten</button>
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
  const [gender, setGender] = useState(null); // 'boy', 'girl', 'surprise'
  const [lossWeek, setLossWeek] = useState(null); // NEW

  const [tasks, setTasks] = useState([]);
  const [bagItems, setBagItems] = useState([]);
  const [contacts, setContacts] = useState({});
  const [vibeCheck, setVibeCheck] = useState('');
  const [habits, setHabits] = useState({ hydration: false, oasis: false, shield: false, nightshift: false, date: '' });
  
  // UI State - MODALS
  const [activeModal, setActiveModal] = useState(null); // 'bag', 'emergency', 'progress', 'empathy'

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const app = initializeApp(firebaseConfig);
      setDb(getFirestore(app));
      const firebaseAuth = getAuth(app);
      setAuth(firebaseAuth);
      const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
        if (!user) { if (initialAuthToken) await signInWithCustomToken(firebaseAuth, initialAuthToken); else await signInAnonymously(firebaseAuth); }
        setUserId(firebaseAuth.currentUser?.uid || crypto.randomUUID());
        setIsAuthReady(true);
      });
      return () => unsubscribe();
    } catch (e) { setLoading(false); }
  }, []);

  const profileDocRef = useMemo(() => { if (db && userId) return doc(db, `artifacts/${appId}/users/${userId}/dad_support_data`, 'user_profile'); return null; }, [db, userId]);

  useEffect(() => {
    if (!isAuthReady || !profileDocRef) return;
    const unsubscribe = onSnapshot(profileDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setMode(data.mode); setDueDate(data.dueDate); setBabyName(data.babyName); setGender(data.gender); setLossWeek(data.lossWeek);
        setTasks(data.tasks || []); setBagItems(data.bagItems || []); setContacts(data.contacts || {}); setVibeCheck(data.vibeCheck || '');
        const todayStr = new Date().toISOString().split('T')[0];
        const savedHabits = data.habits || {};
        if (savedHabits.date !== todayStr) setHabits({ hydration: false, oasis: false, shield: false, nightshift: false, date: todayStr });
        else setHabits(savedHabits);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [isAuthReady, profileDocRef]);

  const statusData = useMemo(() => calculateStatus(dueDate, mode), [dueDate, mode]);

  const saveMode = (m) => { setMode(m); setDoc(profileDocRef, { mode: m }, { merge: true }); };
  const saveProfile = (p) => { 
      setDueDate(p.dueDate); setBabyName(p.babyName); setGender(p.gender); setLossWeek(p.lossWeek);
      setDoc(profileDocRef, { dueDate: p.dueDate, babyName: p.babyName, gender: p.gender, lossWeek: p.lossWeek }, { merge: true }); 
  };
  const saveVibeCheck = (v) => { setVibeCheck(v); setDoc(profileDocRef, { vibeCheck: v }, { merge: true }); };
  
  const toggleTask = (id, current) => {
      const newTasks = [...tasks];
      const idx = newTasks.findIndex(t => t.id === id);
      if (idx > -1) newTasks[idx].completed = !current;
      else newTasks.push({ id, completed: !current });
      setTasks(newTasks); setDoc(profileDocRef, { tasks: newTasks }, { merge: true });
  };
  
  const toggleBagItem = (id) => {
      const newBag = bagItems.includes(id) ? bagItems.filter(i => i !== id) : [...bagItems, id];
      setBagItems(newBag); setDoc(profileDocRef, { bagItems: newBag }, { merge: true });
  };
  
  const updateContact = (c) => { setContacts(c); setDoc(profileDocRef, { contacts: c }, { merge: true }); };
  const toggleHabit = (k) => {
      const todayStr = new Date().toISOString().split('T')[0];
      const newHabits = { ...habits, [k]: !habits[k], date: todayStr };
      setHabits(newHabits); setDoc(profileDocRef, { habits: newHabits }, { merge: true });
  };
  
  const resetProfile = () => { 
      setDoc(profileDocRef, { mode: null, dueDate: null, tasks: [], bagItems: [], contacts: {}, gender: null, babyName: null, lossWeek: null }, { merge: true });
      setMode(null);
  };

  if (loading || !isAuthReady) return <div className="flex h-screen items-center justify-center bg-[#F7F7F5] text-stone-400">Lade DadReady...</div>;

  // --- CONTENT FOR MODALS ---
  
  const renderProgressContent = () => {
    const week = statusData.week;
    // Simple estimation logic for fun (not medical advice!)
    const lengthCm = week < 20 ? week : 20 + ((week - 20) * 1.2); // Rough calc
    const weightG = week < 20 ? week * 10 : 300 + ((week - 20) * 150); // Very rough calc
    
    // Dynamic text
    const babyText = getBabyTerm(gender, babyName);

    return (
        <div className="space-y-6">
            <div className="bg-stone-100 p-4 rounded-2xl flex items-center justify-between">
                <div>
                    <p className="text-xs text-stone-500 font-bold uppercase">Größe (ca.)</p>
                    <p className="text-2xl font-bold text-stone-800">~{Math.round(lengthCm)} cm</p>
                </div>
                <div className="bg-white p-2 rounded-full"><Ruler size={24} className="text-stone-400"/></div>
            </div>
            <div className="bg-stone-100 p-4 rounded-2xl flex items-center justify-between">
                <div>
                    <p className="text-xs text-stone-500 font-bold uppercase">Gewicht (ca.)</p>
                    <p className="text-2xl font-bold text-stone-800">~{Math.round(weightG)} g</p>
                </div>
                <div className="bg-white p-2 rounded-full"><Weight size={24} className="text-stone-400"/></div>
            </div>
            <div className="bg-lime-50 p-4 rounded-2xl border border-lime-100">
                <h3 className="font-bold text-lime-800 mb-1">Was passiert gerade?</h3>
                <p className="text-sm text-lime-700">In der {week}. Woche entwickelt sich {babyText} rasant. {PREGNANCY_WEEKS[week]?.size ? `${getBabyTermSmall(gender, babyName)} ist jetzt so groß wie ein(e) ${PREGNANCY_WEEKS[week].size}.` : ''}</p>
            </div>
        </div>
    );
  };

  const renderEmpathyContent = () => {
      const entry = PREGNANCY_WEEKS[statusData.week] || { feeling: 'Keine Daten', tip: 'Sei einfach da.' };
      return (
          <div className="space-y-6">
               <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100">
                   <h3 className="font-bold text-indigo-900 mb-2">💡 Dein Pro-Tipp</h3>
                   <p className="text-indigo-800 text-lg leading-relaxed">{entry.tip}</p>
               </div>
               <div className="bg-white p-5 rounded-2xl border border-stone-100 shadow-sm">
                   <h3 className="font-bold text-stone-700 mb-2">💬 Gesprächsimpuls</h3>
                   <p className="text-stone-600 italic">"Wie fühlst du dich heute körperlich auf einer Skala von 1-10? Was kann ich tun, um dich auf eine {Math.min(10, 8)} zu bringen?"</p>
               </div>
          </div>
      );
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] font-sans text-stone-800 pb-safe selection:bg-stone-200 flex flex-col">
      <div className="max-w-md mx-auto w-full p-6 relative flex-grow">
        
        {!mode && <ModeSelection setMode={saveMode} />}
        {(mode === 'pregnancy' || mode === 'postpartum' || mode === 'loss') && !dueDate && <DueDateSetup saveProfile={saveProfile} mode={mode} />}

        {(( (mode === 'pregnancy' || mode === 'postpartum') && dueDate) || (mode === 'loss' && dueDate)) && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <HeaderBento statusData={statusData} mode={mode} babyName={babyName} gender={gender} />

                {/* UPDATED GRID WITH CLICKABLE CARDS */}
                <div className="grid grid-cols-2 gap-4 h-48">
                    <div className="col-span-1 h-full"><ProgressCard statusData={statusData} mode={mode} onClick={() => setActiveModal('progress')} gender={gender} babyName={babyName} /></div>
                    <div className="col-span-1 h-full"><EmpathyCard statusData={statusData} mode={mode} onClick={() => setActiveModal('empathy')} lossWeek={lossWeek} /></div>
                </div>

                <HabitGrid habits={habits} toggleHabit={toggleHabit} mode={mode} />
                
                <div className="grid grid-cols-2 gap-4">
                    {mode === 'pregnancy' && <HospitalBagWidget bagItems={bagItems} openBag={() => setActiveModal('bag')} />}
                    {(mode === 'pregnancy' || mode === 'postpartum') && <EmergencyWidget openEmergency={() => setActiveModal('emergency')} />}
                </div>

                <DailyTalkAI mode={mode} statusData={statusData} gender={gender} babyName={babyName} lossWeek={lossWeek} />
                <TodoWidget statusData={statusData} tasks={tasks} toggleTask={toggleTask} mode={mode} lossWeek={lossWeek} />
                <AIVibeCheck vibeCheck={vibeCheck} saveVibeCheck={saveVibeCheck} mode={mode} gender={gender} babyName={babyName} lossWeek={lossWeek} />
            </div>
        )}
      </div>

      {/* NEW MODAL SYSTEM */}
      {activeModal === 'bag' && <HospitalBagOverlay bagItems={bagItems} toggleItem={toggleBagItem} closeBag={() => setActiveModal(null)} />}
      {activeModal === 'emergency' && <EmergencyOverlay contacts={contacts} updateContact={updateContact} closeEmergency={() => setActiveModal(null)} />}
      
      {activeModal === 'progress' && (
          <InfoModal 
            title={`Woche ${statusData.week}`} 
            subtitle="Entwicklung & Maße"
            icon={Scale} 
            content={renderProgressContent()} 
            close={() => setActiveModal(null)} 
            colorClass="bg-white"
          />
      )}
      
      {activeModal === 'empathy' && (
          <InfoModal 
            title={PREGNANCY_WEEKS[statusData.week]?.feeling || "Stimmung"} 
            subtitle="So unterstützt du sie"
            icon={Heart} 
            content={renderEmpathyContent()} 
            close={() => setActiveModal(null)} 
            colorClass="bg-[#F0F4FF]" // Leichter Blauton für Empathie
          />
      )}

      <div className="py-6 text-center">
         <button onClick={resetProfile} className="text-[10px] text-red-300 uppercase tracking-widest font-semibold hover:text-red-500 flex items-center justify-center mx-auto transition-colors"><Trash2 size={10} className="mr-1" />Reset App</button>
      </div>
    </div>
  );
};

export default App;