import React, { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronUp, CheckCircle, Circle, Edit2, RotateCcw, PieChart } from 'lucide-react';
import { BUDGET_CATEGORIES } from '../../data/budget';

const BudgetOverlay = ({ onClose }) => {
    // State for user data: { [itemId]: { bought: boolean, cost: number } }
    const [userData, setUserData] = useState({});
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [editingItem, setEditingItem] = useState(null); // ID of item being edited
    const [editValue, setEditValue] = useState('');

    // Load from LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem('user_budget');
        if (saved) {
            setUserData(JSON.parse(saved));
        }
    }, []);

    // Save to LocalStorage
    const saveUserData = (newData) => {
        setUserData(newData);
        localStorage.setItem('user_budget', JSON.stringify(newData));
    };

    // Toggle Bought Status
    const toggleBought = (itemId) => {
        const current = userData[itemId] || {};
        saveUserData({
            ...userData,
            [itemId]: { ...current, bought: !current.bought }
        });
    };

    // Update Cost
    const handleCostUpdate = (itemId, defaultCost) => {
        const val = parseFloat(editValue);
        const current = userData[itemId] || {};

        // If value is NaN or same as default, remove custom cost entry to revert to default
        if (isNaN(val) || val === defaultCost) {
            const { cost, ...rest } = current;
            saveUserData({ ...userData, [itemId]: rest });
        } else {
            saveUserData({
                ...userData,
                [itemId]: { ...current, cost: val }
            });
        }
        setEditingItem(null);
    };

    // Reset All
    const handleReset = () => {
        if (window.confirm('Möchtest du wirklich alle Eingaben zurücksetzen?')) {
            saveUserData({});
        }
    };

    // Calculations
    let totalEstimated = 0;
    let totalSpent = 0;
    let totalItems = 0;
    let itemsBought = 0;

    BUDGET_CATEGORIES.forEach(cat => {
        cat.items.forEach(item => {
            const userItem = userData[item.id] || {};
            const cost = userItem.cost !== undefined ? userItem.cost : item.defaultCost;

            totalEstimated += cost;
            totalItems++;

            if (userItem.bought) {
                totalSpent += cost;
                itemsBought++;
            }
        });
    });

    const progress = Math.round((totalSpent / totalEstimated) * 100) || 0;
    const itemsProgress = Math.round((itemsBought / totalItems) * 100) || 0;

    return (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center pointer-events-none">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto transition-opacity" onClick={onClose}></div>

            {/* Modal */}
            <div className="relative z-10 bg-[#FAFAF8] dark:bg-stone-900 w-full max-w-lg h-[92vh] sm:h-[85vh] sm:rounded-[32px] rounded-t-[32px] shadow-xl flex flex-col pointer-events-auto animate-in slide-in-from-bottom duration-300">

                {/* Header */}
                <div className="p-6 bg-white dark:bg-stone-800 rounded-t-[32px] border-b border-stone-100 dark:border-stone-700">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-bold font-serif text-stone-800 dark:text-stone-100 flex items-center gap-2">
                                <span className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-xl text-emerald-600 dark:text-emerald-400">
                                    <PieChart size={20} />
                                </span>
                                Baby-Budget
                            </h2>
                            <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">Plane die Erstausstattung</p>
                        </div>
                        <button onClick={onClose} className="p-2 bg-stone-100 dark:bg-stone-700 rounded-full hover:bg-stone-200 dark:hover:bg-stone-600 transition text-stone-600 dark:text-stone-300">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Dashboard Cards */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-stone-50 dark:bg-stone-900/50 p-4 rounded-2xl border border-stone-100 dark:border-stone-700/50">
                            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Gesamt-Plan</span>
                            <div className="text-2xl font-bold text-stone-800 dark:text-stone-200 mt-1">
                                {totalEstimated} €
                            </div>
                        </div>
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-800/20">
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Ausgegeben</span>
                            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mt-1">
                                {totalSpent} €
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 flex items-center gap-3">
                        <div className="flex-1 h-3 bg-stone-100 dark:bg-stone-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                                style={{ width: `${itemsProgress}%` }}
                            ></div>
                        </div>
                        <span className="text-xs font-bold text-stone-500 dark:text-stone-400 w-12 text-right">
                            {itemsBought}/{totalItems}
                        </span>
                    </div>
                </div>

                {/* Content List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-20">
                    {BUDGET_CATEGORIES.map(cat => (
                        <div key={cat.id} className="bg-white dark:bg-stone-800 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700 overflow-hidden">

                            {/* Category Header */}
                            <button
                                onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
                                className="w-full flex items-center justify-between p-4 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700/50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-xl bg-${cat.color}-100 dark:bg-${cat.color}-900/30 text-${cat.color}-600 dark:text-${cat.color}-400`}>
                                        <cat.icon size={18} />
                                    </div>
                                    <div className="text-left">
                                        <span className="font-bold text-stone-800 dark:text-stone-100 block">{cat.title}</span>
                                        <span className="text-xs text-stone-400">
                                            {cat.items.filter(i => (userData[i.id]?.bought)).length} / {cat.items.length} erledigt
                                        </span>
                                    </div>
                                </div>
                                {expandedCategory === cat.id ? <ChevronUp size={20} className="text-stone-300" /> : <ChevronDown size={20} className="text-stone-300" />}
                            </button>

                            {/* Items List */}
                            {expandedCategory === cat.id && (
                                <div className="border-t border-stone-100 dark:border-stone-700 divide-y divide-stone-100 dark:divide-stone-700 bg-stone-50/50 dark:bg-stone-900/20">
                                    {cat.items.map(item => {
                                        const userItem = userData[item.id] || {};
                                        const isBought = userItem.bought;
                                        const currentCost = userItem.cost !== undefined ? userItem.cost : item.defaultCost;
                                        const isEditing = editingItem === item.id;

                                        return (
                                            <div key={item.id} className={`p-3 pl-4 flex items-center justify-between group transition-colors ${isBought ? 'bg-emerald-50/30 dark:bg-emerald-900/10' : ''}`}>

                                                {/* Left: Checkbox & Label */}
                                                <div className="flex items-center gap-3 flex-1">
                                                    <button
                                                        onClick={() => toggleBought(item.id)}
                                                        className={`flex-shrink-0 transition-colors ${isBought ? 'text-emerald-500' : 'text-stone-300 hover:text-stone-400'}`}
                                                    >
                                                        {isBought ? <CheckCircle size={22} className="fill-emerald-100 dark:fill-emerald-900" /> : <Circle size={22} />}
                                                    </button>

                                                    <span className={`font-medium ${isBought ? 'text-stone-400 line-through' : 'text-stone-700 dark:text-stone-200'}`}>
                                                        {item.label}
                                                    </span>
                                                </div>

                                                {/* Right: Price & Edit */}
                                                <div className="flex items-center gap-2">
                                                    {isEditing ? (
                                                        <div className="flex items-center bg-white dark:bg-stone-900 rounded-lg border border-indigo-200 dark:border-indigo-700 p-1 shadow-sm">
                                                            <input
                                                                type="number"
                                                                autoFocus
                                                                className="w-16 text-right text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-transparent outline-none"
                                                                value={editValue}
                                                                onChange={(e) => setEditValue(e.target.value)}
                                                                onBlur={() => handleCostUpdate(item.id, item.defaultCost)}
                                                                onKeyDown={(e) => e.key === 'Enter' && handleCostUpdate(item.id, item.defaultCost)}
                                                            />
                                                            <span className="text-xs text-stone-400 pr-1">€</span>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            onClick={() => {
                                                                setEditingItem(item.id);
                                                                setEditValue(currentCost.toString());
                                                            }}
                                                            className="flex items-center gap-1 cursor-pointer hover:bg-stone-200 dark:hover:bg-stone-700 px-2 py-1 rounded-lg group/price transition"
                                                        >
                                                            <span className={`text-sm font-bold ${isBought ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-500 dark:text-stone-400 group-hover/price:text-indigo-600 dark:group-hover/price:text-indigo-400'}`}>
                                                                {currentCost} €
                                                            </span>
                                                            <Edit2 size={12} className="opacity-0 group-hover/price:opacity-100 text-stone-400" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Reset Button (Bottom) */}
                    <div className="pt-8 text-center">
                        <button
                            onClick={handleReset}
                            className="text-stone-400 hover:text-red-500 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 mx-auto transition-colors"
                        >
                            <RotateCcw size={14} />
                            Budget zurücksetzen
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BudgetOverlay;
