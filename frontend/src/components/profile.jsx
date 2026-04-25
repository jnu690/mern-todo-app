import { useState } from 'react';
import axios from 'axios';

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

export default function Profile({ user, onBack, onUpdate }) {
  const [name, setName]               = useState(user.name);
  const [currentPassword, setCurrent] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirm] = useState('');
  const [avatar, setAvatar]           = useState(user.avatar || null);
  const [nameMsg, setNameMsg]         = useState('');
  const [passMsg, setPassMsg]         = useState('');
  const [nameError, setNameError]     = useState('');
  const [passError, setPassError]     = useState('');
  const [loading, setLoading]         = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  const handleNameUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return setNameError('Name is required');
    setNameError('');
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('/api/auth/update', { name, avatar }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const updatedUser = { ...user, name: res.data.user.name, avatar: res.data.user.avatar };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      onUpdate(updatedUser);
      setNameMsg('Profile updated successfully!');
      setTimeout(() => setNameMsg(''), 3000);
    } catch (err) {
      setNameError(err.response?.data?.message || 'Update failed');
    }
    setLoading(false);
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword)
      return setPassError('All fields are required');
    if (newPassword.length < 6)
      return setPassError('Password must be at least 6 characters');
    if (newPassword !== confirmPassword)
      return setPassError('Passwords do not match');
    setPassError('');
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put('/api/auth/password', { currentPassword, newPassword }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPassMsg('Password updated successfully!');
      setCurrent(''); setNewPassword(''); setConfirm('');
      setTimeout(() => setPassMsg(''), 3000);
    } catch (err) {
      setPassError(err.response?.data?.message || 'Update failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-purple-400 flex font-sans">
      <div className="w-52 bg-white border-r border-purple-100 flex flex-col py-6 px-4 shrink-0">
        <div className="mb-6">
          <h1 className="text-lg font-semibold text-purple-700">Todoist</h1>
          <p className="text-xs text-purple-300">My workspace</p>
        </div>
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-600 transition">
          &larr; Back to Todos
        </button>
      </div>

      <div className="flex-1 p-8  bg-purple-400 overflow-y-auto">
        <h2 className="text-2xl text-center font-semibold text-purple-900 mb-6">My Profile</h2>
        <div className="max-w-lg flex flex-col gap-6">

          <div className="bg-white rounded-2xl border border-purple-100 p-6">
            <p className="text-sm font-medium text-purple-700 mb-4">Profile Info</p>
            <div className="flex flex-col items-center mb-5">
              <div className="relative">
                {avatar ? (
                  <img src={avatar} alt="avatar" className="w-20 h-20 rounded-full object-cover border-2 border-purple-200" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-purple-500 flex items-center justify-center text-white text-2xl font-semibold">
                    {initials}
                  </div>
                )}
                <label className="absolute bottom-0 right-0 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-600 transition">
                  <svg className="w-3 h-3 text-white" viewBox="0 0 16 16" fill="none">
                    <path d="M11.5 2.5L13.5 4.5L5.5 12.5H3.5V10.5L11.5 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <input type="file" accept="image/*" onChange={handleAvatar} className="hidden" />
                </label>
              </div>
              <p className="text-xs text-purple-300 mt-2">Click the edit icon to change photo</p>
            </div>

            <form onSubmit={handleNameUpdate} className="flex flex-col gap-3">
              {nameError && <p className="text-red-400 text-xs">{nameError}</p>}
              {nameMsg   && <p className="text-green-400 text-xs">{nameMsg}</p>}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-purple-400">Full Name</label>
                <input id="fullname" name="fullname" type="text" value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm text-purple-900 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-purple-400">Email</label>
                <input type="email" value={user.email} disabled
                  className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm text-purple-300 bg-gray-50 cursor-not-allowed"
                />
                <p className="text-xs text-purple-200">Email cannot be changed</p>
              </div>
              <button type="submit" disabled={loading}
                className="bg-purple-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-purple-600 transition disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl border border-purple-100 p-6">
            <p className="text-sm font-medium text-purple-700 mb-4">Change Password</p>
            <form onSubmit={handlePasswordUpdate} className="flex flex-col gap-3">
              {passError && <p className="text-red-400 text-xs">{passError}</p>}
              {passMsg   && <p className="text-green-400 text-xs">{passMsg}</p>}

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-purple-400">Current Password</label>
                <div className="relative">
                  <input id="currentPassword" name="currentPassword"
                    type={showCurrent ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={e => setCurrent(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full border border-purple-100 rounded-xl px-4 py-2.5 pr-10 text-sm text-purple-900 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300 placeholder-purple-200"
                  />
                  <button type="button" onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-purple-500 transition"
                  >
                    <EyeIcon show={showCurrent} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-purple-400">New Password</label>
                <div className="relative">
                  <input id="newPassword" name="newPassword"
                    type={showNew ? 'text' : 'password'}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full border border-purple-100 rounded-xl px-4 py-2.5 pr-10 text-sm text-purple-900 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300 placeholder-purple-200"
                  />
                  <button type="button" onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-purple-500 transition"
                  >
                    <EyeIcon show={showNew} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-purple-400">Confirm New Password</label>
                <div className="relative">
                  <input id="confirmPassword" name="confirmPassword"
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirm(e.target.value)}
                    placeholder="Repeat new password"
                    className="w-full border border-purple-100 rounded-xl px-4 py-2.5 pr-10 text-sm text-purple-900 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300 placeholder-purple-200"
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-purple-500 transition"
                  >
                    <EyeIcon show={showConfirm} />
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="bg-purple-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-purple-600 transition disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}