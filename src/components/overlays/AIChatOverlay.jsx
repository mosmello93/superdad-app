import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User } from 'lucide-react';
import { callGemini } from '../../utils/gemini';

const AIChatOverlay = ({ onClose, mode, babyName, gender, ssw }) => {
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

        const context = mode === 'loss'
            ? `Du bist ein verständnisvoller Begleiter für einen Vater, der einen Verlust erlitten hat (Sternenkind: ${babyName || 'das Kind'}). Antworte kurz, empathisch und unterstützend. Duze den Nutzer (aber nenne ihn NICHT beim Namen des Kindes!).`
            : `Du bist 'Papa AI Coach', ein erfahrener Mentor für werdende Väter.
               Kontext:
               - Phase: ${mode === 'postpartum' ? 'Baby ist da!' : 'Schwangerschaft'}
               - Woche: ${ssw || '?'}
               - Baby: ${babyName || 'das Baby'} (${genderString})
               
               Deine Rolle: Sei ein unterstützender Mentor und erfahrener Freund. Duze den User, aber bewahre einen respektvollen, warmherzigen Ton (kein übertriebener "Kumpel"-Slang).
               Antworte kurz (max. 3-4 Sätze). Gehe auf die aktuelle Woche ein, wenn passend.`;

        const prompt = `${context}\n\nUser: ${userMsg}\nAntwort:`;

        try {
            const answer = await callGemini(prompt, mode);
            setMessages(prev => [...prev, { role: 'bot', text: answer }]);
        } catch (error) {
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
                            <h3 className="font-bold text-stone-800 dark:text-stone-100">papa AI Coach</h3>
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
