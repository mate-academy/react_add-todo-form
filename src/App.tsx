import React, { useState } from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';

const findUserById = (userId: number) => {
  return users.find(user => user.id === userId) || null;
};

const prepared = () => {
  return todos.map(todo => ({
    ...todo,
    user: findUserById(todo.userId),
  }));
};

const App: React.FC = () => {
  const [listTodo, setlistTodo] = useState(prepared);
  const [userId, setUserId] = useState(0);
  const [usersError, setUsersError] = useState(false);
  const [titlesError, setTitleError] = useState(false);
  const [title, setTitle] = useState('');

  const newUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUsersError(false);
  };

  const newTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const addTodo = () => {
    if (title === '') {
      setTitleError(true);
    }

    if (userId === 0) {
      setUsersError(true);
    }

    if (title !== '' && userId !== 0) {
      const newTodo = {
        userId,
        id: listTodo.length + 1,
        title,
        completed: false,
        user: findUserById(userId),
      };

      setlistTodo([...listTodo, newTodo]);
      setUserId(0);
      setTitle('');
    }
  };

  return (
    <div className="App">

      <form onSubmit={(event) => {
        event.preventDefault();
        addTodo();
      }}
      >
        <div className="App__input">
          <input
            type="text"
            value={title}
            onChange={newTitle}
          />
          {titlesError && (
            <div className="error">
              Please enter the title
            </div>
          )}
        </div>
        <div className="App__input">
          <select value={userId} onChange={newUserId}>
            <option value={0}>
              Choose a User
            </option>
            {users.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {usersError && (
            <div className="error">
              Please choose a user
            </div>
          )}
        </div>
        <button
          type="submit"
          className="App__button"
        >
          Add
        </button>
      </form>
      <TodoList
        todoList={listTodo}
      />
    </div>
  );
};

export default App;
