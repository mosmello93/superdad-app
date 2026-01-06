import React from 'react';
import { X, ExternalLink, Heart, AlertTriangle, Scale, Baby, Phone, Camera, User, ShieldCheck } from 'lucide-react';
import { RESOURCES, LOSS_RESOURCES, POSTPARTUM_RESOURCES, CONCEPTION_RESOURCES } from '../../data/content';

const ResourceOverlay = ({ close, mode }) => {
    let data = RESOURCES;
    if (mode === 'loss') data = LOSS_RESOURCES;
    if (mode === 'postpartum') data = POSTPARTUM_RESOURCES;
    if (mode === 'conception') data = CONCEPTION_RESOURCES;

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#F5F5F0] dark:bg-stone-950 animate-in slide-in-from-bottom-full duration-500">
            {/* Header */}
            <div className="bg-white dark:bg-stone-900 px-6 pt-12 pb-6 shadow-sm flex items-center justify-between z-10 border-b border-stone-100 dark:border-stone-800">
                <div>
                    <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 font-serif">Wichtige Links</h2>
                    <p className="text-stone-500 dark:text-stone-400 text-sm">Geprüfte Quellen für den Ernstfall</p>
                </div>
                <button onClick={close} className="bg-stone-100 dark:bg-stone-800 p-2 rounded-full text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 transition">
                    <X size={24} />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 pb-24">
                <div className="bg-amber-50 dark:bg-amber-900/40 p-4 rounded-2xl border border-amber-100 dark:border-amber-800/50 mb-6 flex gap-3">
                    <AlertTriangle className="text-amber-500 dark:text-amber-400 flex-shrink-0" size={24} />
                    <p className="text-sm text-amber-800 dark:text-amber-100">
                        <strong>Hinweis:</strong> Bei akuten medizinischen Notfällen immer die <strong>112</strong> wählen. Diese Links ersetzen keinen Arztbesuch.
                    </p>
                </div>

                <div className="space-y-6">
                    {data.map((cat, i) => (
                        <div key={i}>
                            <h3 className={`font-bold text-${cat.color}-600 dark:text-${cat.color}-400 uppercase tracking-widest text-xs mb-3 ml-1`}>{cat.title}</h3>
                            <div className="space-y-3">
                                {cat.items.map((item, j) => (
                                    <a
                                        key={j}
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-100 dark:border-stone-800 shadow-sm flex items-center gap-4 transition hover:bg-stone-50 dark:hover:bg-stone-800 active:scale-95"
                                    >
                                        <div className={`w-10 h-10 rounded-full bg-${cat.color}-50 dark:bg-${cat.color}-900/30 text-${cat.color}-500 dark:text-${cat.color}-400 flex items-center justify-center`}>
                                            <item.icon size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-bold text-stone-800 dark:text-stone-100 flex items-center gap-2">
                                                {item.name}
                                                <ExternalLink size={14} className="text-stone-300 dark:text-stone-600" />
                                            </div>
                                            <p className="text-xs text-stone-500 dark:text-stone-400">{item.desc}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResourceOverlay;
