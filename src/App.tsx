import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import users from './api/users';
import todos from './api/todos';

const findUserById = (userId: number) => {
  return users.find(user => user.id === userId) || null;
};

const initialTodos = () => {
  return todos.map(todo => ({
    ...todo,
    user: findUserById(todo.userId),
  }));
};

const App: React.FC = () => {
  const [preparedTodos, setPreparedTodos] = useState(initialTodos);
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState(false);

  const [titleDirty, setTitleDirty] = useState(false);
  const [titleError] = useState('Please enter the title');

  const [choseUserDirty, setChoseUserDirty] = useState(false);
  const [choseUserError] = useState('Choose a user');

  const addTodo = () => {
    if (title === '') {
      setTitleDirty(true);
    }

    if (userId === 0) {
      setChoseUserDirty(true);
    }

    if (title !== '' && userId !== 0) {
      const newTodo = {
        userId,
        id: preparedTodos.length + 1,
        title,
        completed: status,
        user: findUserById(userId),
      };

      setPreparedTodos((prev) => [...prev, newTodo]);
      setUserId(0);
      setChoseUserDirty(false);
      setTitle('');
      setTitleDirty(false);
      setStatus(false);
    }
  };

  const setNewTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const setNewUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+(event.target.value));
  };

  const setNewStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.checked);
  };

  return (
    <div className="App">
      <TodoList todos={preparedTodos} />

      <div>
        <form
          className="form"
          onSubmit={(event) => {
            event.preventDefault();
            addTodo();
          }}
        >
          <div className="form__title">
            ADD NEW TODO
          </div>

          <div>
            <input
              className="form__input-title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={setNewTitle}
            />
            {(titleDirty && titleError)
              && <div className="form__error-color">{titleError}</div>}
          </div>

          <div>
            <select
              className="form__select-user"
              value={userId}
              onChange={setNewUserId}
            >
              <option
                value={0}
              >
                Choose a user
              </option>
              {users.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
            {(choseUserDirty && choseUserError)
              && <div className="form__error-color">{choseUserError}</div>}
          </div>

          <div>
            <label>
              <input
                className="form__checkbox-status"
                type="checkbox"
                checked={status}
                onChange={setNewStatus}
              />
              Complete
            </label>
          </div>

          <button
            className="btn"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
