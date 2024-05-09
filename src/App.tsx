import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { generateUserOption } from './services/generateUserOptions';
import { handleChange } from './handlers/handleChange';
import { UseFormState } from './states/formState';
import { useTouchedState } from './states/touchedState';
import { formSubmit } from './handlers/formSubmit';
import { TodoList } from './components/TodoList';
import { useTodos } from './states/todosFromTheServer';

export const App = () => {
  const currentUsers = [...usersFromServer]; // for the future improvements

  // #region hooks
  // custom hooks to recall
  const [formState, setFormState] = UseFormState();
  const [touchedState, setTouchedState] = useTouchedState();
  const [currentTodos, setCurrentTodos] = useTodos(todosFromServer);
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
            // onBlur={event => handleBlur(event, setTouchedState)}
          />
          {touchedState.title && formState.title === '' && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          {generateUserOption(
            currentUsers,
            formState,
            setFormState,
            touchedState,
          )}

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
