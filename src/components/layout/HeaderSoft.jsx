import React from 'react';
import { Trophy, Moon, Sun, Settings, Bell } from 'lucide-react';
import { calculateLevel } from '../../utils/gamification';

const HeaderSoft = ({ statusData, mode, babyName, userName, xp, onOpenGamification, onOpenSettings, darkMode, toggleDarkMode, onRequestNotifications }) => {
    const isLoss = mode === 'loss';
    let title = statusData.status === 'NotSet' ? 'Willkommen' : statusData.label;
    if (userName) title = `Moin, ${userName}`; // Personalized Greeting
    if (isLoss) title = 'Für euch';
    if (mode === 'postpartum') title = `${statusData.week} Wochen`;

    const levelInfo = calculateLevel(xp || 0);
    const progressPercent = Math.min(100, (xp / levelInfo.next) * 100);

    return (
        <div className="pt-10 pb-6 px-4">
            {/* Top Row: Logo & Level Badge */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <img
                        src="/mascot/papa_neutral.png"
                        alt="papa Logo"
                        className="w-16 h-16 object-contain mr-2 rounded-full border-2 border-stone-100 dark:border-stone-700 bg-amber-50 dark:bg-amber-900/20"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <div className="flex flex-col justify-center">
                        {babyName && <span className="text-stone-500 dark:text-stone-400 font-medium text-sm">für {babyName}</span>}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* NOTIFICATIONS */}
                    <button
                        onClick={onRequestNotifications}
                        className="bg-white dark:bg-stone-800 p-2 rounded-full border border-stone-100 dark:border-stone-700 shadow-sm text-stone-400 dark:text-stone-300 hover:text-stone-600 dark:hover:text-amber-300 transition-colors"
                    >
                        <Bell size={16} />
                    </button>

                    {/* SETTINGS */}
                    <button
                        onClick={onOpenSettings}
                        className="bg-white dark:bg-stone-800 p-2 rounded-full border border-stone-100 dark:border-stone-700 shadow-sm text-stone-400 dark:text-stone-300 hover:text-stone-600 dark:hover:text-amber-300 transition-colors"
                    >
                        <Settings size={16} />
                    </button>

                    {/* DARK MODE TOGGLE */}
                    <button
                        onClick={toggleDarkMode}
                        className="bg-white dark:bg-stone-800 p-2 rounded-full border border-stone-100 dark:border-stone-700 shadow-sm text-stone-400 dark:text-stone-300 hover:text-stone-600 dark:hover:text-amber-300 transition-colors"
                    >
                        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                    </button>

                    {/* GAMIFICATION BADGE - Hidden int loss mode */}
                    {!isLoss && (
                        <div
                            onClick={onOpenGamification}
                            className="bg-white dark:bg-stone-800 pl-2 pr-3 py-1.5 rounded-full border border-stone-100 dark:border-stone-700 shadow-sm flex items-center gap-2 cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-700 active:scale-95 transition-all"
                        >
                            <div className="bg-amber-100 dark:bg-amber-900/40 p-1.5 rounded-full text-amber-600 dark:text-amber-400">
                                <Trophy size={14} />
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase">Lvl {levelInfo.level}</span>
                                <span className="text-xs font-bold text-stone-700 dark:text-stone-200 leading-none">{levelInfo.title}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Level Progress Bar - Hidden in loss mode */}
            {!isLoss && (
                <>
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
                </>
            )}
        </div>
    );
};

export default HeaderSoft;
