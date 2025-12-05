import React from 'react';
import { Timer, Backpack, AlertTriangle } from 'lucide-react';

const ToolGridSoft = ({ mode, openBag, openEmergency, bagItems, toggleTimer }) => {
    return (
        <div className="grid grid-cols-2 gap-4 mb-4">
            {mode === 'pregnancy' && (
                <div onClick={toggleTimer} className="bg-rose-50 p-6 rounded-[32px] cursor-pointer border border-rose-100 hover:shadow-md transition">
                    <div className="mb-8 bg-white w-10 h-10 flex items-center justify-center rounded-full text-rose-500"><Timer size={20} /></div>
                    <h3 className="font-bold text-rose-900">Wehen-<br />Timer</h3>
                    <p className="text-xs text-rose-700 mt-1">Starten</p>
                </div>
            )}
            {(mode === 'pregnancy' || mode === 'loss') && (
                <div onClick={openBag} className="bg-[#FFEDD5] p-6 rounded-[32px] cursor-pointer transition hover:shadow-md border border-orange-100/50">
                    <div className="mb-8 bg-white/60 w-10 h-10 flex items-center justify-center rounded-full text-orange-600"><Backpack size={20} /></div>
                    <h3 className="font-bold text-orange-900">Klinik-<br />tasche</h3>
                    <p className="text-xs text-orange-700 mt-1">{bagItems.length} Items</p>
                </div>
            )}
            <div onClick={openEmergency} className="bg-[#FEE2E2] p-6 rounded-[32px] cursor-pointer transition hover:shadow-md border border-red-100/50">
                <div className="mb-8 bg-white/60 w-10 h-10 flex items-center justify-center rounded-full text-red-600"><AlertTriangle size={20} /></div>
                <h3 className="font-bold text-red-900">Notfall<br />Infos</h3>
                <p className="text-xs text-red-700 mt-1">Bereit?</p>
            </div>
        </div>
    );
};

export default ToolGridSoft;
