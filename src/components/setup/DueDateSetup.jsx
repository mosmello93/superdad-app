import React, { useState } from 'react';
import { Baby } from 'lucide-react';

const DueDateSetup = ({ saveProfile, mode }) => {
    const [localDate, setLocalDate] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('surprise');
    const [ssw, setSsw] = useState('');

    const handleSave = () => { saveProfile({ dueDate: localDate, babyName: name, gender: gender, ssw: ssw }); };

    const textConfig = {
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

    return (
        <div className="bg-white p-8 rounded-[32px] border border-stone-100 shadow-lg text-center mt-6 animate-in fade-in slide-in-from-bottom-8">
            <div className="bg-stone-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><Baby size={28} className="text-stone-600" /></div>
            <h2 className="text-xl font-bold text-stone-800 mb-2">{title}</h2><p className="text-stone-500 mb-6 text-sm">{sub}</p>

            <div className="mb-4 text-left">
                <label className="text-xs font-bold text-stone-400 uppercase ml-2">{labelDate}</label>
                <input type="date" value={localDate} onChange={(e) => setLocalDate(e.target.value)} className="w-full p-4 mt-1 bg-stone-50 rounded-2xl text-center font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
            </div>

            <div className="mb-4 text-left">
                <label className="text-xs font-bold text-stone-400 uppercase ml-2">Name (Optional)</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="z.B. Krümel" className="w-full p-4 mt-1 bg-stone-50 rounded-2xl font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
            </div>

            <div className="mb-8 text-left">
                <label className="text-xs font-bold text-stone-400 uppercase ml-2">Geschlecht</label>
                <div className="flex gap-2 mt-1">
                    <button onClick={() => setGender('boy')} className={`flex-1 py-3 rounded-xl text-sm font-bold transition ${gender === 'boy' ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-300' : 'bg-stone-50 text-stone-400'}`}>Junge</button>
                    <button onClick={() => setGender('girl')} className={`flex-1 py-3 rounded-xl text-sm font-bold transition ${gender === 'girl' ? 'bg-rose-100 text-rose-600 ring-2 ring-rose-300' : 'bg-stone-50 text-stone-400'}`}>Mädchen</button>
                    <button onClick={() => setGender('surprise')} className={`flex-1 py-3 rounded-xl text-sm font-bold transition ${gender === 'surprise' ? 'bg-amber-100 text-amber-600 ring-2 ring-amber-300' : 'bg-stone-50 text-stone-400'}`}>?</button>
                </div>
            </div>

            {mode === 'loss' && (
                <div className="mb-6 text-left animate-in fade-in">
                    <label className="text-xs font-bold text-stone-400 uppercase ml-2">SSW (Optional)</label>
                    <input
                        type="number"
                        value={ssw}
                        onChange={(e) => setSsw(e.target.value)}
                        placeholder="In welcher Woche?"
                        className="w-full p-4 mt-1 bg-stone-50 rounded-2xl font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                    <p className="text-[10px] text-stone-400 mt-1 ml-2">Hilft uns, körperliche Themen (Wochenbett/Rückbildung) einzuordnen.</p>
                </div>
            )}

            <button onClick={handleSave} disabled={!localDate} className="w-full py-4 bg-stone-900 text-white font-bold rounded-2xl hover:bg-stone-800 transition disabled:opacity-50 shadow-xl shadow-stone-200">Coach Starten</button>
        </div>
    );
};

export default DueDateSetup;
