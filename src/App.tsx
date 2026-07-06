import './App.scss';
import React from 'react';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types';

const todosWithUsers = todosFromServer.map(todo => {
  const user = usersFromServer.find(
    (currentUser: User) => currentUser.id === todo.userId,
  );

  if (!user) {
    throw new Error(`User with id ${todo.userId} not found`);
  }

  return { ...todo, user };
});

export const App = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(todosWithUsers);
  const [selectedUser, setSelectedUser] = useState('0');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isTitleEmpty = title.trim() === '';
    const isUserNotSelected = selectedUser === '0';

    setHasTitleError(isTitleEmpty);
    setHasUserError(isUserNotSelected);

    if (isTitleEmpty || isUserNotSelected) {
      return;
    }

    const selectedUserObject = usersFromServer.find(
      (currentUser: User) => currentUser.id === Number(selectedUser),
    );

    if (!selectedUserObject) {
      throw new Error(`User with id ${selectedUser} not found`);
    }

    const newId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

    const newTodo = {
      id: newId,
      title: title.trim(),
      completed: false,
      userId: Number(selectedUser),
      user: selectedUserObject,
    };

    setTodos([...todos, newTodo]);

    setTitle('');
    setSelectedUser('0');
    setHasTitleError(false);
    setHasUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setHasTitleError(false);
            }}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={event => {
              setSelectedUser(event.target.value);
              setHasUserError(false);
            }}
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
