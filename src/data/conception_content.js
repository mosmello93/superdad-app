import { Droplets, Sparkles, BookOpen, Activity, Heart, Moon, Zap, Coffee, Utensils, Gamepad2, Film, Music, Thermometer, Ban, BedDouble, Camera, Microscope, Calendar, Brain, Shield } from 'lucide-react';

export const HABITS_CONCEPTION = [
    { key: 'hydration', title: "Wasser", text: "Bring ihr ein Glas", description: "Viel trinken ist wichtig für die Schleimhäute und Durchblutung. Sei ihr Wasser-Boy.", icon: Droplets, color: 'blue' },
    { key: 'connection', title: "Romantik", text: "Kleine Aufmerksamkeit", description: "Ein Kompliment, eine Blume, eine Massage. Haltet die Liebe wach, nicht nur für das Ziel.", icon: Sparkles, color: 'rose' },
    { key: 'reading', title: "Wissen", text: "Zyklus verstehen", description: "Lies dich ein, wie der Zyklus funktioniert. Das zeigt ihr, dass du wirklich dabei bist.", icon: BookOpen, color: 'indigo' },
    { key: 'movement', title: "Bewegung", text: "Zusammen raus?", description: "Sport baut Stress ab und fördert die Durchblutung. Geht zusammen spazieren oder Joggen.", icon: Activity, color: 'emerald' },
    { key: 'date_night', title: "Date Night", text: "Paar bleiben", description: "Geht essen, ins Kino, macht was Schönes. Ihr seid ein Paar, keine Baby-Maschine.", icon: Heart, color: 'fuchsia' },
    { key: 'relax', title: "Entspannung", text: "Stress reduzieren", description: "Stress ist der Feind der Fruchtbarkeit. Nimm ihr was ab, sorg für Ruhe.", icon: Moon, color: 'amber' }
];

export const CONCEPTION_CONTENT = {
    phases: {
        menstruation: {
            title: "Neustart 🩸",
            feeling: "Kräfte sammeln",
            tip: "Wärmflasche & Schokolade bereit?",
            details: [
                { headline: "Neuer Zyklus", text: "Tag 1 der Periode ist Tag 1 des neuen Zyklus. Alles auf Anfang." },
                { headline: "Support", text: "Ihre Stimmung kann gedrückt sein (Hormone + Enttäuschung). Sei extra lieb." },
                { headline: "Körper", text: "Eisenreiche Ernährung hilft jetzt (Spinat, Rindfleisch, Linsen), um Blutverlust auszugleichen." }
            ]
        },
        follicular: {
            title: "Aufbau-Phase 🌱",
            feeling: "Energie kehrt zurück",
            tip: "Plant schöne Dates. Spaß haben!",
            details: [
                { headline: "Energie", text: "Das Östrogen steigt. Sie fühlt sich oft wieder fitter und attraktiver." },
                { headline: "Sperm-Qualität", text: "Für dich gilt: Keine Sauna, Sitzheizung aus, Handy aus der Hosentasche." },
                { headline: "Vorbereitung", text: "Der Körper bereitet den Eisprung vor. Gesunde Ernährung ist jetzt top." }
            ]
        },
        fertile: {
            title: "Fruchtbare Tage 🔥",
            feeling: "Romantik-Modus",
            tip: "Zeit für Zweisamkeit (ohne Druck!).",
            details: [
                { headline: "Timing", text: "Spermien überleben bis zu 5 Tage, die Eizelle nur 24h. Vor dem Eisprung ist der beste Zeitpunkt." },
                { headline: "Eisprung", text: "Findet meist 12-16 Tage VOR der nächsten Periode statt." },
                { headline: "Druck raus", text: "Mach keine Wissenschaft draus. Es soll Spaß machen, keine 'Arbeit' sein." }
            ]
        },
        luteal: {
            title: "Warteschleife ⏳",
            feeling: "Hoffen & Bangen",
            tip: "Ablenkung ist jetzt Gold wert.",
            details: [
                { headline: "Progesteron", text: "Das Hormon steigt an. Das kann PMS-Symptome (Brustspannen, Stimmung) auslösen – auch wenn es geklappt hat!" },
                { headline: "Hibbeln", text: "Die Zeit bis zum Test zieht sich ewig. Plan etwas Schönes fürs Wochenende." },
                { headline: "Geduld", text: "Frühe Tests sind oft ungenau. Warte möglichst bis zum NMT (Nicht-Mens-Tag)." }
            ]
        }
    }
};

export const CONCEPTION_ARTICLES = {
    sperm_101: {
        title: "Spermien-Tuning",
        icon: Microscope,
        color: "blue",
        content: [
            { headline: "Qualität statt Quantität", text: "Spermien brauchen ca. 3 Monate, um zu reifen. Was du heute tust, wirkt erst in 12 Wochen." },
            { headline: "Die Feinde", text: "Hitze (Sauna, Sitzheizung, Laptop auf Schoß) tötet Spermien. Nikotin und übermäßiger Alkohol schaden der Beweglichkeit." },
            { headline: "Power-Stoffe", text: "Zink, Selen und Vitamin C sind wichtig. Eine Handvoll Nüsse am Tag ist ein guter Start." }
        ]
    },
    cycle_basics: {
        title: "Zyklus 101 Mann",
        icon: Calendar,
        color: "emerald",
        content: [
            { headline: "Es ist nur ein Fenster", text: "Eine Frau ist nur ca. 6 Tage pro Zyklus fruchtbar (5 Tage vor Eisprung + Eisprungtag)." },
            { headline: "Timing", text: "Spermien überleben bis zu 5 Tage im Körper. Der 'Treffer' muss also VOR dem Eisprung landen, damit sie schon warten." },
            { headline: "Anzeichen", text: "Achte auf Signale: Ist sie energiegeladener? Hat sie mehr Lust? Dann ist oft die fruchtbare Phase." }
        ]
    },
    mental_health: {
        title: "Kopf-Sache",
        icon: Brain,
        color: "amber",
        content: [
            { headline: "Der Druck", text: "'Wir müssen heute' ist der absolute Lustkiller. Versucht, die Romantik zu bewahren, auch wenn der Kalender regiert." },
            { headline: "Enttäuschung", text: "Wenn die Periode kommt, ist das oft ein kleiner Trauer-Moment. Sei da, nimm sie in den Arm. Sag: 'Wir haben Zeit.'" },
            { headline: "Deine Rolle", text: "Du bist der Fels. Wenn sie panisch wird ('Es klappt nie!'), bleib optimistisch (auch wenn du selbst zweifelst)." }
        ]
    },
    medical_check: {
        title: "Wann zum Arzt?",
        icon: Activity,
        color: "rose",
        content: [
            { headline: "Die 1-Jahres-Regel", text: "Bei Paaren unter 35 gilt: Ein Jahr üben ist völlig normal. Erst danach ist ein Check-up sinnvoll." },
            { headline: "Ab 35", text: "Ist sie über 35, solltet ihr schon nach 6 Monaten mal nachhaken." },
            { headline: "Was kannst du tun?", text: "Ein Spermiogramm beim Urologen ist schnell, schmerzlos und gibt Klarheit. Biete an, das als Erstes zu machen (ist weniger invasiv als bei ihr)." }
        ]
    },
    medical_path: {
        title: "IVF, IUI & Co.",
        icon: Microscope,
        color: "indigo",
        content: [
            { headline: "Das Alphabet", text: "IUI = Insemination (Samenübertragung). IVF = Befruchtung im Glas. ICSI = Direkte Injektion des Spermiums." },
            { headline: "Die Kosten", text: "Kassen zahlen oft 50% für 3 Versuche (wenn verheiratet & beide >25). Länderzuschüsse prüfen!" },
            { headline: "Der Rollercoaster", text: "Hormone machen Stimmungsschwankungen. Spritzen setzen kostet Überwindung. Sei ihr Fels in der Brandung." }
        ]
    },
    adoption_foster: {
        title: "Adoption & Pflege",
        icon: Heart,
        color: "emerald",
        content: [
            { headline: "Alternative Wege", text: "Biologie ist nicht der einzige Weg zum Vaterglück. Adoption und Pflegeelternschaft sind echte Alternativen." },
            { headline: "Voraussetzungen", text: "Stabile Partnerschaft, finanzielle Sicherheit, Wohnraum. Das Jugendamt prüft genau (zum Schutz des Kindes)." },
            { headline: "Dauer", text: "Bewerbungsverfahren dauern oft Monate bis Jahre. Es ist ein Marathon, kein Sprint." }
        ]
    }
};

export const DATE_IDEAS = [
    { text: "Mario Kart Abend", category: "Fun", emoji: "🏎️" },
    { text: "Picknick im Wohnzimmer", category: "Romantik", emoji: "🧺" },
    { text: "Zusammen etwas Neues kochen", category: "Foodie", emoji: "👨‍🍳" },
    { text: "Netflix & Chill (wirklich nur gucken!)", category: "Chill", emoji: "🍿" },
    { text: "Spaziergang im Dunkeln", category: "Romantik", emoji: "🌙" },
    { text: "Lieblings-Album komplett hören", category: "Vibe", emoji: "🎧" },
    { text: "Massage-Abend (ohne Erwartung)", category: "Relax", emoji: "💆‍♂️" },
    { text: "Eis essen gehen wie beim 1. Date", category: "Nostalgie", emoji: "🍦" },
    { text: "Brettspiel-Battle", category: "Fun", emoji: "🎲" },
    { text: "Zusammen Zukunft träumen", category: "Deep", emoji: "💭" },
    { text: "Alte Fotos anschauen", category: "Nostalgie", emoji: "📷" },
    { text: "Minigolf oder Bowling", category: "Action", emoji: "🎳" }
];

export const MEN_HEALTH_CHECKLIST = [
    { id: 'supplements', label: 'Supplements?', desc: 'Zink, Selen, Folsäure.', icon: Zap, score: 10 },
    { id: 'nutrition', label: 'Gesund gegessen?', desc: 'Nüsse, Gemüse, wenig Zucker.', icon: Utensils, score: 15 },
    { id: 'sleep', label: '7-8h Schlaf?', desc: 'Regeneration ist Key.', icon: Moon, score: 15 },
    { id: 'heat', label: 'Keine Hitze?', desc: 'Keine Sauna, Sitzheizung aus!', icon: Thermometer, score: 20 },
    { id: 'alcohol', label: 'Kein Alkohol?', desc: 'Gift für die Schwimmer.', icon: Ban, score: 20 },
    { id: 'sport', label: 'Bewegung?', desc: 'Moderat, nicht übertreiben.', icon: Activity, score: 20 }
];

export const NUTRITION_TIPS = [
    { title: "Zink & Selen", text: "Der Treibstoff. In Nüssen, Kernen, Rindfleisch.", icon: Zap, color: "bg-amber-100 text-amber-700" },
    { title: "Omega 3", text: "Für die 'Hülle'. In fettem Fisch (Lachs) oder Algenöl.", icon: Droplets, color: "bg-blue-100 text-blue-700" },
    { title: "Vitamin C", text: "Schützt die DNA. In Paprika, Zitrusfrüchten, Beeren.", icon: Shield, color: "bg-rose-100 text-rose-700" },
    { title: "Maca & Co.", text: "Pflanzliche Booster für die Libido. Kann man probieren!", icon: Sparkles, color: "bg-violet-100 text-violet-700" }
];

export const PRE_FLIGHT_TASKS = [
    {
        id: 'med_urologist',
        category: 'Medical',
        title: "Urologen-Check",
        desc: "Ein Spermiogramm gibt sofort Klarheit. Schmerzfrei und schnell.",
        priority: 'high'
    },
    {
        id: 'med_vaccine',
        category: 'Medical',
        title: "Impfschutz prüfen",
        desc: "Keuchhusten und Masern sind für Neugeborene gefährlich. Auf frischen?",
        priority: 'medium'
    },
    {
        id: 'org_insurance',
        category: 'Org',
        title: "Krankenkasse checken",
        desc: "Zahlen sie Zuschüsse für Sportkurse oder Fruchtbarkeits-Checks?",
        priority: 'medium'
    },
    {
        id: 'life_smoke',
        category: 'Lifestyle',
        title: "Rauchstopp",
        desc: "Spermien brauchen 3 Monate zur Erholung. Jeder Tag ohne zählt.",
        priority: 'high'
    },
    {
        id: 'life_folate',
        category: 'Lifestyle',
        title: "Folsäure für Männer?",
        desc: "Auch für Männer gut: Fördert die Spermienqualität. Zink nicht vergessen.",
        priority: 'low'
    },
    {
        id: 'org_finance',
        category: 'Org',
        title: "Finanz-Check",
        desc: "Wie sieht es mit Elternzeit aus? Grob durchrechnen beruhigt.",
        priority: 'low'
    }
];

export const SCIENCE_SNACKS = [
    {
        id: 'sperm_cycle',
        title: "3 Monate Reifezeit",
        text: "Spermien werden nicht 'just in time' produziert. Sie brauchen ca. 72-90 Tage zur Reifung. Was du heute tust (Sauna, Alkohol, Vitamine), beeinflusst die Qualität in 3 Monaten.",
        icon: Microscope,
        color: "indigo"
    },
    {
        id: 'temp_kill',
        title: "Hitze ist der Feind",
        text: "Die Hoden hängen nicht aus Spaß 'draußen'. Sie brauchen 2-3 Grad weniger als Körpertemperatur. Sitzheizung, Laptop auf dem Schoß oder enge Hosen sind echte Killer für die Beweglichkeit.",
        icon: Thermometer,
        color: "rose"
    },
    {
        id: 'stress_cortisol',
        title: "Der Stress-Faktor",
        text: "Cortisol (Stresshormon) senkt den Testosteronspiegel. Evolutionär: 'Gefahr = Keine Zeit für Fortpflanzung'. Entspannung ist also biologisch produktiv!",
        icon: Brain,
        color: "emerald"
    },
    {
        id: 'egg_window',
        title: "Das 24h Fenster",
        text: "Die Eizelle ist nach dem Eisprung nur 12-24 Stunden befruchtungsfähig. Spermien können aber bis zu 5 Tage warten. Timing ist alles: Sex VOR dem Eisprung ist am besten.",
        icon: Calendar,
        color: "amber"
    }
];
