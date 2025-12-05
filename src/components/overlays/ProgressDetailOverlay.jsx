import React, { useState } from 'react';
import { X, Sprout, Ruler, Weight } from 'lucide-react';
import { PREGNANCY_WEEKS } from '../../data/content';

const ProgressDetailOverlay = ({ statusData, mode, closeDetail }) => {
    if (!statusData || !statusData.week) return null;
    const weekContent = PREGNANCY_WEEKS[statusData.week] || {};

    const [imgError, setImgError] = useState(false);
    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm pointer-events-auto animate-in fade-in duration-300" onClick={closeDetail}></div>
            <div className="bg-[#FDFCF8] w-full max-w-md h-[85vh] rounded-t-[40px] shadow-2xl overflow-hidden flex flex-col pointer-events-auto relative">
                <button onClick={closeDetail} className="absolute top-6 right-6 bg-white p-2 rounded-full hover:bg-stone-100 shadow-sm z-20"><X size={20} className="text-stone-600" /></button>
                <div className="flex-1 overflow-y-auto pb-8">
                    <div className="bg-[#F0FDF4] pt-16 pb-10 px-6 flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl"></div><div className="absolute bottom-0 right-0 w-40 h-40 bg-emerald-200/20 rounded-full blur-3xl"></div>
                        <div className="relative z-10">{weekContent.image && !imgError ? (<img src={weekContent.image} alt={weekContent.size} onError={() => setImgError(true)} className="w-48 h-48 object-contain drop-shadow-2xl transform hover:scale-105 transition duration-500" />) : (<div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-lg"><Sprout size={64} className="text-emerald-500" /></div>)}</div>
                        <h2 className="text-3xl font-bold text-stone-800 mt-6">{weekContent.size ? `So groß wie ${weekContent.size}` : `Woche ${statusData.week}`}</h2><p className="text-emerald-700 font-medium mt-1">{statusData.label}</p>
                    </div>
                    <div className="px-6 -mt-6 relative z-10"><div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex justify-around"><div className="text-center"><p className="text-xs text-stone-400 font-bold uppercase tracking-wider mb-1">Größe (ca.)</p><div className="flex items-center justify-center text-stone-800 font-bold text-lg"><Ruler size={18} className="text-emerald-500 mr-1.5" />{weekContent.cm || '--'} cm</div></div><div className="w-px bg-stone-100"></div><div className="text-center"><p className="text-xs text-stone-400 font-bold uppercase tracking-wider mb-1">Gewicht (ca.)</p><div className="flex items-center justify-center text-stone-800 font-bold text-lg"><Weight size={18} className="text-emerald-500 mr-1.5" />{weekContent.g || '--'} g</div></div></div></div>
                    <div className="px-6 mt-6 space-y-6"><div><h3 className="text-sm font-bold text-stone-400 uppercase">Ihr Befinden</h3><p className="text-xl font-bold">{weekContent.feeling}</p></div><div className="bg-indigo-50 p-5 rounded-2xl"><h3 className="text-xs font-bold text-indigo-400 uppercase">Dein Pro-Tipp</h3><p className="text-stone-700">{weekContent.tip}</p></div></div>
                </div>
            </div>
        </div>
    );
};

export default ProgressDetailOverlay;
