import React, { useState } from 'react';
import { Todo } from '../../types/todo';
import users from '../../api/users';

type Props = {
  toAdd: (toAdd: Todo) => void;
  todos: Todo[];
};

export const TodoForm: React.FC<Props> = ({ toAdd, todos }) => {
  const [title, setTitle] = useState('');
  const [optionUser, setOptionUser] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  function getMaxID() {
    const maxId = Math.max(...todos.map(user => user.id)) + 1;

    return maxId;
  }

  function getUserById(selectedUser: number) {
    return users.find(user => user.id === selectedUser);
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleOptionUserChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setOptionUser(+event.target.value);
    setUserError(false);
  };

  const formReset = () => {
    setTitle('');
    setOptionUser(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.length === 0) {
      setTitleError(true);
    }

    if (optionUser === 0) {
      setUserError(true);
    }

    if (title.trim() && optionUser > 0) {
      const idForNewTodo = getMaxID();

      const newUser = getUserById(optionUser);

      const newTodo = {
        id: idForNewTodo,
        title: title,
        userId: optionUser,
        completed: false,
        user: newUser || null,
      };

      toAdd(newTodo);
      formReset();
    }
  };

  return (
    <React.Fragment>
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="inputTitle">
            Title:{' '}
          </label>
          <input
            name="title"
            id="inputTitle"
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder={'Enter a title'}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="label" htmlFor={'user'}>
            User:{' '}
          </label>
          <select
            data-cy="userSelect"
            id={'user'}
            value={optionUser}
            onChange={handleOptionUserChange}
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

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
    </React.Fragment>
  );
};
