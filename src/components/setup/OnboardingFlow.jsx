import React, { useState } from 'react';
import { ChevronRight, Trophy, Zap, HeartHandshake, ShieldCheck } from 'lucide-react';


const OnboardingFlow = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const [accepted, setAccepted] = useState(false);


    const slides = [
        {
            title: "Mehr als nur dabei.",
            text: "Werde der Fels für deine Partnerin und der Held für dein Kind.",
            image: "/mascot/papa_neutral.png",
            color: "bg-amber-100 dark:bg-amber-900/40",
            bg: "bg-stone-50"
        },
        {
            title: "Dein AI Coach.",
            text: "Frag ihn alles. Er kennt deine Woche, dein Baby und gibt dir Antworten statt nur Links.",
            image: "/mascot/papa_smart.png",
            color: "bg-indigo-100 dark:bg-indigo-900/40",
            bg: "bg-stone-50"
        },
        {
            title: "Starkes Team.",
            text: "Verstehe ihre Signale und bleibe Partner, nicht nur Vater. Tägliche Tipps helfen dir dabei.",
            image: "/mascot/papa_caring.png",
            color: "bg-rose-100 dark:bg-rose-900/40",
            bg: "bg-stone-50"
        },
        {
            title: "Deine Tools.",
            text: "Alles griffbereit: Vom Wehen-Timer über die Kliniktasche bis zum Namen-Finder. Wir haben an alles gedacht.",
            image: "/mascot/papa_builder.png",
            color: "bg-blue-100 dark:bg-blue-900/40",
            bg: "bg-stone-50"
        },
        {
            title: "Level Up!",
            text: "Sammle XP für gute Gewohnheiten, schalte Badges frei und werde zum Super-Dad.",
            image: "/mascot/papa_level5.png",
            color: "bg-emerald-100 dark:bg-emerald-900/40",
            bg: "bg-stone-50"
        },
        {
            title: "Sicherheit.",
            text: "Deine Daten gehören dir. Wir nutzen sichere Cloud-Technologie, aber du hast die Kontrolle.",
            image: "/mascot/papa_paperwork.png",
            color: "bg-stone-200 dark:bg-stone-800",
            bg: "bg-stone-50",
            isPrivacy: true
        }
    ];

    const nextStep = () => {
        if (slides[step].isPrivacy && !accepted) return;

        if (step < slides.length - 1) {
            setStep(step + 1);
        } else {
            localStorage.setItem('privacy_consent_ts', new Date().toISOString());
            onComplete();
        }
    };

    const currentSlide = slides[step];

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#FAFAF8] dark:bg-stone-950 transition-colors duration-500">
            {/* PROGRESS INDICATOR - Top Fixed */}
            <div className="flex-shrink-0 px-8 pt-8 pb-4 flex justify-center">
                <div className="flex gap-2">
                    {slides.map((_, i) => (
                        <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-stone-800 dark:bg-stone-100' : 'w-2 bg-stone-200 dark:bg-stone-800'}`} />
                    ))}
                </div>
            </div>

            {/* CONTENT - Scrollable Middle */}
            <div className="flex-1 overflow-y-auto min-h-0 w-full px-6 flex flex-col items-center">
                <div className="w-full max-w-sm flex flex-col items-center py-4">
                    <div className={`flex-shrink-0 w-48 h-48 sm:w-64 sm:h-64 rounded-[40px] ${currentSlide.color} flex items-center justify-center mb-6 shadow-sm transition-transform duration-500 hover:scale-105 p-6`}>
                        <img src={currentSlide.image} alt={currentSlide.title} className="w-full h-full object-contain drop-shadow-lg" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-stone-800 dark:text-stone-100 mb-4 font-serif tracking-tight leading-tight text-center">{currentSlide.title}</h1>
                    <p className="text-stone-500 dark:text-stone-400 text-lg sm:text-xl leading-relaxed font-medium mb-6 text-center max-w-xs">{currentSlide.text}</p>

                    {/* PRIVACY CHECKBOX */}
                    {currentSlide.isPrivacy && (
                        <div className="bg-white dark:bg-stone-900 p-4 rounded-xl shadow-sm border border-stone-100 dark:border-stone-800 w-full animate-in slide-in-from-bottom-4 mb-4">
                            <label className="flex items-start gap-3 cursor-pointer text-left">
                                <div className="relative flex items-center mt-1">
                                    <input
                                        type="checkbox"
                                        checked={accepted}
                                        onChange={(e) => setAccepted(e.target.checked)}
                                        className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 border-stone-300 bg-white transition-all checked:border-emerald-500 checked:bg-emerald-500 hover:border-emerald-400"
                                    />
                                    <ShieldCheck size={14} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" />
                                </div>
                                <span className="text-sm text-stone-600 dark:text-stone-300">
                                    Ich stimme der Datenverarbeitung zu und akzeptiere die <button onClick={(e) => { e.preventDefault(); window.open('/datenschutz.html', '_blank'); }} className="text-indigo-600 font-bold underline decoration-indigo-300 underline-offset-2">Datenschutzerklärung</button>.
                                </span>
                            </label>
                        </div>
                    )}
                </div>
            </div>

            {/* ACTION BUTTON - Bottom Fixed */}
            <div className="flex-shrink-0 px-8 pb-8 pt-4 bg-[#FAFAF8] dark:bg-stone-950 z-10 w-full max-w-md mx-auto">
                <button
                    onClick={nextStep}
                    disabled={currentSlide.isPrivacy && !accepted}
                    className={`w-full py-5 rounded-[24px] font-bold text-lg shadow-xl shadow-stone-200 dark:shadow-none transition-all flex items-center justify-center gap-2
                        ${currentSlide.isPrivacy && !accepted
                            ? 'bg-stone-200 text-stone-400 dark:bg-stone-800 dark:text-stone-600 cursor-not-allowed transform-none'
                            : 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:translate-y-[-2px] active:scale-95'}`}
                >
                    {step === slides.length - 1 ? "Ich bin bereit" : "Weiter"}
                    <ChevronRight size={20} />
                </button>
            </div>


        </div>
    );
};

export default OnboardingFlow;
