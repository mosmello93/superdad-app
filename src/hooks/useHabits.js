import { useState, useEffect } from 'react';

export const useHabits = (initialHabits, saveProfile) => {
    // Default structure to prevent crashes if data is missing
    const defaultHabits = { hydration: false, oasis: false, shield: false, nightshift: false };
    const [habits, setHabits] = useState({ ...defaultHabits, ...initialHabits });

    useEffect(() => {
        if (initialHabits) {
            setHabits(prev => ({ ...prev, ...initialHabits }));
        }
    }, [initialHabits]);

    // --- AUTO-RESET LOGIC FOR HYDRATION (Every 2 hours) ---
    useEffect(() => {
        const checkReset = () => {
            if (!habits.hydrationTime) return;

            const now = Date.now();
            const twoHoursMs = 2 * 60 * 60 * 1000;

            // If hydration is marked as done AND it's been more than 2 hours
            if (habits.hydration && (now - habits.hydrationTime > twoHoursMs)) {
                const newHabits = { ...habits, hydration: false }; // Reset checked state only
                setHabits(newHabits);
                saveProfile({ habits: newHabits });
            }
        };

        const interval = setInterval(checkReset, 60000); // Check every minute
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
    };

    return { habits, toggleHabit };
};
