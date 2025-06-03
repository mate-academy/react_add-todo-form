import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

export const App = () => {
  const [title, setTitle] = useState('');
  const [isTitleTouched, setIsTitleTouched] = useState(false);
  const [isUserTouched, setIsUserTouched] = useState(false);
  const [selectedUser, setSelectedUser] = useState(0);

  const emptyUser = {
    name: 'Choose a user',
    id: 0,
  };

  function getUserByID(userId) {
    return usersFromServer.find(user => user.id === userId) || null;
  }

  const enrichedTodos = todosFromServer.map(todo => ({
    ...todo,
    user: getUserByID(todo.userId),
  }));

  const [todos, setTodos] = useState(enrichedTodos);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsTitleTouched(true);
    setIsUserTouched(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const newTitle = formData.get('title')?.toString().trim();
    const userId = Number(formData.get('userSelect'));

    if (!newTitle || userId === 0) {
      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id)) + 1;

    const newTodo = {
      id: maxId,
      title: newTitle,
      completed: false,
      userId,
      user: getUserByID(userId),
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setSelectedUser(0);
    setIsTitleTouched(false);
    setIsUserTouched(false);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title:</label>
          <input
            type="text"
            name="title"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onBlur={() => setIsTitleTouched(true)}
            onChange={e => setTitle(e.target.value)}
          />
          {!title && isTitleTouched && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:</label>
          <select
            data-cy="userSelect"
            onChange={e => {
              if (+e.target.value === 0) {
                setIsUserTouched(true);
              }
            }}
            value={selectedUser}
            name="userSelect"
            onBlur={() => setIsUserTouched(true)}
          >
            {[emptyUser, ...usersFromServer].map(user => (
              <option value={user.id} key={user.id} disabled={user.id === 0}>
                {user.name}
              </option>
            ))}
          </select>
          {isUserTouched && selectedUser === 0 && (
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
