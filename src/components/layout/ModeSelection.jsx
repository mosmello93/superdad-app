import React from 'react';
import { Baby, User, Star, ChevronRight } from 'lucide-react';

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
                    className="w-full bg-white dark:bg-stone-900 p-5 rounded-[24px] shadow-sm hover:shadow-md transition-all flex items-center group border border-stone-100 dark:border-stone-800"
                >
                    <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-2xl mr-4 group-hover:scale-110 transition-transform">
                        <Baby className="text-emerald-600 dark:text-emerald-400 w-6 h-6" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-stone-800 dark:text-stone-100 text-lg">Schwangerschaft</h3>
                        <p className="text-stone-400 dark:text-stone-500 text-xs mt-0.5">Begleitung bis zur Geburt</p>
                    </div>
                    <ChevronRight className="ml-auto text-stone-300 dark:text-stone-600" />
                </button>

                <button
                    onClick={() => setMode('postpartum')}
                    className="w-full bg-white dark:bg-stone-900 p-5 rounded-[24px] shadow-sm hover:shadow-md transition-all flex items-center group border border-stone-100 dark:border-stone-800"
                >
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-2xl mr-4 group-hover:scale-110 transition-transform">
                        <User className="text-indigo-600 dark:text-indigo-400 w-6 h-6" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-stone-800 dark:text-stone-100 text-lg">Baby ist da</h3>
                        <p className="text-stone-400 dark:text-stone-500 text-xs mt-0.5">Wochenbett & Alltag</p>
                    </div>
                    <ChevronRight className="ml-auto text-stone-300 dark:text-stone-600" />
                </button>

                <button
                    onClick={() => setMode('loss')}
                    className="w-full bg-white dark:bg-stone-900 p-5 rounded-[24px] shadow-sm hover:shadow-md transition-all flex items-center group border border-stone-100 dark:border-stone-800"
                >
                    <div className="bg-stone-100 dark:bg-stone-800 p-3 rounded-2xl mr-4 group-hover:scale-110 transition-transform">
                        <Star className="text-stone-500 dark:text-stone-400 w-6 h-6" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-stone-800 dark:text-stone-100 text-lg">Verlust</h3>
                        <p className="text-stone-400 dark:text-stone-500 text-xs mt-0.5">Stille Begleitung & Trost</p>
                    </div>
                    <ChevronRight className="ml-auto text-stone-300 dark:text-stone-600" />
                </button>
            </div>
        </div>
    </div>
);

export default ModeSelection;
