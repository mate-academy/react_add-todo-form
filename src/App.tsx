import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
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
  const addTodoForm = (data: { title: string; userId: number }) => {
    const maxId = todosState.length
      ? Math.max(...todosState.map(todo => todo.id))
      : 0;

    const newTodo: Todo = {
      id: maxId + 1,
      title: data.title,
      userId: data.userId,
      completed: false,
      user: getUserById(data.userId),
    };

    setTodosState(prevTodos => [...prevTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm users={usersFromServer} onSubmit={addTodoForm} />
      <TodoList todos={todosState} />
    </div>
  );
};
