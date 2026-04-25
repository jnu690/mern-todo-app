import { useState } from 'react';
import TodoForm from './TodoForm';

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-4">
        <TodoForm
          initial={todo}
          onSubmit={async (data) => {
            await onUpdate(todo._id, data);
            setEditing(false);
          }}
          onCancel={() => setEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-blue-100 p-4 flex items-start gap-3 transition ${todo.done ? 'opacity-50' : ''}`}>

      {/* Checkbox */}
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo._id)}
        className="mt-1 w-4 h-4 cursor-pointer accent-blue-500"
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium text-gray-700 ${todo.done ? 'line-through text-gray-300' : ''}`}>
          {todo.title}
        </p>
        {todo.description && (
          <p className={`text-xs text-gray-400 mt-1 ${todo.done ? 'line-through' : ''}`}>
            {todo.description}
          </p>
        )}
        <p className="text-xs text-blue-200 mt-2">
          {new Date(todo.createdAt).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
          })}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => setEditing(true)}
          className="text-xs text-blue-400 px-3 py-1 rounded-lg border border-blue-100 hover:bg-blue-50 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo._id)}
          className="text-xs text-red-300 px-3 py-1 rounded-lg border border-red-100 hover:bg-red-50 transition"
        >
          Delete
        </button>
      </div>

    </div>
  );
}