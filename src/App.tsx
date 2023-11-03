import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/user';
import { findUserById } from './services/findUserById';
import { getNextTodoId } from './services/getNextTodoId';

export const App = () => {
  const [emptyTitleFieldError, setEmptyTitleFieldError] = useState(false);
  const [emptyUserFieldError, setEmptyUserFieldError] = useState(false);
  const [todosList, setTodosList] = useState(todosFromServer);

  const [formData, setFormData]
    = useState<{ title: string, user: User | null }>({ title: '', user: null });

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setEmptyTitleFieldError(!formData.title.trim());
    setEmptyUserFieldError(!formData.user);

    if (!formData.title || !formData.user) {
      return;
    }

    setTodosList([...todosList, {
      id: getNextTodoId(todosList),
      title: formData.title.trim(),
      completed: false,
      userId: formData.user.id,
    }]);

    const form = event.target as HTMLFormElement;

    form.reset();

    setFormData(({ title: '', user: null }));
  };

  const keyCheck = (event: React.KeyboardEvent) => {
    if (!/^[A-Za-zА-Яа-яЁёіїєґҐґ ]*$/
      .test(event.key)) {
      event.preventDefault();
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      title: formData.title,
      user: findUserById(+event.currentTarget.value),
    });

    setEmptyUserFieldError(false);
  };

  const handleTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setFormData({
      title: event.currentTarget.value,
      user: formData.user,
    });

    setEmptyTitleFieldError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => handleFormSubmit(event)}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            placeholder="Enter a title"
            id="title"
            onInput={event => handleTitleChange(event)}
            type="text"
            data-cy="titleInput"
            onKeyDown={keyCheck}
          />
          {emptyTitleFieldError
            && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            defaultValue={0}
            onChange={event => handleUserChange(event)}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {emptyUserFieldError
            && (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todosList} />
    </div>
  );
};
