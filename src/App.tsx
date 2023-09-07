import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { TodoWithUser } from './types';

const checkTitleSpelling = (enteredTitle: string) => {
  let preparedTitle = '';

  for (let i = 0; i < enteredTitle.length; i += 1) {
    const charCode = enteredTitle.charCodeAt(i);

    if (charCode === 32
      || charCode === 1100
      || charCode === 1108
      || charCode === 1110
      || charCode === 1111
      || (charCode > 47 && charCode < 58)
      || (charCode > 64 && charCode < 91)
      || (charCode > 96 && charCode < 123)
      || (charCode > 1025 && charCode < 1066)
      || (charCode > 1069 && charCode < 1098)
      || (charCode > 1101 && charCode < 1105)
    ) {
      preparedTitle += enteredTitle[i];
    }
  }

  return preparedTitle;
};

const todos: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(({ id }) => id === todo.userId) || null,
}));

export const App: React.FC = () => {
  const [todoItems, setTodoItems] = useState<TodoWithUser[]>(todos);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(checkTitleSpelling(event.target.value));
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const clearForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setHasTitleError(true);
    }

    if (!userId) {
      setHasUserIdError(true);
    }

    if (!title || !userId) {
      return;
    }

    const user = usersFromServer.find(({ id }) => id === userId) || null;
    const userIds: number[] = todoItems.map(({ id }) => id);
    const maxUserId = Math.max(...userIds);

    const newTodoItem = {
      id: maxUserId + 1,
      title,
      completed: false,
      userId,
      user,
    };

    setTodoItems(prevState => [...prevState, newTodoItem]);

    clearForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label
            htmlFor="todo-title"
          >
            Title:&nbsp;&nbsp;

            <input
              id="todo-title"
              type="text"
              placeholder="Enter a title"
              data-cy="titleInput"
              value={title}
              onChange={handleTitleChange}
            />
          </label>

          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label
            htmlFor="todo-select"
          >
            User:&nbsp;&nbsp;

            <select
              id="todo-select"
              data-cy="userSelect"
              value={userId}
              onChange={handleUserIdChange}
            >
              <option value="0" disabled>
                Choose a user
              </option>

              {usersFromServer.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoItems} />
    </div>
  );
};
