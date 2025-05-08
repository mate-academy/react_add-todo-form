import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { FormEventHandler, useState } from 'react';

export const App = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('0');
  const [todos, setTodos] = useState([...todosFromServer]);
  const [isEmptyTitle, setIsEmptyTitle] = useState(false);
  const [isEmptyUser, setIsEmptyUser] = useState(false);

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault();

    const isTitleValid = title.trim() !== '';
    const isUserValid = user !== '0';

    // Najpierw ustawiamy błędy
    setIsEmptyTitle(!isTitleValid);
    setIsEmptyUser(!isUserValid);

    // Dopiero potem sprawdzamy, czy można dodać todo
    if (isTitleValid && isUserValid) {
      const newTodo = {
        id: Math.max(...todos.map(t => t.id), 0) + 1,
        title,
        completed: false,
        userId: +user,
      };

      setTodos(prev => [...prev, newTodo]);
      setTitle('');
      setUser('0');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          {isEmptyTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={user}
            onChange={event => {
              setUser(event.target.value);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(u => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>

          {isEmptyUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} users={usersFromServer} />
    </div>
  );
};
