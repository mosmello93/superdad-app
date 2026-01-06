import React from 'react';
import { SCIENCE_SNACKS } from '../../data/conception_content';

const ScienceSlider = () => {
    return (
        <div className="space-y-4">
            <h3 className="text-sm font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest pl-2">
                Science Snacks 🧬
            </h3>

            <div className="flex gap-4 overflow-x-auto pb-4 px-2 snap-x snap-mandatory hide-scrollbar">
                {SCIENCE_SNACKS.map(snack => {
                    const colorMap = {
                        indigo: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-900 dark:text-indigo-100 border-indigo-100 dark:border-indigo-800/30",
                        rose: "bg-rose-50 dark:bg-rose-900/20 text-rose-900 dark:text-rose-100 border-rose-100 dark:border-rose-800/30",
                        emerald: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-100 border-emerald-100 dark:border-emerald-800/30",
                        amber: "bg-amber-50 dark:bg-amber-900/20 text-amber-900 dark:text-amber-100 border-amber-100 dark:border-amber-800/30",
                    };
                    const style = colorMap[snack.color] || colorMap.indigo;

                    return (
                        <div
                            key={snack.id}
                            className={`min-w-[280px] p-5 rounded-[24px] border border-opacity-50 snap-center ${style}`}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-white/50 dark:bg-black/20 rounded-xl">
                                    <snack.icon size={18} />
                                </div>
                                <h4 className="font-bold text-sm leading-tight">{snack.title}</h4>
                            </div>
                            <p className="text-xs opacity-80 leading-relaxed font-medium">
                                {snack.text}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ScienceSlider;
