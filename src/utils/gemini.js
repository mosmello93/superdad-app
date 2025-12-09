const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
// Fallback key removed for security

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
        // Try the standard alias first
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${cleanKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
            }
        );

        if (!response.ok) {
            console.warn(`API Error ${response.status}. Using fallback.`);
            // If API fails (e.g. 404 Model Not Found), we return a smooth fallback
            // so the user sees a result instead of an error message.
            return getRandomFallback(mode);
        }

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || getRandomFallback(mode);
    } catch (error) {
        console.error("Gemini API Exec Error:", error);
        return getRandomFallback(mode);
    }
};

const getRandomFallback = (mode) => {
    const list = FALLBACK_QUESTIONS[mode] || FALLBACK_QUESTIONS.pregnancy;
    return list[Math.floor(Math.random() * list.length)];
};

export const generateDailyTip = async (mode, week, babyName) => {
    const context = mode === 'loss'
        ? "Ein Vater, der den Verlust seines Kindes verarbeitet."
        : (mode === 'postpartum' ? `Ein Vater mit einem Neugeborenen (Woche ${week}).` : `Ein werdender Vater in der Schwangerschaftswoche ${week}.`);

    const prompt = `Erstelle einen kurzen, motivierenden "Tipp des Tages" oder eine kleine "Challenge" für ${context}.
    Maximal 2 Sätze. Duze den Nutzer. Sei empathisch, aber locker ("Kumpel-Ton", aber respektvoll).
    Wenn Name "${babyName}" bekannt, nutze ihn gerne.`;

    return await callGemini(prompt);
};
