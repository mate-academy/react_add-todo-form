import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/user';
import { findUserById } from './services/findUserById';
import { getNextTodoId } from './services/getNextTodoId';
import { Todo } from './types/todo';

interface FormFileds {
  title: string;
  user: User | undefined;
}

export const App = () => {
  const [titleError, setEmptyTitleFieldError] = useState(false);
  const [userError, setEmptyUserFieldError] = useState(false);

  const [todosList, setTodosList] = useState<Todo[]>(todosFromServer);

  const [formData, setFormData]
    = useState<FormFileds>({ title: '', user: undefined });

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setEmptyTitleFieldError(!formData.title.trim());
    setEmptyUserFieldError(!formData.user);

    if (!formData.title.trim() || !formData.user) {
      return;
    }

    setTodosList(prevTodos => [...prevTodos, {
      id: getNextTodoId(todosList),
      title: formData.title.trim(),
      completed: false,
      userId: formData.user ? formData.user.id : 0,
    }]);

    const form = event.target as HTMLFormElement;

    form.reset();

    setFormData(({ title: '', user: undefined }));
  };

  const keyCheck = (event: React.KeyboardEvent) => {
    if (!/^[A-Za-zА-Яа-яЁёіїєґҐґ ]*$/
      .test(event.key)) {
      event.preventDefault();
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const user = findUserById(+event.currentTarget.value);

    setFormData({
      title: formData.title,
      user: user || undefined,
    });

    setEmptyUserFieldError(false);
  };

  const handleTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      title: event.currentTarget.value,
    });

    setEmptyTitleFieldError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            placeholder="Enter a title"
            id="title"
            onInput={handleTitleChange}
            type="text"
            data-cy="titleInput"
            onKeyDown={keyCheck}
          />
          {titleError
            && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            defaultValue={0}
            onChange={handleUserChange}
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
          {userError
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
