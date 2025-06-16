import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import React, { useState } from 'react';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [valueOption, setValueOption] = useState('0');
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorOptions, setErrrorOptions] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== '0') {
      setErrrorOptions(false);
    }

    setValueOption(e.target.value);
  };

  const handleInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorTitle(false);
    setTitle(e.target.value);
    if (!e.target.value) {
      setErrorTitle(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      setErrorTitle(true);
    }

    if (valueOption === '0') {
      setErrrorOptions(true);
    }

    if (title && valueOption !== '0') {
      setTodos(prev => {
        const maxId = prev.length ? Math.max(...prev.map(item => item.id)) : 0;

        return [
          ...prev,
          {
            id: maxId + 1,
            title,
            completed: false,
            userId: parseInt(valueOption),
          },
        ];
      });

      setTitle('');
      setValueOption('0');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={e => handleInputTitle(e)}
          />
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            value={valueOption}
            data-cy="userSelect"
            onChange={e => handleChange(e)}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {errorOptions && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
