import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

const checkUser = () => {
  return todosFromServer.map(serverTodo => {
    const findUser = usersFromServer.find(usr => usr.id === serverTodo.userId);

    return { ...serverTodo, user: findUser ? findUser : null };
  });
};

export const App = () => {
  const [currentList, setCurrentList] = useState(() => checkUser());

  const [userId, setUserId] = useState(0);
  const [userError, setUserError] = useState(false);

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleChangeUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserError(false);
  };

  const idHandler = () => {
    if (currentList.length === 0) {
      return 1;
    }

    return Math.max(...currentList.map(t => t.id)) + 1;
  };

  const onAdd = (event: React.FormEvent) => {
    event.preventDefault();

    setUserError(!userId);
    setTitleError(!title);

    if (!title || !userId) {
      return;
    }

    const selected = usersFromServer.find(user => user.id === userId);

    if (!selected) {
      setUserError(true);

      return;
    }

    const newTodo = {
      id: idHandler(),
      title: title,
      completed: false,
      userId: userId,
      user: selected,
    };

    setCurrentList(c => [...c, newTodo]);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={onAdd} action="/api/todos" method="POST">
        <div className="field">
          <input
            value={title}
            onChange={handleChangeTitle}
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            value={userId}
            onChange={handleChangeUserId}
            data-cy="userSelect"
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={currentList} />
    </div>
  );
};
