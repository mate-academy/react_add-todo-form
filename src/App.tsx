/* eslint-disable no-console */
import React, { useState } from 'react';
import classNames from 'classnames';
import './App.css';

import todos from './api/todos';
import users from './api/users';

type User = {
  id: number,
  name: string,
};

const App: React.FC = () => {
  const initialUserId = 0;
  const initialTitle = '';
  const [todoList, setTodo] = useState(todos);
  const [formTitle, setTitle] = useState(initialTitle);
  const [formUserId, setUserId] = useState(initialUserId);
  const [showAlert, setAlert] = useState('');

  const getTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const lastLetter = value[value.length - 1];

    if (lastLetter.match(/^[a-zA-Z]+$/)
      || lastLetter.match(/^[а-яА-Я]+$/)
      || lastLetter.match(/^[0-9]+$/)
      || lastLetter.match(/^[ ]+$/)) {
      setTitle(value);
    }
  };

  const getUserId = (event: React.ChangeEvent<any>) => {
    setUserId(event.target.value);
  };

  const makeSelect = () => {
    const uresList = users.map((user: User) => {
      const { id, name } = user;

      return (
        <option
          key={id}
          value={id}
        >
          {name}
        </option>
      );
    });

    return (
      <select
        name="userId"
        onChange={getUserId}
      >
        <option value={initialUserId}>
          Choose a user
        </option>
        {uresList}
      </select>
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newTodo = {
      userId: formUserId,
      id: todoList.length + 1,
      title: formTitle,
      completed: false,
    };

    if (formTitle.length > 0 && formUserId !== initialUserId) {
      setTodo(curent => [...curent, newTodo]);
      setTitle(initialTitle);
      setUserId(initialUserId);
      setAlert('');
    } else {
      switch (true) {
        case (formTitle.length === 0 && formUserId <= initialUserId):
          setAlert('Please select user and enter title');
          break;

        case (formTitle.length === 0):
          setAlert('Please enter title');
          break;

        case (formUserId <= initialUserId):
          setAlert('Please select user');
          break;

        default:
          break;
      }
    }
  };

  const makeTodosList = () => {
    return (
      <ul className="todo-list">
        {(todoList.map((todo) => {
          const {
            title,
            id,
            completed,
          } = todo;

          const styleClass = classNames({
            'todo-list__items': true,
            'todo-list__items--done': completed === true,
          });

          return (
            <li key={id} className={styleClass}>
              <h2>{title}</h2>
              <div>
                Status
                { ' ' }
                {completed ? 'completed' : 'in work'}
              </div>
            </li>
          );
        })).reverse()}
      </ul>
    );
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      {showAlert && <p>{showAlert}</p>}
      <form
        action="get"
        onSubmit={handleSubmit}
      >
        <button type="submit">
          Add
        </button>
        <input
          type="text"
          name="title"
          value={formTitle}
          onChange={getTitle}
        />
        {makeSelect()}
      </form>
      <p>
        <span>Todos: </span>
      </p>
      {makeTodosList()}
    </div>
  );
};

export default App;
