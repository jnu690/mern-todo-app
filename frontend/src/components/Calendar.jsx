import { useState } from 'react';

export default function Calendar({ todos }) {
  const today = new Date();
  const [current, setCurrent] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year  = current.getFullYear();
  const month = current.getMonth();

  const firstDay   = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = current.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Get days that have todos
  const todoDays = new Set(
    todos.map(t => {
      const d = new Date(t.createdAt);
      if (d.getFullYear() === year && d.getMonth() === month) return d.getDate();
      return null;
    }).filter(Boolean)
  );

  const prevMonth = () => setCurrent(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrent(new Date(year, month + 1, 1));

  const isToday = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className="bg-white rounded-2xl border border-purple-100 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={prevMonth} className="text-purple-300 hover:text-purple-500 text-lg px-1">‹</button>
        <p className="text-sm font-medium text-purple-700">{monthName}</p>
        <button onClick={nextMonth} className="text-purple-300 hover:text-purple-500 text-lg px-1">›</button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 mb-1">
        {days.map(d => (
          <div key={d} className="text-center text-xs text-purple-400 py-1">{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-1">
        {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          return (
            <div
              key={day}
              className={`relative flex items-center justify-center text-xs py-1.5 rounded-lg font-medium transition
                ${isToday(day) ? 'bg-purple-500 text-white' : 'text-purple-700 hover:bg-purple-50'}
              `}
            >
              {day}
              {todoDays.has(day) && !isToday(day) && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}