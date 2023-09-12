import { useState } from 'react';
import { encode, decode } from 'js-base64';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoEntity } from './types/Todo';
import { IUser } from './types/User';

import { TodoList } from './components/TodoList';

import './App.scss';

const preperadTodos = todosFromServer.map(todo => {
  return {
    ...todo,
    user: usersFromServer
      .find(user => user.id === todo.userId) ?? null,
  };
});

interface ITodoSetting {
  userText: string;
  isUserTextEmpty: boolean;
  selectedUser: IUser | null;
  isSubmit: boolean;
}

export const App = () => {
  const [todos, setTodos] = useState<TodoEntity[]>(preperadTodos);

  const initialTodoSetting = {
    userText: '',
    isUserTextEmpty: true,
    selectedUser: null,
    isSubmit: false,
  };

  const [{
    userText,
    isUserTextEmpty,
    selectedUser,
    isSubmit,
  }, setTodoSetting] = useState<ITodoSetting>(initialTodoSetting);

  const hasErrorForUnselectedUser = (!selectedUser && isSubmit);
  const hasErrorForEmptyInput = (isUserTextEmpty && isSubmit);

  const resetForm = () => {
    setTodoSetting(initialTodoSetting);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userText) {
      setTodoSetting(prev => ({
        ...prev,
        isUserTextEmpty: true,
        isSubmit: true,
      }));

      return;
    }

    if (!selectedUser) {
      setTodoSetting(prev => ({
        ...prev,
        isSubmit: true,
      }));

      return;
    }

    const nextId = Math.max(...todos.map(el => el.id)) + 1;

    setTodos([
      ...todos,
      {
        id: nextId,
        title: userText,
        userId: selectedUser.id,
        completed: false,
        user: selectedUser,
      },
    ]);

    resetForm();
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoSetting(prev => ({
      ...prev,
      userText: event.target.value,
    }));

    if (isUserTextEmpty) {
      setTodoSetting(prev => ({
        ...prev,
        isUserTextEmpty: false,
      }));
    }
  };

  const decodeUser = (user: string) => {
    return JSON.parse(decode(user));
  };

  const encodeUser = (user: IUser | null) => {
    return encode(JSON.stringify(user));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={userText}
            onChange={handleInput}
            placeholder="Enter a title"
          />
          {hasErrorForEmptyInput && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            value={encodeUser(selectedUser)}
            data-cy="userSelect"
            onChange={(event) => {
              setTodoSetting(prev => ({
                ...prev,
                selectedUser: decodeUser(event.target.value),
              }));
            }}
          >
            <option
              value={encodeUser(null)}
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option
                value={encodeUser(user)}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {hasErrorForUnselectedUser && (
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
