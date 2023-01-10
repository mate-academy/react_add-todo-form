import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function findUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todoWithUser: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(todo.userId),
}));

function findUserByName(userName: string): User | null {
  return usersFromServer.find(user => user.name === userName) || null;
}

export const App = () => {
  const [todos, setTodos] = useState(todoWithUser);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserNameError, setIsUserNameError] = useState(false);

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedUser && title) {
      setTodos(todosPrev => {
        const maxTodoId = Math.max(...todosPrev.map(todo => todo.id));
        const newUser = findUserByName(selectedUser);

        setTitle('');
        setSelectedUser('');

        return [
          ...todosPrev,
          {
            id: maxTodoId + 1,
            userId: newUser ? newUser.id : null,
            title,
            completed: false,
            user: newUser,
          },
        ];
      });
    }

    if (!selectedUser) {
      setIsUserNameError(true);
    }

    if (!title) {
      setIsTitleError(true);
    }
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleError(false);
  };

  const handleChangeSelectedUser
    = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedUser(event.target.value);
      setIsUserNameError(false);
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
          <label htmlFor="text">Title: </label>
          <input
            data-cy="titleInput"
            type="text"
            id="title"
            name="title"
            placeholder="Enter a title"
            value={title}
            onChange={handleChangeTitle}
          />

          {isTitleError && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            name="userSelect"
            value={selectedUser}
            onChange={handleChangeSelectedUser}
          >
            <option value="" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.name}>{user.name}</option>
            ))}
          </select>

          {isUserNameError && (
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

      <TodoList todos={todos} />
    </div>
  );
};
