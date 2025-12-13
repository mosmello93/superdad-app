const apiKey = "AIzaSyD70AO-FEDpU7SYJ30qeJLPX4qUqD0P9QE";
// Key hardcoded for immediate functionality per user request

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
    ]
};

export const callGemini = async (prompt) => {
    // 1. Determine Key
    const effectiveKey = apiKey;

    // 2. Identify Mode for Context (Simple Match)
    let mode = 'pregnancy';
    if (prompt.includes('Verlust') || prompt.includes('Sternenkind')) mode = 'loss';
    else if (prompt.includes('Neugeborenes') || prompt.includes('Neugeborenen') || prompt.includes('Wochenbett')) mode = 'postpartum';

    // 3. Check Key Presence
    if (!effectiveKey || effectiveKey === "DEIN_EIGENER_GOOGLE_AI_KEY_HIER") {
        console.warn("Kein API Key gefunden. Nutze Fallback.");
        return getRandomFallback(mode);
    }

    const cleanKey = effectiveKey.trim();

    // DEBUG: Key status
    console.log(`Gemini Call: Key Present (Length: ${cleanKey.length}), Model: gemini-1.5-flash`);

    try {
        // Strategy: Newest Model (2.5) -> Lite Model (2.0)

        // 1. Try Gemini 2.5 Flash
        const result25 = await tryModel('gemini-2.5-flash', cleanKey, prompt);
        if (result25) return result25;

        // 2. Try Gemini 2.0 Flash Lite (Free Tier Optimized)
        console.warn("2.5 Flash failed, trying 2.0 Lite...");
        const resultLite = await tryModel('gemini-2.0-flash-lite-001', cleanKey, prompt);
        if (resultLite) return resultLite;

        // Both failed
        console.warn("All AI models failed. Using offline fallback.");
        return `DEBUG ERROR: All models failed. Check console for 429/404.`;

    } catch (error) {
        console.error("Gemini API Exec Error:", error);
        return `DEBUG ERROR: Exception ${error.message}`;
    }
};

// Helper to try a specific model
const tryModel = async (model, key, prompt) => {
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
            }
        );

        if (!response.ok) {
            const txt = await response.text();
            console.warn(`Model ${model} failed: ${response.status} ${txt}`);
            return null; // Return null to trigger next fallback
        }

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch (e) {
        console.warn(`Exception trying ${model}:`, e);
        return null;
    }
};

const getRandomFallback = (mode) => {
    const list = FALLBACK_QUESTIONS[mode] || FALLBACK_QUESTIONS.pregnancy;
    return list[Math.floor(Math.random() * list.length)];
};

export const generateDailyTip = async (mode, week, babyName, gender) => {
    const genderStr = gender === 'boy' ? 'Sohn' : (gender === 'girl' ? 'Tochter' : 'Kind');

    const context = mode === 'loss'
        ? "Ein Vater, der den Verlust seines Kindes verarbeitet."
        : (mode === 'postpartum'
            ? `Ein Vater mit einem Neugeborenen (Woche ${week}, Name: ${babyName || 'Baby'}, ${genderStr}).`
            : `Ein werdender Vater in der Schwangerschaftswoche ${week} (Kind: ${babyName || 'Baby'}, ${genderStr}).`);

    const prompt = `Erstelle einen kurzen, motivierenden "Tipp des Tages" oder eine kleine "Challenge" für ${context}.
    Maximal 2 Sätze. Duze den Nutzer. Sei empathisch, aber locker ("Kumpel-Ton", aber respektvoll).
    Wenn Name "${babyName}" bekannt, nutze ihn gerne.`;

    return await callGemini(prompt);
};
