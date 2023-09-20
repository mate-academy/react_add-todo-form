import React, { FormEventHandler, useState } from 'react';
import { User } from './type/user';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './type/todo';
import './App.scss';

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [showTitlePrompt, setShowTitlePrompt] = useState<boolean>(false);
  const [showUserPrompt, setShowUserPrompt] = useState<boolean>(false);
  const [todos, setTodos] = useState<Array<Todo>>(todosFromServer);
  const users: Array<User> = usersFromServer;

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (/^[0-9a-zA-Z\s]+$/.test(value)) {
      setTitle(value);
      setShowTitlePrompt(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelectedUser(value);
    setShowUserPrompt(false);
  };

  const resetForm = () => {
    setTitle('');
    setSelectedUser('');
  };

  const handleFormSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    if (title.length !== 0 && selectedUser !== '') {
      resetForm();
    }
  };

  const handleAddClick = () => {
    if (title.length === 0) {
      setShowTitlePrompt(true);
    }

    if (selectedUser === '') {
      setShowUserPrompt(true);
    }

    if (title.length !== 0 && selectedUser !== '') {
      const selectedUserObject
       = users.find((user) => user.name === selectedUser);

      if (selectedUserObject) {
        const newTodo: Todo = {
          id: todos.length + 1, // Automatyczne nadawanie nowego ID
          title,
          completed: false,
          userId: selectedUserObject.id as number,
        };

        setTodos([...todos, newTodo]);
        resetForm();
      } else {
        throw new Error('There is no such a User');
      }
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleFormSubmit} action="/api/todos">
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            placeholder="Enter a title"
            id="title"
            name="title"
            type="text"
            value={title}
            data-cy="titleInput"
            onChange={handleTitleChange}
          />
          {showTitlePrompt
           && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="selectUser">User:</label>
          <select
            data-cy="userSelect"
            id="selectUser"
            name="selectUser"
            value={selectedUser}
            onChange={handleUserChange}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
          {showUserPrompt
           && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton" onClick={handleAddClick}>
          Add
        </button>
      </form>
      <TodoList todos={todos} users={users} />
    </div>
  );
};
