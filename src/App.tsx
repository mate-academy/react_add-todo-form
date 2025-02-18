import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/types';
import { useState } from 'react';
import { defaultCreator } from './utils/defaultCreator';

const todos: Todo[] = todosFromServer.map(todo => {
  const creator =
    usersFromServer.find(user => user.id === todo.userId) || defaultCreator;

  return { ...todo, creator };
});

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [isUserError, setIsUserError] = useState(false);
  const [title, setTitle] = useState('');
  const [isTitleError, setIsTitleError] = useState(false);

  let hasErrors = false;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!title.trim()) {
      setIsTitleError(true);
      hasErrors = true;
    }

    if (selectedUser === 0) {
      setIsUserError(true);
      hasErrors = true;
    }

    if (hasErrors) {
      hasErrors = false;

      return;
    }

    const creator =
      usersFromServer.find(user => user.id === selectedUser) || defaultCreator;

    const idsOfTodos = todosFromServer.map(todo => todo.id);

    todos.push({
      id: Math.max(...idsOfTodos) + 1,
      title,
      completed: false,
      userId: selectedUser,
      creator,
    });

    setTitle('');
    setSelectedUser(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit} action="/api/todos" method="POST">
        <div className="field">
          Title:{' '}
          <input
            placeholder="Enter a title"
            onChange={event => {
              setTitle(event.target.value);
              setIsTitleError(false);
            }}
            value={title}
            type="text"
            data-cy="titleInput"
          />
          {isTitleError && <span className="error">Please enter a title</span>}
        </div>
        <div className="field">
          User:{' '}
          <select
            onChange={event => {
              setSelectedUser(Number(event.target.value));
              setIsUserError(false);
            }}
            value={selectedUser}
            data-cy="userSelect"
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {isUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
