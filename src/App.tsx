import React, { useState, FormEvent } from 'react';
import { TodoList } from './components/TodoList/TodoList';

import './App.css';

import users from './api/users';
import todosFromServer from './api/todos';

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

const App: React.FC = React.memo(() => {
  const [todos, setTodos] = useState([...preparedTodos]);
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
      id: todos[todos.length - 1].id + 1,
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
    <div className="app">
      <form className="form" onSubmit={submitFunction}>
        <label htmlFor="title">
          <input
            className="form-control"
            type="text"
            placeholder="Title"
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
            className="form-select"
            aria-label="Default select example"
            value={userName}
            id="selectUser"
            onChange={changeName}
          >
            <option disabled value="">
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

        <button className="btn btn-secondary" type="submit">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
});

export default App;
