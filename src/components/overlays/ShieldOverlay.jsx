import React, { useState } from 'react';
import { X, Copy, Check, MessageSquare, Heart } from 'lucide-react';
import { SHIELD_TEMPLATES } from '../../data/shield_templates';

const ShieldOverlay = ({ close }) => {
    const [copiedId, setCopiedId] = useState(null);

    const handleCopy = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#F5F5F0] animate-in slide-in-from-bottom-full duration-500">
            {/* Header */}
            <div className="bg-white px-6 pt-12 pb-6 shadow-sm flex items-center justify-between z-10">
                <div>
                    <h2 className="text-2xl font-bold text-stone-800 font-serif">Der Schild</h2>
                    <p className="text-stone-500 text-sm">Kommunikation ohne Kraftaufwand</p>
                </div>
                <button onClick={close} className="bg-stone-100 p-2 rounded-full text-stone-500 hover:bg-stone-200 transition">
                    <X size={24} />
                </button>
            </div>

            {/* Intro */}
            <div className="px-6 py-4 bg-stone-50 border-b border-stone-100 flex gap-3">
                <Heart className="text-stone-400 flex-shrink-0" size={20} />
                <p className="text-xs text-stone-600 leading-relaxed">
                    Du musst nicht jedem persönlich antworten. Nutze diese Vorlagen, um dein Umfeld zu informieren und gleichzeitig eine Grenze zu ziehen. Kopiere sie einfach.
                </p>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 pb-24">
                <div className="space-y-8">
                    {Object.entries(SHIELD_TEMPLATES).map(([key, category]) => (
                        <div key={key}>
                            <h3 className="font-bold text-stone-400 uppercase tracking-widest text-xs mb-4 ml-1">{category.title}</h3>
                            <div className="space-y-4">
                                {category.templates.map((template, idx) => {
                                    const id = `${key}-${idx}`;
                                    const isCopied = copiedId === id;

                                    return (
                                        <div key={id} className="bg-white p-5 rounded-2xl border border-stone-100 shadow-sm transition hover:shadow-md">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="px-2 py-1 bg-stone-100 rounded-lg text-[10px] uppercase font-bold text-stone-500">{template.label}</span>
                                                <button
                                                    onClick={() => handleCopy(template.text, id)}
                                                    className={`p-2 rounded-full transition ${isCopied ? 'bg-emerald-100 text-emerald-600' : 'bg-stone-50 text-stone-400 hover:bg-stone-100'}`}
                                                >
                                                    {isCopied ? <Check size={16} /> : <Copy size={16} />}
                                                </button>
                                            </div>
                                            <div className="bg-stone-50 p-4 rounded-xl text-stone-700 italic text-sm leading-relaxed font-serif">
                                                "{template.text}"
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShieldOverlay;
