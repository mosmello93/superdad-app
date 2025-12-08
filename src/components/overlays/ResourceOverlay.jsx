import React from 'react';
import { X, ExternalLink, Heart, AlertTriangle, Scale, Baby, Phone, Camera, User, ShieldCheck } from 'lucide-react';
import { RESOURCES, LOSS_RESOURCES } from '../../data/content';

const ResourceOverlay = ({ close, mode }) => {
    const data = mode === 'loss' ? LOSS_RESOURCES : RESOURCES;

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#F5F5F0] animate-in slide-in-from-bottom-full duration-500">
            {/* Header */}
            <div className="bg-white px-6 pt-12 pb-6 shadow-sm flex items-center justify-between z-10">
                <div>
                    <h2 className="text-2xl font-bold text-stone-800 font-serif">Wichtige Links</h2>
                    <p className="text-stone-500 text-sm">Geprüfte Quellen für den Ernstfall</p>
                </div>
                <button onClick={close} className="bg-stone-100 p-2 rounded-full text-stone-500 hover:bg-stone-200 transition">
                    <X size={24} />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 pb-24">
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 mb-6 flex gap-3">
                    <AlertTriangle className="text-amber-500 flex-shrink-0" size={24} />
                    <p className="text-sm text-amber-800">
                        <strong>Hinweis:</strong> Bei akuten medizinischen Notfällen immer die <strong>112</strong> wählen. Diese Links ersetzen keinen Arztbesuch.
                    </p>
                </div>

                <div className="space-y-6">
                    {data.map((cat, i) => (
                        <div key={i}>
                            <h3 className={`font-bold text-${cat.color}-600 uppercase tracking-widest text-xs mb-3 ml-1`}>{cat.title}</h3>
                            <div className="space-y-3">
                                {cat.items.map((item, j) => (
                                    <a
                                        key={j}
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white p-4 rounded-2xl border border-stone-100 shadow-sm flex items-center gap-4 transition hover:bg-stone-50 active:scale-95"
                                    >
                                        <div className={`w-10 h-10 rounded-full bg-${cat.color}-50 text-${cat.color}-500 flex items-center justify-center`}>
                                            <item.icon size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-bold text-stone-800 flex items-center gap-2">
                                                {item.name}
                                                <ExternalLink size={14} className="text-stone-300" />
                                            </div>
                                            <p className="text-xs text-stone-500">{item.desc}</p>
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
