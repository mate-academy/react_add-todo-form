import './App.scss';
import React, { useState, FormEvent } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

const App: React.FC = () => {
  const [todos, setTodos] = useState([...preparedTodos]);
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [isTitle, setIsTitle] = useState(false);
  const [isUserName, setIsUserName] = useState(false);

  const addNewTodo = () => {
    const newUser = usersFromServer.find(
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

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitle(false);
  };

  const onUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserName(event.target.value);
    setIsUserName(false);
  };

  return (
    <div className="App">
      <h1 className="title">Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        className="field box"
        onSubmit={submitFunction}
      >
        <label htmlFor="title">
          <input
            className="input is-primary"
            type="text"
            placeholder="Title"
            value={title}
            onChange={onTitleChange}
          />
          {isTitle && (
            <span>
              Please enter the title
            </span>
          )}
        </label>

        <label htmlFor="selectUser">
          <select
            className="dropdown is-large"
            aria-label="Default select example"
            value={userName}
            id="selectUser"
            onChange={onUserChange}
          >
            <option disabled value="">
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

        <button className="button is-black is-normal" type="submit">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};

export default App;
