import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { FormErrors } from './types/FormErrors';
import { Todo } from './types/Todo';
import { User } from './types/User';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { FormData } from './types/FormData';

const defaultFormErrors: FormErrors = {
  titleErrorMessage: '',
  userErrorMessage: '',
};

const defaultFormData: FormData = {
  title: '',
  userId: 0,
};

function getUser(userId: number) {
  return usersFromServer.find((user: User) => userId === user.id) || null;
}

function getNewTodoId(todos: Todo[]) {
  const todoIds = todos.map(todo => (todo.id));

  return Math.max(...todoIds) + 1;
}

export const App: React.FC = () => {
  const initialTodos: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  }));

  const [todos, setTodos] = useState(initialTodos);

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      user: getUser(todo.userId),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>(defaultFormErrors);

  const clearForm = () => {
    setFormData(defaultFormData);
    setFormErrors(defaultFormErrors);
  };

  const setFieldValue = (field: keyof FormData, value: string | number) => {
    setFormData((prevFormData: FormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const setErrorMessage = (errorProp: keyof FormErrors, message: string) => {
    setFormErrors((prevFormErrors: FormErrors) => ({
      ...prevFormErrors,
      [errorProp]: message,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!(formData.title.trim())) {
      setErrorMessage('titleErrorMessage', 'Please enter a title');
    }

    if (!formData.userId) {
      setErrorMessage('userErrorMessage', 'Please choose a user');
    }

    if (!(formData.title.trim()) || !formData.userId) {
      return;
    }

    addTodo({
      id: getNewTodoId(todos),
      title: formData.title,
      completed: false,
      userId: formData.userId,
    });

    clearForm();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue('title', event.target.value);
    setErrorMessage('titleErrorMessage', '');
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldValue('userId', +event.target.value);
    setErrorMessage('userErrorMessage', '');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="todo-form-title">Title: </label>
          <input
            type="text"
            id="todo-form-title"
            data-cy="titleInput"
            onChange={handleTitleChange}
            value={formData.title}
            placeholder="Enter a title"
          />
          {formErrors.titleErrorMessage && (
            <span className="error">{formErrors.titleErrorMessage}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="todo-form-user">User: </label>
          <select
            id="todo-form-user"
            data-cy="userSelect"
            onChange={handleUserIdChange}
            value={formData.userId}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {formErrors.userErrorMessage && (
            <span className="error">{formErrors.userErrorMessage}</span>
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
