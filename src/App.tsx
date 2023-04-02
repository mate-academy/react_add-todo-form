import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';

const findUserById = (id: number): User | null => {
  const user = usersFromServer.find(({ id: userId }) => {
    return userId === id;
  });

  return user || null;
};

const todos: Todo[] = todosFromServer.map(todo => {
  const user = findUserById(todo.userId);

  return {
    ...todo,
    user,
  };
});

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [allTodos, setAllTodos] = useState(todos);
  const [userError, setUserError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitleError(false);
    setTitle(e.target.value);
  };

  const onUserChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setUserError(false);
    setUserId(+e.target.value);
  };

  const clearForm = () => {
    setTitle('');
    setUserId(0);
  };

  const onAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentUser = findUserById(userId) || null;

    if (!currentUser) {
      setUserError(true);
    }

    if (!title.length) {
      setTitleError(true);
    }

    const maxId = Math.max(...allTodos.map(todo => todo.id));

    if (currentUser && title) {
      const newTodo = {
        id: maxId + 1,
        title,
        completed: false,
        userId: currentUser.id,
        user: currentUser,
      };

      setAllTodos([...allTodos, newTodo]);

      clearForm();
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Add todo form</h1>

        <div className="container__section">
          <form
            action="/api/users"
            method="POST"
            className="form"
            onSubmit={onAddTodo}
          >
            <div className="form__fields">
              <div className="form__field">
                <p className="form__label">Title</p>
                <input
                  className="form__text-field"
                  type="text"
                  data-cy="titleInput"
                  placeholder="Enter a title"
                  value={title}
                  onChange={onTitleChange}
                />

                {titleError && (
                  <span className="error">Please enter a title</span>
                )}
              </div>

              <div className="form__field">
                <p className="form__label">User</p>
                <select
                  className="form__text-field"
                  data-cy="userSelect"
                  value={userId}
                  onChange={onUserChange}
                >
                  <option value="0" disabled>Choose a user</option>

                  {usersFromServer.map(({ id, name }) => (
                    <option
                      key={id}
                      value={id}
                    >
                      {name}
                    </option>
                  ))}
                </select>

                {userError && (
                  <span className="error">Please choose a user</span>
                )}
              </div>
            </div>

            <button
              className="add-button"
              type="submit"
              data-cy="submitButton"
            >
              Add todo
            </button>
          </form>
        </div>

        <div className="container__section">
          <TodoList todos={allTodos} />
        </div>
      </div>
    </div>
  );
};
