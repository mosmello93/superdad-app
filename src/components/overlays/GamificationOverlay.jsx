import React from 'react';
import { Trophy, Target, BookOpen, X, Zap, CheckCircle } from 'lucide-react';

const GamificationOverlay = ({ xp, levelInfo, onClose }) => {
    const progressPercent = Math.min(100, (xp / levelInfo.next) * 100);
    const xpNeeded = levelInfo.next - xp;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            {/* 
               Changes for scrolling:
               1. max-h-[90vh]: limits height to 90% of viewport
               2. flex flex-col: enables vertical stacking
               3. overflow-hidden: ensures rounded corners clip children
            */}
            <div className="bg-white w-full max-w-md max-h-[90vh] flex flex-col rounded-[32px] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">

                {/* Header: shrink-0 prevents it from squishing */}
                <div className="bg-stone-900 text-white p-6 relative shrink-0 z-10">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex flex-col items-center mt-2">
                        <div className="bg-amber-400 p-4 rounded-full text-stone-900 shadow-lg mb-4 ring-4 ring-white/10">
                            <Trophy size={40} />
                        </div>
                        <h2 className="text-2xl font-bold">{levelInfo.title}</h2>
                        <span className="text-stone-400 text-xs font-bold uppercase tracking-widest mt-1">Level {levelInfo.level}</span>
                    </div>
                </div>

                {/* Content: overflow-y-auto enables scrolling ONLY for this part */}
                <div className="p-6 overflow-y-auto">
                    {/* Progress Section */}
                    <div className="mb-8">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-stone-500 font-bold text-sm">Dein Fortschritt</span>
                            <span className="text-indigo-600 font-bold text-sm">{xp} / {levelInfo.next} XP</span>
                        </div>
                        <div className="w-full bg-stone-100 h-4 rounded-full overflow-hidden shadow-inner">
                            <div
                                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all duration-1000 relative"
                                style={{ width: `${progressPercent}%` }}
                            >
                                <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite]" />
                            </div>
                        </div>
                        <p className="text-center text-stone-400 text-xs font-medium mt-3">
                            Noch <span className="text-stone-800 font-bold">{xpNeeded} XP</span> bis zum nächsten Level!
                        </p>
                    </div>

                    {/* How to earn XP */}
                    <div className="space-y-3">
                        <h3 className="text-stone-800 font-bold text-sm mb-2 opacity-80 uppercase tracking-wide">So sammelst du XP</h3>

                        <div className="flex items-center gap-4 p-3 bg-stone-50 rounded-xl border border-stone-100">
                            <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                                <Target size={20} />
                            </div>
                            <div className="flex-1">
                                <span className="block font-bold text-stone-700 text-sm">Daily Dads (Habits)</span>
                                <span className="text-xs text-stone-400">Tägliche Routine pflegen</span>
                            </div>
                            <span className="font-bold text-stone-900 bg-white px-2 py-1 rounded shadow-sm text-xs">+10 XP</span>
                        </div>

                        <div className="flex items-center gap-4 p-3 bg-stone-50 rounded-xl border border-stone-100">
                            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                                <CheckCircleIcon size={20} />
                            </div>
                            <div className="flex-1">
                                <span className="block font-bold text-stone-700 text-sm">To-Dos erledigen</span>
                                <span className="text-xs text-stone-400">Checklisten abarbeiten</span>
                            </div>
                            <span className="font-bold text-stone-900 bg-white px-2 py-1 rounded shadow-sm text-xs">+50 XP</span>
                        </div>

                        <div className="flex items-center gap-4 p-3 bg-stone-50 rounded-xl border border-stone-100">
                            <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                                <BookOpen size={20} />
                            </div>
                            <div className="flex-1">
                                <span className="block font-bold text-stone-700 text-sm">Wissen tanken</span>
                                <span className="text-xs text-stone-400">Artikel lesen</span>
                            </div>
                            <span className="font-bold text-stone-900 bg-white px-2 py-1 rounded shadow-sm text-xs">+20 XP</span>
                        </div>
                    </div>

                    {/* Motivational Footer */}
                    <div className="mt-8 text-center bg-indigo-50 p-4 rounded-2xl">
                        <div className="flex justify-center mb-2 text-indigo-500">
                            <Zap size={24} className="fill-current" />
                        </div>
                        <p className="text-indigo-900 font-bold text-sm">Du machst das großartig!</p>
                        <p className="text-indigo-600 text-xs mt-1">Jeder kleine Schritt zählt für deine Familie.</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

// Start Helper for Icon
const CheckCircleIcon = ({ size }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

export default GamificationOverlay;
