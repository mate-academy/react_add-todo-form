import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { PostForm } from './components/PostForm';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const getUserById = (userId: number) =>
  usersFromServer.find(user => user.id === userId) || null;

const todosWithUsers = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todosWithUsers);

  const addTodo = (title: string, userId: number) => {
    const newTodo = {
      id: Math.max(...todos.map(t => t.id)) + 1,
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    };

    setTodos(prev => [...prev, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <PostForm onAdd={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
