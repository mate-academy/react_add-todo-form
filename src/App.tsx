import './App.scss';
import React, { useState } from 'react';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Post } from './types/Post';
import { getUserById } from './services/userservice';
import { TodoForm } from './components/TodoForm/TodoForm';

const todos: Post[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(todos);

  const handleAddPost = (newPost: Post) => {
    setPosts(currentPosts => [...currentPosts, newPost]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onSubmit={handleAddPost} />
      <TodoList todos={posts} />
    </div>
  );
};
