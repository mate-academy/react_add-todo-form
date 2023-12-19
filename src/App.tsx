import React, {
  ChangeEvent, FormEvent, useState,
} from 'react';
import fetchedUsers from './api/users';
import fetchedTodos from './api/todos';
import { User } from './types';
import { TodoList } from './components/TodoList';
import './App.scss';

const todosWithAssociatedUsers = fetchedTodos.map(todo => ({
  ...todo,
  user: fetchedUsers.find(user => user.id === todo.userId),
}));

export const App = () => {
  const [todoItems, setTodoItems] = useState(todosWithAssociatedUsers);
  const [formValues, setFormValues] = useState({ title: '', user: '' });
  const [titleValidation, setTitleValidation] = useState({
    value: '',
    isValid: false,
    displayError: false,
  });

  const [userValidation, setUserValidation] = useState({
    value: '',
    isValid: false,
    displayError: false,
  });

  const handleTitleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trimStart();

    setTitleValidation(prevValidation => ({
      ...prevValidation,
      displayError: !value,
      isValid: !!value,
      value,
    }));

    setFormValues(prevValues => ({
      ...prevValues,
      title: value,
    }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserValidation(prevValidation => ({
      ...prevValidation,
      displayError: !value,
      isValid: !!value,
      value,
    }));

    setFormValues(prevValues => ({
      ...prevValues,
      user: value,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!titleValidation.isValid || !userValidation.isValid) {
      setTitleValidation(prevValidation => ({
        ...prevValidation,
        displayError: !prevValidation.isValid,
      }));
      setUserValidation(prevValidation => ({
        ...prevValidation,
        displayError: !prevValidation.isValid,
      }));

      return;
    }

    const selectedUser = fetchedUsers.find(
      user => user.name === formValues.user,
    ) as User;

    const newId = ([...todoItems].sort(
      (a, b) => b.id - a.id,
    )[0].id + 1);

    setTodoItems(prevTodos => ([
      ...prevTodos,
      {
        id: newId,
        title: formValues.title,
        completed: false,
        userId: selectedUser.id,
        user: selectedUser,
      },
    ]));

    setFormValues({
      title: '',
      user: '',
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        onSubmit={handleSubmit}
        action="/api/todos"
        method="POST"
      >
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
            {(titleValidation.displayError && !titleValidation.isValid) && (
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
              <option value="" disabled>Choose a user</option>
              {
                fetchedUsers.map(user => (
                  <option key={user.id} value={user.name}>{user.name}</option>
                ))
              }
            </select>
            {(userValidation.displayError && !userValidation.isValid) && (
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
