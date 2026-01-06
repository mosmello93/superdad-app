import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, ClipboardList } from 'lucide-react';
import { PRE_FLIGHT_TASKS } from '../../data/conception_content';

const PreFlightChecklist = () => {
    const [checked, setChecked] = useState({});

    // Load Checks
    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem('pre_flight_checklist') || '{}');
            setChecked(saved);
        } catch {
            setChecked({});
        }
    }, []);

    const toggle = (id) => {
        const newState = { ...checked, [id]: !checked[id] };
        setChecked(newState);
        localStorage.setItem('pre_flight_checklist', JSON.stringify(newState));
    };

    const completedCount = Object.values(checked).filter(Boolean).length;
    const progress = Math.round((completedCount / PRE_FLIGHT_TASKS.length) * 100);

    return (
        <div className="bg-white dark:bg-stone-900 rounded-[32px] p-6 shadow-sm border border-stone-100 dark:border-stone-800">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl text-indigo-500">
                        <ClipboardList size={22} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-stone-800 dark:text-stone-100">Pre-Flight Check</h3>
                        <p className="text-xs text-stone-500 font-medium">Bereit für den Start?</p>
                    </div>
                </div>
                <div className="text-xs font-bold bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-full text-stone-500">
                    {progress}%
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full mb-6 overflow-hidden">
                <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="space-y-3">
                {PRE_FLIGHT_TASKS.map(task => {
                    const isDone = checked[task.id];
                    return (
                        <div
                            key={task.id}
                            onClick={() => toggle(task.id)}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 items-start group ${isDone
                                    ? 'bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-200/50'
                                    : 'bg-stone-50 dark:bg-stone-800/50 border-transparent hover:border-indigo-200'
                                }`}
                        >
                            <div className={`mt-0.5 transition-colors ${isDone ? 'text-indigo-500' : 'text-stone-300 dark:text-stone-600 group-hover:text-indigo-300'}`}>
                                {isDone ? <CheckCircle size={20} className="fill-indigo-100 dark:fill-indigo-900/40" /> : <Circle size={20} />}
                            </div>
                            <div>
                                <h4 className={`text-sm font-bold transition-colors ${isDone ? 'text-stone-500 line-through' : 'text-stone-800 dark:text-stone-200'}`}>
                                    {task.title}
                                </h4>
                                <p className={`text-xs mt-0.5 leading-relaxed ${isDone ? 'text-stone-400' : 'text-stone-500 dark:text-stone-400'}`}>
                                    {task.desc}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PreFlightChecklist;
