import { useMemo } from 'react';

export const useGamification = (tasks, habits) => {
    const currentXP = useMemo(() => {
        if (!tasks || !habits) return 0;

        const tasksDone = tasks.filter(t => t.completed).length * 50; // 50 XP per task
        const habitsDone = Object.values(habits).filter(v => v === true).length * 10; // 10 XP per active habit (approx)

        return tasksDone + habitsDone;
    }, [tasks, habits]);

    return { currentXP };
};
