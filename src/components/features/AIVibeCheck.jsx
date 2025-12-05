import React, { useState, useEffect } from 'react';
import { Battery, RefreshCw, Wand2, Sparkles, History } from 'lucide-react';
import { callGemini } from '../../utils/gemini';

const AIVibeCheck = ({ vibeCheck, saveVibeCheck, vibeHistory = [], mode }) => {
    const [vibeInput, setVibeInput] = useState(vibeCheck || '');
    const [aiAdvice, setAiAdvice] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    useEffect(() => { setVibeInput(vibeCheck || ''); }, [vibeCheck]);

    const handleAnalyze = async () => {
        if (!vibeInput) return;

        setLoading(true);
        // Save current vibe immediately
        const newEntry = { text: vibeInput, date: Date.now() };
        // We calculate new history here to look responsive, although parent saves it
        const updatedHistory = [newEntry, ...vibeHistory].slice(0, 5); // Keep last 5

        saveVibeCheck(vibeInput, updatedHistory);

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
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <div className="bg-white p-2 rounded-full mr-3 shadow-sm">
                        <Battery size={20} className={iconColor} />
                    </div>
                    <h3 className={`font-bold ${textClass}`}>Dein Status</h3>
                </div>
                {vibeHistory.length > 0 && (
                    <button onClick={() => setShowHistory(!showHistory)} className={`p-2 rounded-full bg-white/50 hover:bg-white/80 transition ${textClass}`}>
                        <History size={18} />
                    </button>
                )}
            </div>

            <div className="relative mb-4">
                <input
                    type="text"
                    value={vibeInput}
                    onChange={(e) => setVibeInput(e.target.value)}
                    placeholder="Wie geht's dir heute?"
                    className={`w-full bg-white/60 border-0 rounded-2xl p-4 placeholder-opacity-50 focus:outline-none font-medium ${textClass}`}
                    onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                />
                <button
                    onClick={handleAnalyze}
                    disabled={loading || !vibeInput}
                    className={`absolute right-2 top-2 p-2 rounded-xl transition text-white ${mode === 'loss' ? 'bg-stone-500 hover:bg-stone-600' : 'bg-indigo-500 hover:bg-indigo-600'}`}
                >
                    {loading ? <RefreshCw size={16} className="animate-spin" /> : <Wand2 size={16} />}
                </button>
            </div>

            {aiAdvice && (
                <div className="bg-white/80 p-4 rounded-2xl animate-in fade-in slide-in-from-top-2 mb-4">
                    <div className="flex items-start space-x-3">
                        <div className="mt-1"><Sparkles size={16} className={mode === 'loss' ? 'text-stone-400' : 'text-indigo-400'} /></div>
                        <div><p className={`text-sm font-medium ${mode === 'loss' ? 'text-stone-700' : 'text-indigo-800'}`}>{aiAdvice}</p></div>
                    </div>
                </div>
            )}

            {showHistory && vibeHistory.length > 0 && (
                <div className="space-y-2 mt-4 animate-in fade-in slide-in-from-top-2">
                    <p className={`text-xs font-semibold uppercase opacity-60 ml-1 ${textClass}`}>Verlauf</p>
                    {vibeHistory.map((entry, i) => (
                        <div key={i} className="bg-white/40 p-3 rounded-xl flex justify-between items-center">
                            <span className={`text-sm ${textClass}`}>{entry.text}</span>
                            <span className="text-[10px] opacity-50">{new Date(entry.date).toLocaleDateString()}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AIVibeCheck;
