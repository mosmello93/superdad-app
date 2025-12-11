import { useState, useEffect, useMemo } from 'react';
import { calculateLevel } from '../utils/gamification';

export const useGamification = (tasks, habits) => {
    const [newLevelUnlocked, setNewLevelUnlocked] = useState(null); // { level: 2, title: "..." }

    const currentXP = useMemo(() => {
        if (!tasks || !habits) return 0;

        const tasksDone = tasks.filter(t => t.completed).length * 50;
        const habitsDone = Object.values(habits).filter(v => v === true).length * 10;

        return tasksDone + habitsDone;
    }, [tasks, habits]);

    // Level Tracking
    useEffect(() => {
        const currentLevelInfo = calculateLevel(currentXP);
        const savedLevel = parseInt(localStorage.getItem('dad_last_level') || '1', 10);

        if (currentLevelInfo.level > savedLevel) {
            // LEVEL UP!
            setNewLevelUnlocked(currentLevelInfo);
            localStorage.setItem('dad_last_level', currentLevelInfo.level.toString());
        } else if (currentLevelInfo.level < savedLevel) {
            // Sync down if reset happened
            localStorage.setItem('dad_last_level', currentLevelInfo.level.toString());
        }
    }, [currentXP]);

    const dismissLevelUp = () => setNewLevelUnlocked(null);

    return { currentXP, newLevelUnlocked, dismissLevelUp };
};
