import React, { ChangeEvent, useState } from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import { Todo } from './types/Todo';

import { Todolist } from './components/TodoList/TodoList';

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [todo, setTodo] = useState(todos);
  const [user, setUser] = useState('');
  const [userSelectError, setUserSelectError] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const selectUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setUser(event.target.value);
    setUserSelectError(false);
  };

  const addTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const setTodoState = (event: ChangeEvent<HTMLInputElement>) => {
    setIsCompleted(event.target.checked);
  };

  const addTodo = () => {
    const currentUser = users.find(el => el.name === user);

    if (!title.trim()) {
      setTitleError(true);
    }

    if (!user) {
      setUserSelectError(true);
    }

    if (title.length && user) {
      setTodo(
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

  const preparedTodos: Todo[] = todo.map(el => ({
    ...el,
    user: users.find(elem => elem.id === el.userId) || null,
  }));

  return (
    <div className="app">
      <h1 className="app__title">
        Static list of todos
      </h1>
      <form
        // method="POST"
        // name=""
        className="app__form"
        onSubmit={event => {
          event.preventDefault();
          addTodo();
        }}
      >
        <label className="app__label">
          Title:
          {' '}
          <input
            type="text"
            name="addTitle"
            className="app__todo"
            id="addTitle"
            value={title}
            placeholder="Title"
            onChange={addTitle}
          />
          {
            titleError && (
              <span className="app__error">
                Please enter the title
              </span>
            )
          }
        </label>
        <label className="app__label">
          User:
          {' '}
          <select
            name="selectUser"
            className="app__todo"
            id="selectUser"
            value={user}
            onChange={selectUser}
          >
            <option
              value=""
              selected
            >
              Choose a user
            </option>
            {users.map((person) => (
              <option
                key={person.id}
                value={person.name}
              >
                {person.name}
              </option>
            ))}
          </select>
          {
            userSelectError && (
              <span className="app__error">
                Please choose a user
              </span>
            )
          }
        </label>

        <label
          htmlFor="completed"
          className="app__label"
        >
          Completed
          {' '}
          <input
            type="checkbox"
            name="taskState"
            id="completed"
            checked={isCompleted}
            onChange={setTodoState}
          />
        </label>
        <button
          className="submitButton"
          type="submit"
        >
          Add TODO
        </button>
      </form>
      <Todolist preparedTodos={preparedTodos} />
    </div>
  );
};

export default App;
