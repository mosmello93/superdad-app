import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

const CycleCalendar = ({ currentDay, cycleLength = 28, periodLength = 5 }) => {
    // Current date (Today)
    const today = new Date();

    // We want to show the current month
    const [viewDate, setViewDate] = React.useState(new Date());

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        return Array.from({ length: days }, (_, i) => {
            return new Date(year, month, i + 1);
        });
    };

    const daysInMonth = getDaysInMonth(viewDate);

    // Calculate Cycle Start Date relative to Today
    // If today is day 5, then start was 4 days ago.
    const cycleStartDate = new Date();
    cycleStartDate.setDate(today.getDate() - (currentDay - 1));
    cycleStartDate.setHours(0, 0, 0, 0);

    const getCycleDayForDate = (date) => {
        // Normalize time
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);

        const diffTime = d.getTime() - cycleStartDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        // Handle positive and negative modulo correctly
        // ((a % n) + n) % n
        const cycleDayZeroIndex = ((diffDays % cycleLength) + cycleLength) % cycleLength;
        return cycleDayZeroIndex + 1; // 1-indexed
    };

    const getPhaseAndColor = (day) => {
        // Menstruation
        if (day <= periodLength) return { id: 'menstruation', color: 'bg-red-500', text: 'text-red-600', label: 'Periode' };

        // Fertile Window
        const ovulationDay = cycleLength - 14;
        const fertileStart = ovulationDay - 5;
        const fertileEnd = ovulationDay + 1;

        if (day === ovulationDay) return { id: 'ovulation', color: 'bg-amber-400', text: 'text-amber-600', label: 'Eisprung' };
        if (day >= fertileStart && day <= fertileEnd) return { id: 'fertile', color: 'bg-emerald-400', text: 'text-emerald-600', label: 'Fruchtbar' };

        // Luteal/Follicular (Rest)
        return { id: 'normal', color: 'bg-stone-100 dark:bg-stone-800', text: 'text-stone-400', label: 'Zyklus' };
    };

    const nextMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    };

    const weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

    // Align the first day of the month
    const firstDayOfMonth = daysInMonth[0].getDay(); // 0 is Sunday
    // Adjust to Monday start (0=Mon, 6=Sun)
    const startOffset = (firstDayOfMonth + 6) % 7;

    const blanks = Array.from({ length: startOffset }, (_, i) => i);

    return (
        <div className="w-full h-full overflow-y-auto px-4 py-8 pb-32">

            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-8 px-2">
                <button onClick={prevMonth} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition">
                    <ChevronLeft className="text-stone-600 dark:text-stone-300" />
                </button>
                <h2 className="text-xl font-bold font-serif text-stone-800 dark:text-stone-100 capitalize">
                    {viewDate.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
                </h2>
                <button onClick={nextMonth} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition">
                    <ChevronRight className="text-stone-600 dark:text-stone-300" />
                </button>
            </div>

            {/* Grid */}
            <div className="bg-white dark:bg-stone-800 rounded-3xl p-4 shadow-sm border border-stone-100 dark:border-stone-700">
                {/* Weekdays */}
                <div className="grid grid-cols-7 mb-4">
                    {weekDays.map(d => (
                        <div key={d} className="text-center text-xs font-bold text-stone-400 uppercase tracking-widest py-2">
                            {d}
                        </div>
                    ))}
                </div>

                {/* Days */}
                <div className="grid grid-cols-7 gap-y-4 gap-x-2">
                    {blanks.map((b) => <div key={`blank-${b}`}></div>)}

                    {daysInMonth.map((date) => {
                        const cycleDay = getCycleDayForDate(date);
                        const phase = getPhaseAndColor(cycleDay);
                        const isToday = date.toDateString() === today.toDateString();

                        return (
                            <div key={date.toISOString()} className="flex flex-col items-center gap-1 group relative">
                                <div className={`
                                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold relative transition-all
                                    ${isToday ? 'ring-2 ring-red-500 ring-offset-2 dark:ring-offset-stone-900 scale-110' : ''}
                                    ${phase.id !== 'normal' ? 'text-white' : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700'}
                                    ${phase.id === 'menstruation' ? phase.color : ''}
                                    ${phase.id === 'fertile' ? phase.color : ''}
                                    ${phase.id === 'ovulation' ? phase.color : ''}
                                `}>
                                    {date.getDate()}

                                    {/* Small indicator dot for cycle day if needed, or just color */}
                                </div>

                                {/* Cycle Day Number (Small below) */}
                                <span className="text-[9px] text-stone-300 font-medium">
                                    Tag {cycleDay}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Legend */}
            <div className="mt-8 grid grid-cols-2 gap-3 px-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-xs font-medium text-stone-500">Periode</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                    <span className="text-xs font-medium text-stone-500">Fruchtbar</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <span className="text-xs font-medium text-stone-500">Eisprung</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border-2 border-red-500"></div>
                    <span className="text-xs font-medium text-stone-500">Heute</span>
                </div>
            </div>

        </div>
    );
};

export default CycleCalendar;
