import { useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

import { Todo } from './types/Todo';
import { User } from './types/User';

function findUserById(userId: number): User | null {
  return usersFromServer.find(({ id }) => id === userId) || null;
}

function createNewIdForNewTodo(todos: Todo[]): number {
  const todosIdentifiers = todos.map(({ id }) => id);

  return Math.max(...todosIdentifiers) + 1;
}

function addNewTodo(
  currentTodos: Todo[],
  title: string,
  userId: number,
): Todo[] {
  const currentTodosCopy = [...currentTodos];

  currentTodosCopy.push({
    id: createNewIdForNewTodo(currentTodosCopy),
    title,
    completed: false,
    userId,
    user: findUserById(userId),
  });

  return currentTodosCopy;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [currentTodos, setCurrentTodos] = useState(todos);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setHasTitleError(true);
    }

    if (!userId) {
      setHasUserError(true);
    }

    if (!userId || !title) {
      return;
    }

    setCurrentTodos(addNewTodo(currentTodos, title, userId));
    setTitle('');
    setUserId(0);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = /^[a-zA-Zа-яА-Я0-9\s\b]*$/;
    const newValue = event.target.value;

    if (pattern.test(newValue)) {
      setTitle(newValue);
      setHasTitleError(false);
    }
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleChangeTitle}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={handleChangeUser}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={currentTodos} />
    </div>
  );
};
