import React, { useState } from 'react';

import './App.scss';

import { TodoList } from './components/TodoList/TodoList';

import { LinkedUsers, User } from './types/User';
import { Todo } from './types/Todo';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

const getPreparedUsers = (userList: User[]): LinkedUsers => {
  return userList.reduce((acc, user) => (
    {
      ...acc,
      [user.id]: user,
    }
  ), {});
};

const preparedUser = getPreparedUsers(usersFromServer);

let maxTodoId = todosFromServer.at(-1)?.id || 0;

const App: React.FC = () => {
  const [todos, setTodos] = useState((): Todo[] => todosFromServer);

  const [title, setTitle] = useState('');
  const [currentUserId, setCurrentUser] = useState(-1);

  const [userIdError, setUserIdError] = useState('');
  const [titleError, setTitleError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.length) {
      setTitleError('Please enter the title');
    }

    if (currentUserId < 0) {
      setUserIdError('Please choose a user');
    }

    if (currentUserId !== -1 && title.length > 0) {
      maxTodoId += 1;

      const newTodo: Todo = {
        id: maxTodoId,
        userId: currentUserId,
        title,
        completed: false,
      };

      setTodos((oldTodos) => ([
        ...oldTodos,
        newTodo,
      ]));

      setTitle('');
      setCurrentUser(-1);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    const cyrillicPattern = /^[а-яА-Яё][а-яА-Яё\s-]*$/;
    const latinPattern = /^[a-zA-Z][a-zA-Z\s-]*$/;

    let newChar;

    switch (name) {
      case 'title':
        setTitleError('');

        newChar = value.slice(-1);

        if (cyrillicPattern.test(newChar) || latinPattern.test(newChar)
          || newChar === ' ' || value === '') {
          setTitle(value);
        }

        break;

      case 'userId':
        setUserIdError('');
        setCurrentUser(+value);
        break;

      default:
        break;
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit} className="addTodoFrom">
        <label htmlFor="titleInput" className="addTodoFrom__label">
          <input
            type="text"
            name="title"
            value={title}
            id="titleInput"
            placeholder="Title"
            onChange={handleChange}
            className="addTodoFrom__field"
          />

          {titleError && (
            <span className="addTodoFrom__errorText">
              {titleError}
            </span>
          )}
        </label>

        <label htmlFor="userSelect" className="addTodoFrom__label">
          <select
            name="userId"
            id="userSelect"
            onChange={handleChange}
            className="addTodoFrom__field"
          >
            <option value={-1} selected={currentUserId === -1}>Choose a user</option>

            {usersFromServer.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>

          {userIdError && (
            <span className="addTodoFrom__errorText">
              {userIdError}
            </span>
          )}
        </label>

        <button type="submit" className="addTodoFrom__button">Add</button>
      </form>

      <TodoList todos={todos} users={preparedUser} />
    </div>
  );
};

export default App;
