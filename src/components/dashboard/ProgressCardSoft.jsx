import React, { useState, useEffect } from 'react';
import { Baby, ChevronRight } from 'lucide-react';
import { PREGNANCY_WEEKS } from '../../data/content';

const ProgressCardSoft = ({ statusData, mode, openDetail }) => {
    let sizeInfo = null;
    let imageUrl = null;

    // Dynamic styles based on mode
    let bgClass = "bg-[#F0FDF4] dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800"; // default pregnancy
    let textClass = "text-emerald-800 dark:text-emerald-200";
    let subTextClass = "text-emerald-600 dark:text-emerald-400";
    let badgeClass = "bg-white/60 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300";

    if (mode === 'postpartum') {
        bgClass = "bg-[#EEF2FF] dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800";
        textClass = "text-indigo-800 dark:text-indigo-200";
        subTextClass = "text-indigo-600 dark:text-indigo-400";
        badgeClass = "bg-white/60 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300";
    } else if (mode === 'loss') {
        bgClass = "bg-[#E5E5E0] dark:bg-stone-800/40 border-stone-200 dark:border-stone-700";
        textClass = "text-stone-800 dark:text-stone-200";
        subTextClass = "text-stone-600 dark:text-stone-400";
        badgeClass = "bg-white/60 dark:bg-stone-900/40 text-stone-700 dark:text-stone-300";
    }

    if (mode === 'pregnancy' && statusData.week && PREGNANCY_WEEKS[statusData.week]) {
        const weekData = PREGNANCY_WEEKS[statusData.week];
        sizeInfo = `So groß wie ${weekData.size}`;
        imageUrl = weekData.image;
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
                                {mode === 'postpartum' ? 'Woche' : 'SSW'} {statusData.week || '?'}
                            </span>
                        </div>
                        <h2 className={`text-3xl font-bold mb-1 leading-tight ${textClass}`}>
                            {statusData.label}
                        </h2>
                        {sizeInfo && (
                            <p className={`font-medium text-lg ${subTextClass}`}>
                                {sizeInfo}
                            </p>
                        )}
                    </div>

                    <div className={`mt-4 flex items-center text-sm font-bold ${subTextClass} group-hover:translate-x-1 transition-transform`}>
                        Details ansehen <ChevronRight size={16} className="ml-1" />
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center pt-2">
                    {imageUrl ? (
                        <div className="relative w-28 h-28 flex items-center justify-center">
                            <div className="absolute inset-0 bg-white/30 dark:bg-white/5 rounded-full blur-xl transform group-hover:scale-110 transition-transform duration-500"></div>
                            <img src={imageUrl} alt="Baby size" className="w-24 h-24 object-contain relative z-10 drop-shadow-sm transform group-hover:scale-105 transition-transform duration-300" />
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
