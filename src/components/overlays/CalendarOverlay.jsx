import React, { useMemo } from 'react';
import { X, Calendar as CalendarIcon, Download, AlertCircle } from 'lucide-react';
import CalendarExportButton from '../shared/CalendarExportButton';

// Helper to calculate dates
const calculateImportantDates = (dueDate, birthDate, mode) => {
    if (!dueDate && !birthDate) return [];

    const dates = [];
    const referenceDate = birthDate ? new Date(birthDate) : new Date(dueDate);

    // 1. Week Changes (Next 4 weeks)
    // Only shows if we are tracking weeks (Pregnancy or Postpartum)
    const today = new Date();

    // U-Untersuchungen (Germany Standard) based on BIRTH DATE
    // If we only have due date (Pregnancy), we can estimate U1-U3
    if (birthDate || (mode === 'pregnancy' && dueDate)) {
        const baseDate = birthDate ? new Date(birthDate) : new Date(dueDate);

        // Helper to add days
        const add = (d, days) => new Date(d.getTime() + days * 86400000);

        // U1: Direct after birth (skipped)
        // U2: 3-10 days
        dates.push({
            title: 'U2 Untersuchung',
            description: 'Basis-Check für Neugeborene (3.-10. Lebenstag)',
            start: add(baseDate, 3),
            end: add(baseDate, 10),
            type: 'medical'
        });

        // U3: 4-5 weeks
        dates.push({
            title: 'U3 Untersuchung',
            description: 'Hüft-Ultraschall & Entwicklung (4.-5. Woche)',
            start: add(baseDate, 28), // 4 weeks
            end: add(baseDate, 35), // 5 weeks
            type: 'medical'
        });

        // U4: 3-4 months
        dates.push({
            title: 'U4 Untersuchung',
            description: 'Impfungen & Motorik (3.-4. Monat)',
            start: add(baseDate, 90), // ~3 months
            end: add(baseDate, 120), // ~4 months
            type: 'medical'
        });

        // U5: 6-7 months
        dates.push({
            title: 'U5 Untersuchung',
            description: 'Beweglichkeit & Geschicklichkeit (6.-7. Monat)',
            start: add(baseDate, 180),
            end: add(baseDate, 210),
            type: 'medical'
        });
    }

    // Filter out dates that are too far in the past (older than 1 month)
    const oneMonthAgo = new Date(today.getTime() - 30 * 86400000);
    return dates.filter(d => d.end > oneMonthAgo).sort((a, b) => a.start - b.start);
};

const CalendarOverlay = ({ onClose, dueDate, birthDate, mode }) => {
    const dates = useMemo(() => calculateImportantDates(dueDate, birthDate, mode), [dueDate, birthDate, mode]);

    const formatDate = (date) => {
        return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#F5F5F0] dark:bg-stone-950 animate-in slide-in-from-bottom-full duration-500">
            {/* Header */}
            <div className="bg-white dark:bg-stone-900 px-6 pt-12 pb-6 shadow-sm flex items-center justify-between z-10 shrink-0 border-b border-stone-100 dark:border-stone-800">
                <div>
                    <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 font-serif">Wichtige Termine</h2>
                    <span className="text-xs text-stone-500 dark:text-stone-400">Exportiere deine Termine in deinen Kalender (HeyPapa Einträge).</span>
                </div>
                <button onClick={onClose} className="bg-stone-100 dark:bg-stone-800 p-2 rounded-full text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 transition">
                    <X size={24} />
                </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 pb-24 space-y-4">
                {dates.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-stone-400">
                        <CalendarIcon size={48} className="mb-4 opacity-50" />
                        <p>Aktuell keine anstehenden Termine berechnet.</p>
                        <p className="text-xs mt-2">Termine erscheinen basierend auf dem Geburtstermin.</p>
                    </div>
                ) : (
                    dates.map((item, index) => (
                        <div key={index} className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-100 dark:border-stone-800 shadow-sm flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold uppercase tracking-wider rounded-full">
                                            {item.type === 'medical' ? 'U-Untersuchung' : 'Termin'}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-lg text-stone-800 dark:text-stone-100">{item.title}</h3>
                                    <p className="text-stone-500 dark:text-stone-400 text-sm">{item.description}</p>
                                </div>
                            </div>

                            <div className="bg-stone-50 dark:bg-stone-800/50 p-3 rounded-xl flex items-center justify-between">
                                <div className="text-sm">
                                    <span className="block text-stone-400 text-xs">Zeitraum</span>
                                    <span className="font-mono text-stone-700 dark:text-stone-300">
                                        {formatDate(item.start)} - {formatDate(item.end)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-end pt-2 border-t border-stone-100 dark:border-stone-800">
                                <CalendarExportButton
                                    title={`SuperDad: ${item.title}`}
                                    description={`${item.description}\n\nZeitraum: ${formatDate(item.start)} bis ${formatDate(item.end)}`}
                                    date={item.start} // Default to start date
                                    className="w-full justify-center"
                                />
                            </div>
                        </div>
                    ))
                )}

                {/* Info Box */}
                <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex gap-3 items-start border border-blue-100 dark:border-blue-800/30">
                    <AlertCircle className="text-blue-500 shrink-0 mt-0.5" size={20} />
                    <div>
                        <h4 className="font-bold text-blue-800 dark:text-blue-200 text-sm mb-1">Hinweis zu Terminen</h4>
                        <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                            Die angezeigten Zeiträume für U-Untersuchungen sind Richtwerte.
                            Bitte vereinbare rechtzeitig Termine bei deinem Kinderarzt.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarOverlay;
