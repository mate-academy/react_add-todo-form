import React, { useState } from 'react';
import './App.scss';

import users from './api/users';
import todosed from './api/todos';

const App: React.FC = () => {
  const preparedTodos = todosed.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }));

  const [selectedId, setSelectedId] = useState('');
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(preparedTodos);
  const [isValidTitle, setIsValidTitle] = useState(true);
  const [isValidUser, setIsValidUser] = useState(true);

  const selectId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedId(event.target.value);
    setIsValidUser(true);
  };

  const selectTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^A-Za-zА-Яа-яёЁ0-9 ]/g, ''));
    setIsValidTitle(true);
  };

  const addNewTodo = () => {
    if (!title) {
      setIsValidTitle(false);
    }

    if (!selectedId) {
      setIsValidUser(false);
    }

    if (title && selectedId) {
      const newTodo = {
        userId: +selectedId,
        id: todos[todos.length - 1].id + 1,
        title,
        completed: false,
        user: users.find(user => user.id === +selectedId),
      };

      setTodos([...todos, newTodo]);

      setSelectedId('');
      setTitle('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form className="form">
        <input
          className="form__input"
          type="title"
          placeholder="Title"
          value={title}
          onChange={selectTitle}
        />
        <div className="form__error-message">
          {
            !isValidTitle && (
              <span>
                Please enter the title
              </span>
            )
          }
        </div>

        <label className="form__label">
          Choose user:
          <select
            name="selectUser"
            value={selectedId}
            onChange={selectId}
          >
            <option>Please choose a user</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </label>
        <div className="form__error-message">
          {
            !isValidUser && (
              <span>
                Please choose a user
              </span>
            )
          }
        </div>
        <button
          className="form__add-button"
          type="button"
          onClick={addNewTodo}
        >
          Add ToDo
        </button>
      </form>

      <div>
        <span className="todo__title">ToDo list</span>
        <div className="todo__list">
          <ul className="todo">
            {
              [...todos].reverse().map((todo) => (
                <li className="todo__list-item" key={todo.id}>
                  <p>{todo.user?.name}</p>
                  <p>{todo.title}</p>
                  <label>
                    <input
                      className="task"
                      type="checkbox"
                      checked={todo.completed}
                    />
                    Done
                  </label>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
