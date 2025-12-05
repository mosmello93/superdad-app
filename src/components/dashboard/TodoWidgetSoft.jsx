import React, { useMemo } from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { getTasks } from '../../data/content';

const TodoWidgetSoft = ({ statusData, tasks, toggleTask, mode }) => {
    const stage = (mode === 'loss') ? 0 : (mode === 'postpartum' ? 0 : statusData.stage);
    const defaultTasks = useMemo(() => getTasks(mode, stage), [mode, stage]);
    if (!defaultTasks.length) return null;
    const currentTasks = defaultTasks.map(t => {
        const saved = tasks.find(st => st.id === t.id);
        return { ...t, completed: saved ? saved.completed : false };
    });
    const done = currentTasks.filter(t => t.completed).length;
    return (
        <div className="bg-white p-6 rounded-[32px] border border-stone-100 shadow-sm mb-4">
            <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-stone-800 text-lg">Checkliste</h3><span className="text-xs bg-stone-100 text-stone-500 px-2 py-1 rounded-full font-medium">{done}/{currentTasks.length}</span></div>
            <div className="space-y-2">{currentTasks.map(task => (<div key={task.id} onClick={() => toggleTask(task.id, task.completed)} className={`flex items-center p-3 rounded-2xl cursor-pointer transition-all ${task.completed ? 'bg-stone-50 text-stone-400' : 'hover:bg-stone-50 text-stone-700'}`}><div className={`mr-3 ${task.completed ? 'text-emerald-500' : 'text-stone-300'}`}>{task.completed ? <CheckCircle size={22} /> : <Circle size={22} />}</div><span className={`text-sm font-medium ${task.completed ? 'line-through' : ''}`}>{task.text}</span></div>))}</div>
        </div>
    );
};

export default TodoWidgetSoft;
