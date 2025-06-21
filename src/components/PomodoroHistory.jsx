'use client';

import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

import { PomodoroContext } from '@/contexts/PomodoroContext';

export default function PomodoroHistory() {
  const { token, user } = useContext(AuthContext);
  const [pomodoros, setPomodoros] = useState([]);

  const { historyRefreshTrigger } = useContext(PomodoroContext);

  useEffect(() => {
    if (!token) return;

    const fetchPomodoros = async () => {
      const res = await fetch('/api/pomodoros', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (res.ok) {
        setPomodoros(data.pomodoros);
      }
    };

    fetchPomodoros();
  }, [token, historyRefreshTrigger]);

  if (!user) {
    return(
      <p>Faça login para ver seu histórico.</p>
    );
  }

  return(
    <div>
      <h4>Seus Pomodoros</h4>
      <p>Total: { pomodoros.length }</p>
      <ul className="list-group">
        {pomodoros.map((pomo) => (
          <li key={pomo.id} className='list-group-item'>
            ✅ {Math.floor(pomo.duration / 60)} min - { new Date(pomo.createdAt).toLocaleDateString() }
          </li>
        ))}
      </ul>
    </div>
  );
}
