import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function findUser(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todosByUser: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUser(todo.userId),
}));

export const App = () => {
  const [userID, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(todosByUser);
  const [formError, setFormError] = useState(false);

  const handleEnterTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^a-zA-Zа-яА-Я0-9 ]/g, ''));
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.length > 0 && userID !== 0) {
      setTodos(prev => [
        ...prev,
        {
          id: [...todosFromServer]
            .sort((a, b) => a.id - b.id)[todosByUser.length - 1].id + 1,
          title,
          completed: false,
          userId: userID,
          user: findUser(userID),
        },
      ]);
      setTitle('');
      setUserId(0);
      setFormError(false);
    }

    if (title.length === 0 || userID === 0) {
      setFormError(true);
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
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            name="title"
            value={title}
            onChange={handleEnterTitle}
          />

          {title.length === 0 && formError
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            name="user"
            id="user"
            data-cy="userSelect"
            value={userID}
            onChange={handleUserSelect}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
          {userID === 0 && formError === true
            && <span className="error">Please choose a user</span>}
        </div>
        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
