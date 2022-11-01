import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { TodosWithUsers } from './types/allTypes';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const todosWithUsers: TodosWithUsers[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodosWithUsers[]>(todosWithUsers);
  const [newTitle, setNewTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [emptyTitleError, setEmptyTitleError] = useState(false);
  const [emptyUserError, setemptyUserError] = useState(false);

  const getBigestId = () => {
    return Math.max(...(todos.map(todo => todo.id))) + 1;
  };

  const resetForm = () => {
    setNewTitle('');
    setSelectedUser(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimTitle = newTitle.trim();

    setEmptyTitleError(!trimTitle);
    setemptyUserError(!selectedUser);

    if (!trimTitle || !selectedUser) {
      return;
    }

    const newTodo: TodosWithUsers = {
      id: getBigestId(),
      title: trimTitle,
      completed: false,
      userId: selectedUser,
      user: usersFromServer.find(user => user.id === selectedUser) || null,
    };

    setTodos(curTodos => [...curTodos, newTodo]);
    resetForm();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">
            <input
              type="text"
              placeholder="Enter a title"
              data-cy="titleInput"
              id="title"
              value={newTitle}
              onChange={handleTitleChange}
            />
            {!newTitle && emptyTitleError && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            <select
              data-cy="userSelect"
              id="userSelect"
              value={selectedUser}
              onChange={handleSelect}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {!selectedUser && emptyUserError && (
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
