import React from 'react';
import { Star, MessageSquare, ThumbsUp, X } from 'lucide-react';

const ReviewPromptOverlay = ({ onClose, onRate, onFeedback }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative z-10 bg-white dark:bg-stone-900 w-full max-w-sm rounded-[32px] p-6 shadow-2xl animate-in zoom-in-95 duration-300 border border-stone-200 dark:border-stone-800 text-center">

                <div className="flex justify-center -mt-12 mb-4">
                    <div className="bg-amber-100 dark:bg-amber-900/40 p-4 rounded-full shadow-lg border-4 border-white dark:border-stone-900">
                        <ThumbsUp size={32} className="text-amber-500 fill-amber-500" />
                    </div>
                </div>

                <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2 font-serif">
                    Gefällt dir HeyPapa?
                </h2>
                <p className="text-stone-500 dark:text-stone-400 text-sm mb-6 leading-relaxed">
                    Wir arbeiten hart daran, die beste App für werdende Väter zu bauen. Hilft sie dir im Alltag?
                </p>

                <div className="space-y-3">
                    <button
                        onClick={onRate}
                        className="w-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 py-3.5 rounded-xl font-bold hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-stone-200 dark:shadow-none"
                    >
                        <Star size={18} className="fill-current" />
                        <span>Ja, sie ist super!</span>
                    </button>

                    <button
                        onClick={onFeedback}
                        className="w-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 py-3.5 rounded-xl font-bold hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <MessageSquare size={18} />
                        <span>Könnte besser sein</span>
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="mt-6 text-stone-400 dark:text-stone-500 text-xs font-medium hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
                >
                    Nein, jetzt nicht fragen
                </button>
            </div>
        </div>
    );
};

export default ReviewPromptOverlay;
