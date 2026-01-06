import React, { useEffect, useRef, useState } from 'react';
import { PREGNANCY_WEEKS } from '../../data/content';

const PregnancyTimeline = ({ currentWeek, setWeek, onWeekChange, realCurrentWeek }) => {
    const containerRef = useRef(null);
    const itemRefs = useRef([]);
    const isScrollingRef = useRef(false);
    const [activeWeek, setActiveWeek] = useState(currentWeek);

    // Helper to center an element explicitly
    const scrollToWeek = (week, behavior = 'smooth') => {
        const item = itemRefs.current[week];
        if (item) {
            item.scrollIntoView({
                behavior: behavior,
                block: 'nearest',
                inline: 'center'
            });
        }
    };

    // Live Scroll Update (replaces IntersectionObserver)
    const handleScroll = () => {
        if (isScrollingRef.current) return;
        if (!containerRef.current) return;

        const container = containerRef.current;
        const containerCenter = container.scrollLeft + (container.clientWidth / 2);

        let closestWeek = -1;
        let minDiff = Infinity;

        weeks.forEach((week) => {
            const element = itemRefs.current[week];
            if (element) {
                const elementCenter = element.offsetLeft + (element.offsetWidth / 2);
                const diff = Math.abs(containerCenter - elementCenter);

                if (diff < minDiff) {
                    minDiff = diff;
                    closestWeek = week;
                }
            }
        });

        if (closestWeek !== -1 && closestWeek !== activeWeek) {
            setActiveWeek(closestWeek);
            if (onWeekChange) onWeekChange(closestWeek);
        }
    };

    // Initial scroll (Instant)
    useEffect(() => {
        // if (currentWeek === activeWeek) return; // REMOVED: prevents initial scroll on mount!

        if (itemRefs.current[currentWeek]) {
            isScrollingRef.current = true;

            // Immediate attempt (for fast devices)
            scrollToWeek(currentWeek, 'auto');
            setActiveWeek(currentWeek);

            // Retry after animation (for slower devices/animations)
            setTimeout(() => {
                scrollToWeek(currentWeek, 'auto');
                // Release lock
                setTimeout(() => {
                    isScrollingRef.current = false;
                }, 100);
            }, 600);
        }
    }, [currentWeek]);

    const handleWeekClick = (week) => {
        isScrollingRef.current = true;
        setActiveWeek(week);
        if (onWeekChange) onWeekChange(week);

        scrollToWeek(week, 'smooth');

        setTimeout(() => {
            isScrollingRef.current = false;
        }, 800);
    };

    const getTrimesterColor = (week) => {
        if (week <= 12) return 'from-rose-50 to-orange-50 dark:from-rose-900/20 dark:to-orange-900/20 border-rose-100 dark:border-rose-900';
        if (week <= 27) return 'from-sky-50 to-indigo-50 dark:from-sky-900/20 dark:to-indigo-900/20 border-sky-100 dark:border-sky-900';
        return 'from-purple-50 to-fuchsia-50 dark:from-purple-900/20 dark:to-fuchsia-900/20 border-purple-100 dark:border-purple-900';
    };

    const weeks = Array.from({ length: 39 }, (_, i) => i + 4); // Weeks 4 to 42

    return (
        <div
            ref={containerRef}
            onScroll={handleScroll}
            className="w-full h-full overflow-x-auto overflow-y-visible relative flex items-center px-[50%] space-x-0 scroll-smooth no-scrollbar mask-gradient-x py-8 snap-x snap-mandatory"
        >
            {/* Background Decorations */}
            <div className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/80 via-white/40 to-transparent dark:from-stone-900/80 dark:to-transparent pointer-events-none z-10 transition-colors duration-500"></div>

            {weeks.map((week, index) => {
                const isActive = week === activeWeek;
                const isRealCurrentWeek = week === realCurrentWeek;
                const data = PREGNANCY_WEEKS[week] || { image: null, size: '?', cm: 0, g: 0 };

                return (
                    <div
                        key={week}
                        data-week={week}
                        ref={el => itemRefs.current[week] = el}
                        onClick={() => handleWeekClick(week)}
                        className="relative flex-shrink-0 flex items-center justify-center snap-center w-[160px] sm:w-[180px] z-10"
                        style={{ scrollSnapStop: 'always' }}
                    >
                        {/* Connecting Line (Umbilical Cord) */}
                        {index !== weeks.length - 1 && (
                            <div className="absolute top-1/2 left-1/2 w-full h-[3px] -translate-y-1/2 bg-stone-200 dark:bg-stone-700 rounded-full -z-10"></div>
                        )}

                        {/* Active State: Card with Fruit */}
                        {isActive ? (
                            <div className={`
                                relative w-[240px] sm:w-[280px] -mx-[40px] sm:-mx-[50px]
                                bg-gradient-to-br ${data.color || getTrimesterColor(week)}
                                backdrop-blur-sm sm:backdrop-blur-md rounded-[32px] p-6 shadow-xl border 
                                transform-gpu will-change-transform scale-100 transition-all duration-500
                                flex flex-col items-center text-center z-20
                            `}>
                                <div className="absolute -top-3 bg-white dark:bg-stone-800 px-3 py-1 rounded-full text-xs font-bold text-stone-500 shadow-sm border border-stone-100 dark:border-stone-700">
                                    SSW {week}
                                </div>

                                {data.image ? (
                                    <div className="w-28 h-28 sm:w-32 sm:h-32 relative my-2 filter drop-shadow-lg transition-transform duration-500 hover:scale-110">
                                        <img src={data.image} alt={data.size} className="w-full h-full object-contain" />
                                    </div>
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center my-4">
                                        <span className="text-4xl">?</span>
                                    </div>
                                )}

                                <div>
                                    <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100 leading-tight mb-3">
                                        {data.size.replace('ein ', '').replace('eine ', '')}
                                    </h3>
                                </div>

                                {/* Current Week Badge */}
                                {isRealCurrentWeek && (
                                    <div className="absolute -bottom-3 bg-indigo-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md animate-pulse z-30">
                                        Aktuell
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Inactive State: Thumbnail Fruit */
                            <div className={`
                                relative flex flex-col items-center justify-center transition-all duration-500
                                transform hover:scale-110
                                ${isRealCurrentWeek ? 'scale-110' : 'scale-75 opacity-60'}
                            `}>
                                {/* Fruit Thumbnail */}
                                <div className={`
                                    w-14 h-14 rounded-full bg-white dark:bg-stone-800 border-2 overflow-hidden shadow-sm flex items-center justify-center p-2
                                    ${isRealCurrentWeek ? 'border-indigo-500 ring-4 ring-indigo-500/20' : 'border-stone-200 dark:border-stone-700'}
                                `}>
                                    {data.image ? (
                                        <img src={data.image} alt="" className="w-full h-full object-contain filter " />
                                    ) : (
                                        <span className="text-xs text-stone-300 font-bold">{week}</span>
                                    )}
                                </div>

                                {/* Week Number underneath */}
                                <span className={`mt-2 text-xs font-bold ${isRealCurrentWeek ? 'text-indigo-600 dark:text-indigo-400' : 'text-stone-400'}`}>
                                    {week}
                                </span>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default PregnancyTimeline;
