import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../../Types/Todo';
import { getUserById } from '../../HelpFunction/getUserById';

type Props = {
  newTodos: Todo[];
  setNewTodos: (newTodos:Todo[]) => void;
};
export const Form: React.FC<Props> = ({ newTodos, setNewTodos }) => {
  const [selectUser, setSelectUser] = useState(0);
  const [titleValue, setTitleValue] = useState('');
  const [hasErrorSelect, setHasErrorSelect] = useState(false);
  const [hasErrorTitle, setHasErrorTitle] = useState(false);
  const newTodo = {
    id: newTodos.length + 1,
    title: titleValue,
    completed: false,
    userId: selectUser,
  };
  const todoWithUser = {
    ...newTodo,
    user: getUserById(newTodo.userId),
  };
  const reset = () => {
    setHasErrorSelect(false);
    setHasErrorTitle(false);
    setTitleValue('');
    setSelectUser(0);
  };

  const handeltSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectUser === 0) {
      setHasErrorSelect(true);
    } else {
      setHasErrorSelect(false);
    }

    if (titleValue.length === 0) {
      setHasErrorTitle(true);
    } else {
      setHasErrorTitle(false);
    }

    if (titleValue.length === 0 || selectUser === 0) {
      return;
    }

    setNewTodos([...newTodos, todoWithUser]);
    reset();
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handeltSubmit}
    >
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={titleValue}
          placeholder="Enter the Title"
          onChange={event => setTitleValue(event.target.value)}
        />
        {hasErrorTitle && <span className="error">Please enter a title</span>}

      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={selectUser}
          onChange={event => setSelectUser(+event.target.value)}
        >
          <option
            key={selectUser}
            disabled={selectUser > 0}
          >
            Choose a user

          </option>
          {usersFromServer.map(user => (
            <option
              value={user.id}
              key={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
        {hasErrorSelect
          && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
