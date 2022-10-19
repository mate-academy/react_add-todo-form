import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './react-app-env';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [selectUser, setSelectUser] = useState(0);
  const [submit, setSubmit] = useState(false);

  const largestId = Math.max(...todos.map(todo => todo.id));

  const addTodo = () => {
    const newTodo: Todo = {
      id: largestId + 1,
      title,
      completed: false,
      userId: +selectUser,
    };

    setTodos([...todos, newTodo]);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmit(true);

    if (title && selectUser) {
      addTodo();
      setSubmit(false);
      setTitle('');
      setSelectUser(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">
            Title:
          </label>

          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          {
            submit && !title
            && (<span className="error">Please enter a title</span>)
          }
        </div>

        <div className="field">
          <label htmlFor="selectUser">
            User:
          </label>

          <select
            id="selectUser"
            data-cy="userSelect"
            value={selectUser}
            onChange={(e) => setSelectUser(+e.currentTarget.value)}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}

          </select>
          {
            submit && !selectUser
            && (<span className="error">Please choose a user</span>)
          }
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
