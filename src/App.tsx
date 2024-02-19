import { useState, ChangeEvent } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number) {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

export const tasks = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [taskUser, setTaskUser] = useState('0');
  const [task, setTask] = useState('');
  const [errorTitle, setTitleError] = useState(false);
  const [errorUser, setUserError] = useState(false);
  const [todos, setTasks] = useState(tasks);
  let maxId = Math.max(...todos.map(o => o.id)) + 1;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
    setTitleError(false); // Reset error when user starts typing again
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTaskUser(event.target.value);
    setUserError(false); // Reset error when user starts typing again
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (task === '') {
      if (taskUser === '0') {
        setUserError(true);
        setTitleError(true);
      } else {
        setTitleError(true);
      }

      return;
    }

    if (taskUser === '0') {
      setUserError(true);

      return;
    }

    const newTask = {
      id: maxId,
      title: task,
      completed: false,
      userId: +taskUser,
      user: getUser(+taskUser),
    };

    setTasks([...todos, newTask]);
    setTask('');
    setTaskUser('0');
    maxId += 1;
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        // onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">
            {'Title: '}
            <input
              id="titleInput"
              value={task}
              onChange={handleInputChange}
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
            />
            {errorTitle && <span className="error"> Please enter a title</span>}
          </label>

        </div>

        <div className="field">
          <label htmlFor="userSelect">
            {'User: '}
            <select
              id="userSelect"
              data-cy="userSelect"
              value={taskUser}
              onChange={handleUserChange}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map((user) => {
                return (
                  <option
                    value={user.id}
                  >
                    {user.name}
                  </option>
                );
              })}
            </select>
          </label>
          {errorUser && <span className="error"> Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleSubmit}
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
