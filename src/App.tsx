import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './components/TodoInfo';

function findUser(id: number) {
  return usersFromServer.find(user => user.id === id) || null;
}

const preparedTodos: Todo[] = todosFromServer.map(todo => {
  const userFound = findUser(todo.userId);

  return {
    ...todo,
    user: userFound || null,
  };
});

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const addNewTODO = (todoTitle: string, userId: number) => {
    const newTODO: Todo = {
      id: Date.now(),
      title: todoTitle,
      userId,
      completed: false,
      user: findUser(selectedUserId),
    };

    setTodos((previousTODO) => [...previousTODO, newTODO]);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title && selectedUserId) {
      addNewTODO(title, selectedUserId);
      setTitle('');
      setSelectedUserId(0);
    }

    setErrorTitle(!title);
    setErrorUser(!selectedUserId);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <input
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          {errorTitle
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => setSelectedUserId(+event.target.value)}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {errorUser
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
