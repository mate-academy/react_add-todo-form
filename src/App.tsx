import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './components/types';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer
      .map(todo => {
        const user = usersFromServer.find(umper => umper.id === todo.userId);

        if (!user) {
          return null;
        }

        return {
          ...todo,
          user,
        };
      })
      .filter((todo): todo is Todo => todo !== null),
  );
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');
  const [showErrors, setShowErrors] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowErrors(true);

    const trimmedTitle = title.trim();

    if (!trimmedTitle || userId === '0') {
      return;
    }

    const userIdNumber = parseInt(userId, 10);
    const user = usersFromServer.find(umper => umper.id === userIdNumber);

    if (!user) {
      return;
    }

    const maxId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;
    const newId = maxId + 1;
    const newTodo: Todo = {
      id: newId,
      title: trimmedTitle,
      userId: userIdNumber,
      completed: false,
      user,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId('0');
    setShowErrors(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            id="titleInput"
            name="title"
            placeholder="Enter todo title"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              const filtered = event.target.value.replace(
                /[^А-Яа-яЄєІіЇїҐґA-Za-z0-9\s]/g,
                '',
              );

              setTitle(filtered);
            }}
          />
          {showErrors && !title.trim() && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            name="user"
            data-cy="userSelect"
            value={userId}
            onChange={event => setUserId(event.target.value)}
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

          {showErrors && userId === '0' && (
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
