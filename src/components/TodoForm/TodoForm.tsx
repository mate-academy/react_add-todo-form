import { useState } from 'react';
import { ToDo } from '../../type/ToDo';
import { findUserID } from '../../services/findUserID';
import { getNewIdToDo } from '../../services/getNewIdToDo';

import usersFromServer from '../../api/users';

type Props = {
  onSubmit: (todos: ToDo) => void;
  todos: ToDo[];
};

export const TodoForm: React.FC<Props> = ({ onSubmit, todos }) => {
  const [title, setTitle] = useState('');
  const [hasErrorTitle, setHasErrorTitle] = useState(false);

  const [userSelected, setUserSelected] = useState(0);
  const [hasErrorSelected, setHasErrorSelected] = useState(false);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasErrorTitle(false);
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserSelected(+event.target.value);
    setHasErrorSelected(false);
  };

  const reset = () => {
    setTitle('');
    setUserSelected(0);

    setHasErrorTitle(false);
    setHasErrorSelected(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTitle = title.trim();

    setHasErrorTitle(!newTitle);
    setHasErrorSelected(!userSelected);

    if (!newTitle || !userSelected) {
      return;
    }

    onSubmit({
      id: getNewIdToDo(todos),
      title: newTitle,
      completed: false,
      userId: userSelected,
      user: findUserID(userSelected),
    });

    reset();
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onReset={reset}
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label htmlFor="user-title">Title:&nbsp;</label>
        <input
          id="user-title"
          type="text"
          placeholder="Enter a title"
          data-cy="titleInput"
          value={title}
          onChange={handleChangeTitle}
        />
        {hasErrorTitle && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="user-select">User:&nbsp;</label>
        <select
          id="user-select"
          data-cy="userSelect"
          value={userSelected}
          onChange={handleChangeSelect}
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasErrorSelected && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
