import { FormEvent, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [visibleTodos, setVisibleTodos] = useState(todos);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const getNewId = () => {
    let greatestId = 0;

    todos.forEach(todo => {
      if (todo.id > greatestId) {
        greatestId = todo.id;
      }
    });

    return greatestId + 1;
  };

  const refreshForm = () => {
    setTitle('');
    setUserId(0);
    setHasTitleError(false);
    setHasUserIdError(false);
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const hasIncorrectTitle = !title;
    const hasIncorrectUser = !userId;

    if (hasIncorrectTitle) {
      setHasTitleError(true);
    }

    if (hasIncorrectUser) {
      setHasUserIdError(true);
    }

    const validationErrors = [
      hasIncorrectTitle,
      hasIncorrectUser,
    ];

    if (validationErrors.some(Boolean)) {
      return;
    }

    const newTodo: Todo = {
      id: getNewId(),
      userId,
      title,
      completed: false,
      user: getUser(userId),
    };

    setVisibleTodos(currentTodos => [
      ...currentTodos,
      newTodo,
    ]);
    refreshForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={submitHandler}
      >
        <div className="field">
          <label htmlFor="title">{'Title: '}</label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              setHasTitleError(false);
              setTitle(event.target.value);
            }}
          />

          {hasTitleError
            && <span className="error">Please enter a title</span>}

        </div>

        <div className="field">
          <label htmlFor="user">{'User: '}</label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={(event) => {
              setHasUserIdError(false);
              setUserId(Number(event.target.value));
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map((user) => (
              <option value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserIdError
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />

    </div>
  );
};
