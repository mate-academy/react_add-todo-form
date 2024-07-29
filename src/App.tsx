import { useState } from 'react';

import { User } from './types/User';
import { Todo, TodoWithUser } from './types/Todo';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { generateNextIdFor, getItemById } from './services/entitys';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const getUserById = (userId: number): User | null => {
  return getItemById(userId, usersFromServer);
};

const todosWithUsers: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(todosWithUsers);

  const handleAddTodo = (newTodo: Todo): void => {
    const newTodoWithUser: TodoWithUser = {
      ...newTodo,
      id: generateNextIdFor(todos),
      user: getUserById(newTodo.userId),
    };

    setTodos([...todos, newTodoWithUser]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm users={usersFromServer} onAdd={handleAddTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
