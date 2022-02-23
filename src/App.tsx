import React, { useState } from 'react';
import classnames from 'classnames';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

import './App.css';
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
      <h1>Add todo form</h1>

      <form
        onSubmit={onFormSubmit}
        action="get"
      >

        <div>
          <select
            className={classnames({ error: hasUserIdError })}
            value={userId}
            name="select"
            onChange={(event) => {
              setUserId(+event.target.value);
              setHasUserIdError(false);
            }}
          >
            <option value="0">Chose user name</option>

            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {hasUserIdError
            && ('Please choose a user')}
        </div>

        <div>
          <input
            type="text"
            placeholder="Input new todo"
            className={hasTitleError ? 'error' : ''}
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setHasTitleError(false);
            }}
          />
          {hasTitleError
            && ('Please enter the title')}
        </div>

        <button type="submit">Add</button>
      </form>

      <div className="list__item">
        <TodoList todos={todos} />
      </div>
    </div>
  );
};

export default App;
