import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [users] = useState(usersFromServer);
  const [todos] = useState(todosFromServer);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoList users={users} todos={todos} />
    </div>
  );
};
