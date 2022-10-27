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
  const [user, setUser] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasChangeError, setHasChangeError] = useState(false);

  const resetInputSFields = () => {
    setTitle('');
    setUser(0);
  };

  const checkEmptyFileds = () => {
    if (!user || !title) {
      if (!user) {
        setHasChangeError(true);
      }

      if (!title) {
        setHasTitleError(true);
      }
    }

    return user && title;
  };

  const findTheBiggestId = () => {
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
          id: findTheBiggestId(),
          title,
          completed: false,
          userId: user,
          user: usersFromServer.find(currentUser => currentUser.id === user),
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
              onChange={(event) => {
                const validation = event.target.value
                  .replace(/[^a-zа-я\s\d]/gi, '');

                setTitle(validation.trim());
                setHasTitleError(false);
              }}
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
              value={user}
              onChange={(event) => {
                setUser(+event.currentTarget.value);
                setHasChangeError(false);
              }}
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
