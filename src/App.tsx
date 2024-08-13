import './App.scss';

import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import React, { useState } from 'react';
import { getUserById } from './services/user';
import { todos } from './services/user';
import { Todo } from './types/todo';

const getNextId = (todoList: Todo[]) => {
  const maxId = Math.max(...todoList.map(todo => todo.id));

  return maxId + 1;
};

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const [todoList, setTodoList] = useState<Todo[]>(todos);

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    setHasTitleError(trimmedTitle === '');
    setHasUserError(userId === 0);

    if (trimmedTitle && userId > 0) {
      const nextId = getNextId(todoList);

      setTodoList([
        ...todoList,
        {
          title: trimmedTitle,
          userId,
          user: getUserById(userId),
          id: nextId,
          completed: false,
        },
      ]);

      reset();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="todo-title">
            Title:&nbsp;&nbsp;
            <input
              id="todo-title"
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
            {hasTitleError && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label htmlFor="choose-user">User:&nbsp;</label>
          <select
            id="choose-user"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
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

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
