import { useState, useEffect } from 'react';

export const useHabits = (initialHabits, saveProfile, onHabitAction) => {
    // Default structure to prevent crashes if data is missing
    const defaultHabits = {
        hydration: false, oasis: false, shield: false, nightshift: false,
        reading: false, movement: false, patience: false, fresh_air: false,
        silence: false, nature: false,
        date_night: false, nesting: false, shower: false, sleep: false,
        writing: false, music: false,
        lastResetDate: new Date().toDateString()
    };
    const [habits, setHabits] = useState({ ...defaultHabits, ...initialHabits });

    useEffect(() => {
        if (initialHabits) {
            setHabits(prev => ({ ...prev, ...initialHabits }));
        }
    }, [initialHabits]);

    // --- AUTO-RESET LOGIC FOR HYDRATION (Every 2 hours) ---
    useEffect(() => {
        const checkReset = () => {
            const now = Date.now();
            const today = new Date().toDateString();

            // 1. Daily Reset Logic
            if (habits.lastResetDate !== today) {
                const newHabits = { ...habits };
                // Reset all boolean habits to false
                Object.keys(newHabits).forEach(key => {
                    if (typeof newHabits[key] === 'boolean') {
                        newHabits[key] = false;
                    }
                });
                newHabits.lastResetDate = today;
                setHabits(newHabits);
                saveProfile({ habits: newHabits });
                return; // Stop here if we did a full reset
            }

            // 2. Hydration Reset (2 hours)
            if (!habits.hydrationTime) return;
            const twoHoursMs = 2 * 60 * 60 * 1000;

            if (habits.hydration && (now - habits.hydrationTime > twoHoursMs)) {
                const newHabits = { ...habits, hydration: false };
                setHabits(newHabits);
                saveProfile({ habits: newHabits });
            }
        };

        const interval = setInterval(checkReset, 60000); // Check every minute
        // Also run once on mount to handle overnight closes
        checkReset();

        return () => clearInterval(interval);
    }, [habits, saveProfile]);

    const toggleHabit = async (key) => {
        const isDone = !habits[key];
        const newHabits = {
            ...habits,
            [key]: isDone,
            [`${key}Time`]: isDone ? Date.now() : (habits[`${key}Time`] || null)
        };
        setHabits(newHabits);
        saveProfile({ habits: newHabits });

        // Trigger XP update via callback
        if (onHabitAction) {
            onHabitAction(isDone ? 10 : -10); // +10 for doing it, -10 for undoing
        }
    };

    const resetHabits = () => {
        setHabits(defaultHabits);
    };

    return { habits, toggleHabit, resetHabits };
};
