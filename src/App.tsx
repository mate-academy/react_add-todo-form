import './App.scss';
import { useState } from 'react';

import { initialTodos } from './services/initialTodos';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import { Todo } from './types/Todo';
import { getUserById } from './services/GetUserById';

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);

  const [title, setTitle] = useState('');
  const [isValidTitle, setIsValidTitle] = useState(false);

  const [userId, setUserId] = useState(0);
  const [isValidUser, setIsValidUser] = useState(false);

  // const [count, setCount] = useState(0);

  // const [date, setDate] = useState(+new Date());

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const addTodo = (newTodo: Todo) => {
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim() || !userId) {
      if (!title.trim()) {
        setIsValidTitle(true);
      }

      if (!userId) {
        setIsValidUser(true);
      }

      return;
    }

    // setCount((currentCount) => currentCount + 1);

    const getMaxId = () => {
      const numArray = todos.map((todo) => todo.id);

      return Math.max(...numArray);
    };

    addTodo({
      id: getMaxId() + 1,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    reset();
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsValidTitle(false);
  };

  const handleChooseUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIsValidUser(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        // key={count}
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            value={title}
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            onChange={handleTitle}
            required
          />
          {isValidTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            value={userId}
            data-cy="userSelect"
            onChange={handleChooseUser}
            required
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(u => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>

          {isValidUser && (
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
