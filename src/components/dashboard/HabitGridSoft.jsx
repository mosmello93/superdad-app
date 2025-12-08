import React, { useState } from 'react';
import { CheckCircle, Droplets, Sparkles, Utensils, Moon, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { HABITS_PREGNANCY, HABITS_POSTPARTUM, HABITS_LOSS } from '../../data/content';

const HabitGridSoft = ({ habits, toggleHabit, mode, openOverlay }) => {
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
        if (!isActive) return "bg-white border-stone-100 text-stone-400";
        const maps = { blue: "bg-[#E0F2FE] border-sky-100 text-sky-800", amber: "bg-[#FEF3C7] border-amber-100 text-amber-800", orange: "bg-[#FFEDD5] border-orange-100 text-orange-800", indigo: "bg-[#E0E7FF] border-indigo-100 text-indigo-800", stone: "bg-[#E7E5E4] border-stone-200 text-stone-800", zinc: "bg-[#E4E4E7] border-zinc-200 text-zinc-800" };
        return maps[color] || maps.stone;
    };

    return (
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

                return (
                    <div key={habit.key}
                        onClick={handleAction}
                        className={`${getColorClasses(habit.color, isActive)} p-4 rounded-[24px] flex flex-col justify-between h-32 transition-all cursor-pointer border shadow-sm active:scale-95`}>

                        <div className="flex justify-between items-start mb-2">
                            <habit.icon size={20} className={isActive ? 'text-current' : 'text-stone-300'} />
                            {isActive && <CheckCircle size={18} className="opacity-60" />}
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
    );
};

export default HabitGridSoft;
