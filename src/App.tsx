import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentUserId, setCurrentUserId] = useState(0);
  const [todos, setTodos] = useState(todosFromServer);
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const isFormValid = currentTitle.trim() && currentUserId;

  const formReset = () => {
    setCurrentTitle('');
    setCurrentUserId(0);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFormValid) {
      const newTodo = {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title: currentTitle,
        userId: currentUserId,
        completed: false,
      };

      setTodos([...todos, newTodo]);

      formReset();
    } else {
      setWasSubmitted(true);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={onSubmit}>
        <div className="field">
          <lable className="lable" htmlFor="titleInput">
            Title:{' '}
          </lable>

          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={currentTitle}
            onChange={event => setCurrentTitle(event.target.value)}
          />
          {wasSubmitted && !currentTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <lable htmlFor="userId">User: </lable>
          <select
            id="userId"
            data-cy="userSelect"
            value={currentUserId}
            onChange={event => setCurrentUserId(+event.target.value)}
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

          {wasSubmitted && !currentUserId && (
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
