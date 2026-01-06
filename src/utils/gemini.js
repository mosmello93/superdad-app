const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const FALLBACK_QUESTIONS = {
    loss: [
        "Was hat dir heute einen kleinen Moment der Ruhe geschenkt?",
        "Welche Erinnerung an euer Kind ist dir heute besonders nah?",
        "Was brauchst du gerade am meisten von mir?",
        "Gibt es etwas, das wir heute gemeinsam für unser Sternchen tun können?",
        "Wie kann ich dich heute am besten unterstützen?"
    ],
    postpartum: [
        "Was war heute der schönste Moment mit dem Baby?",
        "Wobei kann ich dich heute Abend entlasten?",
        "Was vermisst du aus der Zeit vor dem Baby am meisten?",
        "Worüber haben wir schon lange nicht mehr geredet?"
    ],
    pregnancy: [
        "Worauf freust du dich am meisten, wenn das Baby da ist?",
        "Wovor hast du aktuell den größten Respekt?",
        "Welche Eigenschaft von dir soll das Baby unbedingt haben?",
        "Was wollen wir noch machen, bevor wir zu dritt sind?"
    ],
    conception: [
        "Nutze die Zeit zu zweit – Date Night geplant?",
        "Kein Druck: Es passiert, wenn es passiert.",
        "Sport und gute Ernährung helfen auch dir – mach mit!",
        "Sei für sie da, wenn es mal nicht geklappt hat.",
        "Kleine Aufmerksamkeiten wirken Wunder für die Stimmung.",
        "Verstehe ihren Zyklus – Wissen ist Macht (und Empathie).",
        "Habt Spaß dabei – das ist das Wichtigste!",
        "Gönnt euch eine Auszeit vom Kinderwunsch-Thema."
    ]
};

export const callGemini = async (prompt, explicitMode = null) => {
    // 1. Determine Key
    const effectiveKey = apiKey;

    // 2. Identify Mode for Context (Simple Match) or use explicit mode
    let mode = explicitMode || 'pregnancy';
    if (!explicitMode) {
        if (prompt.includes('Verlust') || prompt.includes('Sternenkind')) mode = 'loss';
        else if (prompt.includes('Neugeborenes') || prompt.includes('Neugeborenen') || prompt.includes('Wochenbett')) mode = 'postpartum';
    }

    // 3. Check Key Presence
    if (!effectiveKey || effectiveKey === "DEIN_EIGENER_GOOGLE_AI_KEY_HIER") {
        console.warn("Kein API Key gefunden. Nutze Fallback.");
        return getRandomFallback(mode);
    }

    const cleanKey = effectiveKey.trim();

    // DEBUG: Key status
    console.log(`Gemini Call: Key Present (Length: ${cleanKey.length})`);

    try {
        // Strategy: Newest Model (2.5) -> Lite Model (2.0)
        let errors = [];

        // 1. Try Gemini 2.5 Flash
        const result25 = await tryModel('gemini-2.5-flash', cleanKey, prompt);
        if (result25.success) return result25.text;
        errors.push(`2.5 Flash: ${result25.error}`);

        // 2. Try Gemini 2.0 Flash Lite (Free Tier Optimized)
        const resultLite = await tryModel('gemini-2.0-flash-lite-001', cleanKey, prompt);
        if (resultLite.success) return resultLite.text;
        errors.push(`2.0 Lite: ${resultLite.error}`);

        // Both failed
        console.warn("All AI models failed. Using offline fallback.");
        return getRandomFallback(mode);

    } catch (error) {
        console.error("Gemini API Exec Error:", error);
        return getRandomFallback(mode);
    }
};

// Helper to try a specific model
const tryModel = async (model, key, prompt) => {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s Timeout

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
                signal: controller.signal
            }
        );
        clearTimeout(timeoutId);

        if (!response.ok) {
            const txt = await response.text(); // Google often returns JSON with error details
            let errorMsg = `${response.status} ${response.statusText}`;
            try {
                const errorJson = JSON.parse(txt);
                if (errorJson.error && errorJson.error.message) {
                    errorMsg += ` - ${errorJson.error.message}`;
                }
            } catch (e) {
                // Not JSON
            }
            return { success: false, error: errorMsg };
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) return { success: false, error: "No content in response" };

        return { success: true, text: text };
    } catch (e) {
        return { success: false, error: "Network/Fetch Exception: " + e.message };
    }
};

const getRandomFallback = (mode) => {
    const list = FALLBACK_QUESTIONS[mode] || FALLBACK_QUESTIONS.pregnancy;
    return list[Math.floor(Math.random() * list.length)];
};

const TIP_TOPICS = [
    "Bindung zum Kind (Singen, Sprechen, Spüren)",
    "Partnerin entlasten (Haushalt, Massage, Kochen)",
    "Vorbereitung & Orga (Kliniktasche, Papierkram, Zimmer)",
    "Papa-Gesundheit (Eigene Ängste, Auszeit, Sport)",
    "Medizinisches Wissen (Entwicklungsschritt, Symptome)",
    "Vorfreude & Spaß (Namen, Klamotten, Zukunftsträumerei)",
    "Beziehungs-Pflege (Date Night, Zuhören, Komplimente)"
];

export const generateDailyTip = async (mode, week, babyName, gender, userName) => {
    const genderStr = gender === 'boy' ? 'Sohn' : (gender === 'girl' ? 'Tochter' : 'Kind');

    // Pick a random topic to force variety
    const randomTopic = TIP_TOPICS[Math.floor(Math.random() * TIP_TOPICS.length)];

    const context = mode === 'loss'
        ? `Ein Vater, der den Verlust seines Kindes verarbeitet (Sternenkind Name: ${babyName || 'das Kind'}).`
        : (mode === 'postpartum'
            ? `Ein Vater mit einem Neugeborenen (Woche ${week}, Name: ${babyName || 'Baby'}, ${genderStr}).`
            : `Ein werdender Vater in der Schwangerschaftswoche ${week} (Kind: ${babyName || 'Baby'}, ${genderStr}).`);

    let prompt;
    const CONCEPTION_TOPICS = [
        "Beziehung & Romantik (Date Night, Aufmerksamkeit)",
        "Druck rausnehmen (Spaß statt Pflicht)",
        "Gesunder Lifestyle (Sport, Ernährung, Schlaf)",
        "Geduld & Mindset (Positiv bleiben)",
        "Ablenkung & Hobbys (Nicht nur an Baby denken)",
        "Verständnis für ihren Zyklus"
    ];
    const randomConceptionTopic = CONCEPTION_TOPICS[Math.floor(Math.random() * CONCEPTION_TOPICS.length)];

    if (mode === 'conception') {
        prompt = `Erstelle einen kurzen, motivierenden Tipp für einen Vater mit Kinderwunsch.
        Kontext:
        - Zykluswoche/Tag: ${week}
        - Papa Name: ${userName || 'Papa'}
        - Fokus heute: ${randomConceptionTopic}

        Der Tipp soll kurz (max 2 Sätze) und locker formuliert sein. Keine medizinischen Fachbegriffe, sondern Kumpel-Ton.
        Wichtig: Sei kreativ und abwechslungsreich.`;
    } else if (mode === 'loss') {
        prompt = `Erstelle einen kurzen, tröstenden oder stärkenden "Gedanken des Tages" für ${context}.
        Thema heute: ${randomTopic} (oder etwas Passenderes für die Situation).
        Maximal 2 Sätze. Duze den Nutzer sanft. Sei sehr empathisch, ruhig und seriös. 
        Vermeide jeglichen "Kumpel-Ton".`;
    } else {
        prompt = `Erstelle einen kurzen, motivierenden "Tipp des Tages" für ${context}.
        WICHTIG: Fokussiere dich heute ausschließlich auf das Thema: "${randomTopic}".
        Beziehe dich konkret auf die Woche ${week}.
        Maximal 2-3 Sätze. Duze den Nutzer. Sei kreativ und abwechslungsreich (vermeide Standard-Floskeln wie "Leg die Hand auf den Bauch", wenn es nicht zum Thema passt!).
        Wenn Name "${babyName}" bekannt, nutze ihn gerne.`;
    }

    return await callGemini(prompt, mode);
};
