import './App.scss';
import React, { ChangeEvent, FormEvent, useState } from 'react';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    switch (event.target.id) {
      case 'titleInput':
        setTitleError(false);
        setTitle(event.target.value);
        break;

      case 'userSelect':
        setUserError(false);
        setSelectedUser(getUser(+(event.target.value)));
        break;

      default:
        break;
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!selectedUser) {
      setUserError(true);
    }

    if (!title || !selectedUser) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title,
      userId: selectedUser ? selectedUser.id : -1,
      completed: false,
      user: selectedUser,
    };

    setVisibleTodos([...visibleTodos, newTodo]);
    setTitle('');
    setSelectedUser(null);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            id="titleInput"
            placeholder="Enter a title"
            data-cy="titleInput"
            pattern="[a-zA-Zа-яА-Я0-9\s]*"
            title="Only letters (ua and en), digits, and spaces are allowed."
            value={title}
            onChange={handleChange}
          />
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            placeholder="Choose a user"
            data-cy="userSelect"
            value={selectedUser ? selectedUser.id : -1}
            onChange={handleChange}
          >
            <option value="">Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && (
            <span className="error">Please choose a user</span>
          )}

        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />

    </div>
  );
};
