import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import cn from 'classnames';

import { Todo } from './types/Todo';
import { User } from './types/User';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [title, setTitle] = useState<string>('');
  const [nameUser, setNameUser] = useState<string>('');
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorNameUser, setErrorNameUser] = useState(false);

  const getTodoId = () => {
    return Math.max(...todos.map((todo: Todo) => +todo.id)) + 1;
  };

  const reset = () => {
    setTitle('');
    setNameUser('');
    setErrorTitle(false);
    setErrorNameUser(false);
  };

  const handlerChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setErrorTitle(false);
  };

  const handlerChangeUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNameUser(e.target.value);
    setErrorNameUser(false);
  };

  const handlerSumbit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!nameUser) {
      setErrorNameUser(true);
    }

    if (!title) {
      setErrorTitle(true);
    }

    if (!nameUser || !title) {
      return;
    }

    const foundUser = usersFromServer.find(user => user.name === nameUser);

    const newTodo: Todo = {
      id: getTodoId(),
      title: title,
      completed: false,
      userId: Number(foundUser?.id),
      user: foundUser,
    };

    setTodos((todo: Todo[]) => [...todo, newTodo]);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handlerSumbit} action="/api/todos" method="POST">
        <div className="field">
          <input
            placeholder="Enter a title"
            onChange={handlerChangeTitle}
            value={title}
            type="text"
            data-cy="titleInput"
          />
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select onChange={handlerChangeUser} data-cy="userSelect">
            <option value="0">Choose a user</option>
            {usersFromServer.map((user: User) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>

          {errorNameUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        {todos.map(todo => (
          <article
            data-id={todo.id}
            className={cn('TodoInfo', {
              'TodoInfo--completed': todo.completed,
            })}
          >
            <h2 className="TodoInfo__title">{todo.title}</h2>

            <a className="UserInfo" href={`mailto:${todo.user?.email}`}>
              {todo.user?.name}
            </a>
          </article>
        ))}
      </section>
    </div>
  );
};
