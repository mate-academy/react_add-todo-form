import './App.scss';
import React, { useState } from 'react';
import { Todo } from './components/TodoInfo/TodoInfo';
import { TodoList } from './components/TodoList/TodoList';
import todos from './api/todos';
import users from './api/users';

const preparedTodos: Todo[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => (user.id === todo.userId) || null),
}));

function getMaxId(currentTodos: Todo[]) {
  const id = currentTodos.map(todo => todo.id);

  return Math.max.apply(null, id);
}

export const App = () => {
  const [todoList, setTodos] = useState(preparedTodos);
  const [userName, setUserName] = useState('');
  const [title, setTitle] = useState('');
  const [hasTitleError, setTitleError] = useState(false);
  const [hasUserError, setUserError] = useState(false);

  function onSubmit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const todoToAdd: Todo = {
      userId: todoList[todoList.length - 1].id + 1,
      id: getMaxId(todoList),
      title,
      user: users.find(user => user.name === userName),
    };

    setTitleError(!title);
    setUserError(!userName);

    if (!title || !userName) {
      return;
    }

    setTodos(currentTodos => [...currentTodos, todoToAdd]);
    setTitle('');
    setUserName('');
  }

  return (
    <div className="App">
      <div className="userform">
        <form onSubmit={onSubmit}>
          <div className="select">
            <select
              data-cy="userSelect"
              className="field"
              name="userName"
              value={userName}
              onChange={(event) => {
                setUserError(false);
                setUserName(event.target.value);
              }}
            >
              <option
                value=""
                disabled
              >
                Select user
              </option>

              {users.map(user => (
                <option
                  value={user.name}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
            <br />
            {hasUserError && (
              <span className="error">
                Please, select a user
              </span>
            )}
          </div>

          <div>
            <input
              className="field"
              data-cy="titleInput"
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={(event) => {
                setTitleError(false);
                setTitle(event.target.value);
              }}
            />
            <br />
            {hasTitleError && (
              <span className="error">Please, enter a title</span>
            )}
          </div>

          <button
            className="button"
            type="submit"
          >
            Add
          </button>

        </form>
      </div>

      <div className="todoList">
        <TodoList todos={todoList} />
      </div>
    </div>
  );
};
