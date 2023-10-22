import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo, User } from './types';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const getUser = (id: number) => {
  return usersFromServer.find(user => user.id === id) || null;
};

const getHighestId = (todos: Todo[]) => {
  return Math.max(...todos.map(todo => todo.id));
};

const defaultTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(defaultTodos);
  const [users] = useState<User[]>(usersFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUserId, setErrorUserId] = useState(false);

  const addTodo = (todo: Omit<Todo, 'id' | 'user'>) => {
    setTodos(prevState => ([
      ...prevState,
      {
        ...todo,
        id: getHighestId(todos) + 1,
        user: getUser(todo.userId),
      },
    ]));
  };

  const clearTodoForm = () => {
    setTitle('');
    setUserId(0);
    setErrorTitle(false);
    setErrorUserId(false);
  };

  const handleSubmitTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim() || !userId) {
      setErrorTitle(!title.trim());
      setErrorUserId(!userId);

      return;
    }

    addTodo({
      title,
      userId,
      completed: false,
    });

    clearTodoForm();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setErrorTitle(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setErrorUserId(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmitTodo} action="/api/todos" method="POST">
        <div className="field">
          <label htmlFor="titleField">Title: </label>
          <input
            id="titleField"
            type="text"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
            data-cy="titleInput"
          />
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userField">User: </label>
          <select
            id="userField"
            value={userId}
            onChange={handleUserIdChange}
            data-cy="userSelect"
          >
            <option value="0" disabled>Choose a user</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
          {errorUserId && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
