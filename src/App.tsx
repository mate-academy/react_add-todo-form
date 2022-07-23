import React, { useState } from 'react';

import users from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

import { Todo } from './types/Todo';

import './App.scss';

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [todos, setTodos] = useState(preparedTodos);
  const [isTitle, setIsTitle] = useState(true);
  const [isUserName, setIsUserName] = useState(true);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
    setIsTitle(true);
  };

  const handleUserName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserName(value);
    setIsUserName(true);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setIsTitle(false);
    }

    if (!userName) {
      setIsUserName(false);
    }

    if (title && userName) {
      const newUser = users.find(user => user.name === userName) || null;
      const newTodo = {
        id: todos[todos.length - 1].id + 1,
        title: title.trim(),
        completed: false,
        userId: newUser ? newUser.id : 0,
        user: newUser,
      };

      setTodos([
        ...todos,
        newTodo,
      ]);
      setTitle('');
      setUserName('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            value={title}
            onChange={handleTitle}
            data-cy="titleInput"
          />
          {!isTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            value={userName}
            onChange={handleUserName}
            data-cy="userSelect"
          >
            <option value="0">Choose a user</option>

            {users.map(user => (
              <option
                key={user.id}
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>

          {!isUserName && (
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
