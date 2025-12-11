import React, { useState, useEffect } from 'react';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { generateDailyTip } from '../../utils/gemini';

const DailyTipWidget = ({ mode, week, babyName }) => {
    const [tip, setTip] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadTip();
    }, [mode, week]);

    const loadTip = async (forceRefresh = false) => {
        const today = new Date().toISOString().split('T')[0];
        const storageKey = `daily_tip_${mode}_${today}`;

        // Try local storage first
        if (!forceRefresh) {
            const cached = localStorage.getItem(storageKey);
            // Only use cache if it's not an error message
            if (cached && !cached.startsWith("DEBUG ERROR")) {
                setTip(cached);
                return;
            }
        }

        // Fetch new
        setLoading(true);
        try {
            const result = await generateDailyTip(mode, week, babyName);
            setTip(result);
            localStorage.setItem(storageKey, result);
        } catch (error) {
            console.error("Tip Error", error);
            setTip("Ein guter Tag, um einfach da zu sein.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-3xl relative overflow-hidden border border-amber-100 dark:border-amber-800 transition-all hover:shadow-md group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity duration-500">
                <img src="/mascot/papa_smart.png" alt="Papa Smart" className="w-24 h-24 object-contain filter grayscale group-hover:grayscale-0 transition-all" />
            </div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-white dark:bg-stone-900 p-2.5 rounded-full shadow-sm text-amber-600 dark:text-amber-400">
                        <Lightbulb size={24} className="fill-amber-100 dark:fill-amber-900" />
                    </div>
                    <button
                        onClick={() => loadTip(true)}
                        disabled={loading}
                        className={`p-2 rounded-full hover:bg-amber-100 dark:hover:bg-amber-800 text-amber-600 dark:text-amber-400 transition-all ${loading ? 'animate-spin' : ''}`}
                    >
                        <RefreshCw size={18} />
                    </button>
                </div>

                <h3 className="text-amber-800 dark:text-amber-200 font-bold mb-2 text-sm uppercase tracking-wider">Dein Daily Vibe</h3>

                <div className="min-h-[60px]">
                    {loading ? (
                        <div className="animate-pulse space-y-2">
                            <div className="h-4 bg-amber-200 dark:bg-amber-800 rounded w-3/4"></div>
                            <div className="h-4 bg-amber-200 dark:bg-amber-800 rounded w-1/2"></div>
                        </div>
                    ) : (
                        <p className="text-amber-900 dark:text-amber-100 font-medium text-lg leading-relaxed">
                            "{tip}"
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DailyTipWidget;
