import React from 'react';
import { X, CheckSquare } from 'lucide-react';
import { HOSPITAL_BAG_CONTENT, LOSS_HOSPITAL_BAG_CONTENT } from '../../data/content';

const HospitalBagOverlay = ({ bagItems, toggleItem, closeBag, mode, ssw }) => {
    // Select content based on mode
    const contentSource = mode === 'loss' ? LOSS_HOSPITAL_BAG_CONTENT : HOSPITAL_BAG_CONTENT;
    let categories = Object.keys(contentSource);

    const [customItems, setCustomItems] = React.useState(() => {
        try {
            return JSON.parse(localStorage.getItem('custom_bag_items') || '[]');
        } catch (e) { return []; }
    });
    const [newItemText, setNewItemText] = React.useState('');

    const addCustomItem = (e) => {
        e.preventDefault();
        if (!newItemText.trim()) return;
        const newItem = { id: `limitless_${Date.now()}`, text: newItemText };
        const updated = [...customItems, newItem];
        setCustomItems(updated);
        localStorage.setItem('custom_bag_items', JSON.stringify(updated));
        setNewItemText('');
    };

    const deleteCustomItem = (e, id) => {
        e.stopPropagation(); // prevent toggle
        const updated = customItems.filter(i => i.id !== id);
        setCustomItems(updated);
        localStorage.setItem('custom_bag_items', JSON.stringify(updated));
        // Also remove from bagItems if it was checked?
        if (bagItems.includes(id)) toggleItem(id);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm pointer-events-auto animate-in fade-in duration-300" onClick={closeBag}></div>
            <div className="bg-[#F5F5F0] dark:bg-stone-950 w-full max-w-md h-[90vh] sm:h-[80vh] rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden flex flex-col pointer-events-auto animate-in slide-in-from-bottom duration-300 relative">
                <div className="bg-white dark:bg-stone-900 p-6 pb-4 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center sticky top-0 z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100">Die Tasche</h2>
                        <p className="text-stone-500 dark:text-stone-400 text-xs">
                            {mode === 'loss' ? 'Dokumente & Persönliches' : 'Alles dabei für Tag X?'}
                        </p>
                    </div>
                    <button onClick={closeBag} className="bg-stone-100 dark:bg-stone-800 p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 transition"><X size={20} className="text-stone-600 dark:text-stone-300" /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">

                    {/* INPUT SECTION */}
                    <form onSubmit={addCustomItem} className="relative">
                        <input
                            type="text"
                            value={newItemText}
                            onChange={(e) => setNewItemText(e.target.value)}
                            placeholder="Eigener Punkt..."
                            className="w-full pl-5 pr-12 py-4 rounded-2xl border-none shadow-sm bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:ring-2 focus:ring-emerald-500/50"
                        />
                        <button
                            type="submit"
                            disabled={!newItemText.trim()}
                            className="absolute right-2 top-2 bottom-2 aspect-square bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500 rounded-xl hover:bg-emerald-500 hover:text-white disabled:opacity-50 disabled:hover:bg-stone-100 disabled:hover:text-stone-400 transition flex items-center justify-center font-bold text-xl"
                        >
                            +
                        </button>
                    </form>

                    {/* CUSTOM ITEMS */}
                    {customItems.length > 0 && (
                        <div>
                            <h3 className="text-sm font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider mb-3 ml-1 flex items-center gap-2">
                                Deine Liste
                            </h3>
                            <div className="space-y-2">
                                {customItems.map(item => {
                                    const isChecked = bagItems.includes(item.id);
                                    return (
                                        <div key={item.id} onClick={() => toggleItem(item.id)} className={`flex items-center p-4 rounded-2xl cursor-pointer transition-all border group ${isChecked ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800' : 'bg-white dark:bg-stone-900 border-transparent hover:border-stone-200 dark:hover:border-stone-700 shadow-sm'}`}>
                                            <div className={`mr-4 transition-all ${isChecked ? 'text-amber-500 dark:text-amber-400 scale-110' : 'text-stone-300 dark:text-stone-600'}`}>{isChecked ? <CheckSquare size={24} className="fill-current" /> : <div className="w-6 h-6 border-2 border-stone-300 dark:border-stone-600 rounded-md"></div>}</div>
                                            <span className={`text-sm font-medium transition-colors flex-1 ${isChecked ? 'text-stone-400 dark:text-stone-500 line-through' : 'text-stone-700 dark:text-stone-200'}`}>{item.text}</span>
                                            <button onClick={(e) => deleteCustomItem(e, item.id)} className="opacity-0 group-hover:opacity-100 p-2 text-stone-400 hover:text-red-500 transition"><X size={16} /></button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {categories.map(catKey => {
                        const category = contentSource[catKey];
                        return (
                            <div key={catKey}>
                                <h3 className="text-sm font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-3 ml-1">{category.title}</h3>
                                <div className="space-y-2">
                                    {category.items.map(item => {
                                        const isChecked = bagItems.includes(item.id);
                                        return (
                                            <div key={item.id} onClick={() => toggleItem(item.id)} className={`flex items-center p-4 rounded-2xl cursor-pointer transition-all border ${isChecked ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800' : 'bg-white dark:bg-stone-900 border-transparent hover:border-stone-200 dark:hover:border-stone-700 shadow-sm'}`}>
                                                <div className={`mr-4 transition-all ${isChecked ? 'text-amber-500 dark:text-amber-400 scale-110' : 'text-stone-300 dark:text-stone-600'}`}>{isChecked ? <CheckSquare size={24} className="fill-current" /> : <div className="w-6 h-6 border-2 border-stone-300 dark:border-stone-600 rounded-md"></div>}</div>
                                                <span className={`text-sm font-medium transition-colors ${isChecked ? 'text-stone-400 dark:text-stone-500 line-through' : 'text-stone-700 dark:text-stone-200'}`}>{item.text}</span>
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
