import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

export const App = () => {
  const [visibleTodos, setVisibleTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [isNotValidTitle, setIsNotValidTitle] = useState(false);
  const [isNotValidSelectedUser, setIsNotValidSelectedUser] = useState(false);

  const getUserById = (userId: number) => {
    return usersFromServer.find(user => user.id === userId) as User;
  };

  const todosWithUsers = visibleTodos.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const getMaxTodoId = (todos: Todo[]) => {
    const ids = todos.map(todo => todo.id);

    return Math.max(...ids, 0);
  };

  const handleReset = () => {
    setTitle('');
    setSelectedUser(0);
    setIsNotValidTitle(false);
    setIsNotValidSelectedUser(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitle('');
      setIsNotValidTitle(true);
    }

    if (!selectedUser) {
      setIsNotValidSelectedUser(true);
    }

    if (title.trim() && selectedUser) {
      setVisibleTodos([...visibleTodos, {
        id: getMaxTodoId(visibleTodos) + 1,
        title,
        completed: false,
        userId: selectedUser,
      }]);
      handleReset();
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsNotValidTitle(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setIsNotValidSelectedUser(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={(event) => handleTitleChange(event)}
            />
          </label>

          {isNotValidTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              defaultValue={0}
              value={selectedUser}
              onChange={(event) => handleUserChange(event)}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {isNotValidSelectedUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosWithUsers} />
    </div>
  );
};
