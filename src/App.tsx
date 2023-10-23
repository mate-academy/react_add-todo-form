import './App.scss';

import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todos } from './types/todo';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todos: Todos[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getMaxId(posts: Todos[]) {
  const maxId = Math.max(
    ...posts.map(post => post.id),
  );

  return maxId + 1;
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [titleGrammaticalError, setTitleGrammaticalError] = useState('');

  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedUserError, setSelectedUserError] = useState(false);

  const [posts, setPosts] = useState(todos);

  const pattern = /^[a-zA-Zа-яА-ЯґҐєЄіІїЇ0-9\s]*$/;

  const reset = () => {
    setTitle('');
    setSelectedUser(0);

    setTitleError(false);
    setSelectedUserError(false);

    setTitleGrammaticalError('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title && !selectedUser) {
      setTitleError(true);
      setSelectedUserError(true);

      return;
    }

    if (!title) {
      setTitleError(true);

      return;
    }

    if (!pattern.test(title)) {
      setTitleGrammaticalError(
        'Please use only ua and en letters, digits, and spaces',
      );

      return;
    }

    if (!selectedUser) {
      setSelectedUserError(true);

      return;
    }

    const newPost: Todos = {
      id: getMaxId(posts),
      title,
      completed: false,
      userId: selectedUser,
      user: getUserById(selectedUser),
    };

    setPosts(currentPost => [...currentPost, newPost]);

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setTitleError(false);
              setTitleGrammaticalError('');
            }}
          />

          {titleError && (
            <span className="error">Please enter a title</span>
          )}

          {titleGrammaticalError && (
            <span className="error">
              Please use only ua and en letters, digits, and spaces
            </span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={(event) => {
              setSelectedUser(+event.target.value);
              setSelectedUserError(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {selectedUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={posts} />
    </div>
  );
};
