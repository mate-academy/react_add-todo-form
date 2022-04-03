import React, { useState } from 'react';
import './App.css';
import classNames from 'classnames';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { TodoList } from './components/TodoList/TodoList';

import { Todo, TodoUser } from './types/Todo';
import { User } from './types/User';

function prepareTodos(todos: Todo[], users: User[]): TodoUser[] {
  return todos.map((todo) => ({
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  }));
}

const preparedTodos = prepareTodos(todosFromServer, usersFromServer);

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, addTodo] = useState(preparedTodos);

  const [errorTitle, setErrorTitle] = useState('');
  const [errorUser, setErrorUser] = useState('');

  const resetForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setErrorTitle('Please enter the title');
    }

    if (!userId) {
      setErrorUser('Please choose a user');
    }

    if (title && userId) {
      addTodo(prevTodos => [...prevTodos, {
        userId,
        id: prevTodos.length + 1,
        title,
        completed: false,
        user: usersFromServer.find(user => user.id === userId) || null,
      }]);

      resetForm();
    }
  };

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const pattern = /^[0-9enru ]*$/;

    if (value === '' || pattern.test(value)) {
      setTitle(value);
    }

    if (errorTitle) {
      setErrorTitle('');
    }
  };

  const chooseUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);

    if (errorUser) {
      setErrorUser('');
    }
  };

  return (
    <div className="App">
      <h1 className="title">Add todo form</h1>

      <p className="App__header">
        <TodoList todos={todos} />
      </p>

      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label htmlFor="title" className="label">
            Title
            <div className="control">
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter the title"
                className={classNames('input', { 'is-danger': errorTitle })}
                value={title}
                onChange={changeTitle}
              />
            </div>
          </label>
          {errorTitle && (<p className="help is-danger">{errorTitle}</p>)}
        </div>

        <div className="field">
          <label htmlFor="user" className="label">
            Users
            <div className="control">
              <div className={classNames('select', { 'is-danger': errorUser })}>
                <select
                  id="user"
                  name="user"
                  value={userId}
                  onChange={chooseUser}
                >
                  <option value="">Choose a user</option>
                  {usersFromServer.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </label>
          {errorUser && (<p className="help is-danger">{errorUser}</p>)}
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button type="submit" className="button is-link">Add</button>
          </div>
          <div className="control">
            <button
              type="button"
              className="button is-link is-light"
              onClick={resetForm}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default App;
