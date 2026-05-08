import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import React, { useState } from 'react';
import { TodoItem, TodoWithUserItem } from './types/TodoItemType';
import { User } from './types/UserType';

const todosComplete: TodoWithUserItem[] = todosFromServer.map(
  (todo: TodoItem) => {
    return {
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId) || null,
    };
  },
);

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUserItem[]>(todosComplete);
  const [title, setTitle] = useState<string>('');
  const [userOption, setUserOption] = useState<string>('0');
  const [titleError, setTitleError] = useState<boolean>(false);
  const [userError, setUserError] = useState<boolean>(false);

  const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserOption(event.currentTarget.value);
    setUserError(false);
  };

  const handleChangeTitle = (event: string) => {
    setTitle(event);
    setTitleError(false);
  };

  const clearForm = (): void => {
    setTitle('');
    setUserOption('0');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim() === '') {
      setTitleError(true);
    }

    if (userOption === '0') {
      setUserError(true);
    }

    if (title.trim() === '' || userOption === '0') {
      return;
    }

    const newTodoObject: TodoWithUserItem = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title,
      userId: +userOption,
      completed: false,
      user: usersFromServer.find(user => user.id === +userOption) as User,
    };

    setTodos((prevState: TodoWithUserItem[]) => [...prevState, newTodoObject]);
    clearForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={event => handleSubmit(event)}>
        <div className="field">
          <label htmlFor="title">
            <input
              id="title"
              aria-label="title"
              type="text"
              data-cy="titleInput"
              placeholder="Title"
              value={title}
              onChange={event => handleChangeTitle(event.target.value)}
            />
          </label>
          {titleError && <span className="error">Please enter a title</span>}
        </div>
        <div className="field">
          <label htmlFor="userId">
            <select
              id="userId"
              aria-label="User Id"
              data-cy="userSelect"
              value={userOption}
              onChange={event => {
                handleChangeUser(event);
              }}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
