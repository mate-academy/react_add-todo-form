import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUserById(users: User[], id: number) {
  return users.find(user => id === user.id) || null;
}

const todoList: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(usersFromServer, todo.userId),
}));

function getUserByName(name: string, users: User[]) {
  return users.find(user => name === user.name) || null;
}

function getLargestTodoId(todos: Todo[]) {
  return Math.max(...todos.map(todo => todo.id));
}

export const App: React.FC = () => {
  const titleDefaultValue = '';
  const userNameDefaultValue = 'Choose a user';

  const [title, setTitle] = useState(titleDefaultValue);
  const [selectedUserName, setUser] = useState(userNameDefaultValue);
  const [todos, setTodos] = useState(todoList);
  const [isErrorOnUserSelect, setIsErrorOnUserSelect] = useState(false);
  const [isErrorOnTitleInput, setIsErrorOnTitleInput] = useState(false);

  const clearForm = (defaultTitle: string, defaultUserName: string) => {
    setTitle(defaultTitle);
    setUser(defaultUserName);
  };

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      selectedUserName !== userNameDefaultValue && title !== titleDefaultValue
    ) {
      const newUser = getUserByName(selectedUserName, usersFromServer);

      setTodos(currentTodo => (
        [
          ...currentTodo,
          {
            id: getLargestTodoId(todos) + 1,
            title,
            completed: false,
            userId: newUser ? newUser.id : null,
            user: newUser,
          },
        ]
      ));

      clearForm(titleDefaultValue, userNameDefaultValue);
    }

    if (selectedUserName === userNameDefaultValue) {
      setIsErrorOnUserSelect(true);
    }

    if (title === titleDefaultValue) {
      setIsErrorOnTitleInput(true);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setIsErrorOnTitleInput(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(event.currentTarget.value);
    setIsErrorOnUserSelect(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmitForm}
      >
        <div className="field">
          <label htmlFor="titleInput">
            {'Title: '}
          </label>

          <input
            type="text"
            id="titleInput"
            name="titleInput"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
            autoComplete="off"
          />
          {isErrorOnTitleInput && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            {'User: '}
          </label>

          <select
            id="userSelect"
            name="userSelect"
            data-cy="userSelect"
            value={selectedUserName}
            onChange={handleUserChange}
          >
            <option value={userNameDefaultValue} disabled>
              {userNameDefaultValue}
            </option>
            {usersFromServer.map(userInfo => (
              <option value={userInfo.name} key={userInfo.id}>
                {userInfo.name}
              </option>
            ))}
          </select>

          {isErrorOnUserSelect && (
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
