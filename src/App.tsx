import './App.scss';
import React, { useState } from 'react';
import { PostForm } from './components/PostForm/PostForm';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types';
import { getUserById } from './services/user';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodos => {
      const maxId = currentTodos.length
        ? Math.max(...currentTodos.map(todo => todo.id || 0))
        : 0;

      return [...currentTodos, { ...newTodo, id: maxId + 1 }];
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <PostForm onAdd={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
