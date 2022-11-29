import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodosAndUsers } from './types/todosAndUsers';
import { User } from './types/user';

function findUserById(userId: number): User | null {
  return usersFromServer.find(user => userId === user.id) || null;
}

function addNewTodoId(todos: TodosAndUsers[]): number {
  return Math.max(...todos.map(todo => todo.id)) + 1;
}

const todosAndUsers = todosFromServer.map((todo) => ({
  ...todo,
  user: findUserById(todo.id),
}));

export const App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [availableTodos, setAvailableTodos] = useState(todosAndUsers);

  const [errorUser, setErrorUser] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);

  const resetState = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setErrorUser(!userId);
    setErrorTitle(!title.trim());

    if (userId && title.trim()) {
      const newTodo: TodosAndUsers = {
        id: addNewTodoId(availableTodos),
        title,
        completed: false,
        userId,
        user: findUserById(userId),
      };

      setAvailableTodos(current => [...current, newTodo]);

      resetState();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:&nbsp;
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              name="title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setErrorTitle(false);
              }}
            />
          </label>
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:&nbsp;
            <select
              data-cy="userSelect"
              value={userId}
              onChange={(event) => {
                setUserId(+event.target.value);
                setErrorUser(false);
              }}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
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

      <TodoList todos={availableTodos} />
      {/* <section className="TodoList">
        <article data-id="1" className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">
            delectus aut autem
          </h2>

          <a className="UserInfo" href="mailto:Sincere@april.biz">
            Leanne Graham
          </a>
        </article>

        <article data-id="15" className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">delectus aut autem</h2>

          <a className="UserInfo" href="mailto:Sincere@april.biz">
            Leanne Graham
          </a>
        </article>

        <article data-id="2" className="TodoInfo">
          <h2 className="TodoInfo__title">
            quis ut nam facilis et officia qui
          </h2>

          <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
            Patricia Lebsack
          </a>
        </article>
      </section> */}
    </div>
  );
};
