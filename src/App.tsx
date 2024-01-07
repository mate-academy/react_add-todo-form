import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const todosModified = todosFromServer.map(todo => ({
  ...todo,
  userId: usersFromServer.findIndex(user => user.id === todo.userId) + 1,
}));

export const App = () => {
  const [todos, setTodos] = useState(todosModified);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const [todo, setTodo] = useState({
    id: 16,
    title: '',
    completed: false,
    userId: 0,
  });

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(prevTodo => ({
      ...prevTodo,
      title: event.target.value,
    }));

    setTitleError(false);
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTodo(prevTodo => ({
      ...prevTodo,
      userId: +event.target.value,
    }));

    setUserError(false);
  };

  const checkForError = () => {
    if (!todo.title.trim()) {
      setTitleError(true);
    }

    if (!todo.userId) {
      setUserError(true);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    checkForError();

    if (titleError || userError || !todo.title.trim() || !todo.userId) {
      return;
    }

    setTodos((prevTodos) => [...prevTodos, todo]);

    setTodo((prevTodo) => ({
      id: prevTodo.id + 1,
      title: '',
      completed: false,
      userId: 0,
    }));
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={(e) => handleSubmit(e)}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            name="title"
            placeholder="Enter a title"
            onChange={handleTitle}
            value={todo.title}
          />
          <span
            className="error"
            style={{ display: titleError ? 'inline-block' : 'none' }}
          >
            Please enter a title
          </span>
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>

          <select
            data-cy="userSelect"
            id="user"
            name="user"
            onChange={handleUser}
            value={todo.userId}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          <span
            className="error"
            style={{ display: userError ? 'inline-block' : 'none' }}
          >
            Please choose a user
          </span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
