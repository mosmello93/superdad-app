import React, { useState, useEffect } from 'react';
import { Baby, Sprout } from 'lucide-react';
import { PREGNANCY_WEEKS } from '../../data/content';

const ProgressCardSoft = ({ statusData, mode, openDetail }) => {
    let sizeInfo = null;
    let imageUrl = null;
    let bgColor = mode === 'postpartum' ? "bg-[#EEF2FF]" : (mode === 'loss' ? "bg-[#E5E5E0]" : "bg-[#F0FDF4]");

    if (mode === 'pregnancy' && statusData.week && PREGNANCY_WEEKS[statusData.week]) {
        const weekData = PREGNANCY_WEEKS[statusData.week];
        sizeInfo = `So groß wie ${weekData.size}`;
        imageUrl = weekData.image;
    }

    const [imgError, setImgError] = useState(false);
    useEffect(() => { setImgError(false); }, [imageUrl]);

    return (
        <div onClick={openDetail} className={`${bgColor} rounded-[32px] p-6 relative overflow-hidden mb-4 shadow-sm border border-white/50 cursor-pointer hover:shadow-md transition active:scale-[0.98]`}>
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                    {imageUrl && !imgError ? (
                        <img src={imageUrl} alt={sizeInfo} onError={() => setImgError(true)} className="w-20 h-20 object-contain drop-shadow-md" />
                    ) : (
                        <div className="flex flex-col items-center">
                            <div className="bg-white/50 w-16 h-16 rounded-full flex items-center justify-center">
                                {mode === 'postpartum' ? <Baby size={32} className="text-indigo-600" /> : <Sprout size={32} className="text-emerald-600" />}
                            </div>
                        </div>
                    )}
                    <div className="text-right">
                        <p className="text-stone-500 font-medium uppercase tracking-wider text-[10px] bg-white/40 px-2 py-1 rounded-lg inline-block backdrop-blur-sm">Aktueller Status</p>
                    </div>
                </div>
                <div className="mt-2">
                    {mode === 'loss' ? (
                        <div className="text-xl font-bold text-stone-700 leading-tight">
                            Wir denken an euch.
                            <div className="text-sm text-stone-500 font-medium mt-1 font-normal">Nimm dir alle Zeit, die du brauchst.</div>
                        </div>
                    ) : (
                        sizeInfo ? (
                            <>
                                <div className="text-2xl font-bold text-stone-800 leading-tight mb-1">{sizeInfo}</div>
                                <div className="text-sm text-stone-500 font-medium">{Math.round(statusData.progress)}% geladen</div>
                            </>
                        ) : (
                            <div className="text-5xl font-bold text-stone-800 mb-1">{statusData.days}<span className="text-lg text-stone-400 font-normal ml-2">Tage</span></div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProgressCardSoft;
