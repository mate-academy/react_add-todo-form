import './App.scss';
import React from 'react';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList';
import { EMPTY_USER } from './constants/defaultUser';

const getPreparedTodos = () => {
  return todosFromServer.map(todo => {
    const user = usersFromServer.find(todoUser => todoUser.id === todo.userId);

    return {
      ...todo,
      user: user || EMPTY_USER,
    };
  });
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState(getPreparedTodos);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm
        onSubmit={todo => setTodos(current => [...current, todo])}
        generatedId={todos.reduce((acc, todo) => Math.max(acc, todo.id), 0) + 1}
        users={usersFromServer}
      />

      <TodoList todos={todos} />
    </div>
  );
};
