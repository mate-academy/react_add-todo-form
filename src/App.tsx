/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { TodoList } from './Components/TodoList/TodoList';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const App: React.FC = () => {
  const preparedTodo = todos.map(todo => {
    const user = users.find(u => u.id === todo.userId) || null;

    return { ...todo, user };
  });

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);
  const [newTodos, setNewTodos] = useState(preparedTodo);

  const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title === '') {
      setTitleError(true);
    }

    if (userId === 0) {
      setUserIdError(true);
    }

    if (title !== '' && userId !== 0) {
      const user = users.find(u => u.id === userId) || null;

      const newTodo = {
        userId,
        id: newTodos.length + 1,
        title,
        completed: false,
        user,
      };

      setNewTodos([...newTodos, newTodo]);
      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        className="App__users"
        onSubmit={handlerSubmit}
      >
        <div className="input">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {titleError && (
            <span>Please enter the title</span>
          )}
        </div>
        <div className="select">
          <label htmlFor="users">
            Users:
          </label>
          <select
            name="users"
            id="users"
            value={userId}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setUserId(+event.target.value);
              setUserIdError(false);
            }}
          >
            <option value={0}>Choose a user</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
          {userIdError && (
            <span>Please choose a user</span>
          )}
        </div>
        <button
          type="submit"
        >
          Add
        </button>
      </form>
      <TodoList todoList={newTodos} />
    </div>
  );
};

export default App;
