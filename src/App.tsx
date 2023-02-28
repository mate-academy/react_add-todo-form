import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

import './App.scss';

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
  const [todoList, setTodoList] = useState(todos);
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[a-zA-Z0-9а-яА-Я\s]*$/;

    if (regex.test(event.target.value)) {
      setTitle(event.target.value);
      setTitleError(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userId) {
      setUserError(true);
    }

    if (!title.trim()) {
      setTitleError(true);
    }

    if (userId && title.trim()) {
      const newTodo: Todo = {
        id: Math.max(...todoList.map(todo => todo.id)) + 1,
        title: title.trim(),
        completed: false,
        userId,
        user: getUser(userId),
      };

      setTodoList([...todoList, newTodo]);
      setTitle('');
      setUserId(0);
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
          <label htmlFor="titleInput">Title</label>
          <input
            type="text"
            id="titleInput"
            name="title"
            value={title}
            onChange={handleTitleChange}
            data-cy="titleInput"
            placeholder="Enter a title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            id="userSelect"
            name="user"
            value={userId || '0'}
            onChange={handleUserChange}
            data-cy="userSelect"
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
