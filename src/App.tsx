import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { Todos } from './types/Todos';
import { Users } from './types/Users';
import { TodoInfo } from './components/TodoInfo';

export const App = () => {
  const initialTodos: Todos[] = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(u => u.id === todo.userId),
  }));

  const initialUsers: Users[] = usersFromServer.map(user => ({
    ...user,
  }));

  const [todos, setTodos] = useState<Todos[]>(initialTodos);
  const [users] = useState<Users[]>(initialUsers);
  const [newTitle, setNewTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
    setTitleError(false);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+e.target.value);
    setUserError(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isTitleInvalid = newTitle.trim() === '';
    const isUserInvalid = selectedUserId === 0;

    if (isTitleInvalid || isUserInvalid) {
      setTitleError(isTitleInvalid);
      setUserError(isUserInvalid);

      return;
    }

    const maxId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) : 0;

    const newTodo: Todos = {
      id: maxId + 1,
      title: newTitle.trim(),
      userId: selectedUserId,
      completed: false,
      user: users.find(u => u.id === selectedUserId),
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    setNewTitle('');
    setSelectedUserId(0);
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          Title:
          <input
            type="text"
            data-cy="titleInput"
            value={newTitle}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          User:
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value="0">Choose a user</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
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

      <section className="TodoList">
        {todos.map(todo => (
          <TodoInfo key={todo.id} todo={todo} />
        ))}
      </section>
    </div>
  );
};
