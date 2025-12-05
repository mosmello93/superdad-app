import React, { useState, useEffect } from 'react';
import { Timer, Square, Play, History, X } from 'lucide-react';

const ContractionTimer = ({ contractions, saveContractions, closeTimer }) => {
    const [isTiming, setIsTiming] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        let interval;
        if (isTiming) {
            interval = setInterval(() => {
                setElapsed(Date.now() - startTime);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTiming, startTime]);

    const handleStart = () => {
        setStartTime(Date.now());
        setIsTiming(true);
        setElapsed(0);
    };

    const handleStop = () => {
        if (!startTime) return;
        const endTime = Date.now();
        const durationSec = Math.floor((endTime - startTime) / 1000);
        const newContraction = {
            start: startTime,
            end: endTime,
            duration: durationSec,
            id: Date.now()
        };

        // Calculate distance from previous
        if (contractions.length > 0) {
            const prev = contractions[0];
            const distanceMin = Math.floor((startTime - prev.start) / 60000);
            newContraction.distance = distanceMin;
        }

        saveContractions([newContraction, ...contractions]);
        setIsTiming(false);
        setStartTime(null);
        setElapsed(0);
    };

    const formatTime = (ms) => {
        const totalSec = Math.floor(ms / 1000);
        const min = Math.floor(totalSec / 60);
        const sec = totalSec % 60;
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    return (
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-stone-100 mb-4 animate-in slide-in-from-bottom duration-500">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 text-rose-500 font-bold">
                    <Timer size={20} />
                    <h3>Wehen-Timer</h3>
                </div>
                {closeTimer && <button onClick={closeTimer}><X size={20} className="text-stone-400" /></button>}
            </div>

            <div className="text-center mb-8">
                <div className="text-6xl font-bold text-stone-800 tabular-nums mb-2">
                    {formatTime(elapsed)}
                </div>
                <p className="text-stone-400 text-sm">{isTiming ? "Wehe läuft..." : "Bereit"}</p>
            </div>

            <button
                onClick={isTiming ? handleStop : handleStart}
                className={`w-full py-6 rounded-3xl font-bold text-xl transition-all flex items-center justify-center gap-3 shadow-lg ${isTiming
                        ? 'bg-rose-500 text-white shadow-rose-200'
                        : 'bg-emerald-500 text-white shadow-emerald-200'
                    }`}
            >
                {isTiming ? <Square fill="currentColor" /> : <Play fill="currentColor" />}
                {isTiming ? "Stoppen" : "Wehe Starten"}
            </button>

            {contractions.length > 0 && (
                <div className="mt-8">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Letzte Wehen</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                        {contractions.map((c, i) => (
                            <div key={c.id} className="flex justify-between items-center p-3 bg-stone-50 rounded-2xl text-sm">
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-stone-600">{new Date(c.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    <span className="bg-white px-2 py-1 rounded-lg border border-stone-100 text-stone-500 text-xs">
                                        {Math.floor(c.duration / 60)}m {c.duration % 60}s
                                    </span>
                                </div>
                                {c.distance && (
                                    <div className="flex items-center gap-1 text-stone-400 text-xs">
                                        <History size={12} />
                                        <span>{c.distance} min</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContractionTimer;
