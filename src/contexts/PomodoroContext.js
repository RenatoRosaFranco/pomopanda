'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const PomodoroContext = createContext();

export const PomodoroProvider = ({ children }) => {
  const [timer, setTimer] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  const [historyRefreshTrigger, setHistoryRefreshTrigger] = useState(0);

  const triggerHistoryRefresh = () => {
    setHistoryRefreshTrigger(prev => prev +1);
  }

  const { token } = useContext(AuthContext);

  useEffect(() => {
    let interval;

    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }

    if (timer === 0 && isRunning) {
      if (!onBreak) {
        setCompletedPomodoros(prev => prev + 1);
        savePomodoro(10);
        setTimer(5);
        setOnBreak(true);
      } else {
        setTimer(10);
        setOnBreak(false);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timer, onBreak]);

  const savePomodoro = async (duration) => {
    try {
      console.log(token);

      await fetch('/api/pomodoros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ duration })
      });

      triggerHistoryRefresh();
    } catch(error) {
      console.log('Erro ao salvar pomodoro:', error);
    }
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    if (!onBreak) setTimer(10);
  }

  return(
    <PomodoroContext.Provider value={{
      timer,
      isRunning,
      onBreak,
      completedPomodoros,
      startTimer,
      pauseTimer,
      resetTimer,
      historyRefreshTrigger
    }}>
      { children }
    </PomodoroContext.Provider>
  );
};
