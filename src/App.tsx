import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

function preperedTodos(todos: Todo[]): Todo[] {
  return todos.map(todo => {
    const user = usersFromServer.find(({ id }) => id === todo.userId);

    return {
      ...todo,
      user,
    };
  });
}

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isUserError, setIsUserError] = useState(false);
  const [isTitleError, setIsTitleError] = useState(false);
  const [todos, setTodos] = useState(todosFromServer);
  const preparedTodos: Todo[] = preperedTodos(todos);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim() === '') {
      setIsTitleError(true);
    }

    if (userId === 0) {
      setIsUserError(true);
    }

    if (title !== '' && userId !== 0) {
      const todoId = Math.max(...todos.map(({ id }) => id)) + 1;

      setTodos([
        ...todos,
        {
          id: todoId,
          title,
          completed: false,
          userId,
        },
      ]);

      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setIsTitleError(false);
            }}
          />
          {isTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={(e) => {
              setUserId(+e.target.value);
              setIsUserError(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(({ name, id }) => (
              <option value={id} key={id}>{name}</option>
            ))}
          </select>
          {isUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={preparedTodos} />
    </div>
  );
};
