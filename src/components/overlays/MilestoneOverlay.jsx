import React, { useState } from 'react';
import { Trophy, CheckCircle, Lock, Calendar, X } from 'lucide-react';
import { MILESTONES } from '../../data/milestones';

const MilestoneOverlay = ({ unlockedMilestones = [], toggleMilestone, close }) => {

    // Calculate progress
    const total = MILESTONES.length;
    const unlocked = unlockedMilestones.length;
    const progress = Math.round((unlocked / total) * 100);

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#F5F5F0] animate-in slide-in-from-bottom-full duration-500">
            {/* Header */}
            <div className="bg-white px-6 pt-12 pb-6 shadow-sm flex items-center justify-between z-10">
                <div>
                    <h2 className="text-2xl font-bold text-stone-800 font-serif">Meilensteine</h2>
                    <p className="text-stone-500 text-sm">Eure ersten Momente</p>
                </div>
                <button onClick={close} className="bg-stone-100 p-2 rounded-full text-stone-500 hover:bg-stone-200 transition">
                    <X size={24} />
                </button>
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-4 bg-white border-b border-stone-100">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">{unlocked} von {total} erreicht</span>
                    <span className="text-xl font-bold text-rose-500">{progress}%</span>
                </div>
                <div className="h-3 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-rose-400 to-rose-600 transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-6 pb-24">
                <div className="grid grid-cols-2 gap-4">
                    {MILESTONES.map(milestone => {
                        const isUnlocked = unlockedMilestones.includes(milestone.id);
                        const Icon = milestone.icon;

                        return (
                            <div
                                key={milestone.id}
                                onClick={() => toggleMilestone(milestone.id)}
                                className={`aspect-square rounded-[24px] p-4 flex flex-col justify-between relative transition-all active:scale-95 cursor-pointer ${isUnlocked
                                        ? 'bg-white shadow-md border border-stone-100'
                                        : 'bg-stone-100 opacity-80 shadow-inner'
                                    }`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isUnlocked ? `bg-${milestone.color}-100 text-${milestone.color}-600` : 'bg-stone-200 text-stone-400'
                                        }`}>
                                        <Icon size={20} />
                                    </div>
                                    {isUnlocked ? (
                                        <CheckCircle size={20} className="text-emerald-500" />
                                    ) : (
                                        <Lock size={16} className="text-stone-300" />
                                    )}
                                </div>

                                <div>
                                    <h3 className={`font-bold leading-tight mb-1 ${isUnlocked ? 'text-stone-800' : 'text-stone-400'}`}>
                                        {milestone.title}
                                    </h3>
                                    {isUnlocked && (
                                        <p className="text-[10px] text-stone-400 font-medium">{milestone.timing}</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MilestoneOverlay;
