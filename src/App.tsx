import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer, { Todo } from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [title, setTitle] = useState<string>('');
  const [chosenUser, setChosenUser] = useState<number>(0);
  const [errors, setErrors] = useState<{ title: boolean; user: boolean }>({
    title: false,
    user: false,
  });
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      title: title.trim() === '',
      user: chosenUser === 0,
    };

    setErrors(newErrors);

    const isValid = !newErrors.title && !newErrors.user;

    if (!isValid) {
      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id));

    const newTodo: Todo = {
      id: maxId + 1,
      title,
      completed: false,
      userId: chosenUser,
    };

    setTodos(prev => [...prev, newTodo]);

    setTitle('');
    setChosenUser(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="formTitleInput">Title: </label>
          <input
            id="formTitleInput"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              setErrors(prev => ({ ...prev, title: false }));
            }}
            placeholder="Enter a title"
          />
          {errors.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="formUserSelect">User: </label>
          <select
            id="formUserSelect"
            data-cy="userSelect"
            value={chosenUser}
            onChange={e => {
              setChosenUser(+e.target.value);
              setErrors(prev => ({ ...prev, user: false }));
            }}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.name}>
                {user.name}
              </option>
            ))}
          </select>

          {errors.user && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
