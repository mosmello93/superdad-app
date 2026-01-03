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
            <div className="w-full">
                <p className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest text-center mb-6">
                    Wo steht ihr gerade?
                </p>

                <div className="space-y-4">
                    <button
                        onClick={() => setMode('pregnancy')}
                        className="w-full bg-white dark:bg-stone-900 p-5 rounded-[24px] shadow-sm hover:shadow-lg transition-all flex items-center group border border-stone-100 dark:border-stone-800 relative overflow-hidden"
                    >
                        <div className="w-16 h-16 mr-5 flex-shrink-0 flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                            <img src="/mascot/papa_pregnant.png" alt="Happy Dad" className="w-14 h-14 object-contain drop-shadow-sm" />
                        </div>
                        <div className="text-left z-10">
                            <h3 className="font-bold text-stone-800 dark:text-stone-100 text-lg">Schwangerschaft</h3>
                            <p className="text-stone-400 dark:text-stone-500 text-sm mt-0.5 font-medium">Begleitung bis zur Geburt</p>
                        </div>
                        <ChevronRight className="ml-auto text-stone-300 dark:text-stone-600 group-hover:text-emerald-500 transition-colors" />
                    </button>

                    <button
                        onClick={() => setMode('postpartum')}
                        className="w-full bg-white dark:bg-stone-900 p-5 rounded-[24px] shadow-sm hover:shadow-lg transition-all flex items-center group border border-stone-100 dark:border-stone-800 relative overflow-hidden"
                    >
                        <div className="w-16 h-16 mr-5 flex-shrink-0 flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                            <img src="/mascot/papa_holding_baby.png" alt="Dad with Baby" className="w-14 h-14 object-contain drop-shadow-sm" />
                        </div>
                        <div className="text-left z-10">
                            <h3 className="font-bold text-stone-800 dark:text-stone-100 text-lg">Baby ist da</h3>
                            <p className="text-stone-400 dark:text-stone-500 text-sm mt-0.5 font-medium">Wochenbett & Alltag</p>
                        </div>
                        <ChevronRight className="ml-auto text-stone-300 dark:text-stone-600 group-hover:text-indigo-500 transition-colors" />
                    </button>
                </div>

                {/* Discrete Loss Option */}
                <div className="mt-8">
                    <button
                        onClick={() => setMode('loss')}
                        className="w-full p-4 rounded-[20px] border-2 border-stone-100 dark:border-stone-800 hover:border-stone-200 dark:hover:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-900 transition-all flex items-center justify-center gap-3 group text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
                    >
                        <div className="w-8 h-8 flex items-center justify-center bg-stone-100 dark:bg-stone-800 rounded-full group-hover:scale-110 transition-transform">
                            <img src="/mascot/papa_star.png" alt="Star" className="w-5 h-5 object-contain opacity-50 group-hover:opacity-80 transition-opacity" />
                        </div>
                        <span className="font-medium text-sm">Unterstützung bei Verlust / Sternenkind</span>
                    </button>
                    <p className="text-[10px] text-center text-stone-300 mt-2">Wir sind auch in schweren Zeiten für dich da.</p>
                </div>
            </div>
        </div>
    </div>
);

export default ModeSelection;
