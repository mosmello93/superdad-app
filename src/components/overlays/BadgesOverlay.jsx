import React from 'react';
import { Trophy, Share2, X, Lock } from 'lucide-react';

const BadgesOverlay = ({ unlockedBadges, allBadges, onClose, currentXP, levelInfo, mode }) => {
    // unlockedBadges is an array of IDs
    // allBadges is the full config array

    const progressPercent = Math.min(100, (currentXP / levelInfo.next) * 100);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/90 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#FDFCF8] dark:bg-stone-900 w-full max-w-lg rounded-[40px] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden border border-stone-100 dark:border-stone-800">

                {/* Header with Level Info */}
                <div className="p-6 pb-4 bg-white dark:bg-stone-900 z-10 border-b border-stone-100 dark:border-stone-800">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-6">
                            <div className="w-28 h-28 rounded-full bg-stone-50 dark:bg-stone-800 flex items-center justify-center border-4 border-amber-100 dark:border-amber-900/50 overflow-hidden shadow-md">
                                <img
                                    src={levelInfo.image || `/mascot/papa_level${levelInfo.level}.png`}
                                    alt={`Level ${levelInfo.level} Mascot`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/mascot/papa_happy.png'; // Fallback
                                    }}
                                />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold font-serif text-stone-900 dark:text-stone-100 mb-2">Deine Erfolge</h2>
                                <div className="flex flex-col gap-1">
                                    <span className="self-start bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                        Level {levelInfo.level}
                                    </span>
                                    <span className="text-stone-500 dark:text-stone-400 text-lg font-medium">
                                        {levelInfo.title}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 bg-stone-100 dark:bg-stone-800 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 transition">
                            <X size={24} className="text-stone-600 dark:text-stone-300" />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-stone-100 dark:bg-stone-800 h-3 rounded-full overflow-hidden mb-2">
                        <div
                            className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all duration-1000"
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-xs text-stone-400 font-medium">
                        <span>{currentXP} XP</span>
                        <span>{levelInfo.next} XP bis Level {levelInfo.level + 1}</span>
                    </div>
                </div>

                {/* Grid Header */}
                <div className="p-4 bg-stone-50 dark:bg-stone-900/50 pb-0">
                    <p className="text-xs uppercase tracking-widest text-stone-400 font-bold pl-2">Trophäensammlung ({unlockedBadges.length}/{allBadges.length})</p>
                </div>

                {/* Grid */}
                <div className="overflow-y-auto p-6 pt-2 grid grid-cols-2 gap-4 bg-stone-50 dark:bg-stone-900/50">
                    {allBadges.filter(b => b.modes.includes('all') || b.modes.includes(mode)).map((badge) => {
                        const isUnlocked = unlockedBadges.includes(badge.id);

                        // Color Logic
                        const colors = {
                            amber: "text-amber-600 bg-amber-100 border-amber-200",
                            blue: "text-sky-600 bg-sky-100 border-sky-200",
                            violet: "text-violet-600 bg-violet-100 border-violet-200",
                            indigo: "text-indigo-600 bg-indigo-100 border-indigo-200",
                            emerald: "text-emerald-600 bg-emerald-100 border-emerald-200",
                            rose: "text-rose-600 bg-rose-100 border-rose-200",
                            cyan: "text-cyan-600 bg-cyan-100 border-cyan-200",
                            stone: "text-stone-600 bg-stone-100 border-stone-200",
                            teal: "text-teal-600 bg-teal-100 border-teal-200",
                            slate: "text-slate-600 bg-slate-100 border-slate-200",
                            yellow: "text-yellow-600 bg-yellow-100 border-yellow-200",
                            pink: "text-pink-600 bg-pink-100 border-pink-200",
                        };
                        const c = colors[badge.color] || colors.stone;

                        return (
                            <div key={badge.id} className={`relative p-4 rounded-3xl border-2 flex flex-col items-center text-center transition-all ${isUnlocked ? 'bg-white dark:bg-stone-800 border-stone-100 dark:border-stone-700 shadow-sm' : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-800 opacity-60 grayscale'}`}>
                                <div className={`w-28 h-28 rounded-full flex items-center justify-center mb-3 overflow-hidden ${isUnlocked ? (badge.image ? 'bg-transparent' : c) : 'bg-stone-100 dark:bg-stone-800 text-stone-400'}`}>
                                    {isUnlocked ? (
                                        badge.image ? (
                                            <img src={badge.image} alt={badge.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <badge.icon size={32} />
                                        )
                                    ) : (
                                        <Lock size={24} />
                                    )}
                                </div>

                                <h3 className="font-bold text-stone-800 dark:text-stone-200 mb-1">{badge.title}</h3>
                                <div className="text-xs text-stone-500 dark:text-stone-400 leading-tight">
                                    {isUnlocked ? (
                                        badge.description
                                    ) : (
                                        <span className="opacity-70 flex items-center justify-center gap-1">
                                            <Lock size={10} />
                                            {badge.description}
                                        </span>
                                    )}
                                </div>

                                {isUnlocked && (
                                    <div className="absolute top-2 right-2">
                                        {/* Optional: Date earned or small star */}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export const BadgeUnlockOverlay = ({ badge, onClose }) => {
    // Single Badge Celebration Overlay
    const colors = {
        amber: "from-amber-400 to-orange-500 shadow-amber-500/50",
        blue: "from-sky-400 to-blue-600 shadow-sky-500/50",
        violet: "from-violet-400 to-purple-600 shadow-violet-500/50",
        indigo: "from-indigo-400 to-blue-600 shadow-indigo-500/50",
        emerald: "from-emerald-400 to-green-600 shadow-emerald-500/50",
        rose: "from-rose-400 to-pink-600 shadow-rose-500/50",
        cyan: "from-cyan-400 to-teal-600 shadow-cyan-500/50",
        stone: "from-stone-400 to-stone-600 shadow-stone-500/50",
        teal: "from-teal-400 to-teal-600 shadow-teal-500/50",
        slate: "from-slate-400 to-slate-600 shadow-slate-500/50",
        yellow: "from-yellow-400 to-yellow-600 shadow-yellow-500/50",
        pink: "from-pink-400 to-pink-600 shadow-pink-500/50",
    };
    const gradient = colors[badge.color] || colors.stone;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-500" onClick={onClose}>
            {/* Confetti (CSS based simplified) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="absolute top-10 right-1/4 w-3 h-3 bg-red-400 rounded-full animate-bounce"></div>
                {/* More pseudo confetti could be added */}
            </div>

            <div className="bg-white dark:bg-stone-900 w-full max-w-sm rounded-[40px] p-8 text-center shadow-2xl scale-100 animate-in zoom-in-95 duration-300 relative border border-white/20">
                <div className={`mx-auto w-40 h-40 rounded-full flex items-center justify-center mb-6 shadow-xl animate-pulse overflow-hidden ${!badge.image ? `bg-gradient-to-br ${gradient}` : ''}`}>
                    {badge.image ? (
                        <img src={badge.image} alt={badge.title} className="w-full h-full object-cover" />
                    ) : (
                        <badge.icon size={48} className="text-white drop-shadow-md" />
                    )}
                </div>

                <h3 className="text-stone-500 dark:text-stone-400 font-bold uppercase tracking-widest text-xs mb-2">Neue Auszeichnung!</h3>
                <h2 className="text-3xl font-bold text-stone-900 dark:text-white mb-4 font-serif">{badge.title}</h2>
                <p className="text-stone-600 dark:text-stone-300 text-lg mb-8 leading-relaxed">
                    {badge.description}
                </p>

                <button
                    onClick={onClose}
                    className="w-full py-4 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-lg"
                >
                    Fantastisch!
                </button>
            </div>
        </div>
    );
};

export default BadgesOverlay;
