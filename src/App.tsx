import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

// import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';

export function usersInTodos(): Todo[] {
  return todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId),
  }));
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(usersInTodos());
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasChangeError, setHasChangeError] = useState(false);

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const validation = event.target.value
      .replace(/[^a-zа-я\s\d]/gi, '');

    setTitle(validation);
    setHasTitleError(false);
  };

  const changeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.currentTarget.value);
    setHasChangeError(false);
  };

  const resetInputSFields = () => {
    setTitle('');
    setUserId(0);
  };

  const checkEmptyFileds = () => {
    if (!userId || !title.trim()) {
      if (!userId) {
        setHasChangeError(true);
      }

      if (!title.trim()) {
        setHasTitleError(true);
      }
    }

    return userId && title.trim();
  };

  const findTheNextId = () => {
    let theBiggestId = 0;

    todos.forEach(todo => {
      if (todo.id > theBiggestId) {
        theBiggestId = todo.id;
      }
    });

    return theBiggestId + 1;
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!checkEmptyFileds()) {
      return;
    }

    setTodos(
      [
        ...todos,
        {
          id: findTheNextId(),
          title,
          completed: false,
          userId,
          user: usersFromServer.find(currentUser => currentUser.id === userId),
        },
      ],
    );

    resetInputSFields();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleFormSubmit}>
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={changeTitle}
            />
            {hasTitleError && (
              <span className="error">
                Please enter a title
              </span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userId}
              onChange={changeUser}
            >
              <option
                value="0"
                disabled
              >
                Choose a user
              </option>

              {usersFromServer.map(currentUser => {
                return (
                  <option
                    key={currentUser.id}
                    value={currentUser.id}
                  >
                    {currentUser.name}
                  </option>
                );
              })}
            </select>
            {hasChangeError && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
