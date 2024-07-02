import './App.scss';
import { TodoList } from './components/TodoList';
import { useState, ChangeEvent } from 'react';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

export const App = () => {
  const [error, setError] = useState('');
  const [todos, setTodos] = useState(todosFromServer);
  const [newTodo, setNewTodo] = useState({
    title: '',
    userId: '',
  });

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = event.target.value;

    setNewTodo({
      ...newTodo,
      userId: selectedUserId,
    });
    setError('');
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;

    setNewTodo({
      ...newTodo,
      title: newTitle,
    });
    setError('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTodo.userId) {
      setError('Please choose a user');

      return;
    }

    if (!newTodo.title.trim()) {
      setError('Please enter a title');

      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id), 0);
    const nextId = maxId + 1;

    const newTodoItem = {
      id: nextId,
      title: newTodo.title,
      userId: parseInt(newTodo.userId),
      completed: false,
    };

    setTodos([...todos, newTodoItem]);
    setNewTodo({
      ...newTodo,
      title: '',
    });
    setError('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">
            Title: &nbsp;
            <input
              type="text"
              data-cy="titleInput"
              onChange={handleTitleChange}
            />
          </label>
          {}
        </div>

        <div className="field">
          <label htmlFor="username">
            User: &nbsp;
            <select data-cy="userSelect" onChange={handleUserChange}>
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {error && <span className="error">{error}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} users={usersFromServer} />
      </section>
    </div>
  );
};
