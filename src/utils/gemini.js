const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
// Fallback for local dev without .env (User provided key)
import { LOCAL_GEMINI_KEY } from '../config/local_keys';

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
    const effectiveKey = apiKey || LOCAL_GEMINI_KEY;

    // 2. Identify Mode for Context (Simple Match)
    let mode = 'pregnancy';
    if (prompt.includes('Verlust') || prompt.includes('Sternenkind')) mode = 'loss';
    else if (prompt.includes('Neugeborenes') || prompt.includes('Wochenbett')) mode = 'postpartum';

    // 3. Check Key Presence
    if (!effectiveKey || effectiveKey === "DEIN_EIGENER_GOOGLE_AI_KEY_HIER") {
        console.warn("Kein API Key gefunden. Nutze Fallback.");
        return getRandomFallback(mode);
    }

    const cleanKey = effectiveKey.trim();

    // DEBUG: Key status
    console.log(`Gemini Call: Key Present (Length: ${cleanKey.length}), Model: gemini-1.5-flash`);

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': cleanKey
                },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
            }
        );

        if (!response.ok) {
            console.warn(`API Error ${response.status}. Using fallback.`);
            const errorBody = await response.json();
            const errorMessage = errorBody.error?.message || response.statusText;
            return `DEBUG ERROR: ${errorMessage} (Key: ${effectiveKey ? 'Present' : 'Missing'})`;
        }

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "DEBUG: Empty Response from AI";
    } catch (error) {
        console.error("Gemini API Exec Error:", error);
        return `DEBUG EXCEPTION: ${error.message}`;
    }
};

const getRandomFallback = (mode) => {
    const list = FALLBACK_QUESTIONS[mode] || FALLBACK_QUESTIONS.pregnancy;
    return list[Math.floor(Math.random() * list.length)];
};
