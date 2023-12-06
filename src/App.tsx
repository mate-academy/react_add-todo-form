import { useState } from 'react';
import './App.scss';
import { Form } from './components/Form';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <Form
        users={usersFromServer}
        setTodos={setTodos}
        todos={todos}
      />

      <TodoList
        todos={todos}
        users={usersFromServer}
      />
    </div>
  );
};
