import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/user';
import { Todo } from './types/todo';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId)!,
    })),
  );

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  const users: User[] = usersFromServer;

  const reset = () => {
    setTitle('');
    setUserId('');
    setHasTitleError(false);
    setHasUserIdError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;

    if (!title.trim()) {
      setHasTitleError(true);
      isValid = false;
    } else {
      setHasTitleError(false);
    }

    if (!userId.trim()) {
      setHasUserIdError(true);
      isValid = false;
    } else {
      setHasUserIdError(false);
    }

    if (!isValid) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
      title: title.trim(),
      userId: +userId,
      completed: false,
      user: users.find(user => user.id === +userId)!,
    };

    setTodos(prev => [...prev, newTodo]);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit} onReset={reset}>
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={e => {
              const newTitle = e.target.value;

              setTitle(newTitle);
              if (newTitle.trim()) {
                setHasTitleError(false);
              }
            }}
            placeholder="Enter a title"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User:</label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={e => {
              const newUserId = e.target.value;

              setUserId(newUserId);
              if (newUserId.trim()) {
                setHasUserIdError(false);
              }
            }}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {users.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
