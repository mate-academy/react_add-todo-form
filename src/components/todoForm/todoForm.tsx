import React, { useState } from 'react';
import { Todo } from '../../types/todo';
import users from '../../api/users';

type Props = {
  toAdd: (toAdd: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ toAdd }) => {
  const [valueTitle, setValueTitle] = useState('');
  const [valueUser, setValueUser] = useState(0);

  const [valueTitleError, setValueTitleError] = useState(false);
  const [valueUserError, setValueUserError] = useState(false);

  function getMaxID() {
    return Math.max(...users.map(user => user.id)) + 1;
  }

  function getUserById(valueselectUser: number) {
    return users.find(user => user.id === valueselectUser);
  }

  const handleValueTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setValueTitle(event.target.value);
    setValueTitleError(false);
  };

  const handleValueUserChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setValueUser(+event.target.value);
    setValueUserError(false);
  };

  const reset = () => {
    setValueTitle('');
    setValueUser(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (valueTitle.length === 0) {
      setValueTitleError(true);
    }

    if (valueUser === 0) {
      setValueUserError(true);
    }

    if (valueTitle && valueUser > 0) {
      const idForNewTodo = getMaxID();

      const authorOfPost = getUserById(valueUser);

      const newTodo = {
        id: idForNewTodo,
        title: valueTitle,
        userId: valueUser,
        completed: false,
        user: authorOfPost || null,
      };

      toAdd(newTodo);
      reset();
    }
  };

  return (
    <React.Fragment>
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="1">
            Title:
          </label>
          <input
            name="title"
            id="1"
            type="text"
            data-cy="titleInput"
            value={valueTitle}
            onChange={handleValueTitleChange}
            placeholder={'Enter a title'}
          />
          {valueTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label className="label" htmlFor={'2'}>
            User:{' '}
          </label>
          <select
            data-cy="userSelect"
            id={'2'}
            value={valueUser}
            onChange={handleValueUserChange}
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

          {valueUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
    </React.Fragment>
  );
};
