import React, { ChangeEvent, FormEvent, useState } from 'react';
import fetchedUsers from './api/users';
import fetchedTodos from './api/todos';
import { User } from './Types';
import { TodoList } from './components/TodoList';
import './App.scss';

const todosWithUsers = fetchedTodos.map(todo => ({
  ...todo,
  user: fetchedUsers.find(user => user.id === todo.userId),
}));

export const App = () => {
  const [todoItems, setTodoItems] = useState(todosWithUsers);
  const [formValues, setFormValues] = useState({ title: '', id: '' });
  const [isValidTitle, setIsValidTitle] = useState(false);
  const [isValidUser, setIsValidUser] = useState(false);
  const [displayTitleError, setDisplayTitleError] = useState(false);
  const [displayUserError, setDisplayUserError] = useState(false);

  const handleTitleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trimStart();

    setDisplayTitleError(!!value);
    setIsValidTitle(!!value);

    setFormValues(prevValues => ({
      ...prevValues,
      title: value,
    }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setDisplayUserError(!!value);
    setIsValidUser(!!value);

    setFormValues(prevValues => ({
      ...prevValues,
      id: value,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!isValidTitle || !isValidUser) {
      if (!isValidTitle) {
        setDisplayTitleError(true);
      }

      if (!isValidUser) {
        setDisplayUserError(true);
      }

      return;
    }

    const selectedUser = fetchedUsers.find(
      user => user.id === +formValues.id,
    ) as User;

    const maxId = Math.max(...todoItems.map(todo => todo.id));

    setTodoItems(prevTodos => [
      ...prevTodos,
      {
        id: maxId + 1,
        title: formValues.title,
        completed: false,
        userId: selectedUser.id,
        user: selectedUser,
      },
    ]);

    setFormValues({
      title: '',
      id: '',
    });

    setIsValidTitle(false);
    setIsValidUser(false);
    setDisplayTitleError(false);
    setDisplayUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form onSubmit={handleSubmit} action="/api/todos" method="POST">
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={formValues.title}
              onChange={handleTitleInputChange}
            />
            {displayTitleError && !isValidTitle && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              id="userSelect"
              data-cy="userSelect"
              value={formValues.id}
              onChange={handleSelectChange}
            >
              <option value="" disabled>
                Choose a user
              </option>
              {fetchedUsers.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {displayUserError && !isValidUser && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoItems} />
    </div>
  );
};
