import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { handleChange } from './handlers/handleChange';
import { formSubmit } from './handlers/formSubmit';
import { TodoList } from './components/TodoList';
import { GenerateUserOption } from './components/GenerateUserOptions';
import { useState } from 'react';

export const App = () => {
  // #region hooks
  const [formState, setFormState] = useState({
    title: '',
    userValue: 0,
  });
  const [touchedState, setTouchedState] = useState({
    title: false,
    userValue: false,
  });
  const [currentTodos, setCurrentTodos] = useState(todosFromServer);
  // #endregion

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event =>
          formSubmit({
            event,
            formState,
            setFormState,
            setTouchedState,
            currentTodos,
            setCurrentTodos,
          })
        }
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            name="title"
            placeholder="Enter a title"
            value={formState.title}
            onChange={event => handleChange(event, setFormState)}
          />
          {touchedState.userValue && formState.title === '' && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <GenerateUserOption
            currentUsers={usersFromServer}
            formState={formState}
            setFormState={setFormState}
            touchedState={touchedState}
          />

          {touchedState.userValue && formState.userValue === 0 && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={currentTodos} />
    </div>
  );
};
