import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './components/types';

const updatedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(updatedTodos);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState<number>(0);
  const [error, setError] = useState(false);
  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(false);
    if (!title || !selectedUser) {
      setError(true);

      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id));
    const newTodo = {
      id: maxId + 1,
      title: title,
      completed: false,
      userId: selectedUser,
      user: usersFromServer.find(u => u.id === selectedUser),
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelectedUser(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form onSubmit={handleSubmit} action="/api/todos" method="POST">
        <div className="field">
          <input
            id="titleInput"
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleChangeTitle}
          />
          {error && !title && (
            <span className="error">Please enter a title</span>
          )}
        </div>
        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleChangeUser}
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
          {error && !selectedUser && (
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
