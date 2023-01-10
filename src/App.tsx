import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';

const getUserById = (userId:number) => {
  return usersFromServer.find((user) => userId === user.id);
};

const todosFormat = todosFromServer.map((todo) => {
  return {
    ...todo,
    user: getUserById(todo.userId) || null,
  };
});

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [todos, setTodos] = useState(todosFormat);
  const [error, setError] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setTitle(event.currentTarget.value);
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setErrorUser(false);
    setUserInfo(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const idUsers = [...todos].map((person) => person.id);
    const largestId = Math.max(...idUsers);

    const user = getUserById(Number(userInfo));

    if (title.trim() === '') {
      setError(true);
    }

    if (userInfo === '') {
      setErrorUser(true);
    }

    if (!(title === '' || userInfo === '')) {
      setTodos((prev): any => {
        const addedTodo = {
          id: largestId + 1,
          title,
          completed: false,
          userId: user ? user.id : null,
          user,
        };

        setTitle('');
        setUserInfo('');

        return [...prev, addedTodo];
      });
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="">
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleChangeTitle}
            />
          </label>
          {error && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="">
            {'User: '}
            <select
              data-cy="userSelect"
              onChange={handleChangeName}
              value={userInfo}
            >
              <option value="" disabled selected>
                Choose a user
              </option>
              {usersFromServer.map((user) => (
                <option value={user.id}>{user.name}</option>
              ))}
            </select>
          </label>

          {errorUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
