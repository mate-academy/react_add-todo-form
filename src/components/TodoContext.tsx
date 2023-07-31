import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from '../types';
import { getTodos } from '../services/todo';

export const TodosContext = React.createContext([] as Todo[]);

/* eslint-disable @typescript-eslint/no-unused-vars */
export const TodoUpdateContext = React.createContext({
  addTodo: (_: Todo) => { },
  updateTodo: (_: Todo) => { },
  deleteTodo: (_: number) => { },
});
/* eslint-enable @typescript-eslint/no-unused-vars */

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

  // Methods don't use external variable so we create them once
  const value = useMemo(
    () => ({ addTodo, deleteTodo, updateTodo }),
    [],
  );

  return (
    <TodoUpdateContext.Provider value={value}>
      <TodosContext.Provider value={todos}>
        {children}
      </TodosContext.Provider>
    </TodoUpdateContext.Provider>
  );
};
