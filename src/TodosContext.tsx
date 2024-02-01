/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from './types/Todo';
import * as api from './api';

export const TodosContext = React.createContext([] as Todo[]);

export const TodoUpdateContext = React.createContext({
  addTodo: (todo: Todo) => {},
  deleteTodo: (todoId: number) => {},
  updateTodo: (todo: Todo) => {},
});

export const TodosProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  function loadTodos() {
    api.getTodos()
      .then(setTodos);
  }

  useEffect(loadTodos, []);

  function addTodo(todo: Todo) {
    return api.createTodo(todo)
      .then(loadTodos);
  }

  function deleteTodo(todoId: number) {
    return api.deleteTodo(todoId)
      .then(loadTodos);
  }

  function updateTodo(todoToUpdate: Todo) {
    return api.updateTodo(todoToUpdate)
      .then(loadTodos);
  }

  const methods = useMemo(() => ({ addTodo, updateTodo, deleteTodo }), []);

  return (
    <TodoUpdateContext.Provider value={methods}>
      <TodosContext.Provider value={todos}>
        {children}
      </TodosContext.Provider>
    </TodoUpdateContext.Provider>
  );
};
