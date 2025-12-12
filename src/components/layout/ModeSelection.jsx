import React from 'react';
import { ChevronRight } from 'lucide-react';

const ModeSelection = ({ setMode }) => (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F5F5F0] dark:bg-stone-950 transition-colors">
        <div className="w-full max-w-sm">
            {/* Logo Section */}
            <div className="flex flex-col items-center mb-10">
                <h1 className="text-4xl font-extrabold text-stone-800 dark:text-stone-100 tracking-tight text-center mb-6">
                    Willkommen
                </h1>
                <div className="flex items-center justify-center mb-6">
                    <img
                        src="/images/papa_logo.png"
                        alt="papa Logo"
                        className="w-48 object-contain"
                    />
                </div>
                <p className="text-stone-500 dark:text-stone-400 mt-2 text-center text-lg">
                    Dein Begleiter für das größte Abenteuer.
                </p>
            </div>

            {/* Selection Buttons */}
            <div className="space-y-4 w-full">
                <p className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest text-center mb-4">
                    Wo steht ihr gerade?
                </p>

                <button
                    onClick={() => setMode('pregnancy')}
                    className="w-full bg-white dark:bg-stone-900 p-4 rounded-[24px] shadow-sm hover:shadow-md transition-all flex items-center group border border-stone-100 dark:border-stone-800 relative overflow-hidden"
                >
                    <div className="w-16 h-16 mr-4 flex-shrink-0 flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl group-hover:scale-105 transition-transform">
                        <img src="/mascot/papa_pregnant.png" alt="Happy Dad" className="w-14 h-14 object-contain" />
                    </div>
                    <div className="text-left z-10">
                        <h3 className="font-bold text-stone-800 dark:text-stone-100 text-lg">Schwangerschaft</h3>
                        <p className="text-stone-400 dark:text-stone-500 text-xs mt-0.5">Begleitung bis zur Geburt</p>
                    </div>
                    <ChevronRight className="ml-auto text-stone-300 dark:text-stone-600 group-hover:text-emerald-500 transition-colors" />
                </button>

                <button
                    onClick={() => setMode('postpartum')}
                    className="w-full bg-white dark:bg-stone-900 p-4 rounded-[24px] shadow-sm hover:shadow-md transition-all flex items-center group border border-stone-100 dark:border-stone-800 relative overflow-hidden"
                >
                    <div className="w-16 h-16 mr-4 flex-shrink-0 flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl group-hover:scale-105 transition-transform">
                        <img src="/mascot/papa_holding_baby.png" alt="Dad with Baby" className="w-14 h-14 object-contain" />
                    </div>
                    <div className="text-left z-10">
                        <h3 className="font-bold text-stone-800 dark:text-stone-100 text-lg">Baby ist da</h3>
                        <p className="text-stone-400 dark:text-stone-500 text-xs mt-0.5">Wochenbett & Alltag</p>
                    </div>
                    <ChevronRight className="ml-auto text-stone-300 dark:text-stone-600 group-hover:text-indigo-500 transition-colors" />
                </button>

                <button
                    onClick={() => setMode('loss')}
                    className="w-full bg-white dark:bg-stone-900 p-4 rounded-[24px] shadow-sm hover:shadow-md transition-all flex items-center group border border-stone-100 dark:border-stone-800 relative overflow-hidden"
                >
                    <div className="w-16 h-16 mr-4 flex-shrink-0 flex items-center justify-center bg-stone-100 dark:bg-stone-800 rounded-2xl group-hover:scale-105 transition-transform">
                        <img src="/mascot/papa_star.png" alt="Star" className="w-14 h-14 object-contain" />
                    </div>
                    <div className="text-left z-10">
                        <h3 className="font-bold text-stone-800 dark:text-stone-100 text-lg">Verlust</h3>
                        <p className="text-stone-400 dark:text-stone-500 text-xs mt-0.5">Stille Begleitung & Trost</p>
                    </div>
                    <ChevronRight className="ml-auto text-stone-300 dark:text-stone-600 group-hover:text-stone-500 transition-colors" />
                </button>
            </div>
        </div>
    </div>
);

export default ModeSelection;
