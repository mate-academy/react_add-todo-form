import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    return todosFromServer.map(todo => {
      const foundUser = usersFromServer.find(user => user.id === todo.userId);

      return {
        ...todo,
        user: foundUser,
      };
    });
  });

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number>(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleEmpty = !title.trim();
    const isUserNotSelected = userId === 0;

    setHasTitleError(isTitleEmpty);
    setHasUserError(isUserNotSelected);

    if (isTitleEmpty || isUserNotSelected) {
      return;
    }

    const maxId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) : 0;
    const newId = maxId + 1;

    const selectedUser = usersFromServer.find(user => user.id === userId);

    const newTodo: Todo = {
      id: newId,
      title: title.trim(),
      completed: false,
      userId: userId,
      user: selectedUser,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setTitle('');
    setUserId(0);
    setHasTitleError(false);
    setHasUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput" className="label">
            Title
          </label>

          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            className="input"
            placeholder="Enter todo title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setHasTitleError(false);
            }}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect" className="label">
            User
          </label>

          <select
            id="userSelect"
            data-cy="userSelect"
            className="input"
            value={userId}
            onChange={event => {
              setUserId(Number(event.target.value));
              setHasUserError(false);
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
          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton" className="btn-add">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
