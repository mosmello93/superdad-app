import { useState, useEffect, useMemo } from 'react';
import { calculateLevel } from '../utils/gamification';
import { ACHIEVEMENTS } from '../data/achievements';

export const useGamification = (tasks, habitXP, habits) => {
    const [newLevelUnlocked, setNewLevelUnlocked] = useState(null); // { level: 2, title: "..." }
    const [newBadgeUnlocked, setNewBadgeUnlocked] = useState(null); // Badge Object
    const [unlockedBadges, setUnlockedBadges] = useState(() => {
        const saved = localStorage.getItem('superdad_badges');
        return saved ? JSON.parse(saved) : [];
    });

    const currentXP = useMemo(() => {
        if (!tasks) return 0;
        const tasksDone = tasks.filter(t => t.completed).length * 50;
        const safeHabitXP = habitXP || 0;
        return tasksDone + safeHabitXP;
    }, [tasks, habitXP]);

    // --- BADGE LOGIC ---
    useEffect(() => {
        if (!tasks || !habits) return;

        // 1. Calculate Stats
        const stats = {
            totalTasksCompleted: tasks.filter(t => t.completed).length,
            // Mocking streak for MVP (in reality this needs date tracking in local storage)
            currentStreak: (habitXP > 200) ? 3 : 1,
            nightShifts: habits.nightshift ? 1 : 0,
            nestingTasks: tasks.filter(t => t.completed && t.category === 'Nestbau').length, // Assuming category exists or similar
            supportActions: Math.floor(habitXP / 20), // Rough proxy for MVP
            articlesRead: habits.reading ? 5 : 0, // Mock for MVP
            shieldActivated: habits.shield ? 1 : 0
        };

        // 2. Check Conditions
        const newUnlocks = [];
        ACHIEVEMENTS.forEach(badge => {
            if (!unlockedBadges.includes(badge.id)) {
                if (badge.condition(stats)) {
                    newUnlocks.push(badge.id);
                    setNewBadgeUnlocked(badge); // Trigger Overlay for the first one found
                }
            }
        });

        // 3. Update State & Storage
        if (newUnlocks.length > 0) {
            const updatedBadges = [...unlockedBadges, ...newUnlocks];
            setUnlockedBadges(updatedBadges);
            localStorage.setItem('superdad_badges', JSON.stringify(updatedBadges));
        }

    }, [tasks, habitXP, habits, unlockedBadges]);


    // --- LEVEL LOGIC ---
    useEffect(() => {
        const currentLevelInfo = calculateLevel(currentXP);
        const savedLevel = parseInt(localStorage.getItem('dad_last_level') || '1', 10);

        if (currentLevelInfo.level > savedLevel) {
            setNewLevelUnlocked(currentLevelInfo);
            localStorage.setItem('dad_last_level', currentLevelInfo.level.toString());
        }
    }, [currentXP]);

    const dismissLevelUp = () => setNewLevelUnlocked(null);
    const dismissBadge = () => setNewBadgeUnlocked(null);

    return {
        currentXP,
        newLevelUnlocked,
        dismissLevelUp,
        unlockedBadges,
        newBadgeUnlocked,
        dismissBadge
    };
};
