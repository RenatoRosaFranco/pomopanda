'use client';

import React, { createContext, useState, useEffect } from 'react';

export const PomodoroContext = createContext();

export const PomodoroProvider = ({ children }) => {
  const [timer, setTimer] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

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
        setTimer(300);
        setOnBreak(true);
      } else {
        setTimer(1500);
        setOnBreak(false);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timer, onBreak]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    if (!onBreak) setTimer(1500);
  }

  return(
    <PomodoroContext.Provider value={{
      timer,
      isRunning,
      onBreak,
      completedPomodoros,
      startTimer,
      pauseTimer,
      resetTimer
    }}>
      { children }
    </PomodoroContext.Provider>
  );
};
