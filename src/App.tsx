import React, { useState } from 'react';
import './App.css';
import { User, FullTodo } from './react-app-env';
import { Todolist } from './components/TodoList/TodoList';

import users from './api/users';
import todos from './api/todos';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState(false);
  const [upgrade, setUpgrade] = useState(todos);
  const [titleError, settitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const AddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!input.length) {
      settitleError(true);
    }

    if (name === '') {
      setUserError(true);
    }

    const currentUser = users.find(user => user.name === name) || null;

    if (input.length > 0 && name.length > 0) {
      const newTodo = {
        userId: currentUser ? currentUser.id : 0,
        id: upgrade[upgrade.length - 1].id + 1,
        title: input,
        user: currentUser,
        completed: status,
      };

      setUpgrade(current => ([
        ...current,
        newTodo,
      ]));

      setInput('');
      setName('');
      setStatus(false);
    }
  };

  const PreparedTodos: FullTodo[] = upgrade.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  }));

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={(event) => {
          AddTodo(event);
        }}
      >
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Task"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
            settitleError(false);
          }}
        />

        {titleError && <p>Please enter the title</p> }

        <select
          data-cy="userSelect"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setUserError(false);
          }}
        >
          <option value="">Choose user</option>
          {users.map((user: User) => (
            <option key={user.id} value={user.name}>{ user.name }</option>
          ))}
        </select>

        {userError && <p>Please choose a user</p> }

        <label htmlFor="checkbox"> Completed </label>
        <input
          type="checkbox"
          id="checkbox"
          checked={status}
          onChange={() => {
            setStatus(!status);
          }}

        />

        <button type="submit">
          Add
        </button>

      </form>

      <Todolist fulltodos={PreparedTodos} />

    </div>
  );
};

export default App;
