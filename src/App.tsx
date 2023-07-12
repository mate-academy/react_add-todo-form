import { ChangeEvent, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { getNewTodosId } from './services/todo';
import { TodoList } from './components/TodoList';
import { User } from './types/user';
import { Todo } from './types/todo';

function getPreparedTodos(todos: Todo[]) {
  return todos.map(todo => {
    const findedUser = usersFromServer.find(
      (user: User) => user.id === todo.userId,
    );

    return {
      ...todo,
      user: findedUser || null,
    };
  });
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  const [todos, setTodos] = useState(todosFromServer);

  const resetForm = () => {
    setTitle('');
    setUserId(0);
    setHasTitleError(false);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !userId) {
      setHasTitleError(!title);
      setHasUserIdError(!userId);

      return;
    }

    setTodos([...todos, {
      id: getNewTodosId(todos),
      title,
      completed: false,
      userId,
    }]);

    resetForm();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = /[^a-zабвгґдеєжзиіїйклмнопрстуфхцчшщьюя0-9\s']()/gi;
    const newValue = event.target.value;

    setTitle(newValue.replace(pattern, ''));
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const preparedTodos = getPreparedTodos(todos);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title" className="field__label">
            Title:
          </label>

          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user" className="field__label">
            User:
          </label>

          <select
            data-cy="userSelect"
            id="user"
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={preparedTodos} />

    </div>
  );
};
