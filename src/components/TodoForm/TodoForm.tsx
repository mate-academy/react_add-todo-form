import React, { useState } from 'react';

import usersFromServer from '../../api/users';
import todosFromServer from '../../api/todos';
import { getUser } from '../../utils';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

interface Props {
  addTodo: (todo: Todo) => void;
}

const users: User[] = usersFromServer;

const newId = () => {
  const maxId: number = Math.max(...todosFromServer.map((todo) => todo.id));

  return maxId + 1;
};

export const TodoForm: React.FC<Props> = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const changeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserError(false);
  };

  const restart = () => {
    setTitle('');
    setUserId(0);
    setHasUserError(false);
    setHasTitleError(false);
  };

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (userId === 0) {
      setHasUserError(true);
    }

    if (!title) {
      setHasTitleError(true);
    }

    if (title && userId) {
      addTodo({
        id: newId(),
        title: title.trim(),
        completed: false,
        userId,
        user: getUser(userId),
      });

      restart();
    }
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={onSubmitHandler}>
      <div className="field">
        <label className="label" htmlFor="titleInput">
          Title:
        </label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={changeTitle}
          />
        </div>
        {hasTitleError && (
          <p className="help is-danger">Please enter a title</p>
        )}
      </div>
      <div className="field">
        <label className="label" htmlFor="selectUser">
          User:
        </label>
        <div className="control">
          <div className="select" id="selectUser">
            <select data-cy="userSelect" value={userId} onChange={changeUser}>
              <option value="0" disabled>
                Choose a user
              </option>
              {users.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          {hasUserError && (
            <p className="help is-danger">Please choose a user</p>
          )}
        </div>
      </div>

      <div className="buttons">
        <button className="button is-link" type="submit" data-cy="submitButton">
          Add
        </button>
      </div>
    </form>
  );
};
