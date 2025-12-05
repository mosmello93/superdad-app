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
    ]
};

export const callGemini = async (prompt) => {
    // Determine mode from prompt (simple heuristic since prompt is text)
    // Actually, deepTalk passes a prompt string. We can try to guess or just pick random generic if exact match fails.
    // Better: Helper to clean prompt or just random pick.
    // Since we don't pass 'mode' to this function explicitly often, we rely on try/catch.

    // We will infer mode from prompt content or fallback to generic mix.
    let mode = 'pregnancy';
    if (prompt.includes('trauern') || prompt.includes('stiller Geburt')) mode = 'loss';
    else if (prompt.includes('Neugeborenem') || prompt.includes('Baby')) mode = 'postpartum';

    if (!apiKey || apiKey === "DEIN_EIGENER_GOOGLE_AI_KEY_HIER") {
        console.warn("Kein API Key. Nutze Fallback.");
        return getRandomFallback(mode);
    }

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
            }
        );

        if (!response.ok) {
            console.warn(`API Error ${response.status}. Using fallback.`);
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
