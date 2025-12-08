import React, { useState } from 'react';
import { Info, Check, ChevronRight, Circle } from 'lucide-react';

const getOnboardingContent = (mode, babyName, gender) => {
    const name = babyName || (gender === 'boy' ? 'dein Kleiner' : gender === 'girl' ? 'deine Kleine' : 'dein Baby');

    return {
        pregnancy: {
            home: [
                { title: "Dein Cockpit", text: `Hier siehst du sofort, in welcher Woche ihr seid, wie groß ${name} schon ist und deinen aktuellen XP-Level.` },
                { title: "Daily Dads", text: "Tägliche Aufgaben (Habits) halten dich auf Kurs. Klicke sie an, um sie zu erledigen." },
                { title: "Dein Dad Log", text: "Dein Tagebuch. Schreib direkt hier deine Gedanken auf. Es ist privat und nur für dich." },
                { title: "Navigation", text: "Unten findest du 4 Bereiche: Home (Aufgaben), Team (Wir), Tools (Helfer) und Wissen (Infos)." }
            ],
            team: [
                { title: "Euer Wir", text: "Beziehung ist Arbeit. Hier findest du alles, um mit deiner Partnerin in Verbindung zu bleiben." },
                { title: "Partner Pulse", text: "Wie geht es ihr heute? Ein schneller Check, um Empathie zu zeigen." },
                { title: "Vibe Check", text: "Wie ist die Stimmung zwischen euch? Nutze die AI-Analyse ganz unten." },
                { title: "Deep Talk", text: "Karten mit Fragen für tiefe Gespräche, wenn euch die Themen ausgehen." }
            ],
            tools: [
                { title: "Deine Werkzeuge", text: `Hier findest du alles Praktische für ${name}: Den Wehen-Timer, die Packliste und Hilfe bei Bürokratie.` },
                { title: "To-Dos", text: "Hast du alles erledigt? Hake deine Aufgaben in der Checkliste ab." }
            ],
            knowledge: [
                { title: "Wissen ist Macht", text: "Jede Woche neue Infos passend zur SSW. Fakten statt Blabla." },
                { title: "Deep Dives", text: "Hier gibt es vertiefende Artikel zu Themen wie Finanzen, Geburtshilfe oder Mental Load." }
            ]
        },
        postpartum: {
            home: [
                { title: "Wochenbett-Modus", text: `Der Fokus liegt auf Fürsorge. Wie geht es der Mama? Wie geht es ${name}?` },
                { title: "Neue Habits", text: "Deine Daily Dads haben sich angepasst: 'Nachtschicht übernehmen', 'Essen machen' sind jetzt deine Missionen." },
                { title: "Dad Log", text: "Schlafmangel macht vergesslich. Notiere hier besondere Momente oder einfach nur Frust." },
                { title: "Navigation", text: "Unten findest du 4 Bereiche: Home (Aufgaben), Team (Wir), Tools (Helfer) und Wissen (Infos)." }
            ],
            team: [
                { title: "Eltern-Team", text: "Ihr seid jetzt Eltern, aber bleibt ein Paar. Nutzt diesen Bereich, um euch nicht zu verlieren." },
                { title: "Check-In", text: "Wie geht es euch wirklich? Macht regelmäßig den Vibe-Check." },
                { title: "Deep Talk", text: "Fragen für Elternpaare. Damit ihr nicht nur über Windeln redet." }
            ],
            tools: [
                { title: "Helfer im Chaos", text: `Tracke die Meilensteine von ${name} und finde wichtige Adressen für Notfälle.` },
                { title: "Papierkram", text: "Direkte Links zu Elterngeld und Kindergeld helfen dir bei den Anträgen." }
            ],
            knowledge: [
                { title: "Neue Realität", text: "Wissen über Rückbildung, Baby-Schlaf und das 'Vierte Trimester'. Alles, um die erste Zeit zu meistern." }
            ]
        },
        loss: {
            home: [
                { title: "Euer Schutzraum", text: "Kein Leistungsdruck. Hier geht es nur um kleine Gesten der Achtsamkeit." },
                { title: "Dad Log", text: "Das Tagebuch ist hier besonders wichtig. Schreib auf, was dich bewegt. Es ist ein Ventil." },
                { title: "Navigation", text: "Unten findest du 4 Bereiche: Home (Aufgaben), Team (Wir), Tools (Helfer) und Wissen (Infos)." }
            ],
            team: [
                { title: "Verbunden bleiben", text: "Trauer kann einsam machen. Hier findet ihr Impulse, um im Gespräch zu bleiben." },
                { title: "Deep Talk", text: "Fragen, die helfen, das Unaussprechliche auszusprechen." }
            ],
            tools: [
                { title: "Der Schild", text: "Tools, um Besuch abzuwehren oder Kommunikation nach außen zu managen." }
            ],
            knowledge: [
                { title: "Begleiter", text: "Du bist nicht allein. Geprüfte Infos zu Trauerphasen und Hilfsangeboten." }
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
