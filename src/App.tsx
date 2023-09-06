import './App.scss';
import { useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { PreparedTodo } from './types/PreparedTodo';

const preparedTodos: PreparedTodo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(({ id }) => todo.userId === id),
}));

export const App: React.FC = () => {
  const [todos] = useState(preparedTodos);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm />
      <TodoList todos={todos} />

    </div>
  );
};
