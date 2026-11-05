import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

function getUserById(id: number) {
  return usersFromServer.find(user => user.id === id);
}

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [user, setUser] = useState('');
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const hasTitle = title.trim() !== '';
    const hasUser = user !== '';

    if (!hasTitle || !hasUser) {
      setTitleError(!hasTitle);
      setUserError(!hasUser);

      return;
    }

    const selectedUser = getUserById(Number(user));

    if (!selectedUser) {
      return;
    }

    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title,
      userId: Number(user),
      completed: false,
      user: selectedUser,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    setTitle('');
    setUser('');

    setTitleError(false);
    setUserError(false);
  };

  const preparedTodos = todos.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={addTodo}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Please enter a title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);

              if (event.target.value.trim() !== '') {
                setTitleError(false);
              }
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">Users</label>
          <select
            data-cy="userSelect"
            value={user}
            onChange={event => {
              setUser(event.target.value);

              if (event.target.value !== '') {
                setUserError(false);
              }
            }}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(serverUser => (
              <option key={serverUser.id} value={serverUser.id}>
                {serverUser.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={preparedTodos} />
      </section>
    </div>
  );
};
