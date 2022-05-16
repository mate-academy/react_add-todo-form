import React, { ChangeEvent, useState } from 'react';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './component/TodoList/TodoList';
import './App.scss';

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [todo, setTodo] = useState(todos);
  const [titleError, setTitleError] = useState(false);
  const [userSelectError, setUserSelectError] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const selectUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setUser(event.target.value);
    setUserSelectError(false);
  };

  const AddTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const setTodoState = (event: ChangeEvent<HTMLInputElement>) => {
    setIsCompleted(event.target.checked);
  };

  const addTodo = () => {
    const currentUser = users.find(elem => elem.name === user);

    if (!title.length) {
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

  const preparedTodos = todo.map((elem) => {
    return {
      ...elem,
      user: users.find(use => use.id === elem.userId) || null,
    };
  });

  return (
    <>
      <div className="App">
        <h1>Static list of todos</h1>
      </div>
      <TodoList prepared={preparedTodos} />
      <form
        className="Add__todo"
        onSubmit={(event) => {
          event.preventDefault();
          addTodo();
        }}
      >
        <label htmlFor="addTitle">
          Title:
          <input
            type="text"
            name="addTitle"
            id="addTitle"
            value={title}
            onChange={AddTitle}
            placeholder="Insert the title"
          />
          {titleError && <p className="Error">Please enter the title</p>}
        </label>
        <label htmlFor="selectUser">
          User:
          <select
            name="selectUser"
            id="selectUser"
            value={user}
            onChange={selectUser}
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
          {userSelectError && <p className="Error">Please choose a user</p>}
        </label>
        <label htmlFor="completed">
          Is completed ?
          <input
            type="checkbox"
            name="taskState"
            id="completed"
            checked={isCompleted}
            onChange={setTodoState}
          />
        </label>

        <button className="submitButton" type="submit">
          Add Todo
        </button>
      </form>
    </>
  );
};

export default App;
