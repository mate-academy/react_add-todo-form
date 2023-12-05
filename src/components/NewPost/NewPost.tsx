import React, { useState, useCallback, useMemo } from 'react';
import Todo from '../../types/Todo';
import usersFromServer from '../../api/users';
import getUserById from '../../utils/getUserById';

interface Props {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[],
}

export const NewPost: React.FC<Props> = ({
  setTodos,
  todos,
}) => {
  const INITIAL_USER_ID = useMemo(() => '0', []);

  const getNewId = useCallback(
    (() => Math.max(...todos.map(todo => todo.id)) + 1),
    [todos],
  );

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState(INITIAL_USER_ID);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const resetForm = () => {
    setTitle('');
    setUserId(INITIAL_USER_ID);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (userId === INITIAL_USER_ID) {
      setHasUserIdError(true);
    }

    if (!title.trim()) {
      setHasTitleError(true);
    }

    if (title.trim() && userId !== INITIAL_USER_ID) {
      setHasUserIdError(false);
      setHasTitleError(false);

      const newTodo = {
        id: getNewId(),
        title: title.trim(),
        completed: false,
        userId: +userId,
        user: getUserById(+userId),
      };

      setTodos((prevTodos: Todo[]) => [...prevTodos, newTodo]);

      resetForm();
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (!event.target.value.trim()) {
      setHasTitleError(true);
    } else {
      setHasTitleError(false);
    }
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);

    if (event.target.value === INITIAL_USER_ID) {
      setHasUserIdError(true);
    } else {
      setHasUserIdError(false);
    }
  };

  return (
    <form
      method="POST"
      onSubmit={handleFormSubmit}
    >
      <div className="field">
        <input
          name="title"
          type="text"
          placeholder="Enter a title"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
        />
        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <select
          name="userId"
          data-cy="userSelect"
          onChange={handleUserIdChange}
          value={userId}
        >
          <option value={INITIAL_USER_ID} disabled>Choose a user</option>
          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasUserIdError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
