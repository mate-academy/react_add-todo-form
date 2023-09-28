import './App.scss';
import { FormEvent, useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { UserInfo } from './components/UserInfo';
import { generateId } from './services';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [user, setUser] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const addOne = (todo: Todo) => {
    setTodos((currentTodos) => [...currentTodos, todo]);
  };

  const handleSumbit = (e: FormEvent) => {
    e.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!user);

    if (title && user) {
      addOne({
        title,
        userId: generateId(todos),
        id: user,
        completed: false,
      });
      setTitle('');
      setUser(0);
    }
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasTitleError(false);
  };

  const handleUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(+e.target.value);
    setHasUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSumbit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitle}
            placeholder="Enter a title"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={user}
            onChange={handleUser}
          >
            <option value="0">
              Choose a user
            </option>
            {usersFromServer.map(userFS => (
              <UserInfo user={userFS} />
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
