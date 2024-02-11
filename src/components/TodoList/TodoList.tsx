import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../types/Todo';
import { getUserById } from '../../services/user';
import { TodoInfo } from '../TodoInfo';

type Props = {
  onAdd: (todo: Todo) => void;
  todos: Todo[];
};

const getNewTodoId = (todos: Todo[]) => {
  const maxId = Math.max(
    ...todos.map(todo => todo.id),
  );

  return maxId + 1;
};

export const TodoList: React.FC<Props> = ({
  onAdd,
  todos,
}) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const areRequiredFieldsFilled = () => {
    return (
      title.trim() === '' || userId === 0
    );
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (areRequiredFieldsFilled()) {
      setHasTitleError(title.trim() === '');
      setHasUserIdError(userId === 0);

      return;
    }

    if (hasTitleError || hasUserIdError) {
      return;
    }

    onAdd({
      id: getNewTodoId(todos),
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    setTitle('');
    setUserId(0);
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
    setHasUserIdError(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasTitleError(false);
  };

  return (
    <div className="App">
      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleAdd}
      >
        <div className="field">
          <label htmlFor="titleInput">
            Title:&nbsp;
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={handleTitleChange}
              placeholder="Please enter a title"
            />
            {hasTitleError && (
              <span className="error">
                Please enter a title
              </span>
            )}
          </label>

        </div>
        <div className="field">
          <label htmlFor="userSelect">
            User:&nbsp;
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUserIdChange}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(currentUser => (
                <option value={currentUser.id} key={currentUser.id}>
                  {currentUser.name}
                </option>
              ))}
            </select>
          </label>

          {hasUserIdError && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <section className="TodoList">
        {todos.map(todo => (
          <TodoInfo
            key={todo.id}
            todo={todo}
          />
        ))}
      </section>
    </div>
  );
};
