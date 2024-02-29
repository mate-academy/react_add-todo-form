import { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (titleError) {
      setTitleError(false);
    }
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);

    if (userIdError) {
      setUserIdError(false);
    }
  };

  const resetForm = () => {
    setUserId(0);
    setTitle('');
  };

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimedTitle = title.trim();

    setTitleError(!trimedTitle);
    setUserIdError(!userId);

    if (!trimedTitle || !userId) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id + 1));

    const newTodo = {
      id: newId,
      title: trimedTitle,
      completed: false,
      userId,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleChange}>
        <div className="field">
          <label htmlFor="title">Title: </label>

          <input
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="author">Author: </label>

          <select
            data-cy="userSelect"
            id="author"
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
