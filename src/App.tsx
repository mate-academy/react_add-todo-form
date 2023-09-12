import './App.scss';
import React, { FormEventHandler, useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './Types/User';
import { Todo } from './Types/Todo';

import { TodoList } from './components/TodoList';

export const getUser = (userId: number): User => {
  const foundUser = usersFromServer.find(user => {
    return user.id === userId;
  });

  return foundUser as User;
};

export const concatTodos: Todo[] = todosFromServer.map(todo => {
  return ({
    ...todo,
    user: getUser(todo.userId),
  });
});

export const App = () => {
  const [todos, setTodos] = useState(concatTodos);
  const [title, setTitle] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [completed] = useState(false);
  const [errorInput, setInputError] = useState(false);
  const [errorSelect, setSelectError] = useState(false);

  const handleChangeTitle:
  React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
    setInputError(false);
  };

  const handleChangeUser:
  React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setUser(usersFromServer
      .find(v => v.id === Number(e.target.value)) || null);
      setSelectError(false);
  };

  const addTodo: FormEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    if (!user && !title) {
      setSelectError(true);
      setInputError(true);
      return;
    }

    if (!user) {
      setSelectError(true);
      return;
    }

    if (!title) {
      setInputError(true);
      return;
    }

    const task: Todo = {
      id: Math.max(...todos.map((todo) => todo.id)) + 1,
      title,
      userId: user.id,
      completed,
      user,
    };

    setTodos([...todos, task]);
    setTitle('');
    setUser(null);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder='Title'
            value={title}
            onChange={handleChangeTitle}
          />
          {errorInput && <span className="error">Please enter a title</span>}

        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={user?.id || 0}
            defaultValue={0}
            onChange={handleChangeUser}
          >
            <option value={0} disabled>Choose a user</option>
            {usersFromServer.map(v => {
              return <option key={v.id} value={v.id}>{v.name}</option>;
            })}
          </select>
          {errorSelect && <span className="error">Please choose a user</span>}

        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={addTodo}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
