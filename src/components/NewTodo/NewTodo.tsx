import React, { useCallback, useState } from 'react';
import { User } from '../../types/User';
import { TodoItem } from '../../types/TodoItem';

interface NewTodoProps {
  users: User[];
  onAdd: (todo: TodoItem) => void;
  titleReplaceRegex?: RegExp;
}

export const NewTodo = ({ users, onAdd, titleReplaceRegex }: NewTodoProps) => {
  const [title, setTitle] = useState('');
  const [titleErrorMessage, setTitleErrorMessage] = useState('');

  const [userId, setUserId] = useState(0);
  const [userErrorMessage, setUserErrorMessage] = useState('');

  const handleSubmit = useCallback(
    (submitEvent: React.FormEvent<HTMLFormElement>) => {
      submitEvent.preventDefault();

      let hasError = false;

      if (title.trim() === '') {
        setTitleErrorMessage('Please enter a title');
        hasError = true;
      } else {
        setTitleErrorMessage('');
      }

      if (userId === 0) {
        setUserErrorMessage('Please choose a user');
        hasError = true;
      } else {
        setUserErrorMessage('');
      }

      if (hasError) {
        return;
      }

      const newTodo: TodoItem = {
        id: 0,
        title: title.trim(),
        completed: false,
        userId,
        user: users.find(user => user.id === userId) || null,
      };

      onAdd(newTodo);

      setTitle('');
      setUserId(0);
    },
    [title, userId, users, onAdd],
  );

  const handleTitleChange = useCallback(
    (titleInputEvent: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = titleReplaceRegex
        ? titleInputEvent.target.value.replace(titleReplaceRegex, '')
        : titleInputEvent.target.value;

      setTitle(newValue);

      if (titleErrorMessage) {
        setTitleErrorMessage('');
      }
    },
    [titleReplaceRegex, titleErrorMessage],
  );

  const handleUserChange = useCallback(
    (userSelectEvent: React.ChangeEvent<HTMLSelectElement>) => {
      setUserId(+userSelectEvent.target.value);

      if (userErrorMessage) {
        setUserErrorMessage('');
      }
    },
    [userErrorMessage],
  );

  return (
    <form onSubmit={handleSubmit} className="box">
      <div className="field">
        <div className="control">
          <input
            type="text"
            data-cy="titleInput"
            className="input"
            placeholder="Todo title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        {titleErrorMessage && (
          <p className="help is-danger error">{titleErrorMessage}</p>
        )}
      </div>

      <div className="field">
        <div className="control">
          <div className="select">
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUserChange}
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
          </div>
        </div>
        {userErrorMessage && (
          <p className="help is-danger error">{userErrorMessage}</p>
        )}
      </div>

      <div className="field">
        <div className="control">
          <button
            type="submit"
            data-cy="submitButton"
            className="button is-primary"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
