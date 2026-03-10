import React, { useState } from 'react';
import { User } from './types/User';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(targetId: number): User | undefined {
  return usersFromServer.find(user => user.id === targetId);
}

const modifiedTodos = todosFromServer.map(todo => {
  const user = getUserById(todo.userId);

  return { ...todo, user: user || null };
});

const defaultValues = {
  title: '',
  user: 0,
};

const defaultErrors = {
  title: '',
  user: '',
};

type FormValues = typeof defaultValues;
type FormErrors = Partial<typeof defaultErrors>;

function validate({ title, user }: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (user === 0) {
    errors.user = 'Please choose a user';
  }

  if (title.length === 0) {
    errors.title = 'Please enter a title';
  }

  return errors;
}

const allowedChars = /[^\d a-zA-Zа-щА-ЩьЬюЮяЯіІїЇєЄґҐ']/;

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(modifiedTodos);
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState<FormErrors>(defaultErrors);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredValue = event.target.value.replace(allowedChars, '');

    setValues({
      ...values,
      title: filteredValue,
    });

    setErrors({
      ...errors,
      title: '',
    });
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValues({
      ...values,
      user: +event.target.value,
    });

    setErrors({
      ...errors,
      user: '',
    });
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors = validate(values);

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id)) + 1;
    const user = getUserById(values.user);

    const newTodo: Todo = {
      id: maxId,
      title: values.title,
      completed: false,
      userId: values.user,
      user: user || null,
    };

    setTodos([...todos, newTodo]);

    setValues(defaultValues);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleFormSubmit}>
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={values.title}
              onChange={handleTitleChange}
            />
          </label>

          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={values.user}
              onChange={handleUserChange}
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

          {errors.user && <span className="error">{errors.user}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
