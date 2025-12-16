import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle, Volume2, VolumeX, HelpCircle, Thermometer, Utensils, Archive, Wind, Zap } from 'lucide-react';

const CryCompassOverlay = ({ onClose }) => {
    const [checkedItems, setCheckedItems] = useState([]);
    const [activeSound, setActiveSound] = useState(null);
    const audioCtxRef = useRef(null);
    const oscillatorRef = useRef(null);
    const noiseNodeRef = useRef(null);

    const checklist = [
        { id: 'hunger', label: 'Hunger? (letzte Mahlzeit?)', icon: Utensils, color: 'text-orange-500' },
        { id: 'diaper', label: 'Windel voll?', icon: Archive, color: 'text-amber-600' }, // Archive close enough to diaper box
        { id: 'burp', label: 'Bäuerchen sitzt quer?', icon: Wind, color: 'text-green-500' },
        { id: 'temp', label: 'Zu warm / zu kalt?', icon: Thermometer, color: 'text-red-500' },
        { id: 'overstim', label: 'Überreizt? (Licht/Lärm)', icon: Zap, color: 'text-purple-500' },
        { id: 'comfort', label: 'Braucht einfach Nähe?', icon: HelpCircle, color: 'text-blue-500' },
    ];

    const toggleCheck = (id) => {
        if (checkedItems.includes(id)) {
            setCheckedItems(checkedItems.filter(i => i !== id));
        } else {
            setCheckedItems([...checkedItems, id]);
        }
    };

    // --- SOUND GENERATOR (Web Audio API) ---
    // Simple White Noise / Brown Noise generation
    const stopSound = () => {
        if (oscillatorRef.current) { oscillatorRef.current.stop(); oscillatorRef.current = null; }
        if (noiseNodeRef.current) { noiseNodeRef.current.disconnect(); noiseNodeRef.current = null; }
        if (audioCtxRef.current) { audioCtxRef.current.close(); audioCtxRef.current = null; }
        setActiveSound(null);
    };

    const playWhiteNoise = async (type) => {
        if (activeSound === type) {
            stopSound();
            return;
        }
        stopSound(); // Stop any existing

        if (!audioCtxRef.current) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtxRef.current = new AudioContext();
        }
        const ctx = audioCtxRef.current;
        const bufferSize = ctx.sampleRate * 2; // 2 seconds buffer
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            // Simple White Noise
            const white = Math.random() * 2 - 1;

            // Basic filtering for "Brown" (Föhn) vs "Pink" (Staubsauger) vs "White"
            if (type === 'shush') { // Pink-ish
                data[i] = (white + (i > 0 ? data[i - 1] : 0)) * 0.5;
            } else if (type === 'dryer') { // Brown-ish
                data[i] = (white + (i > 0 ? data[i - 1] : 0)) / 1.02;
            } else {
                data[i] = white * 0.5; // Pure White (Rain)
            }
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        // Gain (Volume)
        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.25; // Safe volume

        noise.connect(gainNode);
        gainNode.connect(ctx.destination);
        noise.start();

        noiseNodeRef.current = noise;
        setActiveSound(type);
    };

    useEffect(() => {
        return () => stopSound(); // Cleanup on unmount
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-stone-900 text-stone-100 animate-in slide-in-from-bottom duration-300">
            {/* Dark Mode default for Night usage */}

            <div className="px-6 pt-12 pb-6 flex items-center justify-between shrink-0">
                <div>
                    <span className="text-red-400 font-bold uppercase tracking-wider text-xs">SOS Modus</span>
                    <h2 className="text-3xl font-bold font-serif text-white">Schrei-Kompass</h2>
                </div>
                <button onClick={onClose} className="bg-stone-800 p-2 rounded-full text-stone-400 hover:bg-stone-700 transition">
                    <X size={24} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-24">
                {/* 1. CHECKLIST */}
                <div className="mb-8">
                    <p className="text-stone-400 text-sm mb-4">Checkliste: Gehe die Ursachen durch.</p>
                    <div className="space-y-3">
                        {checklist.map((item) => {
                            const isChecked = checkedItems.includes(item.id);
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => toggleCheck(item.id)}
                                    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${isChecked
                                            ? 'bg-stone-800 border-green-900/50 opacity-50'
                                            : 'bg-stone-800 border-stone-700 hover:bg-stone-700'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-full ${isChecked ? 'bg-stone-700 text-stone-500' : 'bg-stone-900 ' + item.color}`}>
                                            <item.icon size={20} />
                                        </div>
                                        <span className={`font-medium ${isChecked ? 'text-stone-500 line-through' : 'text-stone-200'}`}>
                                            {item.label}
                                        </span>
                                    </div>
                                    {isChecked && <CheckCircle size={20} className="text-green-500" />}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 2. MAGIC SOUNDS */}
                <div className="bg-stone-800 rounded-3xl p-6 border border-stone-700">
                    <div className="flex items-center gap-2 mb-4">
                        <Volume2 className="text-indigo-400" size={20} />
                        <h3 className="font-bold text-white">Magic Sounds</h3>
                    </div>
                    <p className="text-stone-400 text-xs mb-4">Weißes Rauschen beruhigt viele Babys sofort.</p>

                    <div className="grid grid-cols-3 gap-3">
                        <button
                            onClick={() => playWhiteNoise('shush')}
                            className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all ${activeSound === 'shush' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50 scale-105' : 'bg-stone-700 text-stone-300 hover:bg-stone-600'
                                }`}
                        >
                            <Wind size={24} />
                            <span className="text-xs font-bold">Shhh...</span>
                        </button>

                        <button
                            onClick={() => playWhiteNoise('dryer')}
                            className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all ${activeSound === 'dryer' ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/50 scale-105' : 'bg-stone-700 text-stone-300 hover:bg-stone-600'
                                }`}
                        >
                            <Zap size={24} />
                            <span className="text-xs font-bold">Föhn</span>
                        </button>

                        <button
                            onClick={() => playWhiteNoise('rain')}
                            className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all ${activeSound === 'rain' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 scale-105' : 'bg-stone-700 text-stone-300 hover:bg-stone-600'
                                }`}
                        >
                            <Archive size={24} />
                            <span className="text-xs font-bold">Rauschen</span>
                        </button>
                    </div>

                    {activeSound && (
                        <div className="mt-4 flex justify-center">
                            <button onClick={stopSound} className="text-red-400 text-xs flex items-center gap-1 hover:text-red-300">
                                <VolumeX size={14} /> Ton ausschalten
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Exit */}
            <div className="absolute bottom-8 w-full px-6 pointer-events-none">
                {/* Spacer if needed */}
            </div>
        </div>
    );
};

export default CryCompassOverlay;
