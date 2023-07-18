import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo, User } from './components/Types/Types';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId)
    || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [newTodos, setTodos] = useState<Todo[]>(todos);
  const [todoTitle, setTodoTitle] = useState('');
  const [userID, setUserID] = useState(0);
  const [titleError, setTitleError] = useState('');
  const [userIDError, setUserIDError] = useState('');

  function getId() {
    const max = Math.max(...newTodos.map(todo => todo.id));

    return max + 1;
  }

  function resetForm() {
    setTodoTitle('');
    setUserID(0);
    setTitleError('');
    setUserIDError('');
  }

  const todoFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!userID) {
      setUserIDError('Username is required');
    }

    if (!todoTitle) {
      setTitleError('Title is required');
    }

    if (!userID || !todoTitle) {
      return;
    }

    const newTodo: Todo = {
      id: getId(),
      title: todoTitle,
      completed: false,
      userId: userID,
      user: getUserById(userID),
    };

    setTodos(prev => [...prev, newTodo]);

    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={e => todoFormHandler(e)}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            placeholder="Type todo title"
            value={todoTitle}
            onChange={e => {
              setTodoTitle(e.target.value);
              setTitleError('');
            }}
          />
          {titleError
            && (
              <span className="error">
                Please enter a title
              </span>
            )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            id="userSelect"
            value={userID}
            onChange={e => {
              setUserID(+e.target.value);
              setUserIDError('');
            }}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userIDError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
