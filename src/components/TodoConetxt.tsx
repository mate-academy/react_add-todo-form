/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from '../types';
import { getTodos } from '../services/api';

export const TodosContext = React.createContext([] as Todo[]);

interface TodoMethods {
  addTodo: (todo: Todo) => void,
  updateTodo: (todo: Todo) => void,
  deleteTodo: (todoId: number) => void,
}

export const TodoUpdateContext = React.createContext<TodoMethods>({
  addTodo: () => { },
  updateTodo: () => { },
  deleteTodo: () => { },
});

export const TodoProvider: React.FC = ({ children }) => {
  // #region
  const [todos, setTodos] = useState<Todo[]>([]);

  const deleteTodo = (todoId: number) => {
    setTodos(currentTodos => currentTodos.filter(
      todo => todo.id !== todoId,
    ));
  };

  const addTodo = (todo: Todo) => {
    setTodos(currentTodos => [todo, ...currentTodos]);
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos(currentTodos => currentTodos.map(
      todo => (todo.id === updatedTodo.id ? updatedTodo : todo),
    ));
  };
  // #endregion

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const value = useMemo(() => ({ addTodo, deleteTodo, updateTodo }), []);

  return (
    <TodoUpdateContext.Provider value={value}>
      <TodosContext.Provider value={todos}>
        {children}
      </TodosContext.Provider>
    </TodoUpdateContext.Provider>
  );
};
