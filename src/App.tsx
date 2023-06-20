import { ChangeEvent, useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { getUserById, getNextId } from './helpers';

const refactoredTodos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(refactoredTodos);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [titleValid, setTitleValid] = useState(true);
  const [userValid, setUserValid] = useState(true);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleValid(Boolean(event.target.value));
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setUserValid(Boolean(event.target.value));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleValid(Boolean(title.trim()));
    setUserValid(Boolean(selectedUser));

    if (!selectedUser || !title.trim()) {
      return;
    }

    setTodos((currentTodos) => {
      const nextId = getNextId(currentTodos);
      const newUser = getUserById(selectedUser);

      return [
        ...currentTodos,
        {
          id: nextId,
          title,
          completed: false,
          userId: newUser ? newUser.id : null,
          user: newUser,
        },
      ];
    });

    setTitle('');
    setSelectedUser(0);
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
            {'Title: '}

            <input
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter a title"
            />
            {!titleValid && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            {'User: '}

            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={handleUserChange}
            >
              <option
                value="0"
                disabled
              >
                Choose a user
              </option>

              {usersFromServer.map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>

            {!userValid && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
