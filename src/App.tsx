import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { User } from './types/user';
import { Todo } from './types/todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [todosList, setTodosList] = useState(todos);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(+event.target.value);
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) {
      setTitleError(true);
    }

    if (!user) {
      setUserError(true);
    }

    if (user && title.trim()) {
      const newTodo = {
        id: Math.max(...todosList.map((todo) => todo.id)) + 1,
        title: title.trim(),
        completed: false,
        userId: user,
        user: getUser(user),
      };

      setTodosList([...todosList, newTodo]);
      setTitle('');
      setUser(0);
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
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            name="title"
            value={title}
            placeholder="Enter a title"
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            name="user"
            value={user}
            onChange={handleUserChange}
          >

            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(item => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosList} />
    </div>
  );
};
