'use client';

import PomodoroTimer from "@/components/PomodoroTimer";
import PomodoroHistory from '@/components/PomodoroHistory';

export default function Home() {
  return (
    <main className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <PomodoroTimer />
        </div>
        <div className="col-md-4">
          <PomodoroHistory />
        </div>
      </div>
    </main>
  );
}
