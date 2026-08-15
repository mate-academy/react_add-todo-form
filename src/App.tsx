import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { FormEvent, useState } from 'react';
import { TodoList } from './components/TodoList';

export const App = () => {
  const todosWithUser = todosFromServer.map(todo => {
    const user = usersFromServer.find(
      serverUser => serverUser.id === todo.userId,
    );

    if (!user) {
      throw new Error(`User with id ${todo.userId} not found`);
    }

    return {
      ...todo,
      user,
    };
  });

  const [todos, setTodos] = useState(todosWithUser);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const invalidTitle = title.trim() === '';
    const invalidUser = selectedUser === 0;

    setHasTitleError(invalidTitle);
    setHasUserError(invalidUser);

    if (invalidTitle || invalidUser) {
      return;
    }

    const user = usersFromServer.find(
      fullUserObject => fullUserObject.id === selectedUser,
    );

    if (!user) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id)) + 1;

    const newTodo = {
      id: newId,
      title,
      userId: selectedUser,
      completed: false,
      user,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    setTitle('');
    setSelectedUser(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit} action="/api/todos" method="POST">
        <div className="field">
          <input
            onChange={event => {
              setTitle(event.target.value);
              setHasTitleError(false);
            }}
            value={title}
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
          />

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            onChange={event => {
              setSelectedUser(Number(event.target.value));
              setHasUserError(false);
            }}
            value={selectedUser}
            data-cy="userSelect"
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
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
