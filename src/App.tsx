import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';

const getUserById = (userId:number): User | null => {
  return usersFromServer.find((user) => userId === user.id) || null;
};

const preparedTodos: Todo[] = todosFromServer.map((todo) => {
  return {
    ...todo,
    user: getUserById(todo.userId) || null,
  };
});

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState(preparedTodos);
  const [error, setError] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setTitle(event.currentTarget.value);
  };

  const handleChangUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setErrorUser(false);
    setUserId(Number(event.currentTarget.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim() === '') {
      setError(true);
    }

    if (userId === 0) {
      setErrorUser(true);
    }

    if (title === '' || userId === 0) {
      return;
    }

    const largestId = Math.max(...todos.map((person) => person.id));
    const user = getUserById(Number(userId));

    const newTodo = {
      id: largestId + 1,
      title,
      completed: false,
      userId: user ? user.id : null,
      user,
    };

    setTitle('');
    setUserId(0);

    setTodos([...todos, newTodo]);
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
              onChange={handleChangUser}
              value={userId}
            >
              <option value="0" disabled selected>
                Choose a user
              </option>
              {usersFromServer.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
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
