import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useTodos } from './hooks/useTodos';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import Calendar from './components/Calendar';
import History from './components/History';
import Profile from './components/Profile';

function TodoApp({ user, onLogout, onUpdateUser }) {
  const { todos, loading, error, createTodo, updateTodo, toggleDone, deleteTodo } = useTodos();
  const [activeTab, setActiveTab]     = useState('all');
  const [search, setSearch]           = useState('');
  const [showProfile, setShowProfile] = useState(false);

  const active    = todos.filter(t => !t.done);
  const completed = todos.filter(t => t.done);

  const tabFiltered =
    activeTab === 'all'       ? todos :
    activeTab === 'active'    ? active :
    activeTab === 'completed' ? completed : todos;

  const filtered = tabFiltered.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  if (showProfile) {
    return (
      <Profile
        user={user}
        onBack={() => setShowProfile(false)}
        onUpdate={(updatedUser) => {
          onUpdateUser(updatedUser);
          setShowProfile(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-purple-300 flex font-sans">

      {/* Sidebar */}
      <div className="w-52 bg-white border-r border-purple-100 flex flex-col py-6 px-4 gap-2 shrink-0">
        <div className="mb-4">
          <h1 className="text-lg font-semibold text-purple-700">TodoList</h1>
          <p className="text-md text-purple-300">My workspace</p>
        </div>

        {/* Nav Tabs */}
        {[
          { key: 'all',       label: 'All Tasks',  count: todos.length },
          { key: 'active',    label: 'Active',     count: active.length },
          { key: 'completed', label: 'Completed',  count: completed.length },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm transition ${
              activeTab === tab.key
                ? 'bg-purple-100 text-purple-700 font-medium'
                : 'text-purple-300 hover:bg-purple-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${activeTab === tab.key ? 'bg-purple-500' : 'bg-purple-200'}`} />
              {tab.label}
            </div>
            <span className="text-xs bg-purple-100 text-purple-400 px-2 py-0.5 rounded-full">
              {tab.count}
            </span>
          </button>
        ))}

        {/* User + Logout */}
        <div className="mt-auto pt-4 border-t border-purple-100">
          <button
            onClick={() => setShowProfile(true)}
            className="flex items-center gap-2 mb-3 w-full hover:bg-purple-50 rounded-xl p-1 transition"
          >
            {user.avatar ? (
              <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-medium">
                {initials}
              </div>
            )}
            <div className="flex-1 min-w-0 text-left">
              <p className="text-md font-medium text-purple-700 truncate">{user.name}</p>
              <p className="text-md text-purple-300 truncate">{user.email}</p>
            </div>
          </button>
          <button
            onClick={onLogout}
            className="w-full text-md text-red-400 bg-red-50 hover:bg-red-100 py-2 rounded-xl transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-5 p-8 overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-4xl font-semibold text-purple-900">My Todos</h2>
            <p className="text-sm text-purple-300 mt-1">
              {active.length} task{active.length !== 1 ? 's' : ''} remaining
            </p>
          </div>

          {/* Search */}
          <div className="relative w-72">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-300"
              viewBox="0 0 16 16" fill="none"
            >
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="w-full pl-9 pr-4 py-2.5 border border-purple-100 rounded-xl text-sm text-purple-900 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 placeholder-purple-200"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-purple-500"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total',     value: todos.length },
            { label: 'Active',    value: active.length },
            { label: 'Completed', value: completed.length },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-purple-100 p-4">
              <p className="text-xs text-purple-300 mb-1">{s.label}</p>
              <p className="text-2xl font-semibold text-purple-700">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Two column layout */}
        <div className="flex gap-5">

          {/* Left — Form + List */}
          <div className="flex-1 flex flex-col gap-4">

            {/* Add form */}
            <div className="bg-white rounded-2xl border border-purple-100 p-5">
              <p className="text-sm font-medium text-purple-700 mb-3">Add New Task</p>
              <TodoForm onSubmit={createTodo} />
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 text-red-400 text-sm px-4 py-3 rounded-xl border border-red-100">
                ⚠️ {error}
              </div>
            )}

            {/* Loading */}
            {loading && (
              <p className="text-center text-purple-500 text-sm">Loading...</p>
            )}

            {/* Empty */}
            {!loading && filtered.length === 0 && (
              <div className="text-center text-purple-400 py-12">
                <p className="text-4xl mb-3">✓</p>
                <p className="text-sm">
                  {search ? `No tasks found for "${search}"` : 'Nothing here — add a task!'}
                </p>
              </div>
            )}

            {/* Todo List */}
            <div className="flex flex-col gap-3">
              {filtered.map(todo => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onToggle={toggleDone}
                  onUpdate={updateTodo}
                  onDelete={deleteTodo}
                />
              ))}
            </div>
          </div>

          {/* Right — Calendar + History */}
          <div className="w-72 flex flex-col gap-4 shrink-0">
            <Calendar todos={todos} />
            <History todos={todos} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default function App() {
  const { user, setUser, loading, error, register, login, logout } = useAuth();
  const [showDashboard, setShowDashboard] = useState(false);
  const [prevUser, setPrevUser]           = useState(null);

  if (user && !prevUser) {
    setPrevUser(user);
    setShowDashboard(true);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-purple-400 flex items-center justify-center">
        <p className="text-purple-300 text-sm">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <AuthPage
        onLogin={login}
        onRegister={register}
        error={error}
      />
    );
  }

  if (showDashboard) {
    return (
      <Dashboard
        user={user}
        onEnter={() => setShowDashboard(false)}
      />
    );
  }

  return (
    <TodoApp
      user={user}
      onLogout={logout}
      onUpdateUser={(updatedUser) => setUser(updatedUser)}
    />
  );
}