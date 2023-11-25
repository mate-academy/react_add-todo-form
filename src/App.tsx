import React, { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import { Todos } from './types/TodosProps';
import { getUserById } from './services.ts/user';
import { PostForm } from './components/PostForm/postForm';
import { TodoList } from './components/TodoList';

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [post, setPost] = useState<Todos[]>(todos);

  const addPost = (newPost: Todos) => {
    setPost(currentPosts => [...currentPosts, newPost]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <PostForm onAdd={addPost} />
      <TodoList todos={post} />
    </div>
  );
};
