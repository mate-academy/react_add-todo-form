import './App.scss';
import { TodoList } from './components/TodoList';
import { Todos } from './Types/Todos';
import { AppForm } from './components/AppForm';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { getUserById } from './Services/function';

const initialTodos: Todos[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(usersFromServer, todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const addTodo = (newTodo: Todos) => {
    setTodos(prewTodo => [...prewTodo, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AppForm users={usersFromServer} todos={todos} onAdd={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
