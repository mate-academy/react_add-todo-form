import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { User } from './types/User';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

function getUser(userId: number): User {
  const userFound = usersFromServer.find(user => user.id === userId);

  if (!userFound) {
    throw new Error('User not found');
  }

  return userFound;
}

const initialTodos: Todo[] = todosFromServer.map(todo => {
  return { ...todo, user: getUser(todo.userId) };
});

export const App = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [selectedUser, setSelectedUser] = useState(0);
  const [hasSelectedUserError, setHasSelectedUserError] = useState(false);

  const [todos, setTodos] = useState(initialTodos);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setHasTitleError(!title);
    setHasSelectedUserError(!selectedUser);

    if (!title || !selectedUser) {
      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id)) + 1;

    const newTodo = {
      id: maxId,
      title: title,
      completed: false,
      userId: selectedUser,
      user: getUser(selectedUser),
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelectedUser(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            value={title}
            placeholder="Enter a title"
            onChange={event => {
              setTitle(event.target.value);
              setHasTitleError(false);
            }}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={selectedUser}
            onChange={event => {
              setSelectedUser(+event.target.value);
              setHasSelectedUserError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasSelectedUserError && (
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
