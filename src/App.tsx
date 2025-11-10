import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types';

export const App: React.FC = () => {
  // Attach user objects to initial todos, but skip todos without a matching user to avoid runtime errors
  const initialTodos: Todo[] = todosFromServer
    .map(t => {
      const user = usersFromServer.find(u => u.id === t.userId);

      return user ? { ...t, user } : null;
    })
    .filter((x): x is Todo => x !== null);

  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      hasError = true;
    }

    if (selectedUserId === '') {
      setUserError('Please choose a user');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const maxId = Math.max(...todos.map(t => t.id), 0);
    const userId = Number(selectedUserId);
    const user = usersFromServer.find(u => u.id === userId);

    if (!user) {
      // Shouldn't normally happen, but guard against it
      setUserError('Selected user not found');

      return;
    }

    const newTodo: Todo = {
      id: maxId + 1,
      title: title.trim(),
      completed: false,
      userId,
      user,
    };

    setTodos(prev => [...prev, newTodo]);

    setTitle('');
    setSelectedUserId('');
    setTitleError('');
    setUserError('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              if (titleError) {
                setTitleError('');
              }
            }}
            placeholder="Enter title"
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(event.target.value);
              if (userError) {
                setUserError('');
              }
            }}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={String(user.id)}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};

export default App;
