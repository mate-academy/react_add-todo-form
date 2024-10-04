import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { FormEvent, useState } from 'react';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const preparedTodos = () => {
    return todosFromServer.map(todo => {
      const user = usersFromServer.find(
        userFromServer => userFromServer.id === todo.userId,
      );

      return { ...todo, user: user || null };
    });
  };

  const [tasks, setTasks] = useState<Todo[]>(preparedTodos());

  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');

  const [errorUserId, setErrorUserId] = useState('');
  const [errorTitle, setErrorTitle] = useState('');

  const handleEnteredTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (errorTitle) {
      setErrorTitle('');
    }
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);

    if (errorUserId) {
      setErrorUserId('');
    }
  };

  const handleReset = () => {
    setUserId(0);
    setTitle('');
    setErrorTitle('');
    setErrorUserId('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || userId === 0) {
      if (!title) {
        setErrorTitle('Please enter a title');
      }

      if (userId === 0) {
        setErrorUserId('Please choose a user');
      }

      return;
    }

    const user = usersFromServer.find(
      userFromServer => userFromServer.id === userId,
    );

    const newTaskId =
      tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;

    const newTask: Todo = {
      id: newTaskId,
      title: title,
      userId: userId,
      completed: false,
      user: user || null,
    };

    setTasks(currentTasks => [...currentTasks, newTask]);

    handleReset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <span>Title: </span>
          <input
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleEnteredTitle}
          />
          {errorTitle && <span className="error">{errorTitle}</span>}
        </div>

        <div className="field">
          <span>User: </span>
          <select
            data-cy="userSelect"
            required
            value={userId}
            onChange={handleUserSelect}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errorUserId && <span className="error">{errorUserId}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={tasks} />
    </div>
  );
};
