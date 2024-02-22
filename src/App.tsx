import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { PostForm } from './components/PostForm';
import { TodoList } from './components/TodoList';
import { Todo } from './Types/Todo';
import { Post } from './Types/Post';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId)
      || null;
}

function getNewPostId(posts: Post[]) {
  const maxId = Math.max(
    ...posts.map(post => post.id),
  );

  return maxId + 1;
}

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
