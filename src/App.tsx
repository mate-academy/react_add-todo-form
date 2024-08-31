import { ChangeEvent, FormEvent, useState } from 'react';

import { FormFields } from './types/Form';
import { User } from './types/User';

import { validateForm } from './utils/validateForm';
import { getUserById } from './utils/getUserById';

import {
  initialFormErrors,
  initialFormValues,
} from './constants/initialFormState';

import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import './App.scss';

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId, usersFromServer),
}));

export const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState(initialTodos);
  const [formData, setFormData] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [user, setUser] = useState<User>();

  const addTodo = () => {
    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      completed: false,
      user,
      ...formData,
    };

    setTodos(prev => [...prev, newTodo]);
  };

  const reset = () => {
    setFormData(initialFormValues);
    setFormErrors(initialFormErrors);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === FormFields.USER_ID) {
      const selectedUser = getUserById(Number(value), usersFromServer);

      setUser(selectedUser);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const errors = validateForm(formData);

    setFormErrors(errors);
    const isFromValid = Object.keys(errors).length === 0;

    if (isFromValid) {
      addTodo();
      reset();
      setCount(count + 1);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        action="/api/todos"
        method="POST"
        key={count}
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}

            <input
              data-cy="titleInput"
              type="text"
              placeholder="Enter a title"
              name={FormFields.TITLE}
              value={formData.title}
              onChange={handleChange}
            />

            {formErrors.title && (
              <span className="error">{formErrors.title}</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            {'User: '}

            <select
              data-cy="userSelect"
              value={formData.userId}
              name={FormFields.USER_ID}
              onChange={handleChange}
            >
              <option value="0" disabled>
                Choose a user
              </option>

              {usersFromServer.map(userOption => (
                <option key={userOption.id} value={userOption.id}>
                  {userOption.name}
                </option>
              ))}
            </select>

            {formErrors.userId && (
              <span className="error">{formErrors.userId}</span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
