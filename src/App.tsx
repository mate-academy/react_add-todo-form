import './App.scss';
import { TodoList } from './components/TodoList';
import { Todos } from './Types/Todos';
import { User } from './Types/User';
import { AppForm } from './components/AppForm/AppForm';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const getUserById = (userId: number): User | null => {
  return usersFromServer.find(user => user.id === userId) || null;
};

const todos: Todos[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AppForm />
      <TodoList todos={todos} />
    </div>
  );
};
