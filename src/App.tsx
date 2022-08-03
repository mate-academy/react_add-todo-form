import './App.scss';

import { useEffect, useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList/TodoList';

export const App = () => {
  const [todos, setTodos] = useState([...todosFromServer]);
  const [task, setTask] = useState('');
  const [user, setUser] = useState('Choose a user');
  const [newTitle, setNewTitle] = useState(true);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [selectedUser, setSelectedUser] = useState(true);
  const [hasUserError, setHasUserError] = useState(false);

  const handleAdd = () => {
    setHasTitleError(!newTitle);
    setHasUserError(!selectedUser);

    const currentTodos = [...todos];

    if (newTitle && selectedUser) {
      const largest = currentTodos
        .sort((a, b) => a.id - b.id)[currentTodos.length - 1];

      const searchedUser = usersFromServer.find(el => el.name === user);

      const userId = searchedUser ? searchedUser.id : 0;

      const todo = {
        id: largest.id + 1,
        title: task,
        completed: false,
        userId,
      };

      currentTodos.push(todo);
      setTodos(currentTodos);
      setTask('');
      setUser('Choose a user');
      setNewTitle(false);
      setSelectedUser(false);
    }
  };

  useEffect(() => {
    if (task !== '') {
      setNewTitle(true);
    } else {
      setNewTitle(false);
    }

    if (user !== 'Choose a user') {
      setSelectedUser(true);
    } else {
      setSelectedUser(false);
    }
  }, [newTitle, selectedUser]);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <input
            type="text"
            className="input is-rounded"
            data-cy="titleInput"
            placeholder="Name the todo"
            value={task}
            onChange={(e) => {
              setTask(e.currentTarget.value);
              setNewTitle(true);
              setHasTitleError(false);
            }}
          />
          {hasTitleError
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            className="select is-rounded"
            value={user}
            onChange={(e) => {
              setUser(e.currentTarget.value);
              setSelectedUser(true);
              setHasUserError(false);
            }}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(el => (
              <option
                key={el.id}
                value={el.name}
              >
                {el.name}
              </option>
            ))}
          </select>

          {hasUserError
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          className="button is-rounded"
          data-cy="submitButton"
          onClick={(e) => {
            e.preventDefault();
            handleAdd();
          }}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
