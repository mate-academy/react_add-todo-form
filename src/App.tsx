import './App.scss';

import { FormEventHandler, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

import { User } from './type/user';
import { Todo } from './type/todo';

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [showTitleMessage, setShowTitleMessage] = useState(false);
  const [showUserMessage, setShowUserMessage] = useState(false);
  const users: User[] = usersFromServer;
  const todos: Todo[] = todosFromServer;
  const pattern = /^[a-zA-Z0-9]+$/;

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    if (title !== '' && selectedUser !== '') {
      setTitle('');
      setSelectedUser('');
    }
  };

  const handleClick = () => {
    if (title === '') {
      setShowTitleMessage(true);
    }

    if (selectedUser === '') {
      setShowUserMessage(true);
    }

    if (title !== '' && selectedUser !== '') {
      todos.push({
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title,
        completed: false,
        userId: users.find((user) => user.name === selectedUser)?.id as number,
      });
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              if (pattern.test(event.target.value)) {
                setTitle(event.target.value);
                setShowTitleMessage(false);
              }
            }}
          />
          {showTitleMessage
           && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelected">User: </label>
          <select
            data-cy="userSelect"
            id="userSelected"
            value={selectedUser}
            onChange={(event) => {
              setSelectedUser(event.target.value);
              setShowUserMessage(false);
            }}
          >
            <option value="" disabled defaultChecked>
              Choose a user
            </option>
            {usersFromServer.map((user) => {
              return <option>{user.name}</option>;
            })}
          </select>

          {showUserMessage
           && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton" onClick={handleClick}>
          Add
        </button>
      </form>

      <TodoList todos={todos} users={users} />
    </div>
  );
};
