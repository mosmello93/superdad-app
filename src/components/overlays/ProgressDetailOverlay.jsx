import React, { useState } from 'react';
import { X, Sprout, Ruler, Weight, Baby, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { PREGNANCY_WEEKS } from '../../data/content';
import Baby3DOverlay from './Baby3DOverlay';

const ProgressDetailOverlay = ({ statusData, mode, closeDetail }) => {
    if (!statusData || !statusData.week) return null;

    // Local state for navigation (View "History")
    // Initialized with current actual week (statusData.week). Resets on remount.
    const [viewedWeek, setViewedWeek] = useState(statusData.week);

    // Content depends on the VIEWED week, not the actual week
    const weekContent = PREGNANCY_WEEKS[viewedWeek] || {};

    const [imgError, setImgError] = useState(false);
    const [showBaby3D, setShowBaby3D] = useState(false);

    const handlePrev = (e) => {
        e.stopPropagation();
        if (viewedWeek > 4) setViewedWeek(w => w - 1);
    };

    const handleNext = (e) => {
        e.stopPropagation();
        if (viewedWeek < statusData.week) setViewedWeek(w => w + 1);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm pointer-events-auto animate-in fade-in duration-300" onClick={closeDetail}></div>
            <div className="bg-[#FDFCF8] dark:bg-stone-900 w-full max-w-md h-[85vh] rounded-t-[40px] shadow-2xl overflow-hidden flex flex-col pointer-events-auto relative">
                <button onClick={closeDetail} className="absolute top-6 right-6 bg-white dark:bg-stone-800 p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-700 shadow-sm z-20"><X size={20} className="text-stone-600 dark:text-stone-300" /></button>
                <div className="flex-1 overflow-y-auto pb-8">
                    <div className={`pt-16 pb-10 px-6 flex flex-col items-center text-center relative overflow-hidden ${mode === 'postpartum' ? 'bg-[#EEF2FF] dark:bg-indigo-950' : 'bg-[#F0FDF4] dark:bg-emerald-950'}`}>
                        <div className={`absolute -top-20 -left-20 w-64 h-64 rounded-full blur-3xl ${mode === 'postpartum' ? 'bg-indigo-200/30' : 'bg-emerald-200/30'}`}></div>
                        <div className={`absolute bottom-0 right-0 w-40 h-40 rounded-full blur-3xl ${mode === 'postpartum' ? 'bg-indigo-200/20' : 'bg-emerald-200/20'}`}></div>

                        <div className="relative z-10 transition-all duration-300">
                            {mode === 'postpartum' ? (
                                <div className="w-40 h-40 bg-white dark:bg-indigo-900 rounded-full flex items-center justify-center shadow-lg">
                                    <Baby size={64} className="text-indigo-500 dark:text-indigo-300" />
                                </div>
                            ) : (
                                weekContent.image && !imgError ? (
                                    <img key={viewedWeek} src={weekContent.image} alt={weekContent.size} onError={() => setImgError(true)} className="w-48 h-48 object-contain drop-shadow-2xl transform hover:scale-105 transition duration-500 animate-in zoom-in-50" />
                                ) : (
                                    <div className="w-40 h-40 bg-white dark:bg-emerald-900 rounded-full flex items-center justify-center shadow-lg">
                                        <Sprout size={64} className="text-emerald-500 dark:text-emerald-400" />
                                    </div>
                                )
                            )}
                        </div>

                        <div className="flex items-center gap-4 mt-6 relative z-20">
                            {mode !== 'postpartum' && viewedWeek > 4 && (
                                <button onClick={handlePrev} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-stone-400 hover:text-stone-600 transition-colors">
                                    <ChevronLeft size={24} />
                                </button>
                            )}

                            <h2 className="text-3xl font-bold text-stone-800 dark:text-stone-100 min-w-[200px]">
                                {mode === 'postpartum' ? "Dein Baby" : (weekContent.size ? `So groß wie ${weekContent.size}` : `Woche ${viewedWeek}`)}
                            </h2>

                            {mode !== 'postpartum' && viewedWeek < statusData.week && (
                                <button onClick={handleNext} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-stone-400 hover:text-stone-600 transition-colors">
                                    <ChevronRight size={24} />
                                </button>
                            )}
                        </div>

                        <p className={`font-medium mt-1 ${mode === 'postpartum' ? 'text-indigo-700 dark:text-indigo-300' : 'text-emerald-700 dark:text-emerald-300'}`}>
                            {mode === 'postpartum' ? statusData.label : `SSW ${viewedWeek}`}
                        </p>
                    </div>

                    {mode !== 'postpartum' && (
                        <div className="px-6 -mt-6 relative z-10">
                            <div className="bg-white dark:bg-stone-800 p-4 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700 flex justify-around">
                                <div className="text-center">
                                    <p className="text-xs text-stone-400 dark:text-stone-500 font-bold uppercase tracking-wider mb-1">Größe (ca.)</p>
                                    <div className="flex items-center justify-center text-stone-800 dark:text-stone-200 font-bold text-lg"><Ruler size={18} className="text-emerald-500 dark:text-emerald-400 mr-1.5" />{weekContent.cm || '--'} cm</div>
                                </div>
                                <div className="w-px bg-stone-100 dark:bg-stone-700"></div>
                                <div className="text-center">
                                    <p className="text-xs text-stone-400 dark:text-stone-500 font-bold uppercase tracking-wider mb-1">Gewicht (ca.)</p>
                                    <div className="flex items-center justify-center text-stone-800 dark:text-stone-200 font-bold text-lg"><Weight size={18} className="text-emerald-500 dark:text-emerald-400 mr-1.5" />{weekContent.g || '--'} g</div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="px-6 mt-6 space-y-6">
                        {mode === 'postpartum' ? (
                            <div className="bg-indigo-50 dark:bg-indigo-900/30 p-5 rounded-2xl">
                                <h3 className="text-xs font-bold text-indigo-400 dark:text-indigo-300 uppercase">Kleiner Tipp</h3>
                                <p className="text-stone-700 dark:text-stone-300">Genieße die Kennenlernzeit! Vergiss nicht: Es ist okay, wenn am Anfang nicht alles perfekt läuft. Ihr lernt euch gerade erst kennen.</p>
                            </div>
                        ) : (
                            <>
                                <div><h3 className="text-sm font-bold text-stone-400 dark:text-stone-500 uppercase">Ihr Befinden</h3><p className="text-xl font-bold text-stone-800 dark:text-stone-100">{weekContent.feeling}</p></div>
                                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-5 rounded-2xl"><h3 className="text-xs font-bold text-indigo-400 dark:text-indigo-300 uppercase">Dein Pro-Tipp</h3><p className="text-stone-700 dark:text-stone-300">{weekContent.tip}</p></div>

                                <div className="pt-4 pb-2">
                                    <h3 className="text-sm font-bold text-stone-400 dark:text-stone-500 uppercase mb-3">3D Ansicht (Woche {viewedWeek})</h3>
                                    <div
                                        onClick={() => setShowBaby3D(true)}
                                        className="relative h-48 rounded-2xl overflow-hidden group shadow-md cursor-pointer"
                                    >
                                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent z-10 transition-opacity group-hover:opacity-80"></div>
                                        <img
                                            src={`/images/fetus_3d/week_${[4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40].reduce((prev, curr) => Math.abs(curr - viewedWeek) < Math.abs(prev - viewedWeek) ? curr : prev)}.png`}
                                            alt={`Baby in Woche ${viewedWeek}`}
                                            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute bottom-3 right-4 z-20 flex items-center gap-2 text-white/90 text-xs font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 group-hover:bg-white/20 transition-colors">
                                            <Sparkles size={12} />
                                            <span>Vergrößern</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* 3D Baby Overlay - Pass viewedWeek! */}
            {showBaby3D && (
                <Baby3DOverlay
                    week={viewedWeek}
                    onClose={() => setShowBaby3D(false)}
                />
            )}
        </div>
    );
};

export default ProgressDetailOverlay;
