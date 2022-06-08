/* eslint-disable max-len */
/* eslint-disable object-shorthand */
import React, { useState } from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './component/TodoList/TodoList';

import { User } from './react-app-env';

const App: React.FC = () => {
  const [todosFromServer, settodosFromServer] = useState([...todos]);
  const [title, setTitle] = useState('');
  const [choseUser, setChoseUser] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [visible, setVisible] = useState(false);

  const clear = () => {
    setTitle('');
    setCompleted(false);
    setChoseUser(0);
    setVisible(false);
  };

  const newTodo = () => (
    [...todosFromServer, {
      userId: choseUser, id: todosFromServer.length + 1, title: title, completed: completed,
    }]
  );

  const addTodo = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (choseUser > 0 && choseUser < 11) {
      settodosFromServer(newTodo);
      clear();
    } else {
      setVisible(true);
    }
  };

  const todosPrepared = [...todosFromServer].map(todo => ({
    ...todo,
    user: [...users].find(user => user.id === todo.userId) || null,
  }));

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>
      {visible && (
        <strong className="App__eror">Chose correct User</strong>
      )}

      <form
        className="App__form"
        onSubmit={(event) => addTodo(event)}
      >
        <div className="App__inputBox">
          <div>
            <select
              className="select is-primary"
              required
              value={choseUser}
              onChange={(event) => {
                setChoseUser(+event.target.value);
              }}
            >
              <option disabled value={0}>Choose User</option>

              {users.map((user:User) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

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
