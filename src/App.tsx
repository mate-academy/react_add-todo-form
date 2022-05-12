import React, { useState, useMemo } from 'react';
import './App.scss';
import { Todos } from './types/Todos';
import { TodoList } from './components/TodoList/TodoList';

import todos from './api/todos';
import users from './api/users';

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [todo, setTodo] = useState(todos);
  const [status, setStatus] = useState('not completed');
  const [errUser, setErrUser] = useState<string | null>(null);
  const [errTitle, setErrTitle] = useState<string | null>(null);

  const hangleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;

    setTitle(newTitle.replace(/[^a-zA-Z0-9А-Яа-я\s]/g, ''));
    setErrTitle(null);
  };

  const validate = () => {
    if (!user) {
      setErrUser('Please choose a user');
    }

    if (!title.trim()) {
      setErrTitle('Please enter the title');
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

  const newArr = (arrTodo: Omit<Todos, 'user'>[]) => arrTodo.map((oneTodo) => ({
    ...oneTodo,
    user: users.find((oneUser) => oneUser.id === oneTodo.userId),
  }));

  const preparedTodos: Todos[] = useMemo(() => newArr(todo), [todo]);

  return (
    <div className="App">
      <h1 className="App__title">Static list of todos</h1>

      <TodoList todos={preparedTodos} />

      <form onSubmit={addTodo} className="App__form">
        <h2 className="App__formTitle">Create a new todo</h2>

        <div className="App__wrapper">
          <label>
            <input
              type="text"
              name="title"
              value={title}
              placeholder="Title"
              onChange={hangleTitle}
              className="App__inputTitle"
            />
          </label>
          {errTitle && <span className="App__error">{errTitle}</span>}

          <select
            name="user"
            value={user}
            onChange={event => {
              setUser(event.target.value);
              setErrUser(null);
            }}
            className="App__select"
          >
            <option value="">Choose a user</option>
            {users.map(({ name, id }) => (
              <option key={id} value={name}>{name}</option>
            ))}
          </select>
          {errUser && <span className="App__error">{errUser}</span>}
        </div>

        <label htmlFor="status_not">Not completed</label>
        <input
          type="radio"
          id="status_not"
          name="status"
          value="not completed"
          checked={status === 'not completed'}
          onChange={event => {
            setStatus(event.target.value);
          }}
          className="App__radioNot"
        />

        <label htmlFor="status_yes">Completed</label>
        <input
          type="radio"
          id="status_yes"
          name="status"
          value="completed"
          checked={status === 'completed'}
          onChange={event => setStatus(event.target.value)}
          className="App__radioYes"
        />

        <button type="submit" className="App__button">Add</button>
      </form>
    </div>
  );
};

export default App;
