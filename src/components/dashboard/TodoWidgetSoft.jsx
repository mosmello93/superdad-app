import React, { useMemo } from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { getTasks } from '../../data/content';

const TodoWidgetSoft = ({ statusData, tasks, toggleTask, mode }) => {
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
        // If it was checked, we might want to toggle it off in parent state, but not strictly necessary as it's just ID based
    };

    if (!defaultTasks.length && !customTasks.length) return null;

    // Merge Lists
    const allTasksSource = [...customTasks, ...defaultTasks];

    const currentTasks = allTasksSource.map(t => {
        const saved = tasks.find(st => st.id === t.id);
        return { ...t, completed: saved ? saved.completed : false, isCustom: t.id.startsWith('custom_weekly_') };
    });

    const done = currentTasks.filter(t => t.completed).length;

    return (
        <div className="bg-white dark:bg-stone-900 p-6 rounded-[32px] border border-stone-100 dark:border-stone-800 shadow-sm mb-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-stone-800 dark:text-stone-100 text-lg">Checkliste</h3>
                <span className="text-xs bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 px-2 py-1 rounded-full font-medium">{done}/{currentTasks.length}</span>
            </div>

            <div className="space-y-2 mb-4">
                {currentTasks.map(task => (
                    <div key={task.id} onClick={() => toggleTask(task.id, task.completed)} className={`flex items-center p-3 rounded-2xl cursor-pointer transition-all group ${task.completed ? 'bg-stone-50 dark:bg-stone-950 text-stone-400 dark:text-stone-600' : 'hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200'}`}>
                        <div className={`mr-3 ${task.completed ? 'text-emerald-500 dark:text-emerald-600' : 'text-stone-300 dark:text-stone-600'}`}>
                            {task.completed ? <CheckCircle size={22} /> : <Circle size={22} />}
                        </div>
                        <span className={`text-sm font-medium flex-1 ${task.completed ? 'line-through' : ''}`}>{task.text}</span>

                        {task.isCustom && (
                            <button
                                onClick={(e) => deleteCustomTask(e, task.id)}
                                className="opacity-0 group-hover:opacity-100 p-1 text-stone-300 hover:text-red-500 transition"
                            >
                                <Circle size={14} className="fill-current text-transparent hover:fill-red-500" />
                                {/* Using Circle as a X placeholder or just X icon? Let's import X if needed, or re-use existing icon but let's stick to X pattern used elsewhere */}
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Input Field */}
            <form onSubmit={addCustomTask} className="relative mt-2">
                <input
                    type="text"
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                    placeholder="+ Punkt hinzufügen"
                    className="w-full pl-4 pr-10 py-3 rounded-xl bg-stone-50 dark:bg-stone-950 border-none text-sm focus:ring-1 focus:ring-emerald-500/50 placeholder:text-stone-400"
                />
                <button
                    type="submit"
                    disabled={!newItemText.trim()}
                    className="absolute right-2 top-1.5 bottom-1.5 aspect-square bg-white dark:bg-stone-800 rounded-lg text-emerald-600 shadow-sm disabled:opacity-50 disabled:text-stone-400 flex items-center justify-center font-bold"
                >
                    +
                </button>
            </form>
        </div>
    );
};

export default TodoWidgetSoft;
