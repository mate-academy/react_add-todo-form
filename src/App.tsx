import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo, User } from './types/types';
import { TodoList } from './components/TodoList';

const findUserById = (id: number, users: User[]) => {
  return users.find(user => user.id === id) || null;
};

const requiredTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(todo.userId, usersFromServer),
}));

const findGreatestId = (todos: Todo[]) => {
  return Math.max(...todos.map(todo => todo.id));
};

export const App = () => {
  const [info, setInfo] = useState({
    title: '',
    todos: requiredTodos,
    userId: '0',
    isValidTitle: true,
    isValidUserId: true,
  });

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();

    const {
      title,
      todos,
      userId,
    } = info;

    let titleIsCorrect = true;
    let currentTitle = title;

    const buttonCondition
      = userId !== '0' && title !== '' && title.trim() !== '';

    const titleErrorCondition = title === '' || title.trim() === '';
    const userErrorCondition = userId === '0';

    if (titleErrorCondition) {
      currentTitle = '';
      titleIsCorrect = false;

      setInfo({
        ...info,
        title: currentTitle,
        isValidTitle: titleIsCorrect,
      });
    }

    if (userErrorCondition) {
      setInfo({
        ...info,
        title: currentTitle,
        isValidTitle: titleIsCorrect,
        isValidUserId: false,
      });
    }

    if (buttonCondition) {
      const newUser = findUserById(Number(userId), usersFromServer);
      const newId = findGreatestId(todos) + 1;
      const newTodo: Todo = {
        id: newId,
        title,
        completed: false,
        userId: newUser ? newUser.id : null,
        user: newUser,
      };

      setInfo({
        ...info,
        userId: '0',
        todos: [...todos, newTodo],
        title: '',
      });
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({
      ...info,
      title: event.target.value,
      isValidTitle: true,
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInfo({
      ...info,
      userId: event.target.value,
      isValidUserId: true,
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            id="titleInput"
            value={info.title}
            onChange={handleTitleChange}
            autoComplete="off"
          />
          {!info.isValidTitle
            && (<span className="error"> Please enter a title</span>)}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            value={info.userId}
            onChange={handleSelectChange}
            id="userSelect"
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={`${user.id}`}>{user.name}</option>
            ))}
          </select>

          {!info.isValidUserId
            && (<span className="error"> Please choose a user</span>)}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleClick}
        >
          Add
        </button>
      </form>

      <TodoList todos={info.todos} />
    </div>
  );
};
