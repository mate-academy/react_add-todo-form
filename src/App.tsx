import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUserByID(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const preparedTodos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserByID(todo.userId),
  };
});

function getUserByName(userName: string): User | null {
  return usersFromServer.find(user => user.name === userName) || null;
}

export const App = () => {
  const defaultOption = 'Choose a user';

  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(defaultOption);
  const [todos, setTodos] = useState(preparedTodos);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmitForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedUser !== defaultOption && title !== '') {
      const newUser = getUserByName(selectedUser);

      setTodos(currentTodo => {
        const maxTodoId = Math.max(...currentTodo.map(todo => todo.id));

        setTitle('');
        setSelectedUser(defaultOption);

        return [
          ...currentTodo,
          {
            id: maxTodoId + 1,
            title,
            completed: false,
            userId: newUser ? newUser.id : null,
            user: newUser,
          },
        ];
      });
    }

    if (selectedUser === defaultOption) {
      setUserError(true);
    }

    if (title === '') {
      setTitleError(true);
    }
  };

  const handleNewTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleNewUser
    = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedUser(event.target.value);
      setUserError(false);
    };

  return (
    <div className="App">
      <div className="container">
        <h1>Add todo form</h1>

        <form
          className="form"
          onSubmit={handleSubmitForm}
        >
          <div className="form__field">
            <input
              type="text"
              data-cy="titleInput"
              id="title"
              placeholder="Enter a title"
              className="form__input"
              value={title}
              onChange={handleNewTitle}
            />
            {titleError && (
              <span className="error">
                Please enter a title
              </span>
            )}
          </div>

          <div className="form__field">
            <select
              data-cy="userSelect"
              name="userSelect"
              id="userSelect"
              className="form__input"
              value={selectedUser}
              onChange={handleNewUser}
            >
              <option value={defaultOption} disabled>
                {defaultOption}
              </option>

              {usersFromServer.map(user => (
                <option value={user.name} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            {userError && (
              <span className="error">Please choose a user</span>
            )}
          </div>

          <button
            className="form__button"
            type="submit"
            data-cy="submitButton"
          >
            Add
          </button>

        </form>

        <TodoList todos={todos} />
      </div>
    </div>
  );
};
