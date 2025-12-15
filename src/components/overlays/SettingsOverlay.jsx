import React, { useState } from 'react';
import { X, Download, Trash2, Shield, FileText, Info, ChevronRight, Check } from 'lucide-react';
import { exportUserData } from '../../utils/dataManagement';

const SettingsOverlay = ({ onClose, onResetApp, appVersion = "1.0.0", babyName, gender, onSaveProfile }) => {
    const [exportStatus, setExportStatus] = useState('idle'); // idle, success

    const handleExport = () => {
        exportUserData();
        setExportStatus('success');
        setTimeout(() => setExportStatus('idle'), 3000);
    };

    const handleReset = () => {
        if (window.confirm("Bist du sicher? Alle deine Daten (Fortschritt, Tagebuch, Habits) werden gelöscht. Das kann nicht rückgängig gemacht werden.")) {
            if (window.confirm("Wirklich? Letzte Warnung!")) {
                onResetApp();
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity opacity-100 pointer-events-auto"
                onClick={onClose}
            ></div>

            {/* Sheet */}
            <div className="w-full max-w-md bg-[#FAFAF8] dark:bg-stone-900 rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl transform transition-transform duration-300 pointer-events-auto max-h-[85vh] overflow-y-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 font-serif">Einstellungen</h2>
                    <button
                        onClick={onClose}
                        className="p-2 bg-stone-100 dark:bg-stone-800 rounded-full text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-6">

                    {/* Section: Baby Profil */}
                    <div>
                        <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3 ml-1">Baby Profil</h3>
                        <div className="bg-white dark:bg-stone-800 rounded-2xl overflow-hidden shadow-sm border border-stone-100 dark:border-stone-700 p-4 space-y-4">

                            {/* Name Input */}
                            <div>
                                <label className="block text-xs font-bold text-stone-500 dark:text-stone-400 uppercase mb-1.5">Name (Optional)</label>
                                <input
                                    type="text"
                                    defaultValue={babyName}
                                    maxLength={20}
                                    onBlur={(e) => onSaveProfile({ babyName: e.target.value })}
                                    placeholder="z.B. Krümel, Erbse oder Name"
                                    className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl px-4 py-3 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                />
                            </div>

                            {/* Gender Selection */}
                            <div>
                                <label className="block text-xs font-bold text-stone-500 dark:text-stone-400 uppercase mb-2">Geschlecht</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { id: 'boy', label: 'Junge', icon: '👦' },
                                        { id: 'girl', label: 'Mädchen', icon: '👧' },
                                        { id: 'surprise', label: 'Überraschung', icon: '🎁' }
                                    ].map((opt) => (
                                        <button
                                            key={opt.id}
                                            onClick={() => onSaveProfile({ gender: opt.id })}
                                            className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl border transition-all ${gender === opt.id
                                                ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-500'
                                                : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                                                }`}
                                        >
                                            <span className="text-xl">{opt.icon}</span>
                                            <span className="text-xs font-medium">{opt.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Section: Data */}
                    <div>
                        <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3 ml-1">Deine Daten</h3>
                        <div className="bg-white dark:bg-stone-800 rounded-2xl overflow-hidden shadow-sm border border-stone-100 dark:border-stone-700">

                            {/* Export */}
                            <button
                                onClick={handleExport}
                                className="w-full flex items-center justify-between p-4 hover:bg-stone-50 dark:hover:bg-stone-700/50 transition-colors text-left border-b border-stone-100 dark:border-stone-700"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-xl text-emerald-600 dark:text-emerald-400">
                                        <Download size={18} />
                                    </div>
                                    <div>
                                        <span className="block font-semibold text-stone-800 dark:text-stone-100">Daten exportieren</span>
                                        <span className="block text-xs text-stone-400">Sichere dein Tagebuch & Fortschritt</span>
                                    </div>
                                </div>
                                {exportStatus === 'success' ? (
                                    <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">
                                        <Check size={14} /> Gespeichert
                                    </span>
                                ) : (
                                    <ChevronRight size={16} className="text-stone-300" />
                                )}
                            </button>

                            {/* Reset - Danger Zone */}
                            <button
                                onClick={handleReset}
                                className="w-full flex items-center justify-between p-4 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-left group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-xl text-red-600 group-hover:bg-red-200 transition-colors">
                                        <Trash2 size={18} />
                                    </div>
                                    <div>
                                        <span className="block font-semibold text-stone-800 dark:text-stone-100 group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">App zurücksetzen</span>
                                        <span className="block text-xs text-stone-400">Löscht alle lokalen Daten</span>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Section: Legal */}
                    <div>
                        <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3 ml-1">Rechtliches</h3>
                        <div className="bg-white dark:bg-stone-800 rounded-2xl overflow-hidden shadow-sm border border-stone-100 dark:border-stone-700">

                            <a href="#" className="flex items-center justify-between p-4 hover:bg-stone-50 dark:hover:bg-stone-700/50 transition-colors border-b border-stone-100 dark:border-stone-700">
                                <div className="flex items-center gap-3">
                                    <div className="bg-stone-100 dark:bg-stone-700 p-2 rounded-xl text-stone-600 dark:text-stone-400">
                                        <Shield size={18} />
                                    </div>
                                    <span className="font-semibold text-stone-800 dark:text-stone-100">Datenschutzerklärung</span>
                                </div>
                                <ChevronRight size={16} className="text-stone-300" />
                            </a>

                            <a href="#" className="flex items-center justify-between p-4 hover:bg-stone-50 dark:hover:bg-stone-700/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="bg-stone-100 dark:bg-stone-700 p-2 rounded-xl text-stone-600 dark:text-stone-400">
                                        <FileText size={18} />
                                    </div>
                                    <span className="font-semibold text-stone-800 dark:text-stone-100">Impressum</span>
                                </div>
                                <ChevronRight size={16} className="text-stone-300" />
                            </a>
                        </div>
                    </div>

                    {/* Section: About */}
                    <div className="text-center pt-4 pb-2">
                        <div className="inline-flex items-center gap-2 text-stone-400 text-xs font-medium">
                            <Info size={12} />
                            <span>Version {appVersion} • Made for Dads</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SettingsOverlay;
