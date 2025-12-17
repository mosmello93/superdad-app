export const checkAndSendNotifications = (mode, currentWeek, lastSeenWeek, setLastSeenWeek) => {
    // 1. Check Permission
    if (!('Notification' in window)) {
        console.log("This browser does not support desktop notification");
        return;
    }

    if (Notification.permission !== 'granted') {
        // Do not spam request, only if user explicitly enabled in settings (to be implemented)
        // or effectively we wait for a user action. 
        // For MVP, we might ask once on load or have a button.
        return;
    }

    // 2. Weekly Update Notification
    if (currentWeek > lastSeenWeek) {
        // New Week!
        const title = `Willkommen in Woche ${currentWeek}! 🎉`;
        const body = mode === 'pregnancy'
            ? "Dein Baby hat wieder einen Sprung gemacht. Schau dir die neuen Updates an!"
            : "Neue Meilensteine warten auf euch. Sieh nach, was diese Woche passiert.";

        safeShowNotification(title, {
            body: body,
            icon: '/pwa-192x192.png', // Fallback icon
            badge: '/pwa-192x192.png'
        });

        // Update tracked week
        setLastSeenWeek(currentWeek);
    }

    // 3. Daily Good Deed (Simulated "Push")
    // In a real PWA, this would be a Service Worker Push. 
    // Here we check if we already sent one today.
    const lastDeedDate = localStorage.getItem('last_good_deed_date');
    const today = new Date().toISOString().split('T')[0];

    if (lastDeedDate !== today) {
        // Send Good Deed
        const deed = getRandomGoodDeed(mode);

        // Delay slightly so it doesn't pop immediately on load
        setTimeout(() => {
            safeShowNotification("Gute Tat des Tages 🌟", {
                body: deed,
                icon: '/mascot/papa_happy.png' // Use a mascot
            });
            localStorage.setItem('last_good_deed_date', today);
        }, 5000);
    }
};

export const requestNotificationPermission = () => {
    if (!('Notification' in window)) return;
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log("Notification permission granted");
            safeShowNotification("SuperDad Benachrichtigungen aktiviert! 🔔");
        }
    });
};

// Helper to prevent "Illegal constructor" error on Android
const safeShowNotification = (title, options) => {
    try {
        new Notification(title, options);
    } catch (e) {
        console.warn('Native Notification constructor failed, trying ServiceWorker:', e);
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                registration.showNotification(title, options);
            }).catch(err => console.error('ServiceWorker notification failed:', err));
        }
    }
};

const getRandomGoodDeed = (mode) => {
    const deeds = [
        "Mach ihr heute ein Kompliment dafür, was sie leistet.",
        "Übernimm heute kommentarlos das Wickeln/Abwaschen.",
        "Bring ihr ihr Lieblingsgetränk, ohne dass sie fragen muss.",
        "Sag ihr: 'Du bist eine tolle Mama.'",
        "Massiere ihr heute Abend 5 Minuten die Füße.",
        "Mach ein Foto von ihr und dem Baby (Mamas sind oft nicht auf Bildern!).",
        "Organisiere heute das Abendessen.",
        "Geh eine Runde mit dem Kind spazieren, damit sie 30 Min frei hat."
    ];
    // Simple random for now
    return deeds[Math.floor(Math.random() * deeds.length)];
};
