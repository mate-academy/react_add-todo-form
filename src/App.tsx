import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './type/Todo';
import { TodoWithUser } from './type/TodoWithUser';
import { User } from './type/User';

const findUserById = (userId: number): User | null => (
  usersFromServer.find(user => user.id === userId) || null
);

export const App: React.FC = () => {
  const todosWithUser = todosFromServer
    .map((todo: Todo) => ({
      ...todo,
      user: findUserById(todo.userId),
    }));

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState(todosWithUser);
  const [titleEmptyError, setTitleEmptyError] = useState(false);
  const [userEmptyError, setUserEmptyError] = useState(false);

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setUserEmptyError(false);
  };

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleEmptyError(false);
  };

  const addTodo = (): void => {
    if (title.trim() && userId) {
      const newUser: TodoWithUser = {
        id: todos.length,
        title,
        completed: false,
        userId,
        user: findUserById(userId),
      };

      setTodos(prevTodos => ([
        ...prevTodos,
        newUser,
      ]));

      setTitle('');
      setUserId(0);

      return;
    }

    if (!title.trim()) {
      setTitleEmptyError(true);
    }

    if (!userId) {
      setUserEmptyError(true);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={event => {
          event.preventDefault();
          addTodo();
        }}
      >
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            value={title}
            onChange={handleTitleInput}
          />
          {titleEmptyError
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">
            User:
            <select
              data-cy="userSelect"
              id="user"
              value={userId}
              onChange={handleUserSelect}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(person => (
                <option key={person.id} value={person.id}>{person.name}</option>
              ))}
            </select>
          </label>

          {userEmptyError
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
