import { useState, useEffect } from 'react';

const STORAGE_KEY_FIRST_LAUNCH = 'heypapa_first_launch_ts';
const STORAGE_KEY_HAS_RATED = 'heypapa_has_rated_v1';
const DAYS_TO_WAIT = 3;

export const useReviewPrompt = () => {
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        const checkPromptEligibility = () => {
            // 1. Check if already rated/prompted
            const hasRated = localStorage.getItem(STORAGE_KEY_HAS_RATED);
            if (hasRated) return;

            // 2. Check first launch timestamp
            let firstLaunch = localStorage.getItem(STORAGE_KEY_FIRST_LAUNCH);
            const now = Date.now();

            if (!firstLaunch) {
                // First time ever seeing this logic -> set timestamp
                localStorage.setItem(STORAGE_KEY_FIRST_LAUNCH, now.toString());
                return;
            }

            // 3. Check modification time (days passed)
            const daysPassed = (now - parseInt(firstLaunch)) / (1000 * 60 * 60 * 24);

            if (daysPassed >= DAYS_TO_WAIT) {
                // Determine if we should show it now (e.g. check if we are in a "good" state, or just show on app load)
                // For MVP: Show immediately if criteria met
                setShowPrompt(true);
            }
        };

        // Run check after a short delay to not block startup
        const timer = setTimeout(checkPromptEligibility, 3000);
        return () => clearTimeout(timer);

    }, []);

    const handleRate = () => {
        // Yes -> Open Store
        const ANDROID_PACKAGE_ID = 'com.heypapa.app';
        window.open(`https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE_ID}`, '_system');

        localStorage.setItem(STORAGE_KEY_HAS_RATED, 'true');
        setShowPrompt(false);
    };

    const handleFeedback = () => {
        // No -> Open Email
        const subject = encodeURIComponent("Feedback zu HeyPapa Beta");
        const body = encodeURIComponent("Hallo Moritz,\n\nich nutze die HeyPapa App und mir ist aufgefallen...\n\n");
        window.open(`mailto:moritz.trassl@gmail.com?subject=${subject}&body=${body}`, '_system');

        localStorage.setItem(STORAGE_KEY_HAS_RATED, 'true'); // Don't ask again
        setShowPrompt(false);
    };

    const handleClose = () => {
        // Later -> postpone? Or just mark as done for this version?
        // Let's mark as done to not annoy user. Or maybe reset timestamp to ask again in 7 days?
        // MVP: Mark as rated to not annoy.
        localStorage.setItem(STORAGE_KEY_HAS_RATED, 'true');
        setShowPrompt(false);
    };

    return {
        showPrompt,
        handleRate,
        handleFeedback,
        handleClose
    };
};
