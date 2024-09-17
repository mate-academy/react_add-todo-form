import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [selectedUser, setSelectedUser] = useState(0);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setTitleError(false);
  };

  const handleSelectedUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(Number(e.target.value));
    setUserError(false);
  };

  const reset = () => {
    setTitle('');
    setSelectedUser(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTitleError(!title.trim());
    setUserError(!selectedUser);

    if (!title.trim() || !selectedUser) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id)) + 1;

    const newTodo = {
      id: newId,
      title: title.trim(),
      completed: false,
      userId: selectedUser,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            name="user"
            id="user"
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleSelectedUser}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
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

      <TodoList todos={todos} />
    </div>
  );
};
