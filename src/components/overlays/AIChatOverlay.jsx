import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User } from 'lucide-react';
import { callGemini } from '../../utils/gemini';
import { APP_FEATURES } from '../../data/features';

const AIChatOverlay = ({ onClose, mode, babyName, userName, gender, ssw, partnerHistory = [], bagItems = [], completedTasks = [], unlockedMilestones = [], dadLogs = [], habits = {}, xp = 0, currentVibe = '' }) => {
    // ... State ...
    const [messages, setMessages] = useState([
        {
            role: 'bot', text: mode === 'loss'
                ? "Ich bin für dich da. Was beschäftigt dich gerade?"
                : "Hey! Ich bin dein AI-Coach. Was liegt dir auf dem Herzen? (z.B. 'Was hilft bei Übelkeit?' oder 'Wie wickel ich richtig?')"
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input.trim();
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setLoading(true);

        const genderString = gender === 'boy' ? 'Sohn' : (gender === 'girl' ? 'Tochter' : 'Kind');

        // 1. Analyze Partner History (Trends)
        let partnerContext = "Keine Daten zu Partner-Stimmung.";
        if (partnerHistory && partnerHistory.length > 0) {
            const last3 = partnerHistory.slice(0, 3).map(e => e.moodId).join(', '); // Simple string of mood IDs
            partnerContext = `Letzte Partner-Stimmungen (neu nach alt): ${last3}.`;
        }

        // 2. Get Relevant Features
        const genericFeatures = APP_FEATURES.general || [];
        const features = APP_FEATURES[mode === 'pregnancy' ? 'pregnancy' : (mode === 'postpartum' ? 'postpartum' : 'general')] || [];
        // prevent duplicating general if mode is fallback
        const uniqueFeatures = mode === 'loss' ? [] : [...features];
        if (mode !== 'loss' && mode !== 'unknown') {
            // Basic de-dupe not strictly needed if structure is clean, but safe:
            // actually just combining logic cleanly:
        }

        const effectiveFeatures = [...features, ...genericFeatures];
        // Filter duplicates if any
        const allFeatures = effectiveFeatures.map(f => `- "${f.name}": ${f.trigger}`).join('\n');

        // 3. Construct RICH App Context
        const activeHabits = Object.entries(habits || {}).filter(([_, v]) => v).map(([k]) => k).join(', ') || 'Keine heute erledigt';
        const recentLogs = dadLogs.slice(0, 3).map(l => `"${l.text.slice(0, 50)}..."`).join('; ') || 'Keine Logs';
        const milestones = unlockedMilestones.join(', ') || 'Keine';

        const technicalContext = `
        APP-STATUS (Nutzer-Daten):
        - XP / Level: ${xp} XP
        - Heutige Gewohnheiten erledigt: ${activeHabits}
        - Aktueller Vibe (Papa): ${currentVibe || 'Nicht angegeben'}
        - Kliniktasche: ${bagItems.length} Items gepackt
        - Erledigte Bürokratie: ${completedTasks.length} Tasks
        - Meilensteine: ${milestones}
        - Letzte Dad-Logs: ${recentLogs}
        `;

        // 4. Construct Chat History
        // Filter out initial bot message if desired, or keep it. 
        // We'll keep last 10 messages to avoid token limits, formatted as "User:" / "Coach:"
        const historyText = messages.slice(-10).map(m => `${m.role === 'user' ? 'User' : 'Coach'}: ${m.text}`).join('\n');

        const context = mode === 'loss'
            ? `Du bist ein verständnisvoller Begleiter für einen Vater, der einen Verlust erlitten hat (Sternenkind: ${babyName || 'das Kind'}). Antworte kurz, empathisch und unterstützend. Duze den Nutzer (aber nenne ihn NICHT beim Namen des Kindes!).`
            : mode === 'conception'
                ? `Du bist 'HeyPapa AI Coach' für Kinderwunsch. 
               Dein Ziel: Den Nutzer unterstützen, Druck rausnehmen, Beziehung stärken.
               
               HARD FACTS:
               - Phase: Kinderwunsch (Wir üben!)
               - Zyklus-Tag: ${ssw || '?'} (Basierend auf letzter Periode)
               - Stimmung (Partner): ${partnerContext}
               ${technicalContext}

               WICHTIG:
               - Kein medizinischer Rat (Disclaimer wenn nötig).
               - Fokus auf: Entspannung, Romantik, Gesundheit, Partnerschaft.
               - Vermeide Sätze wie "Es wird schon klappen". Sei eher pragmatisch und ermutigend.`
                : `Du bist 'HeyPapa AI Coach', ein erfahrener Mentor für werdende Väter.
               
               HARD FACT CONTEXT:
               - Phase: ${mode === 'postpartum' ? 'Baby ist da!' : 'Schwangerschaft'}
               - User Name (Papa): ${userName || 'Papa'} (Sprich ihn gerne damit an!)
               - Woche: ${ssw || '?'}
               - Baby: ${babyName || 'das Baby'} (${genderString})
               - Partner-Stimmung (Trend): ${partnerContext}
               ${technicalContext}
               
               APP-WISSEN (Empfiehl diese Tools, wenn passend!):
               ${allFeatures}
               
               Deine Rolle: Sei ein unterstützender Mentor und erfahrener Freund (Typ: Coole Hebamme + bester Kumpel). 
               Duze den User (${userName || 'Kumpel'}). Sei professionell aber warmherzig.
               WICHTIG: Antworte kurz (max. 3-4 Sätze). Wenn der User Stress hat, gib sofortige Handlungshilfen.`;

        // Combine Context + History + New Message
        const prompt = `${context}\n\nVERLAUF DES GESPÄCHS:\n${historyText}\n\nUser: ${userMsg}\nAntwort (als Coach):`;

        try {
            console.log("Sending prompt to Gemini...", prompt.slice(0, 50));
            const answer = await callGemini(prompt, mode);
            console.log("Gemini answer received:", answer ? "Yes" : "No");
            setMessages(prev => [...prev, { role: 'bot', text: answer }]);
        } catch (error) {
            console.error("Gemini Error Handler:", error);
            setMessages(prev => [...prev, { role: 'bot', text: "Sorry, ich habe gerade Verbindungsprobleme. Versuch es gleich nochmal." }]);
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-[#F5F5F0] dark:bg-stone-900 w-full max-w-lg h-[80vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300 border-4 border-stone-200 dark:border-stone-800">
                {/* Header */}
                <div className="bg-white dark:bg-stone-800 p-4 flex justify-between items-center border-b border-stone-100 dark:border-stone-700">
                    <div className="flex items-center gap-2">
                        <div className="-ml-1">
                            <img src="/mascot/papa_smart.png" alt="AI Coach" className="w-16 h-16 object-contain drop-shadow-sm filter hover:brightness-110 transition" />
                        </div>
                        <div>
                            <h3 className="font-bold text-stone-800 dark:text-stone-100">HeyPapa AI Coach</h3>
                            <span className="text-[10px] text-green-500 font-bold uppercase tracking-wider flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Online
                            </span>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-full text-stone-400 dark:text-stone-500">
                        <X size={24} />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                ? 'bg-indigo-600 text-white rounded-tr-none'
                                : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 shadow-sm rounded-tl-none border border-stone-100 dark:border-stone-700'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-white dark:bg-stone-800 p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                                <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-white dark:bg-stone-800 border-t border-stone-100 dark:border-stone-700">
                    <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-900 p-1.5 rounded-full pl-4 focus-within:ring-2 ring-indigo-100 dark:ring-indigo-900 transition-all">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Frag mich was..."
                            className="flex-1 bg-transparent outline-none text-stone-800 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 text-sm"
                            disabled={loading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || loading}
                            className={`p-2 rounded-full transition-all ${input.trim() ? 'bg-indigo-600 text-white shadow-md' : 'bg-stone-200 dark:bg-stone-700 text-stone-400 dark:text-stone-500'
                                }`}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIChatOverlay;
