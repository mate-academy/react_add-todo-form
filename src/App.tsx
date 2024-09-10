import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import React, { useState } from 'react';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App = () => {
  function getUserById(id: number, users: User[]) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        return users[i];
      }
    }

    return;
  }

  const todoWithUser = todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId, usersFromServer),
  }));

  const [todos, setTodos] = useState([...todoWithUser]);
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [userSelect, setUserSelect] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const reset = () => {
    setUserSelect(0);
    setTitle('');
    setCount(count + 1);
  };

  const getId = () => {
    return todos.reduce((prev, cur) => (cur.id > prev ? cur.id : prev), 0) + 1;
  };

  const handleTitleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserSelect(+event.target.value);
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setTitleError(() => !title);
    setUserError(() => !userSelect);

    if (title && userSelect) {
      const newTodo: Todo = {
        id: getId(),
        title: title,
        completed: false,
        userId: userSelect,
        user: getUserById(userSelect, usersFromServer),
      };

      setTodos(prev => [...prev, newTodo]);
      reset();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleOnChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userSelect}
            onChange={handleUserOnChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
