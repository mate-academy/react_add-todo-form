import React, { useState } from 'react';
import './App.scss';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';

export const App = () => {
  const userMap = new Map(usersFromServer.map(u => [u.id, u]));

  const initialTodos: Todo[] = todosFromServer
    .map(todo => {
      const user = userMap.get(todo.userId);

      if (!user) {
        return null;
      }

      return {
        ...todo,
        user,
      };
    })
    .filter((todo): todo is Todo => todo !== null);

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | ''>('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (
    changeEvent: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const cleaned = changeEvent.target.value.replace(
      /[^a-zA-Z\u0400-\u04FF0-9\s]/g,
      '',
    );

    setTitle(cleaned);
    if (titleError && cleaned.trim() !== '') {
      setTitleError(false);
    }
  };

  const handleUserChange = (
    selectEvent: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = selectEvent.target.value;

    setSelectedUserId(value === '' ? '' : Number(value));
    if (userError && value !== '') {
      setUserError(false);
    }
  };

  const handleSubmit = (submitEvent: React.FormEvent) => {
    submitEvent.preventDefault();
    let valid = true;

    if (!title.trim()) {
      setTitleError(true);
      valid = false;
    }

    if (!selectedUserId) {
      setUserError(true);
      valid = false;
    }

    if (!valid) {
      return;
    }

    const newId = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1;
    const user = userMap.get(Number(selectedUserId));
    if (!user) return;

    if (!user) {
      return;
    }

    const newTodo: Todo = {
      id: newId,
      title: title.trim(),
      userId: user.id,
      completed: false,
      user,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelectedUserId('');
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter todo title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User</label>
          <select
            id="user"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(u => (
              <option key={u.id} value={u.id}>
                {u.name}
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
