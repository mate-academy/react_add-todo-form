import React, { useState } from 'react';

import TodoList from './components/TodoList/TodoList';

import './App.scss';

import todos from './api/todos';
import users from './api/users';

const preparedTodos = todos.map(todo => {
  const todoUser = users.find(user => user.id === todo.userId);

  if (!todoUser) {
    throw new Error('no user found');
  }

  return {
    title: todo.title,
    completed: todo.completed,
    user: todoUser,
  };
});

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(users[0]);
  const [visibleTodos, setVisibleTodos] = useState(preparedTodos);

  return (
    <div className="App">
      <h1>Static list of todos</h1>
      <TodoList preparedTodos={visibleTodos} />
      <form
        className="form"
        onSubmit={(event => {
          event.preventDefault();
          if (!title) {
            return;
          }

          const newTodo = {
            title,
            completed: false,
            user,
          };

          setVisibleTodos([...visibleTodos, newTodo]);
        })}
      >
        <label htmlFor="title">
          Title:
          <input
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <select
          value={user.name}
          onChange={(event) => {
            const currUser = users.find(searchUser => searchUser.name === event.target.value);

            if (!currUser) {
              throw new Error('no user found');
            }

            setUser(currUser);
          }}
        >
          {users.map(opUser => (
            <option
              key={opUser.id}
              value={opUser.name}
            >
              {opUser.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="form__button"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default App;
