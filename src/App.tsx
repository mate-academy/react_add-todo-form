import { useState } from 'react';
import { encode, decode } from 'js-base64';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { ITodo } from './types/Todo';

import { TodoList } from './components/TodoList';

import './App.scss';
import { IUser } from './types/User';

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
  const [todos, setTodos] = useState<ITodo[]>(preperadTodos);

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

  const showErrorForUnselectedUser = (!selectedUser && isSubmit);
  const showErrorForEmptyInput = (isUserTextEmpty && isSubmit);

  const reset = () => {
    setTodoSetting(initialTodoSetting);
  };

  const onFormSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
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

    reset();
  };

  const onInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        onSubmit={onFormSubmitHandler}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={userText}
            onChange={onInputHandler}
            placeholder="Enter a title"
          />
          {showErrorForEmptyInput && (
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
          {showErrorForUnselectedUser && (
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
