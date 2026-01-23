import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { Todo } from './types/Todo';

export const App = () => {
  const [todos] = useState<Todo[]>(todosFromServer);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoList todos={todos} users={usersFromServer} />
    </div>
  );
};
