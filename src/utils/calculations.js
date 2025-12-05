
import { OASIS_IDEAS } from '../data/content';

export const calculateStatus = (dateString, mode) => {
    if (mode === 'loss') return { status: 'Loss', progress: 0, stage: 'after', label: 'Sternenkind' };
    if (!dateString) return { status: 'NotSet', progress: 0, stage: 0, label: '' };

    const [y, m, d] = dateString.split('-').map(Number);
    const refDate = new Date(y, m - 1, d);
    refDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (mode === 'postpartum') {
        const diffTime = Math.abs(today - refDate);
        const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) % 7;
        return { status: 'Postpartum', progress: 100, stage: diffWeeks, week: diffWeeks, days: diffDays, label: `${diffWeeks} Wochen alt` };
    }

    const totalDuration = 280;
    if (refDate < today) {
        const daysSinceDue = Math.floor((today - refDate) / (1000 * 60 * 60 * 24));
        return { week: 40 + Math.floor(daysSinceDue / 7), days: daysSinceDue % 7, trimester: 4, status: 'Pregnant', progress: 100, stage: 3, label: 'Überfällig' };
    }

    const diffTime = refDate.getTime() - today.getTime();
    const daysUntilDue = Math.round(diffTime / (1000 * 60 * 60 * 24));
    const daysPregnant = 280 - daysUntilDue;

    if (daysPregnant < 0) return { week: 0, days: 0, trimester: 0, status: 'Waiting', progress: 0, stage: 0, label: 'Warten' };

    const completedWeeks = Math.floor(daysPregnant / 7);
    const currentDays = daysPregnant % 7;
    const currentWeek = completedWeeks + 1;
    const progress = Math.min(100, Math.max(0, (daysPregnant / totalDuration) * 100));
    let trimester = 1;
    if (currentWeek >= 14) trimester = 2;
    if (currentWeek >= 28) trimester = 3;

    return {
        week: currentWeek,
        days: currentDays,
        trimester,
        status: 'Pregnant',
        progress,
        stage: trimester,
        label: `SSW ${currentWeek} (${completedWeeks}+${currentDays})`
    };
};

export const getDailyOasis = (mode, week) => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    let pool = [];
    if (mode === 'loss') pool = OASIS_IDEAS.loss;
    else if (mode === 'postpartum') pool = OASIS_IDEAS.postpartum;
    else {
        if (week < 14) pool = OASIS_IDEAS.trimester1;
        else if (week < 28) pool = OASIS_IDEAS.trimester2;
        else pool = OASIS_IDEAS.trimester3;
    }

    // Return 3 distinct items rotating daily
    return [
        pool[dayOfYear % pool.length],
        pool[(dayOfYear + 1) % pool.length],
        pool[(dayOfYear + 2) % pool.length]
    ];
};
