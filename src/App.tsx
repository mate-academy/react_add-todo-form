import './App.scss';
import { useState } from 'react';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList';
import { ToDo } from './types/ToDo';
import { User } from './types/User';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: ToDo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [initialTodos, setInitialTodos] = useState(todos);

  const handleAddTodo = (todo: ToDo) => {
    const newTodo = { ...todo, user: getUser(todo.userId) };

    setInitialTodos([...initialTodos, newTodo]);
  };

  const newId = Math.max(...initialTodos.map((todo: ToDo) => todo.id)) + 1;

  return (
    <div className="App">
      <TodoForm
        users={usersFromServer}
        newId={newId}
        onAdd={handleAddTodo}
      />
      <TodoList todos={initialTodos} />
    </div>
  );
};
