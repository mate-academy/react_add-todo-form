import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import { User } from './Types/User';
import { Todo } from './Types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [currentTodos, setCurrentTodos] = useState(todos);
  const [selectedUser, setSelectedUser] = useState(0);
  const [title, setTitle] = useState('');
  const [isTitled, setIsTitled] = useState(true);
  const [userIsSelected, setUserIsSelected] = useState(true);

  const getMaxID = Math.max(...currentTodos.map((todo: Todo) => todo.id));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const userToAdd = usersFromServer.find(user => (
      user.id === selectedUser));

    if (userToAdd && title.trim().length > 0) {
      setCurrentTodos([
        ...currentTodos,
        {
          id: getMaxID + 1,
          title: `${title}`,
          completed: false,
          userId: userToAdd.id,
          user: userToAdd,
        },
      ]);
      setTitle('');
      setSelectedUser(0);
    }

    if (title.trim().length === 0) {
      setIsTitled(false);
    }

    if (!selectedUser) {
      setUserIsSelected(false);
    }
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
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={(event) => {
              setTitle(event.target.value);
              setIsTitled(true);
            }}
          />
          {!isTitled && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={selectedUser}
            onChange={(event) => {
              setSelectedUser(+event.target.value);
              setUserIsSelected(true);
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

          {!userIsSelected && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={currentTodos} />
    </div>
  );
};
