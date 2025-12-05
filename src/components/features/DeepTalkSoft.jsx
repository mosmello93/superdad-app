import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import { callGemini } from '../../utils/gemini';

const DeepTalkSoft = ({ mode, statusData }) => {
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(false);
    const fetchQuestion = useCallback(async () => {
        setLoading(true);
        const context = mode === 'loss' ? "Eltern, die um ihr Kind trauern. Fokus auf sanftem Austausch, Erinnerung, gegenseitiger Stütze." : (mode === 'postpartum' ? "Eltern mit Neugeborenem." : "Werdende Eltern.");
        const prompt = `Eine kurze, tiefe Frage für ein Paar (${context}). Nur die Frage.`;
        const result = await callGemini(prompt);
        setQuestion(result);
        setLoading(false);
    }, [mode, statusData.week]);
    useEffect(() => { if (!question) fetchQuestion(); }, [fetchQuestion, question]);
    return (
        <div className={`${mode === 'loss' ? 'bg-[#D6D3D1] text-stone-800' : 'bg-[#DDD6FE] text-violet-900'} p-6 rounded-[32px] mb-4 shadow-sm relative overflow-hidden`}>
            <div className="flex items-center justify-between mb-3 relative z-10"><span className="text-xs font-bold uppercase tracking-wider opacity-60">Deep Talk</span><button onClick={fetchQuestion} disabled={loading} className="bg-white/40 p-2 rounded-full"><RefreshCw size={14} className={loading ? 'animate-spin' : ''} /></button></div>
            <h3 className="text-xl font-bold leading-snug relative z-10 font-serif">"{loading ? "..." : (question || "Lade...")}"</h3>
        </div>
    );
};

export default DeepTalkSoft;
