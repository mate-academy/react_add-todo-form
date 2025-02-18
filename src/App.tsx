import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo, TodoWithUser } from './types/Todo';
import { useState } from 'react';

export const App = () => {
  const modifyTodos = todosFromServer.map((todo: Todo): TodoWithUser => {
    const user =
      usersFromServer.find((person: User) => person.id === todo.userId) || null;

    return {
      ...todo,
      user,
    };
  });

  const [todos, setTodos] = useState(modifyTodos);
  const [inputField, setInputField] = useState('');
  const [inputFieldError, setInputFieldError] = useState(false);
  const [selectField, setSelectField] = useState('0');
  const [selectFieldError, setSelectFielfError] = useState(false);

  const isInputValid = !!inputField;
  const isSelectValid = selectField !== '0';

  const isFormValid = isInputValid && isSelectValid;

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputField(event.target.value.trimStart());
    setInputFieldError(false);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectField(event.target.value.trim());
    setSelectFielfError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isSelectValid) {
      setSelectFielfError(true);
    }

    if (!isInputValid) {
      setInputFieldError(true);
    }

    if (!isFormValid) {
      return;
    }

    const newTodoId = () => {
      const todosId = todos.map(todo => todo.id);

      return Math.max(...todosId) + 1;
    };

    const findUser =
      usersFromServer.find(user => user.id === +selectField) || null;

    const newTodo: TodoWithUser = {
      id: newTodoId(),
      title: inputField,
      userId: +selectField,
      completed: false,
      user: findUser,
    };

    setTodos(current => [...current, newTodo]);

    setInputField('');
    setSelectField('0');
    setInputFieldError(false);
    setSelectFielfError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            value={inputField}
            onChange={handleInput}
            placeholder="type something"
          />
          {inputFieldError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userId">Choose a user: </label>
          <select
            data-cy="userSelect"
            id="userId"
            value={selectField}
            onChange={handleSelect}
          >
            <option value="0">Choose a user</option>

            {usersFromServer.map((user: User) => {
              return (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {selectFieldError && (
            <span className="error">Please choose a user</span>
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
