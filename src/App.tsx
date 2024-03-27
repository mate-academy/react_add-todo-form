import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './components/UserInfo/UserInfo';
import { TodoList } from './components/TodoList';

interface TodoGeneral {
  id: number;
  title: string;
  completed: boolean;
  user?: User;
}

function getUserById(userId: number) {
  const user = usersFromServer.find(users => users.id === userId);

  return user;
}

function getNewPostId(posts: TodoGeneral[]) {
  const MaxId = Math.max(...posts.map(post => post.id));

  return MaxId + 1;
}

export const initialPosts = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [name, setName] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasNameError, setHasNameError] = useState(false);

  const [posts, setPosts] = useState<TodoGeneral[]>(initialPosts);

  const addPost = (newPostForFunction: TodoGeneral) => {
    setPosts(currentPosts => [...currentPosts, newPostForFunction]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setName(+event.target.value);
    setHasNameError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasNameError(!name);

    if (!title.trim() || !name) {
      return;
    }

    const finalUser = usersFromServer.find(user => user.id === +name);

    const newPost: TodoGeneral = {
      id: getNewPostId(posts),
      title: title,
      completed: false,
      user: finalUser,
    };

    addPost(newPost);

    setName(0);
    setTitle('');
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
          <select
            data-cy="userSelect"
            name="userId"
            value={name}
            onChange={handleNameChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasNameError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={posts} />
    </div>
  );
};
