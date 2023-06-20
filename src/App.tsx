import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo, User } from './components/Types';

function getUserById(userId: number): User | null {
  const userById = usersFromServer.find(user => user.id === userId);

  return userById || null;
}

function getUserByName(name: string): User | null {
  const userByName = usersFromServer.find(user => user.name === name);

  return userByName || null;
}

export const receivedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [titleInput, setTitleInput] = useState('');
  const [userSelect, setUserSelect] = useState('');
  const [todos, setTodos] = useState(receivedTodos);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!titleInput) {
      setTitleError(true);

      return;
    }

    if (!userSelect) {
      setUserError(true);

      return;
    }

    const receivedUser = getUserByName(userSelect);

    const maxTodoId: number = [...todos]
      .sort((todo1, todo2) => todo2.id - todo1.id)[0].id;

    setTodos([
      ...todos,
      {
        id: maxTodoId + 1,
        title: titleInput,
        completed: false,
        userId: receivedUser?.id,
        user: receivedUser,
      },
    ]);
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserSelect(event.target.value);
    setUserError(false);
  };

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value);
    setTitleError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleNewTodo}
      >
        <div className="field">
          <label htmlFor="id">Title:</label>
          <input
            id="id"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={titleInput}
            onChange={handleTitleInput}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="id">User:</label>
          <select
            data-cy="userSelect"
            id="id"
            value={userSelect}
            onChange={handleUserSelect}
          >
            <option
              value=""
              disabled
              selected
            >
              Choose a user
            </option>
            {usersFromServer.map((user) => (
              <option
                value={user.name}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
