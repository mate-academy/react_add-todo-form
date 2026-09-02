import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [userId, setUserId] = useState(0);
  const [errors, setErrors] = useState({
    title: false,
    user: false,
  });
  const [title, setTitle] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    setErrors(prev => ({
      ...prev,
      title: false,
    }));
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));

    setErrors(prev => ({
      ...prev,
      user: false,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const hasTitleError = !title.trim();
    const hasUserError = userId === 0;

    if (hasTitleError || hasUserError) {
      setErrors({
        title: hasTitleError,
        user: hasUserError,
      });

      return;
    }

    const todosId: number[] = [];

    todos.map(todo => todosId.push(todo.id));

    const maxId = Math.max(...todos.map(todo => todo.id));

    setTodos([
      ...todos,
      {
        id: maxId + 1,
        title: title,
        completed: false,
        userId: userId,
      },
    ]);

    setTitle('');
    setUserId(0);
  };

  const todosWithUsers = todos.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId)!,
  }));

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Title"
          />
          {errors.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0">Choose a user</option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errors.user && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosWithUsers} />
    </div>
  );
};
