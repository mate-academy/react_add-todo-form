import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const preparedTodos = todosFromServer.map(todo => {
    const user = usersFromServer.find(u => u.id === todo.userId);

    return {
      ...todo,
      user: user ?? undefined,
    };
  });

  const [todos, setTodos] = useState(preparedTodos);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => {
          event.preventDefault();
          setTitleError(!title.trim());
          setUserError(!userId);

          if (!title.trim() || !userId) {
            return;
          }

          const user = usersFromServer.find(u => u.id === Number(userId));

          const newTodo = {
            id: Math.max(0, ...todos.map(t => t.id)) + 1,
            title: title.trim(),
            completed: false,
            userId: Number(userId),
            user: user ?? undefined,
          };

          setTodos(prev => [...prev, newTodo]);

          setTitle('');
          setUserId('');
          setTitleError(false);
          setUserError(false);
        }}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={event => {
              const value = event.target.value.replace(
                /[^a-zA-Zа-яА-Я0-9 ]/g,
                '',
              );

              setTitle(value);

              if (titleError) {
                setTitleError(false);
              }
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(event.target.value);
              if (userError) {
                setUserError(false);
              }
            }}
          >
            <option value="" disabled>
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

      <TodoList todos={todos} />
    </div>
  );
};
