import { useState } from 'react';

import './App.scss';

import { TodoList } from './components/TodoList';

import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const generateId = (todos: Todo[]) => {
  const maxId = todos.reduce((max, todo) => {
    return todo.id > max ? todo.id : max;
  }, 1);

  return maxId + 1;
};

const findUserByID = (id: number) => {
  return usersFromServer.find(user => user.id === id) || null;
};

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: findUserByID(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [requireValidTitle, setRequireValidTitle] = useState(false);
  const [requireValidSelect, setRequireValidSelect] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const isValidTitle = title.replace(/\s/g, '');
    const isValidSelect = selectedUser !== 0;

    if (!isValidTitle) {
      setTitle('');
      setRequireValidTitle(true);
    }

    if (!isValidSelect) {
      setRequireValidSelect(true);
    }

    if (isValidTitle && isValidSelect) {
      setTodos(prevTodos => [
        ...prevTodos,
        {
          id: generateId(prevTodos),
          title,
          completed: false,
          userId: selectedUser,
          user: findUserByID(selectedUser),
        },
      ]);
      setTitle('');
      setSelectedUser(0);
    }
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value[event.target.value.length - 1];
    const isValidInput = /[a-zа-яё\d\s]/gi.test(input);

    if (isValidInput) {
      setTitle(event.target.value);
    }

    setRequireValidTitle(false);
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(Number(event.target.value));
    setRequireValidSelect(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            name="title"
            placeholder="Enter a title"
            value={title}
            onChange={handleChangeTitle}
          />

          {requireValidTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            name="userSelect"
            value={selectedUser}
            onChange={handleChangeSelect}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {requireValidSelect && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleClick}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
