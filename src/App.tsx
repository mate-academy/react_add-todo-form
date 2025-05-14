import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';

// Types
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User;
}

type TodoFromServer = Omit<Todo, 'user'>;

const preparedTodos: Todo[] = (todosFromServer as TodoFromServer[]).map(
  todo => ({
    ...todo,
    user: (usersFromServer as User[]).find(user => user.id === todo.userId)!,
  }),
);

export const App = () => {
  const [todos] = useState<Todo[]>(preparedTodos);

  return (
    <div className="App">
      <h1>Todos</h1>
      <TodoList todos={todos} />
    </div>
  );
};
