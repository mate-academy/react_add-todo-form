import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

// eslint-disable-next-line no-console
console.log(todos);

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [updatedTodos, setUpdatedTodos] = useState([...todos]);
  const [hasTitle, setHasTitle] = useState(false);
  const [hasSelectedUser, setHasSelectedUser] = useState(false);

  const noTitleError = 'No title entered, please add title';
  const noUserError = 'No user selected! Please select!';

  const addNewTodo = () => {
    const selectedUserId = usersFromServer
      .find(user => user.name === selectedUser)?.id;

    if (selectedUserId) {
      const newTodo = {
        userId: selectedUserId,
        id: updatedTodos.length + 1,
        title,
        completed: false,
        user: getUser(selectedUserId),
      };

      setUpdatedTodos([...updatedTodos, newTodo]);
    }
  };

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitle(false);
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
    setHasSelectedUser(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitle(!title);
    setHasSelectedUser(!selectedUser);

    if (title && selectedUser) {
      addNewTodo();
      setTitle('');
      setSelectedUser('');
    }
  };

  return (
    <div className="App">
      <h1 className="App__title">Static list of todos</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            placeholder="Enter Todo title"
            data-cy="titleInput"
            onChange={handleTitleInput}
          />
          {hasTitle && (
            <p className="message">{noTitleError}</p>
          )}
        </div>

        <div className="field">
          <select
            name="users"
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleUserSelect}
          >
            <option value="">
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.name} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasSelectedUser && (
            <p className="message">{noUserError}</p>
          )}
        </div>
        <button type="submit">Add task</button>
      </form>
      <TodoList todos={updatedTodos} />
    </div>
  );
};

export default App;
