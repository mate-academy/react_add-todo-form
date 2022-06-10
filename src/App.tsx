import React, { useState } from 'react';
import cn from 'classnames';
import { TodoList } from './components/TodoList';
import { Todo } from './react-app-env';
import './App.css';

import users from './api/users';
import todosFromServer from './api/todos';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([...todosFromServer]);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const userSelectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!userId);

    if (title && userId) {
      const newTodo = {
        userId,
        id: todos.length + 1,
        title,
        completed: false,
      };

      setTodos((current) => [...current, newTodo]);

      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="container">
      <TodoList todos={todos} />

      <form
        className="d-flex flex-column"
        onSubmit={handleSubmit}
      >
        <input
          className={cn(
            'form-control',
            'mb-3',
            { 'border-danger': hasTitleError },
          )}
          type="text"
          value={title}
          placeholder="Enter a new task"
          onChange={(event) => {
            titleHandler(event);
            setHasTitleError(false);
          }}
        />
        {hasTitleError && (
          <p className="text-danger">Please enter the title</p>
        )}

        <select
          className={cn(
            'form-select',
            'mb-3',
            { 'border-danger': hasTitleError },
          )}
          value={userId}
          onChange={(event) => {
            userSelectHandler(event);
            setHasUserError(false);
          }}
        >
          <option value="0" disabled>Choose a user</option>

          {users.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>

        {hasUserError && (
          <p className="text-danger">Please choose a user</p>
        )}

        <button
          className="btn btn-success"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default App;
