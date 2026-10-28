import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { ToDosType } from './types/TodosType';
import { UsersType } from './types/UsersType';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

function getId(newTodos: ToDosType[]) {
  return Math.max(...newTodos.map(todo => +todo.id)) + 1;
}

export const App = () => {
  const users: UsersType[] = [...usersFromServer];
  const [newTodos, setNewTodos] = useState<ToDosType[]>(
    todosFromServer.map(todo => {
      const foundUser = usersFromServer.find(user => user.id === todo.userId);

      return {
        ...todo,
        user: foundUser,
      };
    }),
  );

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [id, setId] = useState<number>(getId(newTodos));

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasSelectError, setHasSelectError] = useState(false);

  const [activeId, setActiveId] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      setHasTitleError(true);
    }

    if (!activeId) {
      setHasSelectError(true);
    }

    if (!title || !activeId) {
      return;
    }

    setNewTodos(prev => [
      ...prev,
      {
        id: id,
        title: title,
        completed: false,
        userId: userId,
        user: usersFromServer.find(user => user.id === userId),
      },
    ]);

    setId(prev => prev + 1);
    setTitle('');
    setActiveId(0);
    setUserId(0);
  };

  const handleChangedSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
    setActiveId(+e.target.value);
    setHasSelectError(false);
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasTitleError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleChangeTitle}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="select">User: </label>
          <select
            id="select"
            data-cy="userSelect"
            value={activeId}
            onChange={handleChangedSelect}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {hasSelectError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
