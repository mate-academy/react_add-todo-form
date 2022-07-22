import React, { useState } from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';

import users from './api/users';
import todosFromServer from './api/todos';
import { UserInfo } from './components/UserInfo/UserInfo';

const App: React.FC = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');
  const [inputError, setInputError] = useState(false);
  const [selectError, setSelectError] = useState(false);
  const userInfo = users.find(user => user.id === +userId);

  const handlerSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (title && +userId) {
      setTodos(current => {
        const newTodo = {
          userId: +userId,
          id: current.length + 1,
          title,
          completed: false,
        };

        return [...current, newTodo];
      });
      setTitle('');
    } else {
      setSelectError(Boolean(userId));
      setInputError(Boolean(!title));
    }
  };

  return (
    <div className="App">
      <h1>
        Add todo form
      </h1>
      <form
        className="form"
        onSubmit={handlerSubmit}
      >
        <div className={selectError ? 'select__error' : ''}>
          <select
            data-cy="userSelect"
            name="user"
            value={userId}
            onChange={(event) => {
              setUserId(event.target.value);
              setSelectError(false);
            }}
          >
            <option value="0" key={0}>
              Choose a user
            </option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className={inputError ? 'input__error' : ''}>
          <input
            type="text"
            name="title"
            data-cy="titleInput"
            placeholder="Enter todo"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setInputError(false);
            }}
          />
        </div>
        <button type="submit">Add</button>
      </form>

      {userInfo && <UserInfo user={userInfo} />}
      <TodoList todos={todos} userId={+userId} />
    </div>
  );
};

export default App;
