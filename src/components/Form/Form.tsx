import React, { Dispatch, SetStateAction, useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  users: User[];
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
};

export const Form: React.FC<Props> = ({
  users,
  todos,
  setTodos,
}) => {
  const reg = /^[a-zа-яіїґє'0-9,.\s]+$/i;
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const todoId = [...todos].sort((a, b) => b.id - a.id)[0].id + 1;
  const newTodo = {
    id: todoId,
    title: title.trim(),
    completed: false,
    userId,
    user: users.find(user => user.id === userId) || null,
  };

  const hendleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (reg.test(e.target.value) || !e.target.value) {
      reg.lastIndex = 0;
      setTitle(e.target.value);
    }

    setTitleError(false);
  };

  const hendleUserIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
    setUserError(false);
  };

  const hendleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      setTitleError(true);
    }

    if (!userId) {
      setUserError(true);
    }

    if (title.trim() && userId) {
      setTodos(currentTodos => ([
        ...currentTodos,
        newTodo,
      ]));

      setTitle('');
      setUserId(0);
    }
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={hendleSubmit}
    >
      <div className="field">
        <label>
          Title:
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={hendleTitleChange}
          />
        </label>

        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label>
          User:
          <select
            data-cy="userSelect"
            value={userId}
            onChange={hendleUserIdChange}

          >
            <option value="0" disabled>Choose a user</option>
            {users.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </label>

        {userError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
