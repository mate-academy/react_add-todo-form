import React, { useMemo, useState } from 'react';
import './App.scss';
import todos from './api/todos';

import users from './api/users';
import { Todos } from './types/Todos';
import { TodoList } from './components/TodoList/TodoList';

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
    <div className="todo">

      <TodoList todos={preparedTodos} />

      <form onSubmit={addTodo} className="todo-form">
        <h2 className="todo-form__formTitle">Create a new todo</h2>

        <div className="todo-form__wrp">

          <label className="todo-form__label">
            <input
              type="text"
              name="title"
              value={title}
              placeholder="Title"
              onChange={hangleTitle}
              className="todo-form__inputTitle"
            />
          </label>
          {errTitle && <span className="todo-form__error">{errTitle}</span>}

          <select
            name="user"
            value={user}
            onChange={event => {
              setUser(event.target.value);
              setErrUser(null);
            }}
            className="todo-form__select"
          >
            <option value="">Choose a user</option>
            {users.map(({ name, id }) => (
              <option key={id} value={name}>{name}</option>
            ))}
          </select>

          {errUser && <span className="todo-form__error">{errUser}</span>}
        </div>

        <label
          htmlFor="status_not"
          className="todo-form__label"
        >
          Not completed
        </label>

        <input
          type="radio"
          id="status_not"
          name="status"
          value="not completed"
          checked={status === 'not completed'}
          onChange={event => {
            setStatus(event.target.value);
          }}
          className="todo-form__radioNot"
        />

        <label htmlFor="status_yes">Completed</label>

        <input
          type="radio"
          id="status_yes"
          name="status"
          value="completed"
          checked={status === 'completed'}
          onChange={event => setStatus(event.target.value)}
          className="todo-form__radioYes"
        />

        <button type="submit" className="todo-form__btn">Add</button>
      </form>
    </div>
  );
};

export default App;
