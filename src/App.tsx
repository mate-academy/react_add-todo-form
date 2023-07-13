import { useState } from 'react';

import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [curentTodos, setCurentTodos] = useState(todosFromServer);

  const [newTitle, setNewTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [choosenUser, setChoosenUser] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const generateNewId = (arr: Todo[]): number => {
    const max = Math.max(...arr.map(object => object.id));

    return max + 1;
  };

  const resetState = () => {
    setNewTitle('');
    setChoosenUser(0);
    setHasTitleError(false);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setHasTitleError(!newTitle);
    setHasUserError(choosenUser === 0);

    if (!newTitle || choosenUser === 0) {
      return;
    }

    const newTodo: Todo = {
      id: generateNewId(curentTodos),
      title: newTitle,
      completed: false,
      userId: choosenUser,
    };

    setCurentTodos([...curentTodos, newTodo]);

    resetState();
  };

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
    setHasTitleError(false);
  };

  const onUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChoosenUser(+event.target.value);
    setHasUserError(false);
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
          <label htmlFor="title-input">Title: </label>
          <input
            id="title-input"
            type="text"
            data-cy="titleInput"
            value={newTitle}
            placeholder="Enter a title"
            onChange={onTitleChange}
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="select-user">User: </label>
          <select
            id="select-user"
            data-cy="userSelect"
            value={choosenUser}
            required
            onChange={onUserChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList
        todos={curentTodos}
      />
    </div>
  );
};
