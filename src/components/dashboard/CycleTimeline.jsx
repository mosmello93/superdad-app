import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';

const CycleTimeline = ({ currentDay, cycleLength = 28, periodLength = 5 }) => {
    const containerRef = useRef(null);
    const itemRefs = useRef([]);
    const isScrollingRef = useRef(false);
    const [activeDay, setActiveDay] = useState(currentDay);

    // Auto-scroll to current day on initial mount
    useEffect(() => {
        if (itemRefs.current[currentDay]) {
            // Lock observer to prevent "jumping" or wrong active day during initial positioning
            isScrollingRef.current = true;

            setTimeout(() => {
                // Determine if element exists
                const element = itemRefs.current[currentDay];
                if (element) {
                    // Use 'auto' for instant placement, 'smooth' can cause drift with dynamic sizes
                    element.scrollIntoView({ behavior: 'auto', block: 'center' });

                    // Double assurance: ensure state matches
                    setActiveDay(currentDay);
                }

                // Release lock after layout settles
                setTimeout(() => {
                    isScrollingRef.current = false;
                }, 300);
            }, 100);
        }
    }, [currentDay]);

    // Intersection Observer for centering effect
    useEffect(() => {
        const fetchRefs = itemRefs.current;

        const observer = new IntersectionObserver(
            (entries) => {
                if (isScrollingRef.current) return; // Skip if manually scrolling

                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const day = parseInt(entry.target.getAttribute('data-day'));
                        setActiveDay(day);
                    }
                });
            },
            {
                root: containerRef.current,
                rootMargin: '-45% 0px -45% 0px', // Very tight center focus
                threshold: 0.1
            }
        );

        fetchRefs.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => {
            fetchRefs.forEach((el) => {
                if (el) observer.unobserve(el);
            });
        };
    }, [cycleLength]);

    const handleDayClick = (day) => {
        isScrollingRef.current = true; // Lock observer
        setActiveDay(day);

        // Immediate scroll to start movement
        itemRefs.current[day]?.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Correction scroll after expansion animation completion (500ms duration)
        // We wait slightly longer to ensure layout is stable
        setTimeout(() => {
            if (itemRefs.current[day]) {
                itemRefs.current[day].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            // Release lock shortly after correction
            setTimeout(() => {
                isScrollingRef.current = false;
            }, 150);
        }, 550);
    };

    const getPhaseAndColor = (day) => {
        // Menstruation
        if (day <= periodLength) return { id: 'menstruation', color: 'bg-red-500', lineColor: 'bg-red-400', text: 'text-red-600', label: 'Periode', border: 'border-red-200' };

        // Fertile Window
        const ovulationDay = cycleLength - 14;
        const fertileStart = ovulationDay - 5;
        const fertileEnd = ovulationDay + 1;

        if (day === ovulationDay) return { id: 'ovulation', color: 'bg-amber-400', lineColor: 'bg-amber-400', text: 'text-amber-600', label: 'Eisprung', border: 'border-amber-200' };
        if (day >= fertileStart && day <= fertileEnd) return { id: 'fertile', color: 'bg-emerald-400', lineColor: 'bg-emerald-400', text: 'text-emerald-600', label: 'Fruchtbar', border: 'border-emerald-200' };

        // Luteal/Follicular (Rest)
        return { id: 'normal', color: 'bg-stone-300 dark:bg-stone-600', lineColor: 'bg-stone-300 dark:bg-stone-700', text: 'text-stone-400', label: 'Zyklus', border: 'border-stone-200' };
    };

    const days = Array.from({ length: cycleLength }, (_, i) => i + 1);

    return (
        <div ref={containerRef} className="w-full h-full overflow-y-auto relative py-[50vh] space-y-0 scroll-smooth no-scrollbar mask-gradient">

            <div className="relative flex flex-col items-center w-full">

                {/* Previous Cycle Ghosts (Visual only) */}
                <div className="absolute -top-[300px] left-0 right-0 flex flex-col-reverse items-center justify-end h-[300px] pb-12 pointer-events-none gap-8 opacity-50 grayscale">
                    {[28, 27, 26].map((d) => (
                        <div key={`prev-${d}`} className="flex flex-col items-center scale-75">
                            <span className="text-3xl font-black text-stone-300 font-serif leading-none">{d}</span>
                            <div className="w-2 h-2 mt-2 rounded-full bg-stone-300"></div>
                            <div className="w-[1px] h-8 bg-stone-200 mt-2"></div>
                        </div>
                    ))}
                    <div className="text-[9px] uppercase tracking-widest text-stone-300 mb-4">Vorheriger Zyklus</div>
                </div>

                {days.map((day, index) => {
                    const { color, lineColor, text, label, id } = getPhaseAndColor(day);
                    const isToday = day === currentDay;
                    const isActive = day === activeDay;
                    const isFirstOfPhase = day === 1 || getPhaseAndColor(day - 1).id !== id;

                    return (
                        <div
                            key={day}
                            data-day={day}
                            ref={el => itemRefs.current[day] = el}
                            onClick={() => handleDayClick(day)}
                            className={`relative w-full flex justify-center group transition-all duration-500 ease-out cursor-pointer ${isActive ? 'my-12 z-20' : 'min-h-[40px] z-10'}`}
                        >
                            {/* Central Line Segment (Connecting to next) */}
                            {index !== days.length - 1 && (
                                <div className={`absolute left-1/2 top-4 bottom-[-44px] w-[3px] -translate-x-1/2 ${lineColor} opacity-80 rounded-full transition-colors duration-500`}></div>
                            )}

                            {/* Phase Label (Left Side, Floating) */}
                            {isFirstOfPhase && (
                                <div className={`absolute right-[55%] top-0 text-[10px] uppercase font-black tracking-widest py-1 px-3 text-right ${text} opacity-90`}>
                                    {label}
                                </div>
                            )}

                            {/* Center Node / Card */}
                            <div className={`
                                relative flex items-center justify-center transition-all duration-500 ease-out
                                ${isActive ? 'w-full' : 'w-8'}
                            `}>
                                {isActive ? (
                                    /* ACTIVE EXPANDED CARD */
                                    <div className="bg-white/90 dark:bg-stone-800/95 backdrop-blur-md w-3/4 max-w-[220px] p-4 rounded-3xl shadow-2xl border border-white/50 dark:border-white/10 ring-4 ring-red-50 dark:ring-red-900/10 transform scale-110 cursor-pointer transition-all duration-300">
                                        <div className="flex flex-col items-center">
                                            {isToday && <span className="text-[9px] uppercase tracking-widest font-bold text-red-500 mb-1 animate-pulse border border-red-100 dark:border-red-900/30 px-2 py-0.5 rounded-full">Heute</span>}
                                            <span className="text-4xl font-black text-stone-800 dark:text-stone-100 font-serif leading-none mb-1">{day}</span>

                                            {/* Date Display */}
                                            <span className="text-[10px] uppercase font-bold text-stone-400 mb-2">
                                                {(() => {
                                                    const date = new Date();
                                                    date.setDate(date.getDate() + (day - currentDay));
                                                    return date.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' });
                                                })()}
                                            </span>

                                            <span className="text-xs text-stone-500 font-medium text-center leading-tight">
                                                {label === 'Zyklus' ? 'Zyklustag' : label}
                                                {id === 'ovulation' && <span className="block text-[10px] text-amber-500 font-bold mt-1">Höchste Chance</span>}
                                                {id === 'fertile' && <span className="block text-[10px] text-emerald-500 font-bold mt-1">Fruchtbare Tage</span>}
                                            </span>
                                        </div>
                                        {/* Glow matches phase */}
                                        <div className={`absolute -inset-1 opacity-20 blur-xl rounded-3xl -z-10 transition-colors duration-500 ${color}`}></div>
                                    </div>
                                ) : (
                                    /* COLLAPSED NODE */
                                    <div className={`
                                        w-3 h-3 rounded-full border-2 transition-all duration-500
                                        ${isToday ? 'bg-red-500 border-red-200 scale-125 ring-2 ring-red-100' : `${color} border-white dark:border-stone-900`}
                                    `}></div>
                                )}
                            </div>

                            {/* Day Number (Right Side for non-active) */}
                            {!isActive && (
                                <div className={`absolute left-[55%] top-1/2 -translate-y-1/2 text-xs font-bold pl-5 transition-all duration-300 ${isToday ? 'text-red-500 scale-110' : 'text-stone-300 dark:text-stone-600'}`}>
                                    {day} {isToday && <span className="text-[8px] ml-1 uppercase border border-red-200 px-1 rounded-sm">Heute</span>}
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Next Cycle Ghosts */}
                <div className="absolute -bottom-[300px] left-0 right-0 flex flex-col items-center justify-start h-[300px] pt-12 pointer-events-none gap-8 opacity-50 grayscale">
                    <div className="text-[9px] uppercase tracking-widest text-stone-300 mt-4">Nächster Zyklus</div>
                    {[1, 2, 3].map((d) => (
                        <div key={`next-${d}`} className="flex flex-col items-center scale-75">
                            <div className="w-[1px] h-8 bg-stone-200 mb-2"></div>
                            <div className="w-2 h-2 mb-2 rounded-full bg-stone-300"></div>
                            <span className="text-3xl font-black text-stone-300 font-serif leading-none">{d}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CycleTimeline;
