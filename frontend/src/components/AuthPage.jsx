import { useState } from 'react';

function EyeIcon({ show }) {
  return show ? (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
      <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ) : (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
      <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 2l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export default function AuthPage({ onLogin, onRegister, error }) {
  const [isLogin, setIsLogin]         = useState(true);
  const [name, setName]               = useState('');
  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [showPassword, setShowPass]   = useState(false);
  const [formError, setFormError]     = useState('');
  const [loading, setLoading]         = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!email || !password) return setFormError('All fields are required');
    if (!isLogin && !name)   return setFormError('Name is required');
    if (password.length < 6) return setFormError('Password must be at least 6 characters');
    setLoading(true);
    const result = isLogin
      ? await onLogin({ email, password })
      : await onRegister({ name, email, password });
    setLoading(false);
    if (!result.success) setFormError(result.error);
  };

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-purple-700">Todoist</h1>
          <p className="text-purple-300 text-sm mt-1">Your personal task manager</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-purple-100 p-8">

          {/* Tabs */}
          <div className="flex mb-6 bg-purple-50 rounded-xl p-1">
            <button
              onClick={() => { setIsLogin(true); setFormError(''); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                isLogin ? 'bg-white text-purple-700 shadow-sm' : 'text-purple-300'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setFormError(''); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                !isLogin ? 'bg-white text-purple-700 shadow-sm' : 'text-purple-300'
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Error */}
            {(formError || error) && (
              <div className="bg-red-50 text-red-400 text-sm px-4 py-3 rounded-xl border border-red-100">
                ⚠️ {formError || error}
              </div>
            )}

            {/* Name */}
            {!isLogin && (
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-purple-400">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full border border-purple-100 rounded-xl px-4 py-3 text-sm text-purple-900 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300 placeholder-purple-200"
                />
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-purple-400">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-purple-100 rounded-xl px-4 py-3 text-sm text-purple-900 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300 placeholder-purple-200"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-purple-400">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full border border-purple-100 rounded-xl px-4 py-3 pr-10 text-sm text-purple-900 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300 placeholder-purple-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-purple-500 transition"
                >
                  <EyeIcon show={showPassword} />
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-500 text-white py-3 rounded-xl text-sm font-medium hover:bg-purple-600 transition mt-2 disabled:opacity-50"
            >
              {loading ? 'Please wait...' : isLogin ? 'Login' : 'Create Account'}
            </button>

          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-purple-300 mt-6">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => { setIsLogin(!isLogin); setFormError(''); }}
            className="text-purple-500 font-medium hover:underline"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>

      </div>
    </div>
  );
}