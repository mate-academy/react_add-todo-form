import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { PostForm } from './components/PostForm';

import { Post, Todo } from './types/types';

import { generateId, getUserById } from './services/user';

const initialPosts: Todo[] = [...todosFromServer].map(todo => {
  return {
    ...todo,
    user: getUserById(todo.userId),
  };
});

export const App: React.FC = () => {
  const [posts, setPosts] = useState(initialPosts);

  const addPost = ({ title, userId }: Post) => {
    setPosts(currentPosts => {
      return [
        ...currentPosts,
        {
          id: generateId(currentPosts),
          title,
          completed: false,
          userId,
          user: getUserById(userId),
        },
      ];
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <PostForm onSubmit={addPost} />

      <TodoList todos={posts} />
    </div>
  );
};
