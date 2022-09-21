import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId) ?? undefined,
}));

export const App: React.FC = () => {
  const [choosedUserId, setChoosedUserId] = useState('-1');
  const [todoTitle, setTodoTitle] = useState('');
  const [visibleTodos, addVisibleTodo] = useState(todos);
  const [isSubmitted, setSubmit] = useState(false);

  const handleSelectingUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChoosedUserId(event.target.value);
  };

  const handleEnteringTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const title = todoTitle.trim();

    const id = visibleTodos
      .reduce((maxId, todo) => (maxId > todo.id ? maxId : todo.id), 0) + 1;
    const user = getUser(Number(choosedUserId)) ?? undefined;
    const userId = user?.id ?? 0;
    const completed = false;

    if (title === '' || choosedUserId === '-1') {
      setSubmit(true);
    } else {
      addVisibleTodo((prevVisibleTodo) => [...prevVisibleTodo, {
        id,
        title,
        userId,
        completed,
        user,
      }]);

      setChoosedUserId('-1');
      setTodoTitle('');
      setSubmit(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleAddTodo}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={todoTitle}
              onChange={handleEnteringTitle}
            />
          </label>
          {todoTitle === ''
          && isSubmitted
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              onChange={handleSelectingUser}
              value={choosedUserId}
            >

              <option value="-1" disabled>Choose a user</option>
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
          {choosedUserId === '-1'
            && isSubmitted
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
