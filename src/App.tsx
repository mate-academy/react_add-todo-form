import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number>(0);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    // Дозволяємо лише українські, англійські літери, цифри та пробіли
    const cleanValue = rawValue.replace(/[^a-zA-Z0-9\u0400-\u04FF\s]/g, '');

    setTitle(cleanValue);
    if (hasTitleError) {
      setHasTitleError(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(Number(event.target.value));
    if (hasUserError) {
      setHasUserError(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const isTitleValid = trimmedTitle.length > 0;
    const isUserValid = selectedUserId !== 0;

    if (!isTitleValid) {
      setHasTitleError(true);
    }

    if (!isUserValid) {
      setHasUserError(true);
    }

    if (!isTitleValid || !isUserValid) {
      return;
    }

    const selectedUser = getUserById(selectedUserId);
    const maxId = todos.reduce((max, todo) => Math.max(max, todo.id), 0);

    const newTodo: Todo = {
      id: maxId + 1,
      title: trimmedTitle,
      userId: selectedUserId,
      completed: false,
      user: selectedUser,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setTitle('');
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title-input">Title</label>
          <input
            id="title-input"
            type="text"
            data-cy="titleInput"
            placeholder="Enter title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-select">User</label>
          <select
            id="user-select"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
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

      <TodoList todos={todos} />
    </div>
  );
};
