'use client';

import React, { useContext } from 'react';
import { PomodoroContext } from '../contexts/PomodoroContext';

const formatTime = (seconds) => {
  const min = String(Math.floor(seconds / 60)).padStart(2, '0');
  const sec = String(seconds % 60).padStart(2, '0');
  return `${min}:${sec}`;
};

const PomodoroTimer = () => {
  const {
    timer,
    isRunning,
    onBreak,
    completedPomodoros,
    startTimer,
    pauseTimer,
    resetTimer
  } = useContext(PomodoroContext);

  return(
    <div className="container text-center mt-5">
      <h2>{onBreak ? 'Break Time' : 'Focus Time'}</h2>
      <h1>{formatTime(timer)}</h1>
      <p>Pomodoros concluidos: {completedPomodoros}</p>

      <div className="btn-group">
        {!isRunning ? (
          <button className='btn btn-success' onClick={startTimer}>Iniciar</button>
        ) : (
          <button className='btn btn-warning' onClick={pauseTimer}>Pausar</button>
        )}

        <button className='btn btn-danger' onClick={resetTimer} disabled={onBreak}>
          Resetar
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
