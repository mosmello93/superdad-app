export const generateICS = ({ title, description, startTime, endTime, location = '' }) => {
    const formatDate = (date) => {
        if (!date) return '';
        // Format: YYYYMMDDTHHmmssZ (UTC)
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const now = new Date();

    // Default duration: 1 hour if no endTime provided
    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : new Date(start.getTime() + 60 * 60 * 1000);

    const checkSum = now.getTime().toString();

    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//HeyPapa App//DE',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `UID:heypapa-${checkSum}`,
        `DTSTAMP:${formatDate(now)}`,
        `DTSTART:${formatDate(start)}`,
        `DTEND:${formatDate(end)}`,
        `SUMMARY:${title}`,
        `DESCRIPTION:${description}`,
        `LOCATION:${location}`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n'); // CRLF is required by iCalendar spec

    return icsContent;
};

export const downloadICS = (filename, content) => {
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
