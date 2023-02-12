import './App.scss';
import { ChangeEvent, FormEvent, useState } from 'react';

import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

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
  const [personId, setPersonId] = useState(0);
  const [title, setTitle] = useState('');
  const [preparedTodo, setPreparedTodo] = useState<Todo[]>(todos);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasPersonIdError, setHasPersonIdError] = useState(false);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setPersonId(+event.target.value);
    setHasPersonIdError(false);
  };

  const resetForm = () => {
    setPersonId(0);
    setTitle('');
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    setHasPersonIdError(!personId);
    setHasTitleError(!title);

    const newPerson: Todo = {
      id: Math.max(...preparedTodo.map(todo => todo.id)) + 1,
      userId: personId,
      title,
      completed: false,
      user: getUser(personId),
    };

    if (newPerson && title && personId) {
      setPreparedTodo((currentpreparedTodo) => (
        [...currentpreparedTodo, newPerson]
      ));
      resetForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={handleInput}
          />

          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={personId}
            onChange={handleSelect}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {hasPersonIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={preparedTodo} />
    </div>
  );
};
