import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';
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
  const [userId, setUserId] = useState(0);
  const [visibleTodos, setVisibleTodos] = useState([...todos]);
  const [titleError, setTitleError] = useState('');
  const [userIdError, setUserIdError] = useState('');

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const changeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
  };

  const clearForm = () => {
    setTitle('');
    setUserId(0);
    setTitleError('');
    setUserIdError('');
  };

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleError('Please enter a title');
    }

    if (!userId) {
      setUserIdError('Please choose a user');
    }

    if (title.trim().length && userId) {
      const newTodo = {
        userId: userId || 0,
        id: Math.max(...visibleTodos.map(todo => todo.id)) + 1,
        title: title.trim(),
        completed: false,
        user: usersFromServer.find(user => user.id === userId) || null,
      };

      setVisibleTodos([...visibleTodos, newTodo]);
      clearForm();
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
          <label htmlFor="title">
            <span>Title: </span>
            <input
              type="text"
              data-cy="titleInput"
              name="title"
              placeholder="Enter a title"
              value={title}
              onChange={changeTitle}
            />
            <span className="error">{!title && `${titleError}`}</span>
          </label>
        </div>

        <div className="field">
          <label htmlFor="user">
            <span>User: </span>
            <select
              data-cy="userSelect"
              id="userId"
              name="userId"
              value={userId}
              onChange={changeUser}
            >
              <option
                value="0"
              >
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            <span className="error">{!userId && `${userIdError}`}</span>
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
