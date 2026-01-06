import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Star, ChevronRight } from 'lucide-react';

const LevelUpOverlay = ({ levelInfo, onClose }) => {

    useEffect(() => {
        // Fire confetti!
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#F59E0B', '#10B981', '#6366F1'] // Amber, Emerald, Indigo
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#F59E0B', '#10B981', '#6366F1']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        frame();

        // Big burst at start
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    }, []);

    if (!levelInfo) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 animate-in fade-in duration-500">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>

            {/* Content Card */}
            <div className="relative w-full max-w-sm bg-white dark:bg-stone-900 rounded-[40px] p-8 text-center shadow-2xl border-4 border-amber-400 dark:border-amber-600 animate-in zoom-in-90 duration-500 slide-in-from-bottom-10">

                {/* Floating Badge */}
                <div className="absolute -top-24 left-1/2 transform -translate-x-1/2">
                    <div className="bg-amber-400 p-3 rounded-full shadow-2xl border-4 border-white dark:border-stone-900 animate-bounce">
                        <img
                            src={levelInfo.image || `/mascot/papa_level${Math.min(5, levelInfo.level)}.png`}
                            onError={(e) => { e.target.src = '/mascot/papa_happy.png'; }}
                            alt={`Papa ${levelInfo.title}`}
                            className="w-40 h-40 object-contain"
                        />
                    </div>
                </div>

                <div className="mt-12 space-y-4">
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500 uppercase tracking-tight">
                        Level Up!
                    </h2>

                    <div className="bg-stone-50 dark:bg-stone-800 rounded-2xl p-6 border border-stone-100 dark:border-stone-700">
                        <p className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-1">Neuer Status</p>
                        <h3 className="text-2xl font-bold text-stone-800 dark:text-stone-100">{levelInfo.title}</h3>
                        <div className="flex justify-center gap-1 mt-2">
                            {[...Array(Math.min(5, levelInfo.level))].map((_, i) => (
                                <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                            ))}
                        </div>
                    </div>

                    <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                        Starke Leistung, Papa! Du wächst mit deinen Aufgaben.
                    </p>

                    <button
                        onClick={onClose}
                        className="w-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 py-4 rounded-2xl font-bold text-lg shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        Weiter so! <ChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LevelUpOverlay;
