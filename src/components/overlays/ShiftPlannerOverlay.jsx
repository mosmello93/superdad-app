import React, { useState, useEffect } from 'react';
import { X, Clock, Moon, Sun, User, Users, History, PlayCircle, StopCircle, CheckCircle } from 'lucide-react';

const ShiftPlannerOverlay = ({ onClose, activeShift, startShift, endShift, history = [] }) => {
    // Local timer state for display
    const [elapsed, setElapsed] = useState('00:00:00');

    useEffect(() => {
        let interval;
        if (activeShift && activeShift.startTime) {
            interval = setInterval(() => {
                const diff = Date.now() - activeShift.startTime;

                const hours = Math.floor(diff / 3600000);
                const minutes = Math.floor((diff % 3600000) / 60000);
                const seconds = Math.floor((diff % 60000) / 1000);

                setElapsed(
                    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
                );
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [activeShift]);

    const formatDuration = (ms) => {
        if (!ms) return "0min";
        const mins = Math.floor(ms / 60000);
        const hrs = Math.floor(mins / 60);
        if (hrs > 0) return `${hrs}h ${mins % 60}m`;
        return `${mins}m`;
    };

    const formatDate = (ts) => {
        return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#F5F5F0] dark:bg-stone-950 animate-in slide-in-from-bottom duration-500">
            {/* Header */}
            <div className="bg-white dark:bg-stone-900 px-6 pt-12 pb-6 shadow-sm flex items-center justify-between z-10 shrink-0 border-b border-stone-100 dark:border-stone-800">
                <div>
                    <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 font-serif">Schicht-Planer</h2>
                    <p className="text-stone-500 dark:text-stone-400 text-sm">Wer hat gerade Dienst?</p>
                </div>
                <button onClick={onClose} className="bg-stone-100 dark:bg-stone-800 p-2 rounded-full text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 transition">
                    <X size={24} />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 pb-24 space-y-8">

                {/* ACTIVE SHIFT CARD */}
                {activeShift ? (
                    <div className="relative overflow-hidden rounded-[40px] p-8 text-center text-white shadow-2xl transition-all duration-500 bg-gradient-to-br from-indigo-500 to-purple-600">
                        {/* Background Decoration */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                            <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute bottom-[-20px] left-[-20px] w-24 h-24 bg-purple-300 rounded-full blur-2xl"></div>
                        </div>

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-white/10 shadow-lg">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
                                Live Schicht
                            </div>

                            <h2 className="text-6xl font-black font-mono tracking-tighter mb-2 drop-shadow-md">
                                {elapsed}
                            </h2>
                            <p className="text-indigo-100 text-sm mb-8 font-medium opacity-80">Zeit vergeht, Liebe bleibt.</p>

                            <div className="flex justify-center mb-8">
                                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 flex flex-col items-center min-w-[120px]">
                                    <div className="text-4xl mb-2 filter drop-shadow-lg">
                                        {activeShift.person === 'Papa' ? '🧔🏻‍♂️' : '👩🏼'}
                                    </div>
                                    <span className="font-bold text-lg">{activeShift.person}</span>
                                </div>
                            </div>

                            <button
                                onClick={endShift}
                                className="w-full bg-white text-indigo-900 font-bold p-4 rounded-xl hover:bg-indigo-50 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2 group"
                            >
                                <StopCircle size={22} className="text-indigo-600 group-hover:text-red-500 transition-colors" />
                                Schicht beenden
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-stone-900 rounded-[40px] p-8 text-center border border-stone-100 dark:border-stone-800 shadow-sm">
                        <div className="mb-6 inline-flex p-4 bg-stone-50 dark:bg-stone-800 rounded-full text-stone-300 dark:text-stone-600">
                            <Clock size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-stone-700 dark:text-stone-200 mb-2">Bereit für die Schicht?</h3>
                        <p className="text-stone-400 text-sm mb-8 mx-auto max-w-[220px]">
                            Starte den Timer, wenn du übernimmst. Fair Play für mehr Energie!
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => startShift('Papa')}
                                className="group relative bg-[#EFF6FF] dark:bg-indigo-900/20 p-6 rounded-3xl flex flex-col items-center gap-3 hover:shadow-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/40 transition-all active:scale-95 border border-indigo-50 dark:border-indigo-800"
                            >
                                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">🧔🏻‍♂️</span>
                                <span className="font-bold text-indigo-900 dark:text-indigo-200">Papa</span>
                            </button>
                            <button
                                onClick={() => startShift('Mama')}
                                className="group relative bg-[#FFF1F2] dark:bg-rose-900/20 p-6 rounded-3xl flex flex-col items-center gap-3 hover:shadow-lg hover:bg-rose-50 dark:hover:bg-rose-900/40 transition-all active:scale-95 border border-rose-50 dark:border-rose-800"
                            >
                                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">👩🏼</span>
                                <span className="font-bold text-rose-900 dark:text-rose-200">Mama</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* HISTORY */}
                <div className="px-2">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-stone-700 dark:text-stone-300 text-sm uppercase tracking-wide flex items-center gap-2">
                            <History size={16} className="text-stone-400" />
                            Letzte Schichten
                        </h4>
                        <span className="text-xs bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded text-stone-400">Archiv</span>
                    </div>

                    <div className="space-y-3">
                        {history.length === 0 ? (
                            <div className="text-stone-400 text-sm text-center py-8 italic bg-stone-50 dark:bg-stone-900/50 rounded-2xl border border-dashed border-stone-200 dark:border-stone-800">
                                Noch keine Einträge.
                            </div>
                        ) : (
                            history.map((entry, i) => (
                                <div key={i} className="group bg-white dark:bg-stone-900 p-4 rounded-2xl flex justify-between items-center shadow-sm border border-stone-100 dark:border-stone-800 hover:border-indigo-100 dark:hover:border-indigo-900 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner ${entry.person === 'Papa' ? 'bg-indigo-50 dark:bg-indigo-900/20' : 'bg-rose-50 dark:bg-rose-900/20'}`}>
                                            {entry.person === 'Papa' ? '🧔🏻‍♂️' : '👩🏼'}
                                        </div>
                                        <div>
                                            <span className="block font-bold text-stone-800 dark:text-stone-200">{entry.person}</span>
                                            <span className="text-xs text-stone-400 flex items-center gap-1">
                                                <CheckCircle size={10} /> {formatDate(entry.endedAt)} Uhr
                                            </span>
                                        </div>
                                    </div>
                                    <div className="font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1.5 rounded-lg text-sm group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/40 transition-colors">
                                        {formatDuration(entry.duration)}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Info Text */}
                {!activeShift && (
                    <div className="bg-gradient-to-r from-stone-50 to-stone-100 dark:from-stone-900 dark:to-stone-800/50 p-4 rounded-2xl border border-stone-100 dark:border-stone-800">
                        <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed text-center italic">
                            "Geteiltes Leid ist halbes Leid – geteilter Schlaf ist doppelter Gewinn!" 🤝
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShiftPlannerOverlay;
