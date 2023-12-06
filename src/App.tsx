import { useState } from 'react';
import './App.scss';
import { Form } from './components/Form';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const todosUsers = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

export const App = () => {
  const [todos, setTodos] = useState(todosUsers);

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
        // users={usersFromServer}
      />
    </div>
  );
};
