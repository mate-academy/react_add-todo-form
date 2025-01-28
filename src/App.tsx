import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { Todo } from './types';

export const App = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [newTodos, setNewTodos] = useState<Todo[]>(todosFromServer);
  const selectedUser = usersFromServer.find(
    userFromServer => userFromServer.id === user,
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    const pattern = /^[a-zA-Z0-9 ]*$/;

    if (pattern.test(e.target.value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const nextId = Math.max(...newTodos.map(todo => todo.id)) + 1;

    let hasError = false;

    if (!selectedUser) {
      setUserError(true);
      hasError = true;
    }

    if (!title) {
      setTitleError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const newTodo: Todo = {
      id: nextId,
      title: title,
      userId: user,
      completed: false,
      user: selectedUser,
    };

    setNewTodos([...newTodos, newTodo]);
    setTitle('');
    setUser(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          <label htmlFor="titleId">Title:</label>
          <input
            type="text"
            value={title}
            data-cy="titleInput"
            id="titleId"
            placeholder="Enter a title"
            onChange={handleOnChange}
          />
          {titleError && title.length <= 0 && (
            <span className="error">Please enter a title</span>
          )}
          {!isValid && <span className="error">Enter valid symbols</span>}
        </div>

        <div className="field">
          <label htmlFor="userId">User:</label>
          <select
            data-cy="userSelect"
            id="userId"
            value={user}
            onChange={e => setUser(+e.target.value)}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(userFromServer => (
              <option key={userFromServer.id} value={userFromServer.id}>
                {userFromServer.name}
              </option>
            ))}
          </select>

          {userError && !selectedUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton" onClick={handleOnClick}>
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
