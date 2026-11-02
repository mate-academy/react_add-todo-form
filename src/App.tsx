import './App.scss';
import React, { useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';

export const App = () => {
  const preparedTodos = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(person => person.id === todo.userId),
  }));

  const [todos, setTodos] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim() === '') {
      setTitleError(true);
    }

    if (selectedUser === 0) {
      setUserError(true);
    }

    if (title.trim() === '' || selectedUser === 0) {
      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id));
    const newId = maxId + 1;

    const user = usersFromServer.find(person => {
      if (!person) {
        return;
      }

      return person.id === selectedUser;
    });

    const newTodo = {
      id: newId,
      title: title.trim(),
      userId: selectedUser,
      completed: false,
      user,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelectedUser(0);
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => (
              setTitle(event.target.value), setTitleError(false)
            )}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User</label>
          <select
            id="user"
            data-cy="userSelect"
            value={selectedUser}
            onChange={event => (
              setSelectedUser(+event.target.value), setUserError(false)
            )}
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
