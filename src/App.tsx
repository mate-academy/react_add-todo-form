import React, { useState } from 'react';

import './App.css';

import { PreparedTodoType } from './types/PreparedTodoType';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './components/TodoList';
import { UserType } from './types/UserType';

const preparedTodos: PreparedTodoType[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

const App: React.FC = () => {
  const [todoList, addTodo] = useState<PreparedTodoType[]>(preparedTodos);

  const [isCompl, setIsCompl] = useState<boolean>(false);

  const [title, setTitle] = useState<string>('');

  const [selectedUserId, setUserId] = useState<number>(-1);

  const [titleErr, setTitleErr] = useState(false);

  const [userErr, setUserErr] = useState(false);

  const handleSubmit = () => {
    if (!title.length) {
      setTitleErr(true);

      return;
    }

    if (selectedUserId < 0) {
      setUserErr(true);

      return;
    }

    const findedUser: UserType | null = users
      .find(user => user.id === selectedUserId) || null;

    addTodo([
      ...todoList,
      {
        id: todoList.length,
        title,
        user: findedUser || null,
        completed: isCompl,
        userId: findedUser?.id || null,
      },
    ]);

    setTitle('');
    setUserId(-1);
    setIsCompl(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        className="box"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <div className="field">
          <label
            className="label"
            htmlFor="#title"
          >
            Title
          </label>
          <div className="control">
            <input
              id="title"
              className="input"
              type="text"
              placeholder="Go smthg"
              value={title}
              onChange={({ target }) => {
                setTitle(target.value);
                setTitleErr(false);
              }}
            />
          </div>
        </div>
        {titleErr && (
          <div className="notification is-danger">
            <h2>Type something!!!!!!</h2>
          </div>
        )}
        <div className="field">
          <label
            className="label"
            htmlFor="#u1"
          >
            Password
          </label>
          <div className="control">
            <select
              name="users"
              id="u1"
              value={Number(selectedUserId)}
              onChange={({ target }) => {
                setUserId(Number(target.value));
                setUserErr(false);
              }}
            >
              <option value={-1}>Choose a user</option>
              {
                users.map(user => (
                  <option
                    key={user.name}
                    value={user.id}
                  >
                    {user.name}
                  </option>
                ))
              }
            </select>
          </div>
        </div>
        {userErr && (
          <div className="notification is-danger">
            <h2>Choose User!!!!!</h2>
          </div>
        )}
        <div className="field">
          <label
            className="label"
            htmlFor="f1"
          >
            Copmpleted?
          </label>
          <div className="control">
            <input
              id="f1"
              className="checkbox"
              type="checkbox"
              placeholder="Go smthg"
              checked={isCompl}
              onChange={() => setIsCompl(!isCompl)}
            />
          </div>
        </div>

        <button
          className="button is-primary"
          type="submit"
          disabled={titleErr || userErr}
        >
          ADD
        </button>
      </form>

      <TodoList todoList={todoList} />
    </div>
  );
};

export default App;
