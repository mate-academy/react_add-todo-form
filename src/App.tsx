import React, { useMemo, useState } from 'react';
import './App.scss';

import users from './api/users';
import todosFS from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [todos, setTodos] = useState(todosFS);
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;

    setTitle(newTitle.replace(/[^a-zA-Z0-9А-Яа-я\s]/g, ''));
    setTitleError('');
  };

  const preparedTodos = useMemo(() => (
    todos.map(todo => ({
      ...todo,
      user: users.find(userFS => userFS.id === todo.userId),
    }))), [todos]);

  const isValidForm = () => {
    const normalizeTitle = title.trim();

    setTitle(normalizeTitle);
    if (!user) {
      setUserError('*Please choose a user');
    }

    if (!normalizeTitle) {
      setTitleError('*Please enter the title');
    }

    if (!user || !normalizeTitle) {
      return false;
    }

    return true;
  };

  const addTodo = () => {
    if (isValidForm()) {
      setTodos((current) => [
        ...current,
        {
          userId: +user,
          id: todos.length + 1,
          title,
          completed: isComplete,
        },
      ]);
      setTitle('');
      setUser('');
      setIsComplete(false);
      setUserError('');
      setTitleError('');
    }
  };

  return (
    <div className="App">
      <h1>ToDo list</h1>
      <form
        action="get"
        className="form-todo"
        onSubmit={(event) => {
          event.preventDefault();
          addTodo();
        }}
      >
        <label className="form-todo__title" htmlFor="title">
          <input
            type="text"
            name="title"
            className="form-todo__title-input"
            id="title"
            placeholder="Write todo..."
            autoComplete="off"
            value={title}
            onChange={handleTitle}
          />

          {titleError && (
            <div className="form-todo__error">{titleError}</div>
          )}
        </label>

        <div className="form-todo__selects">
          <div>
            <select
              name="user"
              id="user_select"
              className="form-todo__user-select"
              value={user}
              onChange={(event) => {
                setUser(event.target.value);
                setUserError('');
              }}
            >
              <option value={0}>
                Select user
              </option>
              {users.map(userFS => (
                <option key={userFS.id} value={userFS.id}>
                  {userFS.name}
                </option>
              ))}
            </select>

            {userError && (
              <div className="form-todo__error">{userError}</div>
            )}
          </div>

          <div className="form-todo__completed-radio">
            <label htmlFor="noCompleted">
              No Completed
              <input
                type="radio"
                name="isCompleted"
                id="noCompleted"
                checked={!isComplete}
                onChange={() => {
                  setIsComplete(false);
                }}
              />
            </label>

            <label htmlFor="completed">
              Completed
              <input
                type="radio"
                name="isCompleted"
                id="completed"
                checked={isComplete}
                onChange={() => {
                  setIsComplete(true);
                }}
              />
            </label>
          </div>
        </div>

        <button className="button" type="submit">
          Submit
        </button>
      </form>
      <TodoList todos={[...preparedTodos].reverse()} />
    </div>
  );
};

export default App;
