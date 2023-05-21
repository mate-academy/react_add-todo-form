import React, { useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const getTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

type HandleChangeType = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export function correctTitle(str: string) {
  return str.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');
}

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userSelect, setUserSelect] = useState(0);
  const [todos, setTodos] = useState(getTodos);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!userSelect) {
      setUserError(true);
    }

    if (!title || !userSelect) {
      return;
    }

    const newTodoId = Math.max(...todos.map(todo => todo.id)) + 1;
    const newTodo: Todo = {
      id: newTodoId,
      completed: false,
      user: getUser(+userSelect),
      title: title.trim(),
      userId: +userSelect,
    };

    setTodos([...todos, newTodo]);
    setUserSelect(0);
    setTitle('');
  };

  const handleChange = (event: HandleChangeType) => {
    const { name, value } = event.target;

    if (name === 'title') {
      setTitle(correctTitle(value));
      setTitleError(false);
    } else
    if (name === 'user') {
      setUserSelect(+value);
      setUserError(false);
    }
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
              name="title"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleChange}
            />
          </label>
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              name="user"
              value={userSelect}
              onChange={handleChange}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
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
