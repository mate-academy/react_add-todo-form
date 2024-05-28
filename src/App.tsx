import './App.scss';
import { TodoList } from './components/TodoList';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { useState } from 'react';

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState(todosFromServer);
  const [titleError, serTitleError] = useState(false);
  const [userIdError, serUserIdError] = useState(false);

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    serTitleError(!title);
    serUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    const todoId = ++todos.map(todo => todo.id).sort((a, b) => b - a)[0];

    setTodos([
      ...todos,
      {
        id: todoId,
        title: title,
        completed: false,
        userId: userId,
      },
    ]);

    setTitle('');
    setUserId(0);
  };

  const addTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    serTitleError(false);
  };

  const addUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    serUserIdError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={addTodo}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={addTitle}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select data-cy="userSelect" value={userId} onChange={addUserId}>
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
