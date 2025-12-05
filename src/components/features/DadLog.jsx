import React, { useState } from 'react';
import { PenTool, Save, Trash2, Lock, ChevronDown, ChevronUp } from 'lucide-react';

const DadLog = ({ logs = [], saveLog }) => {
    const [text, setText] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSave = () => {
        if (!text.trim()) return;
        saveLog({ text, date: Date.now() });
        setText('');
    };

    return (
        <div className="bg-white p-6 rounded-[32px] shadow-sm mb-6 border border-stone-100">
            <div className="flex items-center gap-3 mb-4">
                <div className="bg-stone-800 p-2 rounded-full text-white">
                    <PenTool size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-stone-800 leading-none">Dad Log</h3>
                    <p className="text-[10px] text-stone-400 font-medium flex items-center gap-1"><Lock size={8} /> Privat & Lokal</p>
                </div>
            </div>

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Raus damit. Was beschäftigt dich wirklich?"
                className="w-full bg-stone-50 border border-stone-100 rounded-2xl p-4 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200 resize-none h-32 mb-3"
            />

            <div className="flex justify-end mb-6">
                <button
                    onClick={handleSave}
                    disabled={!text.trim()}
                    className="bg-stone-800 text-white px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-stone-700 disabled:opacity-50 transition"
                >
                    <Save size={16} /> Speichern
                </button>
            </div>

            {logs.length > 0 && (
                <div className="border-t border-stone-100 pt-4">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full flex justify-between items-center text-xs font-bold text-stone-400 uppercase tracking-wider hover:text-stone-600 transition"
                    >
                        <span>Deine Einträge ({logs.length})</span>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {isExpanded && (
                        <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2">
                            {logs.map((log, i) => (
                                <div key={i} className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                                    <p className="text-sm text-stone-600 mb-2 leading-relaxed whitespace-pre-wrap">{log.text}</p>
                                    <p className="text-[10px] text-stone-400 text-right">{new Date(log.date).toLocaleDateString()} • {new Date(log.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DadLog;
