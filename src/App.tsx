import React, { ChangeEvent, FormEvent, useState } from 'react';
import './App.css';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<number>(-1);
  const [newId, setNewId] = useState<number>(todosFromServer.at(-1)?.id || 0);

  const [titleError, setTitleError] = useState<boolean>(false);
  const [userError, setUserError] = useState<boolean>(false);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.length) {
      setTitleError(true);

      return;
    }

    if (userId < 0) {
      setUserError(true);

      return;
    }

    const newTodo: Todo = {
      completed: false,
      id: newId,
      userId,
      title,
    };

    setTodos((prevTodos) => ([
      ...prevTodos,
      newTodo,
    ]));

    setTitle('');
    setUserId(-1);
    setNewId((prevId) => prevId + 1);
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case 'todo-title':
        setTitleError(false);
        setTitle(value);
        break;
      case 'user-select':
        setUserError(false);
        setUserId(Number(value));
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <h1 className="App__title title">Add todo form</h1>
      <form
        className="form"
        action="/"
        method="post"
        onSubmit={submitHandler}
      >
        <div className="field">
          <label htmlFor="todo-title">
            <div className="control">
              <input
                className="input"
                type="text"
                id="todo-title"
                name="todo-title"
                placeholder="new todo title"
                autoComplete="off"
                maxLength={40}
                value={title}
                onChange={changeHandler}
              />
            </div>
            {titleError && <p className="help is-danger">please enter the title</p>}
          </label>
        </div>
        <div className="field">
          <label htmlFor="user-select">
            <div className="control">
              <div className="select">
                <select
                  id="user-select"
                  name="user-select"
                  value={userId}
                  onChange={changeHandler}
                >
                  <option value={-1} selected disabled>choose a user</option>
                  {usersFromServer.map(({ id, name }) => (
                    <option key={id} value={id}>{name}</option>
                  ))}
                </select>
              </div>
            </div>
            {userError && <p className="help is-danger">please select a user</p>}
          </label>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-link" type="submit">
              add todo
            </button>
          </div>
        </div>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
