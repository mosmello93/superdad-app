import React, { useMemo } from 'react';
import { X, CheckCircle, Circle, Trophy, Plus } from 'lucide-react';
import { getTasks } from '../../data/content';

const MissionsOverlay = ({ onClose, statusData, tasks, toggleTask, mode }) => {
    const stage = (mode === 'loss') ? 0 : (mode === 'postpartum' ? 0 : statusData.stage);
    const defaultTasks = useMemo(() => getTasks(mode, stage), [mode, stage]);

    // Custom Tasks State
    const [customTasks, setCustomTasks] = React.useState(() => {
        try { return JSON.parse(localStorage.getItem('custom_weekly_tasks') || '[]'); } catch { return []; }
    });
    const [newItemText, setNewItemText] = React.useState('');

    const addCustomTask = (e) => {
        e.preventDefault();
        if (!newItemText.trim()) return;
        const newItem = { id: `custom_weekly_${Date.now()}`, text: newItemText };
        const updated = [...customTasks, newItem];
        setCustomTasks(updated);
        localStorage.setItem('custom_weekly_tasks', JSON.stringify(updated));
        setNewItemText('');
    };

    const deleteCustomTask = (e, id) => {
        e.stopPropagation();
        const updated = customTasks.filter(t => t.id !== id);
        setCustomTasks(updated);
        localStorage.setItem('custom_weekly_tasks', JSON.stringify(updated));
    };

    // Merge Lists
    const allTasksSource = [...customTasks, ...defaultTasks];

    const currentTasks = allTasksSource.map(t => {
        const saved = tasks.find(st => st.id === t.id);
        return { ...t, completed: saved ? saved.completed : false, isCustom: t.id.startsWith('custom_weekly_') };
    });

    const done = currentTasks.filter(t => t.completed).length;
    const progress = Math.round((done / Math.max(currentTasks.length, 1)) * 100);

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#F5F5F0] dark:bg-stone-950 animate-in slide-in-from-bottom duration-500">
            {/* Header */}
            <div className="bg-white dark:bg-stone-900 px-6 pt-12 pb-6 shadow-sm flex items-center justify-between z-10 shrink-0 border-b border-stone-100 dark:border-stone-800">
                <div>
                    <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 font-serif">Wochen-Missionen</h2>
                    <p className="text-stone-500 dark:text-stone-400 text-sm">Deine Aufgaben für Woche {statusData.week}</p>
                </div>
                <button onClick={onClose} className="bg-stone-100 dark:bg-stone-800 p-2 rounded-full text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 transition">
                    <X size={24} />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 pb-24 space-y-6">

                {/* PROGRESS CARD */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                            <Trophy size={32} />
                        </div>
                        <div>
                            <div className="text-xs font-bold uppercase tracking-wider opacity-80">Fortschritt</div>
                            <div className="text-3xl font-bold font-mono">{progress}%</div>
                        </div>
                    </div>
                    {/* Decorative Ring */}
                    <div className="absolute -right-6 -bottom-6 w-32 h-32 border-[12px] border-white/10 rounded-full"></div>
                </div>

                {/* TASKS LIST */}
                <div className="space-y-3">
                    {currentTasks.length === 0 ? (
                        <div className="text-center py-12 text-stone-400">
                            <p>Keine Missionen für diese Woche.</p>
                            <p className="text-xs">Füge eigene hinzu!</p>
                        </div>
                    ) : (
                        currentTasks.map(task => (
                            <div
                                key={task.id}
                                onClick={() => toggleTask(task.id, task.completed)}
                                className={`flex items-start p-4 rounded-2xl cursor-pointer transition-all border group ${task.completed
                                        ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/30'
                                        : 'bg-white dark:bg-stone-900 border-stone-100 dark:border-stone-800 hover:border-emerald-200'
                                    }`}
                            >
                                <div className={`mt-0.5 mr-4 transition-transform duration-300 ${task.completed ? 'text-emerald-500 dark:text-emerald-400' : 'text-stone-300 dark:text-stone-600'}`}>
                                    {task.completed ? <CheckCircle size={24} className="fill-current" /> : <Circle size={24} />}
                                </div>

                                <div className="flex-1">
                                    <span className={`block font-medium mb-1 transition-colors ${task.completed ? 'text-stone-400 line-through decoration-emerald-500/50' : 'text-stone-800 dark:text-stone-200'}`}>
                                        {task.text}
                                    </span>
                                </div>

                                {task.isCustom && (
                                    <button
                                        onClick={(e) => deleteCustomTask(e, task.id)}
                                        className="p-2 -mr-2 text-stone-300 hover:text-red-500 transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* ADD CUSTOM TASK */}
                <form onSubmit={addCustomTask} className="relative mt-4">
                    <input
                        type="text"
                        value={newItemText}
                        onChange={(e) => setNewItemText(e.target.value)}
                        placeholder="+ Eigene Mission hinzufügen..."
                        className="w-full pl-5 pr-12 py-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-100 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-sm placeholder:text-stone-400"
                    />
                    <button
                        type="submit"
                        disabled={!newItemText.trim()}
                        className="absolute right-2 top-2 bottom-2 aspect-square bg-emerald-500 text-white rounded-xl shadow-md disabled:opacity-50 disabled:bg-stone-300 flex items-center justify-center transition-transform active:scale-95"
                    >
                        <Plus size={20} />
                    </button>
                </form>

                <div className="h-4"></div>
            </div>
        </div>
    );
};

export default MissionsOverlay;
