import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState, useMemo } from 'react';
import { TodoAndUser, Todo, User } from './components/Types/Types';
import { TodoList } from './components/TodoList';

const mapTodosWithUsers = (todos: Todo[], users: User[]): TodoAndUser[] => {
  return todos
    .map(todo => {
      const foundUser = users.find(user => user.id === todo.userId);

      if (!foundUser) {
        return null;
      }

      return { ...todo, user: foundUser };
    })
    .filter((t): t is TodoAndUser => t !== null);
};

export const App = () => {
  const initialTodos = useMemo(
    () => mapTodosWithUsers(todosFromServer, usersFromServer),
    [],
  );

  const [todos, setTodos] = useState<TodoAndUser[]>(initialTodos);

  const [title, setTitle] = useState('');
  const [currentUserId, setCurrentUserId] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleOnTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleOnSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentUserId(+event.target.value);
    setUserError(false);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let isValidValues = true;
    const isValidTitle = title.replace(/[^a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9 ]/g, '');

    if (!isValidTitle.trim()) {
      setTitleError(true);
      isValidValues = false;
    }

    if (currentUserId === 0) {
      setUserError(true);
      isValidValues = false;
    }

    if (!isValidValues) {
      return;
    }

    const foundUser = usersFromServer.find(user => user.id === currentUserId);

    if (!foundUser) {
      setUserError(true);

      return;
    }

    const newId = Math.max(0, ...todos.map(todo => todo.id)) + 1;

    const newTodo: TodoAndUser = {
      id: newId,
      title: isValidTitle.trim(),
      userId: currentUserId,
      completed: false,
      user: foundUser,
    };

    setTodos(prev => [...prev, newTodo]);

    setTitle('');
    setCurrentUserId(0);
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" onSubmit={handleFormSubmit} method="POST">
        <div className="field">
          <label htmlFor="title-input">Title: </label>
          <input
            id="title-input"
            type="text"
            placeholder="Enter a title"
            name="title-input"
            value={title}
            data-cy="titleInput"
            onChange={handleOnTitle}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-selection">User: </label>
          <select
            id="user-selection"
            data-cy="userSelect"
            value={currentUserId}
            onChange={handleOnSelect}
            name="user-selection"
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
