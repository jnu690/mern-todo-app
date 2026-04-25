import { useState } from 'react';

export default function TodoForm({ onSubmit, initial = null, onCancel }) {
  const [title, setTitle]      = useState(initial?.title || '');
  const [description, setDesc] = useState(initial?.description || '');
  const [error, setError]      = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return setError('Title is required');
    setError('');
    await onSubmit({ title, description });
    if (!initial) { setTitle(''); setDesc(''); }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
      {error && <p className="text-red-400 text-xs">{error}</p>}
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm text-purple-900 bg-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 placeholder-purple-500"
      />
      <textarea
        value={description}
        onChange={e => setDesc(e.target.value)}
        placeholder="Description (optional)"
        rows={2}
        className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm text-purple-900 bg-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 placeholder-purple-500 resize-none"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-purple-500 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-purple-600 transition"
        >
          {initial ? 'Save Changes' : '+ Add Task'}
        </button>
        {onCancel && (
          <button
            type="button"
            align="center"
            onClick={onCancel}
            className="bg-purple-200 text-purple-400 px-5 py-2 rounded-xl text-sm hover:bg-purple-100 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}