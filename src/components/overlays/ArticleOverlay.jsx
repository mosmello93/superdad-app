import React from 'react';
import { X } from 'lucide-react';

const ArticleOverlay = ({ article, onClose }) => {
    if (!article) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm pointer-events-auto animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Card */}
            <div className={`w-full max-w-lg bg-white dark:bg-stone-900 rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl transform transition-transform pointer-events-auto animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto`}>

                {/* Header */}
                <div className="flex justify-between items-center mb-6 sticky top-0 bg-white dark:bg-stone-900 z-10 py-2 border-b border-stone-100 dark:border-stone-800">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full bg-${article.color}-100 dark:bg-${article.color}-900/40 text-${article.color}-600 dark:text-${article.color}-400`}>
                            <article.icon size={24} />
                        </div>
                        <h2 className="text-2xl font-bold font-serif text-stone-800 dark:text-stone-100">{article.title}</h2>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-700 transition">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="space-y-6 pb-8">
                    {article.content.map((section, idx) => (
                        <div key={idx} className="bg-stone-50 dark:bg-stone-800/50 p-5 rounded-2xl">
                            <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-2">{section.headline}</h3>
                            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                                {section.text}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ArticleOverlay;
