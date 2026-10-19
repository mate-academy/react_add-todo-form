import './App.scss';
import { useState } from 'react';

import todosFromServer from './api/todos';
import userFromServer from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './components/types-of-omponents';
import { PostForm } from './components/PostForm/PostForm';

export const App = () => {
  const preparedTodos: Todo[] = todosFromServer.map(todo => {
    return {
      ...todo,
      user: userFromServer.find(user => user.id === todo.userId) || null,
    };
  });

  const [post, setPost] = useState(preparedTodos);

  function getPostId(posts: Todo[]) {
    const maxID = Math.max(...posts.map(text => text.id));

    return maxID + 1;
  }

  const addPost = ({ id, ...data }: Todo) => {
    setPost(currentPost => {
      const newPost = {
        id: getPostId(currentPost),
        ...data,
      };

      return [...currentPost, newPost];
    });
  };

  return (
    <>
      <div className="App">
        <h1>Add todo form</h1>
        <PostForm onSubmit={addPost} />
        <TodoList todos={post} />
      </div>
    </>
  );
};
