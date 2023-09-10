import './App.scss';

import { FormEventHandler, useReducer, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import Todo from './Types/Todo';
import { TodoList } from './components/TodoList';

const getUser = (id: number) => {
  const foundUser = usersFromServer.find(user => user.id === id);

  return foundUser || null;
};

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [showTitleWarning, setShowTitleWarning] = useState(false);
  const [showUserWarning, setShowUserWarning] = useState(false);

  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
  const [_, forceUpdate] = useReducer(x => x + 1, 0);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (title.length !== 0 && selectedUser !== '') {
      setTitle('');
      setSelectedUser('');
    }
  };

  const handleClick = () => {
    if (title.length === 0) {
      setShowTitleWarning(true);
    }

    if (selectedUser === '') {
      setShowUserWarning(true);
    }

    if (selectedUser !== '' && title.length > 0) {
      todos.push({
        id: Math.max(...todos.map(el => el.id)) + 1,
        title,
        completed: false,
        user: usersFromServer.find(user => user.name === selectedUser)
    || null,
        userId: usersFromServer
          .find(user => user.name === selectedUser)?.id as number,
      });
      forceUpdate();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setShowTitleWarning(false);
            }}
          />
          {showTitleWarning
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={(e) => {
              setSelectedUser(e.target.value);
              setShowUserWarning(false);
            }}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map(user => {
              return (<option>{user.name}</option>);
            })}
          </select>

          {showUserWarning
          && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton" onClick={handleClick}>
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
