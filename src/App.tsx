import React, { useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import './App.css';

import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './react-app-env';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([...todosFromServer]);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [completed, setCompleted] = useState(false);

  const [titleIsEmpty, setTitleIsEmpty] = useState(false);
  const [userIdIsEmpty, setUserIdIsEmpty] = useState(false);

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    if (title === '') {
      setTitleIsEmpty(true);
    }

    if (userId === 0) {
      setUserIdIsEmpty(true);
    }

    if (title && userId) {
      setTodos([...todos, {
        userId,
        id: todos.length + 1,
        title,
        completed,
      }]);

      setTitle('');
      setUserId(0);
      setCompleted(false);
    }
  };

  const preparedTodos = todos.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => todo.userId === user.id) || null,
  }));

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        className="form"
        action="#"
        onSubmit={handleSubmit}
      >

        <label>
          <input
            className="field"
            type="text"
            name="title"
            placeholder="Add title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setTitleIsEmpty(false);
            }}
          />
          {titleIsEmpty && (
            <span className="warning">
              Please enter the title
            </span>
          )}
        </label>

        <label>

          <select
            className="field"
            name="userId"
            value={userId}
            onChange={(event) => {
              setUserId(+event.target.value);
              setUserIdIsEmpty(false);
            }}
          >

            <option value={0} disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
          {userIdIsEmpty && (
            <span className="warning">
              Please choose a user
            </span>
          )}
        </label>

        <label>
          Completed
          <input
            type="checkbox"
            name="completed"
            checked={completed}
            onChange={() => {
              setCompleted(!completed);
            }}
          />

        </label>

        <div>
          <button type="submit" className="button">
            Add
          </button>
        </div>
      </form>

      <TodoList preparedTodos={preparedTodos} />

    </div>
  );
};

export default App;
