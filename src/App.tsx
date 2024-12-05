import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Users } from './types/Users';
import { TodoList } from './components/TodoList';
import { AddForm } from './components/AddForm/AddForm';

const users: Users[] = usersFromServer.map(user => {
  const todos = todosFromServer.find(todo => todo.userId === user.id);

  return { ...user, todos };
});

export const App = () => {
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddForm users={users} />

      <TodoList users={users} />
    </div>
  );
};
