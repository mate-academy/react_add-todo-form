import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import TodoList from './components/TodoList/TodoList';

let preparedTodos: Todo[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [username, setUser] = useState('');

  const addTodo = () => {
    const newTodo = {
      id: preparedTodos[preparedTodos.length - 1].id + 1,
      title,
      userId: users.find(user => user.name === username)?.id || null,
      completed: false,
      user: users.find(user => user.name === username) || null,
    };

    preparedTodos = [...preparedTodos, newTodo];
    setTitle('');
    setUser('');
  };

  type Event = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

  const handleChange = (event: Event) => {
    const { name, value } = event.target;

    return (name === 'title') ? setTitle(value) : setUser(value);
  };

  return (
    <div className="App list">
      <h1 className="title">Add todo form</h1>

      <form
        action="#"
        className="
          d-flex
          flex-column
          justify-content-center
          align-items-center
          mb-4
          form-control
          form-control-lg"
      >
        <input
          type="text"
          name="title"
          className="input-group mb-3 form-select-lg"
          placeholder="Add a todo"
          value={title}
          onChange={handleChange}
        />

        {!title ? <p>Please enter the title</p> : null}

        <select
          name="username"
          className="form-select form-select-lg mb-3"
          value={username}
          onChange={handleChange}
        >
          <option
            value=""
            disabled
          >
            Choose a user
          </option>

          {users.map((user) => (
            <option value={user.name} key={user.id}>{user.name}</option>
          ))}
        </select>

        {!username && <p>Please choose a user</p>}

        <button
          type="button"
          className="btn btn-secondary"
          onClick={addTodo}
        >
          Add
        </button>
      </form>

      <TodoList todos={preparedTodos} />
    </div>
  );
};

export default App;
