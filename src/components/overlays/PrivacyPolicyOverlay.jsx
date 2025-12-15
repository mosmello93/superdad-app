import React from 'react';
import { X, Shield, Lock, Server, Globe } from 'lucide-react';

const PrivacyPolicyOverlay = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center pointer-events-auto">
            {/* Backdrop - Transparent as requested */}
            <div className="absolute inset-0 bg-transparent" onClick={onClose}></div>

            {/* Modal */}
            <div className="relative z-10 bg-white dark:bg-stone-900 w-full max-w-lg h-[85vh] sm:h-[80vh] sm:rounded-[32px] rounded-t-[32px] shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-300 border border-stone-200 dark:border-stone-800">
                {/* Header */}
                <div className="p-6 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center bg-white dark:bg-stone-900 rounded-t-[32px]">
                    <div>
                        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">Datenschutz & AGB</h2>
                        <p className="text-xs text-stone-500 dark:text-stone-400">Stand: Dezember 2025</p>
                    </div>
                    <button onClick={onClose} className="p-2 bg-stone-100 dark:bg-stone-800 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 transition text-stone-600 dark:text-stone-300">
                        <X size={20} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 text-stone-800 dark:text-stone-300">

                    {/* Intro */}
                    <section>
                        <div className="flex items-center gap-3 mb-3 text-emerald-600 dark:text-emerald-400">
                            <Shield size={24} />
                            <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100">Deine Daten gehören dir.</h3>
                        </div>
                        <p className="text-sm leading-relaxed font-medium">
                            Wir nehmen den Schutz deiner persönlichen Daten sehr ernst. Diese App wurde so entwickelt, dass so wenig Daten wie möglich gesammelt werden.
                        </p>
                    </section>

                    {/* Local vs Cloud */}
                    <section>
                        <h4 className="font-bold text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-2">
                            <Lock size={16} className="text-stone-400" />
                            Lokale Speicherung
                        </h4>
                        <p className="text-sm mb-4">
                            Sensible Daten wie Tagebucheinträge (Dad Log) oder persönliche Notizen werden primär lokal auf deinem Gerät zwischengespeichert oder verschlüsselt übertragen.
                        </p>

                        <h4 className="font-bold text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-2">
                            <Server size={16} className="text-stone-400" />
                            Cloud & Synchronisation
                        </h4>
                        <p className="text-sm mb-4">
                            Um deine Fortschritte (XP, Level) und Einstellungen zu speichern, nutzen wir Google Firebase. Die Datenübertragung erfolgt SSL-verschlüsselt.
                        </p>

                        <h4 className="font-bold text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-2">
                            <Globe size={16} className="text-stone-400" />
                            AI Funktionen
                        </h4>
                        <p className="text-sm">
                            Für den AI Coach und Vibe Check nutzen wir Google Gemini. Anfragen werden anonymisiert gesendet.
                        </p>
                    </section>

                    {/* Disclaimer */}
                    <div className="bg-stone-50 dark:bg-stone-800 p-4 rounded-xl border border-stone-100 dark:border-stone-700 text-xs">
                        <strong className="block mb-1 text-stone-900 dark:text-stone-100">Wichtiger Hinweis:</strong>
                        Dies ist eine Standard-Vorlage.
                    </div>

                </div>

                {/* Footer Action */}
                <div className="p-6 border-t border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 rounded-b-[32px]">
                    <button onClick={onClose} className="w-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 py-3 rounded-xl font-bold hover:bg-stone-800 dark:hover:bg-stone-200 transition">
                        Verstanden
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyOverlay;
