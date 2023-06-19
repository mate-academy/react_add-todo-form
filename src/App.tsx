import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const getUserById = (userId: number): User | null => (
  usersFromServer.find((user) => (user.id === userId)) || null
);

const getUserByName = (userName: string): User | null => (
  usersFromServer.find((user) => (user.name === userName)) || null
);

const newTodos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(newTodos);
  const [selectedUser, setSelectedUser] = useState('');
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isUserValid, setIsUserValid] = useState(true);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
    setIsTitleValid(Boolean(value));
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelectedUser(value);
    setIsUserValid(Boolean(value));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsTitleValid(Boolean(title.trim()));
    setIsUserValid(Boolean(selectedUser));

    if (!title.trim() || !selectedUser) {
      return;
    }

    setTodos((currentTodos) => {
      const maxToDoId = Math.max(...currentTodos.map(todo => todo.id));
      const newUser = getUserByName(selectedUser);

      return [
        ...currentTodos,
        {
          id: maxToDoId + 1,
          title,
          completed: false,
          userId: newUser ? newUser.id : null,
          user: newUser,
        },
      ];
    });

    setTitle('');
    setSelectedUser('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label>
            Title:
            <input
              data-cy="titleInput"
              type="text"
              placeholder="Your Title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>

          {!isTitleValid && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={handleUserChange}
            >
              <option value="" disabled>
                Choose a user
              </option>

              {usersFromServer.map((user) => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {!isUserValid && (
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
