import './App.scss';
import { Todo, TodoList } from './components/TodoList';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './components/UserInfo';

type Errors = {
  title?: string;
  user?: string;
};

export const App = () => {
  const [todos, setTodos] = useState<(Todo & { user: User })[]>(
    todosFromServer.map(a => ({
      ...a,
      user: usersFromServer.find(isUser => isUser.id === a.userId)!,
    })),
  );

  const maxId = Math.max(...todos.map(todo => todo.id)) + 1;
  const defaultValues = { title: '', user: '' };
  const [errors, setErrors] = useState<Errors>({});
  const [values, setValues] = useState(defaultValues);

  const handleChange = (field: string, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));

    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!values.title) {
      newErrors.title = 'Please enter a title';
    }

    if (!values.user) {
      newErrors.user = 'Please choose a user';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const selectUser = usersFromServer.find(user => user.id === +values.user)!;

    setTodos(prev => {
      return [
        ...prev,
        {
          id: maxId,
          title: values.title,
          completed: false,
          userId: values.user,
          user: selectUser,
        },
      ];
    });

    setValues(defaultValues);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={submitForm}>
        <div className="field">
          <input
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={values.title}
            onChange={e => handleChange('title', e.target.value)}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={values.user}
            onChange={e => handleChange('user', e.target.value)}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={String(user.id)}>
                {user.name}
              </option>
            ))}
          </select>

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
