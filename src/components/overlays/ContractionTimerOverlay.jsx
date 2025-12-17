import React, { useState, useEffect } from 'react';
import { X, Play, Square, Clock, Activity, AlertTriangle, Trash2, History } from 'lucide-react';

const ContractionTimerOverlay = ({ onClose, contacts = {} }) => {
    // Timer Logic Refined for Stability
    const [isActive, setIsActive] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [contractions, setContractions] = useState(() => {
        const saved = localStorage.getItem('superdad_contractions');
        return saved ? JSON.parse(saved) : [];
    });
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        localStorage.setItem('superdad_contractions', JSON.stringify(contractions));
    }, [contractions]);

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
            // Start
            setStartTime(Date.now());
            setIsActive(true);
            setElapsed(0);
        } else {
            // Stop
            const endTime = Date.now();
            const duration = endTime - startTime;

            // Calculate distance from previous start
            let distance = 0;
            if (contractions.length > 0) {
                distance = startTime - contractions[0].start; // 0 is newest
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
        if (window.confirm("Wirklich alle Daten löschen?")) {
            setContractions([]);
        }
    };

    const deleteContraction = (id) => {
        const updated = contractions.filter(c => c.id !== id);
        setContractions(updated);
    };

    const formatTime = (ms) => {
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / 1000 / 60) % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const formatDistance = (ms) => {
        if (!ms) return "-";
        const minutes = Math.floor(ms / 1000 / 60);
        return `${minutes} min`;
    };

    // Analyze last 3 contractions
    const analyze = () => {
        if (contractions.length < 3) return { text: "Noch zu wenige Daten.", color: "text-stone-500", action: null };

        const last3 = contractions.slice(0, 3);
        const avgDist = last3.reduce((acc, c) => acc + c.distance, 0) / 3;
        const avgDur = last3.reduce((acc, c) => acc + c.duration, 0) / 3;

        const avgDistMin = avgDist / 1000 / 60;
        const avgDurSec = avgDur / 1000;

        // 5-1-1 Rule Approximation (5 min distance, >1 min duration for 1 hour... simple check here)
        if (avgDistMin < 6 && avgDurSec > 45) {
            let action = null;
            if (contacts.midwifePhone) action = { label: "Hebamme anrufen", phone: contacts.midwifePhone };
            else if (contacts.doctorPhone) action = { label: "Kreißsaal anrufen", phone: contacts.doctorPhone };
            else if (contacts.taxiPhone) action = { label: "Support anrufen", phone: contacts.taxiPhone };
            else action = { label: "Notruf 112", phone: "112" }; // Fallback

            return { text: "5-1-1 Regel erreicht! Klinikzeit?", color: "text-red-600 font-bold", action };
        }
        if (avgDistMin < 10) {
            return { text: "Es wird intensiver. Beobachten.", color: "text-amber-600 font-medium", action: null };
        }
        return { text: "Alles ruhig. Entspann dich.", color: "text-emerald-600", action: null };
    };

    const status = analyze();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/90 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-stone-900 w-full max-w-md h-[80vh] rounded-[40px] shadow-2xl flex flex-col relative overflow-hidden ring-4 ring-stone-900/10">

                {/* Header */}
                <div className="p-6 pb-2 flex justify-between items-center z-10">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-stone-800 to-stone-600 dark:from-stone-100 dark:to-stone-400 bg-clip-text text-transparent font-serif">Wehen-Timer</h2>
                    <button onClick={onClose} className="p-2 bg-stone-100 dark:bg-stone-800 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">
                        <X size={24} className="text-stone-600 dark:text-stone-300" />
                    </button>
                </div>

                {/* Status Bar */}
                <div className="px-6 py-2 z-10 space-y-2">
                    <div className="bg-stone-50 dark:bg-stone-800/50 rounded-2xl p-3 flex items-start gap-3 border border-stone-100 dark:border-stone-800">
                        <Activity className="text-stone-400 mt-1 shrink-0" size={18} />
                        <p className={`text-sm ${status.color}`}>{status.text}</p>
                    </div>

                    {/* PANIC BUTTON */}
                    {status.action && (
                        <a href={`tel:${status.action.phone}`} className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-2xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-red-500/30 animate-pulse">
                            <Phone size={20} />
                            {status.action.label}
                        </a>
                    )}
                </div>

                {/* Main Action Area */}
                <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
                    {/* Ripple Effect Background when active */}
                    {isActive && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-64 h-64 bg-red-500/10 rounded-full animate-ping opacity-75"></div>
                            <div className="absolute w-48 h-48 bg-red-500/20 rounded-full animate-pulse delay-75"></div>
                        </div>
                    )}

                    <div className="mb-8 text-center relative z-10">
                        <p className="text-stone-400 dark:text-stone-500 text-sm font-medium uppercase tracking-widest mb-2">Dauer</p>
                        <div className={`text-7xl font-bold font-variant-numeric tabular-nums ${isActive ? 'text-stone-800 dark:text-stone-100' : 'text-stone-300 dark:text-stone-700'}`}>
                            {formatTime(isActive ? elapsed : (contractions[0]?.duration || 0))}
                        </div>
                    </div>

                    <button
                        onClick={toggleTimer}
                        className={`w-48 h-48 rounded-full flex items-center justify-center shadow-lg transition-all scale-100 active:scale-95 z-10 border-8 ${isActive
                            ? 'bg-stone-800 dark:bg-stone-100 border-stone-200 dark:border-stone-700 text-white dark:text-stone-900 shadow-stone-900/20'
                            : 'bg-red-500 border-red-100 text-white shadow-red-500/30 hover:bg-red-600'}`}
                    >
                        {isActive ? (
                            <div className="flex flex-col items-center">
                                <Square size={48} fill="currentColor" />
                                <span className="mt-2 font-bold text-lg">STOPP</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <Play size={48} fill="currentColor" className="ml-2" />
                                <span className="mt-2 font-bold text-lg">START</span>
                            </div>
                        )}
                    </button>
                </div>

                {/* History List */}
                <div className="flex-1 bg-stone-50 dark:bg-stone-950 rounded-t-[40px] p-6 overflow-hidden flex flex-col z-20 border-t border-stone-100 dark:border-stone-800">
                    <div className="flex justify-between items-center mb-4 sticky top-0">
                        <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400">
                            <History size={16} />
                            <span className="text-xs font-bold uppercase tracking-wider">Verlauf</span>
                        </div>
                        {contractions.length > 0 && (
                            <button onClick={clearHistory} className="text-stone-400 hover:text-red-500 transition-colors p-1">
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>

                    <div className="overflow-y-auto space-y-3 pb-4 no-scrollbar">
                        {contractions.length === 0 ? (
                            <div className="text-center py-8 text-stone-300 dark:text-stone-700 italic">
                                Noch keine Wehen aufgezeichnet.
                            </div>
                        ) : (
                            contractions.map((c, idx) => (
                                <div key={c.id} className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-100 dark:border-stone-800 flex justify-between items-center shadow-sm group">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-stone-400 font-medium">
                                            {new Date(c.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                        <span className="font-bold text-stone-800 dark:text-stone-200 text-lg">
                                            {formatTime(c.duration)}
                                        </span>
                                    </div>

                                    {/* Distance Visual */}
                                    {c.distance > 0 ? (
                                        <div className="flex items-center gap-2">
                                            <div className="h-[1px] w-8 bg-stone-200 dark:bg-stone-700"></div>
                                            <div className="flex flex-col items-center">
                                                <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Abstand</span>
                                                <span className="font-medium text-stone-600 dark:text-stone-400">{formatDistance(c.distance)}</span>
                                            </div>
                                        </div>
                                    ) : null}

                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-12 rounded-full ${c.duration > 45000 ? 'bg-red-400' : 'bg-green-400'} opacity-20`}></div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); deleteContraction(c.id); }}
                                            className="p-2 text-stone-300 hover:text-red-500 transition-all"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContractionTimerOverlay;
