import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoWithUser } from './types/TodoType';

function findUsers(userId: number) {
  return usersFromServer.find((user) => user.id === userId) || null;
}

const dataList = todosFromServer.map((todo) => {
  return {
    ...todo,
    user: findUsers(todo.userId),
  };
});

export const App = () => {
  const [currentData, setCurrentData] = useState<TodoWithUser[]>(dataList);
  const [title, setTitle] = useState('');
  const [currennUserId, setCurrentUserId] = useState(0);

  const [titleValid, setTitleValid] = useState(false);
  const [selectValid, setSelectValid] = useState(false);

  const getTodoIds = currentData.map((todo) => todo.id);
  const getNewId = Math.max(...getTodoIds) + 1;

  function clear() {
    setTitle('');
    setCurrentUserId(0);
    setTitleValid(false);
    setSelectValid(false);
  }

  const handlerSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo: TodoWithUser = {
      id: getNewId,
      completed: false,
      title,
      userId: currennUserId,
      user: findUsers(currennUserId),
    };

    if (!title) {
      setTitleValid(true);
    }

    if (!currennUserId) {
      setSelectValid(true);
    }

    if (title && currennUserId) {
      setCurrentData((prevData) => [...prevData, newTodo]);
      clear();
    }
  };

  const handlerSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectValid) {
      setSelectValid(false);
    }

    setCurrentUserId(+event.target.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handlerSubmit} action="/api/todos" method="POST">
        <div className="field">
          <label>
            {'Title: '}
            <input
              placeholder="Enter a title"
              value={title}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setTitle(event.target.value);

                if (titleValid) {
                  setTitleValid(false);
                }
              }}
              type="text"
              data-cy="titleInput"
            />
          </label>
          {titleValid && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              value={currennUserId}
              onChange={handlerSelectUser}
              data-cy="userSelect"
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {selectValid && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={currentData} />
      </section>
    </div>
  );
};
