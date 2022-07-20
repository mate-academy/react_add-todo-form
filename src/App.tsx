import React, { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
  color: todo.completed ? 'green' : 'red',
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [todos, setTodos] = useState(preparedTodos);
  const [isTitle, setIsTitle] = useState(false);
  const [isUserName, setIsUserName] = useState(false);

  const addTodo = () => {
    if (title && userName) {
      const lengthTodos = todos.length;
      const addUser = usersFromServer.find(
        user => userName === user.name,
      ) || null;

      const newTodo = {
        id: todos[lengthTodos - 1].id + 1,
        userId: addUser ? addUser.id : 0,
        title,
        completed: false,
        user: addUser,
      };

      setTodos([
        ...todos,
        newTodo,
      ]);
    }
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitle(false);
  };

  const handleUserName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserName(event.target.value);
    setIsUserName(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userName) {
      setIsUserName(true);
    }

    if (!title) {
      setIsTitle(true);
    }

    addTodo();

    setTitle('');
    setUserName('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            value={title}
            onChange={handleTitle}
            data-cy="titleInput"
          />
          {isTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            value={userName}
            onChange={handleUserName}
            data-cy="userSelect"
          >
            <option value="0">
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>

          {isUserName && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
