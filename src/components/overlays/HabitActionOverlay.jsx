import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

const HabitActionOverlay = ({ title, subtitle, icon: Icon, options, color, onClose, onConfirm, isDone }) => {
    const [selectedIdx, setSelectedIdx] = useState(null);

    // Map color names to raw generic colors for the UI
    const colorMap = {
        amber: { bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-400 dark:border-amber-600', ring: 'ring-amber-200 dark:ring-amber-700', text: 'text-amber-600 dark:text-amber-400', iconBg: 'bg-amber-100 dark:bg-amber-900/40', check: 'text-amber-500 dark:text-amber-400' },
        stone: { bg: 'bg-stone-50 dark:bg-stone-800', border: 'border-stone-400 dark:border-stone-500', ring: 'ring-stone-200 dark:ring-stone-600', text: 'text-stone-600 dark:text-stone-300', iconBg: 'bg-stone-100 dark:bg-stone-800', check: 'text-stone-500 dark:text-stone-400' },
        zinc: { bg: 'bg-zinc-50 dark:bg-zinc-800', border: 'border-zinc-400 dark:border-zinc-500', ring: 'ring-zinc-200 dark:ring-zinc-600', text: 'text-zinc-600 dark:text-zinc-300', iconBg: 'bg-zinc-100 dark:bg-zinc-800', check: 'text-zinc-500 dark:text-zinc-400' },
        blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-400 dark:border-blue-600', ring: 'ring-blue-200 dark:ring-blue-700', text: 'text-blue-600 dark:text-blue-400', iconBg: 'bg-blue-100 dark:bg-blue-900/40', check: 'text-blue-500 dark:text-blue-400' },
    };

    const c = colorMap[color] || colorMap.stone;

    const handleAccept = () => {
        if (selectedIdx !== null) {
            onConfirm(options[selectedIdx]); // Pass selected option back
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm pointer-events-auto animate-in fade-in duration-300" onClick={onClose}></div>
            <div className="bg-[#FDFCF8] dark:bg-stone-900 w-full max-w-md p-6 rounded-t-[40px] sm:rounded-[40px] shadow-2xl flex flex-col pointer-events-auto animate-in slide-in-from-bottom duration-300 relative max-h-[85vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-4">
                    <div className={`${c.iconBg} p-3 rounded-2xl ${c.text}`}>
                        {Icon && <Icon size={28} />}
                    </div>
                    <button onClick={onClose} className="bg-stone-100 dark:bg-stone-800 p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 transition">
                        <X size={20} className="text-stone-600 dark:text-stone-300" />
                    </button>
                </div>

                <h3 className={`text-xs font-bold ${c.text} uppercase tracking-wider mb-2`}>{subtitle || "Deine Mission"}</h3>
                <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-6">{title}</h2>

                <div className="space-y-3 mb-8">
                    {options.map((option, idx) => (
                        <div
                            key={idx}
                            onClick={() => !isDone && setSelectedIdx(idx)}
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${selectedIdx === idx
                                ? `${c.border} ${c.bg} ring-2 ${c.ring} ring-offset-1 dark:ring-offset-stone-900`
                                : 'border-stone-100 dark:border-stone-800 bg-white dark:bg-stone-800 hover:border-stone-200 dark:hover:border-stone-700'
                                } ${isDone && selectedIdx !== idx ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-bold text-stone-800 dark:text-stone-200">{option.title}</h4>
                                {selectedIdx === idx && <CheckCircle size={18} className={c.check} />}
                            </div>
                            <p className="text-sm text-stone-600 dark:text-stone-400">{option.text}</p>
                        </div>
                    ))}

                    {/* Custom Option */}
                    <div
                        onClick={() => !isDone && setSelectedIdx('custom')}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${selectedIdx === 'custom'
                            ? `${c.border} ${c.bg} ring-2 ${c.ring} ring-offset-1 dark:ring-offset-stone-900`
                            : 'border-stone-100 dark:border-stone-800 bg-white dark:bg-stone-800 hover:border-stone-200 dark:hover:border-stone-700'
                            } ${isDone && selectedIdx !== 'custom' ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        <div className="flex justify-between items-center mb-1">
                            <h4 className="font-bold text-stone-800 dark:text-stone-200">Eigene Idee</h4>
                            {selectedIdx === 'custom' && <CheckCircle size={18} className={c.check} />}
                        </div>
                        {selectedIdx === 'custom' ? (
                            <input
                                type="text"
                                autoFocus
                                placeholder="Was hast du gemacht?"
                                className={`w-full bg-transparent border-b ${c.border} border-dashed focus:outline-none text-sm p-1 pt-2 placeholder-stone-400`}
                                onClick={(e) => e.stopPropagation()} // Prevent deselection
                                id="custom-habit-input"
                            />
                        ) : (
                            <p className="text-sm text-stone-600 dark:text-stone-400">Etwas anderes Großartiges</p>
                        )}
                    </div>
                </div>

                <button
                    onClick={() => {
                        if (selectedIdx === 'custom') {
                            const customText = document.getElementById('custom-habit-input')?.value || "Eigene Idee";
                            onConfirm({ title: "Eigene Mission", text: customText });
                        } else {
                            handleAccept();
                        }
                    }}
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

export default HabitActionOverlay;
