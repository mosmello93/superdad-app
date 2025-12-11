import React, { useState } from 'react';
import { Heart, Coffee, Moon, Zap, AlertCircle, Activity, ExternalLink } from 'lucide-react';

const MOODS = [
    { id: 'tired', label: 'Müde / Erschöpft', icon: Moon, color: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300', border: 'border-indigo-200 dark:border-indigo-800' },
    { id: 'sad', label: 'Traurig / Sensibel', icon: Heart, color: 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300', border: 'border-rose-200 dark:border-rose-800' },
    { id: 'angry', label: 'Gereizt / Wütend', icon: Zap, color: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-800' },
    { id: 'pain', label: 'Schmerzen', icon: Activity, color: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300', border: 'border-red-200 dark:border-red-800' },
    { id: 'overwhelmed', label: 'Überfordert', icon: AlertCircle, color: 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300', border: 'border-orange-200 dark:border-orange-800' },
    { id: 'happy', label: 'Happy / Entspannt', icon: Coffee, color: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200 dark:border-emerald-800' }
];

const TIPS = {
    pregnancy: {
        tired: ["Massiere ihre Füße oder den unteren Rücken.", "Überneim den Einkauf/Haushalt komplett.", "Zieh ihr die Schuhe aus und mach Tee."],
        sad: ["Sag ihr, dass sie (und der Bauch) wunderschön ist.", "Hör einfach zu. Keine Ratschläge.", "Biete ihr an, zusammen baden zu gehen (nicht zu heiß!)."],
        angry: ["Lach es nicht weg. Hormone sind real.", "Bring ihr Snacks. Jetzt.", "Frag ruhig: 'Was kann ich Gutes tun?'"],
        pain: ["Check Embryotox.de bevor sie Medikamente nimmt!", "Lieber einmal zu oft zum Arzt/Hebamme als zu wenig.", "Wärmflasche? (Vorsicht: Nicht zu heiß am Bauch!)"],
        overwhelmed: ["Organisiere den Papierkram/Termine für sie.", " Sag: 'Ich kümmere mich um X, ruh du dich aus.'", "Erinnere sie: 'Wir schaffen das.'"],
        happy: ["Genießt den Moment zu zweit.", "Mach ein Foto vom Bauch.", "Plant etwas Schönes für 'nach dem Baby'."]
    },
    postpartum: {
        tired: ["Nimm ihr das Baby für 1 Stunde ab (Spaziergang!).", "Mach ihr einen Kaffee/Tee (ungefragt!).", "Frag nicht 'Was soll ich tun?', sondern 'Leg dich hin'."],
        sad: ["Nimm sie einfach nur in den Arm. Klappe halten.", "Sag ihr: 'Du bist eine tolle Mama.'", "Bring ihr Schokolade oder ihr Soul-Food."],
        angry: ["Nimm es nicht persönlich. Es ist der Schlafmangel.", "Senke deine Stimme, bleib ruhig.", "Überneim das Wickeln/Tragen sofort."],
        pain: ["Bei Still-Schmerzen sofort Hebamme kontaktieren.", "Damm/Narbe kühlen (Ice-Pads).", "Embryotox.de checken wegen Stillverträglichkeit."],
        overwhelmed: ["Priorisiere für sie: 'Ich mach X, du machst nur Y.'", "Schick sie kurz raus an die frische Luft.", "Sag: 'Das ist nur eine Phase.'"],
        happy: ["Freu dich mit ihr! Lob sie.", "Nutzt den Moment für ein kurzes Gespräch über euch.", "Kuschelt als Familie."]
    },
    loss: {
        tired: ["Schirm sie von der Außenwelt ab (Besuch absagen).", "Koch Essen, das man nur warm machen muss.", "Sorg für Stille in der Wohnung."],
        sad: ["Weine mit ihr, wenn dir danach ist. Zeig Gefühle.", "Zünde eine Kerze an.", "Sei einfach nur da. Physische Präsenz reicht."],
        angry: ["Sei ihr Blitzableiter. Halt es aus.", "Lass sie fluchen und schreien.", "Blocke dumme Sprüche von anderen ab."],
        pain: ["Körperliche Schmerzen sind oft Ausdruck der Trauer.", "Kontaktiere den Hausarzt, wenn es nicht besser wird.", "Check Embryotox/Arzt bei Medikamenten."],
        overwhelmed: ["Entscheide kleine Dinge für sie (Essen, Einkauf).", "Sag Termine ab.", "Schaff ihr einen Rückzugsort."],
        happy: ["Darf sie sein! Hab kein schlechtes Gewissen.", "Lacht zusammen, wenn es geht.", "Erinnert euch an schöne Momente."]
    }
};

const PartnerPulse = ({ mode = 'pregnancy', history = [], onSave }) => {
    const [selectedMood, setSelectedMood] = useState(null);

    // Ensure we have valid tips for the current mode, fallback to pregnancy if not found
    const currentTips = TIPS[mode] || TIPS.pregnancy;

    const handleMoodSelect = (moodId) => {
        setSelectedMood(moodId);
        if (onSave) onSave(moodId);
    };

    return (
        <div className="bg-white dark:bg-stone-900 p-6 rounded-[32px] shadow-sm mb-4 border border-stone-100 dark:border-stone-800">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <div className="bg-rose-50 dark:bg-rose-900/10 p-2 rounded-full text-rose-500 dark:text-rose-400">
                        <Heart size={20} />
                    </div>
                    <h3 className="font-bold text-stone-800 dark:text-stone-100">Partner Pulse</h3>
                </div>
                <img src="/mascot/papa_caring.png" alt="Papa Caring" className="w-28 h-28 object-contain -my-6 -mr-2" />
            </div>

            {!selectedMood ? (
                <div>
                    <p className="text-sm text-stone-500 dark:text-stone-400 mb-3 font-medium">Wie geht es ihr gerade?</p>
                    <div className="grid grid-cols-2 gap-2 mb-6">
                        {MOODS.map(mood => (
                            <button
                                key={mood.id}
                                onClick={() => handleMoodSelect(mood.id)}
                                className={`${mood.color} ${mood.border} border p-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-transform active:scale-95`}
                            >
                                <mood.icon size={16} />
                                {mood.label.split(' / ')[0]}
                            </button>
                        ))}
                    </div>

                    {/* HISTORY VISUALIZATION */}
                    {history.length > 0 && (
                        <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
                            <p className="text-[10px] text-stone-400 uppercase tracking-wider font-bold mb-3">Verlauf (Letzte 7 Einträge)</p>
                            <div className="flex gap-2">
                                {history.slice(0, 7).map((entry, i) => {
                                    const moodConfig = MOODS.find(m => m.id === entry.moodId);
                                    if (!moodConfig) return null;
                                    const date = new Date(entry.date);
                                    const isToday = new Date().toDateString() === date.toDateString();

                                    return (
                                        <div key={i} className="group relative">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${moodConfig.color} ${isToday ? 'ring-2 ring-stone-900 dark:ring-white ring-offset-2 dark:ring-offset-stone-900' : 'opacity-70 grayscale hover:grayscale-0'} transition-all`}>
                                                <moodConfig.icon size={14} />
                                            </div>
                                            {/* Tooltip */}
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap bg-stone-800 text-white text-[10px] py-1 px-2 rounded-md z-10">
                                                {date.toLocaleDateString(undefined, { weekday: 'short' })}: {moodConfig.label.split(' / ')[0]}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="animate-in fade-in zoom-in-95 duration-300">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold uppercase text-stone-400 dark:text-stone-500 tracking-wider">Sofort-Hilfe</span>
                        <button onClick={() => setSelectedMood(null)} className="text-xs text-stone-400 dark:text-stone-500 underline">Zurück</button>
                    </div>
                    <div className="bg-stone-50 dark:bg-stone-950 rounded-2xl p-4 border border-stone-100 dark:border-stone-800">
                        <ul className="space-y-3">
                            {currentTips[selectedMood] && currentTips[selectedMood].map((tip, i) => (
                                <li key={i} className="flex gap-3 text-stone-700 dark:text-stone-300 text-sm font-medium">
                                    <span className="text-emerald-500 font-bold">✓</span>
                                    {tip}
                                </li>
                            ))}
                        </ul>

                        {/* Embryotox Link specific for pain */}
                        {selectedMood === 'pain' && (
                            <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-800">
                                <a
                                    href="https://www.embryotox.de/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold hover:underline bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg justify-center transition"
                                >
                                    <ExternalLink size={12} />
                                    Medikamentencheck auf Embryotox.de
                                </a>
                            </div>
                        )}
                    </div>
                    <p className="text-[10px] text-center text-stone-300 dark:text-stone-600 mt-2">Du bist ihr Fels.</p>
                </div>
            )}
        </div>
    );
};

export default PartnerPulse;
