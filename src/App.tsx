import React, { useState } from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './components/TodosList/TodosList';

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [todo, setTodos] = useState(todos);

  const preparedTodos = todo.map(elem => {
    return {
      ...elem,
      user: users.find(person => person.id === elem.userId) || null,
    };
  });

  const addTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const addUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(event.target.value);
  };

  const addComplete = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCompleted(event.target.checked);
  };

  const addTodo = () => {
    const currentUser = users.find(person => person.name === user);

    if (!user) {
      setUserError(true);
    }

    if (!title.length || !title.trim()) {
      setTitleError(true);
    }

    if (title.length && user && title.trim()) {
      setTodos(
        [...todo,
          {
            userId: currentUser ? currentUser.id : 0,
            id: todo[todo.length - 1].id + 1,
            title,
            completed: isCompleted,
          },
        ],
      );

      setTitle('');
      setUser('');
    }
  };

  return (
    <div className="app">
      <h1 className="app__title">Static list of todos</h1>
      <TodoList prepared={preparedTodos} />

      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          addTodo();
        }}
      >
        <label>
          Title:
          <input
            type="text"
            name="addTitle"
            id="addTitle"
            className="form__input"
            value={title}
            onChange={addTitle}
            placeholder="Insert the title"
          />
          {titleError && <p className="form__error">Please enter the title</p>}
        </label>
        <br />

        <label>
          User:
          <select
            name="selectUser"
            id="selectUser"
            className="form__input"
            value={user}
            onChange={addUser}
          >
            <option
              value=""
              selected
            >
              Chose a user
            </option>
            {users.map((use) => (
              <option
                key={use.id}
                value={use.name}
              >
                {use.name}
              </option>
            ))}
          </select>
          {userError && <p className="form__error">Please choose a user</p>}
        </label>
        <br />

        <label>
          Completed
          <input
            type="checkbox"
            name="complete"
            id="completed"
            className="form__checkbox"
            checked={isCompleted}
            onChange={addComplete}
          />
        </label>
        <br />

        <button className="submitButton" type="submit">
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default App;
