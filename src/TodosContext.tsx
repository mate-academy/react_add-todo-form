/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const TodosContext = React.createContext([] as Todo[]);

export const TodoUpdateContext = React.createContext({
  addTodo: (todo: Todo) => {},
  deleteTodo: (todoId: number) => {},
  updateTodo: (todo: Todo) => {},
});

function getNextTodoId(todos: Todo[]) {
  const ids = todos.map(todo => todo.id);

  return Math.max(...ids, 0) + 1;
}

export const TodosProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  function deleteTodo(todoId: number) {
    setTodos(current => current.filter(todo => todo.id !== todoId));
  }

  function updateTodo(todoToUpdate: Todo) {
    setTodos(currentTodos => currentTodos.map(
      todo => (todo.id === todoToUpdate.id ? todoToUpdate : todo),
    ));
  }

  function addTodo(todo: Todo) {
    setTodos(prevTodos => [{
      ...todo,
      id: getNextTodoId(prevTodos),
    }, ...prevTodos]);
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
