import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';

const getUserById = (id: number): User | null => {
  const user = usersFromServer.find(({ id: userId }) => {
    return userId === id;
  });

  return user || null;
};

const todos: Todo[] = todosFromServer.map(todo => {
  const user = getUserById(todo.userId);

  return {
    ...todo,
    user,
  };
});

export const App = () => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [allTodos, setAllTodos] = useState(todos);
  const [userError, setUserError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitleError(false);
    setNewTodoTitle(e.target.value);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setUserError(false);
    setSelectedUserId(+e.target.value);
  };

  const resetForm = () => {
    setNewTodoTitle('');
    setSelectedUserId(0);
  };

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentUser = getUserById(selectedUserId) || null;

    if (!currentUser) {
      setUserError(true);
    }

    if (!newTodoTitle.length) {
      setTitleError(true);
    }

    const maxId = Math.max(...allTodos.map(todo => todo.id));

    if (currentUser && newTodoTitle) {
      const newTodo = {
        id: maxId + 1,
        title: newTodoTitle,
        completed: false,
        userId: currentUser.id,
        user: currentUser,
      };

      setAllTodos([...allTodos, newTodo]);

      resetForm();
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Add todo form</h1>

        <div className="container__block">
          <form
            action="/api/users"
            method="POST"
            className="form"
            onSubmit={handleAddTodo}
          >
            <div className="form__fields">
              <div className="form__field">
                <p className="form__label">Title</p>
                <input
                  className="form__input"
                  type="text"
                  data-cy="titleInput"
                  placeholder="Enter a title"
                  value={newTodoTitle}
                  onChange={handleTitleChange}
                />

                {titleError && (
                  <span className="error">Please enter a title</span>
                )}
              </div>

              <div className="form__field">
                <p className="form__label">User</p>
                <select
                  className="form__input"
                  data-cy="userSelect"
                  value={selectedUserId}
                  onChange={handleUserChange}
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

        <div className="container__block">
          <TodoList todos={allTodos} />
        </div>
      </div>
    </div>
  );
};
