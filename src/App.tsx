
import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users.ts';
import todosFromServer from './api/todos.ts';
import { TodoList } from './components/TodoList/TodoList.tsx';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [errors, setErrors] = useState({
    titleError: '',
    userError: '',
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let titleError = '';
    let userError = '';

    if (!title.trim()) {
      titleError = 'Please enter a title';
    }

    if (!userId) {
      userError = 'Please choose a user';
    }

    if (titleError || userError) {
      setErrors({
        titleError,
        userError,
      });

      return;
    }

    const user = usersFromServer.find(
      item => item.id === Number(userId),
    );

    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id), 0) + 1,
      title: title.trim(),
      userId: Number(userId),
      completed: false,
      user,
    };

    setTodos([
      ...todos,
      newTodo,
    ]);

    setTitle('');
    setUserId('');

    setErrors({
      titleError: '',
      userError: '',
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">
            Title
          </label>

          <input
            id="title"
            type="text"
            placeholder="Title"
            data-cy="titleInput"
            value={title}
            onChange={changeEvent => {
              setTitle(changeEvent.target.value);
              setErrors({
                ...errors,
                titleError: '',
              });
            }}
          />

          {errors.titleError && (
            <span className="error">
              {errors.titleError}
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">
            User
          </label>

          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={changeEvent => {
              setUserId(changeEvent.target.value);
              setErrors({
                ...errors,
                userError: '',
              });
            }}
          >
            <option value="">
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {errors.userError && (
            <span className="error">
              {errors.userError}
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
        todos={todos}
        users={usersFromServer}
      />
    </div>
  );
};
