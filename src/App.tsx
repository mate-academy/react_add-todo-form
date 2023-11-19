import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { Todo } from './types/TodosProps';
import { PostForm } from './components/PostForm/PostForm';
import { getUserById } from './services/getUserById';
import todosFromServer from './api/todos';

function getNewPostId(posts: Todo[]) {
  const maxId = Math.max(...posts.map(post => post.id));

  return maxId + 1;
}

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [post, setPost] = useState<Todo[]>(todos);

  const addPost = (posts: Todo) => {
    const newPost = {
      ...posts,
      id: getNewPostId(post),
    };

    setPost(currentPost => [...currentPost, newPost]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <PostForm
        onSubmit={addPost}
      />

      <TodoList
        todos={post}
      />
    </div>
  );
};
