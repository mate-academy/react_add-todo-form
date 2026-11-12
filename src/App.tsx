import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import type { Todo } from './types';

const initialTodos: Todo[] = todosFromServer.map(todo => {
  const user = usersFromServer.find(
    currentUser => currentUser.id === todo.userId,
  );

  if (!user) {
    throw new Error(`User with id ${todo.userId} was not found`);
  }

  return { ...todo, user };
});

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [showTitleError, setShowTitleError] = useState(false);
  const [showUserError, setShowUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const selectedUser = usersFromServer.find(
      user => user.id === Number(selectedUserId),
    );

    setShowTitleError(!trimmedTitle);
    setShowUserError(!selectedUser);

    if (!trimmedTitle || !selectedUser) {
      return;
    }

    setTodos(currentTodos => [
      ...currentTodos,
      {
        id:
          currentTodos.reduce(
            (largestId, todo) => Math.max(largestId, todo.id),
            0,
          ) + 1,
        title: trimmedTitle,
        userId: selectedUser.id,
        completed: false,
        user: selectedUser,
      },
    ]);
    setTitle('');
    setSelectedUserId('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="todo-title">Title</label>
          <input
            id="todo-title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(
                event.target.value.replace(
                  /[^A-Za-zА-Яа-яЁёІіЇїЄєҐґ0-9 ]/g,
                  '',
                ),
              );
              setShowTitleError(false);
            }}
          />
          {showTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="todo-user">User</label>
          <select
            id="todo-user"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(event.target.value);
              setShowUserError(false);
            }}
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

          {showUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
