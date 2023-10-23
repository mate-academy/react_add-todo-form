import { useState } from 'react';

import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [userError, setUserError] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!inputValue) {
      setInputError(true);
    }

    if (!selectedUserId) {
      setUserError(true);
    }

    if (inputValue && selectedUserId) {
      setTodos((currentTodos) => [...currentTodos, {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title: inputValue,
        completed: false,
        userId: selectedUserId,
      }]);
      setInputValue('');
      setSelectedUserId(0);
      setUserError(false);
      setInputError(false);
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleSubmit}
      >
        <div className="field">
          Title:&nbsp;

          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
              setInputError(false);
            }}
          />

          {inputError && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          User:&nbsp;

          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(+event.target.value);
              setUserError(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {userError && (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
