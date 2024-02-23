import './App.scss';

import { useState } from 'react';
import todosFromServer from './api/todos';
import { PostForm } from './components/PostForm';
import { TodoList } from './components/TodoList';
import { Todo } from './Types/Todo';
import { Post } from './Types/Post';
import { getUserById } from './servises/getUserById';
import { getNewPostId } from './servises/getNewPostId';

const initialposts = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [posts, setPosts] = useState<Post[]>(initialposts);

  const onAdd = (post: Todo): void => {
    const newPost = {
      ...post,
      user: getUserById(post.userId),
      id: getNewPostId(posts),
    };

    setPosts(prevPosts => [...prevPosts, newPost]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <PostForm onAdd={onAdd} />

      <TodoList posts={posts} />

    </div>
  );
};
