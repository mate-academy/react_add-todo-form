import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { PreparedTodo, Todo } from '../../types/Todo';
import { getNextTodoID, getUserById } from '../../utils';

interface Props {
  todos: Todo[]
  createNewTodo: (todo: PreparedTodo) => void
}

export const TodoForm: React.FC<Props> = ({ todos, createNewTodo }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsTitleError(!title);
    setIsUserError(!userId);

    if (!!title && !!userId) {
      const newTodo: PreparedTodo = {
        id: getNextTodoID(todos),
        title,
        userId,
        completed: false,
        user: getUserById(userId),
      };

      createNewTodo(newTodo);

      setTitle('');
      setUserId(0);
    }
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label htmlFor="titleInput">Title: </label>
        <input
          type="text"
          data-cy="titleInput"
          id="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={(event) => {
            setIsTitleError(false);
            setTitle(event.target.value);
          }}
        />

        {isTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="userInput">User: </label>
        <select
          data-cy="userSelect"
          id="userInput"
          value={userId}
          onChange={(event) => {
            setIsUserError(false);
            setUserId(+event.target.value);
          }}
        >
          <option value="0" disabled>Choose a user</option>
          {
            usersFromServer.map(({ id, name }) => (
              <option value={id} key={id}>{name}</option>
            ))
          }
        </select>

        {isUserError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
