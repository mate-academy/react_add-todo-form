import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function findUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todoWithUser: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todoWithUser);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserIdError, setIsUserIdError] = useState(false);

  const handleChangeTitle = (value: string) => {
    setTitle(value);
    if (isTitleError) {
      setIsTitleError(false);
    }
  };

  const handleChangeSelectedUser = (value: string) => {
    setSelectedUserId(value);
    if (isUserIdError) {
      setIsUserIdError(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !selectedUserId) {
      setIsTitleError(!title);
      setIsUserIdError(!selectedUserId);

      return;
    }

    if (selectedUserId && title) {
      setTodos((todosPrev) => {
        const maxTodoId = Math.max(...todosPrev.map(todo => todo.id));

        setTitle('');
        setSelectedUserId('');

        return [
          ...todosPrev,
          {
            id: maxTodoId + 1,
            userId: +selectedUserId,
            title,
            completed: false,
            user: findUserById(+selectedUserId),
          },
        ];
      });
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="text">Title: </label>
          <input
            data-cy="titleInput"
            type="text"
            id="title"
            name="title"
            placeholder="Enter a title"
            value={title}
            onChange={event => handleChangeTitle(event.target.value)}
          />

          {isTitleError && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            name="userSelect"
            value={selectedUserId}
            onChange={event => handleChangeSelectedUser(event.target.value)}
          >
            <option value="" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {isUserIdError && (
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

      <TodoList todos={todos} />
    </div>
  );
};
