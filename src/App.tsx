import React, { FormEvent, useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { TodoList } from './components/TodoList/TodoList';

const maxId = () => {
  let max = 0;

  usersFromServer.forEach(el => {
    max = el.id > max ? el.id : max;
  });

  return max + 1;
};

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [todos, setTodos] = useState([...todosFromServer]);
  const [userError, setUserError] = useState(false);
  const [todoError, setTodoError] = useState(false);

  const changeTitleHandler = (value: string) => {
    setTodoError(false);
    setTitle(value);
  };

  const changeUserHandler = (value: string) => {
    setUserError(false);
    setUser(value);
  };

  const addTodo = () => {
    if (!title || !user) {
      if (!title) {
        setTodoError(true);
      }

      if (!user) {
        setUserError(true);
      }

      return;
    }

    setTitle('');
    setUser('');

    const newTodo = {
      title,
      userId: Number(user),
      id: Number(maxId),
      completed: false,
    };

    setTodos((oldTodos) => ([
      ...oldTodos,
      newTodo,
    ]));
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form onSubmit={submitHandler}>
        <label
          htmlFor="title"
          className="label"
        >
          <input
            id="title"
            type="text"
            value={title}
            placeholder="Do something..."
            onChange={(event) => changeTitleHandler(event.target.value)}
          />
          {todoError && (
            <span className="label_danger">Please enter the titile</span>
          )}
        </label>
        <label htmlFor="select" className="label">
          <select
            id="select"
            name="user"
            value={user}
            onChange={(event) => changeUserHandler(event.target.value)}
          >
            <option value="">
              Choose person
            </option>
            {
              usersFromServer.map(item => (
                <option value={item.id}>
                  {item.name}
                </option>
              ))
            }
          </select>
          {userError && (
            <span className="label_danger">Please chose a user</span>
          )}
        </label>

        <button type="submit">
          Add todo
        </button>
      </form>

      <p>
        <TodoList todos={todos} />
      </p>
    </div>
  );
};

export default App;
