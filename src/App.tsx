import './App.scss';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUserById(userId: number) {
  const foundUser = usersFromServer.find((user: User) => (
    user.id === userId
  ));

  return foundUser || null;
}

const preparedTodos: Todo[] = todosFromServer.map((todo) => {
  return {
    ...todo,
    user: getUserById(todo.userId),
  };
});

const getMaxId = (todos: Todo[]) => {
  return todos.reduce((acumulator: number, todo: Todo) => {
    if (todo.id > acumulator) {
      return todo.id;
    }

    return acumulator;
  }, 0);
};

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [isTitle, setIsTitleError] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setIsTitleError(false);
    setTitle(value);
  };

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setIsUser(false);
    setUserId(Number(value));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const titleWithoutExtraSpaces = title.trim();

    if (!userId) {
      setIsUser(true);
    }

    if (!titleWithoutExtraSpaces) {
      setIsTitleError(true);
    }

    if (!titleWithoutExtraSpaces || !userId) {
      return;
    }

    const id = getMaxId(todos) + 1;
    const user = getUserById(Number(userId));

    setTodos((currentTodos) => {
      return [...currentTodos, {
        id,
        title: titleWithoutExtraSpaces,
        completed: false,
        userId,
        user,
      }];
    });

    if (title && userId) {
      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          {'Title: '}

          <input
            type="text"
            data-cy="titleInput"
            name="title"
            placeholder="Enter a title"
            value={title}
            onChange={handleChange}
          />

          <span className="error">
            {(isTitle) && 'Please enter a title'}
          </span>
        </div>

        <div className="field">
          {'User: '}

          <select
            data-cy="userSelect"
            name="userId"
            value={userId}
            onChange={handleChangeSelect}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>

            {usersFromServer.map((user) => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          <span className="error">
            {(isUser) && 'Please choose a user'}
          </span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
