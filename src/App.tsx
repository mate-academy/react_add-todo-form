import './App.scss';
import { ChangeEvent, useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

function getUserById(id: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === id);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [visibleTodos, setTodos] = useState(todos);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const handleChangeUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setIsUserError(false);
  };

  const handleTitle = ((event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const regexp = /[^A-Za-zA-Яa-я0-9\s]/g;
    const filteredInput = input.replace(regexp, '');

    setTitle(/^\s*$/.test(filteredInput)
      ? ''
      : filteredInput);
    setIsTitleError(false);
  });

  const handleReset = () => {
    setUserId(0);
    setTitle('');
  };

  const handleFormSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      setIsTitleError(true);
    }

    const user = getUserById(userId);

    if (!user) {
      setIsUserError(true);
    }

    if (!normalizedTitle || !user) {
      return;
    }

    const newTodoId = Math.max(...visibleTodos.map(todo => todo.id)) + 1;

    const newTodo: Todo = {
      id: newTodoId,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    if (title && userId) {
      setTodos(currentTodo => [
        ...currentTodo,
        newTodo,
      ]);

      handleReset();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label htmlFor="todoTitle">Title: </label>

          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            id="#todoTitle"
            onChange={handleTitle}
          />

          {isTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>

          <select
            data-cy="userSelect"
            id="#userSelect"
            value={userId}
            onChange={handleChangeUser}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {isUserError
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
