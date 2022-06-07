/* eslint-disable max-len */
/* eslint-disable object-shorthand */
import React, { useState } from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './component/TodoList/TodoList';

import { User } from './react-app-env';

const App: React.FC = () => {
  const [todosCopy, setTodosCopy] = useState([...todos]);
  const [title, setTitle] = useState('');
  const [choseUser, setChoseUser] = useState('');
  const [completed, setCompleted] = useState(false);

  const clear = () => {
    setTitle('');
    setCompleted(false);
    setChoseUser('');
  };

  const todosPrepared = [...todosCopy].map(todo => ({
    ...todo,
    user: [...users].find(user => user.id === todo.userId) || null,
  }));

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>

      <form
        className="App__form"
        onSubmit={(event) => {
          event.preventDefault();
          setTodosCopy([...todosCopy, {
            userId: Number(choseUser), id: todosCopy.length + 1, title: title, completed: completed,
          }]);
          clear();
        }}
      >
        <div className="App__inputBox">
          <select
            className="select is-primary"
            required
            value={choseUser}
            onChange={(event) => {
              setChoseUser(event.target.value);
            }}
          >
            <option>Choose User</option>

            {users.map((user:User) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <div className="App__input">
            <label htmlFor="title">Title</label>
            <input
              className="input is-primary"
              required
              type="text"
              name="title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>

          <div>
            <input
              type="checkbox"
              name="completed"
              checked={completed}
              onChange={() => setCompleted(!completed)}
            />
            <label htmlFor="completed">Check if completed</label>
          </div>
        </div>

        <button
          className="button is-link"
          type="submit"
        >
          Add
        </button>
      </form>

      <TodoList todosPrepared={todosPrepared} />
    </div>
  );
};

export default App;
