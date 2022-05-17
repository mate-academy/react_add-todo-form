import React, { useState } from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';

import users from './api/users';
import todos from './api/todos';

const findUserById = (userId: number) => {
  return users.find(user => user.id === userId) || null;
};

const initialTodos = () => {
  return todos.map(todo => ({
    ...todo,
    user: findUserById(todo.userId),
  }));
};

const App: React.FC = () => {
  const [preparedTodos, setPreparedTodos] = useState(initialTodos);
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');

  const addTodo = () => {
    const newTodo = {
      userId,
      id: preparedTodos.length + 1,
      title,
      completed: false,
      user: findUserById(userId),
    };

    setPreparedTodos((prev) => [...prev, newTodo]);
    setUserId(0);
    setTitle('');
  };

  const setNewTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const setNewUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+(event.target.value));
  };

  return (
    <div className="App">
      <TodoList todos={preparedTodos} />

      <form
        onSubmit={(event) => {
          event.preventDefault();
          addTodo();
        }}
      >
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={setNewTitle}
          />
        </div>

        <div>
          <select
            value={userId}
            onChange={setNewUserId}
          >
            <option
              value={0}
            >
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default App;
