import React, { useRef } from 'react';
import { CheckCircle, Lock, X, Camera, Image as ImageIcon } from 'lucide-react';
import { MILESTONES_PREGNANCY, MILESTONES_POSTPARTUM } from '../../data/milestones';

const MilestoneOverlay = ({ unlockedMilestones = [], toggleMilestone, close, mode, milestonePhotos = {}, onSavePhoto }) => {

    // Select data based on mode
    const milestoneData = mode === 'pregnancy' ? MILESTONES_PREGNANCY : MILESTONES_POSTPARTUM;

    // Calculate progress
    const total = milestoneData.length;
    const unlocked = unlockedMilestones.length;
    const progress = Math.round((unlocked / total) * 100);

    const fileInputRef = useRef(null);
    const selectedMilestoneIdRef = useRef(null);

    const handlePhotoClick = (id) => {
        selectedMilestoneIdRef.current = id;
        fileInputRef.current?.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file && selectedMilestoneIdRef.current) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onSavePhoto(selectedMilestoneIdRef.current, reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#F5F5F0] animate-in slide-in-from-bottom-full duration-500">
            {/* Hidden File Input */}
            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />

            {/* Header */}
            <div className="bg-white px-6 pt-12 pb-6 shadow-sm flex items-center justify-between z-10 shrink-0">
                <div>
                    <h2 className="text-2xl font-bold text-stone-800 font-serif">Meilensteine</h2>
                    <p className="text-stone-500 text-sm">{mode === 'pregnancy' ? 'Eure Reise zum Baby' : 'Eure ersten Momente'}</p>
                </div>
                <button onClick={close} className="bg-stone-100 p-2 rounded-full text-stone-500 hover:bg-stone-200 transition">
                    <X size={24} />
                </button>
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-4 bg-white border-b border-stone-100 shrink-0">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">{unlocked} von {total} erreicht</span>
                    <span className={`text-xl font-bold ${mode === 'pregnancy' ? 'text-violet-500' : 'text-rose-500'}`}>{progress}%</span>
                </div>
                <div className="h-3 bg-stone-100 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-500 ${mode === 'pregnancy' ? 'bg-gradient-to-r from-violet-400 to-violet-600' : 'bg-gradient-to-r from-rose-400 to-rose-600'}`}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-6 pb-24">
                <div className="grid grid-cols-2 gap-4">
                    {milestoneData.map(milestone => {
                        const isUnlocked = unlockedMilestones.includes(milestone.id);
                        const hasPhoto = milestonePhotos[milestone.id];
                        const Icon = milestone.icon;

                        return (
                            <div
                                key={milestone.id}
                                className={`rounded-[24px] p-4 flex flex-col justify-between relative transition-all ${isUnlocked
                                    ? 'bg-white shadow-md border border-stone-100'
                                    : 'bg-stone-100 opacity-80 shadow-inner'
                                    }`}
                            >
                                {/* Header Row */}
                                <div className="flex justify-between items-start mb-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isUnlocked ? `bg-${milestone.color}-100 text-${milestone.color}-600` : 'bg-stone-200 text-stone-400'
                                        }`}>
                                        <Icon size={20} />
                                    </div>
                                    <button
                                        onClick={() => toggleMilestone(milestone.id)}
                                        className="focus:outline-none"
                                    >
                                        {isUnlocked ? (
                                            <CheckCircle size={24} className="text-emerald-500" />
                                        ) : (
                                            <Lock size={20} className="text-stone-300" />
                                        )}
                                    </button>
                                </div>

                                {/* Text Content */}
                                <div className="mb-3">
                                    <h3 className={`font-bold leading-tight mb-1 cursor-pointer ${isUnlocked ? 'text-stone-800' : 'text-stone-400'}`} onClick={() => toggleMilestone(milestone.id)}>
                                        {milestone.title}
                                    </h3>
                                    {isUnlocked && (
                                        <p className="text-[10px] text-stone-400 font-medium">{milestone.timing}</p>
                                    )}
                                </div>

                                {/* Photo Area (Only if unlocked) */}
                                {isUnlocked && (
                                    <div className="mt-auto pt-2 border-t border-stone-50">
                                        {hasPhoto ? (
                                            <div
                                                className="relative w-full aspect-video rounded-xl overflow-hidden cursor-pointer group"
                                                onClick={() => handlePhotoClick(milestone.id)}
                                            >
                                                <img src={hasPhoto} alt="Erinnerung" className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                                    <Camera className="text-white" size={20} />
                                                </div>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => handlePhotoClick(milestone.id)}
                                                className="w-full py-2 flex items-center justify-center gap-2 bg-stone-50 hover:bg-stone-100 rounded-xl text-stone-400 text-xs font-bold transition dashed border border-stone-200"
                                            >
                                                <Camera size={14} />
                                                Foto
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MilestoneOverlay;
