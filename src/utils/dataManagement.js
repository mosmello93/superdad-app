/**
 * Collects all relevant local storage data and triggers a JSON download.
 * Should be expanded if we use Firebase Store later to fetch from there too.
 */
export const exportUserData = () => {
    const backupData = {
        meta: {
            appName: "superdad-app",
            version: "1.0.0",
            exportDate: new Date().toISOString(),
            platform: navigator.userAgent
        },
        data: {}
    };

    // 1. Identify all keys related to our app
    // We look for 'dad_', 'daily_tip_', 'milestone_', 'seenTabs'
    const keys = Object.keys(localStorage);

    keys.forEach(key => {
        // Simple filter for app-related keys
        if (
            key.startsWith('dad_') ||
            key.startsWith('daily_tip_') ||
            key.startsWith('milestone_') ||
            key === 'theme' ||
            key === 'seenTabs' ||
            key.includes('firebase:authUser') // Optional: Keep auth persistence? Maybe risky. Let's skip auth.
        ) {
            if (!key.includes('firebase:authUser')) {
                try {
                    const value = localStorage.getItem(key);
                    // Try parsing JSON, otherwise save as string
                    try {
                        backupData.data[key] = JSON.parse(value);
                    } catch (e) {
                        backupData.data[key] = value;
                    }
                } catch (err) {
                    console.warn(`Could not export key: ${key}`, err);
                }
            }
        }
    });

    // 2. Create Blob
    const dataStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });

    // 3. Trigger Download
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `papa_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return true;
};
