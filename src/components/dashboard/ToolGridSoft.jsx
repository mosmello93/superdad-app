import React from 'react';
import { Backpack, Clock, Trophy, Shield, FileText, Link, AlertTriangle } from 'lucide-react';
import Timer from '../features/ContractionTimer';

const ToolGridSoft = ({ mode, toggleTimer, openBag, openMilestones, openShield, openBureaucracy, openResources, openEmergency }) => {
    return (
        <div className="grid grid-cols-2 gap-4 mb-8">
            {/* SLOT 1: HERO TOOL (Mode Dependent) */}
            {mode === 'pregnancy' && (
                <div onClick={toggleTimer} className="bg-[#E0E7FF] dark:bg-indigo-900/40 p-6 rounded-[32px] cursor-pointer transition hover:shadow-md border border-indigo-100/50 dark:border-indigo-800/50 group">
                    <div className="mb-8 bg-white/60 dark:bg-white/10 w-10 h-10 flex items-center justify-center rounded-full text-indigo-600 dark:text-indigo-400"><Clock size={20} /></div>
                    <h3 className="font-bold text-indigo-900 dark:text-indigo-200">Wehen-<br />Timer</h3>
                </div>
            )}
            {(mode === 'postpartum' || mode === 'pregnancy') && (
                <div onClick={openMilestones} className={`p-6 rounded-[32px] cursor-pointer transition hover:shadow-md border group ${mode === 'postpartum' ? 'bg-[#FFE4E6] dark:bg-rose-900/40 border-rose-100/50 dark:border-rose-800/50' : 'bg-violet-50 dark:bg-violet-900/40 border-violet-100/50 dark:border-violet-800/50'}`}>
                    <div className={`mb-8 bg-white/60 dark:bg-white/10 w-10 h-10 flex items-center justify-center rounded-full ${mode === 'postpartum' ? 'text-rose-600 dark:text-rose-400' : 'text-violet-600 dark:text-violet-400'}`}><Trophy size={20} /></div>
                    <h3 className={`font-bold ${mode === 'postpartum' ? 'text-rose-900 dark:text-rose-200' : 'text-violet-900 dark:text-violet-200'}`}>Meilen-<br />steine</h3>
                </div>
            )}
            {mode === 'loss' && (
                <div onClick={openShield} className="bg-[#F5F5F4] dark:bg-stone-800/50 p-6 rounded-[32px] cursor-pointer transition hover:shadow-md border border-stone-200/50 dark:border-stone-700/50 group">
                    <div className="mb-8 bg-white/60 dark:bg-white/10 w-10 h-10 flex items-center justify-center rounded-full text-stone-600 dark:text-stone-400"><Shield size={20} /></div>
                    <h3 className="font-bold text-stone-900 dark:text-stone-200">Der<br />Schild</h3>
                </div>
            )}

            {/* SLOT 2: EMERGENCY (High Priority) */}
            <div onClick={openEmergency} className="bg-[#FEE2E2] dark:bg-red-900/40 p-6 rounded-[32px] cursor-pointer transition hover:shadow-md border border-red-100/50 dark:border-red-800/50 group">
                <div className="mb-8 bg-white/60 dark:bg-white/10 w-10 h-10 flex items-center justify-center rounded-full text-red-600 dark:text-red-400"><AlertTriangle size={20} /></div>
                <h3 className="font-bold text-red-900 dark:text-red-200">Notfall<br />Infos</h3>
            </div>

            {/* SLOT 3: CLINIC BAG */}
            {mode !== 'postpartum' && (
                <div onClick={openBag} className="bg-[#FFEDD5] dark:bg-orange-900/40 p-6 rounded-[32px] cursor-pointer transition hover:shadow-md border border-orange-100/50 dark:border-orange-800/50 group">
                    <div className="mb-8 bg-white/60 dark:bg-white/10 w-10 h-10 flex items-center justify-center rounded-full text-orange-600 dark:text-orange-400"><Backpack size={20} /></div>
                    <h3 className="font-bold text-orange-900 dark:text-orange-200">Klinik-<br />tasche</h3>
                </div>
            )}

            {/* SLOT 4: BUREAUCRACY */}
            <div onClick={openBureaucracy} className="bg-[#F0FDF4] dark:bg-emerald-900/40 p-6 rounded-[32px] cursor-pointer transition hover:shadow-md border border-emerald-100/50 dark:border-emerald-800/50 group">
                <div className="mb-8 bg-white/60 dark:bg-white/10 w-10 h-10 flex items-center justify-center rounded-full text-emerald-600 dark:text-emerald-400"><FileText size={20} /></div>
                <h3 className="font-bold text-emerald-900 dark:text-emerald-200">Papier-<br />kram</h3>
            </div>

            {/* SLOT 5: RESOURCES */}
            <div onClick={openResources} className="bg-[#F3F4F6] dark:bg-stone-800 p-6 rounded-[32px] cursor-pointer transition hover:shadow-md border border-gray-100/50 dark:border-stone-700/50 group">
                <div className="mb-8 bg-white/60 dark:bg-white/10 w-10 h-10 flex items-center justify-center rounded-full text-gray-600 dark:text-stone-400"><Link size={20} /></div>
                <h3 className="font-bold text-gray-900 dark:text-stone-200">Wichtige<br />Links</h3>
            </div>
        </div>
    );
};

export default ToolGridSoft;
