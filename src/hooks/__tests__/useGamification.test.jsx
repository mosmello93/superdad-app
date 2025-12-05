import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useGamification } from '../useGamification';

describe('useGamification', () => {
    it('should return 0 XP when no tasks or habits are done', () => {
        const tasks = [{ completed: false }];
        const habits = { hydration: false };
        const { result } = renderHook(() => useGamification(tasks, habits));
        expect(result.current.currentXP).toBe(0);
    });

    it('should calculate XP correctly (50 per task, 10 per habit)', () => {
        const tasks = [{ completed: true }, { completed: false }, { completed: true }]; // 2 tasks = 100 XP
        const habits = { hydration: true, oasis: true, shield: false }; // 2 habits = 20 XP

        const { result } = renderHook(() => useGamification(tasks, habits));
        expect(result.current.currentXP).toBe(120);
    });
});
