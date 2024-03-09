import { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import './App.scss';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (titleError) {
      setTitleError(false);
    }
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserError(false);
  };

  const resetForm = () => {
    setUserId(0);
    setTitle('');
  };

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimedTitle = title.trim();

    setTitleError(!trimedTitle);
    setUserError(!trimedTitle);

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
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>
        <div className="field">
          <label htmlFor="author">Author: </label>
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0">Choose a user</option>
            {usersFromServer
              .filter(user => user.id !== 0)
              .map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
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
