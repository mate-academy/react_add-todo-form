import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoAndUser } from './components/Types/Types';
import { TodoList } from './components/TodoList';

const getTodoWithUser = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(us => us.id === todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<TodoAndUser[]>(getTodoWithUser);

  const [title, setTitle] = useState('');
  const [currentUserId, setCurrentUserId] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleOnTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleOnSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentUserId(+event.target.value);
    setUserError(false);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let isValidValues = true;
    const isValidTitle = title.replace(/[^a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9 ]/g, '');

    if (!isValidTitle.trim()) {
      setTitleError(true);
      isValidValues = false;
    }

    if (currentUserId === 0) {
      setUserError(true);
      isValidValues = false;
    }

    if (!isValidValues) {
      return;
    }

    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title: isValidTitle,
      userId: currentUserId,
      completed: false,
      user: usersFromServer.find(u => u.id === currentUserId),
    };

    setTodos([...todos, newTodo]);

    setTitle('');
    setCurrentUserId(0);

    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" onSubmit={handleFormSubmit} method="POST">
        <div className="field">
          <label htmlFor="title-input">Title: </label>
          <input
            type="text"
            placeholder="Enter a title"
            name="title-input"
            value={title}
            data-cy="titleInput"
            onChange={handleOnTitle}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-selection">User: </label>
          <select
            data-cy="userSelect"
            value={currentUserId}
            onChange={handleOnSelect}
            name="user-selection"
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
