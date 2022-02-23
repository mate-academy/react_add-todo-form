import React, { useState } from 'react';
import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import './App.scss';

const App: React.FC = () => {
  const prepared = () => {
    return todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId) || null,
    }));
  };

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);
  const [prepare, setPrepare] = useState(prepared);

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
        id: Date.now(),
        title,
        completed: false,
        user: users.find(user => user.id === userId) || null,
      };

      setPrepare((currentTodos) => [...currentTodos, newTodo]);
      setUserId(0);
      setTitle('');
    }
  };

  return (
    <div className="App">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addNewTodo();
        }}
      >
        <div>
          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={(event) => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {titleError && (
            <span className="error">
              Please enter the title
            </span>
          )}

        </div>

        <div>
          <select
            value={userId}
            onChange={(event) => {
              setUserId(Number(event.target.value));
              setUserIdError(false);
            }}
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
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button
          type="submit"
        >
          Add
        </button>
      </form>

      <TodoList todoList={prepare} />

    </div>
  );
};

export default App;
