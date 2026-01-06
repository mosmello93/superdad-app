import React, { useState } from 'react';
import { Sparkles, Calendar, Baby, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';

const BabyBornOverlay = ({ onClose, onSave, defaultName }) => {
    const [name, setName] = useState(defaultName || '');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default today
    const [time, setTime] = useState(new Date().toTimeString().slice(0, 5)); // Default now

    const handleSave = () => {
        // Trigger Confetti
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            zIndex: 2000 // Above modal
        });

        // Combine date and time
        const birthDate = new Date(`${date}T${time}`);

        // Pass data back
        onSave(name, birthDate);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={onClose} />

            <div className="relative w-full max-w-sm bg-white dark:bg-stone-900 rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 p-8 flex flex-col items-center text-center">

                {/* Visual Header */}
                <div className="w-32 h-32 mb-6 animate-bounce">
                    <img src="/mascot/papa_happy.png" alt="Papa jubelt" className="w-full h-full object-contain drop-shadow-lg" />
                </div>

                <h2 className="text-2xl font-bold font-serif text-stone-800 dark:text-stone-100 mb-2">
                    Herzlichen Glückwunsch!
                </h2>
                <p className="text-stone-600 dark:text-stone-400 text-sm mb-8 leading-relaxed">
                    Willkommen auf der Welt, kleines Wunder. <br />
                    Starten wir gemeinsam in dieses neue Kapitel.
                </p>

                {/* Form */}
                <div className="w-full space-y-4 mb-8">
                    <div className="space-y-1 text-left">
                        <label className="text-xs font-bold uppercase text-stone-400 ml-3">Name des Babys</label>
                        <div className="relative">
                            <Baby className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name (Optional)"
                                className="w-full bg-stone-50 dark:bg-stone-800 border-none rounded-2xl py-4 pl-12 pr-4 text-stone-800 dark:text-stone-100 font-medium focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-1 text-left">
                        <label className="text-xs font-bold uppercase text-stone-400 ml-3">Geburtsdatum</label>
                        <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full bg-stone-50 dark:bg-stone-800 border-none rounded-2xl py-4 pl-12 pr-4 text-stone-800 dark:text-stone-100 font-medium focus:ring-2 focus:ring-indigo-500 transition-all accent-indigo-600"
                            />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 w-full">
                    <button
                        onClick={onClose}
                        className="flex-1 p-4 rounded-full font-bold text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    >
                        Abbrechen
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-[2] bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                    >
                        <Check size={20} />
                        Los geht's
                    </button>
                </div>

            </div>
        </div>
    );
};

export default BabyBornOverlay;
