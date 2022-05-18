import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import { Todos } from './types/Todos';

import users from './api/users';
import todos from './api/todos';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState(todos);
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState('NOT YET');
  const [user, setUser] = useState('');
  const [errTitle, setErrTitle] = useState<null | string>(null);
  const [errUser, setErrUser] = useState<null | string>(null);

  const createTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^A-Za-zА-Яа-яёЁ0-9 ]/g, ''));
    setErrTitle(null);
  };

  const validation = () => {
    if (!user) {
      setErrUser('Please choose a user');
    }

    if (!title) {
      setErrTitle('Please enter the title');
    }

    if (!user || !title) {
      return false;
    }

    return true;
  };

  const addTodo = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (validation()) {
      const person = users.find(onePerson => onePerson.name === user);

      const newTodo = {
        id: todoList.length + 1,
        userId: person ? person.id : 0,
        title,
        completed: completed === 'DONE',
        user: person,
      };

      setTodoList((list) => [...list, newTodo]);

      setTitle('');
      setCompleted('NOT YET');
      setUser('');
    }
  };

  const preparedTodos: Todos[] = todoList.map(todo => ({
    ...todo,
    user: users.find(person => person.id === todo.userId) || null,
  }));

  return (
    <div className="app">
      {/* <h1>Add todo form</h1> */}
      <TodoList todos={preparedTodos} />
      <div className="app__inputField">

        <form className="app__form" onSubmit={addTodo}>
          <h2>Let&apos;s add new Todo</h2>

          <input
            className="app__input"
            placeholder="Title"
            type="text"
            value={title}
            onChange={createTitle}
          />
          {errTitle && <p className="app__error">Please enter the title</p>}
          <select
            className="app__input"
            name="userName"
            value={user}
            onChange={event => {
              setUser(event.target.value);
              setErrUser(null);
            }}
          >
            <option value="Choose a user">Choose a user</option>
            {users.map(({ name, id }) => (
              <option
                value={name}
                key={id}
              >
                {name}
              </option>
            ))}
          </select>

          {errUser && <p className="app__error">{errUser}</p>}

          <label>
            NOT YET
            <input
              type="radio"
              value="NOT YET"
              checked={completed === 'NOT YET'}
              onChange={event => {
                setCompleted(event.target.value);
              }}
            />
          </label>

          <label>
            DONE
            <input
              type="radio"
              value="DONE"
              checked={completed === 'DONE'}
              onChange={event => {
                setCompleted(event.target.value);
              }}
            />
          </label>

          <button type="submit" className="app__button">Add</button>
        </form>
      </div>
    </div>
  );
};
