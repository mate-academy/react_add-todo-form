import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(() => {
    return todosFromServer.map(todo => {
      const matchingUser = usersFromServer.find(
        user => user.id === todo.userId,
      );

      return {
        ...todo,
        user: matchingUser || {
          id: 0,
          name: 'Unknown',
          username: '',
          email: '',
        },
      };
    });
  });

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let isError = false;

    if (title.trim() === '') {
      setHasTitleError(true);
      isError = true;
    }

    if (userId === '0') {
      setHasUserError(true);
      isError = true;
    }

    if (isError) {
      return;
    }

    const selectedUser = usersFromServer.find(
      user => user.id === Number(userId),
    );

    if (!selectedUser) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id)) + 1;

    const newTodo = {
      id: newId,
      title: title.trim(),
      userId: Number(userId),
      completed: false,
      user: selectedUser,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    setTitle('');
    setUserId('0');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter title"
            value={title}
            onChange={event => {
              const rawText = event.target.value;

              const cleanText = rawText.replace(
                /[^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s]/g,
                '',
              );

              setTitle(cleanText);
              setHasTitleError(false);
            }}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(event.target.value);
              setHasUserError(false);
            }}
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

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
