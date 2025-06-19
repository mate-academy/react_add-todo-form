import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';

export const App = () => {
  const [userSelect, setUserSelect] = useState<string>('0');
  const [titleInput, setTitleInput] = useState<string>('');
  const [todos, setTodos] = useState(todosFromServer);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const addTodo = (newTodo: (typeof todosFromServer)[number]) => {
    if (titleInput.trim() === '' || userSelect === '0') {
      return;
    }

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setTitleInput('');
    setUserSelect('0');
  };

  const resetForm = () => {
    setTitleInput('');
    setUserSelect('0');
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={e => {
          e.preventDefault();

          if (titleInput.trim() === '' || userSelect === '0') {
            return;
          }

          const newTodo = {
            id: todos.length + 1,
            userId: +userSelect,
            title: titleInput,
            completed: false,
          };

          addTodo(newTodo);
          resetForm();
        }}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={titleInput}
            onChange={e => setTitleInput(e.target.value)}
          />
          <span className="error">
            {titleError ? 'Please enter a title' : ''}
          </span>
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userSelect}
            onChange={e => setUserSelect(e.target.value)}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.username})
              </option>
            ))}
          </select>

          <span className="error">
            {userError ? 'Please choose a user' : ''}
          </span>
        </div>
        <button
          type="submit"
          data-cy="submitButton"
          className="button button--primary"
          onClick={() => {
            if (titleInput.trim() === '') {
              setTitleError(true);
            } else {
              setTitleError(false);
            }

            if (userSelect === '0') {
              setUserError(true);
            } else {
              setUserError(false);
            }
          }}
        >
          Add
        </button>
      </form>
      <TodoList user={usersFromServer} todos={todos} />
    </div>
  );
};
