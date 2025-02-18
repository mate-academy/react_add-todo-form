import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
// import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './components/TodoInfo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // Start with an empty array
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (userId === 0) {
      setUserError(true);
    }

    if (!title || userId === 0) {
      return;
    }

    const newTodo: Todo = {
      id: todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title,
      completed: false,
      userId,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (titleError) {
      setTitleError(false);
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(e.target.value));
    if (userError) {
      setUserError(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleAddTodo}>
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            placeholder="Enter todo title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User:</label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
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
