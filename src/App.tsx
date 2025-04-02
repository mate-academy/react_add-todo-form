import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

const todosWithUsers = todosFromServer.map(todo => ({
  ...todo,
  title: todo.title.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s]/g, ''),
  user: usersFromServer.find(user => user.id === todo.userId),
}));

export const App = () => {
  const users = [...usersFromServer];

  const [selectedUser, setSelectedUser] = useState('0');
  const [todos, setTodos] = useState(todosWithUsers);

  const [inputTitle, setInputTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [selectError, setSelectError] = useState(false);

  const setTodoId = () => {
    return todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
  };

  const handlerSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedUser === '0' || !inputTitle.trim()) {
      setSelectError(selectedUser === '0');
      setTitleError(!inputTitle.trim());

      return;
    }

    setInputTitle('');
    setSelectedUser('0');
    setTitleError(false);
    setTodos(prevTodos => [
      ...prevTodos,
      {
        id: setTodoId(),
        title: inputTitle.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s]/g, ''),
        completed: false,
        userId: +selectedUser,
        user: users.find(user => user.id === +selectedUser),
      },
    ]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handlerSubmit} method="POST">
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            name="title"
            id="titleInput"
            data-cy="titleInput"
            value={inputTitle}
            placeholder="Enter a title"
            onChange={e => {
              setInputTitle(e.target.value);
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            name="userId"
            id="userSelect"
            value={selectedUser}
            required
            onChange={e => {
              setSelectedUser(e.target.value);
              setSelectError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {users.map(user => {
              return (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {selectError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
