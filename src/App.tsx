import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { TodoItem } from './types/todoItem';
import { User } from './types/user';

type FormData = {
  title: string;
  userId: number;
};

type FormErrors = {
  title: boolean;
  userId: boolean;
};

const INITIAL_FORM_DATA: FormData = {
  title: '',
  userId: 0,
};

const INITIAL_FORM_ERRORS: FormErrors = {
  title: false,
  userId: false,
};

const prepareTodos = (todos: TodoItem[], users: User[]): TodoItem[] => {
  return todos.map(item => {
    const user = users.find(u => u.id === item.userId);

    return {
      ...item,
      user: user,
    };
  });
};

export const App = () => {
  const [todos, setTodos] = useState<TodoItem[]>(
    prepareTodos(todosFromServer, usersFromServer),
  );
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [formErrors, setFormErrors] = useState<FormErrors>(INITIAL_FORM_ERRORS);

  const getFormErrors = () => {
    const newError = {
      title: false,
      userId: false,
    };

    newError.title = formData.title.trim() === '';
    newError.userId = formData.userId === 0;

    return newError;
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setFormErrors(INITIAL_FORM_ERRORS);
  };

  const handleNameChange = (newName: string) => {
    setFormData(prev => ({ ...prev, title: newName }));
    setFormErrors(prev => ({ ...prev, title: false }));
  };

  const handleUserChange = (newId: number) => {
    setFormData(prev => ({ ...prev, userId: newId }));
    setFormErrors(prev => ({ ...prev, userId: false }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const validation = getFormErrors();
    const isValid = !validation.title && !validation.userId;

    if (!isValid) {
      setFormErrors(validation);

      return;
    }

    const maxId = Math.max(...todos.map(item => item.id), 0);
    const user = usersFromServer.find(u => u.id === formData.userId);

    const newTodo: TodoItem = {
      id: maxId + 1,
      title: formData.title.trim(),
      completed: false,
      userId: formData.userId,
      user: user,
    };

    setTodos(prev => [...prev, newTodo]);
    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => handleSubmit(event)}
      >
        <div className="field">
          <label htmlFor="titleInput">Title:</label>

          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={formData.title}
            onChange={event => handleNameChange(event.target.value)}
          />

          {formErrors.title === true && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelectInput">User:</label>

          <select
            data-cy="userSelect"
            id="userSelectInput"
            defaultValue={0}
            value={formData.userId}
            onChange={event => handleUserChange(+event.target.value)}
          >
            <option key={0} value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {formErrors.userId === true && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
