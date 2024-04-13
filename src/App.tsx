import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [titleCheck, setTitleCheck] = useState('');
  const [titleTouched, setTitleTouched] = useState(false);

  const [userCheck, setUserCheck] = useState('');
  const [userTouched, setUserTouched] = useState(false);

  const [todos, setTodos] = useState(todosFromServer);

  const [newId, setNewId] = useState(20);

  const newTodo = {
    id: newId,
    title: titleCheck,
    completed: false,
    userId: +userCheck,
  };

  const addPost = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setTodos(prevTodos => [...prevTodos, newTodo]);

    setNewId(newId + 1);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={addPost}>
        <div className="field">
          Title:&nbsp;
          <input
            required
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={titleCheck}
            onChange={event => setTitleCheck(event.target.value)}
            onBlur={() => setTitleTouched(true)}
          />
          {titleTouched && !titleCheck && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          User:&nbsp;
          <select
            required
            data-cy="userSelect"
            value={userCheck}
            onChange={event => setUserCheck(event.target.value)}
            onBlur={() => setUserTouched(true)}
          >
            <option value="" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userTouched && !userCheck && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} usersFromServer={usersFromServer} />
    </div>
  );
};
