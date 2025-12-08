import React, { useState } from 'react';
import { ChevronRight, Shield, Zap, Heart } from 'lucide-react';

const OnboardingFlow = ({ onComplete }) => {
    const [step, setStep] = useState(0);

    const slides = [
        {
            title: "Dein Begleiter",
            text: "Egal ob Schwangerschaft, Wochenbett oder Verlust – wir sind da.",
            icon: Shield,
            color: "bg-indigo-100 text-indigo-600",
            bg: "bg-indigo-50"
        },
        {
            title: "Alles im Blick",
            text: "Kein Blabla. Nur die wichtigsten Infos, Termine & To-Dos für dich.",
            icon: Zap,
            color: "bg-amber-100 text-amber-600",
            bg: "bg-amber-50"
        },
        {
            title: "Starker Partner",
            text: "Wissen, mentale Stütze & Beziehungstipps. Du schaffst das.",
            icon: Heart,
            color: "bg-rose-100 text-rose-600",
            bg: "bg-rose-50"
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
        <div className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-8 transition-colors duration-700 ${currentSlide.bg}`}>
            {/* PROGRESS INDICATOR */}
            <div className="flex gap-2 mt-8">
                {slides.map((_, i) => (
                    <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-stone-800' : 'w-2 bg-stone-300'}`} />
                ))}
            </div>

            {/* CONTENT */}
            <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500 key={step}">
                <div className={`w-32 h-32 rounded-[40px] ${currentSlide.color} flex items-center justify-center mb-8 shadow-sm transition-transform duration-500 hover:scale-105`}>
                    <currentSlide.icon size={48} strokeWidth={1.5} />
                </div>
                <h1 className="text-3xl font-bold text-stone-800 mb-4 font-serif">{currentSlide.title}</h1>
                <p className="text-stone-600 text-lg leading-relaxed max-w-xs">{currentSlide.text}</p>
            </div>

            {/* ACTION BUTTON */}
            <button
                onClick={nextStep}
                className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
            >
                {step === slides.length - 1 ? "Los geht's" : "Weiter"}
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default OnboardingFlow;
