import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm/AddTodoForm';
import { Todo } from './types/Todo';
import { getUsersById } from './utils/getUsersById';

const initialTodos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUsersById(usersFromServer, todo.userId) || {
      id: -1,
      name: 'Unknown User',
      username: '',
      email: '',
    },
  };
});

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const onAddTodo = (newTodo: Todo): void => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddTodoForm
        users={usersFromServer}
        onAddTodo={onAddTodo}
        getUsersById={getUsersById}
        todos={todos}
      />

      <TodoList todos={todos} />
    </div>
  );
};
