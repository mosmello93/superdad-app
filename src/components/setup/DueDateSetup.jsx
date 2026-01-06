import React, { useState } from 'react';
import { Baby, ChevronLeft } from 'lucide-react';

const DueDateSetup = ({ saveProfile, mode, goBack }) => {
    const [localDate, setLocalDate] = useState('');
    const [babyName, setBabyName] = useState('');
    const [userName, setUserName] = useState('');
    const [gender, setGender] = useState('surprise');
    const [ssw, setSsw] = useState('');
    // Conception Specifics
    const [cycleLength, setCycleLength] = useState('28');
    const [periodLength, setPeriodLength] = useState('5');
    const [tryingDuration, setTryingDuration] = useState('start');

    const handleSave = () => {
        if (!localDate) return;

        // Manual Validation
        const selected = new Date(localDate);
        const today = new Date();
        const maxDate = new Date();

        if (mode === 'pregnancy') {
            maxDate.setDate(today.getDate() + 285); // 40 weeks + buffer
            if (selected > maxDate) {
                alert("Das Datum liegt zu weit in der Zukunft (max. 40 Wochen).");
                return;
            }
        } else if (mode === 'conception') {
            if (selected > today) {
                alert("Der Zyklus-Start darf nicht in der Zukunft liegen.");
                return;
            }
        } else {
            // Postpartum / Loss (cannot be in future)
            if (selected > today) {
                alert("Das Datum darf nicht in der Zukunft liegen.");
                return;
            }
        }

        saveProfile({
            dueDate: localDate,
            babyName: babyName,
            userName: userName,
            gender: gender,
            ssw: ssw,
            // Conception Data
            cycleLength: parseInt(cycleLength) || 28,
            periodLength: parseInt(periodLength) || 5,
            tryingDuration: tryingDuration
        });
    };

    const textConfig = {
        conception: {
            title: 'Kinderwunsch',
            sub: 'Lass uns deinen Zyklus tracken.',
            labelDate: 'Start letzte Periode*'
        },
        pregnancy: {
            title: 'Dein Start',
            sub: 'Verrate uns ein paar Details.',
            labelDate: 'Geburtstermin*'
        },
        postpartum: {
            title: 'Willkommen, Baby!',
            sub: 'Wann kam der kleine Schatz?',
            labelDate: 'Geburtstag*'
        },
        loss: {
            title: 'Wir sind für dich da',
            sub: 'Erzähl uns nur, was du möchtest.',
            labelDate: 'Datum des Verlusts*'
        }
    };

    const config = textConfig[mode] || textConfig.pregnancy;
    const { title, sub, labelDate } = config;

    const iconConfig = {
        conception: '/mascot/papa_nest.png',
        pregnancy: '/mascot/papa_pregnant.png',
        postpartum: '/mascot/papa_holding_baby.png',
        loss: '/mascot/papa_star.png'
    };
    const currentIcon = iconConfig[mode] || iconConfig.pregnancy;

    return (
        <div className="bg-white p-6 rounded-[32px] border border-stone-100 shadow-lg text-center mt-4 animate-in fade-in slide-in-from-bottom-8 relative">
            {/* Back Button */}
            <button
                onClick={goBack}
                className="absolute top-6 left-6 text-stone-400 hover:text-stone-600 transition-colors"
                title="Zurück zur Auswahl"
            >
                <ChevronLeft size={24} />
            </button>

            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg relative z-10 mx-auto mb-3">
                <img src={currentIcon} alt="Dad" className="w-24 h-24 object-contain" />
            </div>
            <h2 className="text-xl font-bold text-stone-800 mb-1">{title}</h2><p className="text-stone-500 mb-4 text-sm">{sub}</p>

            <div className="mb-3 text-left">
                <label className="text-xs font-bold text-stone-400 uppercase ml-2">{labelDate}</label>
                <input
                    type="date"
                    value={localDate}
                    max={mode === 'pregnancy' ? new Date(new Date().setDate(new Date().getDate() + 300)).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                    onChange={(e) => setLocalDate(e.target.value)}
                    className="w-full p-3 mt-1 bg-stone-50 rounded-2xl text-center font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
            </div>

            {mode === 'conception' && (
                <div className="space-y-4 mb-4">
                    <div className="flex gap-3">
                        <div className="flex-1 text-left">
                            <label className="text-xs font-bold text-stone-400 uppercase ml-2">Zyklus-Länge</label>
                            <input
                                type="number"
                                value={cycleLength}
                                onChange={(e) => setCycleLength(e.target.value)}
                                placeholder="28"
                                className="w-full p-3 mt-1 bg-stone-50 rounded-2xl text-center font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            />
                        </div>
                        <div className="flex-1 text-left">
                            <label className="text-xs font-bold text-stone-400 uppercase ml-2">Periode (Tage)</label>
                            <input
                                type="number"
                                value={periodLength}
                                onChange={(e) => setPeriodLength(e.target.value)}
                                placeholder="5"
                                className="w-full p-3 mt-1 bg-stone-50 rounded-2xl text-center font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            />
                        </div>
                    </div>

                    <div className="text-left">
                        <label className="text-xs font-bold text-stone-400 uppercase ml-2">Wie lange übt ihr schon?</label>
                        <div className="flex gap-2 mt-1">
                            <button onClick={() => setTryingDuration('start')} className={`flex-1 py-3 px-1 rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 ${tryingDuration === 'start' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-300' : 'bg-stone-50 text-stone-400'}`}>
                                <span>🚀</span>
                                <span>Start</span>
                            </button>
                            <button onClick={() => setTryingDuration('while')} className={`flex-1 py-3 px-1 rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 ${tryingDuration === 'while' ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-300' : 'bg-stone-50 text-stone-400'}`}>
                                <span>🙂</span>
                                <span>6-12 Mon.</span>
                            </button>
                            <button onClick={() => setTryingDuration('long')} className={`flex-1 py-3 px-1 rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 ${tryingDuration === 'long' ? 'bg-rose-100 text-rose-700 ring-2 ring-rose-300' : 'bg-stone-50 text-stone-400'}`}>
                                <span>⏳</span>
                                <span>&gt; 1 Jahr</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mb-3 text-left">
                <label className="text-xs font-bold text-stone-400 uppercase ml-2">Dein Vorname (Optional)</label>
                <input
                    type="text"
                    value={userName}
                    maxLength={20}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Wie sollen wir dich nennen?"
                    className="w-full p-3 mt-1 bg-stone-50 rounded-2xl font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
            </div>

            {mode !== 'conception' && (
                <div className="mb-3 text-left">
                    <label className="text-xs font-bold text-stone-400 uppercase ml-2">Baby-Name / Spitzname (Optional)</label>
                    <input
                        type="text"
                        value={babyName}
                        maxLength={20}
                        onChange={(e) => setBabyName(e.target.value)}
                        placeholder="z.B. Krümel"
                        className="w-full p-3 mt-1 bg-stone-50 rounded-2xl font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                </div>
            )}

            {mode !== 'conception' && (
                <div className="mb-5 text-left">
                    <label className="text-xs font-bold text-stone-400 uppercase ml-2">Geschlecht</label>
                    <div className="flex gap-2 mt-1">
                        <button onClick={() => setGender('boy')} className={`flex-1 py-3 rounded-xl text-sm font-bold transition ${gender === 'boy' ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-300' : 'bg-stone-50 text-stone-400'}`}>Junge</button>
                        <button onClick={() => setGender('girl')} className={`flex-1 py-3 rounded-xl text-sm font-bold transition ${gender === 'girl' ? 'bg-rose-100 text-rose-600 ring-2 ring-rose-300' : 'bg-stone-50 text-stone-400'}`}>Mädchen</button>
                        <button onClick={() => setGender('surprise')} className={`flex-1 py-3 rounded-xl text-sm font-bold transition ${gender === 'surprise' ? 'bg-amber-100 text-amber-600 ring-2 ring-amber-300' : 'bg-stone-50 text-stone-400'}`}>?</button>
                    </div>
                </div>
            )}

            {mode === 'loss' && (
                <div className="mb-5 text-left animate-in fade-in">
                    <label className="text-xs font-bold text-stone-400 uppercase ml-2">SSW (0-42)</label>
                    <input
                        type="number"
                        value={ssw}
                        min="0"
                        max="42"
                        onChange={(e) => {
                            const val = Math.min(42, Math.max(0, parseInt(e.target.value) || 0));
                            setSsw(val.toString());
                        }}
                        placeholder="In welcher Woche?"
                        className="w-full p-3 mt-1 bg-stone-50 rounded-2xl font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                    <p className="text-[10px] text-stone-400 mt-1 ml-2">Hilft uns, körperliche Themen (Wochenbett/Rückbildung) einzuordnen.</p>
                </div>
            )}

            <button onClick={handleSave} disabled={!localDate} className="w-full py-3 bg-stone-900 text-white font-bold rounded-2xl hover:bg-stone-800 transition disabled:opacity-50 shadow-xl shadow-stone-200">Coach Starten</button>
        </div>
    );
};

export default DueDateSetup;
