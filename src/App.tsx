import { ChangeEvent, FormEvent, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

const validationString = /[0-9A-ZА-ЩЬЮЯҐЄІЇ ]/;

type TodoWithUser = Todo & {
  user: User | null,
};

const findUserByUserId = (userId: number) => {
  return usersFromServer.find(({ id }) => id === userId) || null;
};

const todosWithUser = todosFromServer.map(todo => {
  const { userId } = todo;

  return {
    ...todo,
    user: findUserByUserId(userId),
  };
});

export const App = () => {
  const defaultTitle = '';
  const defaultUserId = 0;

  const [todos, setTodos] = useState<TodoWithUser[]>(todosWithUser);
  const [title, setTitle] = useState(defaultTitle);
  const [userId, setUserId] = useState(defaultUserId);
  const [titleValid, setTitleValidity] = useState(true);
  const [userIdValid, setUserIdValidity] = useState(true);

  const getNewId = () => (Math.max(...todos.map(({ id }) => id)) + 1);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const shouldTitleUpdate = (
      (value[value.length - 1] || 'a').toUpperCase().match(validationString)
    );

    if (shouldTitleUpdate) {
      setTitle(value);
    }

    setTitleValidity(true);
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserId(+value);
    setUserIdValidity(true);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title !== defaultTitle && userId !== defaultUserId) {
      setTodos((currentTodos) => ([
        ...currentTodos,
        {
          id: getNewId(),
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
      setTitleValidity(false);
    }

    if (userId === defaultUserId) {
      setUserIdValidity(false);
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
            !titleValid && <span className="error">Please enter a title</span>
          }
        </label>

        <div className="field">
          User:
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option disabled value={defaultUserId}>Choose a user</option>
            {
              usersFromServer.map(({ id, name }) => (
                <option key={id} value={id}>{name}</option>
              ))
            }
          </select>

          {
            !userIdValid && <span className="error">Please choose a user</span>
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
