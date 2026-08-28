import './App.scss';
import { useState, ChangeEvent, FormEvent } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const DISALLOWED_TITLE_CHARS = /[^a-zA-Zа-яА-ЯіїєґІЇЄҐ0-9 ]/g;

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value.replace(DISALLOWED_TITLE_CHARS, ''));
    setHasTitleError(false);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const titleTrimmed = title.trim();

    setHasTitleError(!titleTrimmed);
    setHasUserError(userId === 0);

    if (!titleTrimmed || userId === 0) {
      return;
    }

    const newId = Math.max(0, ...todos.map(todo => todo.id)) + 1;
    const newTodo = {
      id: newId,
      title: titleTrimmed,
      userId,
      completed: false,
      user: getUserById(userId),
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
  }

  function handleUserChange(event: ChangeEvent<HTMLSelectElement>) {
    setUserId(Number(event.target.value));
    setHasUserError(false);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUserChange}
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
          </label>

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
