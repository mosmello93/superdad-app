import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useHabits } from '../useHabits';

describe('useHabits', () => {
    let mockSaveProfile;

    beforeEach(() => {
        mockSaveProfile = vi.fn();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should initialize with default habits', () => {
        const { result } = renderHook(() => useHabits(null, mockSaveProfile));
        expect(result.current.habits.hydration).toBe(false);
        expect(result.current.habits.oasis).toBe(false);
    });

    it('should initialize with provided values', () => {
        const initial = { hydration: true, hydrationTime: 1000 };
        const { result } = renderHook(() => useHabits(initial, mockSaveProfile));
        expect(result.current.habits.hydration).toBe(true);
    });

    it('should toggle a habit', async () => {
        const { result } = renderHook(() => useHabits(null, mockSaveProfile));

        await act(async () => {
            await result.current.toggleHabit('hydration');
        });

        expect(result.current.habits.hydration).toBe(true);
        expect(result.current.habits.hydrationTime).toBeDefined();
        expect(mockSaveProfile).toHaveBeenCalledWith(expect.objectContaining({
            habits: expect.objectContaining({ hydration: true })
        }));
    });

    it('should auto-reset hydration after 2 hours', async () => {
        // Set fixed time
        vi.setSystemTime(new Date('2024-01-01T10:00:00Z'));
        const startTime = Date.now();
        const initial = { hydration: true, hydrationTime: startTime };

        const { result } = renderHook(() => useHabits(initial, mockSaveProfile));

        // Advance 1h 59m
        await act(async () => {
            vi.advanceTimersByTime(119 * 60 * 1000);
        });

        expect(result.current.habits.hydration).toBe(true);

        // Advance another 2 mins (total 2h 1m)
        await act(async () => {
            vi.advanceTimersByTime(2 * 60 * 1000);
        });

        expect(result.current.habits.hydration).toBe(false);
        // Expect saveProfile to be called with hydration: false
        expect(mockSaveProfile).toHaveBeenCalledWith(expect.objectContaining({
            habits: expect.objectContaining({ hydration: false })
        }));
    });
});
