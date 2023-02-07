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
  const [personName, setPersonName] = useState(0);
  const [title, setTitle] = useState('');
  const [prepareTodo, setPrepareTodo] = useState<Todo[]>(todos);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasPersonNameError, setHasPersonNameError] = useState(false);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setPersonName(+event.target.value);
    setHasPersonNameError(false);
  };

  const resetForm = () => {
    setPersonName(0);
    setTitle('');
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    setHasPersonNameError(!personName);
    setHasTitleError(!title);

    const newPerson: Todo = {
      id: Math.max(...prepareTodo.map(todo => todo.id)) + 1,
      userId: personName,
      title,
      completed: false,
      user: getUser(personName),
    };

    if (newPerson && title && personName) {
      setPrepareTodo((currentPrepareTodo) => (
        [...currentPrepareTodo, newPerson]
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
            value={personName}
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

          {hasPersonNameError && (
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

      <TodoList todos={prepareTodo} />
    </div>
  );
};
