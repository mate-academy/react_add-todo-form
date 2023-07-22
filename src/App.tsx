import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/todo';
import { User } from './types/user';

const getNewUser = (userId: number): User | null => {
  return usersFromServer.find(
    user => user.id === userId,
  ) || null;
};

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getNewUser(todo.userId),
}));

export const App = () => {
  const [newTitle, setNewTitle] = useState('');
  const [newUserId, setNewUserId] = useState(0);
  const [errorTitleMessage, setErrorTitleMessage] = useState(false);
  const [errorUserMessage, setErrorUserMessage] = useState(false);
  const [newTodos, setNewTodos] = useState(todos);

  const addNewTodo = () => {
    if (newUserId && newTitle) {
      const newTodo = {
        id: Math.max(...newTodos.map(todo => todo.id)) + 1,
        userId: newUserId,
        completed: false,
        title: newTitle,
        user: getNewUser(newUserId),
      };

      setNewTodos((prevTodos) => ([...prevTodos, newTodo]));
      setNewUserId(0);
      setNewTitle('');
      setErrorTitleMessage(false);
      setErrorUserMessage(false);
    }

    if (!newTitle) {
      setErrorTitleMessage(true);
    }

    if (!newUserId) {
      setErrorUserMessage(true);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorTitleMessage(!newTitle.trim());

    setErrorUserMessage(!newUserId);

    if (!newTitle.trim() || !newUserId) {
      return;
    }

    addNewTodo();
  };

  const handleUserSelectChange
    = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setNewUserId(+event.target.value);

      setErrorUserMessage(false);
    };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedTitle
      = event.target.value.replace(/[^A-Za-zА-Яа-я0-9\s]/g, '');

    setErrorTitleMessage(!sanitizedTitle.trim());

    setNewTitle(sanitizedTitle);
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
          <label htmlFor="titleInput">Title:</label>

          <input
            placeholder="Enter a title"
            type="text"
            id="titleInput"
            data-cy="titleInput"
            value={newTitle}
            onChange={handleTitleChange}
            onFocus={() => setErrorTitleMessage(false)}
          />
          {errorTitleMessage && (
            <span className="error"> Please enter a title </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:</label>

          <select
            id="userSelect"
            data-cy="userSelect"
            name="user"
            value={newUserId}
            onChange={handleUserSelectChange}
            onFocus={() => setErrorUserMessage(false)}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {errorUserMessage && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
