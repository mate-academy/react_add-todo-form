import './App.scss';
import { TodoList } from './components/TodoList';

import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { Todo } from './types/Todo';
import { TodoForm } from './components/TodoForm/TodoForm';
import { getUserById } from './services/userServices';

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todosState, setTodosState] = useState<Todo[]>(todos);
  const addTodoForm = ({
    title,
    userId,
  }: {
    title: string;
    userId: number;
  }) => {
    const maxId = Math.max(...todos.map(t => t.id));

    const newTodo: Todo = {
      id: maxId + 1,
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    };

    setTodosState(prev => [...prev, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onSubmit={addTodoForm} />
      <TodoList todos={todosState} />
    </div>
  );
};
