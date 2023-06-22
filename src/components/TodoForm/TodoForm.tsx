import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import usersFromServer from '../../api/users';
import { getUserById, getNewId } from '../../helpers/helpers';

interface Props {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}
export const TodoForm: React.FC<Props> = ({ todos, setTodos }) => {
  const [todoTitle, setTodoTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [titleSpan, setTitleSpan] = useState('');
  const [userNameSpan, setUserNameSpan] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTodoTitle(value);
    setTitleSpan('');
  };

  const changeUserIdHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserId(+value);
    setUserNameSpan('');
  };

  const submitHandler = () => {
    if (!todoTitle) {
      setTitleSpan('Please enter a title');
    }

    if (!userId) {
      setUserNameSpan('Please choose a user');
    }

    if (!todoTitle || !userId) {
      return;
    }

    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: getNewId(todos) + 1,
        title: todoTitle,
        completed: false,
        userId: 2,
        user: getUserById(userId),
      },
    ]);

    setTodoTitle('');
    setUserId(0);
  };

  return (
    <form
      action="/api/users"
      method="POST"
      onSubmit={(event) => {
        event.preventDefault();
        submitHandler();
      }}
    >
      <div className="field">
        <label>
          Title:
          {' '}
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={todoTitle}
            onChange={handleTitleChange}
          />
        </label>
        <span className="error">{titleSpan}</span>
      </div>

      <div className="field">
        <label>
          User:
          {' '}
          <select
            data-cy="userSelect"
            value={userId}
            onChange={changeUserIdHandler}
          >
            <option
              disabled
              value={0}
            >
              Choose a user
            </option>
            {usersFromServer.map(user => {
              const { id, name } = user;

              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </select>
          <span className="error">{userNameSpan}</span>
        </label>
      </div>

      <button
        type="submit"
        data-cy="submitButton"
      >
        Add
      </button>
    </form>
  );
};
