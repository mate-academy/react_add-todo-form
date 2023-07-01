import { useState } from 'react';

// Data
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

// Utils
import { getUser } from './services/getUser';
import { findUserById } from './services/findUserById';

// Types
import { Todo } from './types/Todo';

// Components
import { TodoList } from './components/TodoList';

// Styles
import './App.scss';

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [renderedTodos, setRenderedTodos] = useState(todos);

  const [inputValue, setInputValue] = useState('');
  const [hasInputError, setHasInputError] = useState(false);

  const [selectValue, setSelectValue] = useState(0);
  const [hasSelectError, setHasSelectError] = useState(false);

  const getLargestId = () => {
    const todosIdArray = renderedTodos.map(todo => todo.id);

    return Math.max(...todosIdArray);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setHasInputError(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(+event.target.value);
    setHasSelectError(false);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasInputError(!inputValue);
    setHasSelectError(!selectValue);

    if (!inputValue || !selectValue) {
      return;
    }

    setRenderedTodos([
      ...renderedTodos,
      {
        id: getLargestId() + 1,
        title: inputValue,
        userId: selectValue,
        completed: false,
        user: findUserById(selectValue),
      },
    ]);

    setInputValue('');
    setSelectValue(0);
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
          <input
            type="text"
            data-cy="titleInput"
            value={inputValue}
            onChange={handleInputChange}
          />

          {hasInputError && (
            <span
              className="error"
            >
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectValue}
            onChange={handleSelectChange}
          >
            <option
              value="0"
              disabled
              selected
            >
              Choose a user
            </option>

            {usersFromServer.map(user => {
              const { id, name } = user;

              return (
                <option
                  value={id}
                  key={id}
                >
                  {name}
                </option>
              );
            })}
          </select>

          {hasSelectError && (
            <span
              className="error"
            >
              Please choose a user
            </span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList
        todos={renderedTodos}
      />
    </div>
  );
};
