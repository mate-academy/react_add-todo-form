import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './Types/User';
import { Todo } from './Types/Todo';
import { TodoList } from './components/TodoList';

function getUserById(userId:number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

function getLargestTodoId(todos: Todo[]) {
  return Math.max(...todos.map(todo => todo.id));
}

export const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState([...preparedTodos]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [newTitle, setNewTitle] = useState('');
  const [isTitleError, setIsTittleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const handleSubmit = (event:React.FormEvent) => {
    event.preventDefault();

    setIsTittleError(!newTitle);
    setIsUserError(!selectedUser);

    if (newTitle && selectedUser) {
      setNewTitle('');
      setSelectedUser(0);

      const newTodo = {
        id: getLargestTodoId(todos) + 1,
        title: newTitle,
        userId: selectedUser,
        completed: false,
        user: getUserById(+selectedUser),
      };

      setTodos([...todos, newTodo]);
    }
  };

  const handleNewTitle = (event:React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
    setIsTittleError(false);
  };

  const handleSelectedUser = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setIsUserError(false);
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
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={newTitle}
              onChange={handleNewTitle}
            />
          </label>
          {isTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={handleSelectedUser}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {isUserError && (
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
