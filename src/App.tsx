import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { ITodo, ITodoWithUser } from './types/todo';
import { TodoList } from './components/TodoList';

export const App:React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>(todosFromServer);

  const todosWithUser: ITodoWithUser[] = todos.map((todo) => {
    const user = usersFromServer.find((_user) => _user.id === todo.userId);

    return {
      ...todo,
      user,
    };
  });

  const newId = todos.map((todo) => todo.id).sort((a, b) => b - a)[0] + 1;

  const initialFormValues: ITodo = {
    id: newId,
    title: '',
    completed: false,
    userId: 0,
  };

  const [formValues, setFormValues] = useState<ITodo>(initialFormValues);
  const [errorMessageForTitle, setErrorMessageForTitle] = useState('');
  const [errorMessageForUser, setErrorMessageForUser] = useState('');

  const handleFormChange = (name: string, value: string | number) => {
    if (name === 'title') {
      setErrorMessageForTitle('');
    }

    if (name === 'userId') {
      setErrorMessageForUser('');
    }

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formValues.title) {
      setErrorMessageForTitle('Please enter a title');
    }

    if (!formValues.userId) {
      setErrorMessageForUser('Please choose a user');
    }

    if (!formValues.title || !formValues.userId) {
      return;
    }

    setTodos([
      ...todos,
      {
        ...formValues,
        title: formValues.title.trim(),
      },
    ]);

    setFormValues(initialFormValues);
  };

  return (
    <div className="App container">
      <h1 className="title">
        Add todo form
      </h1>

      <div className="column is-half">
        <form
          action="/api/todos"
          method="POST"
          className="box"
          onSubmit={handleSubmit}
        >
          <div className="field">
            <input
              className="input is-primary"
              type="text"
              data-cy="titleInput"
              placeholder="Title"
              value={formValues.title}
              onChange={(event) => {
                handleFormChange('title', event.target.value.trimStart());
              }}
            />

            {errorMessageForTitle && (
              <span className="error">{errorMessageForTitle}</span>
            )}
          </div>

          <div
            className="is-flex
            is-justify-content-space-between is-align-content-center"
          >
            <div className="field select is-primary">
              <select
                data-cy="userSelect"
                value={formValues.userId}
                onChange={
                  (event) => handleFormChange('userId', +event.target.value)
                }
              >
                <option value="0" disabled>Choose a user</option>
                {usersFromServer.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>

              {errorMessageForUser && (
                <span className="error">{errorMessageForUser}</span>
              ) }
            </div>

            <button
              type="submit"
              data-cy="submitButton"
              className="button is-primary are-large"
            >
              Add
            </button>
          </div>
        </form>

        <TodoList todos={todosWithUser} />
      </div>
    </div>
  );
};
