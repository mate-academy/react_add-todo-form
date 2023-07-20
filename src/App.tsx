import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

const VALID_CHARS
= 'qwertyuiopasdfghjklzxcvbnmйцукенгшщзхїфівапролджєячсмитьбю1234567890 ';

const getNextId = (someTodos: Todo[]) => {
  const maxId = Math.max(...someTodos.map(({ id }) => id));

  return maxId + 1;
};

const handleChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setTitle: React.Dispatch<React.SetStateAction<string>>,
) => {
  const etv = event.target.value;

  if (etv === '' || VALID_CHARS.includes(
    etv[etv.length - 1].toLocaleLowerCase(),
  )) {
    setTitle(etv);
  }
};

const getUserById = (id: number) => {
  return usersFromServer.find(user => user.id === id);
};

const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState(0);
  const [preparedTodos, setPreparedTodos] = useState(todos);
  const [isAuthorIdClicked, setIsAuthotIdClicked] = useState(false);
  const [isTitleClicked, setIsTitleClicked] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim() || !authorId) {
      setIsAuthotIdClicked(true);
      setIsTitleClicked(true);

      return;
    }

    setPreparedTodos(prevTodos => {
      const newTodo = {
        id: getNextId(preparedTodos),
        title,
        completed: false,
        userId: authorId,
        user: getUserById(authorId),
      };

      return [...prevTodos, newTodo];
    });

    setTitle('');
    setAuthorId(0);
    setIsAuthotIdClicked(false);
    setIsTitleClicked(false);
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
          <input
            id="input"
            type="text"
            placeholder="Enter title of your post"
            data-cy="titleInput"
            value={title}
            onChange={event => handleChange(event, setTitle)}
            onBlur={() => setIsTitleClicked(true)}
          />
          {!title.trim() && isTitleClicked && (
            <label
              className="error"
              htmlFor="input"
            >
              Please enter a title
            </label>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            id="select"
            value={authorId}
            onChange={event => setAuthorId(+event.target.value)}
            onBlur={() => setIsAuthotIdClicked(true)}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {!authorId && isAuthorIdClicked && (
            <label
              className="error"
              htmlFor="select"
            >
              Please choose a user
            </label>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={preparedTodos}
      />
    </div>
  );
};
