import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './components/types';
import { TodoList } from './components/TodoList';

import './App.scss';

function getUserById(id: number) {
  return usersFromServer.find(user => user.id === id) || null;
}

function getHighestTodoId(list: Todo[]) {
  const listOfId = list.map(item => item.id);

  return Math.max(...listOfId);
}

const defaultList = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(defaultList);

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title.trim());
    setUserError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    setTodos(currentList => [...currentList, {
      id: getHighestTodoId(currentList) + 1,
      title,
      completed: false,
      userId,
      user: getUserById(userId) || null,
    }]);

    setTitle('');
    setUserId(0);
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
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>

          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:&nbsp;&nbsp;

            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUserChange}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {userError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
