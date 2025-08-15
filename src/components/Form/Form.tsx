import { useState } from 'react';

import './Form.scss';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../services/getUserById';
import { User } from '../../types/User';

type Props = {
  addTodo: (todo: Todo) => void;
  todos: Todo[];
  users: User[];
};

function getTheLargestId(todos: Todo[]) {
  if (todos.length === 0) {
    return;
  }

  return Math.max(...todos.map(todo => todo.id)) + 1;
}

export const Form: React.FC<Props> = ({ addTodo, todos, users }) => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSecectedUser] = useState('0');
  const [titleError, setTitleError] = useState(false);
  const [selectedUserError, setSelectedUserError] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanedTitle = title
      .replace(/[^a-zA-Zа-яА-ЯёЁіїІЇєЄґҐ0-9 ]/g, '')
      .trim();

    if (!cleanedTitle) {
      setTitleError(true);
    }

    if (selectedUser === '0') {
      setSelectedUserError(true);
    }

    if (!cleanedTitle || selectedUser === '0') {
      return;
    }

    const user = getUserById(+selectedUser);

    if (!user) {
      return;
    }

    const userId = user.id;
    const completed = false;
    const id = getTheLargestId(todos);

    if (!id) {
      return;
    }

    addTodo({
      id,
      title: cleanedTitle,
      completed,
      userId,
      user,
    });

    setTitle('');
    setSecectedUser('0');
    setTitleError(false);
    setSelectedUserError(false);
  }

  function changeSelectedUser(event: React.ChangeEvent<HTMLSelectElement>) {
    setSecectedUser(event.target.value);
    setSelectedUserError(false);
  }

  function changeTitle(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    setTitleError(false);
  }

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Title:</label>

        <input
          id="title"
          value={title}
          type="text"
          data-cy="titleInput"
          onChange={changeTitle}
          placeholder="Enter a title"
        />

        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="users">Users:</label>

        <select
          id="users"
          value={selectedUser}
          data-cy="userSelect"
          onChange={changeSelectedUser}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {selectedUserError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
