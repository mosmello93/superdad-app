import { useState, useEffect, useMemo } from 'react';
import { calculateLevel } from '../utils/gamification';

export const useGamification = (tasks, habitXP) => {
    const [newLevelUnlocked, setNewLevelUnlocked] = useState(null); // { level: 2, title: "..." }

    const currentXP = useMemo(() => {
        if (!tasks) return 0;

        const tasksDone = tasks.filter(t => t.completed).length * 50;
        // habitXP is now a cumulative number passed in
        const safeHabitXP = habitXP || 0;

        return tasksDone + safeHabitXP;
    }, [tasks, habitXP]);

    // Level Tracking
    useEffect(() => {
        const currentLevelInfo = calculateLevel(currentXP);
        const savedLevel = parseInt(localStorage.getItem('dad_last_level') || '1', 10);

        if (currentLevelInfo.level > savedLevel) {
            // LEVEL UP!
            setNewLevelUnlocked(currentLevelInfo);
            localStorage.setItem('dad_last_level', currentLevelInfo.level.toString());
        }
        // Remove aggressive sync down to avoid resetting on app load (when data is still fetching)
        if (currentLevelInfo.level < savedLevel && currentXP > 0) {
            // Optional: Only sync down if we are sure it's not a loading glitch
            // For now, doing nothing is safer. The user stays at "Level 5" in storage even if temporary XP is 0.
        }
    }, [currentXP]);

    const dismissLevelUp = () => setNewLevelUnlocked(null);

    return { currentXP, newLevelUnlocked, dismissLevelUp };
};
