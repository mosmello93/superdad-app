import React from 'react';
import { Trophy } from 'lucide-react';
import { calculateLevel } from '../../utils/gamification';

const HeaderSoft = ({ statusData, mode, babyName, xp }) => {
    const isLoss = mode === 'loss';
    let title = statusData.status === 'NotSet' ? 'Willkommen' : statusData.label;
    if (isLoss) title = 'Für euch';
    if (mode === 'postpartum') title = `${statusData.week} Wochen`;

    const levelInfo = calculateLevel(xp || 0);
    const progressPercent = Math.min(100, (xp / levelInfo.next) * 100);

    return (
        <div className="pt-10 pb-6 px-4">
            {/* Top Row: Logo & Level Badge */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                    <img
                        src="/images/superdad_logo.png"
                        alt="SuperDad Logo"
                        className="w-10 h-10 object-contain mr-2"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <div className="flex flex-col">
                        <span className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">SuperDad App</span>
                        {babyName && <span className="text-stone-600 font-bold text-sm">für {babyName}</span>}
                    </div>
                </div>

                {/* GAMIFICATION BADGE */}
                <div className="bg-white pl-2 pr-3 py-1.5 rounded-full border border-stone-100 shadow-sm flex items-center gap-2">
                    <div className="bg-amber-100 p-1.5 rounded-full text-amber-600">
                        <Trophy size={14} />
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-stone-400 uppercase">Lvl {levelInfo.level}</span>
                        <span className="text-xs font-bold text-stone-700 leading-none">{levelInfo.title}</span>
                    </div>
                </div>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl font-bold text-stone-800 leading-tight mb-4">{title}</h1>

            {/* Level Progress Bar */}
            <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden mb-1">
                <div
                    className="bg-gradient-to-r from-indigo-400 to-purple-500 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${progressPercent}%` }}
                ></div>
            </div>
            <div className="flex justify-between text-[10px] text-stone-400 font-medium">
                <span>{xp} XP</span>
                <span>{levelInfo.next} XP</span>
            </div>
        </div>
    );
};

export default HeaderSoft;
