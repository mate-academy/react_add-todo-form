import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer.map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  })));

  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [titleError, setTitleError] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userError, setUserError] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError('');
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setUserError('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedUserId || !title.trim()) {
      if (!selectedUserId) {
        setUserError('Please choose a user');
      }

      if (!title.trim()) {
        setTitleError('Please enter a title');
      }

      return;
    }

    const newTodo: Todo = {
      id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
      title: title.trim(),
      userId: selectedUserId,
      completed: false,
      user: getUser(selectedUserId),
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            type="text"
            value={title}
            onChange={handleTitleChange}
            data-cy="titleInput"
            placeholder="Enter a title"
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            value={selectedUserId}
            onChange={handleUserChange}
            data-cy="userSelect"
            placeholder="Choose a user"
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
          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
