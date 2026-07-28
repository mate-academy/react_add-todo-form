import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [users] = useState(usersFromServer);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [errorTitleField, setErrorTitleField] = useState('');
  const [userIdErrorField, setUserIdErrorField] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setErrorTitleField('Please enter a title');
      hasError = true;
    } else {
      setErrorTitleField('');
    }

    if (userId === 0) {
      setUserIdErrorField('Please choose a user');
      hasError = true;
    } else {
      setUserIdErrorField('');
    }

    if (hasError) {
      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id));
    const selectedUser = users.find(user => user.id === userId);
    const newTodo = {
      id: maxId + 1,
      title: title.trim(),
      userId: userId,
      completed: false,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit} action="/api/todos" method="POST">
        <div className="field">
          {' '}
          Title:
          <input
            placeholder='Enter a title'
            type="text"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setErrorTitleField('');
            }}
            data-cy="titleInput"
          />
          {errorTitleField && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          User:
          <select
            onChange={event => {
              setUserId(+event.target.value);
              setUserIdErrorField('');
            }}
            value={userId}
            data-cy="userSelect"
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userIdErrorField && (
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
