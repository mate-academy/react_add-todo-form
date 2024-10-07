import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { ChangeEvent, FormEvent, useState } from 'react';
import { getUserById } from './utils/getUserById';
import { getMaxId } from './utils/getMaxId';

const todosWithUser: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserById(todo.userId),
  };
});

export const App = () => {
  const [todos, setTodos] = useState(todosWithUser);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [selectedUser, setSelectedUser] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const handleSetTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSetUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(Number(event.target.value));
    setHasUserError(false);
  };

  const handleSetTodos = () => {
    const newTodo = {
      id: getMaxId(todos),
      title,
      completed: false,
      userId: selectedUser,
      user: getUserById(selectedUser),
    };

    setTodos(currentTodos => {
      return [...currentTodos, newTodo];
    });
  };

  const handleReset = () => {
    setTitle('');
    setSelectedUser(0);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!selectedUser);

    if (!title || !selectedUser) {
      return;
    }

    handleSetTodos();
    handleReset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>

          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleSetTitle}
          />

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>

          <select
            id="userSelect"
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleSetUser}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
