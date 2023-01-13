import { useState, FormEvent, ChangeEvent } from 'react';

import { TodoList } from './components/TodoList';

import { Todo } from './types/Todo';
import { User } from './types/User';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [newTodos, setNewTodos] = useState(todos);
  const [inTitle, setInTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [checkInTitle, setCheckInTitle] = useState(false);
  const [checkSelectedUser, setCheckSelectedUser] = useState(false);
  const newId = Math.max(...newTodos.map(todo => todo.id)) + 1;

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setInTitle(event.target.value.replace(/[^a-zа-я0-9\s]/ui, ''));
    setCheckInTitle(false);
  };

  const handleUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);

    setCheckSelectedUser(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (inTitle === '' || !inTitle.trim()) {
      setCheckInTitle(true);
    }

    if (selectedUser === '') {
      setCheckSelectedUser(true);
    }

    if (inTitle && selectedUser) {
      setNewTodos(current => [
        ...current,
        {
          id: newId,
          title: inTitle,
          completed: false,
          userId: +selectedUser,
          user: getUserById(+selectedUser),
        },
      ]);
    }

    setInTitle('');
    setSelectedUser('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={inTitle}
            onChange={handleTitle}
          />
          {checkInTitle
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            id="selectedUser"
            onChange={handleUser}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
          {checkSelectedUser
            && <span className="error">Please choose a user</span>}

        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={newTodos} />
    </div>
  );
};
