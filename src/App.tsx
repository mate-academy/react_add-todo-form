import { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList/TodoList';
import { Todo, User } from './utils/types';

export const getUserById = (userId: number): User => {
  const users = usersFromServer.find(user => user.id === userId);

  if (!users) {
    throw new Error(`User with id ${userId} not found`);
  }

  return users;
};

export const initialToDos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(initialToDos);

  const addTodo = (title: string, userId: number) => {
    const newTodo = {
      id: Math.max(0, ...todos.map(td => td.id)) + 1,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodos(current => [...current, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <NewTodo onAdd={addTodo} users={usersFromServer} />
      <TodoList todos={todos} />
    </div>
  );
};
