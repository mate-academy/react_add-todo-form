import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [selectedUser, setSelectedUser] = useState(false);
  const [enteredTitle, setEnteredTitle] = useState(false);

  const newTodoId = Math.max(...todos.map(todo => todo.id)) + 1;

  const addNewTodo = (id: number) => {
    if (getUser(id) && title.trim()) {
      todos.push({
        id: newTodoId,
        userId,
        title,
        completed: false,
        user: getUser(userId),
      });

      setUserId(0);
      setTitle('');
    }

    if (!userId) {
      setUserId(0);
      setSelectedUser(true);
    }

    if (!title.trim()) {
      setEnteredTitle(true);
    }
  };

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setEnteredTitle(false);
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setSelectedUser(false);
  };

  const handleForm = (event:React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    addNewTodo(userId);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleForm}
        action="/api/users"
        method="POST"
      >
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={onChangeTitle}
              placeholder="Enter a title"
            />
          </label>
          {enteredTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUser}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {selectedUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
