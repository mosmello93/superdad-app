import React from 'react';
import { Backpack, Clock, Trophy, Shield, FileText, Link, AlertTriangle } from 'lucide-react';
import Timer from '../features/ContractionTimer';

const ToolGridSoft = ({ mode, toggleTimer, openBag, openMilestones, openShield, openBureaucracy, openResources, openEmergency }) => {
    return (
        <div className="grid grid-cols-2 gap-4 mb-8">
            {/* SLOT 1: HERO TOOL (Mode Dependent) */}
            {mode === 'pregnancy' && (
                <div onClick={toggleTimer} className="bg-[#E0E7FF] p-6 rounded-[32px] cursor-pointer transition hover:shadow-md border border-indigo-100/50 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-200/20 rounded-full -mr-8 -mt-8 transition group-hover:scale-110"></div>
                    <div className="mb-8 bg-white/60 w-10 h-10 flex items-center justify-center rounded-full text-indigo-600"><Clock size={20} /></div>
                    <h3 className="font-bold text-indigo-900">Wehen-<br />Timer</h3>
                </div>
            )}
            {mode === 'postpartum' && (
                <div onClick={openMilestones} className="bg-[#FFE4E6] p-6 rounded-[32px] cursor-pointer transition hover:shadow-md border border-rose-100/50 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-rose-200/20 rounded-full -mr-8 -mt-8 transition group-hover:scale-110"></div>
                    <div className="mb-8 bg-white/60 w-10 h-10 flex items-center justify-center rounded-full text-rose-600"><Trophy size={20} /></div>
                    <h3 className="font-bold text-rose-900">Meilen-<br />steine</h3>
                </div>
            )}
            {mode === 'loss' && (
                <div onClick={openShield} className="bg-[#F5F5F4] p-6 rounded-[32px] cursor-pointer transition hover:shadow-md border border-stone-200/50 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-stone-200/20 rounded-full -mr-8 -mt-8 transition group-hover:scale-110"></div>
                    <div className="mb-8 bg-white/60 w-10 h-10 flex items-center justify-center rounded-full text-stone-600"><Shield size={20} /></div>
                    <h3 className="font-bold text-stone-900">Der<br />Schild</h3>
                </div>
            )}

            {/* SLOT 2: EMERGENCY (High Priority) */}
            <div onClick={openEmergency} className="bg-[#FEE2E2] p-6 rounded-[32px] cursor-pointer transition hover:shadow-md border border-red-100/50">
                <div className="mb-8 bg-white/60 w-10 h-10 flex items-center justify-center rounded-full text-red-600"><AlertTriangle size={20} /></div>
                <h3 className="font-bold text-red-900">Notfall<br />Infos</h3>
            </div>

            {/* SLOT 3: CLINIC BAG */}
            <div onClick={openBag} className="bg-[#FFEDD5] p-6 rounded-[32px] cursor-pointer transition hover:shadow-md border border-orange-100/50">
                <div className="mb-8 bg-white/60 w-10 h-10 flex items-center justify-center rounded-full text-orange-600"><Backpack size={20} /></div>
                <h3 className="font-bold text-orange-900">Klinik-<br />tasche</h3>
            </div>

            {/* SLOT 4: BUREAUCRACY */}
            <div onClick={openBureaucracy} className="bg-[#F0FDF4] p-6 rounded-[32px] cursor-pointer transition hover:shadow-md border border-emerald-100/50">
                <div className="mb-8 bg-white/60 w-10 h-10 flex items-center justify-center rounded-full text-emerald-600"><FileText size={20} /></div>
                <h3 className="font-bold text-emerald-900">Papier-<br />kram</h3>
            </div>

            {/* SLOT 5: RESOURCES */}
            <div onClick={openResources} className="bg-[#F3F4F6] p-6 rounded-[32px] cursor-pointer transition hover:shadow-md border border-gray-100/50">
                <div className="mb-8 bg-white/60 w-10 h-10 flex items-center justify-center rounded-full text-gray-600"><Link size={20} /></div>
                <h3 className="font-bold text-gray-900">Wichtige<br />Links</h3>
            </div>
        </div>
    );
};

export default ToolGridSoft;
