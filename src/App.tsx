import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/todo';
import { User } from './types/user';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId)!,
    })),
  );
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState('');
  const [userId, setUserId] = useState('');
  const [hasUserIdError, setHasUserIdError] = useState('');
  const [users] = useState<User[]>(usersFromServer);

  const reset = () => {
    setTitle('');
    setUserId('');
    setHasTitleError('');
    setHasUserIdError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;

    if (!title.trim()) {
      setHasTitleError('Please enter a title');
      isValid = false;
    } else {
      setHasTitleError('');
    }

    if (!userId.trim()) {
      setHasUserIdError('Please choose a user');
      isValid = false;
    } else {
      setHasUserIdError('');
    }

    if (!isValid) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(...todos.map(todo => todo.id), 0) + 1,
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

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
        onReset={reset}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={e => {
              const newTitle = e.target.value;

              setTitle(newTitle);

              if (newTitle.trim()) {
                setHasTitleError('');
              }
            }}
            placeholder="Enter a title"
          />
          {hasTitleError && <span className="error">{hasTitleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>

          <select
            data-cy="userSelect"
            value={userId}
            onChange={e => {
              const newUserId = e.target.value;

              setUserId(newUserId);

              if (newUserId.trim()) {
                setHasUserIdError('');
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
          {hasUserIdError && <span className="error">{hasUserIdError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
