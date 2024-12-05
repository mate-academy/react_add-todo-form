import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo, User } from './types';
import { TodoList } from './components/TodoList';
import React, { useState } from 'react';

const findNewTodoId = (todoArr: Todo[]) => {
  todoArr.sort((todo1, todo2) => todo2.id - todo1.id);

  return todoArr[0].id + 1;
};

const getUserById = (usersArr: User[], userId: number) => {
  return usersArr.find(user => userId === user.id);
};

const newTodos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserById(usersFromServer, todo.userId),
  };
});

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(newTodos);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const onUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleReset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setHasTitleError(true);
    }

    if (!userId) {
      setHasUserIdError(true);
    }

    if (title && userId) {
      const newTodo: Todo = {
        id: findNewTodoId(todos),
        title,
        userId,
        completed: false,
        user: getUserById(usersFromServer, userId),
      };

      setTodos(prev => [...prev, newTodo]);
      handleReset();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={onTitleChange}
            />
          </label>
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={userId}
              onChange={onUserIdChange}
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
