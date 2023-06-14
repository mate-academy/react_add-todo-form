import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const App = () => {
  const [newItem, setNewItem] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [error, setError] = useState('');
  const [todos, setTodos] = useState<Todo[]>(todosFromServer
    .map(todo => ({
      ...todo,
      user: getUser(todo.userId),
    })));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newItem.trim() === '') {
      setError('Please enter a title');

      return;
    }

    if (selectedUser === '') {
      setError('Please choose a user');

      return;
    }

    setError('');

    setTodos(currentTodos => {
      return [
        ...currentTodos,
        {
          id: todos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1,
          title: newItem.trim(),
          completed: false,
          userId: parseInt(selectedUser, 10),
        },
      ];
    });

    setNewItem('');
    setSelectedUser('');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem(e.target.value);
    setError('');
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(e.target.value);
    setError('');
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
          Title:&nbsp;
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newItem}
            onChange={handleTitleChange}
          />
          {error && !newItem && <span className="error">{error}</span>}
        </div>

        <div className="field">
          User:&nbsp;

          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleUserChange}
          >
            <option value="" disabled selected>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {error && !selectedUser
            && <span className="error">{error}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
