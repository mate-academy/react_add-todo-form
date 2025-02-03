import { FormEvent, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [users] = useState(usersFromServer);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [titleMessageError, setTitleMessageError] = useState('');
  const [selectMessageError, setSelectMessageError] = useState('');

  const reset = () => {
    setTitle('');
    setSelectedUser(0);
    setTitleMessageError('');
    setSelectMessageError('');
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleMessageError('Please enter a title');
    }

    if (!selectedUser) {
      setSelectMessageError('Please choose a user');
    }

    if (!title || !selectedUser) {
      return;
    }

    const maxId = Math.max(0, ...todos.map(todo => todo.id));

    const newTodo = {
      id: maxId + 1,
      title,
      completed: false,
      userId: selectedUser,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleMessageError('');
            }}
          />
          {titleMessageError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={selectedUser}
            onChange={event => {
              setSelectedUser(+event.target.value);
              setSelectMessageError('');
            }}
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
          {selectMessageError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} users={users} />
    </div>
  );
};
