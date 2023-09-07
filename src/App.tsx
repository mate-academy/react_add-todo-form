import { useState } from 'react';

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
  selectedUser: IUser | null
  isSubmit: boolean,
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

    const randomId = +Math.random().toFixed(12).slice(2);

    setTodos([
      ...todos,
      {
        id: randomId,
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

    if (!userText) {
      setTodoSetting(prev => ({
        ...prev,
        isUserTextEmpty: true,
      }));
    }
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
          />
          {(isUserTextEmpty && isSubmit) && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            value={selectedUser?.id ?? 0}
            data-cy="userSelect"
          >
            <option
              value={0}
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
                onClick={() => setTodoSetting(prev => ({
                  ...prev,
                  selectedUser: user,
                }))}
              >
                {user.name}
              </option>
            ))}
          </select>
          {(!selectedUser && isSubmit) && (
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
