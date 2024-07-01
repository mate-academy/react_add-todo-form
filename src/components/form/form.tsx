import React, { useState } from 'react';
import { Todo } from '../types/Todos';
import usersFromServer from '../../api/users';
import { getUserById } from '../function/function';

interface Props {
  todos: Todo[];
  addNewTodo: (newTodo: Todo) => void;
}

export const Forma: React.FC<Props> = ({ todos, addNewTodo }) => {
  const DEFAULT_USER_ID = 0;
  const EMPTY_TITLE_ERROR = 'Please enter a title';
  const EMPTY_USER_ERROR = 'Please choose a user';
  const [title, setTitle] = useState('');
  const [selectUser, setSelectUser] = useState(DEFAULT_USER_ID);
  const [selectUserError, setSelectUserError] = useState('');
  const [titleError, setTitleError] = useState('');

  const reset = () => {
    setTitle('');
    setSelectUser(DEFAULT_USER_ID);
    setSelectUserError('');
    setTitleError('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleError('title');
    }

    if (!selectUser) {
      setSelectUserError('user');
    }

    if (title && selectUser) {
      const newTodo: Todo = {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title,
        completed: false,
        userId: +selectUser,
        user: getUserById(+selectUser),
      };

      addNewTodo(newTodo);
      reset();
    }
  };

  return ( 
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        Title:{' '}
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          placeholder="Enter a title"
          onChange={event => setTitle(event.target.value)}
        />
        {titleError && !title && (
          <span className="error">{EMPTY_TITLE_ERROR}</span>
        )}
      </div>

      <div className="field">
        User:{' '}
        <select
          data-cy="userSelect"
          value={selectUser}
          onChange={event => setSelectUser(+event.target.value)}
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
        {!selectUser && selectUserError && (
          <span className="error">{EMPTY_USER_ERROR}</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
