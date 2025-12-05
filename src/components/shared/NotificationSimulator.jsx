import React, { useState, useEffect } from 'react';
import { Droplets, X } from 'lucide-react';

const NotificationSimulator = ({ habits, mode, dueDate }) => {
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        // Conditions check loop
        const checkNotification = () => {
            // 1. Check if setup is complete
            if (!mode || !dueDate) return;

            // 2. Check time of day (Daytime only: 08:00 - 22:00)
            const now = new Date();
            const currentHour = now.getHours();
            const isNight = currentHour < 8 || currentHour >= 22;
            if (isNight) return;

            // 3. Check hydration time
            const lastHydration = habits.hydrationTime;
            const tenHoursMs = 10 * 60 * 60 * 1000;

            // Show if never done OR last done > 10 hours ago
            if (!lastHydration || (now.getTime() - lastHydration > tenHoursMs)) {
                setNotification({
                    title: "💧 Trink-Erinnerung",
                    text: "Hey Dad, hast du ihr heute schon Wasser gebracht?",
                    icon: Droplets
                });
            }
        };

        // Initial check after 3 seconds
        const timer = setTimeout(checkNotification, 3000);
        return () => clearTimeout(timer);
    }, [habits, mode, dueDate]);

    if (!notification) return null;

    return (
        <div className="fixed top-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-indigo-100 z-50 animate-in slide-in-from-top duration-500 flex items-center gap-3" onClick={() => setNotification(null)}>
            <div className="bg-indigo-100 p-2 rounded-full text-indigo-600">
                <notification.icon size={20} />
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-sm text-stone-800">{notification.title}</h4>
                <p className="text-xs text-stone-500">{notification.text}</p>
            </div>
            <button className="text-stone-400 hover:text-stone-600"><X size={16} /></button>
        </div>
    );
};

export default NotificationSimulator;
