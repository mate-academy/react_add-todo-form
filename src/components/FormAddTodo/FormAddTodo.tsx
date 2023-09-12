import { useState } from 'react';

import { TodoWithUser } from '../../types';

import { findUserById } from '../../utils/findUserById';
import { generateUniqueId } from '../../utils/generateUniqueId';

import users from '../../api/users';
import {
  INVALID_TITLE_MESSAGE,
  INVALID_USER_MESSAGE,
} from './constants';
import './FormAddTodo.scss';

interface Props {
  todos: TodoWithUser[];
  onSubmit: (todo: TodoWithUser) => void;
}

export const FormAddTodo: React.FC<Props> = ({ onSubmit, todos }) => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [isUserSelected, setIsUserSelected] = useState(true);
  const [isTitleValid, setIsTitleValid] = useState(true);

  function resetForm() {
    setSelectedUserId(0);
    setTitle('');
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsTitleValid(() => Boolean(title));
    setIsUserSelected(() => Boolean(selectedUserId));

    if (!title || !selectedUserId) {
      return;
    }

    onSubmit({
      id: generateUniqueId(todos),
      title,
      userId: selectedUserId,
      completed: false,
      user: findUserById(users, selectedUserId),
    });

    resetForm();
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsTitleValid(true);
    setTitle(event.target.value);
  }

  function handleUserSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setIsUserSelected(true);
    setSelectedUserId(+event.target.value);
  }

  return (
    <>
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        className="add_todo_form"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title_input">Title:</label>
          <input
            type="text"
            data-cy="titleInput"
            id="title_input"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter todo title"
          />
          {!isTitleValid && (
            <span className="error">{INVALID_TITLE_MESSAGE}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user_select">User:</label>
          <select
            data-cy="userSelect"
            id="user_select"
            defaultValue={0}
            value={selectedUserId}
            onChange={handleUserSelect}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map((user) => {
              const { id, name } = user;

              return (
                <option value={id} key={id}>
                  {name}
                </option>
              );
            })}
          </select>

          {!isUserSelected && (
            <span className="error">{INVALID_USER_MESSAGE}</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
    </>
  );
};
