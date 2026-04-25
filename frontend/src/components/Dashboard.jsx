export default function Dashboard({ user, onEnter }) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good Morning' :
    hour < 18 ? 'Good Afternoon' : 'Good Evening';

  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="min-h-screen bg-purple-300 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg">

        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-purple-500 flex items-center justify-center text-white text-2xl font-semibold mb-4">
            {initials}
          </div>
          <h1 className="text-2xl font-semibold text-purple-900">
            {greeting}, {user.name}! 👋
          </h1>
          <p className="text-purple-300 text-sm mt-1">{user.email}</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-purple-100 p-5">
            <p className="text-xl align-center text-purple-300 font-medium text-center">Today</p>
            <p className="text-sm font-medium text-purple-700 text-center">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-purple-100 p-5">
            <p className="text-xl text-purple-300 font-medium text-center">Workspace</p>
            <p className="text-sm font-medium text-purple-700 text-center">My Tasks</p>
          </div>
        </div>

        {/* Enter button */}
        <button
          onClick={onEnter}
          className="w-full bg-purple-500 text-white py-3 rounded-2xl text-sm font-medium hover:bg-purple-600 transition"
        >
          Go to My Todos →
        </button>

      </div>
    </div>
  );
}