import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App = () => {
  function getUser(userId: number): User | null {
    const foundUser = usersFromServer.find(user => user.id === userId);

    return foundUser || null;
  }

  const todos: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  }));

  const getTaskId = (tasks: Todo[]) => {
    const tasksIds = tasks.map(task => task.id);
    const newId = Math.max(...tasksIds) + 1;

    return newId;
  };

  const [currentTodos, setCurrentTodos] = useState(todos);
  const [newTitle, setnewTitle] = useState('');
  const [newTaskUserId, setNewTaskUserId] = useState('');
  const newTaskUser = usersFromServer
    .find(user => user.id === +newTaskUserId);

  const [error, setError] = useState(false);
  // const [errorTitle, setErrorTitle] = useState(false);
  // const [errorUser, setErrorUser] = useState(false);

  const AddTodo = () => {
    if (newTitle === '' || +newTaskUserId === 0) {
      setError(true);

      return;
    }
    // if (newTitle === '') {
    //   setErrorTitle(true);

    //   return;
    // }

    // if (+newTaskUserId === 0) {
    //   setErrorUser(true);

    //   return;
    // }

    setCurrentTodos((prevTasks) => {
      const newTodo = {
        id: getTaskId(prevTasks),
        title: newTitle,
        completed: false,
        userId: +newTaskUserId,
        user: newTaskUser,
      };

      return [...prevTasks, newTodo];
    });
    setnewTitle('');
    setNewTaskUserId('');
  };

  // console.log(currentTodos)
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          AddTodo();
        }}
      >
        <div className="field">
          <label htmlFor="title">
            Title:&nbsp;
            <input
              id="title"
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={newTitle}
              onChange={(event) => {
                // setError(false);
                const { value } = event.target;

                setnewTitle(value);
              }}
            />
          </label>
          {error && newTitle === '' && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">
            User:&nbsp;
            <select
              name="user"
              id="user"
              data-cy="userSelect"
              value={newTaskUserId}
              onChange={(event) => {
                // setError(false);
                setNewTaskUserId(event.target.value);
              }}
            >
              <option value="0" selected>Choose a user</option>
              {usersFromServer.map(user => {
                const { id, name } = user;

                return (
                  <option value={id}>{name}</option>
                );
              })}
            </select>
          </label>

          {error && +newTaskUserId === 0 && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={currentTodos} />
    </div>
  );
};
