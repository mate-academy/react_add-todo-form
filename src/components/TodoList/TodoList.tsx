import usersFromServer from '../../api/users';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../services/getUserId';
import { TodoInfo } from '../TodoInfo';

type Props = {
  onSubmit: (todo: Todo) => void;
  todolist: Todo[];
};

export const TodoList: React.FC<Props> = ({ onSubmit, todolist }) => {
  const [title, setTitle] = useState<string>('');
  const [titleErrorMessage, setTitleErrorMessage] = useState<string>('');

  const [userSelect, setUserSelect] = useState<number>(0);
  const [hasUserSelectError, setHasUserSelectError] = useState<string>('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleErrorMessage('');
  };

  const handleUserSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setUserSelect(+event.target.value);
    setHasUserSelectError('');
  };

  const handleReset = () => {
    setTitle('');
    setUserSelect(0);

    setTitleErrorMessage('');
    setHasUserSelectError('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleErrorMessage('Please enter a title');
    } else if (title.length < 3) {
      setTitleErrorMessage('Title should have at least 3 chars');
    }

    if (!userSelect) {
      setHasUserSelectError('Please choose a user');
    }

    if (title.length < 3 || !userSelect) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      completed: false,
      userId: userSelect,
      user: getUserById(userSelect),
    });

    handleReset();
  };

  return (
    <>
      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>

          <input
            type="text"
            id="title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {titleErrorMessage && (
            <span className="error">{titleErrorMessage}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="users">User: </label>

          <select
            id="users"
            data-cy="userSelect"
            value={userSelect}
            onChange={handleUserSelectChange}
          >
            <option value="0">Choose a user</option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserSelectError && (
            <span className="error">{hasUserSelectError}</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        {todolist.map(todo => (
          <TodoInfo todo={todo} key={todo.id} />
        ))}
      </section>
    </>
  );
};
