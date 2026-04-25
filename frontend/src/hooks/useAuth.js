import { useState, useEffect } from 'react';
import { authService } from '../services/authService';

export function useAuth() {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const saved = localStorage.getItem('user');
    if (token && saved) {
      setUser(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  const register = async (data) => {
    try {
      setError(null);
      const res = await authService.register(data);
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      setUser(res.user);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      return { success: false, error: message };
    }
  };

  const login = async (data) => {
    try {
      setError(null);
      const res = await authService.login(data);
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      setUser(res.user);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return { user, setUser, loading, error, register, login, logout };
}