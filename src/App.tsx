import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number) {
  return usersFromServer.find((user) => user.id === userId);
}

export const App = () => {
  const [newTitle, setNewTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const [todos, setTodos] = useState(todosFromServer);

  const handleAddTitle = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => setNewTitle(e.target.value);

  const handleSelectUser = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => setSelectedUser(e.target.value);

  const handleAddTodo = () => setTodos(prev => [...prev, {
    id: prev.length,
    title: newTitle,
    completed: !!Math.floor(Math.random() * (1 - 0 + 1) + 0),
    userId: Number(selectedUser),
  }]);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className="field">
          <label htmlFor="title" className="error">Title:</label>
          <input
            type="text"
            data-cy="titleInput"
            name="title"
            id="title"
            placeholder="Enter a title"
            value={newTitle}
            onChange={handleAddTitle}
          />
        </div>

        <div className="field">
          <label htmlFor="user" className="error">User:</label>
          <select
            id="user"
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleSelectUser}
          >
            <option
              value=""
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

        </div>

        <button
          type="submit"
          data-cy="submitButton"
          className="btn"
          disabled={!selectedUser || !newTitle}
          onClick={handleAddTodo}
        >
          Add
        </button>
      </form>

      <section className="TodoList">
        {todos.map((todo) => (
          <article
            data-id={todo.id}
            className={
              todo.completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'
            }
          >
            <h2 className="TodoInfo__title">
              {todo.title}
            </h2>

            <a className="UserInfo" href="mailto:Sincere@april.biz">
              {getUser(todo.userId)?.name}
            </a>
          </article>
        ))}
      </section>
    </div>
  );
};
