import React, { useState, useEffect, useRef } from 'react';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus' | 'break'

  const timerRef = useRef(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timerRef.current);
      setIsActive(false);
      // Simple notification sound
      const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
      audio.play().catch(e => console.log('Audio play failed', e));
      
      if (mode === 'focus') {
          setMode('break');
          setTimeLeft(5 * 60);
      } else {
          setMode('focus');
          setTimeLeft(25 * 60);
      }
    }

    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress for ring
  const totalTime = mode === 'focus' ? 25 * 60 : 5 * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="glass-panel p-8 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
          <div 
            className="h-full bg-accent transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
      </div>
      
      <h2 className="text-white/80 text-sm uppercase tracking-widest mb-4 font-medium">
        {mode === 'focus' ? 'Focus Session' : 'Short Break'}
      </h2>
      
      <div className="text-8xl font-light text-white mb-8 tracking-tighter tabular-nums text-shadow-lg">
        {formatTime(timeLeft)}
      </div>

      <div className="flex gap-4">
        <button 
          onClick={toggleTimer}
          className="btn-primary"
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button 
          onClick={resetTimer}
          className="btn-secondary"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
