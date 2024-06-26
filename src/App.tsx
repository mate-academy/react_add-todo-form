import React, { useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getNewId } from './utils/helper';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('0');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');
  const reset = () => {
    setTitle('');
    setUser('0');
    setTitleError('');
    setUserError('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      setTitleError('Please enter a title');
    }

    if (user === '0') {
      setUserError('Please choose a user');
    }

    if (title.trim() && user !== '0') {
      const newTodoItem: Todo = {
        id: getNewId(todos),
        title: title,
        userId: parseInt(user),
        completed: false,
      };

      setTodos(prevTodos => [...prevTodos, newTodoItem]);

      reset();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            name="title"
            data-cy="titleInput"
            value={title}
            onChange={event => setTitle(event.target.value)}
            placeholder="Enter some title"
          />
          {titleError && !title && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <select
            name="userId"
            data-cy="userSelect"
            value={user}
            onChange={event => setUser(event.target.value)}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {userError && user === '0' && (
            <span className="error">{userError}</span>
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
