import React, { useState } from 'react';
import classnames from 'classnames';
import './App.css';
import todosFromServer from './api/todos';
import { TodoList } from './Components/TodoList/TodoLIst';

import users from './api/users';

const preparedTodos = todosFromServer.map(todo => {
  return {
    ...todo,
    user: users.find(user => user.id === todo.userId)
      || null,
  };
});

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [todos, setTodos] = useState(preparedTodos);

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (title && userId) {
      const newTodo = {
        userId,
        id: preparedTodos.length + 1,
        title,
        completed: false,
        user: users.find(user => user.id === userId)
          || null,
      };

      setTodos([...todos, newTodo]);

      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add a todo</h1>

      <form
        action="get"
        onSubmit={onFormSubmit}
      >
        <div>
          <select
            className={classnames({ error: hasUserIdError })}
            name="select"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              setHasUserIdError(false);
            }}
          >
            <option value="0">
              Choose user name
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
          {hasUserIdError && (
            'Please choose a user'
          )}
        </div>
        <div>
          <label htmlFor="titleId">
            <input
              type="text"
              placeholder="new todo"
              className={hasTitleError ? 'error' : ''}
              value={title}
              onChange={event => {
                setTitle(event.target.value);
                setHasTitleError(false);
              }}
            />
          </label>
          {hasTitleError && ('Please enter the title')}
        </div>
        <button type="submit">Add</button>
      </form>

      <div>
        <TodoList todos={todos} />
      </div>
    </div>
  );
};

export default App;
