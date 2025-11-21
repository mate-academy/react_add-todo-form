import './App.scss';
import TodoForm from './components/AddTodoForm/AddTodoForm';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { NewTodoType, Todo } from './api/types';
import { getUsersById } from './servers/user';
import { useState } from 'react';

const initialPost: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUsersById(todo.userId),
}));

const maxPostId = (posts: Todo[]) => {
  const maxId = Math.max(...posts.map(post => post.id));

  return maxId + 1;
};

export const App = () => {
  const [posts, setPosts] = useState<Todo[]>(initialPost);

  const addPosts = ({ title, userId }: NewTodoType) => {
    const newPosts = {
      id: maxPostId(posts),
      title,
      completed: false,
      userId,
      user: getUsersById(userId),
    };

    setPosts(currentPosts => [...currentPosts, newPosts]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onSubmit={addPosts} users={usersFromServer} />

      <section className="TodoList">
        <TodoList todos={posts} />
      </section>
    </div>
  );
};
