import React, { useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

const getNewTodoId = (todo: Todo[]) => {
  const maxId = Math.max(...todo.map(todoMax => todoMax.id));

  return maxId + 1;
};

const getUserById = (userId: number): User => {
  return usersFromServer.find(user => user.id === userId) as User;
};

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setTitleError] = useState(false);
  const [hasUserIdError, setUserIdError] = useState(false);

  const handlUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.currentTarget.value));
    setUserIdError(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regExp = /[^a-zA-ZА-ЩЬЮЯҐЄІЇа-щьюяґєі0-9\s]/g;
    const value = e.currentTarget.value.replace(regExp, '');

    setTitle(value);
    setTitleError(false);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTitleError(!title);
    setUserIdError(!userId);

    if (title && userId) {
      setTitle('');
      setUserId(0);

      const newTodo = {
        id: getNewTodoId(todos),
        title,
        completed: false,
        userId,
        user: getUserById(userId),
      };

      setTodos(currentTodos => [...currentTodos, newTodo]);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleFormSubmit}>
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter a title"
            />
          </label>
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handlUserSelect}
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
          </label>

          {hasUserIdError && (
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
