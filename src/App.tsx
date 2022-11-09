import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [userId, setUserId] = useState(0);
  const [userError, setUserError] = useState('');
  const [visibleTodos, setVisibleTodos] = useState([...todos]);

  const hundleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleError('Please enter a title');
    }

    if (!userId) {
      setUserError('Please choose a user');
    }

    if (title.trim().length && userId) {
      const newTodo = {
        id: [...todos.sort((a, b) => b.id - a.id)][0].id + 1,
        userId: +userId,
        title,
        completed: false,
        user: getUser(userId),
      };

      setTitle('');
      setTitleError('');
      setUserId(0);
      setUserError('');
      setVisibleTodos([...visibleTodos, newTodo]);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={hundleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setTitleError('');
            }}
          />
          { titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={(event) => {
              setUserId(+event.target.value);
              setUserError('');
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
          {
            userError && (
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
