import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { PrepareTodo } from './types/PrepareTodo';
import { TodoList } from './components/TodoList/TodoList';

const prepareTodos: PrepareTodo[] = todosFromServer.map(todo => {
  const author = usersFromServer.find(user => user.id === todo.userId);

  return {
    ...todo,
    user: author,
  };
});

let maxTodoID = [...todosFromServer].sort((elem1, elem2) => (
  elem2.id - elem1.id))[0].id;

const addTodo = (title: string, userName: string) => {
  maxTodoID += 1;

  const author = usersFromServer.find(user => user.name === userName);
  const newTodo = {
    id: maxTodoID,
    title,
    completed: false,
    userId: 1,
    user: author,
  };

  prepareTodos.push(newTodo);
};

export const App = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [errorUser, setErrorUser] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);

  type HandlingElement = HTMLInputElement | HTMLSelectElement;

  const handler = (event: React.ChangeEvent<HandlingElement>) => {
    if (event.target.name === 'title') {
      if (errorTitle) {
        setErrorTitle(false);
      }

      setTitle(event.target.value);
    } else {
      if (errorUser) {
        setErrorUser(false);
      }

      setUser(event.target.value);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form onSubmit={(event): void => {
        event.preventDefault();

        if (!title.trim() || !user) {
          if (!title.trim()) {
            setErrorTitle(true);
          }

          if (!user) {
            setErrorUser(true);
          }

          return;
        }

        addTodo(title, user);
        setTitle('');
        setUser('');
      }}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              name="title"
              placeholder="Enter a title"
              data-cy="titleInput"
              value={title}
              onChange={handler}
            />
          </label>
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              name="user"
              value={user}
              onChange={handler}
            >
              <option value="">Choose a user</option>
              {usersFromServer.map(chooseUser => (
                <option
                  key={chooseUser.id}
                  value={chooseUser.name}
                >
                  {chooseUser.name}
                </option>
              ))}
            </select>
          </label>
          {errorUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={prepareTodos} />
    </div>
  );
};
