import React, { useState, useEffect } from 'react';
import './App.scss';

import { Todo, User } from './types';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('0');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  useEffect(() => {
    const combinedTodos = todosFromServer.map(todo => {
      const user = usersFromServer.find(
        userRecord => userRecord.id === todo.userId,
      );

      return { ...todo, user };
    });

    setTodos(combinedTodos);
    setUsers(usersFromServer);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title);
    setUserError(selectedUserId === '0');

    if (!title || selectedUserId === '0') {
      return;
    }

    const selectedUser = users.find(user => user.id === +selectedUserId);

    if (!selectedUser) {
      return;
    }

    const newTodo: Todo = {
      id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title,
      completed: false,
      userId: +selectedUserId,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelectedUserId('0');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">
            Title
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={event => {
                const sanitizedTitle = event.target.value.replace(
                  /[^a-zA-Zа-яА-Я0-9\s]/g,
                  '',
                );

                setTitle(sanitizedTitle);
                setTitleError(false);
              }}
            />
          </label>
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="label">
            User
            <select
              data-cy="userSelect"
              value={selectedUserId}
              onChange={event => {
                setSelectedUserId(event.target.value);
                setUserError(false);
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
