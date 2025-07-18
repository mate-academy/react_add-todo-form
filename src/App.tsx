import { useState } from 'react';
import './App.scss';

// import
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { UserInfo } from './components/UserInfo';
import { getUserById } from './services/user';
import { Post } from './types/types';

// constants
const initialTodos: Post[] = todosFromServer.map(todo => ({
  id: todo.id,
  title: todo.title,
  completed: todo.completed,
  userId: todo.userId,
  user: getUserById(todo.userId),
}));

// function
function getNewPostId(posts: Post[]) {
  const maxId = Math.max(...posts.map(post => post.id));

  return maxId + 1;
}

// Type
type AddPostData = {
  title: string;
  userId: number;
  completed: boolean;
};

export const App = () => {
  const [posts, setPosts] = useState<Post[]>(initialTodos);

  const addPost = (data: AddPostData) => {
    const newUser = getUserById(data.userId);
    const newPost: Post = {
      id: getNewPostId(posts),
      title: data.title,
      userId: data.userId,
      completed: data.completed,
      user: newUser,
    };

    setPosts(currentPosts => [...currentPosts, newPost]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <UserInfo onSubmit={addPost} />
      <TodoList posts={posts} />
    </div>
  );
};
