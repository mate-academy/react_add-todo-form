import React, { useState } from 'react';
import ToDoList from './ToDoList';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const App: React.FC = () => {
  const [selectedUser, selectUser] = useState('no-user');
  const [currentTitle, setTitle] = useState('');
  const [toDoStatus, setToDoStatus] = useState(false);
  const [todosCopy, handleTodos] = useState([...todos]);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event: any) => {
    const { value, id } = event.target;

    setError(false);

    switch (id) {
      case 'usersSelect': {
        selectUser(value);
        break;
      }

      case 'todoTitle': {
        setTitle(value);
        break;
      }

      case 'toDoStatus': {
        setToDoStatus(!toDoStatus);
        break;
      }

      default: {
        break;
      }
    }
  };

  const resetForm = () => {
    selectUser('no-user');
    setTitle('');
    setToDoStatus(false);
  };

  const addToDoItem = (event: React.FormEvent) => {
    event.preventDefault();
    const currentUser = users.find(user => user.name === selectedUser);

    if (selectedUser === 'no-user') {
      setErrorMessage('Please choose a user');
      setError(true);

      return;
    }

    if (currentTitle.trim() === '') {
      setErrorMessage('Please enter the title');
      setError(true);

      return;
    }

    if (!currentUser) {
      resetForm();

      return;
    }

    handleTodos(
      [
        ...todosCopy,
        {
          title: currentTitle,
          completed: toDoStatus,
          id: Date.now(),
          userId: currentUser.id,
        },
      ],
    );

    resetForm();
  };

  return (
    <div className="App">
      <form onSubmit={addToDoItem}>
        <input
          name="todoTitle"
          id="todoTitle"
          type="text"
          placeholder="Title"
          value={currentTitle}
          onChange={handleChange}
        />
        <label htmlFor="usersSelect">
          <span>Choose a user</span>
          <select
            name="usersSelect"
            id="usersSelect"
            value={selectedUser}
            onChange={handleChange}
          >
            <option value="no-user" disabled>Choose a user</option>
            {users.map(user => {
              return <option key={user.username} value={user.name}>{user.name}</option>;
            })}
          </select>
        </label>
        <label htmlFor="toDoStatus">
          <span>Is completed?</span>
          <input
            type="checkbox"
            id="toDoStatus"
            checked={toDoStatus}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add</button>
      </form>
      {isError && (
        <div className="error">
          <p>{errorMessage}</p>
        </div>
      )}
      <ToDoList users={users} todos={todosCopy} />
    </div>
  );
};

export default App;
