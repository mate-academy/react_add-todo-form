import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getUser } from './utils/user';
import { maxTodoId } from './utils/maxTodoId';

const getVisibleTodos: Todo[] = todosFromServer.map(todo => {
  const user = getUser(todo.userId);

  if (!user) {
    return todo;
  }

  return { ...todo, user };
});

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(getVisibleTodos);
  const [checkedUserId, setCheckedUserId] = useState(0);
  const [todoTitle, setTodoTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedTitle = e.target.value.replace(
      /[^a-zA-Zа-яА-ЯёЁґҐєЄіІїЇ0-9 ]/g,
      '',
    );

    setTodoTitle(cleanedTitle);
    if (titleError) {
      setTitleError(false);
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCheckedUserId(+e.target.value);
    if (userError) {
      setUserError(false);
    }
  };

  const resetForm = () => {
    setTodoTitle('');
    setCheckedUserId(0);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTitle = todoTitle.trim();

    if (!cleanTitle) {
      setTitleError(true);
    }

    if (!checkedUserId) {
      setUserError(true);
    }
    // setTitleError(!todoTitle.trim());
    // setUserError(!checkedUserId);

    if (!cleanTitle || !checkedUserId) {
      return;
    }

    setTodos(prevTodos => [
      ...prevTodos,
      {
        id: maxTodoId(todos),
        title: cleanTitle,
        completed: false,
        userId: checkedUserId,
        user: getUser(checkedUserId),
      },
    ]);

    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmitForm}>
        <div className="field">
          <label className="field__label" htmlFor="titleID">
            Title:&nbsp;
          </label>
          <input
            name="title"
            type="text"
            data-cy="titleInput"
            id="titleID"
            placeholder="Enter a title"
            onChange={handleTitleChange}
            value={todoTitle}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="userSelectId">
            Choose a user:&nbsp;
          </label>
          <select
            id="userSelectId"
            data-cy="userSelect"
            value={checkedUserId}
            onChange={handleUserChange}
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

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton" className="formBtn">
          Add
        </button>
      </form>

      <h2>Todo list:</h2>
      <TodoList todos={todos} />
    </div>
  );
};
