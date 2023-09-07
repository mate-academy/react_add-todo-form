import React, { useState } from 'react';
import './App.scss';
// import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { Form } from './components/Form/Form';
import { getUserById } from './services/user';

const initialTodos: Todo[] = todosFromServer.map((todo) => {
  const user = getUserById(todo.userId);

  return {
    ...todo,
    user,
  };
});

export const App: React.FC = () => {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <Form initialTodos={todos} setTodos={setTodos} />

      <TodoList todos={todos} />
    </div>
  );
};
