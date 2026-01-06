import React from 'react';

const CycleWheel = ({ currentDay, cycleLength = 28, periodLength = 5, phase }) => {
    // 1. Calculate geometry
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const center = 50;

    // Helper to get stroke-dasharray for a segment
    // startDay: 1-based start day
    // duration: in days
    const getSegmentStroke = (startDay, duration) => {
        const startFraction = (startDay - 1) / cycleLength;
        const lengthFraction = duration / cycleLength;

        const dashLength = lengthFraction * circumference;
        const gapLength = circumference - dashLength;
        const offset = circumference * 0.25 - (startFraction * circumference); // Start at top (rotate -90 is handled by CSS, but standard SVG starts at 3 o'clock. -90 makes it 12 o'clock.)
        // Actually, let's keep it simple: Start at 12 o'clock (top).
        // SVG circle starts at 3 o'clock. We rotate -90deg. So 0 degrees is top.

        return {
            strokeDasharray: `${dashLength} ${gapLength}`,
            strokeDashoffset: - (startFraction * circumference)
        };
    };

    // Segments
    // Menstruation: Day 1 to periodLength
    const menstruationProps = getSegmentStroke(1, periodLength);

    // Fertile: 
    // Ovulation is roughly 14 days before end of cycle.
    // Fertile window is Ovulation - 5 days ... Ovulation + 1 day?
    // Let's approximate: 14 days before end is Ovulation. Window is 6 days centered/ending there.
    const ovulationDay = cycleLength - 14;
    const fertileStart = ovulationDay - 5;
    const fertileDuration = 6;
    const fertileProps = getSegmentStroke(fertileStart, fertileDuration);

    // Current Day Indicator
    // Angle in degrees
    const currentDayAngle = ((currentDay - 1) / cycleLength) * 360;

    // Past Path (Grayed out)
    const pastProps = getSegmentStroke(1, currentDay - 1);

    return (
        <div className="relative w-full aspect-square max-w-[280px] mx-auto group">
            {/* Background Circle */}
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-sm transition-transform duration-700 ease-in-out">
                {/* Base Track */}
                <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="6" className="text-stone-100 dark:text-stone-800" />

                {/* Fertile Phase (Gold/Green) - Future */}
                <circle
                    cx="50" cy="50" r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    className="text-emerald-300 dark:text-emerald-700 opacity-40"
                    style={fertileProps}
                    strokeLinecap="round"
                />

                {/* Menstruation (Red) - Future */}
                <circle
                    cx="50" cy="50" r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    className="text-rose-400 dark:text-rose-600"
                    style={menstruationProps}
                    strokeLinecap="round"
                />

                {/* Past Overlay (Dimming) */}
                <circle
                    cx="50" cy="50" r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    className="text-stone-300 dark:text-stone-600 opacity-50"
                    style={pastProps}
                    strokeLinecap="round"
                />
            </svg>

            {/* Rotating Indicator */}
            <div
                className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                style={{ transform: `rotate(${currentDayAngle}deg)` }}
            >
                <div className="h-full w-full flex justify-center pt-[2px]">
                    {/* The Dot with Pulse */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-rose-500 rounded-full animate-ping opacity-75"></div>
                        <div className="w-4 h-4 rounded-full bg-rose-500 dark:bg-rose-100 border-2 border-white dark:border-stone-900 shadow-lg relative z-10"></div>
                    </div>
                </div>
            </div>

            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none animate-in fade-in zoom-in-75 duration-700">
                <div className="text-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 animate-pulse">Tag</span>
                    <div className="text-5xl font-black text-stone-800 dark:text-stone-100 font-serif leading-none tracking-tight">{currentDay}</div>
                    <div className="text-xs text-stone-400 font-medium mt-1">von {cycleLength}</div>
                </div>
            </div>

            {/* Context Labels (Optional visualization) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-stone-300 dark:text-stone-600 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                {currentDay < fertileStart ? 'Fruchtbarkeit voraus' : (currentDay > ovulationDay ? 'Warten...' : 'Hochphase')}
            </div>
        </div>
    );
};

export default CycleWheel;
