import React, { useState } from 'react';
import './App.scss';

import users from './api/users';
import todosed from './api/todos';
import { TodoList } from './api/components/todoList';

const regex = /[^A-Za-zА-Яа-яёЁ0-9 ]/g;

const App: React.FC = () => {
  const preparedTodos = todosed.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId)?.name,
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
    setTitle(event.target.value.replace(regex, ''));
    setIsValidTitle(true);
  };

  const addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        user: users.find(user => user.id === +selectedId)?.name,
      };

      setTodos([...todos, newTodo]);

      setSelectedId('');
      setTitle('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form className="form" onSubmit={addNewTodo}>
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
          type="submit"
        >
          Add ToDo
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};

export default App;
