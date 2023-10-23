import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { TodoForm } from './components/TodoForm.tsx/TodoForm';
import { getUserById } from './services/user';
import { getNewTodoId } from './services/todo';

export const initialTodos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
    };

    setTodos((currTodos) => [...currTodos, newTodo]);
  };

  return (
    <div className="container is-fluid">
      <h1 className="title is-3">Add todo form</h1>

      <TodoForm onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
