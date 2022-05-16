import React, { useState, FormEvent } from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const preparedTodos = todosFromServer.map(todo => {
  return {
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId) || null,
  };
});

const App: React.FC = React.memo(() => {
  const [todos, setTodos] = useState([...preparedTodos]);
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [isTitle, setIsTitle] = useState(false);
  const [isUserName, setIsUserName] = useState(false);

  const changeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitle(false);
  };

  const changeNameHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserName(event.target.value);
    setIsUserName(false);
  };

  const addNewTodo = () => {
    const newUser = usersFromServer.find(
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

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
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
      <h1>Add todo form</h1>

      <p>
        <span>Users: </span>
        {usersFromServer.length}
      </p>

      <form onSubmit={submitHandler}>
        <label htmlFor="title">
          <input
            type="text"
            id="title"
            placeholder="Add title"
            value={title}
            onChange={changeTitleHandler}
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
            onChange={changeNameHandler}
          >
            <option value="">
              Choose a user
            </option>

            {usersFromServer.map(user => (
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
