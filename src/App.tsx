import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { User } from './types/User';
import { getNextTodoId, initialTodos } from './utils/todos';
import usersFromServer from './api/users';

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);

  function handleAdd(title: string, user: User) {
    setTodos(currentTodos => [
      ...currentTodos,
      {
        id: getNextTodoId(currentTodos),
        title,
        completed: false,
        userId: user.id,
        user,
      },
    ]);
  }

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>
      <TodoForm onAdd={handleAdd} users={usersFromServer} />
      <TodoList todos={todos} />
    </div>
  );
};
