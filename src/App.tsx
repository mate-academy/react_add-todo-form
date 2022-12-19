import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

enum ChangeType {
  TITLE,
  USER,
  COMPLETED,
}

export const App: React.FC<{}> = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [todos, setTodos] = useState(
    todosFromServer.sort((a, b) => a.id - b.id),
  );

  const [errors, setErrors] = useState({
    userNotSelected: false,
    titleIsEmpty: false,
  });

  const clearForm = () => {
    setTitle('');
    setUser(0);
    setCompleted(false);
  };

  const handleSubmit = (
    e: React.SyntheticEvent | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setErrors({
      userNotSelected: user === 0,
      titleIsEmpty: title.length === 0,
    });

    setTodos(prev => {
      if (user === 0 || title.length === 0) {
        return prev;
      }

      const newTodo = {
        id: prev[prev.length - 1].id + 1,
        title,
        userId: user,
        completed,
      };

      clearForm();

      return ([
        ...prev,
        newTodo,
      ]);
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: ChangeType,
  ) => {
    switch (field) {
      case ChangeType.TITLE:
        setTitle(e.target.value);
        setErrors(prev => ({
          userNotSelected: prev.userNotSelected,
          titleIsEmpty: false,
        }));
        break;
      case ChangeType.USER:
        setUser(Number.parseInt(e.target.value, 10));
        setErrors(prev => ({
          userNotSelected: false,
          titleIsEmpty: prev.titleIsEmpty,
        }));
        break;
      default: // ChangeType.COMPLETED
        setCompleted(prev => !prev);
        break;
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            data-cy="titleInput"
            onChange={e => handleChange(e, ChangeType.TITLE)}
            placeholder="Enter title..."
          />
          {errors.titleIsEmpty
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            onChange={e => handleChange(e, ChangeType.USER)}
            data-cy="userSelect"
            value={user}
          >
            <option
              value={0}
              key={0}
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map(item => (
              <option
                key={item.username}
                value={item.id}
              >
                {item.name}
              </option>
            ))}
          </select>
          {errors.userNotSelected
          && <span className="error">Please choose a user</span>}
        </div>

        <div className="field">
          <input
            type="checkbox"
            name="completed"
            id="completed"
            checked={completed}
            onChange={e => handleChange(e, ChangeType.COMPLETED)}
          />
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleSubmit}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos.map(todo => ({
        ...todo,
        user: usersFromServer.find(item => item.id === todo.userId) || null,
      }))}
      />

    </div>
  );
};
