import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import Todo from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';

const findUserById = (userId: number) => usersFromServer.find(
  ({ id }) => id === userId,
) || null;

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const nextTodoId = todos.reduce((max, todo) => {
    return todo.id > max ? todo.id : max;
  }, 0) + 1;

  const addTodo = (todo: Todo) => {
    const newTodo: Todo = {
      ...todo,
      user: findUserById(todo.userId),
    };

    setTodos(prev => [...prev, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm
        id={nextTodoId}
        users={usersFromServer}
        onSubmit={addTodo}
      />

      <TodoList todos={todos} />
    </div>
  );
};
