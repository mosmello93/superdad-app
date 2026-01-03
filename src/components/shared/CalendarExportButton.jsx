import React from 'react';
import { CalendarRange } from 'lucide-react';
import { generateICS, downloadICS } from '../../utils/calendar';

const CalendarExportButton = ({
    title,
    description,
    date,
    durationMinutes = 60,
    location = '',
    className = ""
}) => {

    const handleExport = (e) => {
        e.stopPropagation(); // Prevent bubbling if inside a clickable card

        if (!date) return;

        const startTime = new Date(date);
        const endTime = new Date(startTime.getTime() + durationMinutes * 60000);

        const icsContent = generateICS({
            title: `HeyPapa: ${title}`,
            description: `${description}\n\nErstellt mit der HeyPapa App.`,
            startTime,
            endTime,
            location
        });

        downloadICS(`${title.replace(/\s+/g, '_')}.ics`, icsContent);
    };

    return (
        <button
            onClick={handleExport}
            className={`flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors ${className}`}
        >
            <CalendarRange size={16} />
            <span>Im Kalender speichern</span>
        </button>
    );
};

export default CalendarExportButton;
