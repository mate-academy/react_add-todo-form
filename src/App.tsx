import React, { useState, FormEvent } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import './App.css';

import users from './api/users';
import todosServer from './api/todos';

const prepared = todosServer.map(item => {
  return {
    ...item,
    user: users.find(user => user.id === item.userId) || null,
  };
});

const App: React.FC = React.memo(() => {
  const [todos, setTodos] = useState([...prepared]);
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [isTitle, setIsTitle] = useState(false);
  const [isUserName, setIsUserName] = useState(false);

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitle(false);
  };

  const changeName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserName(event.target.value);
    setIsUserName(false);
  };

  const addNewTodo = () => {
    const newUser = users.find(
      user => user.name === userName,
    ) || null;
    let userId = 0;

    if (newUser) {
      userId = newUser.id;
    }

    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title,
      userId,
      completed: false,
      user: newUser,
    };

    setTodos([...todos, newTodo]);
  };

  const submitFunction = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userName || !title) {
      setIsUserName(!userName);
      setIsTitle(!title);

      return;
    }

    addNewTodo();

    setTitle('');
    setUserName('');
  };

  return (
    <div className="App">
      <h1>App todo form</h1>

      <p>
        <span>Users: </span>
        {users.length}
      </p>

      <form onSubmit={submitFunction}>
        <label htmlFor="title">
          <input
            type="text"
            id="title"
            placeholder="Add title"
            value={title}
            onChange={changeTitle}
          />
          {isTitle && (
            <span>
              Please enter the title
            </span>
          )}
        </label>

        <label htmlFor="selectUser">
          <select
            value={userName}
            id="selectUser"
            onChange={changeName}
          >
            <option value="">
              Choose a user
            </option>

            {users.map(user => (
              <option
                value={user.name}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {isUserName && (
            <span>
              Please choose a user
            </span>
          )}
        </label>

        <button type="submit">
          Add
        </button>
      </form>

      <hr />
      <TodoList todos={todos} />
    </div>
  );
});

export default App;
