import './App.scss';
import React, { useState } from 'react';
import { PostForm } from './components/PostForm/PostForm';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { Todo } from './types';
import { getUserById } from './services/user';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (title: string, userId: number) => {
  const newTodo: Todo = {
    id: todos.length ? Math.max(...todos.map(t => t.id || 0)) + 1 : 1,
    title,
    userId,
    completed: false,
    user: getUserById(userId),
  };

  setTodos([...todos, newTodo]);
};

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <PostForm onAdd={addTodo} users={usersFromServer} />


      <TodoList todos={todos} />
    </div>
  );
};
