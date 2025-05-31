import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    if (!trimmedTitle) {
      setTitleError(true);
    }

    if (userId === 0) {
      setUserError(true);
    }

    if (!trimmedTitle || userId === 0) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id)) + 1;
    const user = usersFromServer.find(u => u.id === userId);

    if (!user) {
      return;
    }

    const newTodo: Todo = {
      id: newId,
      title: trimmedTitle,
      userId,
      completed: false,
      user,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleAddTodo}>
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              placeholder="Enter title"
              data-cy="titleInput"
              value={title}
              onChange={e => {
                setTitle(e.target.value);
                setTitleError(false);
              }}
            />
          </label>
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={userId}
              onChange={e => {
                setUserId(Number(e.target.value));
                setUserError(false);
              }}
            >
              <option value={0} disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
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
