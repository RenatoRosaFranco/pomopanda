'use client';

import React, { useContext } from 'react';
import { PomodoroContext } from '../contexts/PomodoroContext';
import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const formatTime = (seconds) => {
  const min = String(Math.floor(seconds / 60)).padStart(2, '0');
  const sec = String(seconds % 60).padStart(2, '0');
  return `${min}:${sec}`;
};

const PomodoroTimer = () => {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  const handleClick = () => {
    return router.push('/login');
  }

  const {
    timer,
    isRunning,
    onBreak,
    completedPomodoros,
    startTimer,
    pauseTimer,
    resetTimer
  } = useContext(PomodoroContext);

  if (!user) {
    return(
      <div className="text-center mt-5">
        <h2>Você precisa estar logado para usar o Pomodoro</h2>

        <button
          onClick={handleClick}
          className='btn btn-primary btn-lg'>
          Entrar
        </button>
      </div>
    );
  }

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
