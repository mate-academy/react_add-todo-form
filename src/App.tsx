import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './type/Todo';
import { User } from './type/User';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  const findUser = usersFromServer.find(user => user.id === +userId);

  return findUser || null;
}

const prevTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function titleValidation(value: string) {
  return value.replace(/[^a-zA-Zа-яА-Я0-9\s]+$/g, '');
}

function getTodoId(prevTodo: Todo[]): number {
  const arrayId = prevTodo.map(task => task.id);

  return Math.max(...arrayId) + 1;
}

export const App = () => {
  const [todos, setTodos] = useState(prevTodos);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [user, setUser] = useState(0);
  const [userError, setUserError] = useState(false);

  const handlTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleError(false);
    setTitle(titleValidation(event.target.value));
  };

  const handlUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserError(false);
    setUser(+event.target.value);
  };

  const handlSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!user) {
      setUserError(true);
    }

    if (title && user) {
      const newTodo: Todo = {
        id: getTodoId(todos),
        title,
        completed: false,
        userId: user,
        user: getUserById(user),
      };

      setTodos([...todos, newTodo]);
      setTitle('');
      setUser(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handlSubmit}
      >
        <div className="field">
          <label htmlFor="titelId">
            {'Title: '}
          </label>

          <input
            type="text"
            data-cy="titleInput"
            id="titelId"
            name="title"
            placeholder="Enter a title"
            value={title}
            onChange={handlTitle}
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userId">
            {'User: '}
          </label>

          <select
            data-cy="userSelect"
            id="userId"
            name="user"
            value={user}
            onChange={handlUser}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(users => (
              <option
                key={users.id}
                value={users.id}
              >
                {users.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
      />
    </div>
  );
};
