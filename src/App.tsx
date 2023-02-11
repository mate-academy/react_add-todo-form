import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [newList, setNewList] = useState(todos);

  const [showErrorTitle, setShowErrorTitle] = useState(false);
  const [showErrorUser, setShowErrorUser] = useState(false);

  const showError = () => {
    if (!title && !userId) {
      setShowErrorTitle(true);
      setShowErrorUser(true);
    }

    if (!title) {
      return setShowErrorTitle(true);
    }

    return setShowErrorUser(true);
  };

  const inputHandler = (value: string) => {
    setShowErrorTitle(false);

    return setTitle(
      value.replace(/[^A-Za-z0-9\s^А-яЁё]/i, ''),
    );
  };

  const selectHandler = (value: number) => {
    setShowErrorUser(false);

    return setUserId(value);
  };

  const addTodo = (id: number) => {
    const reset = () => {
      setTitle('');
      setUserId(0);
    };

    const passForm = () => {
      setShowErrorTitle(false);
      setShowErrorUser(false);
      reset();
    };

    if (userId && title.trim()) {
      const newId = Math.max(...newList.map(todo => todo.id)) + 1;

      const toCreate = {
        id: newId,
        title,
        completed: false,
        userId,
        user: getUser(id),
      };

      passForm();

      return setNewList(prev => [...prev, toCreate]);
    }

    return showError();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo(userId);
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
          <label>
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Please enter a title"
              value={title}
              onChange={(e) => inputHandler(e.target.value)}
            />
            {showErrorTitle
            && <span className="error">Please enter a title</span>}
          </label>
        </div>

        <div className="field">
          <label>
            <select
              data-cy="userSelect"
              value={userId}
              onChange={(e) => {
                selectHandler(+e.target.value);
              }}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(({ name, id }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </select>
            {showErrorUser
                && <span className="error">Please choose a user</span>}
          </label>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={newList} />
    </div>
  );
};
