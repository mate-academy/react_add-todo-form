/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from '../types';
import { createTodo, getTodos } from '../services/api';

interface TodoMethods {
  addTodo: (todo: Todo) => void,
  updateTodo: (todo: Todo) => void,
  deleteTodo: (todoId: number) => void,
}

export const TodoMethodsContext = React.createContext<TodoMethods>({
  addTodo: () => { },
  updateTodo: () => { },
  deleteTodo: () => { },
});

export const TodosContext = React.createContext({
  todos: [] as Todo[],
  loading: false,
});

export const TodoProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  // #region methods
  const addTodo = (todo: Todo) => {
    setLoading(true);

    return createTodo(todo)
      .then(newTodo => {
        setTodos(currentTodos => [...currentTodos, newTodo]);
      })
      .finally(() => setLoading(false));
  };

  const deleteTodo = (todoId: number) => {
    setTodos(currentTodos => currentTodos.filter(
      todo => todo.id !== todoId,
    ));
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos(currentTodos => currentTodos.map(
      todo => (todo.id === updatedTodo.id ? updatedTodo : todo),
    ));
  };
  // #endregion

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(() => ({ addTodo, deleteTodo, updateTodo }), []);

  return (
    <TodoMethodsContext.Provider value={value}>
      <TodosContext.Provider value={{ todos, loading }}>
        {children}
      </TodosContext.Provider>
    </TodoMethodsContext.Provider>
  );
};
