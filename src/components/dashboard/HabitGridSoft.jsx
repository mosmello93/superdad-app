import React, { useState } from 'react';
import { CheckCircle, Droplets, Sparkles, Utensils, Moon, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { HABITS_PREGNANCY, HABITS_POSTPARTUM, HABITS_LOSS } from '../../data/content';

const HabitGridSoft = ({ habits, toggleHabit, mode, openOverlay }) => {
    let habitConfig = mode === 'loss' ? HABITS_LOSS : (mode === 'postpartum' ? HABITS_POSTPARTUM : HABITS_PREGNANCY);
    const [expandedId, setExpandedId] = useState(null);

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
        if (!isActive) return "bg-white border-stone-100 text-stone-400";
        const maps = { blue: "bg-[#E0F2FE] border-sky-100 text-sky-800", amber: "bg-[#FEF3C7] border-amber-100 text-amber-800", orange: "bg-[#FFEDD5] border-orange-100 text-orange-800", indigo: "bg-[#E0E7FF] border-indigo-100 text-indigo-800", stone: "bg-[#E7E5E4] border-stone-200 text-stone-800", zinc: "bg-[#E4E4E7] border-zinc-200 text-zinc-800" };
        return maps[color] || maps.stone;
    };

    const handleExpand = (key) => {
        setExpandedId(expandedId === key ? null : key);
    };

    return (
        <div className="grid grid-cols-2 gap-3 mb-4">
            {habitConfig.map((habit) => {
                const isActive = habits[habit.key];
                const timestamp = habits[`${habit.key}Time`];
                const timeLabel = getTimeLabel(timestamp);
                const isExpanded = expandedId === habit.key;

                const handleAction = (e) => {
                    e.stopPropagation();
                    if (habit.key === 'oasis') return openOverlay('oasis');
                    if (mode === 'loss' && (habit.key === 'shield' || habit.key === 'hydration')) return openOverlay(habit.key);
                    toggleHabit(habit.key);
                };

                return (
                    <div key={habit.key}
                        onClick={() => handleExpand(habit.key)}
                        className={`${getColorClasses(habit.color, isActive)} p-4 rounded-[24px] flex flex-col transition-all cursor-pointer border shadow-sm ${isExpanded ? 'row-span-2 h-auto' : 'h-24'}`}>

                        <div className="flex justify-between items-start mb-2">
                            <habit.icon size={20} className={isActive ? 'text-current' : 'text-stone-300'} />
                            {isActive ? <CheckCircle size={18} className="opacity-60" /> : (isExpanded ? <ChevronUp size={18} className="opacity-40" /> : <ChevronDown size={18} className="opacity-40" />)}
                        </div>

                        <div>
                            <h3 className="font-bold text-sm leading-tight mb-1">{habit.title}</h3>
                            {/* Condensed view: Show status or time */}
                            {!isExpanded && (
                                <p className="text-[10px] opacity-70 font-medium">
                                    {isActive ? (timeLabel || 'Erledigt') : 'Offen'}
                                </p>
                            )}
                        </div>

                        {/* Expanded Content */}
                        {isExpanded && (
                            <div className="mt-3 pt-3 border-t border-black/5 animate-in fade-in slide-in-from-top-2">
                                <p className="text-xs opacity-80 mb-3 leading-relaxed">{habit.text}</p>
                                <button
                                    onClick={handleAction}
                                    className={`w-full py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${isActive ? 'bg-white/50 text-current' : 'bg-stone-800 text-white shadow-md'}`}>
                                    {isActive ? 'Rückgängig' : 'Erledigen'}
                                </button>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default HabitGridSoft;
