import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';

const VALID_PATTERN_TITLE = /^[a-zA-Zа-яА-ЯїЇєЄіІґҐ0-9\s]+$/;

function getUserById(userId: number): User | undefined {
  return usersFromServer.find(user => user.id === userId) || undefined;
}

function getNewId(todos: Todo[]) {
  if (todos.length === 0) {
    return 0;
  }

  return Math.max(0, ...todos.map(todo => todo.id)) + 1;
}

const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUsers);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [hasUserSelectedError, setHasUserSelectedError] = useState(false);

  const handlerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    if (!VALID_PATTERN_TITLE.test(input)) {
      setTitle('');

      return;
    }

    setTitle(input);
    setHasTitleError(false);
  };

  const handlerSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value.trim());
    setHasUserSelectedError(false);
  };

  const handlerReset = () => {
    setTitle('');
    setSelectedUserId(null);
  };

  const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserSelectedError(!selectedUserId);

    if (!title || !selectedUserId) {
      return;
    }

    const userId = selectedUserId ?? 0;

    const newTodo: Todo = {
      id: getNewId(todos),
      title: title,
      completed: false,
      userId: userId,
      user: getUserById(userId),
    };

    setTodos(currentTodo => [...currentTodo, newTodo]);
    handlerReset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handlerSubmit} action="/api/todos" method="POST">
        <div className="field">
          <input
            placeholder="input title"
            onChange={handlerInput}
            value={title}
            type="text"
            data-cy="titleInput"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            onChange={handlerSelect}
            value={selectedUserId ?? ''}
            data-cy="userSelect"
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserSelectedError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
