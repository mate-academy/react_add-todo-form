import { useState } from 'react';
import './App.scss';
import 'bulma/css/bulma.css';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState([...todosFromServer]);
  const [users] = useState([...usersFromServer]);
  const [title, setTitle] = useState('');
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [choose, setChoose] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const maxId = Math.max(...todos.map(todo => todo.id));

  const newTodo = {
    id: maxId + 1,
    title: title.trim(),
    userId: choose,
    completed: false,
  };

  const handleAddButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setHasSubmitted(true);
    setWasSubmitted(true);

    if (!title.trim() || choose === 0) {
      return;
    }

    setTodos([...todos, newTodo]);
    setTitle('');
    setChoose(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          <label htmlFor="todo-title">Title:</label>
          <input
            id="todo-title"
            placeholder="Enter a title"
            value={title}
            type="text"
            data-cy="titleInput"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          {wasSubmitted && title.trim() === '' && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="todo-title">User:</label>
          <select
            data-cy="userSelect"
            value={choose}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setChoose(Number(e.target.value))
            }
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasSubmitted && choose === 0 && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton" onClick={handleAddButton}>
          Add
        </button>
      </form>

      <TodoList todos={todos} users={users} />
    </div>
  );
};
