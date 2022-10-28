import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import './App.scss';
import 'bulma';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todosList: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const idGenerator = (todos: Todo[]): number => {
  return Math.max(...todos.map(curr => curr.id)) + 1;
};

export const App = () => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [isUserIdError, setIsUserIdError] = useState(false);
  const [isTitleError, setIsTitleError] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todosList);

  const clearForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimedTitle = title.trim();

    const todo = {
      id: idGenerator(visibleTodos),
      userId,
      title,
      completed: false,
      user: getUser(userId),
    };

    if (!title) {
      setIsTitleError(true);
    }

    if (!userId) {
      setIsUserIdError(true);
    }

    if (userId && trimedTitle) {
      setVisibleTodos(prevTodos => [...prevTodos, todo]);
      clearForm();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isTitleError) {
      setIsTitleError(false);
    }

    setTitle(event.target.value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (isUserIdError) {
      setIsUserIdError(false);
    }

    setUserId(Number(event.target.value));
  };

  return (
    <div className="App container section">
      <h1 className="title is-1">
        Add todo form
      </h1>

      <form
        action="/api/users"
        method="POST"
        className="mb-5"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            className="input is-primary"
            placeholder="Enter todo title"
            value={title}
            onChange={handleInputChange}
          />
          {isTitleError && (
            <span className="error help is-danger">Please enter a title</span>)}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleSelectChange}
            className="select is-primary"
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(({ id, name }) => (
              <option value={id} key={id}>
                {name}
              </option>
            ))}
          </select>

          {isUserIdError && (
            <span className="error help is-danger">Please choose a user</span>)}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          className="button is-primary"
        >
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
