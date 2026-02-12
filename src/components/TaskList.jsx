import React, { useState, useEffect } from 'react';

const TaskList = () => {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('focus-flow-tasks');
        return saved ? JSON.parse(saved) : [];
    });
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        localStorage.setItem('focus-flow-tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        setTasks([...tasks, {
            id: Date.now(),
            text: inputValue.trim(),
            completed: false
        }]);
        setInputValue('');
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    return (
        <div className="glass-panel p-6 h-full flex flex-col">
            <h2 className="text-xl text-white font-medium mb-6">Tasks</h2>

            <form onSubmit={addTask} className="mb-6 relative">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="What needs to be done?"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:bg-white/10 focus:border-accent/50 transition-all"
                />
            </form>

            <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                {tasks.length === 0 && (
                    <p className="text-white/30 text-center mt-8 text-sm">No tasks yet. Stay focused!</p>
                )}

                {tasks.map(task => (
                    <div
                        key={task.id}
                        className={`group flex items-center gap-3 p-3 rounded-xl transition-all ${task.completed ? 'bg-white/5' : 'bg-white/10 hover:bg-white/15'
                            }`}
                    >
                        <button
                            onClick={() => toggleTask(task.id)}
                            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${task.completed
                                    ? 'bg-accent border-accent text-white'
                                    : 'border-white/30 hover:border-accent'
                                }`}
                        >
                            {task.completed && (
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>

                        <span className={`flex-1 text-sm transition-all ${task.completed ? 'text-white/30 line-through' : 'text-white/90'
                            }`}>
                            {task.text}
                        </span>

                        <button
                            onClick={() => deleteTask(task.id)}
                            className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-red-400 transition-all px-2"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;
