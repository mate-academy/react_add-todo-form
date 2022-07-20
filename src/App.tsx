import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const todos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [updatedTodos, setUpdatedTodos] = useState([...todos]);
  const [hasTitleError, setHasTitleError] = useState(true);
  const [hasSelectedError, setHasSelectedError] = useState(true);

  const addTodo = () => {
    const selectedUserId = usersFromServer
      .find(user => user.name === selectedUser)?.id;

    if (selectedUserId) {
      const newTodo = {
        id: updatedTodos.length + 1,
        title,
        userId: selectedUserId,
        completed: false,
        user: usersFromServer.find(user => user.id === selectedUserId) || null,
      };

      setUpdatedTodos([...updatedTodos, newTodo]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let isValidated = false;

    if (title && selectedUser) {
      setHasTitleError(true);
      setHasSelectedError(true);
      isValidated = true;
    } else {
      setHasTitleError(false);
      setHasSelectedError(false);
      isValidated = false;
    }

    if (isValidated) {
      addTodo();
      setTitle('');
      setSelectedUser('');
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          placeholder="Enter a title"
          data-cy="titleInput"
          onChange={event => {
            setHasTitleError(true);

            setTitle(event.target.value
              .replace(/[^a-zA-Zа-яА-Я0-9 ]/g, ''));
          }}

        />

        <span className="error">
          {!hasTitleError && 'Please enter a title'}
        </span>
        <br />

        <select
          name="users"
          data-cy="userSelect"
          onChange={event => {
            setSelectedUser(event.target.value);
            setHasSelectedError(true);
          }}
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
        <span className="error">
          {!hasSelectedError && 'Please choose a user'}
        </span>
        <br />
        <button type="submit">Add task</button>
      </form>
      <TodoList todos={updatedTodos} />
    </div>
  );
};

export default App;
