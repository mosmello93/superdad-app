import React, { useState, useEffect } from 'react';
import { X, Trophy, CheckCircle, Circle, Info, RefreshCw } from 'lucide-react';
import { MEN_HEALTH_CHECKLIST, NUTRITION_TIPS } from '../../data/conception_content';

const HealthOverlay = ({ onClose, updateXP }) => {
    // State: { [itemId]: boolean }
    const [checked, setChecked] = useState({});

    // Load Checks
    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem('mens_health_tracker') || '{}');
            // Reset if it's a new day? For simplicity, we keep it as a "Current Status" checklist, or maybe manual reset.
            // Let's assume it's a "Daily Check".
            const lastDate = localStorage.getItem('mens_health_date');
            const today = new Date().toDateString();

            if (lastDate !== today) {
                // New day, reset? Or keep? Let's reset for "Daily Habits"
                setChecked({});
                localStorage.setItem('mens_health_date', today);
            } else {
                setChecked(saved);
            }
        } catch {
            setChecked({});
        }
    }, []);

    const toggle = (id) => {
        const isNowChecked = !checked[id];
        const newState = { ...checked, [id]: isNowChecked };
        setChecked(newState);
        localStorage.setItem('mens_health_tracker', JSON.stringify(newState));
        localStorage.setItem('mens_health_date', new Date().toDateString());

        // Award XP
        if (updateXP) {
            updateXP(isNowChecked ? 10 : -10);
        }
    };

    // Calc Score
    const maxScore = MEN_HEALTH_CHECKLIST.reduce((acc, item) => acc + item.score, 0);
    const currentScore = MEN_HEALTH_CHECKLIST.reduce((acc, item) => checked[item.id] ? acc + item.score : acc, 0);
    const percent = Math.round((currentScore / maxScore) * 100);

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#F5F5F0] dark:bg-stone-950 animate-in slide-in-from-bottom duration-500">
            {/* Header */}
            <div className="bg-white dark:bg-stone-900 px-6 pt-12 pb-6 shadow-sm flex items-center justify-between z-10 shrink-0 border-b border-stone-100 dark:border-stone-800">
                <div>
                    <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 font-serif flex items-center gap-2">
                        Sperm-Fit & Nutrition ⚡
                    </h2>
                    <p className="text-stone-500 dark:text-stone-400 text-sm">Dein täglicher Boost</p>
                </div>
                <button onClick={onClose} className="bg-stone-100 dark:bg-stone-800 p-2 rounded-full text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 transition">
                    <X size={24} />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 pb-24 space-y-6">

                {/* Score Card */}
                <div className="bg-stone-900 dark:bg-stone-800 text-white rounded-3xl p-6 relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>

                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <div className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">Tages-Score</div>
                            <div className="text-4xl font-black font-mono">{percent}%</div>
                            <div className="text-sm font-medium text-stone-400 mt-1">
                                {percent === 100 ? "Maschine! 🚀" : percent > 50 ? "Guter Weg! 💪" : "Geht mehr! 👇"}
                            </div>
                        </div>
                        <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center bg-stone-800">
                            <Trophy size={28} className={percent === 100 ? "text-yellow-400 animate-bounce" : "text-stone-600"} />
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6 h-2 bg-stone-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500" style={{ width: `${percent}%` }}></div>
                    </div>
                </div>

                {/* Checklist */}
                <div className="space-y-3">
                    {MEN_HEALTH_CHECKLIST.map(item => {
                        const isDone = checked[item.id];
                        return (
                            <div
                                key={item.id}
                                onClick={() => toggle(item.id)}
                                className={`flex items-center p-4 rounded-2xl border cursor-pointer transition-all active:scale-95 ${isDone ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-900/50' : 'bg-white dark:bg-stone-900 border-stone-100 dark:border-stone-800 hover:border-emerald-200'}`}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mr-4 transition-colors ${isDone ? 'bg-emerald-500 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-400'}`}>
                                    {isDone ? <CheckCircle size={24} /> : <item.icon size={24} />}
                                </div>
                                <div className="flex-1">
                                    <h3 className={`font-bold transition-colors ${isDone ? 'text-emerald-900 dark:text-emerald-100' : 'text-stone-800 dark:text-stone-100'}`}>
                                        {item.label}
                                    </h3>
                                    <p className="text-xs text-stone-500 dark:text-stone-400">{item.desc}</p>
                                </div>
                                <div className={`text-xs font-bold px-2 py-1 rounded-md ${isDone ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-800 dark:text-emerald-200' : 'bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400'}`}>
                                    +{item.score}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Nutrition Tips Section */}
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-stone-400 mb-3 px-1">Kraftfutter</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {NUTRITION_TIPS.map((tip, i) => (
                            <div key={i} className={`p-4 rounded-2xl ${tip.color} bg-opacity-30 border border-current border-opacity-10`}>
                                <div className="mb-2 opacity-80"><tip.icon size={20} /></div>
                                <div className="font-bold text-sm mb-1">{tip.title}</div>
                                <div className="text-[10px] opacity-80 leading-tight font-medium">{tip.text}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl flex gap-3 text-sm text-blue-800 dark:text-blue-200">
                    <Info className="flex-shrink-0" size={20} />
                    <p>Qualität braucht Zeit. Spermien brauchen ca. 3 Monate zur Reifung. Was du heute isst, wirkt erst im nächsten Quartal!</p>
                </div>

            </div>
        </div>
    );
};

export default HealthOverlay;
