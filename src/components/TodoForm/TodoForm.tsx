import React, { useState } from 'react';
import { Todo } from '../../type/Todo';
import usersFromServer from '../../api/users';
import { getUserById } from '../../services/getUserById';

type Props = {
  todos: Todo[],
  onAdd: (newTodo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ todos, onAdd }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const textValue = event.target.value.replace(/[^a-zA-ZіІ0-9]/g, '');

    setTitle(textValue);
    setHasTitleError(false);
  };

  const [userId, setUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserError(false);
  };

  const getNewTodoId = (todoList: Todo[]) => {
    const MaxId = Math.max(...todoList.map(todo => todo.id));

    return MaxId + 1;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!userId);

    if (!title || !userId) {
      return;
    }

    onAdd({
      title: title.trim(),
      userId,
      id: getNewTodoId(todos),
      completed: false,
      user: getUserById(userId),
    });

    setTitle('');
    setUserId(0);
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label>
          {'Title: '}
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
        </label>

        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label>
          {'User: '}
          <select
            value={userId}
            data-cy="userSelect"
            onChange={handleUserChange}
            required
          >
            <option value="0">
              Choose a user
            </option>

            {usersFromServer.map((user) => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </label>

        {hasUserError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
