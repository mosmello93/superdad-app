import React from 'react';
import { X, CheckSquare } from 'lucide-react';
import { HOSPITAL_BAG_CONTENT } from '../../data/content';

const HospitalBagOverlay = ({ bagItems, toggleItem, closeBag, mode, ssw }) => {
    let categories = Object.keys(HOSPITAL_BAG_CONTENT);

    // Filter logic for Loss Mode
    if (mode === 'loss') {
        // If early loss (e.g. < 24 weeks) or unknown, hide baby stuff. 
        // Showing baby clothes can be very painful if there is no baby to take home.
        if (!ssw || ssw < 24) {
            categories = categories.filter(cat => cat !== 'baby');
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm pointer-events-auto animate-in fade-in duration-300" onClick={closeBag}></div>
            <div className="bg-[#F5F5F0] w-full max-w-md h-[90vh] sm:h-[80vh] rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden flex flex-col pointer-events-auto animate-in slide-in-from-bottom duration-300 relative">
                <div className="bg-white p-6 pb-4 border-b border-stone-100 flex justify-between items-center sticky top-0 z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-stone-800">Die Tasche</h2>
                        <p className="text-stone-500 text-xs">
                            {mode === 'loss' ? 'Dokumente & Persönliches' : 'Alles dabei für Tag X?'}
                        </p>
                    </div>
                    <button onClick={closeBag} className="bg-stone-100 p-2 rounded-full hover:bg-stone-200 transition"><X size={20} className="text-stone-600" /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {categories.map(catKey => {
                        const category = HOSPITAL_BAG_CONTENT[catKey];
                        return (
                            <div key={catKey}>
                                <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-3 ml-1">{category.title}</h3>
                                <div className="space-y-2">
                                    {category.items.map(item => {
                                        const isChecked = bagItems.includes(item.id);
                                        return (
                                            <div key={item.id} onClick={() => toggleItem(item.id)} className={`flex items-center p-4 rounded-2xl cursor-pointer transition-all border ${isChecked ? 'bg-amber-50 border-amber-100' : 'bg-white border-transparent hover:border-stone-200 shadow-sm'}`}>
                                                <div className={`mr-4 transition-all ${isChecked ? 'text-amber-500 scale-110' : 'text-stone-300'}`}>{isChecked ? <CheckSquare size={24} className="fill-current" /> : <div className="w-6 h-6 border-2 border-stone-300 rounded-md"></div>}</div>
                                                <span className={`text-sm font-medium transition-colors ${isChecked ? 'text-stone-400 line-through' : 'text-stone-700'}`}>{item.text}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                    <div className="h-12"></div>
                </div>
            </div>
        </div>
    );
};

export default HospitalBagOverlay;
