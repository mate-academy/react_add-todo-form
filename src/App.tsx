import React, { useEffect, useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo, FormError } from './types';

import { currentMaxId, formatedTitle } from './heplers';

const getUserById = (userId: number) => {
  return usersFromServer.find(user => user.id === userId) || null;
};

const todosWithUsers = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todosWithUsers);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);

  const [showTitleError, setShowTitleError] = useState(false);
  const [showUserError, setShowUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const validTitle = formatedTitle(event.target.value);

    setNewTodoTitle(validTitle);
  };

  const addNewTodo = (title: string, userId: number, id: number) => {
    const newTodo: Todo = {
      id: id + 1,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodos([...todos, newTodo]);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setShowTitleError(!newTodoTitle);
    setShowUserError(!selectedUserId);

    if (newTodoTitle && selectedUserId) {
      addNewTodo(newTodoTitle, selectedUserId, currentMaxId(todos));
    }
  };

  useEffect(() => {
    setNewTodoTitle('');
    setSelectedUserId(0);
  }, [todos.length]);

  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <h1 className="header__title">
            Add todo form
          </h1>

          <form
            action="/api/users"
            method="POST"
            className="header__form"
            onSubmit={handleFormSubmit}
          >
            <div className="form-content">
              <div className="field form-field">
                <input
                  type="text"
                  className="header__field input"
                  data-cy="titleInput"
                  placeholder="Enter a title"
                  value={newTodoTitle}
                  onChange={handleTitleChange}
                />

                {showTitleError
                  && !newTodoTitle
                    && (
                      <div>
                        <span className="error">
                          {FormError.titleFieldIsRequired}
                        </span>
                      </div>
                    )}
              </div>

              <div className="field">
                <select
                  data-cy="userSelect"
                  className="header__field select"
                  value={selectedUserId}
                  onChange={event => (
                    setSelectedUserId(Number(event.target.value)))}
                >
                  <option value="0" disabled>Choose a user</option>
                  {usersFromServer.map((selectedUser) => (
                    <option key={selectedUser.id} value={selectedUser.id}>
                      {selectedUser.name}
                    </option>
                  ))}
                </select>

                {showUserError
                  && !selectedUserId
                    && (
                      <div>
                        <span className="error">
                          {FormError.userFieldIsRequired}
                        </span>
                      </div>
                    )}
              </div>

              <button
                type="submit"
                data-cy="submitButton"
                className="button"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </header>

      <TodoList todos={todos} />
    </div>
  );
};
