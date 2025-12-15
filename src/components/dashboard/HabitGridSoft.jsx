import React, { useState } from 'react';
import { CheckCircle, Droplets, Sparkles, Utensils, Moon, ShieldCheck, ChevronDown, ChevronUp, Info, X } from 'lucide-react';
import { HABITS_PREGNANCY, HABITS_POSTPARTUM, HABITS_LOSS } from '../../data/content';

const HabitGridSoft = ({ habits, toggleHabit, mode, openOverlay }) => {
    const [infoHabit, setInfoHabit] = useState(null);
    let habitConfig = mode === 'loss' ? HABITS_LOSS : (mode === 'postpartum' ? HABITS_POSTPARTUM : HABITS_PREGNANCY);

    // Helper to calculate time ago
    const getTimeLabel = (timestamp) => {
        if (!timestamp) return null;
        const diffMin = Math.floor((Date.now() - timestamp) / 60000);
        if (diffMin < 1) return "Gerade eben";
        if (diffMin < 60) return `Vor ${diffMin} Min`;
        const diffHr = Math.floor(diffMin / 60);
        if (diffHr < 24) return `Vor ${diffHr} Std`;
        return "Gestern";
    };

    const getColorClasses = (color, isActive) => {
        if (!isActive) return "bg-white dark:bg-stone-800 border-stone-100 dark:border-stone-700 text-stone-400 dark:text-stone-500";
        const maps = {
            blue: "bg-[#E0F2FE] dark:bg-sky-900/40 border-sky-100 dark:border-sky-800/50 text-sky-800 dark:text-sky-200",
            amber: "bg-[#FEF3C7] dark:bg-amber-900/40 border-amber-100 dark:border-amber-800/50 text-amber-800 dark:text-amber-200",
            orange: "bg-[#FFEDD5] dark:bg-orange-900/40 border-orange-100 dark:border-orange-800/50 text-orange-800 dark:text-orange-200",
            indigo: "bg-[#E0E7FF] dark:bg-indigo-900/40 border-indigo-100 dark:border-indigo-800/50 text-indigo-800 dark:text-indigo-200",
            stone: "bg-[#E7E5E4] dark:bg-stone-700/50 border-stone-200 dark:border-stone-600/50 text-stone-800 dark:text-stone-200",
            zinc: "bg-[#E4E4E7] dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200",
            emerald: "bg-[#D1FAE5] dark:bg-emerald-900/40 border-emerald-100 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-200",
            rose: "bg-[#FFE4E6] dark:bg-rose-900/40 border-rose-100 dark:border-rose-800/50 text-rose-800 dark:text-rose-200",
            cyan: "bg-[#CFFAFE] dark:bg-cyan-900/40 border-cyan-100 dark:border-cyan-800/50 text-cyan-800 dark:text-cyan-200",
            fuchsia: "bg-[#FAE8FF] dark:bg-fuchsia-900/40 border-fuchsia-100 dark:border-fuchsia-800/50 text-fuchsia-800 dark:text-fuchsia-200"
        };
        return maps[color] || maps.stone;
    };

    return (
        <div className="mb-8 relative">
            <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-4 px-2 font-serif">Daily Dads</h2>
            <div className="grid grid-cols-2 gap-3 mb-4">
                {habitConfig.map((habit) => {
                    const isActive = habits[habit.key];
                    const timestamp = habits[`${habit.key}Time`];
                    const timeLabel = getTimeLabel(timestamp);

                    const handleAction = (e) => {
                        // Complex habits open overlay, simple ones toggle directly
                        if (habit.key === 'oasis') return openOverlay('oasis');
                        if (mode === 'loss' && (habit.key === 'shield' || habit.key === 'hydration')) return openOverlay(habit.key);

                        // Simple Toggle
                        toggleHabit(habit.key);
                    };

                    const handleInfoClick = (e) => {
                        e.stopPropagation();
                        setInfoHabit(habit);
                    };

                    return (
                        <div key={habit.key}
                            onClick={handleAction}
                            className={`${getColorClasses(habit.color, isActive)} p-4 rounded-[24px] flex flex-col justify-between h-32 transition-all cursor-pointer border shadow-sm active:scale-95 relative group`}>

                            <div className="flex justify-between items-start mb-2">
                                <habit.icon size={20} className={isActive ? 'text-current' : 'text-stone-300'} />
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleInfoClick}
                                        className={`p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors ${isActive ? 'opacity-50 hover:opacity-100' : 'opacity-30 hover:opacity-100'}`}
                                    >
                                        <Info size={16} />
                                    </button>
                                    {isActive && <CheckCircle size={18} className="opacity-60" />}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-bold text-sm leading-tight mb-1">{habit.title}</h3>
                                <p className="text-[10px] opacity-70 font-medium">
                                    {isActive ? (timeLabel || 'Erledigt') : habit.text.substring(0, 20) + (habit.text.length > 20 ? '...' : '')}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Info Overlay Modal */}
            {infoHabit && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setInfoHabit(null)}>
                    <div className="bg-white dark:bg-stone-900 p-6 rounded-[32px] w-full max-w-sm shadow-2xl scale-100 animate-in zoom-in-95 duration-200 border border-stone-200 dark:border-stone-800"
                        onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <div className={`p-3 rounded-2xl ${getColorClasses(infoHabit.color, true).split(' ')[0]}`}>
                                <infoHabit.icon size={24} className={getColorClasses(infoHabit.color, true).split(' ')[4]} />
                            </div>
                            <button onClick={() => setInfoHabit(null)} className="p-2 bg-stone-100 dark:bg-stone-800 rounded-full">
                                <X size={20} className="text-stone-500" />
                            </button>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 font-serif text-stone-800 dark:text-stone-100">{infoHabit.title}</h3>
                        <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed">{infoHabit.description}</p>
                        <button
                            onClick={() => setInfoHabit(null)}
                            className="mt-6 w-full py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-2xl font-bold"
                        >
                            Verstanden
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HabitGridSoft;
