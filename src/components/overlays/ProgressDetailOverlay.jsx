import React, { useState } from 'react';
import { X, Sprout, Ruler, Weight, Baby, Sparkles, ChevronLeft, ChevronRight, Share2, Eye, EyeOff } from 'lucide-react';
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
    const [showText, setShowText] = useState(true);

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
            {/* Modal Content - Dynamic Height based on content */}
            <div className={`bg-[#FDFCF8] dark:bg-stone-900 w-full max-w-md ${mode === 'loss' ? 'h-auto rounded-[32px] my-auto' : 'h-[85vh] rounded-t-[40px]'} shadow-2xl overflow-hidden flex flex-col pointer-events-auto relative`}>

                <button onClick={closeDetail} className="absolute top-4 right-4 bg-white/50 backdrop-blur-md dark:bg-black/30 p-2 rounded-full hover:bg-white dark:hover:bg-black/50 shadow-sm z-30 transition-colors">
                    <X size={20} className="text-stone-800 dark:text-stone-100" />
                </button>

                {mode === 'loss' ? (
                    // LOSS MODE OVERLAY
                    <div className="relative aspect-square w-full bg-stone-200 dark:bg-stone-800 group">
                        {/* Image */}
                        <img
                            src={`/images/loss_cards/card_${(viewedWeek - 1) % 9 + 1}.${(viewedWeek - 1) % 9 === 8 ? 'jpg' : 'png'}`}
                            alt="In Gedenken"
                            className="w-full h-full object-cover"
                        />

                        {/* Top Gradient - Only visible when text is shown */}
                        {showText && (
                            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/80 to-transparent pointer-events-none transition-opacity duration-500"></div>
                        )}

                        {/* Controls Container (Top Right) */}
                        <div className="absolute top-4 right-14 flex items-center gap-2 z-30">
                            {/* Toggle Text Visibility */}
                            <button
                                onClick={(e) => { e.stopPropagation(); setShowText(!showText); }}
                                className="bg-black/30 backdrop-blur-md p-2 rounded-full hover:bg-black/50 text-white transition-colors"
                                title={showText ? "Text ausblenden" : "Text anzeigen"}
                            >
                                {showText ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>

                            {/* Share Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const text = `In stillem Gedenken an ${statusData.babyName || 'unser Sternenkind'}.`;
                                    if (navigator.share) {
                                        navigator.share({
                                            title: 'Gedenken',
                                            text: text,
                                            url: window.location.href
                                        }).catch(console.error);
                                    } else {
                                        // Fallback: Copy Image URL or just Text
                                        alert("Link in die Zwischenablage kopiert (Teilen wird auf diesem Gerät nicht unterstützt).");
                                    }
                                }}
                                className="bg-black/30 backdrop-blur-md p-2 rounded-full hover:bg-black/50 text-white transition-colors"
                                title="Karte teilen"
                            >
                                <Share2 size={20} />
                            </button>
                        </div>

                        {/* Navigation Arrows */}
                        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                            {viewedWeek > 1 ? (
                                <button onClick={handlePrev} className={`pointer-events-auto p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all ${showText ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                    <ChevronLeft size={24} />
                                </button>
                            ) : <div />}

                            {viewedWeek < statusData.week ? (
                                <button onClick={handleNext} className={`pointer-events-auto p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all ${showText ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                    <ChevronRight size={24} />
                                </button>
                            ) : <div />}
                        </div>

                        {/* Text Content - Toggled */}
                        <div className={`absolute top-6 left-6 right-24 text-white z-20 pointer-events-none transition-opacity duration-500 ${showText ? 'opacity-100' : 'opacity-0'}`}>
                            <h2 className="text-2xl font-bold font-serif italic mb-1 shadow-sm">
                                {statusData.label.includes('Sternenkind') ? (statusData.babyName || 'Dein Sternenkind') : statusData.label}
                            </h2>
                            <p className="text-white/80 font-medium text-sm shadow-sm">
                                Woche {viewedWeek}
                            </p>
                        </div>

                        {/* Share Hint - Only if text is shown */}
                        {showText && (
                            <div className="absolute bottom-4 inset-x-0 text-center pointer-events-none">
                                <p className="text-white/40 text-[10px] uppercase tracking-widest font-medium">Teile diesen Moment mit deiner Familie</p>
                            </div>
                        )}
                    </div>
                ) : (
                    // PREGNANCY / POSTPARTUM MODE (Original Content)
                    <div className="flex-1 overflow-y-auto pb-8">
                        <div className={`pt-16 pb-10 px-6 flex flex-col items-center text-center relative overflow-hidden ${mode === 'postpartum' ? 'bg-[#EEF2FF] dark:bg-indigo-950' : 'bg-[#F0FDF4] dark:bg-emerald-950'}`}>
                            {/* Background Blobs */}
                            <div className={`absolute -top-20 -left-20 w-64 h-64 rounded-full blur-3xl ${mode === 'postpartum' ? 'bg-indigo-200/30' : 'bg-emerald-200/30'}`}></div>
                            <div className={`absolute bottom-0 right-0 w-40 h-40 rounded-full blur-3xl ${mode === 'postpartum' ? 'bg-indigo-200/20' : 'bg-emerald-200/20'}`}></div>

                            <div className="relative z-10 transition-all duration-300">
                                {mode === 'postpartum' ? (
                                    <div className="w-56 h-56 flex items-center justify-center">
                                        <img src="/mascot/papa_holding_baby.png" alt="Papa und Baby" className="w-full h-full object-contain drop-shadow-2xl animate-in zoom-in-50" />
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
                                                src={`/images/fetus_3d/week_${Math.max(4, Math.min(viewedWeek, 41))}.png`}
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
                )}
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
