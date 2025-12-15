import React from 'react';
import { X, FileText, Mail, MapPin } from 'lucide-react';

const ImprintOverlay = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center pointer-events-none">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-transparent pointer-events-auto" onClick={onClose}></div>

            {/* Modal */}
            <div className="relative z-10 bg-white dark:bg-stone-900 w-full max-w-lg h-[85vh] sm:h-[80vh] sm:rounded-[32px] rounded-t-[32px] shadow-2xl flex flex-col pointer-events-auto animate-in slide-in-from-bottom duration-300 border border-stone-200 dark:border-stone-800">
                {/* Header */}
                <div className="p-6 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center bg-white dark:bg-stone-900 rounded-t-[32px]">
                    <div>
                        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">Impressum</h2>
                        <p className="text-xs text-stone-500 dark:text-stone-400">Angaben gemäß § 5 TMG</p>
                    </div>
                    <button onClick={onClose} className="p-2 bg-stone-100 dark:bg-stone-800 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 transition text-stone-600 dark:text-stone-300">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 text-stone-800 dark:text-stone-300">

                    {/* Placeholder Info */}
                    <section className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="mt-1 bg-stone-100 dark:bg-stone-800 p-2 rounded-lg text-stone-500">
                                <FileText size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-1">Betreiber</h3>
                                <p className="text-sm text-stone-500">Moritz Traßl</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="mt-1 bg-stone-100 dark:bg-stone-800 p-2 rounded-lg text-stone-500">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-1">Anschrift</h3>
                                <p className="text-sm text-stone-500">
                                    Welser Straße 27b<br />
                                    94315 Straubing<br />
                                    Deutschland
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="mt-1 bg-stone-100 dark:bg-stone-800 p-2 rounded-lg text-stone-500">
                                <Mail size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-1">Kontakt</h3>
                                <p className="text-sm text-stone-500">
                                    E-Mail: moritz.trassl@gmail.com
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Disclaimer */}
                    <div className="bg-stone-50 dark:bg-stone-800 p-4 rounded-xl border border-stone-100 dark:border-stone-700 text-xs">
                        <strong className="block mb-1 text-stone-900 dark:text-stone-100">Haftungsausschluss:</strong>
                        Die Inhalte dieser App wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImprintOverlay;
