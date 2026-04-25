export default function History({ todos }) {
  const completed = todos
    .filter(t => t.done)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5);

  return (
    <div className="bg-purple-200 rounded-2xl border border-purple-100 p-4">
      <p className="text-sm font-medium text-purple-700 mb-3">Completed History</p>

      {completed.length === 0 && (
        <p className="text-xs text-purple-200 text-center py-4">No completed tasks yet</p>
      )}

      <div className="flex flex-col gap-2">
        {completed.map(todo => (
          <div key={todo._id} className="flex items-start gap-2">
            <div className="w-4 h-4 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-2 h-2 text-purple-500" viewBox="0 0 10 10" fill="none">
                <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-purple-400 line-through truncate">{todo.title}</p>
              <p className="text-xs text-purple-200">
                {new Date(todo.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}