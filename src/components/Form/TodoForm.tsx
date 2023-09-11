import { useState } from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';
import { getMaxId, getUserById, getValidTitle } from '../../utils/utils';

type Props = {
  todos: Todo[];

  onAddTodo: (newTodo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({
  todos,
  onAddTodo,
}) => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    onAddTodo({
      id: getMaxId(todos) + 1,
      title: getValidTitle(title),
      completed: false,
      userId,
      user: getUserById(userId),
    });

    setUserId(0);
    setTitle('');
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label htmlFor="title">Title:&nbsp;</label>
        <input
          id="title"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />
        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="user-id">User:&nbsp;</label>

        <select
          id="user-id"
          data-cy="userSelect"
          required
          value={userId}
          onChange={handleUserChange}
        >
          <option value="0" disabled>Choose a user</option>

          {usersFromServer.map(user => {
            const { id, name } = user;

            return (
              <option
                value={id}
              >
                {name}
              </option>
            );
          })}
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
