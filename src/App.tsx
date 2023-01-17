import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { User } from './components/types/User';
import { Todo } from './components/types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);

  const handleSumbit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userId === 0 || title === ' ') {
      setTitleError(title === '');
      setUserIdError(userId === 0);

      return;
    }

    if (!title.trim()) {
      setTitleError(true);

      return;
    }

    const todo: Todo = {
      id: Math.max(0, ...todos.map(({ id }) => id)) + 1,
      title,
      userId,
      completed: false,
      user: getUser(userId),
    };

    todos.push(todo);

    setTitle('');
    setUserId(0);
  };

  const handleTitle = (event:React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUser = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSumbit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            name="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitle}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            name="user"
            value={userId}
            onChange={handleUser}
          >
            <option
              value="0"
              disabled
              selected
            >
              Choose a user
            </option>
            {usersFromServer.map(({ id, name }) => (
              <option value={id}>{name}</option>
            ))}
          </select>

          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
