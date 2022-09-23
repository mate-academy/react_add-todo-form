import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './Types/User';
import { Todo } from './Types/Todo';
import { TodoList } from './components/TodoList/TodoList';

function getUser(userId: number): User | undefined {
  return usersFromServer.find(user => user.id === userId) || undefined;
}

const visibleTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [titleCorrect, setTitleCorrect] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userCorrect, setUserCorrect] = useState(false);

  const newTodos = () => {
    const newTodo = {
      id: Math.max(...visibleTodos) + 1,
      userId: Number(userId),
      title,
      completed: false,
      user: getUser(userId),
    };

    visibleTodos.push(newTodo);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleCorrect(true);
    }

    if (!userId) {
      setUserCorrect(true);
    }

    if (!title.trim() || !userId) {
      return;
    }

    newTodos();
    setTitle('');
    setTitleCorrect(false);
    setUserId(0);
    setUserCorrect(false);
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
          <span>Title: </span>
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setTitleCorrect(false);
            }}
          />

          {
            titleCorrect && (
              <span className="error">Please enter a title</span>
            )
          }
        </div>

        <div className="field">
          <label>
            <span>User: </span>
            <select
              data-cy="userSelect"
              value={userId}
              onChange={(event) => {
                setUserId(Number(event.target.value));
                setUserCorrect(false);
              }}
            >
              <option value="0" disabled>Choose a user</option>
              {
                usersFromServer.map(user => (
                  <option value={user.id}>{user.name}</option>
                ))
              }
            </select>
          </label>
          {
            userCorrect && (
              <span className="error">Please choose a user</span>
            )
          }
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={visibleTodos} />
    </div>
  );
};
