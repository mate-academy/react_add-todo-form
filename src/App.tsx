import './App.scss';
import React, { ChangeEvent, FormEvent, useState } from 'react';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUserById(id: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === id);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNextTodoId(): number {
  return Math.max(...todos.map(todo => todo.id)) + 1;
}

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isTitleError, setIsTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    switch (event.target.id) {
      case 'titleInput':
        setIsTitleError(false);
        setTitle(event.target.value.trimStart());
        break;

      case 'userSelect':
        setUserError(false);
        setSelectedUser(getUserById(+(event.target.value)));
        break;

      default:
        break;
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setIsTitleError(true);
    }

    if (!selectedUser) {
      setUserError(true);
    }

    if (!title || !selectedUser) {
      return;
    }

    const newTodo: Todo = {
      id: getNextTodoId(),
      title,
      userId: selectedUser.id,
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

          {isTitleError && (
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
