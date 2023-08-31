import './App.scss';
import { FormEventHandler, useState } from 'react';
import { User } from './type/user';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './type/todo';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [title, setTitle] = useState('');
  const [showTitlePrompt, setShowTitlePrompt] = useState(false);
  const [showUserPrompt, setShowUserPrompt] = useState(false);
  const users: Array<User> = usersFromServer;
  const todos: Array<Todo> = todosFromServer;

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    if (title.length !== 0 && selectedUser !== '') {
      setTitle('');
      setSelectedUser('');
    }
  };

  const handleClick = () => {
    if (title.length === 0) {
      setShowTitlePrompt(true);
    }

    if (selectedUser === '') {
      setShowUserPrompt(true);
    }

    if (title.length !== 0 && selectedUser !== '') {
      todos.push(
        {
          id: Math.max(...todos.map(el => el.id)) + 1,
          title,
          completed: false,
          userId: users
            .find(user => user.name === selectedUser)?.id as number,
        },
      );
    }
  };

  const regex = /^[0-9a-zA-Z\s]+$/;

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleSubmit}
        action="/api/todos"
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            placeholder="Enter a title"
            id="title"
            name="title"
            type="text"
            value={title}
            data-cy="titleInput"
            onChange={(event) => {
              if (regex.test(event.target.value)) {
                setTitle(event.target.value);
                setShowTitlePrompt(false);
              }
            }}
          />
          {showTitlePrompt
          && <span className="error">Please enter a title</span>}

        </div>

        <div className="field">
          <label htmlFor="selectUser">User: </label>
          <select
            data-cy="userSelect"
            id="selectUser"
            name="selectUser"
            value={selectedUser}
            onChange={(e) => {
              setSelectedUser(e.target.value);
              setShowUserPrompt(false);
            }}
          >
            <option value="" disabled defaultChecked>
              Choose a user
            </option>
            {users.map(user => {
              return <option>{user.name}</option>;
            })}
          </select>
          {showUserPrompt
            && <span className="error">Please choose a user</span>}

        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleClick}
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} users={users} />
    </div>
  );
};
