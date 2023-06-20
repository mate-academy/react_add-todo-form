import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<null | number>(null);
  const [selectUserError, setSelectUserError] = useState(false);
  const [hasTitleError, setHasTitleError] = useState(false);

  const addTodo = (titleString: string, user: number) => {
    const lastTodoId = Math.max(...visibleTodos.map(todo => todo.id));
    const newTodo = {
      id: lastTodoId + 1,
      title: titleString,
      completed: false,
      userId: user,
      user: getUser(user),
    };

    setVisibleTodos(state => [...state, newTodo]);
  };
  //

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const preparedTitle = title.replace(/[^а-яА-Яa-zA-Z\d\s]/g, '').trim();

    if (!userId) {
      setSelectUserError(true);
    }

    if (!preparedTitle) {
      setTitle('');
      setHasTitleError(true);
    }

    if (preparedTitle && userId) {
      addTodo(preparedTitle, +userId);
      setTitle('');
      setUserId(0);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (hasTitleError) {
      setHasTitleError(false);
    }

    setTitle(event.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectUserError) {
      setSelectUserError(false);
    }

    const userIdNumber = +event.target.value;

    setUserId(userIdNumber);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        className="TodoForm"
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="TodoForm__field field">
          <input
            className="TodoForm__input TodoForm__input--title"
            type="text"
            name="title"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="TodoForm__field field">
          <select
            className="TodoForm__input TodoForm__input--user"
            data-cy="userSelect"
            name="user"
            value={userId || 0}
            onChange={handleChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {selectUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          className="TodoForm__submit"
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
