/* eslint-disable no-console */
import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { PreparedTodos } from './types/PreparedTodos';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos: PreparedTodos[] = todosFromServer.map(todo => ({
  id: todo.id,
  title: todo.title,
  completed: todo.completed,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

const App: React.FC = () => {
  const [name, setName] = useState('');
  const [todo, setTodo] = useState('');
  const [pressed, setPressed] = useState(false);
  const [todos, setTodos] = useState(preparedTodos);
  const [selectName, setSelectName] = useState(false);
  const [selectTodo, setSelectTodo] = useState(false);

  const addTodo = () => {
    setTodos((prevTodos) => ([
      ...prevTodos,
      {
        user: usersFromServer.find(user => user.name === name) || null,
        id: preparedTodos.length + 1,
        title: todo,
        completed: false,
      },
    ]));
    setName('');
    setTodo('');
    setPressed(false);
  };

  const hendler = () => {
    if (!name) {
      setSelectName(true);
      setPressed(true);
    }

    if (!todo) {
      setSelectTodo(true);
      setPressed(true);
    }

    if (!name && !todo) {
      addTodo();
    }
  };

  return (
    <div className="App">
      <h1 className="App__title">Static list of todos</h1>

      <div className="todo ">
        <div className="todo__name">
          <p className={`${(name === '' && selectName && pressed)
            ? ('on')
            : ('off')
          }`}
          >
            Please choose a user
          </p>
          <div className="select is-primary">
            <select
              value={name}
              data-cy="userSelect"
              onChange={(element) => {
                setName(element.target.value);
              }}
            >
              <option value="" disabled>choose user</option>
              {usersFromServer.map(user => {
                if (typeof user.name === 'string') {
                  return (

                    <option
                      value={user.name}
                      key={user.id}
                    >
                      {user.name}
                    </option>
                  );
                }

                return null;
              })}
            </select>
          </div>

        </div>

        <div className="todo__title">
          <p className={`${(todo === '' && selectTodo && pressed)
            ? ('on')
            : ('off')
          }`}
          >
            Please enter the title
          </p>
          <textarea
            className="textarea is-primary"
            data-cy="titleInput"
            name="todo"
            placeholder="Add todo"
            value={todo.replace(/[^A-Za-zА-Яа-яЁё1-9' ']/g, '')}
            onChange={(event) => {
              setTodo(event.target.value);
            }}
          />
        </div>

        <button
          className="todo__button button is-success"
          type="button"
          onClick={() => hendler()}
        >
          Add
        </button>
      </div>

      <TodoList todos={todos} />
    </div>
  );
};

export default App;
