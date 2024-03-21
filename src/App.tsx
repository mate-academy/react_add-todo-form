import React, { ChangeEvent, FormEvent, useState } from 'react';
import fetchedUsers from './api/users';
import fetchedTodos from './api/todos';
import { User } from './Types';
import { TodoList } from './components/TodoList';
import './App.scss';

const todosWithAssociatedUsers = fetchedTodos.map(todo => ({
  ...todo,
  user: fetchedUsers.find(user => user.id === todo.userId),
}));

export const App = () => {
  const [todoItems, setTodoItems] = useState(todosWithAssociatedUsers);
  const [formValues, setFormValues] = useState({ title: '', user: '' });
  const [isValidTitle, setIsValidTitle] = useState(false);
  const [isValidUser, setIsValidUser] = useState(false);
  const [displayTitleError, setDisplayTitleError] = useState(false);
  const [displayUserError, setDisplayUserError] = useState(false);
  // const [nextId, setNextId] = useState(todoItems.length + 1);

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
      user: value,
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
      user => user.name === formValues.user,
    ) as User;

    // const newId = [...todoItems].sort((a, b) => b.id - a.id)[0].id + 1;
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
      user: '',
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
              value={formValues.user}
              onChange={handleSelectChange}
            >
              <option value="" disabled>
                Choose a user
              </option>
              {fetchedUsers.map(user => (
                <option key={user.id} value={user.name}>
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
