import React, { useState, useMemo } from 'react';
import './App.scss';
import { Todos } from './types/Todos';

import { TodoInfo } from './components/TodoInfo/TodoInfo';

import users from './api/users';
import todos from './api/todos';

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [todo, setTodo] = useState(todos);
  const [status, setStatus] = useState('not completed');
  const [errorUser, setErrorUser] = useState<string | null>(null);
  const [errorTitle, setErrorTitle] = useState<string | null>(null);

  const hangleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;

    setTitle(newTitle.replace(/[^a-zA-Z0-9А-Яа-я\s]/g, ''));
    setErrorTitle(null);
  };

  const validate = () => {
    if (!user) {
      setErrorUser('Please choose a user');
    }

    if (!title.trim()) {
      setErrorTitle('Please enter the title');
    }

    if (!user || !title.trim()) {
      return false;
    }

    return true;
  };

  const addTodo = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (validate()) {
      const searchingUser = users.find(({ name }) => name === user);

      const newTodo = {
        id: todo[todo.length - 1].id + 1,
        title,
        userId: searchingUser ? searchingUser.id : 0,
        completed: status === 'completed',
      };

      setTodo((current) => [...current, newTodo]);
      setTitle('');
      setUser('');
      setStatus('not completed');
    }
  };

  const selectedTodo = (
    arrTodo: Omit<Todos, 'user'>[],
  ) => arrTodo.map((oneTodo) => ({
    ...oneTodo,
    user: users.find((oneUser) => oneUser.id === oneTodo.userId),
  }));

  const preparedTodos: Todos[] = useMemo(() => selectedTodo(todo), [todo]);

  return (
    <div className="App">
      <h1 className="App__title">List of todos</h1>

      <form onSubmit={addTodo} className="App__form">
        <h2 className="App__form-title">Create a new todo</h2>

        <div className="App__wrapper">
          <label>
            <input
              type="text"
              name="title"
              value={title}
              placeholder="Title"
              onChange={hangleTitle}
              className="App__input-title"
            />
          </label>
          {errorTitle && <span className="App__error">{errorTitle}</span>}

          <select
            name="user"
            value={user}
            onChange={event => {
              setUser(event.target.value);
              setErrorUser(null);
            }}
            className="App__select"
          >
            <option value="">Choose a user</option>
            {users.map(({ name, id }) => (
              <option key={id} value={name}>{name}</option>
            ))}
          </select>
          {errorUser && <span className="App__error">{errorUser}</span>}
        </div>

        <label className="App__label" htmlFor="status_not">
          <input
            type="radio"
            id="status_not"
            name="status"
            value="not completed"
            checked={status === 'not completed'}
            onChange={event => {
              setStatus(event.target.value);
            }}
            className="App__radio"
          />
          Not completed
        </label>
        <label className="App__label" htmlFor="status_yes">
          <input
            type="radio"
            id="status_yes"
            name="status"
            value="completed"
            checked={status === 'completed'}
            onChange={event => setStatus(event.target.value)}
            className="App__radio"
          />
          Completed
        </label>

        <button type="submit" className="App__button">Add</button>
      </form>

      <ul className="App__list">
        {preparedTodos.map((item) => (
          <li
            key={item.id}
            className="App__item"
          >
            <TodoInfo
              title={item.title}
              status={item.completed}
              user={item.user}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
