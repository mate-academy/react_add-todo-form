import React, { useState } from 'react';
import './App.css';
import { TodoList } from './components/TodoList';

import todosFromServer from './api/todos';
import users from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectUser, setSelectUser] = useState('Choose a user');
  const [userIsValid, setUserIsValid] = useState(true);
  const [titleIsValid, setTitleIsValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(true);

  const handleChangeSelect = (event: { target: { value: string; }; }) => {
    const {
      value,
    } = event.target;

    setSelectUser(value);

    if (value === 'Choose a user') {
      setUserIsValid(false);
    } else {
      setUserIsValid(true);
    }
  };

  const handleChangeInput = (event: { target: { value: string; }; }) => {
    const {
      value,
    } = event.target;

    setQuery(value);

    if (value === '') {
      setTitleIsValid(false);
    } else {
      setTitleIsValid(true);
    }
  };

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (selectUser === 'Choose a user') {
      setUserIsValid(false);
    }

    if (query === '') {
      setTitleIsValid(false);
    }

    if (query === '' || selectUser === 'Choose a user') {
      setFormIsValid(false);
    }

    if (formIsValid) {
      const newUser = users.find(user => user.name === selectUser);

      if (newUser) {
        const newTodo: Todo = {
          id: todos.length + 1,
          userId: newUser.id,
          title: query,
          completed: false,
          user: newUser,
        };

        todos.push(newTodo);

        setSelectUser('Choose a user');
        setQuery('');
      }
    }
  };

  return (
    <div className="App">
      <h1 className="title is-4">Add todo form</h1>

      <form>
        <div>
          <label className="label">
            <div>Task</div>

            {!titleIsValid ? (
              <p className="help is-danger">Please enter the title</p>
            ) : (
              <p className="help">This field is required</p>
            )}

            <input
              className="myInput"
              type="text"
              data-cy="titleInput"
              placeholder="Enter the title"
              value={query}
              onChange={handleChangeInput}
              required
            />
          </label>

        </div>

        <div>
          <label className="label">
            <div>User</div>

            {!userIsValid ? (
              <p className="help is-danger">Please choose a user</p>
            ) : (
              <p className="help">This field is required</p>
            )}

            <select
              className="select"
              name="user"
              data-cy="userSelect"
              value={selectUser}
              onChange={handleChangeSelect}
            >
              <option value="Choose a user">
                Choose a user
              </option>

              {users.map(user => (
                <option
                  value={user.name}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <button
            className="button is-black"
            type="submit"
            onClick={addTodo}
          >
            Add
          </button>
        </div>

      </form>

      <p>
        <span>Users: </span>
        {users.length}
      </p>

      <TodoList todos={todos} />

    </div>
  );
};

export default App;
