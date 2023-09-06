import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { PreparedTodo, UnpreparedTodo } from './interfaces/Todo';
import { User } from './interfaces/User';

const todosWithUsers = todosFromServer
  .map((todo: UnpreparedTodo) => {
    return {
      ...todo,
      user: usersFromServer
        .find((user: User) => user.id === todo.userId) || null,
    };
  });

export const App = () => {
  const [visibleTodos, setVisibleTodos]
    = useState<PreparedTodo[]>(todosWithUsers);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasSelectedUserIdError, setHasSelectedUserIdError] = useState(false);

  const resetForm = () => {
    setTitle('');
    setSelectedUserId(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasSelectedUserIdError(!selectedUserId);

    if (!title || !selectedUserId) {
      return;
    }

    setVisibleTodos((prevTodos) => {
      const maxId: number = Math.max(...prevTodos.map(todo => todo.id));

      return [
        ...prevTodos,
        {
          id: maxId + 1,
          title,
          completed: false,
          userId: selectedUserId,
          user: usersFromServer.find(user => user.id === selectedUserId)
            || null,
        },
      ];
    });

    resetForm();
  };

  const handleOnChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleOnChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setHasSelectedUserIdError(false);
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
          <label>
            Title:&nbsp;

            <input
              type="text"
              placeholder="Enter a title"
              data-cy="titleInput"
              value={title}
              onChange={handleOnChangeTitle}
            />
          </label>
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:&nbsp;

            <select
              data-cy="userSelect"
              value={selectedUserId}
              onChange={handleOnChangeUser}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {hasSelectedUserIdError && (
            <span className="error">Please choose a user</span>
          )}

        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
