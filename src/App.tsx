import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoUser } from './types/TodoUser';
import { User } from './types/User';

const todos: TodoUser[] = todosFromServer.map(todoFromServer => {
  return {
    ...todoFromServer,
    user:
      usersFromServer.find(
        userFromServer => userFromServer.id === todoFromServer.userId,
      ) || null,
  };
});

const pattern = /[^a-zA-Zа-яА-Я0-9ІіЇїҐґЄє ]/g;

export const App = () => {
  const [todosList, setTodosList] = useState<TodoUser[]>(todos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const maxId: number = Math.max(...todosList.map(todo => todo.id));

  function reset() {
    setTitle('');
    setUserId(0);
    setHasTitleError(false);
    setHasUserError(false);
  }

  function normalizeTitle(newTitle: string) {
    const validTitle = newTitle.replace(pattern, '');

    setHasTitleError(false);

    return validTitle;
  }

  function handleNewTodo(event: React.FormEvent) {
    event.preventDefault();

    const hasError = !title || !userId;

    if (hasError) {
      if (!title) {
        setHasTitleError(true);
      }

      if (!userId) {
        setHasUserError(true);
      }

      return;
    }

    const selectedUser: User | null =
      usersFromServer.find(user => user.id === userId) || null;

    if (!selectedUser) {
      return;
    }

    const newTodo: TodoUser = {
      id: maxId + 1,
      title,
      userId,
      completed: false,
      user: selectedUser,
    };

    setTodosList(currentList => {
      return [...currentList, newTodo];
    });

    reset();
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => handleNewTodo(event)}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            value={title}
            data-cy="titleInput"
            onChange={event => setTitle(normalizeTitle(event.target.value))}
            placeholder="Enter a title"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>

          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              setHasUserError(false);
            }}
            required
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

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todosList} />
    </div>
  );
};
