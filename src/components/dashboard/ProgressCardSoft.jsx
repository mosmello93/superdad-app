import React, { useState, useEffect } from 'react';
import { Baby, ChevronRight, Droplet } from 'lucide-react';
import { PREGNANCY_WEEKS, POSTPARTUM_WEEKS } from '../../data/content';

const ProgressCardSoft = ({ statusData, mode, openDetail, onUpdateCycle, onSwitchToKnowledge }) => {
    let sizeInfo = null;
    let imageUrl = null;

    // Dynamic styles based on mode
    let bgClass = "bg-[#F0FDF4] dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800"; // default pregnancy
    let textClass = "text-emerald-800 dark:text-emerald-200";
    let subTextClass = "text-emerald-600 dark:text-emerald-400";
    let badgeClass = "bg-white/60 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300";

    // Dismissal State for "No" answer
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        const dismissedDate = localStorage.getItem('period_dismiss_date');
        const today = new Date().toISOString().split('T')[0];

        if (dismissedDate === today) {
            setIsDismissed(true);
        } else {
            setIsDismissed(false);
        }
    }, [statusData.week]); // Re-check periodically or on week change

    // Quick Cycle Reset Handler
    const handleQuickCycleReset = (e) => {
        // ... (kept for compatibility, though unused in new UI)
        e.stopPropagation();
        if (confirm("Hat deine Periode heute begonnen? Der Zyklus wird neu gestartet.")) {
            if (onUpdateCycle) {
                const today = new Date().toISOString().split('T')[0];
                onUpdateCycle({ date: today });
            }
        }
    };

    // Load Postpartum Data
    if (mode === 'postpartum' && statusData.week !== undefined) {
        bgClass = "bg-[#EEF2FF] dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800";
        textClass = "text-indigo-900 dark:text-indigo-100";
        subTextClass = "text-indigo-600 dark:text-indigo-400";
        badgeClass = "bg-white/60 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300";

        const weekData = POSTPARTUM_WEEKS[statusData.week];
        if (weekData) {
            // Override with rich data
            statusData.label = weekData.title; // e.g. "Baby-Blues"
            sizeInfo = weekData.baby.summary;  // e.g. "Nabelschnurrest fällt ab..."
            imageUrl = "/mascot/papa_holding_baby.png";
        }
    } else if (mode === 'loss') {
        bgClass = "bg-[#E5E5E0] dark:bg-stone-800/40 border-stone-200 dark:border-stone-700";
        textClass = "text-stone-800 dark:text-stone-200";
        subTextClass = "text-stone-600 dark:text-stone-400";
        badgeClass = "bg-white/60 dark:bg-stone-900/40 text-stone-700 dark:text-stone-300";
    } else if (mode === 'conception') {
        bgClass = "bg-sky-50 dark:bg-sky-900/10 border-sky-100 dark:border-sky-900/30";
        textClass = "text-sky-900 dark:text-sky-100";
        subTextClass = "text-sky-700 dark:text-sky-300";
        badgeClass = "bg-white/60 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300";

        // Conception specific data
        imageUrl = "/mascot/papa_neutral.png";

        // Phase specific text
        if (statusData.phase === 'menstruation') sizeInfo = "Neustart. Sei für sie da.";
        if (statusData.phase === 'follicular') sizeInfo = "Energie tanken & fit werden.";
        if (statusData.phase === 'fertile') sizeInfo = "Fruchtbare Tage! ❤️";
        if (statusData.phase === 'luteal') sizeInfo = "Warten & Ablenken.";
    }

    if (mode === 'pregnancy' && statusData.week && PREGNANCY_WEEKS[statusData.week]) {
        const weekData = PREGNANCY_WEEKS[statusData.week];
        sizeInfo = `So groß wie ${weekData.size}`;
        imageUrl = weekData.image; // Should point to /images/fruit.png
    }

    // CONCEPTION SPECIAL RENDER (With Overdue Check)
    if (mode === 'conception') {
        const isOverdue = statusData.week > (statusData.cycleLength || 28);

        return (
            <div onClick={openDetail} className={`col-span-2 ${bgClass} p-6 rounded-[32px] relative overflow-hidden transition-all hover:shadow-md cursor-pointer group border`}>
                {/* Background Decor */}
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-48 h-48 bg-white/40 dark:bg-white/5 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

                <div className="relative z-10 flex justify-between items-start h-full">
                    <div className="flex flex-col justify-between h-full min-h-[140px]">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${badgeClass}`}>
                                    {mode === 'conception' ? `Tag ${statusData.week}` : (mode === 'postpartum' ? 'Woche' : 'SSW') + ' ' + (statusData.week || '?')}
                                </span>
                                {isOverdue && (
                                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-100 text-red-600 animate-pulse">
                                        Überfällig
                                    </span>
                                )}
                            </div>
                            <h2 className={`text-3xl font-bold mb-1 leading-tight ${textClass}`}>
                                {statusData.label}
                            </h2>
                            {sizeInfo && (
                                <p className={`font-medium text-lg ${subTextClass} leading-snug mt-2 max-w-[200px]`}>
                                    {sizeInfo}
                                </p>
                            )}
                        </div>

                        {/* OVERDUE ACTION BUTTONS */}
                        {isOverdue && !isDismissed ? (
                            <div className="mt-4 bg-white/90 dark:bg-stone-800/90 backdrop-blur-sm p-3 rounded-2xl shadow-sm border border-red-100 dark:border-red-900/50">
                                <p className="text-xs font-bold text-stone-600 dark:text-stone-300 mb-2 uppercase tracking-wide">Periode gestartet?</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (onUpdateCycle) {
                                                const today = new Date().toISOString().split('T')[0];
                                                onUpdateCycle({ date: today });
                                            }
                                        }}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                                    >
                                        Ja
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Dismiss for rest of today
                                            const today = new Date().toISOString().split('T')[0];
                                            localStorage.setItem('period_dismiss_date', today);
                                            setIsDismissed(true);
                                        }}
                                        className="bg-stone-200 hover:bg-stone-300 dark:bg-stone-700 dark:hover:bg-stone-600 text-stone-600 dark:text-stone-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                                    >
                                        Nein, noch nicht
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className={`mt-4 flex items-center text-sm font-bold ${subTextClass} group-hover:translate-x-1 transition-transform`}>
                                Details ansehen <ChevronRight size={16} className="ml-1" />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col justify-center items-center pt-2">
                        {imageUrl ? (
                            <div className="relative w-28 h-28 flex items-center justify-center">
                                <div className="absolute inset-0 bg-white/30 dark:bg-white/5 rounded-full blur-xl transform group-hover:scale-110 transition-transform duration-500"></div>
                                <img src={imageUrl} alt="Baby state" className="w-full h-full object-contain relative z-10 drop-shadow-sm transform group-hover:scale-105 transition-transform duration-300" />
                            </div>
                        ) : (
                            <div className="w-24 h-24 bg-white/50 dark:bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm shadow-sm group-hover:scale-105 transition-transform">
                                <Baby size={48} className={subTextClass} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (mode === 'loss') {
        const babyNameDisplay = statusData.label.includes('Sternenkind') ? (statusData.babyName || 'Dein Sternenkind') : statusData.label;

        return (
            <div onClick={openDetail} className={`col-span-2 ${bgClass} p-6 rounded-[32px] relative overflow-hidden transition-all hover:shadow-md cursor-pointer group border`}>
                {/* Candle / Memorial Background */}
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-48 h-48 bg-stone-200/50 dark:bg-stone-700/50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

                <div className="relative z-10 flex justify-between items-center h-full min-h-[140px]">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${badgeClass}`}>
                                In Gedenken
                            </span>
                        </div>
                        <h2 className={`text-3xl font-bold mb-1 leading-tight ${textClass} font-serif italic`}>
                            {babyNameDisplay}
                        </h2>
                        <p className={`font-medium text-sm ${subTextClass} mt-2`}>
                            Für immer im Herzen.
                        </p>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                        <div className="w-24 h-24 bg-white/50 dark:bg-stone-900/10 rounded-full flex items-center justify-center backdrop-blur-sm shadow-sm overflow-hidden">
                            {/* Image Preview instead of Icon */}
                            <img
                                src={`/images/loss_cards/card_${((statusData.week || 1) - 1) % 9 + 1}.${((statusData.week || 1) - 1) % 9 === 8 ? 'jpg' : 'png'}`}
                                alt="Gedenken Preview"
                                className="w-full h-full object-cover opacity-80"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Default Rendering (Pregnancy/Postpartum)
    return (
        <div onClick={openDetail} className={`col-span-2 ${bgClass} p-6 rounded-[32px] relative overflow-hidden transition-all hover:shadow-md cursor-pointer group border`}>
            {/* Background Decor */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-48 h-48 bg-white/40 dark:bg-white/5 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

            <div className="relative z-10 flex justify-between items-start h-full">
                <div className="flex flex-col justify-between h-full min-h-[140px]">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${badgeClass}`}>
                                {mode === 'postpartum' ? 'Woche' : mode === 'conception' ? 'Tag' : 'SSW'} {statusData.week || '?'}
                            </span>
                        </div>
                        <h2 className={`text-3xl font-bold mb-1 leading-tight ${textClass}`}>
                            {statusData.label}
                        </h2>
                        {sizeInfo && (
                            <p className={`font-medium text-lg ${subTextClass} leading-snug mt-2 max-w-[200px]`}>
                                {sizeInfo}
                            </p>
                        )}
                    </div>

                    <div
                        onClick={(e) => { e.stopPropagation(); onSwitchToKnowledge(); }}
                        className={`mt-4 flex items-center text-sm font-bold ${subTextClass} cursor-pointer hover:bg-white/30 dark:hover:bg-black/20 w-fit px-3 py-1.5 rounded-xl transition-all`}
                    >
                        Wochenvergleich <ChevronRight size={16} className="ml-1" />
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center pt-2">
                    {imageUrl ? (
                        <div className="relative w-28 h-28 flex items-center justify-center">
                            <div className="absolute inset-0 bg-white/30 dark:bg-white/5 rounded-full blur-xl transform group-hover:scale-110 transition-transform duration-500"></div>
                            <img src={imageUrl} alt="Baby state" className="w-full h-full object-contain relative z-10 drop-shadow-sm transform group-hover:scale-105 transition-transform duration-300" />
                        </div>
                    ) : (
                        <div className="w-24 h-24 bg-white/50 dark:bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm shadow-sm group-hover:scale-105 transition-transform">
                            <Baby size={48} className={subTextClass} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProgressCardSoft;
