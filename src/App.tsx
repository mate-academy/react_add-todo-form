import './App.scss';
import { TodoList } from './components/TodoList';
import { Todos } from './types/Todos';
import { AppForm } from './components/AppForm';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { getUserById, maxId } from './services/function';

const initialTodos: Todos[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(usersFromServer, todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const addTodo = (newTodo: Omit<Todos, 'id' | 'user'>) => {
    setTodos(prewTodo => [
      ...prewTodo,
      {
        ...newTodo,
        id: maxId(prewTodo),
        user: getUserById(usersFromServer, newTodo.userId),
      },
    ]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AppForm users={usersFromServer} onAdd={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
