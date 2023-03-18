import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

function checkEmptyTitle(todoTitle: string): boolean {
  return /^\s*$/.test(todoTitle);
}

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState([...initialTodos]);
  const [newTitle, setTitle] = useState('');
  const [selectedUser, setselectedUser] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const noTitle: boolean = !newTitle || checkEmptyTitle(newTitle);

    if (noTitle) {
      setTitleError(true);
    }

    if (!selectedUser) {
      setUserError(true);
    }

    if (noTitle || !selectedUser) {
      return;
    }

    setTodos((actualTodos) => {
      return [
        ...actualTodos,
        {
          title: newTitle,
          userId: selectedUser,
          completed: false,
          user: getUser(selectedUser),
          id: actualTodos
            .map(({ id }) => id)
            .reduce((prev, next) => Math.max(prev, next), -Infinity) + 1,
        },
      ];
    });
    setTitle('');
    setselectedUser(0);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleError(false);
    setTitle(event.target.value);
  };

  const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserError(false);
    setselectedUser(Number(event.target.value));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleAddTodo}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={newTitle}
            onChange={handleChangeTitle}
          />

          {titleError && (
            <span className="error">&nbsp;Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            name="userSelect"
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleSelectUser}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user) => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {userError && (
            <span className="error">&nbsp;Please choose a user</span>
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
