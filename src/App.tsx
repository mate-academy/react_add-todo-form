import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

function createTodos(): Todo[] {
  return todosFromServer.map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  }));
}

export const App: React.FC = () => {
  const [user, setUser] = useState('0');
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(() => createTodos());
  const [userNotSelected, setUserNotSelected] = useState(false);
  const [titleNotSelected, setTitleNotSelected] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const { todoTitle, userId } = Object.fromEntries(formData.entries());

    const trimmedTitle = todoTitle.toString().trim();

    if (!userId) {
      setUserNotSelected(true);
    }

    if (!trimmedTitle) {
      setTitleNotSelected(true);
    }

    if (!userId || !trimmedTitle) {
      return;
    }

    const largestId = Math.max(...todos.map(todo => todo.id));

    const newTodo = {
      id: largestId + 1,
      title: trimmedTitle,
      userId: +userId,
      completed: false,
      user: getUser(+userId),
    };

    setTodos(t => ([
      ...t,
      newTodo,
    ]));
    setUser('0');
    setTitle('');
  };

  const regExp = /[^(a-z)(a-я)\d\s]/gi;

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
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              name="todoTitle"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value.replace(regExp, ''));
                setTitleNotSelected(false);
              }}
            />
          </label>
          {titleNotSelected && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              name="userId"
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
                setUserNotSelected(false);
              }}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(({ name, id }) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
          </label>

          {userNotSelected && (
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
