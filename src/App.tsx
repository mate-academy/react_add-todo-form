import React, { useState } from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import users from './api/users';
import todosFromServer from './api/todos';

const preparedTodos = todosFromServer.map(todo => {
  return {
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  };
});

const App: React.FC = () => {
  const [todos, setTodos] = useState([...preparedTodos]);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const unicId = todos.length + 1;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title) {
      setHasTitleError(true);
    }

    if (!userId) {
      setHasUserIdError(true);
    }

    if (title && userId) {
      const todo = {
        id: unicId,
        title,
        completed: false,
        userId: +userId,
        user: users.find(u => u.id === +userId) || null,
      };

      setTodos([...todos, todo]);
      setTitle('');
      setUserId(0);
    }
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  return (
    <div className="App">
      <h1 className="title is-1 ml-0">Add todo form</h1>

      <form
        action="get"
        className="box"
        onSubmit={handleSubmit}
      >
        <div>
          <input
            type="text"
            value={title}
            className="input"
            onChange={handleTitleChange}
          />
          {hasTitleError && (
            <span className="tag is-danger is-medium mt-1">
              Please enter a title
            </span>
          )}
        </div>
        <div>
          <select
            className="select is-fullwidth"
            value={userId}
            onChange={handleSelect}
          >
            <option
              value="0"
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
            <span className="tag is-danger is-medium mt-1">
              Please choose a user
            </span>
          )}
        </div>

        <button
          type="submit"
          className="button"
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
