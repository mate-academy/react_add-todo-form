import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import UserInfo from './components/UserInfo/UserInfo';
import { TodoList } from './components/TodoList';
interface TodoGeneral {
  id: number;
  title: string;
  completed: boolean;
  name?: string;
  email?: string;
}

function getUserById(userId: number) {
  const user = usersFromServer.find(users => users.id === userId);

  return user?.name;
}

function getEmailById(userId: number) {
  const user = usersFromServer.find(users => users.id === userId);

  return user?.email;
}

function getNewPostId(posts: TodoGeneral[]) {
  const MaxId = Math.max(...posts.map(post => post.id));

  return MaxId + 1;
}

export const initialPosts = todosFromServer.map(todo => ({
  ...todo,
  name: getUserById(todo.userId),
  email: getEmailById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasNameError, setHasNameError] = useState(false);

  const [posts, setPosts] = useState<TodoGeneral[]>(initialPosts);

  const newPost: TodoGeneral = {
    id: getNewPostId(posts),
    title: title,
    completed: false,
    name: name,
    email: name,
  };

  const addPost = (newPostForFunction: TodoGeneral) => {
    setPosts(currentPosts => [...currentPosts, newPostForFunction]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setName(event.target.value);
    setHasNameError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasNameError(!name);

    if (name && title) {
      addPost(newPost);

      setName('0');
      setTitle('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <UserInfo users={usersFromServer} func={handleNameChange} />

          {hasNameError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todosFromServer={posts} />
    </div>
  );
};
