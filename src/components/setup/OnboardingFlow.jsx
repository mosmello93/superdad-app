import React, { useState } from 'react';
import { ChevronRight, Trophy, Zap, HeartHandshake } from 'lucide-react';

const OnboardingFlow = ({ onComplete }) => {
    const [step, setStep] = useState(0);

    const slides = [
        {
            title: "Mehr als nur dabei.",
            text: "Werde der Fels für deine Partnerin und der Held für dein Kind.",
            icon: Trophy,
            color: "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",
            bg: "bg-stone-50"
        },
        {
            title: "Dein zweites Gehirn.",
            text: "Termine, Wissen, Mental Load – wir halten dir den Rücken frei.",
            icon: Zap,
            color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400",
            bg: "bg-stone-50" // Keeping generic BG to avoid color flicker, focus on Icon
        },
        {
            title: "Starkes Team.",
            text: "Verstehe ihre Signale und bleibe Partner, nicht nur Vater.",
            icon: HeartHandshake,
            color: "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400",
            bg: "bg-stone-50"
        }
    ];

    const nextStep = () => {
        if (step < slides.length - 1) {
            setStep(step + 1);
        } else {
            onComplete();
        }
    };

    const currentSlide = slides[step];

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-between p-8 bg-[#FAFAF8] dark:bg-stone-950 transition-colors duration-500">
            {/* PROGRESS INDICATOR */}
            <div className="flex gap-2 mt-8">
                {slides.map((_, i) => (
                    <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-stone-800 dark:bg-stone-100' : 'w-2 bg-stone-200 dark:bg-stone-800'}`} />
                ))}
            </div>

            {/* CONTENT */}
            <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500" key={step}>
                <div className={`w-40 h-40 rounded-[48px] ${currentSlide.color} flex items-center justify-center mb-10 shadow-sm transition-transform duration-500 hover:scale-105`}>
                    <currentSlide.icon size={64} strokeWidth={1.5} />
                </div>
                <h1 className="text-4xl font-bold text-stone-800 dark:text-stone-100 mb-6 font-serif tracking-tight leading-tight">{currentSlide.title}</h1>
                <p className="text-stone-500 dark:text-stone-400 text-xl leading-relaxed max-w-xs font-medium">{currentSlide.text}</p>
            </div>

            {/* ACTION BUTTON */}
            <button
                onClick={nextStep}
                className="w-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 py-5 rounded-[24px] font-bold text-lg shadow-xl shadow-stone-200 dark:shadow-none hover:translate-y-[-2px] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
                {step === slides.length - 1 ? "Ich bin bereit" : "Weiter"}
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default OnboardingFlow;
