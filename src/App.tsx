import React, { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todos } from './types/TodosProps';
import { getUserById } from './services.ts/user';
import { PostForm } from './components/PostForm/postForm';

function getNewPostId(posts: Todos[]) {
  const maxId = Math.max(...posts.map(post => post.id));

  return maxId + 1;
}

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [post, setPost] = useState<Todos[]>(todos);

  const addPost = (posts: Todos) => {
    const newPost = {
      ...posts,
      id: getNewPostId(post),
    };

    setPost(currentPost => [...currentPost, newPost]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <PostForm onSubmit={addPost} />
      <TodoList todos={post} />
    </div>
  );
};
