import React, { useState, useEffect } from 'react';
import { Shield, Cookie, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            // Delay slightly to not overwhelm on first load
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setIsVisible(false);
    };

    const handleEssential = () => {
        localStorage.setItem('cookieConsent', 'essential');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 flex justify-center pointer-events-none"
                >
                    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 shadow-2xl rounded-2xl p-6 max-w-lg w-full pointer-events-auto">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl shrink-0">
                                <Cookie className="text-indigo-600 dark:text-indigo-400" size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-1">
                                    Kekse? Nein, Daten-Transparenz.
                                </h3>
                                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
                                    Wir nutzen Cookies und lokalen Speicher, damit die App funktioniert (z.B. um deine Woche oder Checklisten zu speichern). Wir verkaufen deine Daten nicht. Ehrenwort.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={handleAccept}
                                        className="flex-1 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold py-3 px-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-2"
                                    >
                                        <Check size={18} />
                                        Alles klar, speichern
                                    </button>
                                    <button
                                        onClick={handleEssential}
                                        className="flex-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-medium py-3 px-4 rounded-xl hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                                    >
                                        Nur Notwendiges
                                    </button>
                                </div>
                                <div className="mt-3 text-center">
                                    <a href="/datenschutz.html" target="_blank" rel="noreferrer" className="text-xs text-stone-400 hover:text-stone-600 underline">Datenschutzerklärung lesen</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieBanner;
