import React from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form';

export const App = () => {
  const [todos, setTodos] = React.useState<Todo[]>(todosFromServer);
  const [users] = React.useState(usersFromServer);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <Form todos={todos} setTodos={setTodos} users={users} />

      <TodoList todos={todos} users={users} />
    </div>
  );
};
