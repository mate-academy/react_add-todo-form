import { useState, FormEvent } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { getUserByID, getNewTodoId } from './utils';

const todosWithUser = todosFromServer.map(todo => ({
  ...todo,
  user: getUserByID(usersFromServer, todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todosWithUser);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    const filteredValue = inputValue.replace(/[^a-zA-Zа-яА-ЯёЁ0-9\s]/g, '');

    setTitle(filteredValue);
    setTitleError(false);
  };

  const handleUserSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
    setUserError(false);
  };

  const clearForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setTitleError(true);
    }

    if (!userId) {
      setUserError(true);
    }

    if (trimmedTitle && userId) {
      const newTodo = {
        id: getNewTodoId(todos),
        title: trimmedTitle,
        userId,
        completed: false,
        user: getUserByID(usersFromServer, userId),
      };

      setTodos(prevTodos => [...prevTodos, newTodo]);

      clearForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            name="title"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            name="user"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserSelect}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(({ id, name }) => (
              <option value={id} key={id}>
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
