import React from 'react';
import Timer from './components/Timer';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="min-h-screen app-bg text-white p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-6 h-[85vh] md:h-[600px]">

        {/* Main Focus Area - Timer */}
        <div className="md:col-span-7 h-full">
          <Timer />
        </div>

        {/* Sidebar - Tasks */}
        <div className="md:col-span-5 h-full">
          <TaskList />
        </div>

      </div>

      {/* Background Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse-slow" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />
    </div>
  );
}

export default App;
