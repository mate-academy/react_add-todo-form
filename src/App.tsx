import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

export type ToDo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectItem, setSelectItem] = useState<string>('0');
  const [listToDo, setListToDo] = useState<ToDo[]>(todosFromServer);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const findLargestId = () => {
    if (listToDo.length === 0) {
      return 1;
    }

    return Math.max(...listToDo.map(item => item.id)) + 1;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(false);
    setUserError(false);

    let hasError = false;

    if (!title.trim()) {
      setTitleError(true);
      hasError = true;
    }

    if (selectItem === '0') {
      setUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setListToDo(prev => [
      ...prev,
      {
        id: findLargestId(),
        title: title.trim(),
        completed: false,
        userId: Number(selectItem),
      },
    ]);

    setSelectItem('0');
    setTitle('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title__input">Title: </label>
          <input
            id="title__input"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
            value={title}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="field__select">User: </label>
          <select
            value={selectItem}
            onChange={event => {
              setSelectItem(event.target.value);
              setUserError(false);
            }}
            id="field__select"
            data-cy="userSelect"
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
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={listToDo} />
    </div>
  );
};
