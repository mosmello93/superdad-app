import React from 'react';
import { Baby, User, Star, ChevronRight } from 'lucide-react';

const ModeSelection = ({ setMode }) => (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F5F5F0]">
        <div className="w-full max-w-sm">
            {/* Logo Section */}
            <div className="flex flex-col items-center mb-10">
                <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-lg mb-6 p-4">
                    <img
                        src="/images/superdad_logo.png"
                        alt="SuperDad Logo"
                        className="w-full h-full object-contain"
                    />
                </div>
                <h1 className="text-4xl font-extrabold text-stone-800 tracking-tight text-center">
                    Willkommen, <br /><span className="text-indigo-600">SuperDad.</span>
                </h1>
                <p className="text-stone-500 mt-3 text-center text-lg">
                    Dein Begleiter für das größte Abenteuer.
                </p>
            </div>

            {/* Selection Buttons */}
            <div className="space-y-4 w-full">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest text-center mb-4">
                    Wo steht ihr gerade?
                </p>

                <button
                    onClick={() => setMode('pregnancy')}
                    className="w-full bg-white p-5 rounded-[24px] shadow-sm hover:shadow-md transition-all flex items-center group border border-stone-100"
                >
                    <div className="bg-emerald-100 p-3 rounded-2xl mr-4 group-hover:scale-110 transition-transform">
                        <Baby className="text-emerald-600 w-6 h-6" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-stone-800 text-lg">Schwangerschaft</h3>
                        <p className="text-stone-400 text-xs mt-0.5">Begleitung bis zur Geburt</p>
                    </div>
                    <ChevronRight className="ml-auto text-stone-300" />
                </button>

                <button
                    onClick={() => setMode('postpartum')}
                    className="w-full bg-white p-5 rounded-[24px] shadow-sm hover:shadow-md transition-all flex items-center group border border-stone-100"
                >
                    <div className="bg-indigo-100 p-3 rounded-2xl mr-4 group-hover:scale-110 transition-transform">
                        <User className="text-indigo-600 w-6 h-6" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-stone-800 text-lg">Baby ist da</h3>
                        <p className="text-stone-400 text-xs mt-0.5">Wochenbett & Alltag</p>
                    </div>
                    <ChevronRight className="ml-auto text-stone-300" />
                </button>

                <button
                    onClick={() => setMode('loss')}
                    className="w-full bg-white p-5 rounded-[24px] shadow-sm hover:shadow-md transition-all flex items-center group border border-stone-100"
                >
                    <div className="bg-stone-100 p-3 rounded-2xl mr-4 group-hover:scale-110 transition-transform">
                        <Star className="text-stone-500 w-6 h-6" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-stone-800 text-lg">Verlust</h3>
                        <p className="text-stone-400 text-xs mt-0.5">Stille Begleitung & Trost</p>
                    </div>
                    <ChevronRight className="ml-auto text-stone-300" />
                </button>
            </div>
        </div>
    </div>
);

export default ModeSelection;
