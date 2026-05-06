import { useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId)!,
    })),
  );
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isTitleEmpty = title.trim() === '';
    const isUserNotSelected = userId === 0;

    setTitleError(isTitleEmpty);
    setUserError(isUserNotSelected);

    if (isTitleEmpty || isUserNotSelected) {
      return;
    }

    const selectedUser = usersFromServer.find(user => user.id === userId);

    if (!selectedUser) {
      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id));

    const newTodo = {
      id: maxId + 1,
      title: title.trim(),
      userId,
      completed: false,
      user: selectedUser,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);

    setTitle('');
    setUserId(0);
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(Number(event.target.value));
              setUserError(false);
            }}
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

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
