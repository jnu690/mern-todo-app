import { useState, useEffect } from 'react';
import { todoService } from '../services/todoService';

export function useTodos() {
  const [todos, setTodos]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  // Load todos when app starts
  useEffect(() => {
    todoService.getAll()
      .then(setTodos)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const createTodo = async (data) => {
    const todo = await todoService.create(data);
    setTodos(prev => [todo, ...prev]);
  };

  const updateTodo = async (id, data) => {
    const updated = await todoService.update(id, data);
    setTodos(prev => prev.map(t => t._id === id ? updated : t));
  };

  const toggleDone = async (id) => {
    const updated = await todoService.toggleDone(id);
    setTodos(prev => prev.map(t => t._id === id ? updated : t));
  };

  const deleteTodo = async (id) => {
    await todoService.delete(id);
    setTodos(prev => prev.filter(t => t._id !== id));
  };

  return { todos, loading, error, createTodo, updateTodo, toggleDone, deleteTodo };
}