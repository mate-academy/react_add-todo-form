import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const users = [...usersFromServer];
  const todos = [...todosFromServer];

  const [selectedUser, setSelectedUser] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [postAdded, setPostAdded] = useState(true);

  const buttonAction = () => {
    if (currentTitle && selectedUser) {
      todos.push({
        id: (todos.sort((a, b) => b.id - a.id)[0].id + 1),
        title: currentTitle,
        userId: Number(selectedUser),
        completed: false,
      });

      setPostAdded(true);
      setSelectedUser('');
      setCurrentTitle('');
    } else {
      setPostAdded(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => (event.preventDefault())}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={currentTitle}
            onChange={event => setCurrentTitle(event.target.value)}
          />
          {(!currentTitle && !postAdded) && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={event => setSelectedUser(event.target.value)}
          >
            <option
              value=""
              selected
              disabled
            >
              Choose a user
            </option>

            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {(!selectedUser && !postAdded) && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={() => {
            buttonAction();
          }}
        >
          Add
        </button>
      </form>

      {todos.map(todo => (
        <TodoList
          key={todo.id}
          todo={todo}
          user={users.find(user => user.id === todo.userId)}
        />
      ))}
    </div>
  );
};
