import React, { useState } from 'react';
import { X, Sprout, Ruler, Weight, Baby, Sparkles, ChevronLeft, ChevronRight, Share2, Eye, EyeOff, Activity, Calendar as CalendarIcon, Settings2, Save, Droplet, Check, List, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PREGNANCY_WEEKS } from '../../data/content';
import Baby3DOverlay from './Baby3DOverlay';
import CycleTimeline from '../dashboard/CycleTimeline';
import PregnancyTimeline from '../dashboard/PregnancyTimeline'; // New Import
import CycleCalendar from '../dashboard/CycleCalendar';

const ProgressDetailOverlay = ({ statusData, mode, closeDetail, onUpdateCycle, dueDate }) => {
    if (!statusData || !statusData.week) return null;

    // Local state for navigation (View "History")
    // Initialized with current actual week (statusData.week). Resets on remount.
    const [viewedWeek, setViewedWeek] = useState(statusData.week);
    const [viewMode, setViewMode] = useState('timeline'); // 'timeline' or 'calendar'

    // Cycle Editing State
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        date: dueDate || '',
        cycleLength: statusData.cycleLength || 28,
        periodLength: statusData.periodLength || 5
    });

    // Content depends on the VIEWED week, not the actual week
    const weekContent = PREGNANCY_WEEKS[viewedWeek] || {};

    const [imgError, setImgError] = useState(false);
    const [showBaby3D, setShowBaby3D] = useState(false);
    const [showTimeline, setShowTimeline] = useState(true); // Default to Timeline View
    const [showText, setShowText] = useState(true);
    const [isDismissed, setIsDismissed] = useState(() => {
        const dismissedDate = localStorage.getItem('period_dismiss_date');
        const today = new Date().toISOString().split('T')[0];
        return dismissedDate === today;
    });

    const handlePrev = (e) => {
        e.stopPropagation();
        if (viewedWeek > 4) setViewedWeek(w => w - 1);
    };

    const handleNext = (e) => {
        e.stopPropagation();
        if (viewedWeek < 42) setViewedWeek(w => w + 1);
    };

    const handleStartNewCycle = () => {
        if (confirm("Startet deine Periode heute neu?")) {
            const today = new Date().toISOString().split('T')[0];
            onUpdateCycle({ date: today });
            closeDetail(); // Close overlay to refresh/reset view context
        }
    };

    const handlePeriodEndCheck = (isOver) => {
        if (isOver) {
            // User says "Yes, it is over"
            // If the current day is still counted as period (red), we need to end it 'yesterday'.
            if (statusData.week <= statusData.periodLength) {
                const newLength = Math.max(1, statusData.week - 1);
                onUpdateCycle({ periodLength: newLength });
            }
            // Force dismiss merely for UI feedback
            setIsDismissed(true);
        } else {
            // User says "No, still bleeding"
            // Dismiss prompt for rest of today
            const today = new Date().toISOString().split('T')[0];
            localStorage.setItem('period_dismiss_date', today);
            setIsDismissed(true);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm pointer-events-auto animate-in fade-in duration-300" onClick={closeDetail}></div>
            {/* Modal Content - Dynamic Height based on content */}
            <div className={`bg-[#FDFCF8] dark:bg-stone-900 w-full max-w-md ${mode === 'loss' ? 'h-auto rounded-[32px] my-auto' : 'h-[85vh] rounded-t-[40px]'} shadow-2xl overflow-hidden flex flex-col pointer-events-auto relative`}>

                <button onClick={closeDetail} className="absolute top-4 right-4 bg-white/50 backdrop-blur-md dark:bg-black/30 p-2 rounded-full hover:bg-white dark:hover:bg-black/50 shadow-sm z-30 transition-colors">
                    <X size={20} className="text-stone-800 dark:text-stone-100" />
                </button>

                {/* New Cycle Button (Droplet) - Prominent in Header */}
                {mode === 'conception' && !isEditing && (
                    <button
                        onClick={handleStartNewCycle}
                        className="absolute top-4 right-28 bg-red-500/10 backdrop-blur-md p-2 rounded-full hover:bg-red-500 hover:text-white shadow-sm z-30 transition-all text-red-500 border border-red-200"
                        title="Periode hat heute begonnen"
                    >
                        <Droplet size={20} className="fill-current" />
                    </button>
                )}

                {/* Edit Cycle Button (Top-Right, left of Close) */}
                {mode === 'conception' && !isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="absolute top-4 right-14 bg-white/50 backdrop-blur-md dark:bg-black/30 p-2 rounded-full hover:bg-white dark:hover:bg-black/50 shadow-sm z-30 transition-colors text-stone-600 dark:text-stone-300"
                    >
                        <Settings2 size={20} />
                    </button>
                )}

                {/* Toggle Button (Absolute Top-Left) */}
                {mode === 'conception' && (
                    <button
                        onClick={(e) => { e.stopPropagation(); setViewMode(v => v === 'timeline' ? 'calendar' : 'timeline'); }}
                        className="absolute top-4 left-4 z-30 bg-white/50 dark:bg-black/30 backdrop-blur-md p-2 rounded-full shadow-sm hover:bg-white dark:hover:bg-black/50 transition-all text-stone-500 dark:text-stone-300 flex items-center gap-2 px-3"
                    >
                        {viewMode === 'timeline' ? (
                            <>
                                <CalendarIcon size={18} />
                                <span className="text-xs uppercase tracking-wider font-bold hidden sm:inline">Kalender</span>
                            </>
                        ) : (
                            <>
                                <Activity size={18} />
                                <span className="text-xs uppercase tracking-wider font-bold hidden sm:inline">Zeitstrahl</span>
                            </>
                        )}
                    </button>
                )}

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
                ) : mode === 'conception' ? (
                    // CONCEPTION MODE
                    <div className="flex-1 flex flex-col overflow-hidden relative">

                        {/* Period End Check Banner - Only around end of period */}
                        {statusData.phase === 'menstruation' && !isDismissed && statusData.week >= (statusData.periodLength - 1) && (
                            <div className="absolute top-20 left-6 right-6 z-20 bg-white dark:bg-stone-800 p-3 rounded-2xl shadow-lg border border-red-100 dark:border-red-900/30 flex items-center justify-between animate-in slide-in-from-top-4 duration-500">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center">
                                        <Droplet size={16} />
                                    </div>
                                    <span className="text-sm font-bold text-stone-700 dark:text-stone-300">Periode vorbei?</span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handlePeriodEndCheck(false)}
                                        className="px-3 py-1.5 rounded-lg bg-stone-100 text-stone-600 text-xs font-bold hover:bg-stone-200"
                                    >
                                        Nein
                                    </button>
                                    <button
                                        onClick={() => handlePeriodEndCheck(true)}
                                        className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-bold hover:bg-red-600 flex items-center gap-1"
                                    >
                                        <Check size={12} /> Ja
                                    </button>
                                </div>
                            </div>
                        )}
                        {/* EDIT OVERLAY */}
                        {isEditing && (
                            <div className="absolute inset-0 z-40 bg-[#FDFCF8] dark:bg-stone-900 animate-in fade-in slide-in-from-bottom-10 p-6 flex flex-col">
                                <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-6 mt-12">Zyklus bearbeiten</h2>

                                <div className="space-y-6 flex-1">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-stone-500 uppercase tracking-wider">Erster Tag der letzten Periode</label>
                                        <input
                                            type="date"
                                            value={editForm.date}
                                            onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                                            className="w-full bg-white dark:bg-stone-800 p-4 rounded-xl border border-stone-200 dark:border-stone-700 text-lg font-bold outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-stone-500 uppercase tracking-wider">Zykluslänge (Tage)</label>
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="range" min="20" max="45"
                                                value={editForm.cycleLength}
                                                onChange={(e) => setEditForm({ ...editForm, cycleLength: parseInt(e.target.value) })}
                                                className="flex-1 accent-red-500"
                                            />
                                            <span className="text-xl font-bold w-12 text-center">{editForm.cycleLength}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-stone-500 uppercase tracking-wider">Periodendauer (Tage)</label>
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="range" min="2" max="10"
                                                value={editForm.periodLength}
                                                onChange={(e) => setEditForm({ ...editForm, periodLength: parseInt(e.target.value) })}
                                                className="flex-1 accent-red-500"
                                            />
                                            <span className="text-xl font-bold w-12 text-center">{editForm.periodLength}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-4">
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="flex-1 py-4 rounded-xl font-bold text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                                    >
                                        Abbrechen
                                    </button>
                                    <button
                                        onClick={() => {
                                            // onUpdateCycle implementation needed in parent
                                            if (onUpdateCycle) onUpdateCycle(editForm);
                                            setIsEditing(false);
                                        }}
                                        className="flex-1 bg-red-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-red-200 dark:shadow-none hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Save size={20} />
                                        Speichern
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="pt-10 pb-6 px-6 flex-1 flex flex-col items-center text-center relative overflow-hidden bg-sky-50 dark:bg-sky-900/30">
                            {/* Background Blobs */}
                            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full blur-3xl bg-sky-200/40 dark:bg-sky-800/20"></div>



                            <div className="relative z-10 w-full flex-1 flex flex-col min-h-0">
                                {viewMode === 'timeline' ? (
                                    <CycleTimeline
                                        currentDay={statusData.week}
                                        cycleLength={statusData.cycleLength || 28}
                                        periodLength={statusData.periodLength || 5}
                                        phase={statusData.phase}
                                    />
                                ) : (
                                    <CycleCalendar
                                        currentDay={statusData.week}
                                        cycleLength={statusData.cycleLength || 28}
                                        periodLength={statusData.periodLength || 5}
                                    />
                                )}
                            </div>
                        </div>
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
                                    /* PREGNANCY VISUALIZATION: SINGLE vs TIMELINE */
                                    <div className="w-full h-[22rem] flex flex-col items-center justify-center relative">

                                        {!showTimeline ? (
                                            /* SINGLE FRUIT VIEW (Default) */
                                            <div className="w-full h-full flex flex-col items-center justify-center relative animate-in fade-in zoom-in-50 duration-500">
                                                {/* Background Glow */}
                                                <div className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-400/10 blur-3xl rounded-full scale-150 pointer-events-none"></div>

                                                {/* Fruit Image - Perfectly Centered */}
                                                <div className="w-56 h-56 relative z-10 filter drop-shadow-xl transition-transform duration-500 hover:scale-105 cursor-pointer pb-8" onClick={() => setShowTimeline(true)}>
                                                    {weekContent.image ? (
                                                        <img src={weekContent.image} alt="Baby Fruit" className="w-full h-full object-contain" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-stone-100 rounded-full text-4xl">?</div>
                                                    )}
                                                </div>

                                                {/* Comparison Toggle Button - Absolute Bottom */}
                                                <button
                                                    onClick={() => setShowTimeline(true)}
                                                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 rounded-full shadow-md border border-stone-200 dark:border-stone-700 text-sm font-bold hover:scale-105 hover:shadow-lg transition-all z-20"
                                                >
                                                    <List size={18} />
                                                    Wochenvergleich
                                                </button>
                                            </div>
                                        ) : (
                                            /* TIMELINE VIEW (Comparison) */
                                            <>
                                                <PregnancyTimeline
                                                    currentWeek={viewedWeek}
                                                    realCurrentWeek={statusData.week}
                                                    onWeekChange={setViewedWeek}
                                                />
                                                <button
                                                    onClick={() => setShowTimeline(false)}
                                                    className="absolute top-4 right-8 z-30 p-2 bg-white/80 dark:bg-stone-800/80 backdrop-blur rounded-full text-stone-500 hover:text-stone-800 transition-all shadow-sm border border-stone-100"
                                                    title="Zurück zur Einzelansicht"
                                                >
                                                    <X size={18} />
                                                </button>
                                            </>
                                        )}
                                    </div>
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

                                {mode !== 'postpartum' && viewedWeek < 42 && (
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
                                        <p className="text-xs text-stone-400 dark:text-stone-500 font-bold uppercase tracking-wider mb-1">
                                            Größe ({viewedWeek < 20 ? 'Scheitel-Steiß-Länge' : 'Scheitel-Fersen-Länge'})
                                        </p>
                                        <div className="flex items-center justify-center text-stone-800 dark:text-stone-200 font-bold text-lg" title={viewedWeek < 20 ? "Scheitel-Steiß-Länge" : "Scheitel-Fersen-Länge"}>
                                            <Ruler size={18} className="text-emerald-500 dark:text-emerald-400 mr-1.5" />
                                            {weekContent.cm || '--'} cm
                                        </div>
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
                                                src={`/images/fetus_3d/SSW${Math.max(4, Math.min(viewedWeek, 41))}.png`}
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

                {/* 3D Baby Overlay - Pass viewedWeek! */}
                {showBaby3D && (
                    <Baby3DOverlay
                        week={viewedWeek}
                        onClose={() => setShowBaby3D(false)}
                    />
                )}
            </div>
        </div >
    );
};

export default ProgressDetailOverlay;
