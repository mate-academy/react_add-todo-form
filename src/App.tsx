import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

function addUser(userId: number) {
  const userToAdd = usersFromServer.find(user => user.id === userId) || null;

  if (!userToAdd) {
    throw new Error('User not found');
  }

  return userToAdd;
}

const serverTodos = todosFromServer.map(todo => ({
  ...todo,
  user: addUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [allTodos, setAllTodos] = useState(serverTodos);
  const [titleError, setTitleError] = useState<JSX.Element>();
  const [selectedUserError, setSelectedUserError] = useState<JSX.Element>();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!title) {
      setTitleError(<span className="error">Please enter a title</span>);
    }

    if (!selectedUser) {
      setSelectedUserError(<span className="error">Please choose a user</span>);
    }

    if (title && selectedUser) {
      const newTodo = {
        id:
          allTodos.reduce((acc, todo) => (acc > todo.id ? acc : todo.id), 0) +
          1,
        title: title,
        completed: false,
        userId: selectedUser,
        user: addUser(selectedUser),
      };

      setAllTodos([...allTodos, newTodo]);
      setTitle('');
      setSelectedUser(0);
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            value={title}
            data-cy="titleInput"
            onChange={e => {
              setTitle(e.target.value);
              setTitleError(<span className="error"></span>);
            }}
            placeholder="Add a title"
          />
          {titleError}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={e => {
              setSelectedUser(Number(e.target.value));
              setSelectedUserError(<span className="error"></span>);
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

          {selectedUserError}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={allTodos} />
    </div>
  );
};
