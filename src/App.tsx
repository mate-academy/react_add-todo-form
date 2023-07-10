import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([...todos]);

  const [title, setTitle] = useState('');
  const [hasErrorTitle, setHasErrorTitle] = useState(false);

  const [userSelect, setUserSelect] = useState(0);
  const [hasErrorUserSelect, setHasErrorUserSelect] = useState(false);

  const pattern = /[^a-zA-Zа-яА-ЯґҐєЄіІїЇ0-9\s]|[ёЁыЫъЪэЭ]/gu;

  const handlerChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value.replace(pattern, '');

    if (newTitle === title) {
      return;
    }

    setTitle(newTitle);
    setHasErrorTitle(false);
  };

  const createId = () => {
    const arrOfNumbers = visibleTodos.map(todo => todo.id);

    return Math.max(...arrOfNumbers) + 1;
  };

  const reset = () => {
    setTitle('');
    setUserSelect(0);

    setHasErrorTitle(false);
    setHasErrorUserSelect(false);
  };

  const handlerSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasErrorTitle(!title);
    setHasErrorUserSelect(!userSelect);

    if (!title || !userSelect) {
      return;
    }

    const newTodo = {
      id: createId(),
      title,
      completed: false,
      userId: userSelect,
      user: getUserById(userSelect),
    };

    setVisibleTodos([
      ...visibleTodos,
      newTodo,
    ]);

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handlerSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">
            Title:&nbsp;
          </label>
          <input
            id="titleInput"
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handlerChangeTitle}
          />
          {hasErrorTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            User:&nbsp;
          </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userSelect}
            onChange={event => {
              setUserSelect(+event.target.value);
              setHasErrorUserSelect(false);
            }}
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

          {hasErrorUserSelect && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
