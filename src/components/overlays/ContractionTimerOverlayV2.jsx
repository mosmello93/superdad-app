import React, { useState, useEffect } from 'react';
import { X, Play, Square, Activity, Trash2, History, Phone } from 'lucide-react';

const ContractionTimerOverlayV2 = ({ onClose, contacts = {} }) => {
    // V2: Rewritten for stability and immediate updates
    const [isActive, setIsActive] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [contractions, setContractions] = useState(() => {
        try {
            const saved = localStorage.getItem('superdad_contractions');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    });
    const [elapsed, setElapsed] = useState(0);

    // Persistence
    useEffect(() => {
        localStorage.setItem('superdad_contractions', JSON.stringify(contractions));
    }, [contractions]);

    // Timer Logic
    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setElapsed(Date.now() - startTime);
            }, 1000);
        } else if (!isActive && startTime !== null) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, startTime]);

    const toggleTimer = () => {
        if (!isActive) {
            setStartTime(Date.now());
            setIsActive(true);
            setElapsed(0);
        } else {
            const endTime = Date.now();
            const duration = endTime - startTime;

            // Calculate distance relative to the START of the PREVIOUS contraction
            // (Standard medical definition: Start-to-Start)
            let distance = 0;
            if (contractions.length > 0) {
                distance = startTime - contractions[0].start;
            }

            const newContraction = {
                id: Date.now(),
                start: startTime,
                end: endTime,
                duration: duration,
                distance: distance
            };

            setContractions([newContraction, ...contractions]);
            setIsActive(false);
            setStartTime(null);
            setElapsed(0);
        }
    };

    const clearHistory = () => {
        if (window.confirm("Wirklich gesamten Verlauf löschen?")) {
            setContractions([]);
        }
    };

    const deleteContraction = (id) => {
        const updated = contractions.filter(c => c.id !== id);
        setContractions(updated);
    };

    // Formatters
    const formatTime = (ms) => {
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / 1000 / 60) % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const formatDistance = (ms) => {
        if (!ms || ms <= 0) return "-";
        const minutes = Math.floor(ms / 1000 / 60);
        return `${minutes} min`;
    };

    // Analysis Rule (5-1-1)
    const analyze = () => {
        if (contractions.length < 3) return { text: "Zeichne erst ein paar Wehen auf...", color: "text-stone-400 dark:text-stone-500", action: null };

        const last3 = contractions.slice(0, 3);
        const avgDist = last3.reduce((acc, c) => acc + c.distance, 0) / 3;
        const avgDur = last3.reduce((acc, c) => acc + c.duration, 0) / 3;

        const avgDistMin = avgDist / 1000 / 60; // Minutes
        const avgDurSec = avgDur / 1000;        // Seconds

        // Rule: Frequency < 6 min AND Duration > 45s (Approximating 5-1-1)
        if (avgDistMin > 0 && avgDistMin < 6 && avgDurSec > 45) {
            let action = null;
            if (contacts.midwifePhone) action = { label: "Hebamme anrufen", phone: contacts.midwifePhone, subtle: "Hebamme" };
            else if (contacts.doctorPhone) action = { label: "Kreißsaal anrufen", phone: contacts.doctorPhone, subtle: "Klinik" };
            else if (contacts.taxiPhone) action = { label: "Support anrufen", phone: contacts.taxiPhone, subtle: "Taxi/Support" };
            else action = { label: "Notruf 112", phone: "112", subtle: "Notruf" };

            return {
                text: "Hohe Intensität! (5-1-1 Regel)",
                color: "text-red-600 dark:text-red-400 font-bold animate-pulse",
                action
            };
        }
        if (avgDistMin > 0 && avgDistMin < 10) {
            return { text: "Es wird intensiver. Atmen.", color: "text-amber-600 dark:text-amber-400 font-medium", action: null };
        }
        return { text: "Alles entspannt. Kräfte sammeln.", color: "text-emerald-600 dark:text-emerald-400", action: null };
    };

    const status = analyze();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/95 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-white dark:bg-stone-900 w-full max-w-md h-[85vh] rounded-[40px] shadow-2xl flex flex-col relative overflow-hidden ring-1 ring-stone-900/5">

                {/* HEADER */}
                <div className="p-6 pb-2 flex justify-between items-center z-10 bg-white dark:bg-stone-900 shrink-0">
                    <div>
                        <h2 className="text-2xl font-black text-stone-800 dark:text-stone-100 font-display tracking-tight">Wehen-Timer</h2>
                        <p className="text-xs text-stone-400 font-medium">Bereit für den Ernstfall.</p>
                    </div>
                    <button onClick={onClose} className="p-3 bg-stone-100 dark:bg-stone-800 rounded-full hover:bg-rose-100 dark:hover:bg-stone-700 hover:text-rose-600 transition-colors">
                        <X size={20} className="text-stone-600 dark:text-stone-300" />
                    </button>
                </div>

                {/* STATUS & ACTION */}
                <div className="px-6 py-2 z-10 space-y-3 shrink-0">
                    <div className={`rounded-2xl p-4 flex items-center gap-3 border transition-colors duration-500 ${status.action ? 'bg-red-50 border-red-100 dark:bg-red-900/20 dark:border-red-900/50' : 'bg-stone-50 border-stone-100 dark:bg-stone-800/50 dark:border-stone-800'}`}>
                        <div className={`p-2 rounded-full ${status.action ? 'bg-red-100 text-red-600' : 'bg-white dark:bg-stone-700 text-stone-400'}`}>
                            <Activity size={20} />
                        </div>
                        <p className={`text-sm flex-1 ${status.color}`}>{status.text}</p>
                    </div>

                    {status.action && (
                        <a href={`tel:${status.action.phone}`} className="w-full bg-red-600 hover:bg-red-700 text-white p-4 rounded-2xl flex items-center justify-center gap-3 font-bold shadow-lg shadow-red-600/20 animate-bounce-subtle transition-transform active:scale-95">
                            <Phone size={24} />
                            <span>{status.action.label}</span>
                        </a>
                    )}
                </div>

                {/* TIMER BUTTON */}
                <div className="flex-1 flex flex-col items-center justify-center p-4 relative min-h-0">
                    <div className="mb-4 text-center relative z-10">
                        <span className="inline-block px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">
                            Aktuelle Wehe
                        </span>
                        <div className={`text-6xl font-bold font-variant-numeric tabular-nums tracking-tighter ${isActive ? 'text-stone-800 dark:text-stone-100' : 'text-stone-300 dark:text-stone-700'}`}>
                            {formatTime(isActive ? elapsed : (contractions[0]?.duration || 0))}
                        </div>
                    </div>

                    <button
                        onClick={toggleTimer}
                        className={`w-32 h-32 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 transform active:scale-90 z-10 border-[6px] ${isActive
                            ? 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-600 text-stone-800 dark:text-stone-100 shadow-inner'
                            : 'bg-gradient-to-br from-rose-500 to-rose-600 border-white dark:border-stone-900 text-white shadow-rose-500/40 hover:shadow-rose-500/60 hover:scale-105'}`}
                    >
                        {isActive ? (
                            <div className="flex flex-col items-center">
                                <Square size={32} fill="currentColor" />
                                <span className="mt-1 font-bold text-xs">STOPP</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center pl-1">
                                <Play size={36} fill="currentColor" />
                                <span className="mt-1 font-bold text-xs">START</span>
                            </div>
                        )}
                    </button>
                </div>

                {/* HISTORY */}
                <div className="flex-1 min-h-0 bg-stone-50 dark:bg-stone-950/80 rounded-t-[32px] p-6 pb-2 flex flex-col z-20 border-t border-stone-100 dark:border-stone-800 backdrop-blur-sm overflow-hidden">
                    <div className="flex justify-between items-center mb-4 shrink-0">
                        <div className="flex items-center gap-2 text-stone-400">
                            <History size={16} />
                            <span className="text-xs font-bold uppercase tracking-wider">Verlauf ({contractions.length})</span>
                        </div>
                        {contractions.length > 0 && (
                            <button onClick={clearHistory} className="text-xs font-medium text-stone-400 hover:text-red-500 transition-colors px-2 py-1 cursor-pointer">
                                Alles löschen
                            </button>
                        )}
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar pb- safe-bottom">
                        {contractions.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-stone-300 dark:text-stone-700">
                                <Activity size={32} className="mb-2 opacity-50" />
                                <p className="text-sm italic">War da was?</p>
                            </div>
                        ) : (
                            contractions.map((c, idx) => (
                                <div key={c.id} className="group bg-white dark:bg-stone-900 p-3 rounded-xl border border-stone-100 dark:border-stone-800 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow shrink-0">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-stone-400 font-bold uppercase">
                                            {new Date(c.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                        <span className="font-bold text-stone-700 dark:text-stone-200 text-lg tabular-nums">
                                            {formatTime(c.duration)}
                                        </span>
                                    </div>

                                    {/* Distance Indicator */}
                                    {c.distance > 0 ? (
                                        <div className="flex flex-col items-center px-4 border-l border-r border-stone-50 dark:border-stone-800 mx-2 flex-1">
                                            <span className="text-[10px] text-stone-300 font-bold uppercase tracking-wider">Pause</span>
                                            <span className="text-sm font-medium text-stone-500 dark:text-stone-400 tabular-nums">{formatDistance(c.distance)}</span>
                                        </div>
                                    ) : (
                                        <div className="flex-1"></div>
                                    )}

                                    <button
                                        onClick={(e) => { e.stopPropagation(); deleteContraction(c.id); }}
                                        className="w-8 h-8 flex items-center justify-center rounded-full text-stone-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                                        title="Eintrag löschen"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContractionTimerOverlayV2;
