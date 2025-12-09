import React, { useState } from 'react';
import { CheckCircle, Circle, ChevronRight, X, Calendar, AlertCircle } from 'lucide-react';
import { BUREAUCRACY_TASKS, BUREAUCRACY_ASSETS } from '../../data/bureaucracy';

const BureaucracySoft = ({ completedTasks = [], toggleTask, close, mode }) => {
    const [selectedTask, setSelectedTask] = useState(null);

    // Filter Logic based on Mode
    const filteredTasks = BUREAUCRACY_TASKS.filter(task => {
        if (mode === 'loss') {
            return task.timing.type === 'loss';
        }
        if (mode === 'postpartum') {
            // Show birth tasks + Unfinished pregnancy tasks
            if (task.timing.type === 'birth') return true;
            if (task.timing.type === 'due_date' && !completedTasks.includes(task.id)) return true; // Show overdue tasks
            return false;
        }
        // Pregnancy
        return task.timing.type === 'due_date';
    });

    // Sort: Due/High Urgency first, Done last
    const sortedTasks = [...filteredTasks].sort((a, b) => {
        const isADone = completedTasks.includes(a.id);
        const isBDone = completedTasks.includes(b.id);
        if (isADone && !isBDone) return 1;
        if (!isADone && isBDone) return -1;
        if (a.urgency === 'high' && b.urgency !== 'high') return -1;
        if (b.urgency === 'high' && a.urgency !== 'high') return 1;
        return 0;
    });

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#F5F5F0] dark:bg-stone-950 animate-in slide-in-from-bottom-full duration-500">
            {/* Header */}
            <div className="bg-white dark:bg-stone-900 px-6 pt-12 pb-6 shadow-sm flex items-center justify-between z-10 border-b border-stone-100 dark:border-stone-800">
                <div>
                    <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 font-serif">Papierkram</h2>
                    <p className="text-stone-500 dark:text-stone-400 text-sm">Der Behörden-Guide für Dads</p>
                </div>
                <button onClick={close} className="bg-stone-100 dark:bg-stone-800 p-2 rounded-full text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 transition">
                    <X size={24} />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 pb-32">
                <div className="space-y-4">
                    {sortedTasks.map(task => {
                        const isDone = completedTasks.includes(task.id);
                        const asset = BUREAUCRACY_ASSETS[task.category];
                        const Icon = task.icon;

                        return (
                            <div key={task.id}
                                onClick={() => setSelectedTask(task)}
                                className={`bg-white dark:bg-stone-900 p-4 rounded-2xl border ${isDone ? 'border-emerald-100 dark:border-emerald-900/30 opacity-60' : 'border-stone-100 dark:border-stone-800'} shadow-sm flex items-center gap-4 transition active:scale-95`}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isDone ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : `bg-${asset.color}-50 dark:bg-${asset.color}-900/20 text-${asset.color}-600 dark:text-${asset.color}-400`}`}>
                                    {isDone ? <CheckCircle size={24} /> : <Icon size={24} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <h3 className={`font-bold text-stone-800 dark:text-stone-100 truncate ${isDone && 'line-through text-stone-400 dark:text-stone-600'}`}>{task.title}</h3>
                                        {task.urgency === 'high' && !isDone && <AlertCircle size={14} className="text-rose-500 dark:text-rose-400" />}
                                    </div>
                                    <p className="text-xs text-stone-500 dark:text-stone-400 truncate">{task.description}</p>
                                </div>
                                <ChevronRight className="text-stone-300 dark:text-stone-600" size={20} />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* DETAIL OVERLAY */}
            {selectedTask && (
                <div className="absolute inset-0 z-50 bg-white dark:bg-stone-900 animate-in slide-in-from-right duration-300 flex flex-col">
                    <div className="px-6 pt-12 pb-4 border-b border-stone-100 dark:border-stone-800 flex items-center gap-4 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md sticky top-0">
                        <button onClick={() => setSelectedTask(null)} className="p-2 -ml-2 text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300">
                            <ChevronRight size={24} className="rotate-180" />
                        </button>
                        <h3 className="font-bold text-lg text-stone-800 dark:text-stone-100 flex-1 truncate">{selectedTask.title}</h3>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 pb-32">
                        {/* Meta Info */}
                        <div className="flex gap-2 mb-6 overscroll-x-auto">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold bg-${BUREAUCRACY_ASSETS[selectedTask.category].color}-50 dark:bg-${BUREAUCRACY_ASSETS[selectedTask.category].color}-900/40 text-${BUREAUCRACY_ASSETS[selectedTask.category].color}-700 dark:text-${BUREAUCRACY_ASSETS[selectedTask.category].color}-300`}>
                                {BUREAUCRACY_ASSETS[selectedTask.category].label}
                            </span>
                        </div>

                        {/* Guide Content */}
                        <div className="prose prose-stone dark:prose-invert prose-sm max-w-none">
                            <div className="whitespace-pre-wrap text-stone-600 dark:text-stone-300 leading-relaxed">
                                {selectedTask.guide.split('\n').map((line, i) => {
                                    if (line.trim().startsWith('**')) {
                                        return <p key={i} className="font-bold text-stone-800 dark:text-stone-100 mt-4 mb-1">{line.replace(/\*\*/g, '')}</p>;
                                    }
                                    return <p key={i} className="mb-2">{line}</p>;
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="p-6 border-t border-stone-100 dark:border-stone-800 bg-white dark:bg-stone-900 safe-area-bottom">
                        <button
                            onClick={() => {
                                toggleTask(selectedTask.id);
                                setSelectedTask(null);
                            }}
                            className={`w-full py-4 rounded-[20px] font-bold text-lg flex items-center justify-center gap-2 transition-all ${completedTasks.includes(selectedTask.id)
                                ? 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400'
                                : 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-lg shadow-stone-200 dark:shadow-none'
                                }`}
                        >
                            {completedTasks.includes(selectedTask.id) ? (
                                <>Als "To Do" markieren</>
                            ) : (
                                <><CheckCircle size={20} /> Erledigt</>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BureaucracySoft;
