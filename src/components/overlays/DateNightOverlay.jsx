import React, { useState, useEffect } from 'react';
import { X, Shuffle, Sparkles, Heart } from 'lucide-react';
import { DATE_IDEAS } from '../../data/conception_content';

const DateNightOverlay = ({ onClose }) => {
    const [idea, setIdea] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    // Pick random initial idea
    useEffect(() => {
        rollDice();
    }, []);

    const rollDice = () => {
        setIsAnimating(true);
        // Shuffle effect
        let count = 0;
        const interval = setInterval(() => {
            const random = DATE_IDEAS[Math.floor(Math.random() * DATE_IDEAS.length)];
            setIdea(random);
            count++;
            if (count > 8) {
                clearInterval(interval);
                setIsAnimating(false);
            }
        }, 100);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

            {/* Card */}
            <div className="relative z-10 bg-[#EEF2FF] dark:bg-indigo-950 w-full max-w-sm rounded-[40px] shadow-2xl overflow-hidden border-4 border-white dark:border-indigo-900 animate-in zoom-in-95 duration-300">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/50 dark:bg-black/20 rounded-full hover:bg-white dark:hover:bg-black/40 transition z-20"
                >
                    <X size={24} className="text-indigo-900 dark:text-indigo-100" />
                </button>

                {/* Content */}
                <div className="p-8 flex flex-col items-center text-center pb-12">

                    <div className="mb-6">
                        <img src="/mascot/papa_caring.png" alt="Mascot" className="w-32 h-32 object-contain mx-auto" />
                    </div>

                    <h2 className="text-3xl font-black text-indigo-900 dark:text-indigo-100 font-serif mb-2">
                        Date-O-Mat
                    </h2>
                    <p className="text-indigo-700 dark:text-indigo-300 mb-8 font-medium">
                        Keine Lust zu planen? Lass den Zufall entscheiden!
                    </p>

                    {/* The Idea Card */}
                    <div className={`bg-white dark:bg-indigo-900/50 p-6 rounded-3xl w-full aspect-square flex flex-col items-center justify-center shadow-inner border border-indigo-100 dark:border-indigo-800 transition-all duration-300 ${isAnimating ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}`}>
                        {idea && (
                            <>
                                <div className="text-6xl mb-4">
                                    {idea.emoji}
                                </div>
                                <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100 leading-tight mb-2">
                                    {idea.text}
                                </h3>
                                <span className="text-xs font-bold uppercase tracking-widest text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
                                    {idea.category}
                                </span>
                            </>
                        )}
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={rollDice}
                        disabled={isAnimating}
                        className="mt-8 w-full py-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 dark:shadow-none active:scale-95 transition-all flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        <Shuffle size={20} className={isAnimating ? 'animate-spin' : ''} />
                        Neuwürfeln
                    </button>

                </div>
            </div>
        </div>
    );
};

export default DateNightOverlay;
