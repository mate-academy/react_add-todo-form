import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number) {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [selectUserId, setSelectUserId] = useState('0');
  const [submit, setSubmit] = useState(false);
  const [title, setTitle] = useState('');
  const [todoList, setTodoList] = useState(todos);

  const addTodo = () => {
    const newTodo = {
      id: Math.random(),
      title,
      completed: false,
      userId: +selectUserId,
      user: getUser(+selectUserId),
    };

    setTodoList([...todoList, newTodo]);

    setTitle('');
    setSelectUserId('0');
    setSubmit(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              placeholder="Enter a title"
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </label>
          {(!title && submit) && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={selectUserId}
              onChange={(e) => {
                setSelectUserId(e.target.value);
              }}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option key={user.id} value={`${user.id}`}>{user.name}</option>
              ))}
            </select>
          </label>

          {(submit && selectUserId === '0') && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={() => {
            if (selectUserId !== '0' && title) {
              return addTodo();
            }

            return setSubmit(true);
          }}
        >
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
