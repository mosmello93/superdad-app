import React, { useState } from 'react';
import { Heart, Coffee, Moon, Zap, MessageCircle, AlertCircle } from 'lucide-react';

const MOODS = [
    { id: 'tired', label: 'Müde / Erschöpft', icon: Moon, color: 'bg-indigo-100 text-indigo-700', border: 'border-indigo-200' },
    { id: 'sad', label: 'Traurig / Sensibel', icon: Heart, color: 'bg-rose-100 text-rose-700', border: 'border-rose-200' },
    { id: 'angry', label: 'Gereizt / Wütend', icon: Zap, color: 'bg-amber-100 text-amber-700', border: 'border-amber-200' },
    { id: 'overwhelmed', label: 'Überfordert', icon: AlertCircle, color: 'bg-orange-100 text-orange-700', border: 'border-orange-200' },
    { id: 'happy', label: 'Happy / Entspannt', icon: Coffee, color: 'bg-emerald-100 text-emerald-700', border: 'border-emerald-200' }
];

const TIPS = {
    pregnancy: {
        tired: ["Massiere ihre Füße oder den unteren Rücken.", "Überneim den Einkauf/Haushalt komplett.", "Zieh ihr die Schuhe aus und mach Tee."],
        sad: ["Sag ihr, dass sie (und der Bauch) wunderschön ist.", "Hör einfach zu. Keine Ratschläge.", "Biete ihr an, zusammen baden zu gehen (nicht zu heiß!)."],
        angry: ["Lach es nicht weg. Hormone sind real.", "Bring ihr Snacks. Jetzt.", "Frag ruhig: 'Was kann ich Gutes tun?'"],
        overwhelmed: ["Organisiere den Papierkram/Termine für sie.", " Sag: 'Ich kümmere mich um X, ruh du dich aus.'", "Erinnere sie: 'Wir schaffen das.'"],
        happy: ["Genießt den Moment zu zweit.", "Mach ein Foto vom Bauch.", "Plant etwas Schönes für 'nach dem Baby'."]
    },
    postpartum: {
        tired: ["Nimm ihr das Baby für 1 Stunde ab (Spaziergang!).", "Mach ihr einen Kaffee/Tee (ungefragt!).", "Frag nicht 'Was soll ich tun?', sondern 'Leg dich hin'."],
        sad: ["Nimm sie einfach nur in den Arm. Klappe halten.", "Sag ihr: 'Du bist eine tolle Mama.'", "Bring ihr Schokolade oder ihr Soul-Food."],
        angry: ["Nimm es nicht persönlich. Es ist der Schlafmangel.", "Senke deine Stimme, bleib ruhig.", "Überneim das Wickeln/Tragen sofort."],
        overwhelmed: ["Priorisiere für sie: 'Ich mach X, du machst nur Y.'", "Schick sie kurz raus an die frische Luft.", "Sag: 'Das ist nur eine Phase.'"],
        happy: ["Freu dich mit ihr! Lob sie.", "Nutzt den Moment für ein kurzes Gespräch über euch.", "Kuschelt als Familie."]
    },
    loss: {
        tired: ["Schirm sie von der Außenwelt ab (Besuch absagen).", "Koch Essen, das man nur warm machen muss.", "Sorg für Stille in der Wohnung."],
        sad: ["Weine mit ihr, wenn dir danach ist. Zeig Gefühle.", "Zünde eine Kerze an.", "Sei einfach nur da. Physische Präsenz reicht."],
        angry: ["Sei ihr Blitzableiter. Halt es aus.", "Lass sie fluchen und schreien.", "Blocke dumme Sprüche von anderen ab."],
        overwhelmed: ["Entscheide kleine Dinge für sie (Essen, Einkauf).", "Sag Termine ab.", "Schaff ihr einen Rückzugsort."],
        happy: ["Darf sie sein! Hab kein schlechtes Gewissen.", "Lacht zusammen, wenn es geht.", "Erinnert euch an schöne Momente."]
    }
};

const PartnerPulse = ({ mode = 'pregnancy' }) => {
    const [selectedMood, setSelectedMood] = useState(null);

    // Ensure we have valid tips for the current mode, fallback to pregnancy if not found
    const currentTips = TIPS[mode] || TIPS.pregnancy;

    return (
        <div className="bg-white p-6 rounded-[32px] shadow-sm mb-4 border border-stone-100">
            <div className="flex items-center gap-2 mb-4">
                <div className="bg-rose-50 p-2 rounded-full text-rose-500">
                    <Heart size={20} />
                </div>
                <h3 className="font-bold text-stone-800">Partner Pulse</h3>
            </div>

            {!selectedMood ? (
                <div>
                    <p className="text-sm text-stone-500 mb-3 font-medium">Wie geht es ihr gerade?</p>
                    <div className="grid grid-cols-2 gap-2">
                        {MOODS.map(mood => (
                            <button
                                key={mood.id}
                                onClick={() => setSelectedMood(mood.id)}
                                className={`${mood.color} ${mood.border} border p-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-transform active:scale-95`}
                            >
                                <mood.icon size={16} />
                                {mood.label.split(' / ')[0]}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="animate-in fade-in zoom-in-95 duration-300">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold uppercase text-stone-400 tracking-wider">Sofort-Hilfe</span>
                        <button onClick={() => setSelectedMood(null)} className="text-xs text-stone-400 underline">Zurück</button>
                    </div>
                    <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100">
                        <ul className="space-y-3">
                            {currentTips[selectedMood] && currentTips[selectedMood].map((tip, i) => (
                                <li key={i} className="flex gap-3 text-stone-700 text-sm font-medium">
                                    <span className="text-emerald-500 font-bold">✓</span>
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className="text-[10px] text-center text-stone-300 mt-2">Du bist ihr Fels.</p>
                </div>
            )}
        </div>
    );
};

export default PartnerPulse;
