import React, { useState } from 'react';
import usersFromServer from '../../api/users';

interface Props {
  onAddTodo: (title: string, userId: number) => void;
}

export const TodoForm: React.FC<Props> = ({ onAddTodo }) => {
  const [selectUserId, setSelectUserId] = useState(0);
  const [todoTitle, setTodoTitle] = useState('');
  const [hasErrorSelectUserId, setHasErrorSelectUserId] = useState(false);
  const [hasErrorTodoTitle, setHasErrorTodoTitle] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectUserId === 0) {
      setHasErrorSelectUserId(true);
    }

    if (todoTitle === '') {
      setHasErrorTodoTitle(true);
    }

    if (selectUserId === 0 || todoTitle === '') {
      return;
    }

    onAddTodo(todoTitle, selectUserId);
    setSelectUserId(0);
    setTodoTitle('');
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^a-zA-Z0-9 ]/g, '');

    setTodoTitle(value);
    setHasErrorTodoTitle(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter todo title"
          value={todoTitle}
          onChange={handleTitleChange}
        />
        {hasErrorTodoTitle && (
          <span className="error">Please enter a title</span>
        )}
      </div>
      <div className="field">
        <select
          data-cy="userSelect"
          value={selectUserId}
          onChange={event => {
            setSelectUserId(Number(event.target.value));
            setHasErrorSelectUserId(false);
          }}
        >
          <option value={0} disabled>
            Choose a user
          </option>
          {usersFromServer.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {hasErrorSelectUserId && (
          <span className="error">Please choose a user</span>
        )}
      </div>
      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
