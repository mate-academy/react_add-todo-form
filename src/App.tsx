import React, { useState } from 'react';
import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import './App.scss';

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
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);
  const [preparedTodos, setPrepareTodos] = useState(prepared);

  const setNewUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setUserIdError(false);
  };

  const setNewTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const addNewTodo = () => {
    if (title === '') {
      setTitleError(true);
    }

    if (userId === 0) {
      setUserIdError(true);
    }

    if (title !== '' && userId !== 0) {
      const newTodo = {
        userId,
        id: preparedTodos.length + 1,
        title,
        completed: false,
        user: findUserById(userId),
      };

      setPrepareTodos((currentTodos) => [...currentTodos, newTodo]);
      setUserId(0);
      setTitle('');
    }
  };

  return (
    <div className="App">
      <form
        className="App__form"
        onSubmit={(event) => {
          event.preventDefault();
          addNewTodo();
        }}
      >
        <input
          className="App__form--field"
          type="text"
          value={title}
          placeholder="Title"
          onChange={setNewTitle}
        />

        {titleError && (
          <span className="App__form--error">
            Please enter the title
          </span>
        )}

        <select
          className="App__form--field"
          value={userId}
          onChange={setNewUserId}
        >

          <option
            value={0}
          >
            Choose a user
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

        {userIdError && (
          <span className="App__form--error">
            Please choose a user
          </span>
        )}

        <button
          className="App__form--field"
          type="submit"
        >
          Add
        </button>
      </form>

      <TodoList todos={preparedTodos} />

    </div>
  );
};

export default App;
