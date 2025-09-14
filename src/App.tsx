import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { TodoWithUser } from './features/types';

export const App = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userError, setUserError] = useState(false);

  const todosWithUsers: TodoWithUser[] = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId),
  }));

  const [todos, setTodos] = useState(todosWithUsers);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(
      event.target.value.replace(
        /[^A-Za-zА-Еа-еЖ-Щж-щЬьІіЇїЄєҐґЮюЯя0-9\s]/g,
        '',
      ),
    );
    if (titleError) {
      setTitleError(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    if (userError) {
      setUserError(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (trimmedTitle.length === 0) {
      setTitleError(true);
    }

    if (userId === 0) {
      setUserError(true);
    }

    if (trimmedTitle.length === 0 || userId === 0) {
      return;
    }

    const maxId = todos.reduce(
      (acc, todo) => (todo.id > acc ? todo.id : acc),
      0,
    );

    const newTodo = {
      userId,
      id: maxId + 1,
      title: trimmedTitle,
      completed: false,
      user: usersFromServer.find(user => user.id === userId),
    };

    setTodos(currTodos => [...currTodos, newTodo]);
    setTitle('');
    setUserId(0);
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Todo Title:</label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Todo title"
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:</label>
          <select
            id="userSelect"
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
