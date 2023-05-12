/* eslint-disable max-len */
import { FormEventHandler, useState, ChangeEvent } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';

import {
  getUser, getNewId, getTodos, validateTitleInput,
} from './utils/appHelper';

type FormInputErrors = {
  title: boolean,
  selectedUser: boolean;
};

const initialFormValues = {
  title: '',
  selectedUser: 0,
};

const initialFormErrors: FormInputErrors = {
  title: false,
  selectedUser: false,
};

export const App = () => {
  const [formInputValues, setFormInputValues] = useState(initialFormValues);
  const [formInputErrors, setFormInputErrors] = useState(initialFormErrors);
  const [todos, setTodos] = useState(getTodos());

  const { title, selectedUser } = formInputValues;
  const { title: titleError, selectedUser: selectedUserError } = formInputErrors;

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (!title || !selectedUser) {
      setFormInputErrors({
        title: !title,
        selectedUser: !selectedUser,
      });

      return;
    }

    const newTodo = {
      id: getNewId(),
      title,
      completed: false,
      userId: selectedUser,
      user: getUser(selectedUser),
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);

    setFormInputValues(initialFormValues);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === 'title' && !validateTitleInput(value)) {
      return;
    }

    setFormInputErrors(prevState => ({
      ...prevState,
      [name]: prevState[name as keyof FormInputErrors] ? !value : false,
    }));

    setFormInputValues(prevState => ({
      ...prevState,
      [name]: name === 'title' ? value : +value,
    }));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title:</label>
          {' '}
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Title"
            value={title}
            id="title"
            name="title"
            onChange={handleChange}
          />
          {' '}
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User:</label>
          {' '}
          <select
            data-cy="userSelect"
            id="user"
            name="selectedUser"
            value={selectedUser}
            onChange={handleChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {' '}
          {selectedUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
