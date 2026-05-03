import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo } from './types/Todo';
import { User } from './types/User';

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => todo.userId === user.id) || null,
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [users] = useState<User[]>(usersFromServer);

  const [title, setTitle] = useState('');
  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedUserErrorMessage, setSelectedUserErrorMessage] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleErrorMessage('');

    setTitle(event.target.value);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserErrorMessage('');

    setSelectedUser(+event.target.value);
  };

  const reset = () => {
    setTitle('');
    setSelectedUser(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleErrorMessage('Please enter a title');
    }

    if (!selectedUser) {
      setSelectedUserErrorMessage('Please choose a user');
    }

    if (!title || !selectedUser) {
      return;
    }

    const user = users.find(person => person.id === selectedUser) || null;
    const maxId = Math.max(...todos.map(todo => todo.id));

    setTodos(prev => [
      ...prev,
      {
        id: maxId + 1,
        title: title,
        completed: false,
        userId: selectedUser,
        user: user,
      },
    ]);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleErrorMessage && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {selectedUserErrorMessage && (
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
