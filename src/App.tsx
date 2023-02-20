import { ChangeEvent, FormEvent, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoWithUser } from './types/Todo';
import { User } from './types/User';

const validationString = /[0-9A-ZА-ЩЬЮЯҐЄІЇ ]/;

const findUserByUserId = (userId: number): User | null => {
  return usersFromServer.find(({ id }) => id === userId) || null;
};

const todosWithUser = todosFromServer.map(todo => {
  const { userId } = todo;

  return {
    ...todo,
    user: findUserByUserId(userId),
  };
});

const getNewId = (todos: TodoWithUser[]): number => (
  Math.max(...todos.map(({ id }) => id)) + 1
);

export const App = () => {
  const defaultTitle = '';
  const defaultUserId = 0;

  const [todos, setTodos] = useState<TodoWithUser[]>(todosWithUser);
  const [title, setTitle] = useState(defaultTitle);
  const [userId, setUserId] = useState(defaultUserId);
  const [isTitleValid, setIsTitleValidity] = useState(true);
  const [isUserIdValid, setIsUserIdValidity] = useState(true);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const shouldTitleUpdate = (
      (value[value.length - 1] || 'a').toUpperCase().match(validationString)
    );

    if (shouldTitleUpdate) {
      setTitle(value);
    }

    setIsTitleValidity(true);
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserId(+value);
    setIsUserIdValidity(true);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title !== defaultTitle && userId !== defaultUserId) {
      setTodos((currentTodos) => ([
        ...currentTodos,
        {
          id: getNewId(todos),
          title,
          completed: false,
          userId,
          user: findUserByUserId(userId),
        },
      ]));

      setTitle(defaultTitle);
      setUserId(defaultUserId);

      return;
    }

    if (title === defaultTitle) {
      setIsTitleValidity(false);
    }

    if (userId === defaultUserId) {
      setIsUserIdValidity(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleFormSubmit}>
        <label className="field">
          Title:
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter the title"
            value={title}
            onChange={handleInputChange}
          />
          {
            !isTitleValid && (
              <span className="error">Please enter a title</span>
            )
          }
        </label>

        <div className="field">
          User:
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option disabled value={defaultUserId}>
              Choose a user
            </option>
            {
              usersFromServer.map(({ id, name }) => (
                <option key={id} value={id}>{name}</option>
              ))
            }
          </select>

          {
            !isUserIdValid && (
              <span className="error">Please choose a user</span>
            )
          }
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
