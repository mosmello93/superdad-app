import React, { useState } from 'react';
import { X, Sparkles, CheckCircle } from 'lucide-react';

const OasisOverlay = ({ missions, closeOasis, markDone, isDone }) => {
    const [selectedIdx, setSelectedIdx] = useState(null);

    if (!missions || missions.length === 0) return null;

    const handleAccept = () => {
        if (selectedIdx !== null) {
            markDone(); // Logic to save is done in App
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm pointer-events-auto animate-in fade-in duration-300" onClick={closeOasis}></div>
            <div className="bg-[#FDFCF8] dark:bg-stone-900 w-full max-w-md p-6 rounded-t-[40px] sm:rounded-[40px] shadow-2xl flex flex-col pointer-events-auto animate-in slide-in-from-bottom duration-300 relative max-h-[85vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-amber-100 dark:bg-amber-900/40 p-3 rounded-2xl text-amber-600 dark:text-amber-400">
                        <Sparkles size={28} />
                    </div>
                    <button onClick={closeOasis} className="bg-stone-100 dark:bg-stone-800 p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 transition">
                        <X size={20} className="text-stone-600 dark:text-stone-300" />
                    </button>
                </div>

                <h3 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">Deine Oase heute</h3>
                <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-6">Wähle deine Mission</h2>

                <div className="space-y-3 mb-8">
                    {missions.map((mission, idx) => (
                        <div
                            key={idx}
                            onClick={() => !isDone && setSelectedIdx(idx)}
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${selectedIdx === idx
                                ? 'border-amber-400 dark:border-amber-600 bg-amber-50 dark:bg-amber-900/20 ring-2 ring-amber-200 dark:ring-amber-800/50 ring-offset-1 dark:ring-offset-stone-900'
                                : 'border-stone-100 dark:border-stone-800 bg-white dark:bg-stone-800 hover:border-amber-200 dark:hover:border-amber-900'
                                } ${isDone && selectedIdx !== idx ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-bold text-stone-800 dark:text-stone-100">{mission.title}</h4>
                                {selectedIdx === idx && <CheckCircle size={18} className="text-amber-500 dark:text-amber-400" />}
                            </div>
                            <p className="text-sm text-stone-600 dark:text-stone-400">{mission.text}</p>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleAccept}
                    disabled={isDone || selectedIdx === null}
                    className={`w-full py-4 rounded-2xl font-bold text-white transition flex items-center justify-center ${isDone
                        ? 'bg-green-500 cursor-default'
                        : (selectedIdx !== null ? 'bg-stone-900 dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 shadow-lg' : 'bg-stone-300 dark:bg-stone-700 cursor-not-allowed')
                        }`}
                >
                    {isDone ? (<><CheckCircle size={20} className="mr-2" /> Erledigt</>) : ("Mission annehmen")}
                </button>
            </div>
        </div>
    );
};

export default OasisOverlay;
