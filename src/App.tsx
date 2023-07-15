import './App.scss';
import { useState, useEffect } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './components/types/User';
import { Todo } from './components/types/Todo';

import { TodoList } from './components/TodoList/TodoList';

export const App = () => {
  const [copyTodos, setCopyTodos] = useState([...todosFromServer]);
  const [selectedUserName, setSelectedUserName] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const maxId = Math.max(...todosFromServer.map(todo => todo.id));
  const findUser = (userName: string): User | null => {
    return usersFromServer.find(user => user.name === userName) || null;
  };

  const checkError = () => {
    if (!newTitle) {
      setErrorTitle(true);
    }

    if (!selectedUserName) {
      setErrorUser(true);
    }
  };

  const createTodo = () => {
    const user = findUser(selectedUserName);

    if (user && newTitle) {
      const newTodo = {
        id: maxId,
        title: newTitle,
        completed: false,
        userId: user.id,
      };

      setCopyTodos(todos => [...todos, newTodo]);
      setNewTitle('');
      setSelectedUserName('');
    }
  };

  const addHandler
  = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    checkError();
    createTodo();
  };

  const todos: Todo[] = copyTodos.map(todo => {
    return {
      ...todo,
      user: usersFromServer.find(user => todo.userId === user.id),
    };
  });

  useEffect(() => {
    if (newTitle) {
      setErrorTitle(false);
    }

    if (selectedUserName) {
      setErrorUser(false);
    }
  }, [newTitle, selectedUserName]);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={newTitle}
              onChange={(e) => {
                setNewTitle(e.currentTarget.value);
              }}
            />
          </label>
          {(errorTitle
             && <span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              onChange={(e) => setSelectedUserName(e.target.value)}
              value={!selectedUserName ? '0' : selectedUserName}
            >
              {!selectedUserName
               && (<option value="0" disabled selected>Choose a user</option>)}
              {usersFromServer.map(user => (
                <option
                  key={user.name}
                  value={user.name}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {errorUser
           && (<span className="error">Please choose a user</span>)}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={(e) => addHandler(e)}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
