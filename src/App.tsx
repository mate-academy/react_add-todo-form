import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { getUserById } from './functions/getUserById';

export const App = () => {
  // const toDoListWithUser = todosFromServer.map(
  //   todo => (todo.user = getUserById(todo.userId)),
  // );
  const [list, setList] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [id, setId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const createId = () => {
    const ids = list.map(todo => todo.id);

    return Math.max(...ids) + 1;
  };

  const handelInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setTitleError(false);
  };

  const handelSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setId(+e.target.value);
    setUserError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setUserError(!id);
    setTitleError(!title);

    if (!title || id === 0) {
      return;
    }

    const newToDo = {
      id: createId(),
      title,
      completed: false,
      userId: id,
      user: getUserById(id),
    };

    setList([...list, newToDo]);

    setTitle('');
    setId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handelInput}
            placeholder="Titile"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select data-cy="userSelect" value={id} onChange={handelSelect}>
            <option value="0">Choose a user</option>

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

      <TodoList todos={list} />
    </div>
  );
};
