import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';

export const App = () => {
  const preparedTodo = todosFromServer.map(todo => {
    return {
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId)!,
    };
  });

  const [title, setTitle] = useState('');
  const [isTitleError, setIsTitleError] = useState(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleError(false);
  };

  const [choseUser, setChoseUser] = useState(0);
  const [isChoseUserError, setIsChoseUserError] = useState(false);

  const handleChoseUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChoseUser(+event.target.value);
    setIsChoseUserError(false);
  };

  const [tasks, setCurrentTasks] = useState(preparedTodo);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsTitleError(!title);
    setIsChoseUserError(choseUser === 0);

    if (!title || choseUser === 0) {
      return;
    }

    const currentUser = usersFromServer.find(user => user.id === choseUser);

    if (!currentUser) {
      return;
    }

    const listId = tasks.map(task => task.id);

    const newId = Math.max(...listId) + 1;

    const newTask = {
      id: newId,
      title,
      completed: false,
      userId: choseUser,
      user: currentUser,
    };

    setCurrentTasks(currentTasks => [...currentTasks, newTask]);

    setTitle('');
    setChoseUser(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={handleTitle}
          />
          {isTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">Chose the User </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={choseUser}
            onChange={handleChoseUser}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={+user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {isChoseUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={tasks} />
    </div>
  );
};
