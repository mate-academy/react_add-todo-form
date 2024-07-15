import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const [selectedUser, setSelectedUser] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const [inputText, setInputText] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(false);
    setUserError(false);

    if (inputText.trim() === '') {
      setTitleError(true);
    }

    if (selectedUser === 0) {
      setUserError(true);
    }

    if (inputText.trim() && selectedUser !== 0) {
      const newTodo = {
        id: todos.length + 1,
        title: inputText,
        completed: false,
        userId: selectedUser,
      };

      setTodos([...todos, newTodo]);
      setInputText('');
      setSelectedUser(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={inputText}
            onChange={event => setInputText(event.target.value)}
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={event => setSelectedUser(+event.target.value)}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todosOnList={todos} />
    </div>
  );
};
