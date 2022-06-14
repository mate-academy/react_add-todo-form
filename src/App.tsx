import React, { useState } from 'react';
import './App.css';

import users from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

import { User, PrepTodo } from './react-app-env';

const getUserById = (userId: number): User | null => {
  return users.find(user => user.id === userId) || null;
};

const todosWithUser: PrepTodo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const App: React.FC = () => {
  const [todos, setTodos] = useState<PrepTodo[]>(todosWithUser);
  const [newTodoName, setNewTodoName] = useState('');
  const [hasNameError, setHasNameError] = useState(false);

  const [selectUserId, setSelectUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  const [wasCompleted, setWasCompleted] = useState(false);

  const addTodo = (name: string, userId: number) => {
    const newTodo: PrepTodo = {
      id: Date.now(),
      name,
      userId,
      completed: wasCompleted,
      user: getUserById(selectUserId),
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasNameError(!newTodoName);
    setHasUserIdError(!selectUserId);

    if (newTodoName && selectUserId) {
      addTodo(newTodoName, selectUserId);
      setNewTodoName('');
      setSelectUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleSubmit}
      >
        <label className="">
          <p className="App__title">Title</p>
          <input
            type="text"
            value={newTodoName}
            placeholder="write to do"
            onChange={(event) => {
              setNewTodoName(event.target.value);
              setHasNameError(false); // set false in state
            }}
            className="App__input"
          />
          {hasNameError && (
            <p className="error">Write name of &quot;to do&quot;</p>
          )}
        </label>

        <div className="">
          <select
            value={selectUserId}
            onChange={(event) => {
              setSelectUserId(+event.target.value);
              setHasNameError(false);
            }}
            className="App__select"
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>

            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {hasUserIdError && (
            <span className="error">Choose user</span>
          )}

        </div>

        <div>
          <label>
            completed
            <input
              type="radio"
              name="complete"
              value="true"
              onChange={() => {
                setWasCompleted(true);
              }}
            />
          </label>
          <label>
            should complete
            <input
              type="radio"
              name="complete"
              value="false"
              onChange={() => {
                setWasCompleted(false);
              }}
            />
          </label>
        </div>

        <button
          type="submit"
          className="App__button"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />

    </div>
  );
};

export default App;
