import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

import { Todo } from './types/Todo';
import { User } from './types/User';

const getUserById = (usersArr: User[], userId: number) => {
  return usersArr.find(user => user.id === userId) || null;
};

const toDoWithUser: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(usersFromServer, todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(toDoWithUser);

  const [title, setTitle] = useState<string>('');
  const [hasTitleError, setHasTitleError] = useState<boolean>(false);

  const [userId, setUserId] = useState<number>(0);
  const [hasUserIdError, setHasUserIdError] = useState<boolean>(false);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const onUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setHasTitleError(true);
    }

    if (!userId) {
      setHasUserIdError(true);
    }

    if (title && userId) {
      const maxId =
        todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;

      const newTodo: Todo = {
        id: maxId + 1,
        title,
        userId,
        user: getUserById(usersFromServer, userId),
        completed: false,
      };

      setTodos(prev => [...prev, newTodo]);
      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        className="todoForm"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">
            Title:
            <input
              id="title"
              type="text"
              name="title"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={onTitleChange}
            />
          </label>
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">
            User:
            <select
              id="user"
              name="user"
              data-cy="userSelect"
              value={userId}
              onChange={onUserChange}
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
