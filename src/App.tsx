import './App.scss';
import { AddTodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

import todosFromServer from './api/todos';

import { Post } from './types/Post';
import { getUserById } from './services/user';
import { useState } from 'react';

const initialPosts: Post[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const addPost = (newPost: Post) => {
    setPosts(currentPosts => [...currentPosts, newPost]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddTodoForm onSubmit={addPost} />

      <section className="TodoList">
        <TodoList todos={posts} />
      </section>
    </div>
  );
};
