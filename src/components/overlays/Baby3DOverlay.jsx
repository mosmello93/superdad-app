import React from 'react';
import { X, Download, Share2 } from 'lucide-react';

const Baby3DOverlay = ({ week, onClose }) => {
    if (!week) return null;

    const availableWeeks = Array.from({ length: 38 }, (_, i) => i + 4); // Weeks 4 to 41
    const closestWeek = availableWeeks.reduce((prev, curr) => Math.abs(curr - week) < Math.abs(prev - week) ? curr : prev);
    const imagePath = `/images/fetus_3d/SSW${closestWeek}.png`;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col items-center animate-in zoom-in-95 duration-300 pointer-events-none">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white pointer-events-auto transition-colors"
                >
                    <X size={32} />
                </button>

                {/* Image Container */}
                <div className="relative rounded-[32px] overflow-hidden shadow-2xl bg-black pointer-events-auto">
                    <img
                        src={imagePath}
                        alt={`Baby in Woche ${week}`}
                        className="w-full h-auto max-h-[80vh] object-contain"
                    />

                    {/* Overlay Controls / Info */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 sm:p-8 flex justify-between items-end">
                        <div>
                            <h2 className="text-white text-2xl sm:text-3xl font-bold font-serif mb-1">SSW {week}</h2>
                            <p className="text-white/80 text-sm sm:text-base max-w-md">
                                Dein Baby ist jetzt etwa so weit entwickelt. Jedes Kind wächst individuell, aber das hier ist ein ziemlich genauer Blick in den Bauch.
                            </p>
                        </div>

                        {/* Actions (Visual Only for now) */}
                        <div className="flex gap-3">
                            <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors border border-white/20" title="Speichern">
                                <Download size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Baby3DOverlay;
