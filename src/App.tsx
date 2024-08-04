import './App.scss';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { UpdatedTodo } from './types/UpdatedTodo';
import { User } from './types/User';

const getUserById = (userId: number): User | null => {
  const user = usersFromServer.find(el => el.id === userId);

  return user || null;
};

const getPreperedTodo = (oneTodo: Todo): UpdatedTodo => {
  const { userId, completed, title, id } = oneTodo;

  return {
    id,
    title,
    completed,
    user: getUserById(userId),
  };
};

const MAX_ID = (arr: UpdatedTodo[]) => {
  const maxId = Math.max(...arr.map(todo => todo.id));

  return maxId + 1;
};

export const App = () => {
  const [data, setData] = useState([
    ...todosFromServer.map(el => getPreperedTodo(el)),
  ]);

  const [title, setTitle] = useState('');
  const [optionId, setOptionUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const reset = () => {
    setTitle('');
    setOptionUserId(0);
    setHasTitleError(false);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim() && optionId) {
      const newTodo: UpdatedTodo = {
        id: MAX_ID(data),
        title,
        completed: false,
        user: getUserById(optionId),
      };

      setData(prevData => {
        return [...prevData, newTodo];
      });

      reset();
    }

    if (!optionId) {
      setHasUserError(true);
    }

    if (!title.trim()) {
      setHasTitleError(true);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          Title:&#160;
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              setHasTitleError(false);
            }}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          User:&#160;
          <select
            data-cy="userSelect"
            value={optionId}
            onChange={e => {
              setOptionUserId(+e.target.value);
              setHasUserError(false);
            }}
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
          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={data} />
    </div>
  );
};
