import React, { useState } from 'react';
import { Info, Check, ChevronRight, Circle } from 'lucide-react';

const getOnboardingContent = (mode, babyName, gender) => {
    const name = babyName || (gender === 'boy' ? 'dein Kleiner' : gender === 'girl' ? 'deine Kleine' : 'dein Baby');
    const nameGen = babyName ? `${babyName}s` : (gender === 'boy' ? 'seine' : gender === 'girl' ? 'ihre' : 'seine/ihre');

    return {
        pregnancy: {
            home: [
                { title: "Dein Cockpit", text: `Hier siehst du sofort, in welcher Woche ihr seid, wie groß ${name} schon ist und deinen aktuellen XP-Level.` },
                { title: "Daily Dads", text: "Tägliche kleine Aufgaben (Habits) halten dich auf Kurs. Klicke sie an, um sie zu erledigen. Manche (wie 'Oase') haben mehr Details." },
                { title: "Beziehung pflegen", text: "Nutze den 'Partner Pulse' und den AI-Vibe-Check unten, um eure Stimmung zu tracken und im Gespräch zu bleiben." }
            ],
            tools: [
                { title: "Deine Werkzeuge", text: `Hier findest du alles Praktische für ${name}: Den Wehen-Timer, die Packliste und Hilfe bei Bürokratie.` },
                { title: "Dad Log", text: "Dein privates Tagebuch. Schreib deine Gedanken, Ängste oder Momente auf. Nur für dich." },
                { title: "To-Dos", text: "Ganz unten findest du eine Checkliste für Aufgaben. Hake ab, was erledigt ist, um XP zu sammeln!" }
            ],
            knowledge: [
                { title: "Wissen ist Macht", text: "Jede Woche neue Infos passend zur SSW. Kein Blabla, sondern Fakten: Was passiert im Bauch? Was braucht sie?" },
                { title: "Deep Dives", text: "Unten findest du vertiefende Artikel zu Themen wie Finanzen, Geburtshilfe oder Mental Load." }
            ]
        },
        postpartum: {
            home: [
                { title: "Wochenbett-Modus", text: `Der Fokus liegt jetzt auf Fürsorge. Wie geht es der Mama? Wie geht es ${name}? Und dir?` },
                { title: "Neue Habits", text: "Deine Daily Dads haben sich angepasst: 'Nachtschicht übernehmen', 'Still-Snacks bringen' sind jetzt deine Missionen." },
                { title: "Check-In", text: "Vergiss dich selbst nicht. Nutze den Vibe-Check auch, um zu schauen, wie es DIR in der neuen Rolle geht." }
            ],
            tools: [
                { title: "Helfer im Chaos", text: `Tracke die Meilensteine (erstes Lächeln!) von ${name} und finde wichtige Adressen für Notfälle.` },
                { title: "Papierkram", text: "Direkte Links zu Elterngeld und Kindergeld helfen dir, die Anträge schnell vom Tisch zu bekommen." },
                { title: "Dad Log", text: "Schlafmangel macht vergesslich. Notiere hier besondere Momente oder einfach nur Frust. Es hilft." }
            ],
            knowledge: [
                { title: "Neue Realität", text: "Wissen über Rückbildung, Baby-Schlaf und das 'Vierte Trimester'. Alles, um die erste Zeit zu meistern." }
            ]
        },
        loss: {
            home: [
                { title: "Euer Schutzraum", text: "Kein Leistungsdruck. Hier geht es nur um kleine Gesten der Achtsamkeit für dich und euch." },
                { title: "Deep Talk", text: "Karten mit Fragen, die helfen, ins Gespräch zu kommen, wenn die Worte fehlen." }
            ],
            tools: [
                { title: "Der Schild", text: "Tools, um Besuch abzuwehren oder Kommunikation zu managen, wenn ihr Ruhe braucht." },
                { title: "Erinnerungen", text: "Das Dad Log ist hier besonders wichtig. Schreib auf, was dich bewegt. Es ist ein Ventil." }
            ],
            knowledge: [
                { title: "Begleiter", text: "Du bist nicht allein. Hier findest du geprüfte Infos zu Trauerphasen und wo du professionelle Hilfe findest." }
            ]
        }
    };
};

const TabOnboarding = ({ mode, activeTab, onDismiss, babyName, gender }) => {
    const [slideIndex, setSlideIndex] = useState(0);

    const contentData = getOnboardingContent(mode, babyName, gender);
    const modeContent = contentData[mode] || contentData.pregnancy;
    const slides = modeContent[activeTab];

    if (!slides || slides.length === 0) return null;

    const currentSlide = slides[slideIndex];
    const isLast = slideIndex === slides.length - 1;

    const handleNext = () => {
        if (isLast) {
            onDismiss();
        } else {
            setSlideIndex(prev => prev + 1);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="w-full max-w-sm bg-white p-6 rounded-[32px] shadow-2xl relative overflow-hidden flex flex-col min-h-[300px]">

                {/* Header Decoration */}
                <div className="flex justify-center mb-6">
                    <div className="bg-indigo-100 p-4 rounded-full text-indigo-600">
                        <Info size={32} />
                    </div>
                </div>

                {/* Content */}
                <div key={slideIndex} className="flex-grow text-center animate-in slide-in-from-right duration-300">
                    <h3 className="text-2xl font-bold text-stone-800 mb-3">{currentSlide.title}</h3>
                    <p className="text-stone-600 leading-relaxed font-medium">
                        {currentSlide.text}
                    </p>
                </div>

                {/* Footer: Dots & Button */}
                <div className="mt-8 flex flex-col items-center gap-4">
                    {/* Dots */}
                    <div className="flex gap-2">
                        {slides.map((_, idx) => (
                            <Circle
                                key={idx}
                                size={8}
                                className={`transition-all duration-300 ${idx === slideIndex ? 'fill-indigo-600 text-indigo-600 scale-125' : 'text-stone-300 fill-stone-300'}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        className="w-full bg-stone-900 text-white py-3 rounded-2xl font-bold text-sm shadow-lg hover:bg-stone-800 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        {isLast ? (
                            <>
                                <Check size={18} />
                                Verstanden
                            </>
                        ) : (
                            <>
                                Weiter
                                <ChevronRight size={18} />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TabOnboarding;
