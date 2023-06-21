import { FC, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import { Todo } from './types/Todo';
import { getUserById, todosWithUsers, getNewId } from './helpers';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUsers);

  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number>(0);

  const [titleError, setTitleError] = useState(false);
  const [selectUserError, setSelectUserError] = useState(false);

  const handleSelectUserChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const {
      value,
    } = event.target;

    setSelectUserError(false);
    setSelectedUserId(Number(value));
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      value,
    } = event.target;

    setTitleError(false);
    setTitle(value);
  };

  const clearForm = () => {
    setTitle('');
    setSelectedUserId(0);
    setTitleError(false);
    setSelectUserError(false);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!(title.trim()) || !selectedUserId) {
      setTitleError(!(title.trim()));
      setSelectUserError(!selectedUserId);

      return;
    }

    const newTodo = {
      id: getNewId(todos),
      title,
      completed: false,
      userId: selectedUserId,
      user: getUserById(selectedUserId),
    };

    setTodos([...todos, newTodo]);

    clearForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={onSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError
            && (
              <span className="error">Please enter a title</span>
            )}
        </div>

        <div className="field">
          <label htmlFor="selectUser">User: </label>
          <select
            id="selectUser"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleSelectUserChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {selectUserError
            && (
              <span
                className="error"
              >
                Please choose a user
              </span>
            )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
